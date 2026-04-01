# Xlon — Unified Messaging UI

A React prototype replicating the Beeper unified chat interface.

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **3-column layout**: collapsible sidebar, chat list, chat window
- **4 platforms**: WhatsApp, Telegram, Instagram, Slack
- **6 mock conversations** with realistic messages
- **Platform filtering**: click a platform in the sidebar to filter chats
- **"All Chats" view**: see all conversations across platforms
- **Real-time messaging**: send messages, they appear instantly
- **Search**: filter chats by name or message content
- **Auto-scroll**: chat window scrolls to latest message
- **Enter to send**: or Shift+Enter for a new line
- **Collapsible sidebar**: click the logo or ▶ button

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js       — Platform navigation (left column)
│   ├── ChatList.js      — Chat list with search (middle column)
│   ├── ChatWindow.js    — Message view + input (right column)
│   └── MessageBubble.js — Individual message bubble
├── data/
│   └── mockData.js      — Mock chats and messages
├── App.js               — Main state management
└── App.css              — All styles (CSS variables + layout)
```

## Tech Stack

- React 18 (functional components + hooks)
- Plain CSS with CSS variables (no Tailwind needed)
- Google Fonts: DM Sans + DM Mono
- Zero external dependencies beyond react-scripts
