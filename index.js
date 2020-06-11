const { Client, Collection } = require('discord.js');
const { readFile } = require('fs');
if (!process.env.HEROKU) {
    require('dotenv').config();
}

const client = new Client();
['commands', 'aliases'].forEach((x) => (client[x] = new Collection()));

['event', 'command'].forEach((handler) => require(`./handlers/${handler}`)(client));

client.prefix = process.env.PREFIX;

readFile('quotes.txt', (err, data) => {
    if (err) throw err;
    client.quotes = data.toString().split(/\r?\n|\r/);
});

client.login(process.env.TOKEN);
