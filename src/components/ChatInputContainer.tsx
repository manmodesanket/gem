import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatInputContainerProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

export function ChatInputContainer({
  input,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  isLoading,
}: ChatInputContainerProps) {
  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center z-10 border-t" style={{ height: 96 }}>
      <div className="flex space-x-4 w-1/2 min-w-[300px] p-4 h-full items-center">
        <Textarea
          name="gem-chat"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 h-full"
          rows={1}
        />
        <Button type="submit" disabled={isLoading}>Send</Button>
      </div>
    </form>
  );
} 