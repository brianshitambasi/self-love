// src/components/GoDiamondPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import GoDiamond from './GoDiamond';

const GoDiamondPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConvId, setCurrentConvId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const DAILY_LIMIT = 100; // max messages per day (example)

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('brianbot_conversations');
    if (stored) {
      const convs = JSON.parse(stored);
      setConversations(convs);
      if (convs.length > 0) setCurrentConvId(convs[0].id);
    } else {
      // Create a default conversation
      const defaultConv = {
        id: Date.now(),
        title: 'New Chat',
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: 1,
            text: "🤖 Welcome to BrianBot! 🤖\n\nI'm Brian Shitambasi's personal AI assistant. I'm here to help you with:\n\n💎 Network Marketing Success\n💻 Full Stack Development\n📈 Business Growth Strategies\n💰 Financial Freedom\n🤝 Combining Tech + Network Marketing\n\nWhat would you like to know today?",
            sender: 'bot',
            timestamp: new Date().toISOString()
          }
        ]
      };
      setConversations([defaultConv]);
      setCurrentConvId(defaultConv.id);
      localStorage.setItem('brianbot_conversations', JSON.stringify([defaultConv]));
    }
  }, []);

  // Save conversations whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('brianbot_conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Update message count for the current conversation
  useEffect(() => {
    const conv = conversations.find(c => c.id === currentConvId);
    if (conv) {
      const userMessages = conv.messages.filter(m => m.sender === 'user').length;
      setMessageCount(userMessages);
    }
  }, [currentConvId, conversations]);

  const startNewChat = () => {
    const newId = Date.now();
    const newConv = {
      id: newId,
      title: `Chat ${conversations.length + 1}`,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 1,
          text: "✨ New conversation started! ✨\n\nHow can BrianBot help you today?",
          sender: 'bot',
          timestamp: new Date().toISOString()
        }
      ]
    };
    setConversations([newConv, ...conversations]);
    setCurrentConvId(newId);
  };

  const deleteConversation = (id) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    if (currentConvId === id && updated.length > 0) {
      setCurrentConvId(updated[0].id);
    } else if (updated.length === 0) {
      startNewChat();
    }
  };

  const renameConversation = (id, newTitle) => {
    setConversations(convs =>
      convs.map(c => c.id === id ? { ...c, title: newTitle } : c)
    );
  };

  const updateMessages = (convId, messages) => {
    setConversations(convs =>
      convs.map(c => c.id === convId ? { ...c, messages } : c)
    );
  };

  const remainingMessages = DAILY_LIMIT - messageCount;

  return (
    <div style={styles.container}>
      {/* Sidebar Toggle Button (mobile) */}
      <button style={styles.sidebarToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div style={{ ...styles.sidebar, transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div style={styles.sidebarHeader}>
          <button style={styles.newChatBtn} onClick={startNewChat}>
            <i className="fas fa-plus"></i> New Chat
          </button>
          <div style={styles.limitIndicator}>
            <i className="fas fa-comment-dots"></i> {messageCount}/{DAILY_LIMIT} messages today
          </div>
        </div>
        <div style={styles.chatList}>
          {conversations.map(conv => (
            <div
              key={conv.id}
              style={{
                ...styles.chatItem,
                background: currentConvId === conv.id ? 'rgba(255,215,0,0.2)' : 'transparent'
              }}
              onClick={() => setCurrentConvId(conv.id)}
            >
              <div style={styles.chatItemContent}>
                <i className="fas fa-comment" style={{ color: '#ffd700', marginRight: '8px' }}></i>
                <span style={styles.chatTitle}>{conv.title}</span>
              </div>
              <button
                style={styles.deleteChatBtn}
                onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <i className="fas fa-user-circle"></i>
            <span>BrianBot User</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={styles.chatArea}>
        {currentConvId && (
          <GoDiamond
            key={currentConvId}
            conversationId={currentConvId}
            initialMessages={conversations.find(c => c.id === currentConvId)?.messages || []}
            onMessagesChange={(messages) => updateMessages(currentConvId, messages)}
            remainingMessages={remainingMessages}
            dailyLimit={DAILY_LIMIT}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0c12 0%, #1a1a2e 50%, #0f0f23 100%)',
    position: 'relative'
  },
  sidebar: {
    width: '280px',
    background: 'rgba(10, 12, 18, 0.95)',
    backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(255,215,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    overflowY: 'auto'
  },
  sidebarToggle: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 20,
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffd700',
    fontSize: '1.2rem',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'none', // hide on desktop, you can make responsive
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  sidebarHeader: {
    padding: '1rem',
    borderBottom: '1px solid rgba(255,215,0,0.2)'
  },
  newChatBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '40px',
    padding: '0.6rem',
    color: '#1a1a2e',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  limitIndicator: {
    fontSize: '0.75rem',
    color: '#aaa',
    textAlign: 'center',
    marginTop: '0.5rem'
  },
  chatList: {
    flex: 1,
    padding: '0.5rem'
  },
  chatItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    borderRadius: '12px',
    marginBottom: '0.25rem',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  chatItemContent: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  chatTitle: {
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px'
  },
  deleteChatBtn: {
    background: 'none',
    border: 'none',
    color: '#aaa',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.2s'
  },
  sidebarFooter: {
    padding: '1rem',
    borderTop: '1px solid rgba(255,215,0,0.2)',
    fontSize: '0.8rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#aaa'
  },
  chatArea: {
    flex: 1,
    marginLeft: '280px', // match sidebar width
    transition: 'margin-left 0.3s',
    '@media (max-width: 768px)': {
      marginLeft: 0
    }
  }
};

export default GoDiamondPage;