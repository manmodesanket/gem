"use client";

import React from "react";
import { X, Plus } from "lucide-react";
import { ChatShimmer } from "@/components/ChatShimmer";
import { ConversationItem } from "@/components/ConversationItem";
import { Conversation } from "@/lib/conversationService";

interface MobileChatSidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConversationClick: (conversation: Conversation) => void;
  onNewChat?: () => void;
  onDeleteConversation?: (conversationId: string) => void;
}

export function MobileChatSidebar({
  isOpen,
  onClose,
  conversations,
  currentConversation,
  loading,
  onConversationClick,
  onNewChat,
  onDeleteConversation,
}: MobileChatSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* New Chat Option */}
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
      </div>
    </>
  );
}
