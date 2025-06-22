"use client";

import React, { useEffect } from "react";
import { ChatShimmer } from "@/components/ChatShimmer";
import { ConversationItem } from "@/components/ConversationItem";
import { Plus } from "lucide-react";
import { Conversation } from "@/lib/conversationService";
import { useConversation } from "@/hooks/useConversation";

interface ChatSidebarProps {
  className?: string;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  onConversationClick: (conversation: Conversation) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ className = "", conversations, currentConversation, loading, onConversationClick, onNewChat }: ChatSidebarProps) {

  return (
    <div className={`hidden md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-screen ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="New Chat"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <ChatShimmer count={6} />
        ) : conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={currentConversation?.id === conversation.id}
              onClick={() => onConversationClick(conversation)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Start a new chat to begin</p>
          </div>
        )}
      </div>
    </div>
  );
} 