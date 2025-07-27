"use client";

import React from "react";
import { TodoItem } from "@/lib/todoService";
import { Trash2, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (todoId: string) => void;
  onDelete: (todoId: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <Circle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">No todos yet</p>
        <p className="text-sm">Add your first todo using the input below</p>
      </div>
    );
  }

  // Sort todos: incomplete first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      // If both have same completion status, sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Incomplete todos first
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Todos ({todos.filter(t => !t.completed).length} remaining)
      </h3>
      
      {sortedTodos.map((todo) => (
        <div
          key={todo.id}
          className={`group flex items-center gap-3 p-3 rounded-lg border transition-colors ${
            todo.completed
              ? "bg-gray-50 border-gray-200"
              : "bg-white border-gray-300 hover:border-gray-400"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-green-500"
            }`}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </button>

          {/* Todo Text */}
          <span
            className={`flex-1 transition-colors ${
              todo.completed
                ? "text-gray-500 line-through"
                : "text-gray-900"
            }`}
          >
            {todo.text}
          </span>

          {/* Creation Date */}
          <span className="text-xs text-gray-400 flex-shrink-0">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
} 