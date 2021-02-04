'use strict';

const fs = require('fs'); //node.js native file service

require('dotenv').config();

const Config = require("./settings.json");
const { Client } = require('discord.js');
const bot = new Client();

require('./dashboard/server')

//Command handler
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}
//command handler end


//ready event
bot.on('ready', () => {
  console.log('Sucessfully logged in!');
  bot.user.setActivity(`${Config.prefix}help`, {type: "PLAYING"});
});
//ready event end


//DMs probably won't work cause I suck at JS lol

//Welcome message
bot.on('guildMemberAdd', member => {
  if(Config.welcomemsg == true) {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`);
    member.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`);
  };

});

//commands
bot.on('message', message => {
	if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
});
//commands end


//automod
bot.on('message', message => {
if (Config.automod == true) {

  //kick setting
  if (Config.automodpunishment == "kick") {
    for (var i = 0; i < Config.badwords.length; i++) {
      if (message.content.includes(Config.badwords[i])) {

      let member = message.member;

      message
        .delete({timeout: 1})
        .catch(err => {
          message.channel.send("I can't delete messages!")
          console.error(err)
        });

      member
        .kick('Automod')
        .then(() => {
          message.channel.send(`Automod kicked ${message.author}, watch your mouth guys!`)
        })
        .catch(err => {
          message.channel.send("Failed to use automod!")
          console.error(err);
        });
        break;
      }
    }
  }
  //delete setting
  else if (Config.automodpunishment == "delete") {
    for (var i = 0; i < Config.badwords.length; i++) {
      if (message.content.includes(Config.badwords[i])) {
        message
        .delete({timeout: 1})
        .catch(err => {
          message.channel.send("Failed to use automod!")
          console.error(err);
        });
      }
    }

  };

};
  
});

bot.login();