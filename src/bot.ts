import { config } from "dotenv";
config();

import * as tmijs from "tmi.js";
import { handleMessage } from "./commands";
import { wsClient } from ".";
import raided from "./events/raided";
import cheer from "./events/cheer";

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

client.on("raided", raided);
client.on("cheer", cheer);

client.on("message", handleMessage);
client.on("message", (channel, userstate, msg, self) => {
  if (self) {
    return;
  }

  let emotes = [];
  if (userstate.emotes) {
    const emoteIds = Object.keys(userstate.emotes);
    console.log(userstate.emotes);
    emotes = emoteIds.map((emote) =>
      `,https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0`.repeat(
        userstate.emotes[emote].length
      )
    );
  }

  if (emotes.length && wsClient) {
    wsClient.send(`DROP ${emotes.join(",").substr(1)}`);
  }
});
