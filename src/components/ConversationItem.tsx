import React from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Conversation } from "@/lib/conversationService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick: () => void;
  onDelete?: (conversationId: string) => void;
}

export function ConversationItem({
  conversation,
  isActive = false,
  onClick,
  onDelete,
}: ConversationItemProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(conversation.id);
    }
  };

  return (
    <div
      className={`group relative p-3 rounded-lg cursor-pointer transition-colors border ${
        isActive
          ? "bg-blue-50 border-blue-200"
          : "bg-white border-gray-100 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 truncate flex-1 group-hover:text-gray-700 transition-colors">
          {conversation.title || "New Chat"}
        </h3>

        {/* Three dots menu - only show on hover or when active */}
        <div
          className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isActive ? "opacity-100" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded hover:bg-gray-200 transition-colors"
                aria-label="Conversation options"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleDelete}
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
