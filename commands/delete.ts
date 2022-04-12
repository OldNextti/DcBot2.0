import { ICommand } from "wokcommands";
import { MessageEmbed, TextChannel } from "discord.js";

const closeEmbed = new MessageEmbed()
    .setColor('ORANGE')
    .setFooter({ text: 'CLIQUE EM ✅ PARA DELETAR O TICKET' })

export default {
    category: 'Cubecave',
    description: 'Deleta um ticket.',

    permissions: ['MANAGE_MESSAGES'],

    //minArgs: 3,
    //maxArgs: 3,
    //expectedArgs: '<channel> <messageId> <role>',
    //expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {

        const id = (message.channel as TextChannel).parentId

        if (
            id === '903980003526602762' ||
            id === '959511466208284702' ||
            id === '959513152700153917' ||
            id === '959511982015397928' ||
            id === '889369640067805194' ||
            id === '910129464665571369' ||
            id === '911763982728167505' ||
            id === '960731157622837320' ||
            id === '959813483619311656'
        ) return

        else {
            message.reply({ embeds: [closeEmbed] }).then((message) => {

                message.react('✅');
                const closeCollector = message.createReactionCollector({ max: 2 });

                closeCollector.on('end', () => {
                    message.channel.delete();
                })
            })
        }
    }
} as ICommand