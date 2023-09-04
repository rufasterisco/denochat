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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          {messages.map((item) => (
            <li
              key={item._id}
              className="block rounded bg-white shadow px-2.5"
              style={{ width: "max-content" }}
            >
              {item.message}
            </li>
          ))}
        </ul>
      </div>
      <form
        method="POST"
        className="flex items-center p-4 bg-white border-t border-gray-200"
      >
        <input
          type="text"
          name="message"
          className="flex-1 p-2 rounded border shadow-inner"
          placeholder="Type your message"
          autoFocus
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Insert
        </button>
      </form>
    </div>
  );
}
