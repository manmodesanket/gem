"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Chat } from "@/components/Chat";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <Chat key="new-chat" />
    </ProtectedRoute>
  );
}
