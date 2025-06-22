import React from "react";
import { Conversation } from "@/lib/conversationService";

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
}

export function ConversationItem({
  conversation,
  isActive = false,
}: ConversationItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-colors border ${
        isActive
          ? "bg-blue-50 border-blue-200"
          : "bg-white border-gray-100 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 truncate flex-1">
          {conversation.title || "New Chat"}
        </h3>
      </div>
    </div>
  );
}
