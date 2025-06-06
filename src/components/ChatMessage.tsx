import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
          : 'bg-gradient-to-br from-green-500 to-teal-600'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      
      <div className={`flex flex-col max-w-xs lg:max-w-md ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md'
            : 'bg-white/10 text-gray-800 rounded-bl-md border border-white/20'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <span className={`text-xs text-gray-500 mt-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;