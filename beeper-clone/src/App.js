// src/App.js
import React, { useState } from 'react';
import './App.css';
import { MOCK_CHATS } from './data/mockData';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [chats, setChats] = useState(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activePlatform, setActivePlatform] = useState('all');

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const handleSelectPlatform = (id) => {
    setActivePlatform(id);
    setActiveChatId(null);
  };

  const handleSendMessage = (chatId, text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChats(prev => prev.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            unread: 0,
            messages: [...chat.messages, { id: Date.now(), sender: 'me', text, time: timeStr }]
          }
        : chat
    ));
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    // Mark as read
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  return (
    <div className="app">
      <Sidebar
        activePlatform={activePlatform}
        onSelectPlatform={handleSelectPlatform}
      />
      <ChatList
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        activePlatform={activePlatform}
      />
      <ChatWindow
        chat={activeChat}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
