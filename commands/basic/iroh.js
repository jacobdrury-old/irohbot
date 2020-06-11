module.exports = {
    name: 'quote',
    description: 'Sends a random Iroh quote!',
    aliases: ['q'],
    category: 'basic',
    async execute(message) {
        const quotes = message.client.quotes;
        const randomQuote = quotes[Math.floor(Math.random() * (quotes.length - 1))];
        const embedMessage = await message.channel.send({
            embed: {
                color: 3447003,
                description: randomQuote,
            },
        });

        const emojis = ['❌', '720502688302891048'];

        emojis.forEach(async (emoji) => await embedMessage.react(emoji));

        const filter = (reaction, user) =>
            (emojis.includes(reaction.emoji.name) || emojis.includes(reaction.emoji.id)) &&
            user.id === message.author.id;

        embedMessage
            .awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(async (collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name === '❌') {
                    await message.delete();
                    await embedMessage.delete();
                } else if (reaction.emoji.id === '720502688302891048') {
                    await embedMessage.delete();
                    await this.execute(message);
                }
            })
            .catch(() => {
                embedMessage.reactions
                    .removeAll()
                    .catch((error) => console.error('Failed to clear reactions: ', error));
            });
    },
};
