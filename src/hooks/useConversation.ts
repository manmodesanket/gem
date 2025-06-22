"use client";

import { useState, useCallback } from 'react';
import { ConversationService, type Conversation, type Message } from '@/lib/conversationService';

export function useConversation() {
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  

  // Remove automatic loading - only load when explicitly called

  const loadConversations = async () => {
    setLoading(true);
    const userConversations = await ConversationService.getUserConversations();
    setConversations(userConversations);
    setLoading(false);
  };

  const createNewConversation = useCallback(async (title?: string) => {
    const conversation = await ConversationService.createConversation(title);
    if (conversation) {
      setConversations(prev => [conversation, ...prev]);
    }
    return conversation;
  }, []);

  const loadConversation = async (conversationId: string): Promise<Message[]> => {
    const conversationWithMessages = await ConversationService.getConversationWithMessages(conversationId);
    if (conversationWithMessages) {
      return conversationWithMessages.messages;
    }
    return [];
  };

  // Updated saveMessage to create conversation if none exists
  const saveMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    // Get the most current conversation state from ref
    let thisConversation = currentConversation;
    
    // If no conversation exists, create one first
    if (!thisConversation) {
      thisConversation = await createNewConversation();
      if (!thisConversation) return null;
    }
    
    const message = await ConversationService.addMessage(thisConversation.id, role, content);
    
    // If this is the first user message, update the conversation title
    if (role === 'user' && (!thisConversation.title || thisConversation.title === 'New Chat')) {
      const title = ConversationService.generateTitleFromMessage(content);
      await ConversationService.updateConversationTitle(thisConversation.id, title);
      
      // Update the conversation in the list
      setConversations(prev => prev.map(conv => 
        conv.id === thisConversation!.id ? { ...conv, title } : conv
      ));
    }
    
    return message;
  }, [createNewConversation]);

  const deleteConversation = async (conversationId: string) => {
    const success = await ConversationService.deleteConversation(conversationId);
    if (success) {
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    }
    return success;
  };

  return {
    currentConversation,
    conversations,
    loading,
    createNewConversation,
    loadConversation,
    saveMessage,
    deleteConversation,
    loadConversations
  };
}