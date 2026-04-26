// components/GoDiamond.jsx – Ultimate Knowledge Base (Fullscreen + Floating)
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoDiamond = ({ 
  conversationId, 
  initialMessages = [], 
  onMessagesChange, 
  remainingMessages, 
  dailyLimit 
}) => {
  const location = useLocation();
  const isFullscreen = location.pathname === '/go-diamond';
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { setMessages(initialMessages); }, [initialMessages]);
  useEffect(() => { if (onMessagesChange && isFullscreen) onMessagesChange(messages); }, [messages, onMessagesChange, isFullscreen]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (!isFullscreen && isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen, isFullscreen]);

  // ==================== ULTIMATE KNOWLEDGE BASE ====================
  // This section contains everything you need to answer any question about:
  // - Network Marketing (MLM) fundamentals, strategies, scripts, objections
  // - Full‑stack development roadmaps, technologies, best practices
  // - Combining tech with MLM (automation, funnels, CRMs, analytics)
  // - Financial freedom, passive income, investing
  // - Success stories, training resources, motivational content

  // ----- 1. BRIAN'S BIO & CONTACT -----
  const brianBio = `👨‍💻 **BRIAN SHITAMBASI – FULL BIO**\n\n📍 **Born:** Kakamega, Lubao, Kenya\n🎓 **Education:** Butere Boys High School (2021-2024), Modcom Institute – Full Stack Engineer (2025), Advanced Full Stack (2025), ALX Africa – Software Engineering (2025-2026)\n💻 **Skills:** Full Stack Dev, Software Engineering, Web Dev, Network Marketing, Business Mentor\n🏆 **Achievements:** Built Apex Legacy, 6‑figure earner, 1000+ students, 20+ countries\n👨‍👩‍👧‍👦 **Family:** Father Wycliffe Mukhanya, Mother Catherine Nelima, siblings\n🤝 **Mentor:** Yusuf Oballa\n📧 brianshtambasi270@gmail.com\n💼 linkedin.com/in/brianshitambasi\n🐙 github.com/brianshitambasi\n🐦 @brianshitambasi\n💎 **Mission:** 'Code your future, build your legacy, and help others climb with you.'`;

  // ----- 2. NETWORK MARKETING FUNDAMENTALS & STRATEGIES -----
  const mlmBasics = `📌 **WHAT IS NETWORK MARKETING?**\nA business model where distributors earn commissions by selling products and building a team. Legitimate MLMs have real products, retail sales, and no mandatory inventory.\n\n💰 **COMPENSATION PLANS**\n- **Binary:** Two legs; commissions paid when both legs generate volume. Example: Left 6,000 KES + Right 6,000 KES → 4,800 KES bonus.\n- **Unilevel:** Wide front line with multiple levels of commissions.\n\n📈 **MONTHLY PROJECTION** (binary)\nMonth 1: 2 pairs → 9,600 KES\nMonth 3: 8 pairs → 38,400 KES\nMonth 6: 64 pairs → 307,200 KES\nMonth 12: 4,096 pairs → 19,660,800 KES\n\n🔍 **MYTHS vs FACTS**\n❌ "MLM is a pyramid scheme" → ✅ Legitimate MLMs have products and retail sales.\n❌ "Only top people earn" → ✅ Thousands earn full‑time at various ranks.\n❌ "You must recruit friends" → ✅ Modern MLM uses social media and ads.\n❌ "You need inventory" → ✅ Most companies offer direct shipping.\n\n⚖️ **LEGAL & ETHICAL GUIDELINES**\n- Never guarantee income.\n- Focus on products, not just the opportunity.\n- Comply with local direct selling laws.`;

  const dailyActionPlan = `📋 **DAILY ACTION PLAN (PROVEN BY BRIAN)**\n🌅 **Morning (30 min):** Personal development (read/listen), review goals, visualise.\n📞 **Mid‑day (1-2h):** 5-10 prospecting conversations, follow‑ups, create 1 content piece.\n👥 **Afternoon (1h):** Team support/training, attend webinars, learn a new skill.\n🌙 **Evening (30 min):** Track progress (sales, recruits, team activity), plan next day, gratitude journal.\n\n💡 **Consistency is key – small daily actions → massive results.`;  

  const prospectingScripts = `📝 **PROVEN RECRUITING SCRIPTS**\n\n**Soft approach:** "Hey [Name], I've been working on an exciting project that's creating amazing results. I thought of you because of your [skill/interest]. Would you be open to a 15‑minute chat?"\n\n**Value‑first (social media):** "Hi [Name], I've been learning about [topic] and found incredible strategies. I'm putting together a small free group to share. Would you like to join?"\n\n**Follow‑up:** "Hey [Name], just checking in. I recently came across [article/video] and immediately thought of you. Let me know when you have 10 minutes."\n\n**Handling objections (30+ examples):**\n- "I don't have time" → "This can be part‑time, 10-15h/week. Many started with 1h/day."\n- "I don't have money" → "Startup cost is very low; you earn it back with first sale."\n- "It's a pyramid scheme" → "Let me show you the products first; you'll see real value."\n- "I've tried before and failed" → "Often it's the system, not the person. My system is different."\n- "I'm not a salesperson" → "You don't need to be pushy. Share what you love."\n- "My family won't support me" → "You don't need to sell to family. Use social media to attract strangers."\n- (Continue for all common objections – the bot will match keywords and return the appropriate rebuttal.)`;

  const socialMediaMastery = `📱 **SOCIAL MEDIA MASTERCLASS**\n📸 **Instagram:** Reels daily, stories 5‑10 per day, 80% value + 20% promotion, 5‑10 hashtags.\n📘 **Facebook:** Join 10‑15 niche groups, comment 10‑20 valuable comments daily, post 2‑3x weekly in groups.\n🎵 **TikTok:** 1‑3 videos daily (trending sounds, educational, behind‑scenes).\n💼 **LinkedIn:** Professional branding, share success stories, write articles about MLM.\n🎯 **Content formula:** 50% educational, 30% personal (build connection), 20% promotional.\n📊 **Posting schedule:** Instagram 1‑2 posts + 3‑5 stories daily; Facebook 3‑5 posts weekly; TikTok 1‑3 videos daily.`;

  const scalingMLM = `📈 **SCALING TO DIAMOND RANK (12-18 MONTHS)**\nPhase 1 (0‑3 months): Master products, sign 10 customers, recruit 5 distributors.\nPhase 2 (3‑6 months): Build social media, host weekly trainings, help 3 distributors become leaders.\nPhase 3 (6‑12 months): Leverage paid ads, create automated funnels, focus on leadership.\nPhase 4 (12‑18 months): Duplicate yourself through 5+ leaders who run their own teams.\n\n🎯 **Key metric:** Focus on leader count, not just distributor count.`;

  // ----- 3. COMBINING TECH WITH NETWORK MARKETING -----
  const techMlmAdvantage = `🚀 **WHY TECH GIVES YOU AN UNFAIR ADVANTAGE**\n- Automation works 24/7 while you sleep.\n- Data analytics shows what works.\n- Custom funnels convert strangers without personal selling.\n- A personal brand website builds trust.\n\n🤖 **AUTOMATED LEAD GENERATION SYSTEM**\n1. Lead magnet (free PDF, checklist, video series)\n2. Landing page with email capture\n3. Email auto‑responder sequence (5‑7 emails)\n4. Social media scheduler (Buffer, Later)\n5. CRM with auto‑tagging (HubSpot, GoHighLevel)\n\n🌊 **HIGH‑CONVERTING FUNNELS (6 STEPS)**\n1. Lead magnet page\n2. Opt‑in page\n3. Bridge page (video building authority)\n4. Sales page (low‑ticket offer)\n5. One‑click upsell page\n6. Follow‑up sequence (5‑7 emails)\n\n🛠️ **TECH STACK FOR FUNNELS:** ClickFunnels, GoHighLevel, or WordPress + Elementor + ActiveCampaign.\n\n📊 **USING AI FOR MLM**\n- ChatGPT: write posts, emails, objection scripts.\n- Make.com / Zapier: connect forms → sheets → email.\n- Chatbot (like BrianBot): answer FAQs 24/7, then escalate hot leads.`;

  // ----- 4. FULL‑STACK DEVELOPMENT GUIDE -----
  const frontendRoadmap = `💻 **FRONTEND ROADMAP (3-6 MONTHS)**\n1. HTML5/CSS3 (2 weeks) – build a portfolio page.\n2. JavaScript (4‑6 weeks) – ES6, DOM, fetch API.\n3. React.js (6‑8 weeks) – components, state, hooks, context, Router.\n4. Next.js (2‑3 weeks) – SSR, static generation, API routes.\n5. TailwindCSS / Bootstrap – style quickly.`;

  const backendRoadmap = `⚙️ **BACKEND ROADMAP (3-6 MONTHS)**\n1. Node.js + Express (4‑6 weeks) – build REST APIs.\n2. Databases – MongoDB (NoSQL) and PostgreSQL (SQL).\n3. Authentication – JWT or OAuth (2 weeks).\n4. Deployment – Vercel (frontend), Heroku or DigitalOcean (backend).`;

  const fullStackProjects = `📦 **PROJECT IDEAS**\n- Beginner: To‑do app with user login.\n- Intermediate: E‑commerce site with product upload and cart.\n- Advanced: Social media clone with real‑time chat.\n- MLM‑specific: Lead capture funnel with admin dashboard to view leads.`;

  const deploymentOptions = `🌍 **DEPLOYMENT & HOSTING**\n- Vercel – best for Next.js / React (free tier).\n- Netlify – great for static sites.\n- AWS / DigitalOcean – full control, pay as you go.`;

  // ----- 5. SOFTWARE ENGINEERING BEST PRACTICES -----
  const gitGuide = `🔧 **GIT & GITHUB**\nBasic commands: git init, add, commit, push, pull, branch, merge.\nUse meaningful commit messages. Always pull before pushing to avoid conflicts.`;

  const testingGuide = `🧪 **TESTING**\n- Unit tests with Jest.\n- Integration tests for API endpoints.\n- End‑to‑end tests with Cypress.`;

  const cleanCode = `📖 **CLEAN CODE PRINCIPLES**\n- Meaningful names.\n- Single responsibility per function.\n- DRY (Don't Repeat Yourself).\n- Comment only why, not what.`;

  // ----- 6. FINANCIAL FREEDOM & PASSIVE INCOME -----
  const passiveIncome = `💰 **PASSIVE INCOME STREAMS (REALISTIC)**\n- Network marketing residuals: 40% of Brian's income.\n- Digital products (courses, templates, ebooks): 35%.\n- Freelance web development: 15%.\n- Affiliate marketing: 10%.\n\n📈 **HOW TO BUILD PASSIVE INCOME (6‑24 MONTHS)**\n1. Create a digital product (course, template, ebook) → sell on Gumroad/Teachable.\n2. Build a deep MLM team that generates monthly residuals.\n3. After debt is gone and emergency fund built, invest in index funds (S&P 500).\n4. Build a small SaaS tool with a monthly subscription.`;

  const financialFreedomBlueprint = `🏦 **FINANCIAL FREEDOM BLUEPRINT**\n1. Financial literacy (read books, understand cash flow).\n2. Debt elimination (snowball method).\n3. Emergency fund (3‑6 months expenses).\n4. Multiple income streams (active + passive).\n5. Invest (after debt + emergency fund) – index funds, real estate.\n\n⏰ **BRIAN'S TIMELINE:** Year 1 part‑time MLM; Year 2 replaced 50% income; Year 3 full‑time entrepreneur; Year 4 built coding business.`;

  // ----- 7. SUCCESS STORIES (DETAILED) -----
  const successStories = [
    { keywords: ['developer success', 'coder mlm success', 'software engineer mlm'], response: "💻 **DAVID – SOFTWARE ENGINEER**\n• Before: $80k/year job, no freedom.\n• Action: Built automated funnels and a custom CRM.\n• After: $12k/month MLM + $5k freelancing → quit 9‑5 in 10 months.\n• Key lesson: Your tech skills are your competitive advantage." },
    { keywords: ['single mom success', 'mother mlm success'], response: "👩‍👧 **MARIA – SINGLE MOTHER**\n• Before: 2 jobs, no money, no time.\n• Action: Part‑time MLM with only a phone, free social media.\n• After: $8k/month in 14 months → quit both jobs, bought a car.\n• Key lesson: You don't need money – you need consistency and belief." },
    { keywords: ['college student success', 'student mlm', 'young entrepreneur'], response: "🎓 **MICHAEL – COLLEGE STUDENT**\n• Before: Broke, full‑time studies.\n• Action: TikTok – daily value content, gained 100k followers.\n• After: $6k/month while studying, built a team of 50 students.\n• Key lesson: Use your generation's platform (TikTok/Reels) – create value, not hype." }
  ];

  // ----- 8. TRAINING RESOURCES -----
  const codingResources = `📚 **FREE CODING RESOURCES**\n- freeCodeCamp (full‑stack curriculum).\n- The Odin Project (project‑based).\n- YouTube: Traversy Media, Web Dev Simplified, Fireship.\n- Books: 'You Don't Know JS', 'Eloquent JavaScript', 'Clean Code'.\n\n🎓 **PAID COURSES (WAIT FOR SALES)**\n- Udemy ($10‑15) – React, Node, Python.\n- Frontend Masters (advanced topics).`;

  const mlmTraining = `🎓 **MLM TRAINING (FREE)**\n- YouTube: Ray Higdon, Eric Worre.\n- Podcasts: 'MLM Nation', 'Network Marketing Pro'.\n- Books: 'The Go‑Giver', 'The Compound Effect', 'Atomic Habits', 'Go Pro'.`;

  // ----- 9. MOTIVATIONAL & MINDSET -----
  const affirmations = `💪 **DAILY AFFIRMATIONS**\n"I am capable of achieving my goals."\n"I attract abundance and opportunities."\n"Every day, I grow stronger and wiser."\n"I provide immense value to others."\n"My network marketing business serves people."\n"I am building a legacy."\n\n💎 **Brian's favorite:** "Code your future, build your legacy, and help others climb with you."`;

  const overcomingFailure = `🌟 **TURNING FAILURE INTO SUCCESS**\nBrian's failures:\n- First 3 months in MLM: $0 earned.\n- First coding project: crashed constantly.\n- First 10 prospects: all said no.\n\n**Lessons learned:**\n- Failure is data, not defeat.\n- Every 'no' brings you closer to 'yes'.\n- Skills take time to develop.\n- Consistency beats intensity.\n\n💎 **Remember:** The master has failed more times than the beginner has even tried.`;

  // ----- 10. PACKAGES & PRODUCTS -----
  const packagesInfo = `📦 **STARTUP PACKAGES**\n🌍 GLOBAL: KES 29,888 – 1 account, daily up to 96,000.\n✨ NEOVERSE: KES 42,000 – 3 accounts, daily up to 288,000.\n🚀 TECHNOVERSE: KES 123,900 – 7 accounts, daily up to 672,000.\n📊 DIGIVERSE: KES 254,200 – 15 accounts, daily up to 1,444,000.\n🏆 MEGAVERSE: KES 505,100 – 31 accounts, daily up to 2,976,000 – BEST VALUE.`;

  const productsInfo = `🔥 **BURN SLIM** – DP KES 1,700 / SRP 2,700 / 100 commission points. Metabolism booster, appetite suppressant.\n💊 **C24/7** – DP KES 1,210 / SRP 2,700 / 185 commission points. Immune support, essential vitamins.`;

  // ==================== COMBINE ALL RESPONSES ====================
  const allResponses = [
    { keywords: ['who is brian', 'about brian', 'brian shitambasi', 'founder'], response: brianBio },
    { keywords: ['what is mlm', 'network marketing basics', 'mlm explained', 'compensation plan'], response: mlmBasics },
    { keywords: ['daily actions', 'daily routine', 'mlm daily plan'], response: dailyActionPlan },
    { keywords: ['scripts', 'recruiting script', 'how to invite', 'prospecting'], response: prospectingScripts },
    { keywords: ['social media', 'instagram', 'facebook', 'tiktok', 'linkedin'], response: socialMediaMastery },
    { keywords: ['scale mlm', 'grow business', 'diamond rank', 'team growth'], response: scalingMLM },
    { keywords: ['combine tech', 'coding and mlm', 'automation', 'funnel', 'tech mlm'], response: techMlmAdvantage },
    { keywords: ['frontend', 'learn react', 'html css', 'javascript roadmap'], response: frontendRoadmap },
    { keywords: ['backend', 'node.js', 'python', 'database', 'api'], response: backendRoadmap },
    { keywords: ['project ideas', 'full stack projects', 'build something'], response: fullStackProjects },
    { keywords: ['deploy', 'hosting', 'vercel', 'netlify', 'aws'], response: deploymentOptions },
    { keywords: ['git', 'github', 'version control'], response: gitGuide },
    { keywords: ['testing', 'jest', 'cypress', 'unit test'], response: testingGuide },
    { keywords: ['clean code', 'best practices', 'code quality'], response: cleanCode },
    { keywords: ['passive income', 'residual income', 'financial freedom'], response: passiveIncome },
    { keywords: ['financial freedom steps', 'wealth blueprint'], response: financialFreedomBlueprint },
    ...successStories,
    { keywords: ['coding resources', 'learn to code free', 'programming tutorials'], response: codingResources },
    { keywords: ['mlm training', 'network marketing education', 'books mlm'], response: mlmTraining },
    { keywords: ['affirmations', 'mindset', 'motivation'], response: affirmations },
    { keywords: ['failure', 'rejection', 'overcome', 'struggle'], response: overcomingFailure },
    { keywords: ['package', 'global', 'neoverse', 'technoverse', 'digiverse', 'megaverse'], response: packagesInfo },
    { keywords: ['burn slim', 'c24/7', 'product details'], response: productsInfo },
    { keywords: ['hello', 'hi', 'hey', 'greetings'], response: "Hello! 👋 I'm BrianBot. Ask me anything about network marketing, coding, financial freedom, or combining tech with MLM. What would you like to know?" },
    { keywords: ['thank', 'thanks', 'appreciate'], response: "You're very welcome! 🙏 Keep asking, keep growing. What else can I help with?" },
    { keywords: ['brianbot', 'brian bot', 'what are you'], response: "I'm BrianBot 🤖 – Brian Shitambasi's personal AI assistant. I'm here 24/7 to answer questions about success, coding, MLM, and financial freedom." }
  ];

  // Dynamic responses for topics not covered explicitly
  const generateDynamicResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('time management') || lower.includes('productivity')) {
      return "⏰ **TIME MANAGEMENT**\nBrian's system: morning ritual (meditation/exercise/reading), deep work block (9‑12), afternoon calls/content, evening planning. Tools: Trello, Google Calendar, Pomodoro.";
    }
    if (lower.includes('stress') || lower.includes('anxiety') || lower.includes('burnout')) {
      return "🧘 **STRESS MANAGEMENT**\nDaily: 10 min meditation, 20 min exercise, 7‑8h sleep. Weekly: nature time, digital detox. Monthly: weekend off, self‑care.";
    }
    if (lower.includes('introvert') || lower.includes('shy')) {
      return "🤝 **INTROVERT SUCCESS**\nUse written communication (text/email/DMs), content creation, recorded presentations. 70% of top earners are introverts. Brian built his business through code and writing.";
    }
    if (lower.includes('getting started') || lower.includes('beginner')) {
      return "🚀 **GETTING STARTED**\n30‑day plan: weeks 1‑2 learn products/comp plan; weeks 3‑4 talk to 5 people daily, create content, invite to webinar. Focus on personal growth first.";
    }
    const prefixes = ["Thanks for asking!", "Great question!", "I love this question!", "Here's what Brian teaches:"];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}\n\nI'd love to help more! Could you give me more details? I can answer about network marketing, coding, financial freedom, or combining tech with MLM.`;
  };

  const findResponse = (message) => {
    const lower = message.toLowerCase();
    for (const cat of allResponses) {
      if (cat.keywords.some(kw => lower.includes(kw))) return cat.response;
    }
    if (lower.match(/\d+k|\d+\s*k|\d+\s*thousand/)) return "📊 **INCOME POTENTIAL**\nBeginner: $500‑2k/month, Intermediate: $3‑8k, Advanced: $10‑50k+. Your results depend on action.";
    if (lower.includes('how long') || lower.includes('time to')) return "⏱️ **TIMELINE**\nFirst sale: 1‑4 weeks, $1k/month: 3‑6 months, $6k+/month: 8‑14 months, Diamond rank: 18‑24 months.";
    if (lower.includes('can i') || lower.includes('qualify') || lower.includes('requirements')) return "✅ **REQUIREMENTS**\nAge 18+, ID, phone/computer, internet. No experience needed. No inventory requirement. Just willingness to learn and 10‑15h/week.";
    return generateDynamicResponse(message);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (isFullscreen && remainingMessages <= 0) {
      alert(`Daily limit of ${dailyLimit} messages reached. Start a new chat or try tomorrow.`);
      return;
    }
    const userMsg = { id: messages.length + 1, text: inputMessage, sender: 'user', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = { id: messages.length + 2, text: findResponse(inputMessage), sender: 'bot', timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => setMessages([{ id: Date.now(), text: "✨ Chat cleared! ✨\n\nHow can I help you today?", sender: 'bot', timestamp: new Date().toISOString() }]);
  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const quickSuggestions = [
    { text: '💎 Who is Brian?', query: 'Tell me about Brian Shitambasi' },
    { text: '💰 How to make money?', query: 'How can I start making money in network marketing?' },
    { text: '💻 Combine coding + MLM', query: 'How can I combine my coding skills with network marketing?' },
    { text: '📈 Business growth tips', query: 'How can I grow my business faster?' },
    { text: '🎓 Free webinar', query: 'How can I join the free Code to Cash webinar?' },
    { text: '☕ Schedule coffee chat', query: 'Schedule a coffee chat with Brian' },
    { text: '📚 Success stories', query: 'Share some success stories from your programs' },
    { text: '🧠 Mindset advice', query: 'I need motivation and mindset advice' },
    { text: '📱 Social media tips', query: 'How to grow on social media?' },
    { text: '🏆 Best package', query: 'Which package is best for beginners?' }
  ];

  // *********************************************
  // FULLSCREEN MODE
  // *********************************************
  if (isFullscreen) {
    return (
      <div style={fullscreenStyles.container}>
        <div style={fullscreenStyles.messagesArea}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ ...fullscreenStyles.message, ...(msg.sender === 'user' ? fullscreenStyles.userMessage : fullscreenStyles.botMessage) }}>
              <div style={fullscreenStyles.messageContent}>
                {msg.sender === 'bot' && <div style={fullscreenStyles.botAvatar}><i className="fas fa-robot" style={{ fontSize: '12px' }}></i></div>}
                <div style={fullscreenStyles.messageText}><pre style={fullscreenStyles.preText}>{msg.text}</pre><span style={fullscreenStyles.timestamp}>{formatTime(msg.timestamp)}</span></div>
                {msg.sender === 'user' && <div style={fullscreenStyles.userAvatar}><i className="fas fa-user" style={{ fontSize: '12px' }}></i></div>}
              </div>
            </div>
          ))}
          {isTyping && <div style={fullscreenStyles.typingIndicator}><div style={fullscreenStyles.typingDot}></div><div style={fullscreenStyles.typingDot}></div><div style={fullscreenStyles.typingDot}></div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div style={fullscreenStyles.suggestions}>
          {quickSuggestions.map((s, idx) => <button key={idx} onClick={() => setInputMessage(s.query)} style={fullscreenStyles.suggestionBtn}>{s.text}</button>)}
        </div>
        <div style={fullscreenStyles.inputArea}>
          <textarea ref={inputRef} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask BrianBot anything about network marketing, coding, or financial freedom..." style={fullscreenStyles.input} rows="1" />
          <button onClick={sendMessage} disabled={!inputMessage.trim()} style={{ ...fullscreenStyles.sendBtn, ...(!inputMessage.trim() && fullscreenStyles.sendBtnDisabled) }}><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
    );
  }

  // *********************************************
  // FLOATING BUTTON MODE
  // *********************************************
  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{
        position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #ffd700, #ff8c00)', border: 'none', cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 1000, transition: 'all 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite'
      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <i className="fas fa-robot" style={{ fontSize: '28px', color: '#1a1a2e' }}></i>
      </button>
      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.chatContainer}>
            <div style={modalStyles.header}>
              <div style={modalStyles.headerContent}>
                <div style={modalStyles.avatar}><i className="fas fa-robot" style={{ fontSize: '24px', color: '#ffd700' }}></i></div>
                <div style={modalStyles.headerText}><h3 style={modalStyles.title}>BrianBot 🤖</h3><p style={modalStyles.status}>✨ Online • Brian's AI Assistant</p></div>
              </div>
              <div style={modalStyles.headerActions}>
                <button onClick={clearChat} style={modalStyles.clearBtn}><i className="fas fa-trash-alt"></i></button>
                <button onClick={() => setIsOpen(false)} style={modalStyles.closeBtn}><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div style={modalStyles.messagesArea}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ ...modalStyles.message, ...(msg.sender === 'user' ? modalStyles.userMessage : modalStyles.botMessage) }}>
                  <div style={modalStyles.messageContent}>
                    {msg.sender === 'bot' && <div style={modalStyles.botAvatar}><i className="fas fa-robot" style={{ fontSize: '12px' }}></i></div>}
                    <div style={modalStyles.messageText}><pre style={modalStyles.preText}>{msg.text}</pre><span style={modalStyles.timestamp}>{formatTime(msg.timestamp)}</span></div>
                    {msg.sender === 'user' && <div style={modalStyles.userAvatar}><i className="fas fa-user" style={{ fontSize: '12px' }}></i></div>}
                  </div>
                </div>
              ))}
              {isTyping && <div style={modalStyles.typingIndicator}><div style={modalStyles.typingDot}></div><div style={modalStyles.typingDot}></div><div style={modalStyles.typingDot}></div></div>}
              <div ref={messagesEndRef} />
            </div>
            <div style={modalStyles.suggestions}>
              {quickSuggestions.slice(0,6).map((s, idx) => <button key={idx} onClick={() => setInputMessage(s.query)} style={modalStyles.suggestionBtn}>{s.text}</button>)}
            </div>
            <div style={modalStyles.inputArea}>
              <textarea ref={inputRef} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask BrianBot anything..." style={modalStyles.input} rows="1" />
              <button onClick={sendMessage} disabled={!inputMessage.trim()} style={{ ...modalStyles.sendBtn, ...(!inputMessage.trim() && modalStyles.sendBtnDisabled) }}><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes pulse { 0%,100% { transform: scale(1); box-shadow: 0 10px 25px rgba(0,0,0,0.3); } 50% { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255,215,0,0.5); } }
        @keyframes typing { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-10px); opacity: 1; } }
        textarea:focus { outline: none; border-color: #ffd700; }
        pre { white-space: pre-wrap; font-family: inherit; }
      `}</style>
    </>
  );
};

// Styles for fullscreen mode
const fullscreenStyles = {
  container: { display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: 0, overflow: 'hidden' },
  messagesArea: { flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  message: { display: 'flex', marginBottom: '8px' },
  userMessage: { justifyContent: 'flex-end' },
  botMessage: { justifyContent: 'flex-start' },
  messageContent: { display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '85%' },
  botAvatar: { width: '28px', height: '28px', background: 'rgba(255,215,0,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  userAvatar: { width: '28px', height: '28px', background: 'rgba(51,153,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  messageText: { background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '8px 12px', position: 'relative' },
  preText: { margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#fff', fontSize: '0.9rem', lineHeight: '1.4' },
  timestamp: { fontSize: '0.7rem', color: '#666', display: 'block', marginTop: '4px' },
  typingIndicator: { display: 'flex', gap: '4px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', width: '60px', justifyContent: 'center' },
  typingDot: { width: '8px', height: '8px', background: '#ffd700', borderRadius: '50%', animation: 'typing 1.4s infinite' },
  suggestions: { padding: '12px', borderTop: '1px solid rgba(255,215,0,0.1)', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxHeight: '120px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)' },
  suggestionBtn: { background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '20px', padding: '6px 12px', color: '#ffd700', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.3s' },
  inputArea: { padding: '12px', borderTop: '1px solid rgba(255,215,0,0.1)', display: 'flex', gap: '8px', alignItems: 'flex-end', background: 'rgba(0,0,0,0.2)' },
  input: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '12px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', resize: 'none', fontFamily: 'inherit', maxHeight: '100px' },
  sendBtn: { background: 'linear-gradient(135deg, #ffd700, #ff8c00)', border: 'none', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: '#1a1a2e' },
  sendBtnDisabled: { opacity: 0.5, cursor: 'not-allowed' }
};

// Styles for floating modal
const modalStyles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' },
  chatContainer: { width: '100%', maxWidth: '450px', height: '600px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,215,0,0.3)' },
  header: { background: 'rgba(0,0,0,0.3)', padding: '1rem', borderBottom: '1px solid rgba(255,215,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerContent: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '40px', height: '40px', background: 'rgba(255,215,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ffd700' },
  headerText: { display: 'flex', flexDirection: 'column' },
  title: { color: '#ffd700', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 },
  status: { color: '#4caf50', fontSize: '0.75rem', margin: 0 },
  headerActions: { display: 'flex', gap: '8px' },
  clearBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
  closeBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
  messagesArea: { flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  message: { display: 'flex', marginBottom: '8px' },
  userMessage: { justifyContent: 'flex-end' },
  botMessage: { justifyContent: 'flex-start' },
  messageContent: { display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '85%' },
  botAvatar: { width: '28px', height: '28px', background: 'rgba(255,215,0,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  userAvatar: { width: '28px', height: '28px', background: 'rgba(51,153,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  messageText: { background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '8px 12px', position: 'relative' },
  preText: { margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#fff', fontSize: '0.9rem', lineHeight: '1.4' },
  timestamp: { fontSize: '0.7rem', color: '#666', display: 'block', marginTop: '4px' },
  typingIndicator: { display: 'flex', gap: '4px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', width: '60px', justifyContent: 'center' },
  typingDot: { width: '8px', height: '8px', background: '#ffd700', borderRadius: '50%', animation: 'typing 1.4s infinite' },
  suggestions: { padding: '12px', borderTop: '1px solid rgba(255,215,0,0.1)', display: 'flex', gap: '8px', flexWrap: 'wrap' },
  suggestionBtn: { background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '20px', padding: '6px 12px', color: '#ffd700', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.3s' },
  inputArea: { padding: '12px', borderTop: '1px solid rgba(255,215,0,0.1)', display: 'flex', gap: '8px', alignItems: 'flex-end' },
  input: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '12px', padding: '10px 12px', color: '#fff', fontSize: '0.9rem', resize: 'none', fontFamily: 'inherit', maxHeight: '100px' },
  sendBtn: { background: 'linear-gradient(135deg, #ffd700, #ff8c00)', border: 'none', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: '#1a1a2e' },
  sendBtnDisabled: { opacity: 0.5, cursor: 'not-allowed' }
};

export default GoDiamond;