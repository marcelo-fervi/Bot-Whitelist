import config from './config.js'
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ModalBuilder,
    EmbedBuilder,
    TextInputBuilder,
    TextInputStyle,
    SelectMenuBuilder,
    PermissionFlagsBits
} from 'discord.js'

export default {
    whitelist: {
        defaultMessage: {
            description: '> <a:red_alerta:1156317159107088485> **ATENÇÃO! ANTES DE COMEÇAR A SUA ALLOWLIST**\n\n```ALLOWLIST NORMAL```Você pode fazer nossa **Allowlist Normal** a qualquer momento, e o resultado será enviado para o seu **PRIVADO** assim que tiver sido lida e avaliada.\n\n> ``❗ MUITA ATENÇÃO ❗``\nPrepare sua história para ter, no máximo, **4000 CARACTERES**. ``NÃO É PERMITIDO`` o envio de LINKS ou de ARQUIVOS nas respostas da sua **ALLOWLIST**. Caso envie, a sua **ALLOWLIST **será rejeitada!',
            color: 0x2f3136,
            image: {
                url: config.whitelist.imageurl,
            },
            footer: {
                text: `📄 Sistema de Allowlist`
            },
        },

        waitResult: {
            embeds: [
                new EmbedBuilder()
                    .setDescription("Você já está em processo de análise. Aguarde até que o resultado seja divulgado.")
                    .setColor("#2f3136")
            ],
            ephemeral: true
        },

        rateLimit: {
            embeds: [
                new EmbedBuilder()
                    .setDescription("Existem muitas allowlists sendo feitas no momento. Aguarde um pouco...")
                    .setColor("#2f3136")
            ],
            ephemeral: true
        },

        finished: {
            title: '**Finalizando**',
            description: 'Estou computando suas respostas...\nAguarde, isso pode levar alguns segundos.',
            color: 0x2f3136,
        },

        createChannel: function (name, category, guild, member) {
            return {
                name: '📄┆allowlist-' + IdentifierGenerator(),
                parent: category,
                topic: 'Formulário para Allowlist',
                reason: 'Criando formulário de allowlist',

                permissionOverwrites: [{
                    id: member.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                    deny: [PermissionFlagsBits.SendMessages]
                },
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                ]
            }
        },

        initWhitelist: function (client, member) {
            return {
                content: `<@${member.id}>`,
                embeds: [{
                    color: 0x2f3136,
                    author: {
                        name: `📝 Allowlist - ${client.guilds.cache.get(config.idservidor.id).name}`,
                        icon_url: `${client.user.avatarURL()}`
                    },
                    description: 'Aqui vão algumas dicas para você antes de iniciar a sua **ALLOWLIST**:\n\n<a:setinha:1156301587480850512> Você tem **5 minutos** para **iniciar a allowlist** e **3 minutos** por **pergunta para responder**, caso contrário a **sala se fecha** e você terá que começar novamente.\n\n<a:setinha:1156301587480850512> Cada **RESPOSTA **tem o limite de **4000 CARACTERES** para quem **TEM NITRO** e **2000 CARACTERES** para quem **NÃO TEM NITRO**, caso precise ultrapassar você pode utilizar o **Paste Bin** para enviar o link. Esse recurso só pode ser usado se a pergunta pedir envio da **HISTÓRIA **do seu personagem. Caso você anexe um **ARQUIVO **ou envie **LINK ** em qualquer outra pergunta sem ser na solicitada história, sua **ALLOWLIST ** será **ANULADA ** e você terá que começar do zero.\n\n<a:setinha:1156301587480850512> Caso não queira enviar sua **ALLOWLIST** para análise no final por algum erro você pode **OPTAR** por **ENVIAR** ou **NÃO ENVIAR**.\n\n**❗ Esse canal será deletado 30 segundos após envio da sua allowlist**.',
                }],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('init_whitelist')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji('📝')
                                .setLabel('Começar')

                        )
                ]
            }
        },

        questionBuilder: function (client, question) {
            return {
                title: `<:artigo_msg:1156316560403730512> Pergunta ${question.id}/${config.whitelist.questions.length}`,
                description: `> ${question.question}`,
                color: 0x2f3136,
                footer: { text: `> Você tem ${question.time} minuto(s) para responder` },
            }
        },

        createButton: function (custom_id, label, btnColor) {
            return new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(custom_id)
                        .setStyle(btnColor)
                        .setLabel(label)
                )
        },

        createResultButtons: function (member_id) {
            return new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`approve-${member_id}`)
                        .setStyle(ButtonStyle.Success)
                        .setLabel('Aprovar')
                        .setEmoji('<:1035048119999668264:1036364037115613194>')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`fail-${member_id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('Reprovar')
                        .setEmoji('<:9827332621851771081:1035983050368090172>')
                )
        },

        createTextInput: function (question) {
            const modal = new ModalBuilder()
                .setCustomId(`question-${question.id}`)
                .setTitle(`Pergunta ${question.id}/${config.whitelist.questions.length}`)

            const TextInput = new TextInputBuilder()
                .setCustomId(`question-${question.id}`)
                //.setValue(' ')
                .setMaxLength(question.maxLength)
                .setMinLength(question.minLength ? question.minLength : 1)
                .setRequired(true)
                .setLabel('Responda atentamente a sua allowlist')
                .setPlaceholder('Escreva sua resposta aqui')
                .setStyle(question.maxLength > 256 ? TextInputStyle.Paragraph : TextInputStyle.Short)

            return [modal, TextInput]
        },

        formBody: function (member_infos, member_id) {
            return {
                title: 'Análise de Allowlist',
                color: 0x2f3136,
                description: `Formulário feito por: <@${member_id}>`,
                fields: member_infos.answers,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Usuário em análise'
                },
            }
        },

        buttonCreateWhitelist: new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('create_whitelist')
                    .setPlaceholder('Selecione uma opção')
                    .addOptions(config.allowlistcategories.categories),
            )
    },

    ticket: {

        closeButton: function () {
            return new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('request_close')
                        .setEmoji('<:1016481385273364501:1038573291750817883>')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Finalizar Ticket')
                )
        },

        createTicketButton: function () {
            return new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('create_ticket')
                        .setPlaceholder('Clique aqui para escolher uma categoria')
                        .addOptions(config.ticket.categories),
                )
        }
    },

    useful: {
        welcomeMessage: {
            color: 0x2f3136,
            title: 'Olá, Seja bem vindo(a)!',
            description: 'Seja bem vindo ao servidor, leia as regras e fique por dentro de todos os nossos anuncios para não perder nenhuma novidade!',
            timestamp: new Date().toISOString()
        },

        exitMessage: function (member) {
            return {
                color: 0x2f3136,
                title: 'Um membro saiu do servidor',
                description: `<@${member.id}> saiu do servidor!`,
                timestamp: new Date().toISOString()
            }
        },

        embedBuilder: function (title, description) {
            return {
                title,
                color: 0x2f3136,
                description,
                timestamp: new Date().toISOString()
            }
        }
    }
}

function IdentifierGenerator() {
    return "xxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}