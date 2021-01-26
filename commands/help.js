module.exports = {
	name: 'help',
	description: 'Show the help page',
	execute(message, args) {
    const Discord = require('discord.js');
    const Config = require('../settings.json');
    const embed = new Discord.MessageEmbed()
      .setTitle("You're witnessing the help page!")
      .setColor('0x0091F4')
      .addFields(
        {name: `${Config.prefix}help`, value: 'Show this message'},
        {name: `${Config.prefix}ban <member>`, value: 'Ban a member'},
        {name: `${Config.prefix}kick <member>`, value: 'Kick a member'},
      );
    message.channel.send(embed);
	},
};