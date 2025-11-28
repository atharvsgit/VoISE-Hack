import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Plus, MessageSquare, User, Bot, Trash2 } from 'lucide-react';

export default function Chat() {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'ACL Reconstruction Query', timestamp: '2024-11-28' }
  ]);
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your surgical planning assistant. I can help answer questions about procedures, patient cases, and medical protocols. How can I assist you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: generateMockResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query) => {
    const responses = [
      'Based on the latest surgical guidelines, here\'s what I recommend...',
      'For this type of procedure, typical preparation includes...',
      'The success rate for this intervention is approximately 94% based on recent studies...',
      'Key considerations for this case would include patient age, medical history, and...',
      'Post-operative care typically involves a 6-week recovery period with...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewConversation = () => {
    const newConv = {
      id: conversations.length + 1,
      title: `New Conversation ${conversations.length + 1}`,
      timestamp: new Date().toISOString().split('T')[0]
    };
    setConversations([...conversations, newConv]);
    setActiveConversation(newConv.id);
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Hello! How can I assist you with surgical planning today?',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-[#0d1117] flex">
      {/* Sidebar - Conversation History */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-[#161b22] border-r border-[#30363d] flex flex-col"
      >
        <div className="p-4 border-b border-[#30363d]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewConversation}
            className="w-full flex items-center justify-center gap-2 bg-[#1f6feb] text-white py-2.5 rounded-md font-medium hover:bg-[#1a5dd9] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.map((conv) => (
            <motion.button
              key={conv.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveConversation(conv.id)}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                activeConversation === conv.id
                  ? 'bg-[#1f6feb]/10 border border-[#1f6feb]/20'
                  : 'hover:bg-[#21262d]'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-[#8b949e] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#f1f5f9] truncate">{conv.title}</p>
                  <p className="text-xs text-[#8b949e] mt-1">{conv.timestamp}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[#f1f5f9]">
                Surgical Assistant Chat
              </h1>
              <p className="text-sm text-[#8b949e] mt-0.5">
                AI-powered medical consultation
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#21262d] rounded-md transition-colors"
            >
              <Trash2 className="w-5 h-5 text-[#8b949e]" />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#1f6feb]/10 border border-[#1f6feb]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#1f6feb]" />
                  </div>
                )}
                <div
                  className={`max-w-2xl rounded-md p-4 ${
                    message.role === 'user'
                      ? 'bg-[#1f6feb] text-white'
                      : 'bg-[#161b22] border border-[#30363d] text-[#c9d1d9]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-[#8b949e]'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#f1f5f9]" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#1f6feb]/10 border border-[#1f6feb]/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#1f6feb]" />
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                    className="w-2 h-2 bg-[#8b949e] rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                    className="w-2 h-2 bg-[#8b949e] rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                    className="w-2 h-2 bg-[#8b949e] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#161b22] border-t border-[#30363d] p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about procedures, cases, or medical protocols..."
              className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3 text-[#f1f5f9] placeholder-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="bg-[#1f6feb] hover:bg-[#1a5dd9] text-white p-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

