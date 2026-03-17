// src/components/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import {
  BsWhatsapp, BsTelegram, BsInstagram, BsSlack
} from 'react-icons/bs';
import {
  MdCall, MdVideocam, MdInfoOutline,
  MdAttachFile, MdEmojiEmotions, MdSend
} from 'react-icons/md';

const PLATFORM_ICONS = {
  whatsapp:  <BsWhatsapp  size={12} />,
  telegram:  <BsTelegram  size={12} />,
  instagram: <BsInstagram size={12} />,
  slack:     <BsSlack     size={12} />,
};

export default function ChatWindow({ chat, onSendMessage }) {
  const [text, setText] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  // Reset & focus when chat changes
  useEffect(() => {
    setText('');
    if (chat) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [chat?.id]);

  if (!chat) {
    return (
      <div className="chat-window">
        <div className="chat-empty">
          <div className="chat-empty-orb">💬</div>
          <div className="chat-empty-title">Your messages, unified</div>
          <div className="chat-empty-sub">Select a conversation to get started</div>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(chat.id, trimmed);
    setText('');

    // Simulate typing indicator from them
    setShowTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setShowTyping(false), 2200);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const pillClass = `platform-pill pill-${chat.platform}`;

  return (
    <div className="chat-window" key={chat.id}>
      {/* Header */}
      <div className="chat-header">
        <div
          className="chat-header-avatar"
          style={{ background: chat.avatarColor }}
        >
          {chat.online && <div className="chat-header-online-ring" />}
          <span style={{ position: 'relative', zIndex: 1 }}>{chat.avatar}</span>
        </div>

        <div className="chat-header-info">
          <div className="chat-header-name">
            {chat.name}
          </div>
          <div className="chat-header-status">
            {chat.online && <><div className="status-dot" /><span>Active now</span></>}
            {!chat.online && <span style={{ color: 'var(--t3)' }}>Last seen recently</span>}
            <span style={{ color: 'var(--t4)' }}>·</span>
            <span className={pillClass}>
              {PLATFORM_ICONS[chat.platform]}
              &nbsp;{chat.platform}
            </span>
          </div>
        </div>

        <div className="chat-header-actions">
          <button className="hdr-btn" title="Voice call"><MdCall size={19} /></button>
          <button className="hdr-btn" title="Video call"><MdVideocam size={19} /></button>
          <button className="hdr-btn" title="Info"><MdInfoOutline size={19} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-area">
        <div className="date-chip">
          <div className="date-chip-line" />
          <div className="date-chip-text">Today</div>
          <div className="date-chip-line" />
        </div>

        {chat.messages.map((msg, i) => {
          const prev = chat.messages[i - 1];
          const showAvatar = !prev || prev.sender !== msg.sender;
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              chat={chat}
              showAvatar={showAvatar}
            />
          );
        })}

        {/* Typing indicator */}
        {showTyping && (
          <div className="typing-row">
            <div
              className="msg-avatar"
              style={{ background: chat.avatarColor }}
            >
              {chat.avatar.charAt(0)}
            </div>
            <div className="typing-bubble">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="input-area">
        <button className="input-icon-btn" title="Attach"><MdAttachFile size={20} /></button>
        <button className="input-icon-btn" title="Emoji"><MdEmojiEmotions size={20} /></button>

        <div className="message-input-wrap">
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder={`Message ${chat.name}…`}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>

        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!text.trim()}
          title="Send"
        >
          <MdSend size={18} />
        </button>
      </div>
    </div>
  );
}
