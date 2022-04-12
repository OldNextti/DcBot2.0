import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";

export default {
  category: "Cubecave",
  description: "Instruções para linkar ao discord",

  //permissions: ['ADMINISTRATOR'],

  slash: "both",
  testOnly: false,
  guildOnly: false,

  callback: async ({ message, interaction, args }) => {
    if (message.channelId === "891147915786084352") {
      const linkBot = new MessageEmbed()
        .setTitle("📨 Vinculação Cube Cave")
        .setColor("GREEN")
        .setThumbnail("https://i.imgur.com/7PG5V6U.png")
        .setDescription(
          "Siga os passos abaixo para vincular seu discord com o servidor." +
            "\n\nCom seu código de 4 dígitos em mãos, envie-os" +
            "\nno privado de nosso bot de vinculação: <@917061565163925524>"
        );

      message.reply({ embeds: [linkBot] });
    } else {
      message.reply(
        `Este comando deve ser usado no canal <#891147915786084352>`
      );
    }
  }
} as ICommand;
