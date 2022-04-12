import { ICommand } from "wokcommands";
import { MessageEmbed, TextChannel } from "discord.js";
import { schema } from "../schemas/sugestion-schema";
import mongoose from "mongoose";

const sugest = mongoose.model('sugestions', schema)





export default {
    category: 'Cubecave',
    description: 'Envia uma sugestão ao canal de sugestões.',

    //permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    //maxArgs: 1,
    expectedArgs: '<message>',
    expectedArgsTypes: ['STRING'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {
        const suggests = await sugest.find()
        let id;
        if (suggests[0] === undefined) {
            id = 1;
        } else {
            id = suggests[suggests.length - 1]?.id + 1
        }
        if (message.channelId === '891147915786084352') {

            const messageContent = args.join(' ')

            const player = message.author.tag

            if (messageContent.length <= 50) {
                await message.reply('Porfavor, dê mais detalhes em sua sugestão.')
            } else {

                await message.reply({
                    content: `Sua sugestão foi enviada para: <#961863401754206228>`
                })

                const playerSugestion = new MessageEmbed()
                    .setAuthor({
                        name: `${player}`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setColor('GREEN')
                    .setDescription(`${messageContent}`)
                    .setFooter({
                        text: `✅ ${id}`
                    })

                const channel = message.guild?.channels.cache.get('961863401754206228') as TextChannel

                await channel.send({
                    embeds: [playerSugestion]
                })
                    .then((message) => {
                        message.react('👍')
                        message.react('👎')
                    })

                sugest.create({
                    author: player,
                    sugestion: messageContent,
                    approved: false,
                    reason: '',
                    applied: false,
                })

            }
        }
        else {
            await message.delete()
        }
    },
} as ICommand