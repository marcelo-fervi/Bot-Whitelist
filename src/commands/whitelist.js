const usersCache = {}
import mysql from '../mysql.js'
import config from '../config.js'
import messages from '../messages.js'
const bot_table = config.ticket.table
const whitelist_table = config.liberation.table
import client, {
    buttons,
    commands,
    selects
} from '../client.js'
import {
    ActionRowBuilder,
    ButtonStyle,
    AttachmentBuilder,
    EmbedBuilder,
    MessageFlags
} from 'discord.js'

commands['whitelist'] = async function (interaction) {
    interaction.channel.send({
        embeds: [messages.whitelist.defaultMessage],
        components: [messages.whitelist.buttonCreateWhitelist]
    })
    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Sistema de allowlist criado.')
            .setColor("#2f3136")
        ],
        flags: [MessageFlags.Ephemeral]
    })
}

selects['create_whitelist'] = async function (interaction) {
    interaction.message.edit({
        components: interaction.message.components
    })

    if (!config.whitelist.WhitelistIsOpen) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`❌ ${interaction.user.username}, a **ALLOWLIST NORMAL** encontra-se fechada no momento.`)
                .setColor("#FF0000")
            ],
            flags: [MessageFlags.Ephemeral]
        },)
    }

    if (Object.keys(usersCache).length >= config.whitelist.simultaneousWhitelist) {
        return interaction.reply(messages.whitelist.rateLimit)
    }

    const [
        [waiting_result]
    ] = await mysql.query(`SELECT 1 FROM ${bot_table} WHERE discord_id = ? AND is_finished = 0 AND type = 'whitelist' `, [interaction.member.id])
    if (waiting_result) {
        return interaction.reply(messages.whitelist.waitResult)
    }

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription("Preparando sua allowlist")
            .setColor("#2f3136")
        ],
        flags: [MessageFlags.Ephemeral]
    })

    const channel = await createWhitelist(
        config.whitelist.category,
        interaction.member
    )

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
            .setDescription(`📑 <@${interaction.member.id}>, foi criado o canal **<#${channel.id}>** para você começar a responder a sua allowlist.`)
            .setColor("#2f3136")
        ],
        flags: [MessageFlags.Ephemeral]
    })
}

async function createWhitelist(category, member) {
    const [whitelist] = await mysql.query(`INSERT INTO ${bot_table}(discord_id, type) VALUES(?, ?)`, [member.id, 'whitelist'])
    const guild = member.guild

    const channel = await guild.channels.create(messages.whitelist.createChannel(whitelist.insertId.toString().padStart(4, '0'), category, guild, member))

    await mysql.query(`UPDATE ${bot_table} SET channel_id = ? WHERE id = ?`, [channel.id, whitelist.insertId])

    channel.send(messages.whitelist.initWhitelist(client, member))

    usersCache[member.id] = {
        firstTimeout: createFirstTimeout(channel, member, 2 * 60000)
    }
        
    return channel
}

