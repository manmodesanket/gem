"use client";

import { useState, useRef, useCallback } from 'react';
import { ConversationService, ConversationWithMessages, type Conversation, type Message } from '@/lib/conversationService';
import { User } from '@supabase/supabase-js';

export function useConversation() {
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Use ref to always have access to the current conversation
  const currentConversationRef = useRef<Conversation | null>(null);
  
  // Update ref whenever currentConversation changes
  const setCurrentConversationWithRef = (conversation: Conversation | null) => {
    currentConversationRef.current = conversation;
    setCurrentConversation(conversation);
  };

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
      setCurrentConversationWithRef(conversation);
      setConversations(prev => [conversation, ...prev]);
    }
    return conversation;
  }, []);

  const loadConversation = async (conversationId: string): Promise<Message[]> => {
    const conversationWithMessages = await ConversationService.getConversationWithMessages(conversationId);
    if (conversationWithMessages) {
      setCurrentConversationWithRef(conversationWithMessages);
      return conversationWithMessages.messages;
    }
    return [];
  };

  // Updated saveMessage to create conversation if none exists
  const saveMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    // Get the most current conversation state from ref
    let thisConversation = currentConversationRef.current;
    
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
      setCurrentConversationWithRef({ ...thisConversation, title });
      
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
      if (currentConversation?.id === conversationId) {
        setCurrentConversationWithRef(null);
      }
    }
    return success;
  };

  return {
    currentConversation,
    setCurrentConversation: setCurrentConversationWithRef,
    conversations,
    loading,
    createNewConversation,
    loadConversation,
    saveMessage,
    deleteConversation,
    loadConversations
  };
}