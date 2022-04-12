import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Cubecave',
    description: 'Instruções para linkar ao discord.',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {
        if (message.channelId === '929141826550661180') {
            const menuLink = new MessageEmbed()
                .setTitle('📨 Vinculação Cube Cave')
                .setColor('GREEN')
                .setThumbnail('https://i.imgur.com/7PG5V6U.png')
                .setDescription(
                    'Siga os passos abaixo para vincular seu discord com o servidor.' +
                    '\n\nDentro do servidor, use o comando /linkar e você receberá' +
                    '\num comando com um código para enviar no canal <#891147915786084352>' +
                    '\n\nApós linkar sua conta com o servidor você terá' +
                    '\nacesso aos chats do Discord e ao cargo <@&961112663985885205>' +
                    '\n\nLinkando sua conta ao Discord você também aplica em' +
                    '\nsua conta cargos vip caso possua algum ativo no servidor.'
                )

            message.channel.send({ embeds: [menuLink] })
        } else {
            message.reply(`Este comando deve ser usado no canal <#929141826550661180>`)
        }
    },
} as ICommand