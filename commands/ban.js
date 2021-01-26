module.exports = {
	name: 'ban',
	description: 'Ban someone',
	execute(message, args) {
    if(message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
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
	},
};