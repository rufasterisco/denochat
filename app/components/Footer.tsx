import HiddenInputsComponent from "../islands/HiddenNameAndColor.tsx";
import NameGenerator from "../islands/NameGenerator.tsx";
import WebsocketHandler from "../islands/WebsocketHandler.tsx";

export function Footer() {
  return (
    <form
      method="POST"
      className="flex items-center p-4 bg-[#8ecae6] border-t border-[#023047]"
      style={{ backgroundColor: "#559e92" }}
    >
      <input
        type="text"
        name="message"
        className="flex-1 p-2 rounded border shadow-inner text-[#023047] border-[#023047]"
        placeholder="Type your message"
        autoFocus
      />
      <HiddenInputsComponent></HiddenInputsComponent>
      <WebsocketHandler></WebsocketHandler>
      <button
        type="submit"
        className="ml-4 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-[#fb8500] bg-[#a4b2e8]"
        style={{ color: "#023047" }}
      >
        Send
      </button>
    </form>
  );
}
