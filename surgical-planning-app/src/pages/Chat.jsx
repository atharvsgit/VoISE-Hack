import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, MessageSquare, User, Bot, Trash2 } from 'lucide-react';

export default function Chat() {
  const [conversations, setConversations] = useState([{ id: 1, title: 'ACL Reconstruction', timestamp: '2024-11-28' }]);
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello. I can help with surgical planning, case review, and protocol questions.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: userMessage.id + 1,
        role: 'assistant',
        content: generateMockResponse(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleNewConversation = () => {
    const newId = conversations.length + 1;
    const newConversation = {
      id: newId,
      title: `Conversation ${newId}`,
      timestamp: new Date().toISOString().split('T')[0],
    };
    setConversations((prev) => [...prev, newConversation]);
    setActiveConversation(newId);
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'New conversation created. How can I help?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Conversation cleared. Ask your question to begin.',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            type="button"
            onClick={handleNewConversation}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700"
          >
            <Plus className="w-4 h-4" />
            New conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setActiveConversation(conversation.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-gray-100 ${
                activeConversation === conversation.id ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{conversation.title}</p>
                <p className="text-xs text-gray-500">{conversation.timestamp}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex-1 flex flex-col">
        <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Assistant</p>
            <h1 className="text-lg font-semibold text-gray-900">Clinical chat</h1>
            <p className="text-sm text-gray-500">For internal use within the surgical team.</p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-md px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Bot className="w-4 h-4 text-gray-500" />
              Assistant is drafting a reply…
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Document your question or case details…"
              rows={2}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 resize-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function generateMockResponse() {
  const responses = [
    'Consider reviewing imaging again before final fixation. Would you like a checklist?',
    'Recommendation recorded. Ensure patient consent reflects the updated plan.',
    'Refer to the enhanced recovery protocol for guidance on this case.',
    'I noted a similar patient outcome last quarter with good results after early mobilization.',
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}