const { writeFile } = require("fs")

const client = require("../index")
const data = require('../properties.json')

client.on("messageCreate", async message => {
    console.log(message.author.bot);

    if (message.channel.id != data.channel) return;
    if (message.author.bot) return;
    if (isNaN(parseInt(message.content))) {
        message.delete();
        return
    }
        var inputNumber = parseInt(message.content)
        if (inputNumber - 1 == data.number && data.user != message.member.id) {
            data.number = inputNumber
            data.user = message.member.id
            let numberData = JSON.stringify(data, null, 4)
            writeFile("properties.json", numberData, function (err, result) {
				if (err) console.log('error', err);
			});
        } else {
            message.delete()
        }
})