"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { useConversation } from "@/hooks/useConversation";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ChatProps {
  conversationId?: string;
}

export function Chat({ conversationId }: ChatProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewChat = searchParams.get('q') === 'newChat';

  const {
    saveMessage,
    loadConversation,
    loadConversationWithCache,
    currentConversation,
    currentConversationRef,
  } = useConversation();

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
        await saveMessage("assistant", message.content);

        // If we're on a new chat (no conversationId) and we have a current conversation, navigate to it
        // Use ref to get the current value even after state updates
        if (!conversationId && currentConversationRef.current?.id) {
          // Navigate with query parameter to indicate this is a new chat with cached messages
          router.push(`/chat/${currentConversationRef.current.id}?q=newChat`);
        }
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
      // Check if this is a new chat with cached messages
      if (isNewChat) {
        // Load from localStorage with fallback to database
        loadConversationWithCache(conversationId as string).then((newMessages) => {
          setMessages(newMessages);
          // localStorage data is automatically cleared in loadConversationWithCache
        });
      } else {
        // Only load if the conversation changed (normal flow)
        if (currentConversation?.id !== conversationId) {
          loadConversation(conversationId as string).then((newMessages) => {
            setMessages(newMessages);
          });
        }
      }
    }
  }, [conversationId, isNewChat]);

  return (
    <>
      {/* Chat content */}
      <div className="flex-1 flex flex-col items-center justify-between overflow-y-auto">
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
