"use client";

import React, { useState } from "react";
import { ChatShimmer } from "@/components/ChatShimmer";
import { TodoTypeItem } from "@/components/TodoTypeItem";
import { TodoType } from "@/lib/todoService";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoSidebarProps {
  className?: string;
  todoTypes: TodoType[];
  currentTodoType: TodoType | null;
  loading: boolean;
  onTodoTypeClick: (todoType: TodoType) => void;
  onDeleteTodoType?: (todoTypeId: string) => void;
  onCreateTodoType?: (name: string, color?: string) => Promise<TodoType | null>;
}

export function TodoSidebar({
  todoTypes,
  currentTodoType,
  loading,
  onTodoTypeClick,
  onDeleteTodoType,
  onCreateTodoType,
}: TodoSidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const handleCreateTodoType = async () => {
    if (newTypeName.trim() && onCreateTodoType) {
      const newType = await onCreateTodoType(newTypeName.trim());
      if (newType) {
        setNewTypeName("");
        setIsCreating(false);
        onTodoTypeClick(newType);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateTodoType();
    } else if (e.key === "Escape") {
      setIsCreating(false);
      setNewTypeName("");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {isCreating ? (
        <div className="space-y-2">
          <Input
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter todo type name..."
            autoFocus
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleCreateTodoType}
              disabled={!newTypeName.trim()}
            >
              Create
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                setNewTypeName("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsCreating(true)}
          className="group relative px-2 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
          title="New Todo Type"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">New Todo Type</span>
          </div>
        </div>
      )}

      {loading ? (
        <ChatShimmer count={6} />
      ) : todoTypes.length > 0 ? (
        todoTypes.map((todoType) => (
          <TodoTypeItem
            key={todoType.id}
            todoType={todoType}
            isActive={currentTodoType?.id === todoType.id}
            onClick={() => onTodoTypeClick(todoType)}
            onDelete={onDeleteTodoType}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-sm">No todo types yet</p>
          <p className="text-xs mt-1">Create a new todo type to begin</p>
        </div>
      )}
    </div>
  );
} 