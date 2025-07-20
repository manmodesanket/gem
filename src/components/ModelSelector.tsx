"use client";

import { useEffect } from "react";
import { Sparkle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface ModelOption {
  id: string;
  name: string;
  displayName: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const models: ModelOption[] = [
  {
    id: "gemini-2.5-flash",
    name: "gemini-2.5-flash",
    displayName: "Gemini 2.5 Flash",
  },
  {
    id: "gpt-4o",
    name: "gpt-4o", 
    displayName: "GPT 4o",
  },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {


 const handleModelChange = (modelId: string) => {
    onModelChange(modelId);
    localStorage.setItem("selectedModel", modelId);
 }


  useEffect(() => {
    const savedModel = localStorage.getItem("selectedModel");
    if (savedModel) {
        handleModelChange(savedModel);
    }
  }, [])  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <Sparkle className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => handleModelChange(model.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm">{model.displayName}</span>
            {selectedModel === model.id && (
              <div className="h-2 w-2 rounded-full bg-purple-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 