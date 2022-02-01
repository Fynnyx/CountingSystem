const { MessageEmbed } = require("discord.js");
const { writeFile } = require("fs")

const client = require('../index.js')
const data = require('../properties.json')

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!interaction.member.roles.cache.some(role => role.name == "[Admin]")) interaction.reply({ content: "Permission denied", ephemeral: true})

	const { commandName } = interaction;

	switch (commandName) {
		case "setnumber":
			let number = parseInt(interaction.options.data[0].value)
			data.number = number
			let numberData = JSON.stringify(data, null, 4)
			writeFile("properties.json", numberData, function (err, result) {
				if (err) console.log('error', err);
			});

			let newNumberEmbed = new MessageEmbed()
				.setColor("#00fff2")
				.setDescription(`Der aktuelle Counter ist jetzt auf ${number}`)

			await interaction.reply({ content: `The Number has been set to ${number}.`, ephemeral: true });
			await interaction.channel.send({ embeds: [newNumberEmbed] })

			break

		case "setchannel":
			let channelid = interaction.channel.id
			data.channel = channelid
			let channelData = JSON.stringify(data, null, 4)
			writeFile("properties.json", channelData, function (err, result) {
				if (err) console.log('error', err);
			});
			await interaction.reply({ content: `The channel have been set to <#${channelid}>.`, ephemeral: true })
			break

		default:
			return
	}
});