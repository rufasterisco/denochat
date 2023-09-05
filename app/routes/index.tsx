import { Handlers } from "$fresh/server.ts";
import { database, MessageSchema } from "../db/mongo.ts";
import { sockets } from "../routes/ws.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { ChatHistory } from "../components/ChatHistory.tsx";

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
  // not an anti-pattern to load messages here instead of the handler:
  // https://fresh.deno.dev/docs/concepts/routes
  const messages: MessageSchema[] = await database.findAllMessages();
  return (
    <div className="flex flex-col h-screen bg-[#8ecae6]">
      <Header></Header>
      <ChatHistory messages={messages} />
      <Footer></Footer>
    </div>
  );
}
