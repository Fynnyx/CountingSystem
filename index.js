const { Client, Intents } = require("discord.js")

const { prefix } = require("./properties.json")
const dotenv = require("dotenv")

dotenv.config()

const CLIENT = new Client({ intents: [Intents.FLAGS.GUILDS] });

CLIENT.once("ready", () => {
    console.info(`\x1b[33m${CLIENT.user.username}\x1b[34m, logged in with PREFIX \x1b[33m${prefix}\x1b[0m`)
})

CLIENT.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'setnumber') {
        console.log(interaction.options);

		await interaction.reply(`The Number ${0} has been set.`);
    }
});

CLIENT.login(process.env.TOKEN)