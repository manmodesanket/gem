"use client";

import { useState, useRef } from "react";
import { TodoService, TodoType, TodoItem } from "@/lib/todoService";

export function useTodos() {
  const [todoTypes, setTodoTypes] = useState<TodoType[]>([]);
  const [currentTodoType, setCurrentTodoType] = useState<TodoType | null>(null);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const currentTodoTypeRef = useRef<TodoType | null>(null);

  // Update ref when current todo type changes
  const updateCurrentTodoType = (todoType: TodoType | null) => {
    currentTodoTypeRef.current = todoType;
    setCurrentTodoType(todoType);
  };

  // Load all todo types
  const loadTodoTypes = async () => {
    setLoading(true);
    try {
      const types = await TodoService.getTodoTypes();
      setTodoTypes(types);
    } catch (error) {
      console.error("Error loading todo types:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific todo type
  const loadTodoType = async (todoTypeId: string) => {
    try {
      const todoType = await TodoService.getTodoType(todoTypeId);
      if (todoType) {
        updateCurrentTodoType(todoType);
        // Also load the todo items for this type
        const items = await TodoService.getTodoItems(todoTypeId);
        setTodoItems(items);
      }
      return todoType;
    } catch (error) {
      console.error("Error loading todo type:", error);
      return null;
    }
  };

  // Create a new todo type
  const createTodoType = async (name: string, color?: string) => {
    try {
      const newTodoType = await TodoService.saveTodoType({ name, color });
      
      if (newTodoType) {
        // Update the todo types list
        setTodoTypes(prev => [...prev, newTodoType]);
        updateCurrentTodoType(newTodoType);
      }
      
      return newTodoType;
    } catch (error) {
      console.error("Error creating todo type:", error);
      return null;
    }
  };

  // Delete a todo type
  const deleteTodoType = async (todoTypeId: string) => {
    try {
      const success = await TodoService.deleteTodoType(todoTypeId);
      if (success) {
        setTodoTypes(prev => prev.filter(type => type.id !== todoTypeId));
        // If we deleted the current todo type, clear it
        if (currentTodoType?.id === todoTypeId) {
          updateCurrentTodoType(null);
          setTodoItems([]);
        }
      }
      return success;
    } catch (error) {
      console.error("Error deleting todo type:", error);
      return false;
    }
  };

  // Load todo items for current type
  const loadTodoItems = async (todoTypeId?: string) => {
    try {
      const typeId = todoTypeId || currentTodoType?.id;
      if (typeId) {
        const items = await TodoService.getTodoItems(typeId);
        setTodoItems(items);
        return items;
      }
      return [];
    } catch (error) {
      console.error("Error loading todo items:", error);
      return [];
    }
  };

  // Create a new todo item
  const createTodoItem = async (text: string, todoTypeId?: string) => {
    try {
      const typeId = todoTypeId || currentTodoType?.id;
      if (!typeId) {
        throw new Error("No todo type selected");
      }

      const newTodoItem = await TodoService.saveTodoItem({
        text,
        completed: false,
        todoTypeId: typeId,
      });

      if (newTodoItem) {
        // Update the todo items list
        setTodoItems(prev => [...prev, newTodoItem]);
      }
      
      return newTodoItem;
    } catch (error) {
      console.error("Error creating todo item:", error);
      return null;
    }
  };

  // Update a todo item
  const updateTodoItem = async (todoItemId: string, updates: Partial<Omit<TodoItem, 'id' | 'createdAt' | 'userId'>>) => {
    try {
      const success = await TodoService.updateTodoItem(todoItemId, updates);
      if (success) {
        setTodoItems(prev => 
          prev.map(item => 
            item.id === todoItemId ? { ...item, ...updates } : item
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Error updating todo item:", error);
      return false;
    }
  };

  // Delete a todo item
  const deleteTodoItem = async (todoItemId: string) => {
    try {
      const success = await TodoService.deleteTodoItem(todoItemId);
      if (success) {
        setTodoItems(prev => prev.filter(item => item.id !== todoItemId));
      }
      return success;
    } catch (error) {
      console.error("Error deleting todo item:", error);
      return false;
    }
  };

  // Toggle todo item completion
  const toggleTodoItem = async (todoItemId: string) => {
    const todoItem = todoItems.find(item => item.id === todoItemId);
    if (todoItem) {
      return updateTodoItem(todoItemId, { completed: !todoItem.completed });
    }
    return false;
  };

  return {
    // State
    todoTypes,
    currentTodoType,
    todoItems,
    loading,
    currentTodoTypeRef,

    // Actions
    setCurrentTodoType: updateCurrentTodoType,
    loadTodoTypes,
    loadTodoType,
    createTodoType,
    deleteTodoType,
    loadTodoItems,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
    toggleTodoItem,
  };
} 