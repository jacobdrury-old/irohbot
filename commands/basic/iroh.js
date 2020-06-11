module.exports = {
    name: 'iroh',
    description: 'Sends a random Iroh quote!',
    category: 'basic',
    async execute(message) {
        const quotes = message.client.quotes;
        const randomQuote = quotes[Math.floor(Math.random() * (quotes.length - 1))];
        await message.channel.send({
            embed: {
                color: 3447003,
                description: randomQuote,
            },
        });
    },
};
