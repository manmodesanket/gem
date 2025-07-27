import { supabase } from "@/lib/supabase";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  todoTypeId: string;
  userId: string;
}

export interface TodoType {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
  userId: string;
}

export class TodoService {
  // Todo Types Management
  static async getTodoTypes(): Promise<TodoType[]> {
    // RLS policies automatically filter by auth.uid(), no need to manually filter
    const { data, error } = await supabase
      .from('todo_types')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todo types:', error);
      return [];
    }

    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      color: item.color,
      createdAt: new Date(item.created_at),
      userId: item.user_id,
    }));
  }

  static async saveTodoType(todoType: Omit<TodoType, 'id' | 'createdAt' | 'userId'>): Promise<TodoType | null> {
    // For inserts, we need to get the user ID once, but RLS will also validate it
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('todo_types')
      .insert([{
        name: todoType.name,
        color: todoType.color,
        user_id: user.id,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating todo type:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      color: data.color,
      createdAt: new Date(data.created_at),
      userId: data.user_id,
    };
  }

  static async deleteTodoType(todoTypeId: string): Promise<boolean> {
    // RLS policies automatically ensure user can only delete their own data
    // First delete all todos of this type
    await supabase
      .from('todos')
      .delete()
      .eq('todo_type_id', todoTypeId);

    // Then delete the todo type
    const { error } = await supabase
      .from('todo_types')
      .delete()
      .eq('id', todoTypeId);

    if (error) {
      console.error('Error deleting todo type:', error);
      return false;
    }

    return true;
  }

  static async getTodoType(todoTypeId: string): Promise<TodoType | null> {
    // RLS policies automatically filter by user
    const { data, error } = await supabase
      .from('todo_types')
      .select('*')
      .eq('id', todoTypeId)
      .single();

    if (error) {
      console.error('Error fetching todo type:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      color: data.color,
      createdAt: new Date(data.created_at),
      userId: data.user_id,
    };
  }

  // Todo Items Management
  static async getTodoItems(todoTypeId?: string): Promise<TodoItem[]> {
    // RLS policies automatically filter by user
    let query = supabase
      .from('todos')
      .select('*');

    if (todoTypeId) {
      query = query.eq('todo_type_id', todoTypeId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
      return [];
    }

    return (data || []).map(item => ({
      id: item.id,
      text: item.text,
      completed: item.completed,
      createdAt: new Date(item.created_at),
      todoTypeId: item.todo_type_id,
      userId: item.user_id,
    }));
  }

  static async saveTodoItem(todoItem: Omit<TodoItem, 'id' | 'createdAt' | 'userId'>): Promise<TodoItem | null> {
    // For inserts, we need to get the user ID once, but RLS will also validate it
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('todos')
      .insert([{
        text: todoItem.text,
        completed: todoItem.completed,
        todo_type_id: todoItem.todoTypeId,
        user_id: user.id,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      return null;
    }

    return {
      id: data.id,
      text: data.text,
      completed: data.completed,
      createdAt: new Date(data.created_at),
      todoTypeId: data.todo_type_id,
      userId: data.user_id,
    };
  }

  static async updateTodoItem(todoItemId: string, updates: Partial<Omit<TodoItem, 'id' | 'createdAt' | 'userId'>>): Promise<boolean> {
    // RLS policies automatically ensure user can only update their own todos
    const updateData: any = {};
    if (updates.text !== undefined) updateData.text = updates.text;
    if (updates.completed !== undefined) updateData.completed = updates.completed;
    if (updates.todoTypeId !== undefined) updateData.todo_type_id = updates.todoTypeId;

    const { error } = await supabase
      .from('todos')
      .update(updateData)
      .eq('id', todoItemId);

    if (error) {
      console.error('Error updating todo:', error);
      return false;
    }

    return true;
  }

  static async deleteTodoItem(todoItemId: string): Promise<boolean> {
    // RLS policies automatically ensure user can only delete their own todos
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoItemId);

    if (error) {
      console.error('Error deleting todo:', error);
      return false;
    }

    return true;
  }
} 