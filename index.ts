import DiscordJS, {Channel, Intents, Interaction, Message} from 'discord.js'
import 'dotenv/config'
import WOKCommands from 'wokcommands'
import path from 'path'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', async () => {
    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['889344918240264252'],
        botOwners: ['847637326204764202'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        }
    })
})

/*
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.includes('o ip') && message.channelId === '959514252085968947') {
        message.reply({embeds:[ipEmbed]})
    }
    else if (message.content.includes('ticket') && message.channelId === '959514252085968947') {
        message.reply({embeds:[ticketEmbed]})
    }
    else if (message.content.includes('loja') && message.channelId === '959514252085968947') {
        message.reply({embeds:[lojaEmbed]})
    }
})
*/

client.login(process.env.TOKEN)