
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from "@google/genai";
import { Message, Role } from '../types';
import { createChatSession } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import SuggestedPrompts from './SuggestedPrompts';

const ChatWindow: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const newChat = createChatSession();
      setChat(newChat);
    } catch (error) {
      console.error("Failed to initialize chat session:", error);
      setMessages([{ role: Role.ERROR, content: "Error: Could not initialize AI assistant. Please check your API key and refresh the page." }]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { role: Role.USER, content: messageText };
    setMessages(prev => [...prev, userMessage]);

    try {
      const stream = await chat.sendMessageStream({ message: messageText });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: Role.MODEL, content: '...' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: Role.ERROR, content: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && <SuggestedPrompts onPromptClick={handlePromptClick} />}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
         {isLoading && messages[messages.length - 1]?.role !== Role.MODEL && (
            <ChatMessage message={{ role: Role.MODEL, content: "..."}} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
