import mysql from '../mysql.js'
import config from '../config.js'
const bot_table = config.ticket.table
import {
    Embed,
    TextChannel
} from 'discord.js'
import {
    setTimeout
} from 'timers/promises'
import client, {
    commands,
    buttons
} from '../client.js'
import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle
} from 'discord.js'

commands['close_ticket'] = async function (interaction) {
    const channel = interaction.channel

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription('Ticket será encerrado em 5 segundo(s)')
                .setColor("#2f3136")
        ],
        ephemeral: true
    })

    for (let index = 4; index >= 0; index--) {
        await setTimeout(1000)

        if (index > 0) {
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Ticket será encerrado em ${index} segundo(s)`)
                        .setColor("#2f3136")
                ],
            })
        } else if (channel instanceof TextChannel) {
            channel.delete()
        }
    }
}

commands['request_close'] = async function (interaction) {
    const channel = interaction.channel
    const member = await interaction.guild.members.fetch(interaction.member.id)
    const is_staff = member.roles.cache.has(config.ticket.staff)

    const [
        [ticket]
    ] = await mysql.query(`SELECT channel_id, discord_id FROM ${bot_table} WHERE channel_id = ?`, [channel.id])

    if (!ticket) {
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Você não está em um ticket.')
                    .setColor("#2f3136")
            ],
            ephemeral: true
        })
    }

    if (!is_staff) {
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`<:9827332621851771081:1035983050368090172> **${interaction.user.username}**, você não tem permissão para usar essa função.`)
                    .setColor("#2f3136")
            ],
            ephemeral: true
        })
    }

    interaction.reply({
        embeds: [{
            title: 'Finalizar atendimento',
            color: 0x2f3136,
            fields: [{
                name: 'Atenção',
                value: 'Após o ticket ser finalizado o canal será deletado, realmente deseja finalizar o atendimento?'
            }],
            timestamp: new Date().toISOString(),
            footer: {
                iconURL: client.user.avatarURL(),
                text: client.user.username
            },
        }],
        components: [new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setEmoji('<:1016481385273364501:1038573291750817883>')
                    .setStyle(ButtonStyle.Primary)
                    .setLabel('Finalizar Ticket')
            )
        ],
        ephemeral: true
    })
}

buttons['request_close'] = commands['request_close']
buttons['close_ticket'] = commands['close_ticket']