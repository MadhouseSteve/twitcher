import { client } from "../bot";
import { Userstate } from "tmi.js";

function rot13(str: string) {
  var input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
  var index = (x) => input.indexOf(x);
  var translate = (x) => (index(x) > -1 ? output[index(x)] : x);
  return str.split("").map(translate).join("");
}

export default async function (
  channel: string,
  userstate: Userstate,
  params: string[]
) {
  if (!params.length) {
    await client.say(
      channel,
      `@${userstate.username}: Usage is !rot13 [string to encode]`
    );
    return;
  }
  await client.say(
    channel,
    `@${userstate.username}: I've rot13'd your string. Enjoy 😁 ${rot13(
      params.join(" ").substr(0, 350)
    )}`
  );
}
