import React from "react";
import { Button } from "./ui/button";

interface ErrorMessageProps {
  error: any;
  reload: () => void;
}

export function ErrorMessage({ error, reload }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-start space-x-3">
        {/* Error Icon */}
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Error Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-red-700 mb-3">
            We encountered an error while processing your request. Please try
            again.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={reload}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-red-50 border-red-200 text-red-700 hover:text-red-800"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </Button>
      </div>
    </div>
  );
}
