import { Handlers } from "$fresh/server.ts";
import { database, MessageSchema } from "../db/mongo.ts";
import HiddenInputsComponent from "../islands/HiddenNameAndColor.tsx";
import ScrollIntoViewComponent from "../islands/ScrollIntoViewComponent.tsx";
import WebsocketHandler from "../islands/WebsocketHandler.tsx";
import { formatTimestampToRelativeTime } from "../utils/time.ts";
import { sockets } from "../routes/ws.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    // process incoming message, inserting into database
    const form: FormData = await req.formData();
    const message: string = form.get("message")?.toString() || "";
    const name: string = form.get("name")?.toString() || "Anonymous";
    if (message !== "") await database.insertMessage(message, name);

    // send message to all connected clients so that they update
    for (const socket of sockets) {
      socket.send("Hello from the server!");
    }

    // redirect back to the main page, this refreshed the list of messages
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
      <Header></Header>
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
                <div className="inline-block ml-4 text-base px-4 py-2 rounded-[16px] bg-[#d8e5e0] shadow text-[#023047]">
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
      <Footer></Footer>
    </div>
  );
}
