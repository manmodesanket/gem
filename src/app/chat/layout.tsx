"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const {
    currentConversation,
    conversations,
    loadConversations,
    loading,
    setCurrentConversation,
    loadConversation,
    deleteConversation,
  } = useConversation();

  const handleConversationClick = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    router.push(`/chat/${conversation.id}`);
  };

  const handleNewChat = async () => {
    setCurrentConversation(null);
    router.push("/chat");
  };

  const handleDeleteConversation = async (conversationId: string) => {
    const success = await deleteConversation(conversationId);
    if (success) {
      // If we deleted the current conversation, navigate to new chat
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        router.push("/chat");
      }
    }
  };

  // Load conversations on component mount
  useEffect(() => {
    if (conversations.length === 0) {
      loadConversations();
    }
  }, []);

  // Handle URL changes to update current conversation and reload conversations
  useEffect(() => {
    const conversationIdMatch = pathname.match(/^\/chat\/(.+)$/);
    
    if (conversationIdMatch) {
      const conversationId = conversationIdMatch[1];
      
      // If the URL shows a conversation that's different from current, update it
      if (currentConversation?.id !== conversationId) {
        // Find the conversation in the list first
        const existingConversation = conversations.find(conv => conv.id === conversationId);
        
        if (existingConversation) {
          setCurrentConversation(existingConversation);
        } else {
          // If not found in list, load it and refresh conversations
          loadConversation(conversationId).then(() => {
            loadConversations(); // Refresh the list to include the new conversation
          });
        }
      }
    } else if (pathname === '/chat') {
      // On new chat, clear current conversation if it exists
      if (currentConversation) {
        setCurrentConversation(null);
      }
    }
  }, [pathname]);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        loading={loading}
        onConversationClick={handleConversationClick}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
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
        onDeleteConversation={handleDeleteConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          {/* Hamburger Menu for Mobile */}
          <HamburgerMenu onClick={() => setIsMobileSidebarOpen(true)} />

          {/* Current Conversation Title */}
          <div className="flex-1 text-center md:text-left md:ml-4">
            <h2 className="text-lg font-semibold text-gray-900">
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