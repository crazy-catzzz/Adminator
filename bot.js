'use strict';

const fs = require('fs'); //node.js native filesystem

require('dotenv').config();
<<<<<<< HEAD:bot.js
require('./dashboard/server.js')
=======
require('./keepAwake/awake.js');
>>>>>>> master:index.js
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

<<<<<<< HEAD:bot.js

//message event
=======
//commands
>>>>>>> master:index.js
client.on('message', message => {
	if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

<<<<<<< HEAD:bot.js
  if (message.content === '||help' && message.channel.id !== process.env.RULES_CHANNEL_ID) {
    const embed = new Discord.MessageEmbed()
      .setTitle("You're witnessing the help page!")
      .setColor('0x0091F4')
      .addFields(
        {name: '||help', value: 'Show this message'},
        {name: '||ban', value: 'Ban a member'},
        {name: '||kick', value: 'Kick a member'},
      );
      message.channel.send(embed);
  };

  //kick
  if (message.content.startsWith('||kick') && message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {

    const user = message.mentions.users.first();
    const dUser = message.mentions.users.first();
    if (user) {

      const member = message.guild.member(user);
      if (member) {

        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`)
            dUser.send("You have been kicked from Crazy's hole!")
              .catch(console.error);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            console.error(err);
          });
      } else {

        message.reply("That user isn't in this server!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }

  //ban
  if (message.content.startsWith('||ban') && message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
    const user = message.mentions.users.first();
    const dUser = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({reason: 'Optional reason'})
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`)
            dUser.send("You have been ***BANNED*** from Crazy's hole! If you want to appeal follow the instructions here: ")
              .catch(console.error);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this server!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
=======
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
>>>>>>> master:index.js

  //automod
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

  //nocommunity rules agreement
  if(Config.nocommunity == true) {

    if (message.channel.id === process.env.RULES_CHANNEL_ID && message.content === "I agree") {
      let memberRole = message.guild.roles.cache.find(role => role.name === process.env.MEMBER_ROLE_NAME);
      let member = message.member;

      member.roles.add(memberRole).catch(console.error);

    };    
  };
})

<<<<<<< HEAD:bot.js
client.login();
=======
});



client.login();
>>>>>>> master:index.js
