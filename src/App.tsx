import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import { Message, ChatState } from './types/chat';
import { getBotResponse } from './utils/chatbot';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: "Hello! I'm your AI assistant. I'm here to help answer questions, have conversations, and assist you with various tasks. What would you like to talk about today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ],
    isTyping: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      const botResponseContent = await getBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: 'bot',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error('Error getting bot response:', error);
      setChatState(prev => ({
        ...prev,
        isTyping: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <span>AI Chat Assistant</span>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </h1>
              <p className="text-sm text-gray-600">Always ready to help and chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        >
          <div className="max-w-4xl mx-auto">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {chatState.isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={chatState.isTyping}
        />
      </div>
    </div>
  );
}

export default App;