buttons['init_whitelist'] = async function (interaction) {
    clearTimeout(usersCache[interaction.member.id] ?.firstTimeout)

    usersCache[interaction.member.id] = {
        quest: 0,
        timeout: createTimeout(config.whitelist.questions[0].time, interaction),
        answers: []
    }

    const questNumber = usersCache[interaction.member.id].quest
    const question = config.whitelist.questions[questNumber]

    if (question) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Aguarde, sua allowlist está sendo preparada...`)
                .setColor("#2f3136")
            ]
        })

        setTimeout(() => {
            interaction.deleteReply()

            interaction.message.edit({
                content: `<@${interaction.member.id}>`,
                embeds: [messages.whitelist.questionBuilder(client, question)],
                components: [messages.whitelist.createButton('answer_quest', 'Responder pergunta', ButtonStyle.Secondary)]
            })
        }, 1000)
    }
}

buttons['answer_quest'] = async function (interaction) {
    if (!usersCache[interaction.member.id]) {
        return;
    }

    let questNumber = usersCache[interaction.member.id].quest
    let question = config.whitelist.questions[questNumber]
    if (questNumber != null) {
        const [modal, modelQuestion] = messages.whitelist.createTextInput(question)
        
        const modelQuestionRow = new ActionRowBuilder().addComponents(modelQuestion)
        modal.addComponents(modelQuestionRow)
        
        await interaction.showModal(modal)

        const result = await interaction.awaitModalSubmit({
            time: question.time * 60000,
            filter: i => i.user.id === interaction.user.id,
        })

        if (result && usersCache[interaction.member.id].quest == questNumber) {
            if (question.isWhitelistId) {
                let whitelistIdInput = result.fields.getTextInputValue(`question-${question.id}`);
                let whitelistId = parseInt(whitelistIdInput);
                if (whitelistId == null || isNaN(whitelistId)) {
                    result.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setDescription("O ID de Allowlist é inválido.")
                            .setColor("#2f3136")
                        ],
                    });
                    return;
                }

                usersCache[interaction.member.id].whitelistId = whitelistId;

                usersCache[interaction.member.id].answers.push({
                    name: question.question,
                    value: result.fields.getTextInputValue(`question-${question.id}`)
                });

                await mysql.query(`UPDATE ${bot_table} SET whitelist_id = ? WHERE channel_id = ?`, [whitelistId, interaction.channel.id]);
            }
            else if (question.history) {
                usersCache[interaction.member.id].history = result.fields.getTextInputValue(`question-${question.id}`);
            }
            else {
                usersCache[interaction.member.id].answers.push({
                    name: question.question,
                    value: result.fields.getTextInputValue(`question-${question.id}`)
                });
            }

            clearTimeout(usersCache[interaction.member.id] ?.timeout);

            if (config.whitelist.questions[questNumber + 1]) {
                usersCache[interaction.member.id].timeout = createTimeout(question.time, interaction);
                usersCache[interaction.member.id].quest++;

                questNumber = usersCache[interaction.member.id].quest;
                question = config.whitelist.questions[questNumber];

                await result.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription("Resposta coletada. Estamos preparando a próxima pergunta!")
                        .setColor("#2f3136")
                    ]
                });

                result.deleteReply()

                interaction.editReply({
                    content: `<@${interaction.member.id}>`,
                    embeds: [messages.whitelist.questionBuilder(client, question)],
                    components: [messages.whitelist.createButton('answer_quest', 'Responder pergunta', ButtonStyle.Secondary)]
                });
            } else {
                await interaction.message.edit({
                    content: `<@${interaction.member.id}>`,
                    embeds: [messages.whitelist.finished],
                    components: []
                })

                result.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription("Este canal será apagado dentro de 10 segundos.")
                        .setColor("#2f3136")
                    ],
                    flags: [MessageFlags.Ephemeral]
                })

                const guild = interaction.member.guild
                await guild.channels.fetch(config.whitelist.channel).then(async channel => {
                    const content = usersCache[interaction.member.id].history
                    let files = [];
                    if (content) {
                        const file = new AttachmentBuilder(Buffer.from(content), {
                            name: 'history.txt'
                        })

                        files = [file]
                    }

                    if (config.whitelist.waiting_role != "") {
                        await interaction.member.roles.add(config.whitelist.waiting_role).catch(() => console.log(`Não tenho permissões para alterar os cargos do usuário ${interaction.member.id}`))
                    }

                    await channel.send({
                        content: `Formulário de <@${interaction.member.id}>`,
                        embeds: [messages.whitelist.formBody(usersCache[interaction.member.id], interaction.member.id)],
                        components: [
                            messages.whitelist.createResultButtons(interaction.member.id)
                        ],
                        files: files
                    })
                })

                setTimeout(async () => {
                    await mysql.query(`UPDATE ${bot_table} SET channel_id = 0 WHERE channel_id = ? AND is_finished = 0`, [interaction.channel.id])

                    interaction.channel.delete()
                    delete(usersCache[interaction.member.id])
                }, 10000)
            }
        }
    } else {
        await interaction.message.delete()
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription("Houve um erro. Inicie sua Allowlist novamente")
                .setColor("#2f3136")
            ],
            flags: [MessageFlags.Ephemeral]
        })

        setTimeout(() => {
            interaction.channel.delete()
            cancelWhitelist(interaction.member.id)
        }, 3000)
    }
}

client.on('interactionCreate', async interaction => {
    const buttonValue = interaction.customId

    if (interaction.isButton() && (buttonValue.startsWith('approve-') || buttonValue.startsWith('fail-'))) {
        const guild = interaction.guild
        const discord_id = buttonValue.startsWith('approve-') ? buttonValue.replace('approve-', '') : buttonValue.replace('fail-', '')

        const staff = await guild.members.fetch(interaction.member.id).catch(() => {})
        const is_staff = staff.roles.cache.has(config.whitelist.staff)
        if (!is_staff) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription('Você não possui permissão!')
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        }

        let resultChannelId = config.whitelist.resultApproval;
        if (buttonValue.startsWith('fail-')) {
            resultChannelId = config.whitelist.resultReject;
        }

        const channel = await guild.channels.fetch(resultChannelId).catch(() => {})
        if (channel != resultChannelId) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("Não foi possivel encontrar o canal para enviar os resultados da allowlist!")
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        }

        const [
            [whitelist]
        ] = await mysql.query(`SELECT id, whitelist_id, is_finished FROM ${bot_table} WHERE type = 'whitelist' AND discord_id = ?`, [discord_id])
        const [
            [whitelistAwait]
        ] = await mysql.query(`SELECT 1, is_finished FROM ${bot_table} WHERE type = 'whitelist' AND discord_id = ? AND is_finished = 0`, [discord_id])
        
        if (whitelist ?.is_finished && !whitelistAwait) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("A Allowlist deste usuário já foi lida!")
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        }

        const member = await guild.members.fetch(discord_id).catch(() => {})
        if (!whitelist || !member) {
            interaction.message.delete()
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("Este usuário não se encontra disponível. A Allowlist foi desconsiderada!")
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        }

        const newEmbed = interaction.message.embeds[0]
        if (buttonValue.startsWith('approve-')) {
            channel.send({
                //content: `<a:white_certo:1156321580117401670> <@${member.id}> sua **ALLOWLIST** foi **APROVADA** em nosso servidor. \`\`PARABÉNS\`\`! Agora aguarde para ser **ENTREVISTADO**.`
                content: `<a:white_certo:1156321580117401670> <@${member.id}> sua **ALLOWLIST** foi **APROVADA** em nosso servidor. \`\`PARABÉNS\`\`! Você foi liberado.`
            })

            interaction.message.edit({
                embeds: [{
                    title: 'Allowlist foi aprovada!',
                    description: newEmbed.description,
                    fields: newEmbed.fields,
                    color: newEmbed.color,
                    footer: {
                        text: `Usuário aprovado(a) por: ${interaction.member.user.username}#${interaction.member.user.discriminator}`
                    },
                    timestamp: new Date().toISOString()
                }],
                components: []
            })

            member.roles.add(config.whitelist.approved_role)
            member.roles.remove(config.whitelist.waiting_role).catch(() => {})

            await mysql.query(`UPDATE ${bot_table} SET is_finished = 1 WHERE id = ?`, [whitelist.id]);
            await mysql.query(`UPDATE ${whitelist_table} SET is_whitelisted = 1 WHERE id = ?`, [whitelist.whitelist_id]);

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("Allowlist aprovada com sucesso!")
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        } else if (buttonValue.startsWith('fail-')) {
            member.roles.remove(config.whitelist.waiting_role).catch(() => {})

            channel.send({
                content: `<a:white_errado:1156320190687092746> <@${member.id}> sua **ALLOWLIST** foi **REPROVADA** em nosso servidor! Preste mais atenção nas perguntas e na elaboração da sua próxima **ALLOWLIST**.`
            })

            interaction.message.edit({
                embeds: [{
                    title: 'Allowlist foi reprovada!',
                    description: newEmbed.description,
                    fields: newEmbed.fields,
                    color: newEmbed.color,
                    footer: {
                        text: `Usuário reprovado(a) por: ${interaction.member.user.username}#${interaction.member.user.discriminator}`
                    },
                    timestamp: new Date().toISOString()
                }],
                components: []
            })

            await mysql.query(`DELETE FROM ${bot_table} WHERE id = ?`, [whitelist.id])
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("Allowlist reprovada com sucesso!")
                    .setColor("#2f3136")
                ],
                flags: [MessageFlags.Ephemeral]
            })
        }
    }
})

