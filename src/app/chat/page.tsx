"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthHeader } from "@/components/AuthHeader";

function ChatPageContent() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, status } = useChat({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* User avatar dropdown in top right */}
      <AuthHeader className="absolute top-0 right-0 z-10" />

      {/* Chat content */}
      <div
        className="flex-1 flex flex-col items-center justify-between overflow-y-scroll pt-4"
        style={{ height: "100vh" }}
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

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  );
}
