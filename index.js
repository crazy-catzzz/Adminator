'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});


//Welcome message
client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}! Make sure to read the rules to avoid punishment!`);
});


//||help menu
client.on('message', message => {

  if (message.content === '||help' && message.channel.id !== '613254058240770096' ) {
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

  if (message.content.startsWith('||kick') && message.member.roles.cache.has('')) {

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

  if (message.content.startsWith('||ban') && message.member.roles.cache.has('')) {
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

  let forbiddenWords = ["fuck", "bitch", "Fuck", "Bitch"];

  for (var i = 0; i < forbiddenWords.length; i++) {
    if (message.content.includes(forbiddenWords[i])) {

      let member = message.member;

      member
        .kick('Automod')
        .then(() => {
          message.send(`Automod kicked ${member.tag}, watch your mouth guys!`)
        })
        .catch(err => {
          message.send("Crazy coded me wrong so automod doesn't work lmao")
          console.error(err);
        });
      break;
    }
  }
});



/*client.on('message', message => {                                                                                                 [EXPERIMENTAL FEATURE]

  if (message.content.startsWith('||warn')) {
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You can't use that command!")
    if (!dUser) return message.channel.send("Can't find user!")
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply('what is the reason???')

    dUser.send(`${dUser}, You have been warned for doing ${dMessage}`)

    message.channel.send(`${dUser} has been warned for doing ${dMessage} :thumbsdown:`)
  };
});*/


//Rules agreeement
client.on('message', message => {

        if (message.channel.id === '613254058240770096' && message.content === "I agree") {
          let memberRole = message.guild.roles.cache.find(role => role.name === "Memberzzzz");
          let member = message.member;

          member.roles.add(memberRole).catch(console.error);

        };
});



client.login();
