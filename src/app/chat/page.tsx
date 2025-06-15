"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, error, reload } =
    useChat({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex-1 flex flex-col items-center justify-between overflow-y-scroll"
        style={{ height: "calc(100vh - 96px)" }}
      >
        <div className="w-1/2 min-w-[300px] p-4 space-y-4 mb-8">
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
                {message.content}
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className="w-1/2 min-w-[300px]">
            <div>An error occurred.</div>
            <button type="button" onClick={() => reload()}>
              Retry
            </button>
          </div>
        )}
      </div>
      <div
        className="w-full flex justify-center z-10 border-t"
        style={{ height: 96 }}
      >
        <div className="flex space-x-4 w-1/2 min-w-[300px] p-4 h-full items-center">
          <Textarea
            name="gem-chat"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 h-full"
            rows={1}
          />
          <Button onClick={handleSubmit} type="submit">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
