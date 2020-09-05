import { client } from "../bot";
import { Userstate } from "tmi.js";

export default async function (channel: string, userstate: Userstate) {
  await client.say(channel, `POLO @${userstate.username}`);
}
