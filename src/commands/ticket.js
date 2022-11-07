import mysql from '../mysql.js'
import config from '../config.js'
import messages from '../messages.js'
const bot_table = config.ticket.table
import client, {
    selects,
    commands
} from '../client.js'
import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle,
    Embed
} from 'discord.js'

selects['create_ticket'] = async function (interaction) {
    interaction.message.edit({
        components: interaction.message.components
    })

    const ticket = interaction.values[0]
    const [
        [ticket_created]
    ] = await mysql.query(`SELECT * FROM ${bot_table} WHERE discord_id = ? AND is_finished = 0 AND type = 'ticket' `, [interaction.member.id])
    if (ticket_created) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Você ja possui um ticket criado: <#${ticket_created.channel_id}>`)
                .setColor("#2f3136")
            ],
            ephemeral: true
        })
    }

    const channel = await createTicket(
        ticket,
        config.ticket.category,
        interaction.member
    )

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription(`ℹ️ **${interaction.user.username}**, seu **TICKET** foi criado com sucesso no canal <#${channel.id}>`)
            .setColor("#2f3136")
        ],
        ephemeral: true
    })
}

async function createTicket(topic, category, member) {
    const [ticket] = await mysql.query(`INSERT INTO ${bot_table}(discord_id, type) VALUES(?, ?)`, [member.id, 'ticket'])
    const staff = config.ticket.staff
    const guild = member.guild

    const channel = await guild.channels.create({
        name: '📁・ticket-' + IdentifierGenerator(),
        parent: category,
        topic,
        reason: 'Criando ticket de atendimento',

        permissionOverwrites: [{
                id: member.id,
                allow: ['ViewChannel', 'SendMessages']
            },

            {
                id: guild.roles.everyone.id,
                deny: ['ViewChannel']
            },

            {
                id: staff,
                allow: ['ViewChannel', 'SendMessages']
            },
        ]
    })

    await mysql.query(`UPDATE ${bot_table} SET channel_id = ? WHERE id = ?`, [channel.id, ticket.insertId])

    channel.send({
        embeds: [
            new EmbedBuilder(topic)
            .setDescription(`<:1016481398065987766:1038278710702391296> **\`\`TICKET ${IdentifierGenerator().toUpperCase()}\`\`  aberto por ${member.user.username}**\n\n<:1016481401975079093:1038278714678575284> Caso queira **SAIR** desse canal, clique em **<:1018218275802456184:1038279155676090450> Sair do Canal**\n\n<:1016481400607735921:1038278713051205692> Assunto\n \`\`\`${topic}\`\`\``)
            .setColor(0x2f3136)
        ],
        components: [messages.ticket.closeButton()]
    })
    return channel
}

commands['ticket'] = async function (interaction) {
    interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setAuthor({
                name: `Ticket - ${interaction.guild.name}`,
                iconURL: `${client.user.avatarURL()}`
            })
            .setColor('#2f3136')
            .setDescription('``ATENÇÃO!``\n<:902992933026938950:1036378607624392774> Não abra um **TICKET** sem ter algo relevante. Leia nossas <#1035799143144235049>, abrir apenas por abrir irá gerar punições.\n\nSelecione uma das **CATEGORIAS** abaixo para abrir um **TICKET**:')
        ],
        components: [messages.ticket.createTicketButton()]
    })
    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Mensagem de criação de ticket foi enviada!')
            .setColor("#2f3136")
        ],
        ephemeral: true
    })
}

function IdentifierGenerator() {
    return "xxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}