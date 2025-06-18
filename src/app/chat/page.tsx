"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, status } = useChat({});

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
          <Messages messages={messages} isLoading={status === 'submitted'}/>
        </div>
        <ErrorMessage error={error} reload={reload} />
      </div>
      <ChatInputContainer
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
