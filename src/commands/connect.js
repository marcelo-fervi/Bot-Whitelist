import config from '../config.js'
import {
    commands
} from '../client.js'

import {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    MessageFlags
} from 'discord.js'

import FiveM from 'fivem'

commands['connect'] = async function (interaction) {
    const srv = new FiveM.Server(config.connect.ipvps)

    const message = await interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setDescription('Buscando informações')
            .setColor("#2f3136")
        ]
    })

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('FiveM')
            .setURL(config.connect.link)
            .setStyle(ButtonStyle.Link)
            .setEmoji('<:942278445382111244:1036135263879045161>')
        );

    const updateStatus = async () => {
        const {
            online
        } = await srv.getServerStatus()

        if (online) {
            const players = await srv.getPlayers()
            message.edit({
                components: [row],
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name}`)
                    .setColor("#2f3136")
                    .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                    .setFooter({
                        text: `Mensagem atualiza a cada 5 minutos || Última atualização: ${getCurrentFormattedDate().formattedHours}`,
                        iconURL: 'https://cdn.discordapp.com/emojis/593109163354357760.gif'
                    })
                    .addFields({
                        name: "**> __Status__:**",
                        value: '**```yaml\nOnline```**',
                        inline: true
                    }, {
                        name: "**> __Jogadores__:**",
                        value: "**```ini" + `\n[ ${players} / ${config.connect.players} ]` + "```**",
                        inline: true
                    }, {
                        name: "**> __IP FiveM__:**",
                        value: "**```fix\n" + config.connect.link + "```**"
                    })
                ]
            })
            return
        }

        message.edit({
            embeds: [
                new EmbedBuilder()
                .setDescription('Offline')
                .setColor("#2f3136")
            ]
        })
    }
    updateStatus()

    setInterval(() => {
        updateStatus()
    }, 5 * 60000)


    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Sistema de connect iniciado')
            .setColor("#2f3136")
        ],
        flags: [MessageFlags.Ephemeral]
    })
}

function getCurrentFormattedDate() {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const segundos = date.getSeconds().toString().padStart(2, "0")
    return {
        formattedTime: `${date.toLocaleDateString('pt-BR')}`,
        formattedHours: `${hours}:${minutes}:${segundos}`
    }
}