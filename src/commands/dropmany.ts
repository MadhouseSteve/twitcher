import { client } from "../bot";
import { Userstate } from "tmi.js";
import { wsClient } from "..";
import { emoteList } from "../emoteList";

export default async function (
  channel: string,
  userstate: Userstate,
  params: string[]
) {
  if (!params.length) {
    params.push(process.env.DEFAULT_EMOTE || "HeyGuys");
  }

  const emoji = params.filter(
    (param) => Object.keys(emoteList).indexOf(param) > -1
  );

  if (!emoji.length) {
    await client.say(
      channel,
      `@${userstate.username}: I can't drop any of the emojis you asked for`
    );
    return;
  }

  if (emoji.length > 1) {
    await client.say(
      channel,
      `@${userstate.username}: I can only drop many of one emoji, so using your first one.`
    );
    return;
  }

  if (wsClient) {
    wsClient.send(`DROPMANY ${emoteList[emoji[0]]}`);
  }
}
