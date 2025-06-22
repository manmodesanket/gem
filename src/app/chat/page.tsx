"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthHeader } from "@/components/AuthHeader";
import { useConversation } from "@/hooks/useConversation";
import { useCallback } from "react";

function ChatPageContent() {
  const { currentConversation, saveMessage } =
    useConversation();
  
  const saveAssistantMessage = useCallback(async (message: string) => {
    await saveMessage("assistant", message);
  }, [currentConversation, saveMessage]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    error,
    reload,
    status,
  } = useChat({
    onFinish: async (message) => {
      if (message.content) {
        saveAssistantMessage(message.content);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await saveMessage("user", input);
    originalHandleSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !(status === "submitted")) {
      e.preventDefault();
      handleSubmit(e as any);
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
          {currentConversation && (
            <div className="text-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">
                {currentConversation.title || "New Chat"}
              </h2>
            </div>
          )}
          <Messages messages={messages} isLoading={status === "submitted"} />
        </div>
        <ErrorMessage error={error} reload={reload} />
      </div>
      <ChatInputContainer
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        isLoading={status === "submitted"}
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
