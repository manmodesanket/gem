"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Chat } from "@/components/Chat";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { conversationId } = useParams();

  return (
    <ProtectedRoute>
      <Chat key={conversationId as string} conversationId={conversationId as string} />
    </ProtectedRoute>
  );
}
