// src/components/MessageBubble.js
import React from 'react';

export default function MessageBubble({ message, chat, showAvatar }) {
  const isMe = message.sender === 'me';

  return (
    <div className={`msg-row ${isMe ? 'me' : 'them'}`}>
      {!isMe && (
        showAvatar
          ? (
            <div
              className="msg-avatar"
              style={{ background: chat.avatarColor }}
            >
              {chat.avatar.charAt(0)}
            </div>
          )
          : <div className="msg-avatar-spacer" />
      )}

      <div className={`bubble-col ${isMe ? 'me' : ''}`}>
        {!isMe && message.senderName && showAvatar && (
          <span className="sender-label">{message.senderName}</span>
        )}

        <div className={`bubble ${isMe ? 'me' : 'them'}`}>
          {message.text}
        </div>

        <div className="bubble-time">
          {message.time}
          {isMe && <span className="tick">✓✓</span>}
        </div>
      </div>
    </div>
  );
}
