const mongoose = require('mongoose');
const Guild = require('../schemas/guildSchema');
const Discord = require('discord.js');

module.exports = {
	name: 'config',
	description: 'Configuration!',
	async execute(message, args, client) {
    message.delete();
		if(!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send("You do not have permission to edit the server's config!");

		let guildProfile = await Guild.findOne({ guildID: message.guild.id });
		if(!args.length) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`${message.guild.name} | Config:`)
				.setDescription(`If you cant see any fields below its because there is nothing assigned for the property.\nProperties: prefix, muterole, memberrole, welcomechannel & modlogchannel`)
				.setColor("#FFB600")
				.setTimestamp();
			if(guildProfile.prefix) embed.addField(`Prefix:`, guildProfile.prefix);
			if(guildProfile.muterole) embed.addField(`Mute Role:`, `<@&${guildProfile.muterole}>`);
			if(guildProfile.memberrole) embed.addField(`Member Role:`, `<@&${guildProfile.memberrole}>`);
      if(guildProfile.welcomechannel) embed.addField(`Welcome Channel:`, `<#${guildProfile.welcomechannel}>`);
			if(guildProfile.modlogchannel) embed.addField(`Modlog Channel:`, `<#${guildProfile.modlogchannel}>`);
			message.channel.send(embed);
		} else {
			if(!["prefix", "muterole", "memberrole", "modlogchannel", "welcomechannel"].includes(args[0])) return message.channel.send("You need to state a property to update.");
			if(!args[1]) return message.channel.send("You need to state a value to update this property!");
			if("prefix" === args[0]) {
				await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
				message.channel.send(`Successfully updated ${args[0]} to ${args[1]}`);
			} else if("muterole" === args[0]) {
				await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muterole: args[1], lastEdited: Date.now() });
				message.channel.send(`Successfully updated ${args[0]} to <@&${args[1]}>`);
			} else if("memberrole" === args[0]) {
				await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberrole: args[1], lastEdited: Date.now() });
				message.channel.send(`Successfully updated ${args[0]} to <@&${args[1]}>`);
			} else if("welcomechannel" === args[0]) {
				await Guild.findOneAndUpdate({ guildID: message.guild.id }, { welcomechannel: args[1], lastEdited: Date.now() });
				message.channel.send(`Successfully updated ${args[0]} to <#${args[1]}>`);
			} else if("modlogchannel" === args[0]) {
				await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogchannel: args[1], lastEdited: Date.now() });
				message.channel.send(`Successfully updated ${args[0]} to <#${args[1]}>`);
			}
		}
	},
};
