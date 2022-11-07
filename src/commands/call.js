import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle, PermissionFlagsBits } from "discord.js";
import config from "../config.js";
import { commands } from "../client.js";

commands['call'] = async function (interaction) {
    let cargo_perm = config.atendimento.staff

    if (!interaction.member.roles.cache.has(cargo_perm)) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`\\❌ **| Você precisa ter o cargo <@&${cargo_perm}> para utilizar este comando.**`)
                    .setColor(0x2f3136)
            ],
            ephemeral: true
        })
    } else {

        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionFlagsBits.Administrator))
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`**\\❌ | ${interaction.user}, Eu preciso da permissão \`Administrador\`**`)
                        .setColor(0x2f3136)
                ],
                ephemeral: true,
            })

        interaction.reply({ content: "Painel enviado!", ephemeral: true })

        let embed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setTitle(`🔊 SISTEMA DE ATENDIMENTO - ${interaction.guild.name}`)
            .setDescription(`Para criar uma call de atendimento clique no botão a baixo\n\`\`Obs:\`\` Delete sua call no botão **DELETAR**, assim que desconectar da call.`)


        let botao = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("criarcall")
                    .setLabel("✅ CRIAR")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("deletecall")
                    .setLabel("❌ DELETAR")
                    .setStyle(ButtonStyle.Danger),
            );
        return interaction.channel.send({ embeds: [embed], components: [botao] })
    }
}