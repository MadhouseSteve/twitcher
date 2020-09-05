import { config } from "dotenv";
config();

import * as tmijs from "tmi.js";
import { handleMessage } from "./commands";
import { wsClient } from ".";
import { emoteList } from "./emoteList";

const channel = process.env.CHANNEL || "madhousesteve";

export const client = tmijs.Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_NAME || "SomeBot",
    password: process.env.TWITCH_TOKEN,
  },
  channels: [channel],
});

client.connect().then(() => {
  if (process.env.CHANNEL_GREETING)
    client.say(channel, process.env.CHANNEL_GREETING);
});
client.on("message", handleMessage);

client.on("raided", () => {
  if (wsClient) {
    wsClient.send(`RAID ${emoteList[process.env.RAID_EMOTE || "twitchRaid"]}`);
  }
});
