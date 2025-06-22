"use client";

import React from "react";
import { Menu } from "lucide-react";

interface HamburgerMenuProps {
  onClick: () => void;
  className?: string;
}

export function HamburgerMenu({ onClick, className = "" }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      className={`md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6 text-gray-700" />
    </button>
  );
} 