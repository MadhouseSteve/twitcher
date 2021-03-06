import { config } from "dotenv";
config();

import * as tmijs from "tmi.js";
import { handleMessage } from "./commands";
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
