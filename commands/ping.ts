import {ICommand} from "wokcommands";

export default {
    category: 'Cubecave',
    description: 'Insira uma descrição',

    //permissions: ['ADMINISTRATOR'],

    //minArgs: 3,
    //maxArgs: 3,
    //expectedArgs: '<channel> <messageId> <role>',
    //expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args }) => {
        // Seu código aqui
    }
} as ICommand