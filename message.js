const Guild = require('../schemas/guildSchema');
const mongoose = require('mongoose');

module.exports = {
  name: 'message',
  async execute(message, client) {
    if (message.author.bot) return;

    let guildProfile = await Guild.findOne({
      guildID: message.guild.id
    });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id
      });
      await guildProfile.save().catch(err => console.log(err));
    }

    client.prefix = guildProfile.prefix;

    let swear = ['fuck', 'bitch', 'nigga', 'nigger', 'hoe', 'hore', 'fitte', 'neger', 'nazi', 'hitler', 'heil', 'cock', 'vagina', 'dick', 'dildo', 'pussy', 'necrophile', 'faen', 'nigeria', 'gore', 'fvck', 'nig er', 'f', '$hit', '$hite', '$hite', 'discord.gg/'];

    if (swear.some(w => message.content.toLowerCase().includes(w))) {
      message.delete();
      message.reply('We do not tolerate that kind of language. Continuing will result in a mute.');
    }

    if (message.channel.type == 'dm') return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err);
    }
  },
};
