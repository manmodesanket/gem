"use client";

import React from "react";
import { X } from "lucide-react";
import { TodoSidebar } from "@/components/TodoSidebar";
import { TodoType } from "@/lib/todoService";

interface MobileTodoSidebarProps {
  todoTypes: TodoType[];
  currentTodoType: TodoType | null;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onTodoTypeClick: (todoType: TodoType) => void;
  onNewTodoType?: () => void;
  onDeleteTodoType?: (todoTypeId: string) => void;
  onCreateTodoType?: (name: string, color?: string) => Promise<TodoType | null>;
}

export function MobileTodoSidebar({
  todoTypes,
  currentTodoType,
  loading,
  isOpen,
  onClose,
  onTodoTypeClick,
  onNewTodoType,
  onDeleteTodoType,
  onCreateTodoType,
}: MobileTodoSidebarProps) {
  const handleTodoTypeClick = (todoType: TodoType) => {
    onTodoTypeClick(todoType);
    onClose(); // Close sidebar after selection on mobile
  };

  const handleNewTodoType = () => {
    if (onNewTodoType) {
      onNewTodoType();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Todos</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <TodoSidebar
          todoTypes={todoTypes}
          currentTodoType={currentTodoType}
          loading={loading}
          onTodoTypeClick={handleTodoTypeClick}
          onDeleteTodoType={onDeleteTodoType}
          onCreateTodoType={onCreateTodoType}
        />
      </div>
    </div>
  );
} 