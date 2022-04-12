import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Cubecave',
    description: 'Adiciona um cargo em uma mensagem.',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {
        const menuRole = new MessageEmbed()
            .setTitle('📨 Notificações Cube Cave')
            .setColor('GREEN')
            .setThumbnail('https://i.imgur.com/7PG5V6U.png')
            .setDescription(
                'Selecione um dos cargos abaixo para ser notificado.' +
                '\n\n<@&960195083330809886>' +
                '\nReceba notificações sobre mudanças no servidor!' +
                '\n\n<@&960195494653620284>' +
                '\nReceba notificações de nossos parceiros!' +
                '\n\n<@&960195313916858398>' +
                '\nReceba notificações sobre eventos novos e atuais!' +
                '\n\n<@&960196112399081492>' +
                '\nReceba notificações de promoções em nossa loja!'
            )

        message.channel.send({ embeds: [menuRole] })
    },
} as ICommand