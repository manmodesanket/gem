"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center justify-center">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new todo..."
              className="resize-none min-h-[44px] max-h-32"
              rows={1}
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim()}
            className="flex-shrink-0"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Todo
          </Button>
        </form>
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to add, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
} 