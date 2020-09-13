import { Userstate } from "tmi.js";
import { wsClient } from "..";

export default (channel: string, userstate: Userstate, message: string) => {
  if (wsClient) {
    let emotes = [];

    if (userstate.emotes) {
      const emoteIds = Object.keys(userstate.emotes);
      emotes = emoteIds.map(
        (emote) => `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0`
      );
    }

    if (!emotes.length && process.env.DEFAULT_EMOTE) {
      emotes.push(process.env.DEFAULT_EMOTE);
    }

    wsClient.send(`CHEER ${userstate.bits} ${emotes[0]}`);
  }
};
