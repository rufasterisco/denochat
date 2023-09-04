import { Handlers, PageProps } from "$fresh/server.ts";
import { find, insert } from "../db/mongo.ts";

// const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const message = form.get("message")?.toString();

    console.log(message);

    if (message) await insert(message);
    return ctx.render();
  },
};

export default async function Page() {
  console.log("PAGE");
  const messages = await find();
  // console.debug(messages);
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
