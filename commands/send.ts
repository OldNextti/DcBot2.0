import {ICommand} from "wokcommands";
import {TextChannel} from "discord.js";

export default {
    category: 'Cubecave',
    description: 'Envia uma mensagem usando o bot em um canal.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Selecione um canal de texto.'
        }

        args.shift()
        const text = args.join(' ')

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Mensagem enviada!',
                ephemeral: true,
            })
        }
    }
} as ICommand