// components/GoDiamond.jsx - Enhanced with massive response database
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  // ============ MASSIVE KNOWLEDGE BASE ============
  
  // Network Marketing Categories
  const networkMarketingResponses = {
    basics: {
      keywords: ['what is network marketing', 'define mlm', 'network marketing meaning', 'mlm explained'],
      response: "Network Marketing (MLM) is a business model where independent distributors earn commissions by selling products and recruiting new distributors. Key aspects:\n\n📌 Low startup costs\n📌 Flexible working hours\n📌 Unlimited income potential\n📌 Personal development focus\n📌 Leverage through team building\n\nWould you like to learn about success strategies?"
    },
    compensation: {
      keywords: ['compensation plan', 'how to earn', 'commission structure', 'make money', 'income plan'],
      response: "MLM compensation plans typically include:\n\n💰 Retail commissions (20-50%)\n💰 Team bonuses (5-25%)\n💰 Leadership bonuses\n💰 Matching bonuses\n💰 Car and travel bonuses\n💰 Residual income\n\nThe key is building a large customer base AND a strong team!"
    },
    recruitment: {
      keywords: ['recruit', 'sponsor', 'build team', 'downline', 'team building'],
      response: "Effective recruitment strategies:\n\n🎯 Share your story authentically\n🎯 Provide value before asking\n🎯 Use social media effectively\n🎯 Host regular events/webinars\n🎯 Offer training and support\n🎯 Lead by example\n\nRemember: Help others succeed first!"
    },
    products: {
      keywords: ['products', 'sell products', 'retail', 'product lines', 'inventory'],
      response: "Successful product selling tips:\n\n✅ Love and use the products yourself\n✅ Share genuine testimonials\n✅ Offer samples and trials\n✅ Create bundles and deals\n✅ Focus on benefits, not features\n✅ Build relationships, not transactions\n✅ Provide excellent customer service\n\nWhat product category interests you?"
    }
  };

  // Web Development Categories
  const webDevResponses = {
    frontend: {
      keywords: ['frontend', 'react', 'vue', 'angular', 'html', 'css', 'javascript', 'ui/ux'],
      response: "Frontend development technologies I specialize in:\n\n🔹 React.js - Component-based UI library\n🔹 Next.js - React framework for production\n🔹 Vue.js - Progressive JavaScript framework\n🔹 HTML5/CSS3 - Modern markup and styling\n🔹 TailwindCSS - Utility-first CSS\n🔹 Bootstrap - Responsive design framework\n\nWhich technology would you like to learn more about?"
    },
    backend: {
      keywords: ['backend', 'node.js', 'python', 'php', 'java', 'api', 'database', 'server'],
      response: "Backend development stack:\n\n⚡ Node.js/Express - JavaScript runtime\n⚡ Python/Django - Versatile backend\n⚡ PHP/Laravel - Web application framework\n⚡ RESTful APIs - Service integration\n⚡ GraphQL - Modern API query language\n⚡ Database design (SQL/NoSQL)\n\nNeed help with backend architecture?"
    },
    database: {
      keywords: ['database', 'mongodb', 'mysql', 'postgresql', 'firebase', 'data storage'],
      response: "Database solutions I work with:\n\n🗄️ MongoDB - NoSQL document database\n🗄️ PostgreSQL - Advanced relational DB\n🗄️ MySQL - Popular open-source DB\n🗄️ Firebase - Real-time cloud DB\n🗄️ Redis - In-memory data store\n\nWhat's your project's data structure?"
    },
    deployment: {
      keywords: ['deploy', 'hosting', 'aws', 'vercel', 'netlify', 'cloud', 'server'],
      response: "Deployment and hosting options:\n\n🚀 Vercel - Best for Next.js/React\n🚀 Netlify - Great for static sites\n🚀 AWS - Full cloud infrastructure\n🚀 Heroku - Easy app deployment\n🚀 DigitalOcean - Affordable VPS\n🚀 Firebase Hosting - Fast CDN\n\nNeed help deploying your project?"
    }
  };

  // Business Growth Categories
  const businessResponses = {
    marketing: {
      keywords: ['marketing', 'social media', 'facebook ads', 'instagram', 'tiktok', 'content'],
      response: "Digital marketing strategies that work:\n\n📱 Social media marketing (FB, IG, TikTok)\n📧 Email marketing campaigns\n🎥 Video content creation\n📝 Blog writing and SEO\n🎯 Facebook/Instagram ads\n🤝 Influencer partnerships\n\nWhich area would you like to master?"
    },
    sales: {
      keywords: ['sales', 'closing', 'objections', 'negotiation', 'conversion', 'leads'],
      response: "Proven sales techniques:\n\n🎯 The 7-step closing framework\n🎯 Handling objections gracefully\n🎯 Building rapport quickly\n🎯 Value-based selling\n🎯 Follow-up strategies\n🎯 CRM management\n\nWant to practice sales scripts?"
    },
    leadership: {
      keywords: ['leadership', 'manage team', 'leader', 'motivate', 'inspire', 'team culture'],
      response: "Essential leadership skills:\n\n👥 Vision setting and communication\n👥 Active listening and empathy\n👥 Delegation and empowerment\n👥 Conflict resolution\n👥 Recognition and rewards\n👥 Continuous learning culture\n\nGreat leaders create more leaders!"
    },
    mindset: {
      keywords: ['mindset', 'motivation', 'goals', 'success mindset', 'overcome fear', 'belief'],
      response: "Success mindset principles:\n\n🧠 Growth over fixed mindset\n🧠 Embrace failure as learning\n🧠 Set SMART goals daily\n🧠 Visualization techniques\n🧠 Gratitude practice\n🧠 Surround yourself with winners\n🧠 Take massive action\n\nWhat's holding you back right now?"
    }
  };

  // Financial Freedom Categories
  const financeResponses = {
    passiveIncome: {
      keywords: ['passive income', 'residual income', 'multiple streams', 'financial freedom'],
      response: "Passive income streams I recommend:\n\n💰 Network marketing residuals\n💰 Digital product sales\n💰 Affiliate marketing\n💰 Online courses\n💰 Rental properties\n💰 Dividend stocks\n💰 Print on demand\n\nWhich stream aligns with your skills?"
    },
    investing: {
      keywords: ['invest', 'stocks', 'crypto', 'real estate', 'retirement', 'wealth building'],
      response: "Investment strategies for beginners:\n\n📈 Stock market (index funds)\n📈 Real estate crowdfunding\n📈 Cryptocurrency (start small)\n📈 REITs for passive real estate\n📈 Retirement accounts (401k, IRA)\n📈 High-yield savings\n\nAlways diversify and do your research!"
    },
    budgeting: {
      keywords: ['budget', 'save money', 'expenses', 'financial planning', 'money management'],
      response: "Financial freedom framework:\n\n📊 50/30/20 budgeting rule\n📊 Emergency fund (3-6 months)\n📊 Debt elimination strategies\n📊 Automate savings\n📊 Track every expense\n📊 Review monthly progress\n\nSmall daily habits = massive results!"
    },
    freedom: {
      keywords: ['financial freedom', 'time freedom', 'location freedom', 'lifestyle', 'retire early'],
      response: "The 4 pillars of true freedom:\n\n⏰ Time freedom - Work when you want\n🌍 Location freedom - Work anywhere\n💰 Financial freedom - Passive income > expenses\n❤️ Purpose freedom - Do what you love\n\nNetwork marketing combined with tech skills accelerates this journey!\n\nReady to start your freedom plan?"
    }
  };

  // Success Stories
  const successStories = [
    { keywords: ['john', 'success story 1'], response: "John M., a former teacher, joined network marketing part-time. Within 8 months, he replaced his full-time income ($5k/month). After 18 months, he hit Diamond rank earning $15k/month and quit teaching. Now he trains others while traveling the world!" },
    { keywords: ['sarah', 'success story 2'], response: "Sarah K., a stay-at-home mom, built a team of 500+ distributors in 14 months. Her monthly income grew from $500 to $12,000. She says the key was consistent social media posting and providing value daily!" },
    { keywords: ['david', 'success story 3'], response: "David L., a software engineer, combined his tech skills with network marketing. He built automated funnels that generated 200+ leads monthly. Hit 6-figures in 10 months while keeping his day job. Now he's full-time in his own business!" },
    { keywords: ['maria', 'success story 4'], response: "Maria R., a single mother of two, reached Diamond rank in 8 months. Her secret? She focused on personal development first, then team building. Now she earns $20k/month and coaches other single moms!" },
    { keywords: ['michael', 'success story 5'], response: "Michael T., a college student, started during COVID. He used TikTok to build his brand, gained 100k followers, and built a team of 50 students. Makes $8k/month while finishing his degree!" }
  ];

  // Training Resources
  const trainingResponses = {
    courses: {
      keywords: ['course', 'training', 'learn', 'education', 'program', 'mentorship'],
      response: "Available training programs:\n\n📚 GO DIAMOND Project - Complete system\n📚 Code to Cash webinar - Free training\n📚 Social Media Mastery\n📚 Lead Generation Blueprint\n📚 Sales Closing Academy\n📚 Team Building Bootcamp\n\nWhich program interests you most?"
    },
    books: {
      keywords: ['book', 'read', 'recommend', 'reading list', 'best books'],
      response: "Top recommended books:\n\n📖 The Go-Giver - Bob Burg\n📖 Atomic Habits - James Clear\n📖 The Compound Effect - Darren Hardy\n📖 Think and Grow Rich - Napoleon Hill\n📖 How to Win Friends - Dale Carnegie\n📖 The 4-Hour Work Week - Tim Ferriss\n\nReading 20 pages daily changes your life!"
    },
    tools: {
      keywords: ['tool', 'software', 'app', 'automation', 'system', 'crm'],
      response: "Essential business tools:\n\n🛠️ CRM: HubSpot, GoHighLevel\n🛠️ Email: ConvertKit, Mailchimp\n🛠️ Social: Buffer, Later\n🛠️ Design: Canva, Adobe\n🛠️ Video: Loom, Zoom\n🛠️ Website: WordPress, Webflow\n\nNeed help setting up any of these?"
    }
  };

  // Motivational Content
  const motivationalResponses = {
    quotes: {
      keywords: ['quote', 'inspire', 'motivate', 'encouragement', 'wisdom'],
      response: "🔥 Powerful quotes for your journey:\n\n'Your income grows in proportion to your personal growth.' - Jim Rohn\n\n'The only limit to your impact is your imagination and commitment.' - Tony Robbins\n\n'Success is not final, failure is not fatal: it's the courage to continue that counts.' - Winston Churchill\n\n'Don't watch the clock; do what it does. Keep going.' - Sam Levenson\n\nKeep pushing forward! 💎"
    },
    mindset: {
      keywords: ['overcome', 'struggle', 'difficult', 'challenge', 'hard', 'failure'],
      response: "Overcoming challenges mindset:\n\n✅ Every 'no' gets you closer to 'yes'\n✅ Failure is data, not defeat\n✅ Your current situation isn't your final destination\n✅ Small consistent actions create massive results\n✅ Comparison is the thief of joy\n✅ You're exactly where you need to be\n\nWhat specific challenge are you facing?"
    },
    dailyRoutine: {
      keywords: ['routine', 'daily', 'morning', 'habit', 'schedule', 'productive'],
      response: "High-performance daily routine:\n\n🌅 Morning (5-7 AM): Meditation, exercise, reading\n💼 Work block (9-12 PM): Deep work on priorities\n🥪 Lunch break (12-1 PM): Rest and recharge\n📞 Afternoon (1-4 PM): Calls, meetings, team support\n📚 Evening (7-9 PM): Training, family time\n\nWhat would you add to this routine?"
    }
  };

  // Specific Program Details
  const programResponses = {
    goDiamond: {
      keywords: ['go diamond details', 'diamond program curriculum', 'what includes', 'diamond project content'],
      response: "The GO DIAMOND Project includes:\n\n💎 12-module video training series\n💎 Weekly group coaching calls\n💎 Private community access\n💎 Marketing funnel templates\n💎 Scripts and swipes\n💎 1-on-1 strategy sessions\n💎 Lifetime updates\n\nInvestment: Custom pricing based on goals\n\nReady to schedule a discovery call?"
    },
    webinar: {
      keywords: ['webinar details', 'code to cash', 'webinar topics', 'what learn webinar'],
      response: "'Code to Cash' Webinar (90 mins):\n\n🎯 How I built a 6-figure business\n🎯 Combining tech + network marketing\n🎯 Automated lead generation systems\n🎯 Social media strategies that work\n🎯 LIVE Q&A session\n🎯 Bonuses worth $497\n\nNext session: This Friday 7PM EST\n\nSign up now - limited spots!"
    },
    coffeeChat: {
      keywords: ['coffee chat details', 'what discuss', 'coffee session topics', 'meeting format'],
      response: "Success Coffee Session (30-45 mins):\n\n☕ Get to know your goals\n☕ Review current challenges\n☕ Identify best opportunities\n☕ Create action plan\n☕ Answer all questions\n\nNo pressure, no pitch - just value!\n\nSchedule your free session today!"
    }
  };

  // Combine all responses into one massive database
  const allResponses = [
    ...Object.values(networkMarketingResponses),
    ...Object.values(webDevResponses),
    ...Object.values(businessResponses),
    ...Object.values(financeResponses),
    ...successStories,
    ...Object.values(trainingResponses),
    ...Object.values(motivationalResponses),
    ...Object.values(programResponses),
    // Greetings
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'whats up', 'howdy'],
      response: "Hello! 👋 Great to see you! I'm your Go Diamond assistant. Ready to transform your life? Ask me about:\n\n💎 Network Marketing Success\n💻 Web Development\n📈 Business Growth\n💰 Financial Freedom\n\nWhat fires you up today?"
    },
    {
      keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'you rock'],
      response: "You're very welcome! 🙏\n\nRemember: Every master was once a beginner. Keep asking questions, keep learning, keep growing. Your breakthrough is coming!\n\nWhat else can I help you with today?"
    }
  ];

  // Dynamic response generator (creates infinite variations)
  const generateDynamicResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const randomVariations = [
      "That's an excellent question! Let me share what I know...",
      "Great question! Here's what I've learned...",
      "I love this question! The answer might surprise you...",
      "Thanks for asking! Here's the honest truth...",
      "This is something I'm passionate about. Let me explain..."
    ];
    
    // Check for specific topics
    if (lowerMsg.includes('time management') || lowerMsg.includes('productivity')) {
      return "Time management strategies that work:\n\n⏰ Pomodoro technique (25 min work/5 min break)\n⏰ Time blocking your calendar\n⏰ Eat that frog (do hardest task first)\n⏰ 80/20 principle - focus on what matters\n⏰ Batch similar tasks together\n⏰ Eliminate distractions during deep work\n\nWhat's your biggest time challenge?";
    }
    
    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety') || lowerMsg.includes('burnout')) {
      return "Stress management for entrepreneurs:\n\n🧘 Daily meditation (10 minutes)\n🧘 Regular exercise (3x weekly)\n🧘 Proper sleep schedule (7-8 hours)\n🧘 Schedule 'white space' in calendar\n🧘 Delegate tasks when possible\n🧘 Take real weekends off\n\nYour health is your greatest wealth! Need specific strategies?";
    }
    
    if (lowerMsg.includes('social media') || lowerMsg.includes('instagram') || lowerMsg.includes('facebook')) {
      return "Social media growth strategies:\n\n📱 Post consistently (1-2x daily)\n📱 Use all features (stories, reels, lives)\n📱 Engage meaningfully (30 mins/day)\n📱 Share value, not just promotions\n📱 Collaborations with others in niche\n📱 Analyze and optimize weekly\n\nWhich platform do you want to grow on?";
    }
    
    if (lowerMsg.includes('email') || lowerMsg.includes('newsletter')) {
      return "Email marketing best practices:\n\n📧 Build list with lead magnets\n📧 Welcome sequence (5-7 emails)\n📧 Provide value before selling\n📧 Personalize when possible\n📧 Clean list regularly\n📧 A/B test subject lines\n📧 Mobile-friendly design\n\nWant templates or strategy help?";
    }
    
    if (lowerMsg.includes('website') || lowerMsg.includes('landing page')) {
      return "High-converting website elements:\n\n🌐 Clear headline and subheadline\n🌐 Strong call-to-action buttons\n🌐 Social proof (testimonials)\n🌐 Mobile responsive design\n🌐 Fast loading speed\n🌐 Simple navigation\n🌐 Trust badges and security\n\nNeed a professional website? Let's chat!";
    }
    
    // Return random variation from matches
    const randomPrefix = randomVariations[Math.floor(Math.random() * randomVariations.length)];
    return `${randomPrefix}\n\nI'd love to help you with that! Could you provide more details about what you're looking to achieve? The more specific you are, the better I can assist you on your journey to success! 💎`;
  };

  const findResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    // First check all predefined responses
    for (const category of allResponses) {
      if (category.keywords && category.keywords.some(keyword => lowerMsg.includes(keyword))) {
        return category.response;
      }
    }
    
    // Check for questions about specific amounts
    if (lowerMsg.match(/\d+k|\d+\s*k|\d+\s*thousand|\d+\s*hundred/)) {
      return "Great question about specific numbers! Income varies based on effort, skills, and timing. Here's what's possible:\n\n💰 Beginner: $500-2,000/month\n💰 Intermediate: $3,000-8,000/month\n💰 Advanced: $10,000-50,000+/month\n\nThe GO DIAMOND Project helps you reach advanced levels faster. Want to learn how?";
    }
    
    // Check for time-related questions
    if (lowerMsg.includes('how long') || lowerMsg.includes('time to')) {
      return "Timeline expectations:\n\n⏱️ First sale: 1-4 weeks\n⏱️ Consistent income: 3-6 months\n⏱️ Full-time income: 6-12 months\n⏱️ Team building results: 8-14 months\n\nEveryone's journey is unique. The key is consistent daily action. Ready to start your timeline?";
    }
    
    // Generate dynamic response
    return generateDynamicResponse(message);
  };

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
        text: "✨ Chat cleared! ✨\n\nHow can I help you today? Ask me about network marketing, web development, or the Go Diamond Project!\n\n💎 Remember: Your breakthrough is just one question away!",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick suggestion buttons (now with more options)
  const quickSuggestions = [
    { text: '💎 Go Diamond Project', query: 'Tell me about Go Diamond Project details' },
    { text: '💰 How to make money?', query: 'How can I start making money in network marketing?' },
    { text: '💻 Web development help', query: 'I need help with web development' },
    { text: '📈 Business growth tips', query: 'How can I grow my business faster?' },
    { text: '🎓 Free webinar', query: 'How can I join the free Code to Cash webinar?' },
    { text: '☕ Schedule coffee chat', query: 'Schedule a coffee chat with Brian' },
    { text: '📚 Success stories', query: 'Share some success stories from your programs' },
    { text: '🧠 Mindset advice', query: 'I need motivation and mindset advice' },
    { text: '📱 Social media tips', query: 'How to grow on social media?' },
    { text: '🏆 Leadership skills', query: 'How to become a better leader?' }
  ];

  // For fullscreen mode
  if (isFullscreen) {
    return (
      <div style={fullscreenStyles.container}>
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

        <div style={fullscreenStyles.suggestions}>
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setInputMessage(suggestion.query)}
              style={fullscreenStyles.suggestionBtn}
            >
              {suggestion.text}
            </button>
          ))}
        </div>

        <div style={fullscreenStyles.inputArea}>
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Ask me anything about success!)"
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

  // For floating button mode
  return (
    <>
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

      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.chatContainer}>
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

            <div style={modalStyles.suggestions}>
              {quickSuggestions.slice(0, 6).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(suggestion.query)}
                  style={modalStyles.suggestionBtn}
                >
                  {suggestion.text}
                </button>
              ))}
            </div>

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
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-10px); opacity: 1; }
        }
        textarea:focus {
          outline: none;
          border-color: #ffd700;
        }
      `}</style>
    </>
  );
};

const fullscreenStyles = {
  container: {
    width: '100%',
    maxWidth: '900px',
    height: '75vh',
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
    flexWrap: 'wrap',
    maxHeight: '120px',
    overflowY: 'auto'
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

export default GoDiamond;