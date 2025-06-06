export const getBotResponse = async (userMessage: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = [
    "That's a great question! Let me think about that for a moment.",
    "I understand what you're asking. Here's what I think...",
    "Interesting perspective! I'd love to explore this topic further with you.",
    "Thanks for sharing that with me. I appreciate your thoughts.",
    "That's something I find fascinating too. What made you think of that?",
    "I can definitely help you with that. Let me break it down for you.",
    "You've raised an important point there. Here's my take on it...",
    "I'm glad you asked! This is actually a topic I'm quite passionate about.",
    "That's a thoughtful question. Let me give you a comprehensive answer.",
    "I appreciate you bringing this up. It's worth discussing in detail."
  ];
  
  // Simple keyword-based responses
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! It's wonderful to meet you. How can I assist you today?";
  }
  
  if (lowerMessage.includes('help')) {
    return "I'm here to help! Feel free to ask me anything - whether it's a question, you need advice, or just want to have a conversation.";
  }
  
  if (lowerMessage.includes('weather')) {
    return "I wish I could check the weather for you! While I don't have access to real-time weather data, I'd recommend checking your local weather app or website for the most accurate forecast.";
  }
  
  if (lowerMessage.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there anything specific you'd like to know about time management or scheduling?`;
  }
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
};