import { Handlers, PageProps } from "$fresh/server.ts";
import { database, MessageSchema } from "../db/mongo.ts";
import ScrollIntoViewComponent from "../islands/ScrollIntoViewComponent.tsx";
import { formatTimestampToRelativeTime } from "../utils/time.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form: FormData = await req.formData();
    const message: string | undefined = form.get("message")?.toString();
    if (message) await database.insertMessage(message);
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default async function Page() {
  const messages: MessageSchema[] = await database.findAllMessages();
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          {messages.map((item) => (
            <li
              key={item._id}
              className="block px-2.5 py-4"
              style={{ width: "max-content" }}
            >
              <div className="text-sm text-gray-600 mb-1">
                {/* Placeholder for sender's name */}
                {"Sender Name"}
              </div>
              <div className="rounded bg-white shadow text-base px-4 py-2">
                {item.message}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {/* Placeholder for timestamp */}
                {formatTimestampToRelativeTime(item._id.getTimestamp()) ||
                  "Timestamp"}
              </div>
            </li>
          ))}
        </ul>
        <ScrollIntoViewComponent />
      </div>
      <form
        method="POST"
        action="/delete-chat"
      >
        <button className="fixed top-4 right-4 z-50 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
          Delete Chat
        </button>
      </form>
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
          Send
        </button>
      </form>
    </div>
  );
}
