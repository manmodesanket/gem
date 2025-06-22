"use client";

import { supabase } from "@/lib/supabase";

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export class ConversationService {
  // Create a new conversation
  static async createConversation(title?: string): Promise<Conversation | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title: title || 'New Chat'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    return data;
  }

  // Get all conversations for current user
  static async getUserConversations(): Promise<Conversation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    return data || [];
  }

  // Get a specific conversation with messages
  static async getConversationWithMessages(conversationId: string): Promise<ConversationWithMessages | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Get conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('user_id', user.id)
      .single();

    if (convError) {
      console.error('Error fetching conversation:', convError);
      return null;
    }

    // Get messages
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (msgError) {
      console.error('Error fetching messages:', msgError);
      return null;
    }

    return {
      ...conversation,
      messages: messages || []
    };
  }

  // Add a message to a conversation
  static async addMessage(conversationId: string, role: 'user' | 'assistant', content: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding message:', error);
      return null;
    }

    return data;
  }

  // Update conversation title
  static async updateConversationTitle(conversationId: string, title: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', conversationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating conversation title:', error);
      return false;
    }

    return true;
  }

  // Delete a conversation (and all its messages due to CASCADE)
  static async deleteConversation(conversationId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }

    return true;
  }

  // Generate a title from the first user message
  static generateTitleFromMessage(message: string): string {
    // Take first 50 characters and add ellipsis if longer
    const title = message.length > 50 ? message.substring(0, 50) + '...' : message;
    return title;
  }
} 