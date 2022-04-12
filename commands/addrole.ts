import { ICommand } from "wokcommands";
import {
    Client,
    GuildMember,
    MessageActionRow,
    MessageSelectMenu,
    MessageSelectOptionData,
    Role,
    TextChannel
} from "discord.js";

export default {
    category: 'Cubecave',
    description: 'Adiciona um cargo em uma mensagem.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: false,
    guildOnly: false,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Seus cargos foram atualizados com sucesso!',
                    ephemeral: true
                })
            }
        })
    },

    callback: async ({ message, interaction, args, client }) => {
        const channel = (
            message
                ? message.mentions.channels.first()
                : interaction.options.getChannel('channel')
        ) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Selecione um canal de texto.'
        }

        const messageId = args[1]

        const role = (message
            ? message.mentions.roles.first()
            : interaction.options.getRole('role')
        ) as Role
        if (!role) {
            return 'Role desconhecido!'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'ID de mensagem desconhecido!'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Utilize o ID da mensagem enviada por <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value} faz parte deste menu!`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Selecione seu cargo...')
                    .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Role <@&${role.id}> adicionado ao menu!`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true,
        }
    },
} as ICommand