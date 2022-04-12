import { ICommand } from "wokcommands";
import { MessageEmbed, TextChannel } from "discord.js";
import { schema } from "../schemas/sugestion-schema";
import mongoose from "mongoose";

const sugest = mongoose.model("sugestions", schema);

export default {
  category: "Cubecave",
  description:
    "Enivar a mensagem ao canal informando sobre a aplicação da sugestão",

  permissions: ["ADMINISTRATOR"],

  minArgs: 1,
  //maxArgs: 2,
  expectedArgs: "<messageId> <reason>",
  expectedArgsTypes: ["NUMBER", "STRING"],

  slash: "both",
  testOnly: false,
  guildOnly: false,

  callback: async ({ message, args }) => {
    const id_suggest = args.shift()?.toLocaleLowerCase();
    const reason = args.join(" ") || "Sem observações.";

    const suggests = await sugest.find({ id: id_suggest });

    const suggestToApply = {
      id: suggests[0].get("id"),
      _id: suggests[0].get("_id"),
      author: suggests[0].get("author"),
      sugestion: suggests[0].get("sugestion"),
      approved: suggests[0].get("approved"),
      reason: suggests[0].get("reason"),
      applied: suggests[0].get("applied")
    };

    if (suggestToApply.approved === true) {
      await sugest.findByIdAndUpdate(suggestToApply._id, {
        author: suggestToApply.author,
        sugestion: suggestToApply.sugestion,
        approved: true,
        reason: reason,
        applied: true
      });
      console.log(reason)
      const applyEmbed = new MessageEmbed()
        .setTitle(`Sugestão Nº ${suggestToApply.id} aplicada!`)
        .setColor("GREEN")
        .addFields(
          {
            name: `Sugestão de: ${suggestToApply.author}`,
            value: `${suggestToApply.sugestion}`
          },
          {
            name: "Observações:",
            value: `${reason}`
          }
        );

      const channel = message.guild?.channels.cache.get(
        "959512837871521872"
      ) as TextChannel;

      channel.send({
        embeds: [applyEmbed]
      });
    } else {
      message.channel.send(`A sugestão já foi reprovada.`);
    }
  }
} as ICommand;
