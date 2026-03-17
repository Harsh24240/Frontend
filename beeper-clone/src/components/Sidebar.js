// src/components/Sidebar.js
import React, { useState } from 'react';
import { PLATFORMS } from '../data/mockData';
import {
  BsWhatsapp,
  BsTelegram,
  BsInstagram,
  BsSlack,
  BsChatDotsFill,
} from 'react-icons/bs';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const PLATFORM_ICONS = {
  all:       <BsChatDotsFill size={18} color="#22c55e" />,
  whatsapp:  <BsWhatsapp    size={18} color="#25D366" />,
  telegram:  <BsTelegram    size={18} color="#2AABEE" />,
  instagram: <BsInstagram   size={18} color="#E1306C" />,
  slack:     <BsSlack       size={18} color="#9B59D0" />,
};

const CHAT_COUNTS = { all: null, whatsapp: 2, telegram: 2, instagram: 1, slack: 1 };

export default function Sidebar({ activePlatform, onSelectPlatform }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => setExpanded(e => !e)} title="Toggle sidebar">
        <div className="logo-orb">💬</div>
        {expanded && (
          <div className="logo-text-wrap">
            <div className="logo-name">Beeper</div>
            <div className="logo-sub">unified · v2.0</div>
          </div>
        )}
      </div>

      {expanded && (
        <div className="sidebar-section">
          <div className="sidebar-section-label">Platforms</div>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav">
        {PLATFORMS.map((p, i) => (
          <div
            key={p.id}
            className={`sidebar-item ${activePlatform === p.id ? 'active' : ''}`}
            onClick={() => onSelectPlatform(p.id)}
            title={p.label}
            style={{ animationDelay: `${0.05 * i + 0.2}s` }}
          >
            <div className="sidebar-item-icon">
              {PLATFORM_ICONS[p.id]}
            </div>
            {expanded && (
              <>
                <span className="sidebar-item-label">{p.label}</span>
                {CHAT_COUNTS[p.id] && (
                  <span className="sidebar-badge">{CHAT_COUNTS[p.id]}</span>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Toggle */}
      <div className="sidebar-toggle" onClick={() => setExpanded(e => !e)}>
        <span className="sidebar-toggle-icon">
          {expanded ? <MdChevronLeft size={18} /> : <MdChevronRight size={18} />}
        </span>
        {expanded && <span>Collapse</span>}
      </div>
    </aside>
  );
}
