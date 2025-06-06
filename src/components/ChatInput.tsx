import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="flex items-end space-x-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       placeholder-gray-500 text-gray-800 resize-none min-h-[48px] max-h-32
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            style={{
              height: 'auto',
              minHeight: '48px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                     text-white rounded-xl shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 hover:scale-105 active:scale-95
                     flex items-center justify-center group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;