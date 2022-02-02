const { Client, CommandInteraction } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "number",
    description: "Get the current number if it breaks.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.reply({ content: "The current number is `" + data.number + "`." })    }
}