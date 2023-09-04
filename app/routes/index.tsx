import { Handlers, PageProps } from "$fresh/server.ts";
import { database } from "../db/mongo.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const message = form.get("message")?.toString();
    if (message) await database.insertMessage(message);
    return ctx.render();
  },
};

export default async function Page() {
  const messages = await database.findAllMessages();
  return (
    <div>
      <form method="POST">
        <input type="text" name="message"></input>
        <button type="submit">insert</button>
      </form>
      {
        <ul>
          {messages.map((item) => <li key={item._id}>{item.message}</li>)}
        </ul>
      }
    </div>
  );
}
