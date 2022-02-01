const { Client, Intents } = require("discord.js")
const dotenv = require("dotenv")

dotenv.config()

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	]
});
module.exports = client;

// client.commands = new Collection();
// client.aliases = new Collection();
// client.categories = readdirSync("./commands/");
["events"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


client.login(process.env.TOKEN)