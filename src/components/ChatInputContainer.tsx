"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { ModelSelector } from "@/components/ModelSelector";

interface ChatInputContainerProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatInputContainer({
  input,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  isLoading,
  selectedModel,
  onModelChange,
}: ChatInputContainerProps) {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(input);

  // Sync external input with internal content
  useEffect(() => {
    if (input !== content) {
      setContent(input);
      if (contentEditableRef.current) {
        contentEditableRef.current.textContent = input;
      }
    }
  }, [input]);

  // Handle content changes
  const handleContentChange = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.textContent || "";
      setContent(newContent);

      // Create a synthetic event to maintain compatibility with existing handler
      const syntheticEvent = {
        target: { value: newContent },
        currentTarget: { value: newContent },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      handleInputChange(syntheticEvent);
    }
  };

  // Handle keyboard events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Cmd+Enter or Ctrl+Enter for new line
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      // Insert a new line at cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
        handleContentChange();
      }
      return;
    }

    // Regular Enter to submit
    if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      if (!isLoading && content.trim()) {
        const form = e.currentTarget.closest("form");
        if (form) {
          const formEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          form.dispatchEvent(formEvent);
        }
      }
      return;
    }

    // Create synthetic event for compatibility with existing handler
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: content },
      currentTarget: { ...e.currentTarget, value: content },
    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

    handleKeyDown(syntheticEvent);
  };

  // Handle paste events to maintain plain text
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      handleContentChange();
    }
  };

  // Clear content when form is submitted successfully
  useEffect(() => {
    if (input === "" && content !== "") {
      setContent("");
      if (contentEditableRef.current) {
        contentEditableRef.current.textContent = "";
      }
    }
  }, [input, content]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center z-10">
      <div className="w-full max-w-4xl p-4 h-full flex items-center">
        {/* Custom input container that looks like textarea with button inside */}
        <div className="relative flex-1 h-full">
          <div
            className={
              "flex flex-col rounded-md border border-input bg-background px-3 py-2"
            }
          >
            {/* ContentEditable input field */}
            <div className="flex-1 min-h-14 max-h-48 w-full overflow-y-auto">
              <div
                ref={contentEditableRef}
                contentEditable
                onInput={handleContentChange}
                onKeyDown={handleKeyPress}
                onPaste={handlePaste}
                className="flex-1 w-full min-h-12 max-h-48 bg-transparent text-sm outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 whitespace-pre-wrap break-words"
                data-placeholder="Ask anything"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
                suppressContentEditableWarning={true}
              />
            </div>

            {/* Model selector and Send button inside the input */}
            <div className="flex justify-end items-center gap-2">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={onModelChange}
              />
              <Button
                type="submit"
                disabled={isLoading || !content.trim()}
                size="icon"
                className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white hover:from-purple-500 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 disabled:hover:from-gray-300 disabled:hover:to-gray-300 flex-shrink-0"
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
