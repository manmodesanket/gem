"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthHeader } from "@/components/AuthHeader";
import { ChatSidebar } from "@/components/ChatSidebar";
import { MobileChatSidebar } from "@/components/MobileChatSidebar";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { useConversation } from "@/hooks/useConversation";
import { useCallback, useState, useEffect } from "react";
import { Conversation } from "@/lib/conversationService";

function ChatPageContent() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentConversation, conversations, saveMessage, loadConversations, loading, setCurrentConversation, loadConversation } =
    useConversation();

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
  
  const handleConversationClick = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    const newMessages = await loadConversation(conversation.id);
    setMessages(newMessages);
  };

  const handleNewChat = async () => {
    // Clear current messages
    setMessages([]);
    // Clear current conversation
    setCurrentConversation(null);
    // Close mobile sidebar if open
    setIsMobileSidebarOpen(false);
  };

  // Load conversations on component mount
  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <ChatSidebar 
        conversations={conversations} 
        currentConversation={currentConversation} 
        loading={loading} 
        onConversationClick={handleConversationClick}
        onNewChat={handleNewChat}
      />

      {/* Mobile Sidebar */}
      <MobileChatSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        loading={loading}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onConversationClick={handleConversationClick}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          {/* Hamburger Menu for Mobile */}
          <HamburgerMenu onClick={() => setIsMobileSidebarOpen(true)} />

          {/* Current Conversation Title */}
          <div className="flex-1 text-center md:text-left md:ml-4">
            {currentConversation && (
              <h2 className="text-lg font-medium text-gray-700">
                {currentConversation.title || "New Chat"}
              </h2>
            )}
          </div>

          {/* User avatar dropdown */}
          <AuthHeader />
        </div>

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
      </div>
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
