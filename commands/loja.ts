import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

const lojaEmbed = new MessageEmbed()
    .setTitle('📨 Loja Cube Cave')
    .setThumbnail('https://i.imgur.com/7PG5V6U.png')
    .setColor('GREEN')
    .setDescription(
        'Ajude o servidor a continuar online doando em nosso site.' +
        '\nhttps://cubecave.lojasquare.net/'
    )

export default {
    category: 'Cubecave',
    description: 'Apresenta a loja do servidor ao usuário.',

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
            message.reply({ embeds: [lojaEmbed] })
        } else {
            return
        }
    }

} as ICommand