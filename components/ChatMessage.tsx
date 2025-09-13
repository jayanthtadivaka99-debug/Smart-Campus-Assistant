
import React from 'react';
import { Message, Role } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const isModel = message.role === Role.MODEL;
  const isError = message.role === Role.ERROR;

  const wrapperClasses = `flex items-start space-x-3 my-4 ${isUser ? 'justify-end' : ''}`;
  const messageClasses = `p-3 rounded-lg max-w-lg ${
    isUser
      ? 'bg-blue-600 text-white'
      : isError
      ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
  }`;

  return (
    <div className={wrapperClasses}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
          <BotIcon />
        </div>
      )}
      <div className={messageClasses}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
