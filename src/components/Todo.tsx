"use client";

import { TodoList } from "@/components/TodoList";
import { TodoInput } from "@/components/TodoInput";
import { useTodos } from "@/hooks/useTodos";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface TodoProps {
  todoTypeId?: string;
}

export function Todo({ todoTypeId }: TodoProps) {
  const searchParams = useSearchParams();
  const isNewTodoType = searchParams.get("q") === "newTodoType";

  const {
    loadTodoType,
    loadTodoItems,
    currentTodoType,
    todoItems,
    createTodoItem,
    deleteTodoItem,
    toggleTodoItem,
  } = useTodos();

  const handleAddTodo = async (text: string) => {
    await createTodoItem(text, todoTypeId);
  };

  const handleDeleteTodo = async (todoItemId: string) => {
    await deleteTodoItem(todoItemId);
  };

  const handleToggleTodo = async (todoItemId: string) => {
    await toggleTodoItem(todoItemId);
  };

  // Load todo type and items when todoTypeId changes
  useEffect(() => {
    if (todoTypeId) {
      // Check if this is a new todo type with cached items
      if (isNewTodoType) {
        // Load the todo type and its items
        loadTodoType(todoTypeId as string).then(() => {
          loadTodoItems(todoTypeId as string);
        });
      } else {
        // Only load if the todo type changed (normal flow)
        if (currentTodoType?.id !== todoTypeId) {
          loadTodoType(todoTypeId as string).then(() => {
            loadTodoItems(todoTypeId as string);
          });
        }
      }
    }
  }, [todoTypeId, isNewTodoType]);

  return (
    <>
      {/* Todo content */}
      <div className="flex-1 flex flex-col items-center justify-between overflow-y-auto">
        <div className="w-full max-w-4xl p-4 space-y-4 mb-8">
          {currentTodoType ? (
            <>
              {/* Todo Type Header */}
              <div className="mb-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentTodoType.name}
                  </h1>
                </div>
                <p className="text-gray-600 mt-1">
                  Manage your {currentTodoType.name.toLowerCase()} todos
                </p>
              </div>

              {/* Todo List */}
              <TodoList
                todos={todoItems}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 mt-16">
              <h2 className="text-xl font-semibold mb-2">Welcome to Todos</h2>
              <p className="text-gray-600 mb-4">
                Select a todo type from the sidebar or create a new one to get
                started.
              </p>
              <div className="max-w-md mx-auto text-sm text-gray-500">
                <p className="mb-2">
                  💼 <strong>Work:</strong> Professional tasks and projects
                </p>
                <p>
                  🏠 <strong>Personal:</strong> Daily activities and personal
                  goals
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Todo Input - only show when a todo type is selected */}
      {currentTodoType && <TodoInput onAddTodo={handleAddTodo} />}
    </>
  );
}
