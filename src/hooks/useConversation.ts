"use client";

import { useState, useRef, useCallback } from 'react';
import { ConversationService, type Conversation, type Message } from '@/lib/conversationService';

// localStorage key for storing conversation messages
const CONVERSATION_STORAGE_KEY = 'pendingConversations';

interface StoredConversation {
  messages: Message[];
  title: string;
}

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

  // localStorage methods
  const saveConversationToStorage = (conversationId: string, messages: Message[], title: string) => {
    try {
      const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      const conversations = stored ? JSON.parse(stored) : {};
      conversations[conversationId] = { messages, title };
      localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversation to localStorage:', error);
    }
  };

  const loadConversationFromStorage = (conversationId: string): StoredConversation | null => {
    try {
      const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (!stored) return null;
      const conversations = JSON.parse(stored);
      return conversations[conversationId] || null;
    } catch (error) {
      console.error('Failed to load conversation from localStorage:', error);
      return null;
    }
  };

  const clearConversationFromStorage = (conversationId: string) => {
    try {
      const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (!stored) return;
      const conversations = JSON.parse(stored);
      delete conversations[conversationId];
      localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to clear conversation from localStorage:', error);
    }
  };

  // New method to load conversation with localStorage fallback
  const loadConversationWithCache = async (conversationId: string): Promise<Message[]> => {
    // First try localStorage
    const cached = loadConversationFromStorage(conversationId);
    if (cached) {
      // Clear from localStorage after loading
      clearConversationFromStorage(conversationId);
      
      // Set current conversation with cached title
      const conversation = { id: conversationId, title: cached.title, user_id: '', created_at: '', updated_at: '' };
      setCurrentConversationWithRef(conversation);
      
      return cached.messages;
    }
    
    // Fallback to database
    return loadConversation(conversationId);
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

  // Updated saveMessage to create conversation if none exists and save to localStorage
  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
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
      
      // Save first message to localStorage
      if (message) {
        saveConversationToStorage(thisConversation.id, [message], title);
      }
    } else if (role === 'assistant') {
      // Save assistant message to localStorage (append to existing messages)
      const stored = loadConversationFromStorage(thisConversation.id);
      if (stored && message) {
        const updatedMessages = [...stored.messages, message];
        saveConversationToStorage(thisConversation.id, updatedMessages, stored.title);
      }
    }
    
    return message;
  };

  const deleteConversation = async (conversationId: string) => {
    const success = await ConversationService.deleteConversation(conversationId);
    if (success) {
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      if (currentConversation?.id === conversationId) {
        setCurrentConversationWithRef(null);
      }
      // Also clear from localStorage
      clearConversationFromStorage(conversationId);
    }
    return success;
  };

  return {
    currentConversation,
    currentConversationRef,
    setCurrentConversation: setCurrentConversationWithRef,
    conversations,
    loading,
    createNewConversation,
    loadConversation,
    loadConversationWithCache,
    saveMessage,
    deleteConversation,
    loadConversations,
    saveConversationToStorage,
    clearConversationFromStorage
  };
}