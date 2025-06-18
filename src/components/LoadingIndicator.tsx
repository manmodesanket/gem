import { useState, useEffect } from "react";

export function LoadingIndicator() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === ".") return "..";
        if (prevDots === "..") return "...";
        return ".";
      });
    }, 500); // Change dots every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-start mb-4">
      <div className="text-gray-900 rounded-lg px-4 py-2 max-w-[70%]">
        <span className="text-gray-600">Loading{dots}</span>
      </div>
    </div>
  );
} 