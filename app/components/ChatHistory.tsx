import { MessageSchema } from "../db/mongo.ts";
import ScrollIntoViewComponent from "../islands/ScrollIntoViewComponent.tsx";
import { formatTimestampToRelativeTime } from "../utils/time.ts";

export function ChatHistory({ messages }: { messages: MessageSchema[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 mt-24 bg-opacity-50 bg-[#8ecae6]">
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
  );
}
