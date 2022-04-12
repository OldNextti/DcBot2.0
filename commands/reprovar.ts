import { ICommand } from "wokcommands";
import { MessageEmbed, TextChannel } from "discord.js";
import { schema } from "../schemas/sugestion-schema";
import mongoose from "mongoose";

const sugest = mongoose.model("sugestions", schema);

export default {
  category: "Cubecave",
  description: "Reprova uma sugestão e a envia para outro canal.",

  permissions: ["ADMINISTRATOR"],

  minArgs: 2,
  //maxArgs: 2,
  expectedArgs: "<messageId> <reason>",
  expectedArgsTypes: ["NUMBER", "STRING"],

  slash: "both",
  testOnly: false,
  guildOnly: false,

  callback: async ({ message, args }) => {
    const id_suggest = args.shift()?.toLocaleLowerCase();
    const reason = args.join(" ");

    const suggests = await sugest.find({ id: id_suggest });

    const suggestToDisapprove = {
      id: suggests[0].get("id"),
      _id: suggests[0].get("_id"),
      author: suggests[0].get("author"),
      sugestion: suggests[0].get("sugestion"),
      approved: suggests[0].get("approved"),
      reason: suggests[0].get("reason"),
      applied: suggests[0].get("applied")
    };

    if (suggestToDisapprove.approved === false) {
      await sugest.findByIdAndUpdate(suggestToDisapprove._id, {
        author: suggestToDisapprove.author,
        sugestion: suggestToDisapprove.sugestion,
        approved: false,
        reason: reason,
        applied: false
      });

      const denyEmbed = new MessageEmbed()
        .setTitle(`Sugestão Nº ${suggestToDisapprove.id} negada!`)
        .setColor("RED")
        .addFields(
          {
            name: `Sugestão de: ${suggestToDisapprove.author}`,
            value: `${suggestToDisapprove.sugestion}`
          },
          {
            name: "Motivo:",
            value: `${reason}`
          }
        );

      const channel = message.guild?.channels.cache.get(
        "959512747501060176"
      ) as TextChannel;

      channel.send({
        embeds: [denyEmbed]
      });
    } else {
      message.channel.send(`A sugestão já foi aprovada.`);
    }
  }
} as ICommand;
