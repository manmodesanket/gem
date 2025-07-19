import React, { useEffect, useRef } from "react";
import { AIMessages } from "./AIMessages";
import { LoadingIndicator } from "./LoadingIndicator";

interface Message {
  id: string;
  role: string;
  content: string;
}

export function Messages({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={endRef} />
    </>
  );
}
