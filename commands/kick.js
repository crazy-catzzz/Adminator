module.exports = {
	name: 'kick',
	description: 'Kick someone',
	execute(message, args) {
    if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
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
	},
};