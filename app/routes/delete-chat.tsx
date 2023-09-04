import { Handlers } from "$fresh/server.ts";
import { database } from "../db/mongo.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    await database.deleteMessage();
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
