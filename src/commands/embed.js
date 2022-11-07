import {
    commands
} from '../client.js'
import messages from '../messages.js'
import {
    EmbedBuilder
} from 'discord.js'

commands['embed'] = async function (interaction) {
    const content = interaction.options ?.get('content') ?.value || ''
    const title = interaction.options.get('title').value
    const description = interaction.options.get('description').value

    interaction.channel.send({
        content,
        embeds: [messages.useful.embedBuilder(title, description)]
    })

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription('Embed foi enviado!')
            .setColor("#2f3136")
        ],
        ephemeral: true
    })
}