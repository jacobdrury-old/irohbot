module.exports = (client) => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Type :help for usage!',
            type: 'PLAYING',
        },
    });
    console.log('Ready!');
    client.guilds.forEach((guild) => {
        console.log(guild.name);
    });
};
