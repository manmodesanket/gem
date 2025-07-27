"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Todo } from "@/components/Todo";

export default function TodoPage() {
  return (
    <ProtectedRoute>
      <Todo key="new-todo-type" />
    </ProtectedRoute>
  );
} 