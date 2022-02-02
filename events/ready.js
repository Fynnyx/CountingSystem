const client = require("../index.js")
const data = require("../properties.json")


client.on("ready", () => {
    console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in\x1b[0m`)
    statusInterval = setInterval(() => {
        client.user.setActivity(`the counter at ${data.number}`, { type: "WATCHING" })
    }, data.statusTime * 1000)
})