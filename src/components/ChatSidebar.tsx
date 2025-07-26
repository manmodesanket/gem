"use client";

import React from "react";
import { ChatShimmer } from "@/components/ChatShimmer";
import { ConversationItem } from "@/components/ConversationItem";
import { Conversation } from "@/lib/conversationService";
import { Plus } from "lucide-react";

interface ChatSidebarProps {
  className?: string;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  onConversationClick: (conversation: Conversation) => void;
  onNewChat?: () => void;
  onDeleteConversation?: (conversationId: string) => void;
}

export function ChatSidebar({
  conversations,
  currentConversation,
  loading,
  onConversationClick,
  onNewChat,
  onDeleteConversation,
}: ChatSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        onClick={onNewChat}
        className="group relative px-2 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
        title="New Chat"
      >
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">New Chat</span>
        </div>
      </div>
      {loading ? (
        <ChatShimmer count={6} />
      ) : conversations.length > 0 ? (
        conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={currentConversation?.id === conversation.id}
            onClick={() => onConversationClick(conversation)}
            onDelete={onDeleteConversation}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-sm">No conversations yet</p>
          <p className="text-xs mt-1">Start a new chat to begin</p>
        </div>
      )}
    </div>
  );
}
