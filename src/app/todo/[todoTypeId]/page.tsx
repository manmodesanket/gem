"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Todo } from "@/components/Todo";
import { useParams } from "next/navigation";

export default function TodoTypePage() {
  const { todoTypeId } = useParams();

  return (
    <ProtectedRoute>
      <Todo key={todoTypeId as string} todoTypeId={todoTypeId as string} />
    </ProtectedRoute>
  );
} 