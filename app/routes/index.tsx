import { Handlers } from "$fresh/server.ts";
import { database, MessageSchema } from "../db/mongo.ts";
import { sockets } from "../routes/ws.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { ChatHistory } from "../components/ChatHistory.tsx";
import { qrcode } from "https://deno.land/x/qrcode/mod.ts";

// find env var named IP and assign to constant
const DENOCHAT_IP = Deno.env.get("DENOCHAT_IP")

export const handler: Handlers = {
  async POST(req, ctx) {
    // process incoming message, inserting into database
    // TODO validate, sanitize
    const form: FormData = await req.formData();
    const message: string = form.get("message")?.toString() || "";
    const name: string = form.get("name")?.toString() || "Anonymous";
    if (message !== "") await database.insertMessage(message, name);

    // send message to all connected clients so that they update
    for (const socket: Socket of sockets) {
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
  const base64Image = await qrcode(`http://${DENOCHAT_IP}:8000`,  { size: 80 }); // data:image/gif;base64,...
  
  return (
    <div className="flex flex-col h-screen bg-[#8ecae6]">
        <Header qr={base64Image}></Header>
      <ChatHistory messages={messages} />
      <Footer></Footer>
    </div>
  );
}
