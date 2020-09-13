import { Userstate } from "tmi.js";
import { wsClient } from "..";

export default (channel: string, userstate: Userstate, message: string) => {
  if (wsClient) {
    wsClient.send(
      `CHEER ${userstate.bits} https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/4.gif`
    );
  }
};
