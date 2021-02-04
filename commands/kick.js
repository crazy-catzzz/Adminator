module.exports = {
	name: 'kick',
	description: 'Kick someone',
	execute(message, args) {
    let kickPerms = message.channel.permissionsFor(message.member).has("KICK_MEMBERS");
    if (kickPerms) {
      const user = message.mentions.users.first();
      const dUser = message.mentions.users.first();
      if (user) {

        const member = message.guild.member(user);
        if (member) {

          member
            .kick('Optional reason')
            .then(() => {
              message.reply(`successfully kicked ${user.tag}`)
              dUser.send("You have been kicked")
                .catch(console.error);
            })
            .catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
            });
        } else {

          message.reply("that user isn't in this server!");
        }
      } else {
        message.reply("you didn't mention the user to kick!");
      }
    } else message.reply("you don't have the rights to do that!");
	},
};