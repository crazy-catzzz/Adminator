# Adminator
Private admin bot for a Discord server

Now on repl.it

# How to use
This bot is hosted on repl.it so you may want to follow [the idiot's guide](https://anidiots.guide/hosting/repl)

Just create a Repl from this repo and in the `.env` file add these lines:

```
DISCORD_TOKEN=nYOURz.kBOTw.qTOKENx_kGOESd-gHEREp
ADMIN_ROLE_ID=123456789
```

Replace the values with your actual bot token and admin role ID

For the hosting part follow the guide

## Configuration

Once Adminator is up and running you can edit the `config.json` file to enable/disable features

Default:
```
{
  "welcomemsg": true,
  "automod": false,
  "nocommunity": false,
  "automodpunishment": "kick",
  "badwords": ["Fuck", "fuck", "Bitch", "bitch", "Asshole", "asshole"]
}
```

I'm going to explain these values:
- welcomemsg (`type: boolean`)
  - default: true
  - Enable/Disable the welcome message in `member.guild.channels.cache.find(ch => ch.name === 'member-log')`

- automod (`type: boolean`)
  - default: false
  - Enable/Disable automatic moderation by filtering words present in `badwords` (more on that later)
  
- nocommunity (`type: boolean`)
  - default: false
  - Enable/Disable rules agreement on servers without Discord's "Community" feature enabled (Only enable if your server is NOT a community enabled one)
  
- badwords (`type: array`)
  - default: `["Fuck", "fuck", "Bitch", "bitch", "Asshole", "asshole"]`
  - Add/Remove filtered words for the `automod` feature
  
- automodpunishment (`type: string`)
  - dafault: `kick`
  - Change the punishment that automod gives a pertruder once they send a message with a forbidden word
  - Options: `kick`, `delete`
