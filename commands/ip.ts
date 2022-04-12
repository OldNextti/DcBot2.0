import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";

const ipEmbed = new MessageEmbed()
    .setTitle('📨 IP Cube Cave')
    .setThumbnail('https://i.imgur.com/7PG5V6U.png')
    .setColor('GREEN')
    .setDescription('Copie o ip abaixo e cole em seu client.\nIP: cubecave.net')

export default {
    category: 'Cubecave',
    description: 'Apresenta o ip do servidor ao usuário.',

    //permissions: ['ADMINISTRATOR'],

    //minArgs: 3,
    //maxArgs: 3,
    //expectedArgs: '<channel> <messageId> <role>',
    //expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {
        if (message.channelId === '943561850208002110') {
            message.reply({ embeds: [ipEmbed] })
        } else {
            return
        }
    }
} as ICommand