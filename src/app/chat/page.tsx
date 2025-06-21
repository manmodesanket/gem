"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/Messages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChatInputContainer } from "@/components/ChatInputContainer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

function ChatPageContent() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, status } = useChat({});
  const { user, signOut } = useAuth();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Gem AI</h1>
          <span className="text-sm text-gray-600">
            Welcome, {user?.user_metadata?.username || user?.email}
          </span>
        </div>
        <Button 
          variant="outline" 
          onClick={signOut}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </div>

      {/* Chat content */}
      <div
        className="flex-1 flex flex-col items-center justify-between overflow-y-scroll"
        style={{ height: "calc(100vh - 96px - 64px)" }}
      >
        <div className="w-1/2 min-w-[300px] p-4 space-y-4 mb-8">
          <Messages messages={messages} isLoading={status === 'submitted'}/>
        </div>
        <ErrorMessage error={error} reload={reload} />
      </div>
      <ChatInputContainer
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />
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
