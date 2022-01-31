const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./properties.json');
const dotenv = require("dotenv")

dotenv.config()

const commands = [
    new SlashCommandBuilder()
        .setName('setnumber')
        .setDescription('Set the current number if it breaks.')
        .addStringOption(option => 
            option.setName("number")
            .setDescription("Set the specific number")
            .setType("INTEGER")
            .setRequired(true)   
        )
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);