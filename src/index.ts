import "./bot";

import { readFileSync } from "fs";
import { resolve } from "path";

import { createServer, IncomingMessage, ServerResponse } from "http";
import { AddressInfo } from "net";

import ws from "ws";

let server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.write(readFileSync(resolve(__dirname, "overlay.html")));
  res.end();
});

export let wsClient: ws;
const wss = new ws.Server({ server });
wss.on("connection", (client) => {
  wsClient = client;
});

server.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" }, () => {
  const address = server.address() as AddressInfo;
  console.log(`🚀 Listening on http://${address.address}:${address.port}`);
});
