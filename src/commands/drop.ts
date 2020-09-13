import { Userstate } from "tmi.js";
import { wsClient } from "..";
import axios from "axios";

export default async function (
  channel: string,
  userstate: Userstate,
  params: string[]
) {
  let emotes = [];

  if (params.length === 1 && params[0] === "me") {
    try {
      const response = await axios.get(
        `https://api.twitch.tv/kraken/users/${userstate["user-id"]}`,
        {
          headers: {
            accept: "application/vnd.twitchtv.v5+json",
            "client-id": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
      emotes.push(response.data.logo);
    } catch (e) {
      console.log(e);
    }
  }

  if (userstate.emotes) {
    const emoteIds = Object.keys(userstate.emotes);
    emotes = emoteIds.map(
      (emote) => `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0`
    );
  }

  if (!emotes.length && process.env.DEFAULT_EMOTE) {
    emotes.push(process.env.DEFAULT_EMOTE);
  }

  if (wsClient && emotes.length) {
    wsClient.send(`DROPSOME ${emotes.join(",")}`);
  }
}
