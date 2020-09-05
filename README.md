# twitcher

## Environment Variables

| Variable         | Description                                                                     | Required | Default    |
| ---------------- | ------------------------------------------------------------------------------- | -------- | ---------- |
| TWITCH_TOKEN     | Twitch oAuth token from https://twitchapps.com/tmi/                             | Y        |            |
| CHANNEL          | Name of the channel to join                                                     | Y        |            |
| TWITCH_CLIENT_ID | Client ID of the twitch app                                                     | Y        |            |
| RATE_LIMIT       | How often a command is listened to (ms)                                         | N        | 100        |
| DEFAULT_EMOTE    | The emote to use in drop commands if none is supplied by the user               | N        | HeyGuys    |
| BOT_NAME         | This is here for completeness, but doesn't seem to affect the bots name in chat | N        | SomeBot    |
| CHANNEL_GREETING | An optional greeting when the bot joins the channel                             | N        |            |
| RAID_EMOTE       | The emote to use if a raid occurs                                               | N        | twitchRaid |
