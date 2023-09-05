import { Handlers, PageProps } from "$fresh/server.ts";
import { database, MessageSchema } from "../db/mongo.ts";
import HiddenInputsComponent from "../islands/HiddenNameAndColor.tsx";
import NameGenerator from "../islands/NameGenerator.tsx";
import ScrollIntoViewComponent from "../islands/ScrollIntoViewComponent.tsx";
import { formatTimestampToRelativeTime } from "../utils/time.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form: FormData = await req.formData();
    const message: string | undefined = form.get("message")?.toString();
    const name: string = form.get("name")?.toString() || "Anonymous";
    if (message) await database.insertMessage(message, name);

    for (const socket of sockets) {
      socket.send("Hello from the server!");
    }

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
    <div className="flex flex-col h-screen bg-[#8ecae6]">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between z-50 text-xl font-bold p-4 text-[#023047] bg-[#219ebc]">
        <NameGenerator></NameGenerator>
        <form method="POST" action="/delete-chat">
          <button
            className="p-2 rounded-full focus:outline-none focus:ring focus:ring-[#fb8500]"
            style={{ backgroundColor: "#ffb703", color: "#023047" }}
          >
            Delete Chat
          </button>
        </form>
      </div>{" "}
      <div className="flex-1 overflow-y-auto p-4 mt-16 bg-opacity-50 bg-[#8ecae6]">
        <ul className="space-y-4">
          {messages.map((item) => (
            <li
              key={item._id}
              className="flex flex-col px-2.5 py-4 text-[#023047]"
              style={{ width: "max-content" }}
            >
              <div className="flex items-center mb-1">
                <div className="text-3xl font-bold">
                  {item.name}
                </div>
                <div className="inline-block ml-4 text-base px-4 py-2 rounded-[16px] bg-white shadow text-[#023047]">
                  {item.message}
                </div>
              </div>
              <div className="text-xs mt-1 pt-2 text-[#023047]">
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
        className="flex items-center p-4 bg-[#8ecae6] border-t border-[#023047]"
      >
        <input
          type="text"
          name="message"
          className="flex-1 p-2 rounded border shadow-inner text-[#023047]"
          style={{ borderColor: "#023047" }}
          placeholder="Type your message"
          autoFocus
        />
        <HiddenInputsComponent></HiddenInputsComponent>
        <WebsocketHandler></WebsocketHandler>
        <button
          type="submit"
          className="ml-4 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-[#fb8500]"
          style={{ backgroundColor: "#90e0ef", color: "#023047" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
