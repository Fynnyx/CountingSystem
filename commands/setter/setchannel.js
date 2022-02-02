const { Client, CommandInteraction } = require("discord.js")
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "setchannel",
    description: "Set the channel for the counting",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.member.roles.cache.some(role => role.name === '[Admin]')) return;

        let channelid = interaction.channel.id
        data.channel = channelid
        let channelData = JSON.stringify(data, null, 4)
        writeFile(`${process.cwd()}/properties.json`, channelData, function (err, result) {
            if (err) console.log('error', err);
        });
        await interaction.reply({ content: `The channel have been set to <#${channelid}>.`, ephemeral: true })
    },
};