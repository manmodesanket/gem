"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeader";
import { ChatSidebar } from "@/components/ChatSidebar";
import { MobileChatSidebar } from "@/components/MobileChatSidebar";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { useConversation } from "@/hooks/useConversation";
import { Conversation } from "@/lib/conversationService";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const {
    currentConversation,
    conversations,
    loadConversations,
    loading,
    setCurrentConversation,
  } = useConversation();

  const handleConversationClick = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    router.push(`/chat/${conversation.id}`);
  };

  const handleNewChat = async () => {
    setCurrentConversation(null);
    router.push("/chat");
  };

  // Load conversations on component mount
  useEffect(() => {
    if (conversations.length === 0) {
      loadConversations();
    }
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
            <h2 className="text-lg font-medium text-gray-700">
              {currentConversation?.title || "New Chat"}
            </h2>
          </div>

          {/* User avatar dropdown */}
          <AuthHeader />
        </div>

        {/* Chat Content */}
        {children}
      </div>
    </div>
  );
} 