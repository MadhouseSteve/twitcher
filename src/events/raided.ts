import { wsClient } from "..";

export default () => {
  if (wsClient) {
    wsClient.send(
      `RAID ${
        process.env.RAID_EMOTE ||
        "https://static-cdn.jtvnw.net/emoticons/v1/62836/3.0"
      }`
    );
  }
};
