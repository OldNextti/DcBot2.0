import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

const embed = new MessageEmbed()
    .setTitle('📨 Votos Cube Cave')
    .setThumbnail('https://i.imgur.com/7PG5V6U.png')
    .setColor('GREEN')
    .setDescription(
        'Clique nos links abaixo e coloque seu nick.' +
        '\n\nhttps://cutt.ly/nncv7zC' +
        '\nhttps://cutt.ly/wncv3N8' +
        '\nhttps://cutt.ly/cncv0Ar' +
        '\nhttps://cutt.ly/6ncv1zT' +
        '\nhttps://cutt.ly/PIctHol'
    )
    .addFields(
        {
            name: 'Posso votar offline?',
            value: 'Sim, ao votar offline você recebe suas recompensas quando logar.'
        }
    )

export default {
    category: 'Cubecave',
    description: 'Retorna com os links de voto.',

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
            message.reply({ embeds: [embed] })
        } else {
            return
        }
    }
} as ICommand