import config from "../config.js";

import client, {
    buttons,
    commands,
    selects
} from '../client.js'

client.once("clientReady", interaction => {
	console.log(`Ready! Logged in as ${interaction.user.tag}`);
});

client.on("messageCreate", async interaction => {
	if (config.suggestion.suggestionChannels.includes(interaction.channelId) && !interaction.author.bot) {
        console.log(`Sugestão de ${interaction.author.tag} em ${interaction.channelId}`)

        interaction.startThread({
            name: `${interaction.content.match(/.{1,40}/g)[0]}...`,
            autoArchiveDuration: 60,
            reason: 'Nova sugestão',
        });

        interaction.react('👍');
        interaction.react('👎');
    }
});

client.login(config.botToken);