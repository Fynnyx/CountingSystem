const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

const { Client } = require("discord.js")

/**
 * 
 * @param { Client } client 
 */

module.exports = async (client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        console.log(arrayOfSlashCommands);
        await client.guilds.cache
            .get("685559538077925400")
            .commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });
}