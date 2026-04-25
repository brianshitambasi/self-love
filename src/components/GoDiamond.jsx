// components/GoDiamond.jsx - Modified for fullscreen mode
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoDiamond = () => {
  const location = useLocation();
  const isFullscreen = location.pathname === '/go-diamond';
  
  const [isOpen, setIsOpen] = useState(isFullscreen ? true : false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "✨ Welcome to Go Diamond! ✨\n\nI'm your AI assistant here to help you with:\n\n💎 Network Marketing Success\n💻 Full Stack Development\n📈 Business Growth Strategies\n💰 Financial Freedom\n\nWhat would you like to know today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  // Knowledge base for responses
  const responses = {
    greetings: {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! 👋 I'm your Go Diamond assistant. How can I help you achieve your goals today?"
    },
    whoAreYou: {
      keywords: ['who are you', 'what are you', 'your name', 'about you', 'tell me about yourself'],
      response: "I'm the Go Diamond AI Assistant, created by Brian Shitambasi - a Full Stack Developer, Network Marketer, and Software Engineer. I'm here to help you with information about network marketing, web development, business growth, and financial freedom strategies!"
    },
    aboutBrian: {
      keywords: ['brian', 'shitambasi', 'founder', 'creator', 'who made you', 'behind this'],
      response: "Brian Shitambasi is a Full Stack Developer, Network Marketing Professional, and Software Engineer. He helps aspiring entrepreneurs achieve financial freedom through network marketing and tech skills. You can connect with him on LinkedIn, GitHub, or via email at brianshtambasi270@gmail.com"
    },
    services: {
      keywords: ['services', 'offer', 'help with', 'what do you do', 'can you help me'],
      response: "I offer several services:\n\n💻 Web Development - Custom websites & web apps\n📈 MLM Training - Proven network marketing systems\n🤖 AI Solutions - Smart automation & tools\n🤝 Business Consulting - Strategic growth planning\n\nWhich service interests you?"
    },
    networkMarketing: {
      keywords: ['network marketing', 'mlm', 'multi level', 'direct sales', 'network market'],
      response: "Network marketing is a business model where you earn commissions by selling products and building a team. Success tips:\n\n✅ Choose a company with quality products\n✅ Focus on personal development\n✅ Build genuine relationships\n✅ Leverage social media\n✅ Be consistent and patient\n\nWant to learn more about my MLM training program?"
    },
    goDiamond: {
      keywords: ['go diamond', 'diamond project', 'diamond program', 'diamond project', 'become diamond'],
      response: "The GO DIAMOND Project is my exclusive mentorship program that helps network marketers achieve top leadership ranks (Diamond level). It includes:\n\n💎 Proven 6-figure systems\n💎 One-on-one coaching\n💎 Team building strategies\n💎 Marketing funnels\n💎 Weekly training calls\n\nReady to join? Click the 'GO DIAMOND PROJECT' link on this page!"
    },
    webinar: {
      keywords: ['webinar', 'free webinar', 'wealth renaissance', 'code to cash', 'training'],
      response: "Our FREE 'Code to Cash' webinar shows you how to combine tech skills with network marketing for financial freedom. You'll learn:\n\n💰 The exact system I used to hit 6-figures\n💻 How to leverage coding for MLM success\n🎯 Live Q&A sessions\n🎁 Free bonuses worth $497\n\nClick 'JOIN FREE WEBINAR' on the homepage to reserve your spot!"
    },
    coffeeChat: {
      keywords: ['coffee', 'coffee chat', 'coffee session', 'schedule call', 'book a call'],
      response: "☕ I'd love to connect over coffee! Schedule a Success Coffee Session to discuss:\n\n• Your goals and challenges\n• Personalized strategy review\n• Questions about network marketing\n• Tech solutions for your business\n\nClick 'SCHEDULE A COFFEE CHAT' on the homepage to book your free session!"
    },
    pricing: {
      keywords: ['price', 'cost', 'how much', 'investment', 'fee', 'pricing'],
      response: "Pricing varies by service:\n\n💎 Go Diamond Project: Custom pricing (schedule a call)\n💻 Web Development: Project-based ($500 - $5000+)\n📈 MLM Training: Monthly membership ($97/month)\n🤝 Business Consulting: $150/hour\n\nFor exact pricing, please schedule a coffee chat!"
    },
    success: {
      keywords: ['success story', 'testimonial', 'results', 'achieved', 'make money'],
      response: "Success stories from my programs:\n\n🌟 John M. - Went from $0 to $10k/month in 6 months\n🌟 Sarah K. - Built a team of 500+ active distributors\n🌟 David L. - Quit his 9-5 and went full-time\n🌟 Maria R. - Reached Diamond rank in 8 months\n\nYou could be next! Let's chat about your goals."
    },
    techStack: {
      keywords: ['technologies', 'tech stack', 'programming', 'coding', 'languages', 'frameworks'],
      response: "As a Full Stack Developer, I work with:\n\n🔹 Frontend: React, Next.js, Vue.js, HTML/CSS\n🔹 Backend: Node.js, Python, PHP, Java\n🔹 Databases: MongoDB, PostgreSQL, MySQL\n🔹 Cloud: AWS, Firebase, Vercel\n🔹 Tools: Git, Docker, Figma\n\nNeed a website or web app? Let's build something amazing!"
    },
    contact: {
      keywords: ['contact', 'reach out', 'get in touch', 'email', 'phone', 'connect'],
      response: "You can reach me through:\n\n📧 Email: brianshtambasi270@gmail.com\n💼 LinkedIn: linkedin.com/in/brianshitambasi\n🐙 GitHub: github.com/brianshitambasi\n🐦 Twitter: @brianshitambasi\n📱 Phone: Available upon request\n\nI typically respond within 24 hours!"
    },
    help: {
      keywords: ['help', 'support', 'assist', 'questions', 'need help'],
      response: "I can help you with:\n\n💎 Network Marketing strategies\n💻 Web development projects\n📈 Business growth tips\n💰 Financial freedom planning\n🤖 AI automation solutions\n\nJust ask me anything! What would you like to know?"
    },
    bye: {
      keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'appreciate'],
      response: "Thank you for chatting! 🙏\n\nRemember: Your legacy starts today. Keep building, keep growing, and I'll be here when you need me!\n\n💎 Go Diamond!\n\nClick the chat button anytime to continue our conversation."
    }
  };

  // Function to find matching response
  const findResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    for (const category of Object.values(responses)) {
      if (category.keywords.some(keyword => lowerMsg.includes(keyword))) {
        return category.response;
      }
    }
    
    return "Thanks for your question! 🤔\n\nI'm still learning, but here's what I can help with:\n\n💎 Go Diamond Project info\n📈 Network marketing strategies\n💻 Web development services\n☕ Scheduling a coffee chat\n🎓 Free webinar registration\n\nCould you rephrase your question? Or would you like to schedule a personal consultation with Brian?";
  };

  // Handle sending message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = findResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "✨ Chat cleared! ✨\n\nHow can I help you today? Ask me about network marketing, web development, or the Go Diamond Project!",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // For fullscreen mode, don't show the floating button, just show the chat
  if (isFullscreen) {
    return (
      <div style={fullscreenStyles.container}>
        {/* Header */}
        <div style={fullscreenStyles.header}>
          <div style={fullscreenStyles.headerContent}>
            <div style={fullscreenStyles.avatar}>
              <i className="fas fa-gem" style={{ fontSize: '24px', color: '#ffd700' }}></i>
            </div>
            <div style={fullscreenStyles.headerText}>
              <h3 style={fullscreenStyles.title}>Go Diamond Assistant</h3>
              <p style={fullscreenStyles.status}>✨ Online • Ready to help</p>
            </div>
          </div>
          <div style={fullscreenStyles.headerActions}>
            <button onClick={clearChat} style={fullscreenStyles.clearBtn} title="Clear chat">
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={fullscreenStyles.messagesArea}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                ...fullscreenStyles.message,
                ...(message.sender === 'user' ? fullscreenStyles.userMessage : fullscreenStyles.botMessage)
              }}
            >
              <div style={fullscreenStyles.messageContent}>
                {message.sender === 'bot' && (
                  <div style={fullscreenStyles.botAvatar}>
                    <i className="fas fa-robot" style={{ fontSize: '12px' }}></i>
                  </div>
                )}
                <div style={fullscreenStyles.messageText}>
                  <pre style={fullscreenStyles.preText}>{message.text}</pre>
                  <span style={fullscreenStyles.timestamp}>{formatTime(message.timestamp)}</span>
                </div>
                {message.sender === 'user' && (
                  <div style={fullscreenStyles.userAvatar}>
                    <i className="fas fa-user" style={{ fontSize: '12px' }}></i>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={fullscreenStyles.typingIndicator}>
              <div style={fullscreenStyles.typingDot}></div>
              <div style={fullscreenStyles.typingDot}></div>
              <div style={fullscreenStyles.typingDot}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div style={fullscreenStyles.suggestions}>
          <button onClick={() => setInputMessage('Tell me about Go Diamond Project')} style={fullscreenStyles.suggestionBtn}>
            💎 Go Diamond
          </button>
          <button onClick={() => setInputMessage('How can I join the webinar?')} style={fullscreenStyles.suggestionBtn}>
            🎓 Free Webinar
          </button>
          <button onClick={() => setInputMessage('Schedule a coffee chat')} style={fullscreenStyles.suggestionBtn}>
            ☕ Coffee Chat
          </button>
          <button onClick={() => setInputMessage('What services do you offer?')} style={fullscreenStyles.suggestionBtn}>
            💼 Services
          </button>
        </div>

        {/* Input Area */}
        <div style={fullscreenStyles.inputArea}>
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={fullscreenStyles.input}
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            style={{
              ...fullscreenStyles.sendBtn,
              ...(!inputMessage.trim() && fullscreenStyles.sendBtnDisabled)
            }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  // For non-fullscreen mode (floating button)
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <i className="fas fa-gem" style={{ fontSize: '28px', color: '#1a1a2e' }}></i>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.chatContainer}>
            {/* Header */}
            <div style={modalStyles.header}>
              <div style={modalStyles.headerContent}>
                <div style={modalStyles.avatar}>
                  <i className="fas fa-gem" style={{ fontSize: '24px', color: '#ffd700' }}></i>
                </div>
                <div style={modalStyles.headerText}>
                  <h3 style={modalStyles.title}>Go Diamond Assistant</h3>
                  <p style={modalStyles.status}>✨ Online • Ready to help</p>
                </div>
              </div>
              <div style={modalStyles.headerActions}>
                <button onClick={clearChat} style={modalStyles.clearBtn} title="Clear chat">
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button onClick={() => setIsOpen(false)} style={modalStyles.closeBtn}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={modalStyles.messagesArea}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    ...modalStyles.message,
                    ...(message.sender === 'user' ? modalStyles.userMessage : modalStyles.botMessage)
                  }}
                >
                  <div style={modalStyles.messageContent}>
                    {message.sender === 'bot' && (
                      <div style={modalStyles.botAvatar}>
                        <i className="fas fa-robot" style={{ fontSize: '12px' }}></i>
                      </div>
                    )}
                    <div style={modalStyles.messageText}>
                      <pre style={modalStyles.preText}>{message.text}</pre>
                      <span style={modalStyles.timestamp}>{formatTime(message.timestamp)}</span>
                    </div>
                    {message.sender === 'user' && (
                      <div style={modalStyles.userAvatar}>
                        <i className="fas fa-user" style={{ fontSize: '12px' }}></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={modalStyles.typingIndicator}>
                  <div style={modalStyles.typingDot}></div>
                  <div style={modalStyles.typingDot}></div>
                  <div style={modalStyles.typingDot}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div style={modalStyles.suggestions}>
              <button onClick={() => setInputMessage('Tell me about Go Diamond Project')} style={modalStyles.suggestionBtn}>
                💎 Go Diamond
              </button>
              <button onClick={() => setInputMessage('How can I join the webinar?')} style={modalStyles.suggestionBtn}>
                🎓 Free Webinar
              </button>
              <button onClick={() => setInputMessage('Schedule a coffee chat')} style={modalStyles.suggestionBtn}>
                ☕ Coffee Chat
              </button>
              <button onClick={() => setInputMessage('What services do you offer?')} style={modalStyles.suggestionBtn}>
                💼 Services
              </button>
            </div>

            {/* Input Area */}
            <div style={modalStyles.inputArea}>
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={modalStyles.input}
                rows="1"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  ...modalStyles.sendBtn,
                  ...(!inputMessage.trim() && modalStyles.sendBtnDisabled)
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255,215,0,0.5); }
        }
      `}</style>
    </>
  );
};

// Fullscreen styles
const fullscreenStyles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    height: '80vh',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,215,0,0.3)',
    margin: '0 auto'
  },
  header: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '1rem',
    borderBottom: '1px solid rgba(255,215,0,0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    background: 'rgba(255,215,0,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ffd700'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: '#ffd700',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0
  },
  status: {
    color: '#4caf50',
    fontSize: '0.75rem',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '8px'
  },
  clearBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  message: {
    display: 'flex',
    marginBottom: '8px'
  },
  userMessage: {
    justifyContent: 'flex-end'
  },
  botMessage: {
    justifyContent: 'flex-start'
  },
  messageContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    maxWidth: '85%'
  },
  botAvatar: {
    width: '28px',
    height: '28px',
    background: 'rgba(255,215,0,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  userAvatar: {
    width: '28px',
    height: '28px',
    background: 'rgba(51,153,255,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  messageText: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '8px 12px',
    position: 'relative'
  },
  preText: {
    margin: 0,
    fontFamily: 'inherit',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    color: '#fff',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  timestamp: {
    fontSize: '0.7rem',
    color: '#666',
    display: 'block',
    marginTop: '4px'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    width: '60px',
    justifyContent: 'center'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    background: '#ffd700',
    borderRadius: '50%',
    animation: 'typing 1.4s infinite'
  },
  suggestions: {
    padding: '12px',
    borderTop: '1px solid rgba(255,215,0,0.1)',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  suggestionBtn: {
    background: 'rgba(255,215,0,0.1)',
    border: '1px solid rgba(255,215,0,0.3)',
    borderRadius: '20px',
    padding: '6px 12px',
    color: '#ffd700',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  inputArea: {
    padding: '12px',
    borderTop: '1px solid rgba(255,215,0,0.1)',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: '12px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '0.9rem',
    resize: 'none',
    fontFamily: 'inherit',
    maxHeight: '100px'
  },
  sendBtn: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  sendBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

// Modal styles (for floating mode)
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '1rem'
  },
  chatContainer: {
    width: '100%',
    maxWidth: '450px',
    height: '600px',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,215,0,0.3)'
  },
  header: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '1rem',
    borderBottom: '1px solid rgba(255,215,0,0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    background: 'rgba(255,215,0,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ffd700'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: '#ffd700',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0
  },
  status: {
    color: '#4caf50',
    fontSize: '0.75rem',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '8px'
  },
  clearBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  message: {
    display: 'flex',
    marginBottom: '8px'
  },
  userMessage: {
    justifyContent: 'flex-end'
  },
  botMessage: {
    justifyContent: 'flex-start'
  },
  messageContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    maxWidth: '85%'
  },
  botAvatar: {
    width: '28px',
    height: '28px',
    background: 'rgba(255,215,0,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  userAvatar: {
    width: '28px',
    height: '28px',
    background: 'rgba(51,153,255,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  messageText: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '8px 12px',
    position: 'relative'
  },
  preText: {
    margin: 0,
    fontFamily: 'inherit',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    color: '#fff',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  timestamp: {
    fontSize: '0.7rem',
    color: '#666',
    display: 'block',
    marginTop: '4px'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    width: '60px',
    justifyContent: 'center'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    background: '#ffd700',
    borderRadius: '50%',
    animation: 'typing 1.4s infinite'
  },
  suggestions: {
    padding: '12px',
    borderTop: '1px solid rgba(255,215,0,0.1)',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  suggestionBtn: {
    background: 'rgba(255,215,0,0.1)',
    border: '1px solid rgba(255,215,0,0.3)',
    borderRadius: '20px',
    padding: '6px 12px',
    color: '#ffd700',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  inputArea: {
    padding: '12px',
    borderTop: '1px solid rgba(255,215,0,0.1)',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: '12px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '0.9rem',
    resize: 'none',
    fontFamily: 'inherit',
    maxHeight: '100px'
  },
  sendBtn: {
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  sendBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

// Add typing animation styles
const chatStyles = document.createElement("style");
chatStyles.textContent = `
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-10px); opacity: 1; }
  }
  .typing-dot {
    animation-delay: calc(var(--i) * 0.2s);
  }
  textarea:focus {
    outline: none;
    border-color: #ffd700;
  }
`;
document.head.appendChild(chatStyles);

export default GoDiamond;