'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

//DMs probably won't work cause I suck at JS lol

//Welcome message
client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`);
});


//||help menu
client.on('message', message => {

  if (message.content === '||help' && message.channel.id !== process.env.RULES_CHANNEL_ID) {
    const embed = new Discord.MessageEmbed()
      .setTitle("You're witnessing the help page!")
      .setColor('0x0091F4')
      .addFields(
        {name: '||help', value: 'Show this message'},
        {name: '||ban', value: 'Ban a member'},
        {name: '||kick', value: 'Kick a member'}
      );
      message.channel.send(embed);
  };
});


//||kick
client.on('message', message => {

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
            dUser.send("You have been kicked from Crazy's hole!");
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
});


//||ban
client.on('message', message => {

  if (message.content.startsWith('||ban') && message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
    const user = message.mentions.users.first();
    const dUser = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban('Optional reason that will display in the audit logs')
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`)
            dUser.send("You have been ***BANNED*** from Crazy's hole! If you want to appeal follow the instructions here: ");
          })
          .catch(err => {
            mesage.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this server!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
});


//autoKick                                                                                  [NEEDS REVISION I.E. LESS STRICT PUNISHMENTS]
client.on('message', message => {

  let forbiddenWords = ["fuck", "bitch", "Fuck", "Bitch"]; //Add any words that you like

  for (var i = 0; i < forbiddenWords.length; i++) {
    if (message.content.includes(forbiddenWords[i])) {

      let member = message.member;

      member
        .kick('Automod')
        .then(() => {
          message.send(`Automod kicked ${member.tag}, watch your mouth guys!`) //Currently not working yaaay
        })
        .catch(err => {
          message.send("Crazy coded me wrong so automod doesn't work lmao")
          console.error(err);
        });
      break;
    }
  }
});


//Rules agreeement
client.on('message', message => {

        if (message.channel.id === process.env.RULES_CHANNEL_ID && message.content === "I agree") {
          let memberRole = message.guild.roles.cache.find(role => role.name === process.env.MEMBER_ROLE_NAME);
          let member = message.member;

          member.roles.add(memberRole).catch(console.error);

        };
});



client.login();
