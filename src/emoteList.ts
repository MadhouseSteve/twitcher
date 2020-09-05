import Axios from "axios";
import { readFileSync } from "fs";

export const emoteList = JSON.parse(
  readFileSync("custom-emotes.json").toString()
);

Axios.get("https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0", {
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Accept: "application/vnd.twitchtv.v5.json",
  },
})
  .then((response) => response.data.emoticon_sets)
  .then((emotes) => {
    for (let id in emotes) {
      for (let emote of emotes[id]) {
        emoteList[
          emote.code
        ] = `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/3.0`;
      }
    }
  });

Axios.get("https://api.betterttv.net/3/cached/emotes/global")
  .then((response) => response.data)
  .then((emotes) => {
    for (let emote of emotes) {
      emoteList[emote.code] = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
    }
  });
