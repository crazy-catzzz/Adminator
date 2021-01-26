'use strict';

const fs = require('fs'); //node.js native filesystem

require('dotenv').config();

const Config = require("./settings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

//Command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
//command handler end


//ready event
client.on('ready', () => {
  console.log('Sucessfully logged in!');
  console.log(" ");
  console.log("====================================================================");
  console.log(" ");
  console.log("settings.json settings:");
  console.log(" ");
  console.log(Config);
  client.user.setActivity(`${Config.prefix}help`, {type: "PLAYING"});
});
//ready event end


//DMs probably won't work cause I suck at JS lol

//Welcome message
client.on('guildMemberAdd', member => {
  if(Config.welcomemsg == true) {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`);
    member.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`)
  };

});

//commands
client.on('message', message => {
	if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
});
//commands end


//automod
client.on('message', message => {
if (Config.automod == true) {

  //kick setting
  if (Config.automodpunishment == "kick") {
    for (var i = 0; i < Config.badwords.length; i++) {
      if (message.content.includes(Config.badwords[i])) {

      let member = message.member;

      message
        .delete({timeout: 1})
        .catch(err => {
          message.channel.send("I can't delete messages REEEEEEEEEEEEEEEEEE")
          console.error(err)
        });

      member
        .kick('Automod')
        .then(() => {
          message.channel.send(`Automod kicked ${message.author}, watch your mouth guys!`)
        })
        .catch(err => {
          message.channel.send("Crazy coded me wrong so automod doesn't work lmao")
          console.error(err);
        });
        break;
      }
    }
  }
  else if (Config.automodpunishment == "delete") {
    for (var i = 0; i < Config.badwords.length; i++) {
      if (message.content.includes(Config.badwords[i])) {
        message
        .delete({timeout: 1})
        .catch(err => {
          message.channel.send("Automod died lmao")
          console.error(err);
        });
      }
    }

  };

};
  
});


//Rules agreeement
client.on('message', message => {
  if(Config.nocommunity == true) {

    if (message.channel.id === process.env.RULES_CHANNEL_ID && message.content === "I agree") {
      let memberRole = message.guild.roles.cache.find(role => role.name === process.env.MEMBER_ROLE_NAME);
      let member = message.member;

      member.roles.add(memberRole).catch(console.error);

    };    
  };

});
