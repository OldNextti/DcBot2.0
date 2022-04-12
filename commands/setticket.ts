import {ICommand} from "wokcommands";
import {
    Guild,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    TextChannel
} from "discord.js";

const ticketEmbed = new MessageEmbed()
    .setTitle('📨 Ticket Cube Cave')
    .setColor('GREEN')
    .setThumbnail('https://i.imgur.com/7PG5V6U.png')
    .setDescription(
        'Clique no botão abaixo para abrir um ticket.' +
        '\n\n**Atenção:**' +
        '\nTickets inativos serão fechados após 24h.' +
        '\nNão abra vários tickets em sequência.' +
        '\nDescreva seu problema com o máximo de detalhes.'
    )

const row = new MessageActionRow()
row.addComponents(
    new MessageButton()
        .setCustomId('open_ticket')
        .setStyle('SUCCESS')
        .setEmoji('📨')
)


export default {
    category: 'Cubecave',
    description: 'Seta o sistema de ticket em um canal.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<channel>',
    expectedArgsTypes: ['CHANNEL'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    callback: async ({ message, interaction, args, client }) => {
        const channel = (
            message
                ? message.mentions.channels.first()
                : interaction.options.getChannel('channel')
        ) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Selecione um canal de texto.'
        }

        channel.send({
            components: [row],
            embeds: [ticketEmbed]
        })
            .then((message) => {

                const collector = message.createMessageComponentCollector({ componentType: 'BUTTON' })

                collector.on('collect', async interaction => {

                    let user = interaction.user.username

                    await (message.guild as Guild).channels
                        .create(`${user}`, {
                            type: 'GUILD_TEXT',
                            position: 1
                        })
                        .then(async (channel) => {
                            await channel.setParent('889516479396065340'),
                                await channel.permissionOverwrites.set([
                                    {
                                        id: channel.guild.roles.everyone,
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: interaction.user.id,
                                        allow: [
                                            'VIEW_CHANNEL',
                                            'SEND_MESSAGES',
                                            'ATTACH_FILES',
                                            'READ_MESSAGE_HISTORY',
                                        ],
                                    },
                                    {
                                        id: '931925110175195156',
                                        allow: [
                                            'VIEW_CHANNEL',
                                            'SEND_MESSAGES',
                                            'ATTACH_FILES',
                                            'READ_MESSAGE_HISTORY',
                                            'MANAGE_MESSAGES'
                                        ]
                                    }
                                ])
                            const idDoCanal = channel.id
                            await interaction.reply({
                                content: `Seu ticket foi criado em: <#${idDoCanal}>`,
                                ephemeral: true
                            })
                            await channel.send({ content: `**Olá <@${interaction.user.id}>!**` })
                            await channel.send({ content: `**Nosso <@&889362409389686814> lhe atenderá em breve.**` })
                            await channel.send({ content: `**Enquanto isso pedimos que descreva seu problema com detalhes!**` })
                        })
                })
            })

        return {
            custom: true,
            content: `Sistema de ticket setado com sucesso!`,
            ephemeral: true,
        }

    },
} as ICommand