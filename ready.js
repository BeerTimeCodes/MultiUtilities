module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} has logged in.`);

    client.user.setPresence({
      activity: {
        name: `For Swear Words`,
        type: "WATCHING"
      },
      status: 'online'
    });
	},
};
