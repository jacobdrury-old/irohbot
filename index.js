const { Client, Collection } = require('discord.js');
const { readFile } = require('fs');
// require('events').EventEmitter.defaultMaxListeners = 15;
if (!(process.env._ && process.env._.indexOf('heroku'))) {
    require('dotenv').config();
}

const client = new Client();
['commands', 'aliases'].forEach((x) => (client[x] = new Collection()));

['event', 'command'].forEach((handler) => require(`./handlers/${handler}`)(client));

client.prefix = process.env.PREFIX;
client.guildId = process.env.GUILD_ID;

readFile('quotes.txt', (err, data) => {
    if (err) throw err;
    client.quotes = data.toString().split(/\r?\n|\r/);
});

client.login(process.env.TOKEN);