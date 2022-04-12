import {ICommand} from "wokcommands";
import {MessageEmbed, TextChannel} from "discord.js";
import { schema } from "../schemas/sugestion-schema";
import mongoose from "mongoose";

const sugest = mongoose.model('sugestions', schema)

interface ISugestion { 
    _id: string;
    author: string;
    sugestion: string;
    approved: boolean;
    reason: string;
    applied: boolean;
}

export default {
    category: 'Cubecave',
    description: 'Aprova uma sugestão e a envia para outro canal.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    //maxArgs: 2,
    expectedArgs: '<messageId>',
    expectedArgsTypes: ['NUMBER'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({
                         message,
                         args,
    }) => {


        const id_suggest = args;


        const suggests = await sugest.find({ id: id_suggest})

        const suggestToApprove = {
            id: suggests[0].get("id"),
            _id : suggests[0].get('_id'),	
            author : suggests[0].get('author'),	
            sugestion : suggests[0].get('sugestion'),	
            approved : suggests[0].get('approved'),	
            reason : suggests[0].get('reason'),	
            applied : suggests[0].get('applied'),	
        }

       await sugest.findByIdAndUpdate(suggestToApprove._id, {
            author: suggestToApprove.author,
            sugestion: suggestToApprove.sugestion,
            approved: true,
            reason: '',
            applied: false,
       })

        const approveEmbed = new MessageEmbed()
            .setTitle(`Sugestão Nº ${suggestToApprove.id} aprovada!`)
            .setColor('GREEN')
            .setDescription('Sugestões aprovadas tem um prazo de 07 dias para serem aplicadas.')
            .addFields(
                {
                    name: `Sugestão de: ${suggestToApprove.author}`,
                    value: `${suggestToApprove.sugestion}`
                }
            )

        const channel = message.guild?.channels.cache.get('959512683852496936') as TextChannel

        channel.send({
            embeds: [approveEmbed]
        })


    }
} as ICommand