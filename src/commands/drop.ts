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
    params.push(process.env.DEFAULT_EMOTE || "madhou8Fatcat");
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

  if (wsClient) {
    wsClient.send(`DROP ${emoji.map((param) => emoteList[param]).join(",")}`);
  }
}
