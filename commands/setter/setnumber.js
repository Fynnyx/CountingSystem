const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "setnumber",
    description: "Set the current number if it breaks.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "number",
            type: "NUMBER",
            description: "Specify the number",
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        if (!interaction.member.roles.cache.some(role => role.name === '[Admin]')) return;

        let number = parseInt(interaction.options.data[0].value)
        data.number = number
        let numberData = JSON.stringify(data, null, 4)
        writeFile(`${process.cwd()}/properties.json`, numberData, function (err, result) {
            if (err) console.log('error', err);
        });

        let newNumberEmbed = new MessageEmbed()
            .setColor("#00fff2")
            .setDescription(`Der aktuelle Counter ist jetzt auf ${number}`)

        // await interaction.followUp({ content: `The Number has been set to ${number}.`, ephemeral: true });
        await interaction.reply({ embeds: [newNumberEmbed] })    }
}