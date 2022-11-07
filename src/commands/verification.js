import client, {
    commands
} from '../client.js'
import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle
} from 'discord.js'

commands['verification'] = async function (interaction) {
    const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('authButton')
            .setLabel('Verificar conta')
            .setEmoji('🛡️')
            .setStyle(ButtonStyle.Primary),


            new ButtonBuilder()
            .setCustomId('whyCheck')
            .setLabel('Por que verificar a conta')
            .setEmoji('❓')
            .setStyle(ButtonStyle.Secondary),
        );


    interaction.channel.send({
        components: [buttons],
        embeds: [
            new EmbedBuilder()
            .setAuthor({
                name: `VERIFICAÇÃO - ${interaction.guild.name}`,
                iconURL: `${client.user.avatarURL()}`
            })
            .setColor("#2f3136")
            .setDescription('Confirme para a gente que você é um humano apertando no ``botão`` abaixo para dar continuidade no acesso ao nosso servidor.')
        ]
    })

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Sistema de verificação iniciado')
            .setColor("#2f3136")
        ],
        ephemeral: true
    })
}