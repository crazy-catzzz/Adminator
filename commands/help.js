module.exports = {
	name: 'help',
	description: 'Show the help page',
	execute(message, args) {
    const { MessageEmbed } = require('discord.js');
    const { prefix } = require('../settings.json');
    const embed = new MessageEmbed()
      .setTitle("You're witnessing the help page!")
      .setColor('0x0091F4')
      .addFields(
        {name: `${prefix}help`, value: 'Show this message'},
        {name: `${prefix}ban <member>`, value: 'Ban a member'},
        {name: `${prefix}kick <member>`, value: 'Kick a member'},
      );
    message.channel.send(embed);
	},
};