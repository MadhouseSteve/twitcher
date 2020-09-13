import { wsClient } from "..";

export default () => {
  if (wsClient) {
    wsClient.send(
      `RAID https://static-cdn.jtvnw.net/emoticons/v1/${62836}/3.0`
    );
  }
};
