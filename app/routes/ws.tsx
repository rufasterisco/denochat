import { Handlers } from "$fresh/server.ts";

export const sockets: Set<WebSocket> = new Set();

export const handler: Handlers = {
  GET(req) {
    const { response, socket } = Deno.upgradeWebSocket(req);

    socket.onopen = () => sockets.add(socket);
    socket.onclose = () => sockets.delete(socket);

    return response;
  },
};
