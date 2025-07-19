import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center z-10"
    >
      <div className="w-full max-w-4xl p-4 h-full flex items-center">
        {/* Custom input container that looks like textarea with button inside */}
        <div className="relative flex-1 h-full">
          <div
            className={
              "flex flex-col rounded-md border border-input bg-background px-3 py-2"
            }
          >
            {/* Input field */}
            <div className="flex-1 min-h-14 max-h-48 w-full">
              <textarea
                name="gem-chat"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="flex-1 w-full h-full min-h-12 max-h-48 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                rows={1}
              />
            </div>

            {/* Send button inside the input */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className="ml-2 h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white hover:from-purple-500 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 disabled:hover:from-gray-300 disabled:hover:to-gray-300 flex-shrink-0"
              >
                {isLoading ? (
                  <LoaderCircle className="h-4 w-4 text-white animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
