"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeader";
import { TodoSidebar } from "@/components/TodoSidebar";
import { MobileTodoSidebar } from "@/components/MobileTodoSidebar";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { PageSelector } from "@/components/PageSelector";
import { useTodos } from "@/hooks/useTodos";
import { TodoType } from "@/lib/todoService";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    currentTodoType,
    todoTypes,
    loadTodoTypes,
    loading,
    setCurrentTodoType,
    loadTodoType,
    deleteTodoType,
    createTodoType,
  } = useTodos();

  const handleTodoTypeClick = async (todoType: TodoType) => {
    setCurrentTodoType(todoType);
    router.push(`/todo/${todoType.id}`);
  };

  const handleNewTodoType = async () => {
    setCurrentTodoType(null);
    router.push("/todo");
  };

  const handleDeleteTodoType = async (todoTypeId: string) => {
    const success = await deleteTodoType(todoTypeId);
    if (success) {
      // If we deleted the current todo type, navigate to new todo type
      if (currentTodoType?.id === todoTypeId) {
        setCurrentTodoType(null);
        router.push("/todo");
      }
    }
  };

  // Load todo types on component mount
  useEffect(() => {
    if (todoTypes.length === 0) {
      loadTodoTypes();
    }
  }, []);

  // Handle URL changes to update current todo type
  useEffect(() => {
    const todoTypeIdMatch = pathname.match(/^\/todo\/(.+)$/);

    if (todoTypeIdMatch) {
      const todoTypeId = todoTypeIdMatch[1];

      // If the URL shows a todo type that's different from current, update it
      if (currentTodoType?.id !== todoTypeId) {
        // Find the todo type in the list first
        const existingTodoType = todoTypes.find(
          (type) => type.id === todoTypeId,
        );

        if (existingTodoType) {
          setCurrentTodoType(existingTodoType);
        } else {
          // If not found in list, load it and refresh todo types
          loadTodoType(todoTypeId).then(() => {
            loadTodoTypes(); // Refresh the list to include the new todo type
          });
        }
      }
    } else if (pathname === "/todo") {
      // On new todo type, clear current todo type if it exists
      if (currentTodoType) {
        setCurrentTodoType(null);
      }
    }
  }, [pathname]);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-screen">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <PageSelector />
          </div>
        </div>
        <TodoSidebar
          todoTypes={todoTypes}
          currentTodoType={currentTodoType}
          loading={loading}
          onTodoTypeClick={handleTodoTypeClick}
          onDeleteTodoType={handleDeleteTodoType}
          onCreateTodoType={createTodoType}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileTodoSidebar
        todoTypes={todoTypes}
        currentTodoType={currentTodoType}
        loading={loading}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onTodoTypeClick={handleTodoTypeClick}
        onNewTodoType={handleNewTodoType}
        onDeleteTodoType={handleDeleteTodoType}
      />

      {/* Main Todo Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          {/* Hamburger Menu for Mobile */}
          <HamburgerMenu onClick={() => setIsMobileSidebarOpen(true)} />

          {/* Current Todo Type Title */}
          <div className="flex-1 text-center md:text-left md:ml-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentTodoType?.name || "New Todo Type"}
            </h2>
          </div>

          {/* User avatar dropdown */}
          <AuthHeader />
        </div>

        {/* Todo Content */}
        {children}
      </div>
    </div>
  );
} 