const Discord = require('discord.js');
const Guild = require('../schemas/guildSchema');

module.exports = {
	name: 'kick',
	description: 'Kick!',
	async execute(message, args, client) {
		message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have access to this command!");

    if (!args[0]) return message.channel.send("You must state a user to kick! \`-kick @user reason\`");
    if (!mentionedMember) return message.channel.send("The mentioned user is not a member of the server.");

    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given.";
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#FFB600")
      .setTimestamp()
    
    const kickEmbed1 = new Discord.MessageEmbed()
      .setTitle(`User has been kicked!`)
      .addField(`User:`, `${mentionedMember}`)
      .addField(`Reason:`, `${reason}`)
      .setColor("#FFB600")
      .setTimestamp()
      .setFooter(client.user, client.user.displayAvatarURL());

    Guild.findOne({ guildID: message.guild.id }, async (err, res) => {
      let reason = args.slice(1).join(" ");
      const mentionedMember = message.mentions.members.first();
      const modlogChannel = message.guild.channels.cache.get(res.modlogchannel);
      const modlogEmbed = new Discord.MessageEmbed()
        .setTitle('**User Kick**')
        .addField('Kicked User:', `<@${mentionedMember}>`)
        .addField(`Kicked By:`, `<@${message.author.id}>`)
        .addField(`Reason:`, `${reason}.`)
        .setColor('#780630')
        .setTimestamp();

      modlogChannel.send(modlogEmbed);
    });

    // ?kick @user reason
    try {
      await mentionedMember.send(kickEmbed);
      await message.channel.send(kickEmbed1)
    } catch (err) {
      console.log(`I were unable to message the player`);
    }

    try {
      await mentionedMember.kick(reason);
    } catch (err) {
      console.log(err);
      return message.channel.send("I were unable to kick the user!");
    }
	},
};
