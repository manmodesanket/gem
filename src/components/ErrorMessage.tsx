import React from "react";

interface ErrorMessageProps {
  error: any;
  reload: () => void;
}

export function ErrorMessage({ error, reload }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="w-1/2 min-w-[300px]">
      <div>An error occurred.</div>
      <button type="button" onClick={reload}>
        Retry
      </button>
    </div>
  );
} 