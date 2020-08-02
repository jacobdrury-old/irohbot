module.exports = (client) => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Type :help for usage!',
            type: 'PLAYING',
        },
    });
    console.log('Ready!');
    console.log(client.guilds);
};