function createTimeout(time, interaction, member) {
    return setTimeout(async () => {
        const guild = interaction.member.guild
        guild.channels.fetch(interaction.channel.id).then(channel => {
            interaction.member.send({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`<a:white_exclamation:1156321425821536317> **<@${interaction.member.id}>**, fechei sua sala de **ALLOWLIST** por ter passado o tempo limite para **COMEÇAR** a mesma. Caso queira reabrir e tentar novamente por favor vá na sala <#1121151498022301818>`)
                    .setColor('#2f3136')
                ]
            })

            setTimeout(() => {
                channel.delete()
            }, 2000)
        })
        cancelWhitelist(interaction.member.id)
    }, 60000 * time)
}

function createFirstTimeout(channel, member, duration) {
    return setTimeout(async () => {
        const guild = member.guild
        guild.channels.fetch(channel.id).then(channel => {
            channel.delete()
            cancelWhitelist(member.id)
        }, () => {})
    }, duration)
}

async function cancelWhitelist(member_id) {
    delete(usersCache[member_id])
    const [whitelist] = await mysql.query(`SELECT * FROM ${bot_table} WHERE type = 'whitelist' AND is_finished = 0 AND discord_id = ?`, [member_id])
    if (whitelist) {
        await mysql.query(`DELETE FROM ${bot_table} WHERE id = ?`, [whitelist.id])
    }
}