// src/components/ChatList.js
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  BsWhatsapp, BsTelegram, BsInstagram, BsSlack
} from 'react-icons/bs';

const PLATFORM_ICONS = {
  whatsapp:  <BsWhatsapp  size={11} color="#25D366" />,
  telegram:  <BsTelegram  size={11} color="#2AABEE" />,
  instagram: <BsInstagram size={11} color="#E1306C" />,
  slack:     <BsSlack     size={11} color="#9B59D0" />,
};

export default function ChatList({ chats, activeChatId, onSelectChat, activePlatform }) {
  const [query, setQuery] = useState('');

  const visible = chats.filter(chat => {
    const matchPlatform = activePlatform === 'all' || chat.platform === activePlatform;
    const q = query.toLowerCase();
    const matchSearch = !q ||
      chat.name.toLowerCase().includes(q) ||
      (chat.messages.at(-1)?.text || '').toLowerCase().includes(q);
    return matchPlatform && matchSearch;
  });

  const totalUnread = visible.reduce((s, c) => s + (c.unread || 0), 0);

  return (
    <div className="chat-list-panel">
      <div className="chat-list-header">
        <div className="chat-list-title-row">
          <span className="chat-list-title">
            {activePlatform === 'all'
              ? 'All Chats'
              : activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}
          </span>
          <span className="chat-list-count">{visible.length}</span>
        </div>
        <div className="search-wrap">
          <span className="search-icon"><BsSearch size={13} /></span>
          <input
            className="search-input"
            type="text"
            placeholder="Search conversations…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="chat-list-scroll">
        {visible.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-text">No chats found</div>
          </div>
        ) : (
          visible.map(chat => {
            const lastMsg = chat.messages.at(-1);
            const preview = lastMsg
              ? (lastMsg.sender === 'me' ? 'You: ' : '') + lastMsg.text
              : 'No messages';

            return (
              <div
                key={chat.id}
                className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
              >
                {/* Avatar */}
                <div className="chat-avatar">
                  {chat.online && <div className="online-ring" />}
                  <div
                    className="chat-avatar-inner"
                    style={{ background: chat.avatarColor }}
                  >
                    {chat.avatar}
                  </div>
                  <div className="platform-badge">
                    {PLATFORM_ICONS[chat.platform]}
                  </div>
                </div>

                {/* Meta */}
                <div className="chat-meta">
                  <div className="chat-name-row">
                    <span className="chat-name">{chat.name}</span>
                    <span className="chat-time">{lastMsg?.time || ''}</span>
                  </div>
                  <div className="chat-preview-row">
                    <span className="chat-preview">{preview}</span>
                    {chat.unread > 0 && (
                      <span className="unread-dot">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
