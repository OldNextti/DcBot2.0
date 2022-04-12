import { ICommand } from "wokcommands";
import { MessageEmbed, TextChannel } from "discord.js";

const closeEmbed = new MessageEmbed()
    .setColor('ORANGE')
    .setFooter({ text: 'CLIQUE EM ✅ PARA FECHAR O TICKET' })

const deleteEmbed = new MessageEmbed()
    .setColor('ORANGE')
    .setFooter({ text: 'Para deletar o ticket use: !delete' })

export default {
    category: 'Cubecave',
    description: 'Encerra um ticket.',

    permissions: ['MANAGE_MESSAGES'],

    //minArgs: 3,
    //maxArgs: 3,
    //expectedArgs: '<channel> <messageId> <role>',
    //expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message }) => {

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

                    (message.channel as TextChannel).setParent('889516542981701712')

                        .then((message) => {

                            message.permissionOverwrites.set([
                                {
                                    id: message.guild.roles.everyone,
                                    deny: ['VIEW_CHANNEL']
                                },
                                {
                                    id: '931925110175195156',
                                    allow: [
                                        'VIEW_CHANNEL',
                                        'SEND_MESSAGES',
                                        'ATTACH_FILES',
                                        'READ_MESSAGE_HISTORY',
                                        'MANAGE_MESSAGES',
                                    ]
                                }
                            ])

                            message.send({ embeds: [deleteEmbed] })
                        })

                })
            })
        }
    }
} as ICommand