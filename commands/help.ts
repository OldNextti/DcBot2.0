import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Cubecave",
  description: "Retorna com todos os comandos do bot.",

  permissions: ["ADMINISTRATOR"],

  //minArgs: 3,
  //maxArgs: 3,
  //expectedArgs: '<channel> <messageId> <role>',
  //expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

  slash: "both",
  testOnly: false,
  guildOnly: false,

  callback: async ({ message, interaction, args }) => {
    const helpEmbed = new MessageEmbed()
      .setTitle("📨 Help Cube Cave")
      .setColor("GREEN")
      .setThumbnail("https://i.imgur.com/7PG5V6U.png")
      .setDescription(
        "!menurole \n" +
          "!addrole \n" +
          "!ip \n" +
          "!link \n" +
          "!linkar \n" +
          "!loja \n" +
          "!ping \n" +
          "!send \n" +
          "!setticket \n" +
          "!voto \n" +
          "!sugerir \n" +
          "!aprovar \n" +
          "!reprovar \n" +
          "!aplicada \n" +
          "!close \n" +
          "!delete"
      );

    message.reply({
      embeds: [helpEmbed]
    });
  }
} as ICommand;
