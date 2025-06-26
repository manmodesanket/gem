"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { useConversation } from "@/hooks/useConversation";
import { useEffect } from "react";

interface ChatProps {
  conversationId?: string;
}

export function Chat({ conversationId }: ChatProps) {
  const { saveMessage, loadConversation, setCurrentConversation } = useConversation();

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    error,
    reload,
    status,
  } = useChat({
    onFinish: async (message) => {
      if (message.content) {
        saveMessage("assistant", message.content);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newInput = input;
    setInput("");
    await saveMessage("user", newInput);
    originalHandleSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !(status === "submitted")) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Load conversation messages when conversationId changes
  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId as string).then((newMessages) => {
        setMessages(newMessages);
      });
    } else {
      // Clear messages for new chat
      setMessages([]);
      setCurrentConversation(null);
    }
  }, [conversationId]);

  console.log(messages);

  return (
    <>
      {/* Chat content */}
      <div className="flex-1 flex flex-col items-center justify-between overflow-y-scroll">
        <div className="w-full max-w-4xl p-4 space-y-4 mb-8">
          <Messages messages={messages} isLoading={status === "submitted"} />
        </div>
        <ErrorMessage error={error} reload={reload} />
      </div>

      {/* Chat Input */}
      <ChatInputContainer
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        isLoading={status === "submitted"}
      />
    </>
  );
} 