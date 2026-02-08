import {
    Client,
    ApplicationCommandOptionType,
    ActivityType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags
} from 'discord.js'
import config from './config.js'

const client = new Client({
    intents: [
        "GuildMessages",
        "DirectMessages",
        "Guilds",
        "GuildBans",
        "GuildMessages",
        "GuildMembers",
        "GuildIntegrations",
        "MessageContent",
        "GuildScheduledEvents",
    ]
})


export default client
export const commands = {}
export const selects = {}
export const buttons = {}
export const autocompletes = {}

client.on('interactionCreate', interaction => {
    if (interaction.isCommand()) {
        if (commands[interaction.commandName]) {
            commands[interaction.commandName](interaction)
        }
    } else if (interaction.isSelectMenu()) {
        if (selects[interaction.customId]) {
            selects[interaction.customId](interaction)
        }
    } else if (interaction.isButton()) {
        if (buttons[interaction.customId]) {
            buttons[interaction.customId](interaction)
        }
    } else if (interaction.isAutocomplete()) {
        if (autocompletes[interaction.commandName]) {
            autocompletes[interaction.commandName](interaction)
        }
    }
})

client.on('interactionCreate', interaction => {
    if (interaction.isCommand()) {
        if (!interaction.guild) return

    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case "authButton":
                if (interaction.member.roles.cache.has(config.automatico.authrole)) {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(':x: | Você já tem acesso ao servidor')
                                .setColor("Red")
                        ],
                        flags: [MessageFlags.Ephemeral]
                    })

                    return
                }

                interaction.member.roles.add(config.automatico.authrole)

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`<:982734150610083851:1037435657229963364> **${interaction.user.username}**, obrigado por confirmar sua conta! Seja bem-vendo(a)!`)
                            .setColor("Green")
                    ],
                    flags: [MessageFlags.Ephemeral]
                })
                break

            case "whyCheck":
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("🛡️ Por que ter uma verificação de conta...")
                            .setDescription("A verificação de conta é para prevenir que contas indesejadas entre em nosso servidor, assim deixando uma comunidade mais segura e sem SPAM desnecessários em sua DM.")
                            .setColor("#2f3136")
                    ],
                    flags: [MessageFlags.Ephemeral]
                })
                break
        }
    }
})

client.on('ready', async (interaction) => {
    const activities = [
        {
            name: `📄 | Verificando allowlists ∞`,
            type: ActivityType.Listening
        },
        {
            name: `❤️ | ${client.guilds.cache.get(config.idservidor.id).name}`,
            type: ActivityType.Playing
        },
        //{
        //    name: `⚙️ VERSÃO [ 2.0.1 ]`,
        //    type: ActivityType.Playing
        //},
        {
            name: `DÚVIDAS? ABRA UM TICKET`,
            type: ActivityType.Playing
        },
        {
            name: `${client.users.cache.size} pessoas 👀`,
            type: ActivityType.Watching
        },
        //{
        //    name: `❤️ | By Junnin`,
        //    type: ActivityType.Watching
        //},
    ]

    const status = [
        'dnd'
    ]

    let i = 0
    setInterval(() => {
        if (i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++
    }, 5000)

    let s = 0

    setInterval(() => {
        if (s >= status.length) s = 0
        client.user.setStatus(status[s])
        s++
    }, 20000)
})

client.on('ready', async () => {
    if (config.automatico.automessage && config.automatico.automessage != "") {
        setInterval(() => {
            const channel = client.channels.cache.find(c => c.id === config.automatico.automessage)
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('🔔 Leia nossas <#1035799143144235049> para garantir o envio de uma boa **ALLOWLIST.**')
                        .setColor("#2f3136")
                ]
            })
        }, 60 * 60000)
    }

    client.application.commands.set([
        {
            name: 'ticket',
            description: 'enviar mensagem para abrir ticket',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'connect',
            description: 'enviar mensagem para connect',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'call',
            description: 'Crie sua call de atendimento.',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'liberation',
            description: 'enviar mensagem para liberation',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'verification',
            description: 'enviar mensagem para verification',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'whitelist',
            description: 'enviar mensagem para iniciar a whitelist',
            defaultMemberPermissions: 'Administrator',
            dmPermission: true
        },
        {
            name: 'embed',
            description: 'envie um embed com uma mensagem em um canal',
            defaultMemberPermissions: 'Administrator',
            options: [{
                description: 'Titulo do Embed',
                name: 'title',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                description: 'Descrição do Embed',
                name: 'description',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                description: 'Conteudo da mensagem',
                name: 'content',
                type: ApplicationCommandOptionType.String
            },
            ],
            dmPermission: false
        }
    ])
    console.log(('[LOGS] Módulos ligados com sucesso'))
    console.log((`[LOGS] ${client.user.tag} está online!\n[LOGS] Estou em ${client.guilds.cache.size} servidores.\n[LOGS] Cuidando de ${client.users.cache.size} membros.`))
})

process.on('uncaughtException', err => console.error(err))
client.login(process.env.TOKEN)



client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'criarcall') {
            const createEmbed = new EmbedBuilder()
                .setColor(0x2f3136)
                .setAuthor({
                    name: `${interaction.user.username}`,
                    iconURL: `${interaction.user.displayAvatarURL()}`
                })
                .setDescription(`**• Deseja mesmo criar um canal de atendimento?**`)

            const createRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("criar")
                        .setLabel("✅ Sim")
                        .setStyle(ButtonStyle.Success),
                )
            
            interaction.reply({
                embeds: [createEmbed],
                components: [createRow],
                flags: [MessageFlags.Ephemeral]
            })
        }
        else if (interaction.customId === "deletecall") {
            const deleteTargetChannel = client.channels.cache.find(c => c.name == `${interaction.user.username}`)
            if (!deleteTargetChannel) {
                return
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`> ✅ ${interaction.user}, sua sala de atendimento foi deletada!`)
                        .setColor(0x2f3136)
                ],
                flags: [MessageFlags.Ephemeral]
            }).then(() => {
                deleteTargetChannel.delete()
            })
        }
        else if (interaction.customId === 'criar') {
            if (interaction.guild.channels.cache.find(call => call.name === `${interaction.user.username}`)) {
                const callChannel = interaction.guild.channels.cache.find(call => call.name === `${interaction.user.username}`)
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`> *Você já possui uma call criada!* ${callChannel}.\n *Clique em* **DELETE** *ela e crie uma nova com a configuração desejada!*`)
                            .setColor(0x2f3136)
                    ],
                    flags: [MessageFlags.Ephemeral]
                })
            }
            else {
                interaction.guild.channels.create({
                    name: `${interaction.user.username}`,
                    type: 2,
                    parent: config.atendimento.category,
                    userLimit: 2,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["Connect", "ViewChannel"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                        },
                    ]
                }).then(call => interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`> ✅ Seu atendimento foi criado em ${call}`)
                            .setColor(0x2f3136)
                    ],
                    flags: [MessageFlags.Ephemeral]
                }))
            }
        }
    }
})