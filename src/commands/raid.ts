import { Userstate } from "tmi.js";
import { wsClient } from "..";

export default async function (
  channel: string,
  userstate: Userstate,
  params: string[]
) {
  if (wsClient) {
    wsClient.send(
      `RAID ${
        process.env.RAID_EMOTE ??
        "https://static-cdn.jtvnw.net/emoticons/v1/62836/3.0"
      }`
    );
  }
}
