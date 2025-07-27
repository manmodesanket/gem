"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface PageOption {
  id: string;
  name: string;
  path: string;
}

const pages: PageOption[] = [
  { id: "chats", name: "Chats", path: "/chat" },
  { id: "todo", name: "Todo", path: "/todo" },
];

export function PageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Determine current page based on pathname
  const getCurrentPage = () => {
    if (pathname.startsWith("/chat")) return pages[0];
    if (pathname.startsWith("/todo")) return pages[1];
    return pages[0]; // default to chats
  };

  const currentPage = getCurrentPage();

  const handlePageSelect = (page: PageOption) => {
    setIsOpen(false);
    router.push(page.path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 text-lg font-semibold text-gray-900 hover:text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentPage.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {pages.map((page) => (
              <button
                key={page.id}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                  currentPage.id === page.id
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handlePageSelect(page)}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 