import React from "react";

interface ChatShimmerProps {
  count?: number;
}

export function ChatShimmer({ count = 8 }: ChatShimmerProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-3 rounded-lg bg-white border border-gray-100 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 mr-2"></div>
            <div className="h-3 w-8 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
}
