'use strict';

require('dotenv').config();
require('./dashboard/server.js')
const Config = require("./settings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
  console.log(" ");
  console.log("====================================================================");
  console.log(" ");
  console.log("config.json settings:");
  console.log(" ");
  console.log(Config);
});

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


//message event
client.on('message', message => {

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

client.login();