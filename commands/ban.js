module.exports = {
	name: 'ban',
	description: 'Ban someone',
	execute(message, args) {
    let banPerms = message.channel.permissionsFor(message.member).has("BAN_MEMBERS");
    if(banPerms) {
      const user = message.mentions.users.first();
      const dUser = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .ban({reason: 'Optional reason'})
            .then(() => {
              message.reply(`successfully banned ${user.tag}!`)
              dUser.send("You have been ***BANNED***")
                .catch(console.error);
            })
            .catch(err => {
              message.reply('I was unable to ban the member');
              console.error(err);
            });
        } else {
          message.reply("that user isn't in this server!");
        }
      } else {
        message.reply("you didn't mention the user to ban!");
      }
    } else message.reply("you don't have the rights to do that!")
	},
};