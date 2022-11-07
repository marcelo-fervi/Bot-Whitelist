import client, {
    commands
} from '../client.js'
import {
    EmbedBuilder
} from 'discord.js'

commands['liberation'] = async function (interaction) {

    interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setAuthor({
                name: `${interaction.guild.name}`,
                iconURL: `${client.user.avatarURL()}`
            })
            .setColor('#2f3136')
            .setDescription(':arrow_right_hook: Para realizar sua liberação envie seu: **ID** logo abaixo.\n:arrow_right_hook: A Liberação é automática, caso ocorra algum problema abra um **TICKET**.\n:arrow_right_hook: Para obter seu **ID **você deve se conectar no servidor usando a sala de conexão!')
        ]
    })

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Sistema de liberation iniciado')
            .setColor("#2f3136")
        ],
        ephemeral: true
    })
}