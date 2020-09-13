import { Userstate } from "tmi.js";
import { readdirSync } from "fs";
import { resolve, basename } from "path";
import { wsClient } from ".";

let rate_limiter = false;
const rate_limit = parseInt(process.env.RATE_LIMIT) || 100;

const commands = {};
readdirSync(resolve(__dirname, "commands")).forEach((command) => {
  commands[
    basename(basename(command, ".ts"), ".js").toUpperCase()
  ] = require(resolve(__dirname, "commands", command)).default;
});

export async function handleMessage(
  channel: string,
  userstate: Userstate,
  message: string,
  self: boolean
) {
  if (self || rate_limiter) {
    return;
  }
  if (rate_limit > 0) {
    rate_limiter = true;
    setTimeout(() => (rate_limiter = false), rate_limit);
  }

  if (message.charAt(0) === "!") {
    await handleCommand(channel, userstate, message);
  } else {
    let emotes = [];
    if (userstate.emotes) {
      const emoteIds = Object.keys(userstate.emotes);
      emotes = emoteIds.map((emote) =>
        `,https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0`.repeat(
          userstate.emotes[emote].length
        )
      );
    }

    if (emotes.length && wsClient) {
      wsClient.send(`DROP ${emotes.join("").substr(1)}`);
    }
  }
}

async function handleCommand(
  channel: string,
  userstate: Userstate,
  message: string
) {
  console.log(`${userstate.username} : ${message}`);

  message = message.substr(1);
  const components = message.split(" ");
  const command = commands[components[0].toUpperCase()];
  components.shift();
  if (!command) return;

  await command(channel, userstate, components);
}
