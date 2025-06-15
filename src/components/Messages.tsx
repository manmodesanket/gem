import { AIMessages } from "./AIMessages";

interface Message {
  id: string;
  role: string;
  content: string;
}

export function Messages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.role === "user" ? "flex justify-end" : ""}
        >
          <div
            className={
              message.role === "user"
                ? "bg-gray-200 rounded-lg px-4 py-2 max-w-[70%]"
                : ""
            }
          >
            {message.role === "assistant" ? (
              <AIMessages content={message.content} />
            ) : (
              message.content
            )}
          </div>
        </div>
      ))}
    </>
  );
}
