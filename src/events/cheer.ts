import { Userstate } from "tmi.js";
import { wsClient } from "..";

export default (channel: string, userstate: Userstate, message: string) => {
  if (wsClient) {
    let emotes = message
      .toLowerCase()
      .split(" ")
      .map((m) => {
        const type = m.match(/^[a-zA-Z]+/)[0];
        const amount = m.match(/[0-9]+$/)[0];
        return `https://d3aqoihi2n8ty8.cloudfront.net/actions/${type}/dark/animated/${amount}/3.gif`;
      });

    wsClient.send(`CHEER ${userstate.bits} ${emotes[0]}`);
  }
};
