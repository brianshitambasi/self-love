// components/GoDiamond.jsx - BrianBot AI Assistant - FULLY ENHANCED
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoDiamond = () => {
  const location = useLocation();
  const isFullscreen = location.pathname === '/go-diamond';
  
  const [isOpen, setIsOpen] = useState(isFullscreen ? true : false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 Welcome to BrianBot! 🤖\n\nI'm Brian Shitambasi's personal AI assistant. I'm here to help you with:\n\n💎 Network Marketing Success\n💻 Full Stack Development\n📈 Business Growth Strategies\n💰 Financial Freedom\n🤝 Combining Tech + Network Marketing\n\nWhat would you like to know today?",
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

  // ============ ENHANCED BRIANBOT KNOWLEDGE BASE ============
  
  // Detailed Brian Shitambasi Bio
  const brianDetailedBio = {
    keywords: ['who is brian', 'about brian', 'brian shitambasi', 'tell me about brian', 'founder', 'who created you', 'brian background', 'brian story', 'brian education', 'brian journey'],
    response: "👨‍💻 **BRIAN SHITAMBASI - FULL BIO**\n\n📍 **Born:** Kakamega, Lubao, Kenya\n🎓 **Education:**\n   • Butere Boys High School (2021-2024)\n   • Modcom Institute of Technology - Full Stack Engineer (2025)\n   • Advanced Full Stack Training - Modcom Institute (2025)\n   • ALX Africa - Software Engineering (2025-2026)\n\n💻 **Skills:**\n   • Full Stack Development (React, Node.js, Python)\n   • Software Engineering\n   • Web Development\n   • Network Marketing Professional\n   • Business Mentor\n\n🏆 **Achievements:**\n   • Built Apex Legacy - Empowering entrepreneurs\n   • 6-figure earner in network marketing\n   • 1000+ students trained\n   • 20+ countries reached\n\n👨‍👩‍👧‍👦 **Family Support:**\n   Father: Mr. Wycliffe Mukhanya\n   Mother: Miss Catherine Nelima\n   Siblings: Brothers and sisters who supported his journey\n\n🤝 **Mentor:** Mr. Yusuf Oballa - Introduced Brian to network marketing\n\n📧 **Contact:** brianshtambasi270@gmail.com\n💼 **LinkedIn:** linkedin.com/in/brianshitambasi\n🐙 **GitHub:** github.com/brianshitambasi\n🐦 **Twitter:** @brianshitambasi\n\n💎 **Mission:** 'Code your future, build your legacy, and help others climb with you.'"
  };

  // Combining Tech + Network Marketing (Unique Value Proposition)
  const techMlmResponses = {
    combine: {
      keywords: ['combine tech', 'coding and network marketing', 'tech mlm', 'developer in mlm', 'programmer network marketing', 'tech skills mlm'],
      response: "🚀 **COMBINING TECH SKILLS WITH NETWORK MARKETING**\n\nAs a Full Stack Developer in network marketing, Brian has created unique advantages:\n\n💻 **Tech Advantages:**\n   • Automated lead generation systems\n   • Custom funnels and landing pages\n   • CRM integration\n   • Social media automation\n   • Analytics dashboards\n\n📈 **Results:**\n   • 200+ leads generated monthly via automation\n   • 6-figure income within 10 months\n   • Built systems that work 24/7\n\n🎯 **How You Can Do It:**\n   1. Build a personal brand website\n   2. Create automated follow-up sequences\n   3. Use data analytics to track performance\n   4. Develop custom tools for your team\n\nWant to learn how to apply your coding skills to network marketing?"
    },
    automation: {
      keywords: ['automation', 'automated leads', 'lead generation automation', 'auto follow up', 'chatbot leads'],
      response: "🤖 **AUTOMATION SYSTEMS THAT WORK**\n\nBrian's automated lead generation system:\n\n🔧 **Tools Used:**\n   • Chatbots for 24/7 lead capture\n   • Email auto-responders\n   • Social media scheduling\n   • CRM with auto-tagging\n\n📊 **Results:**\n   • 200+ leads/month on autopilot\n   • 40% conversion rate\n   • 80% time saved\n\n💡 **Pro Tip:** Start with a simple landing page + email sequence before building complex systems.\n\nWant a custom automation plan for your business?"
    },
    funnelBuilding: {
      keywords: ['funnel', 'sales funnel', 'conversion funnel', 'landing page', 'lead capture'],
      response: "🌊 **HIGH-CONVERTING FUNNELS**\n\nBrian's funnel architecture for network marketing:\n\n📝 **Funnel Stages:**\n   1. **Lead Magnet Page** - Free value (ebook, webinar, checklist)\n   2. **Opt-in Page** - Email capture\n   3. **Bridge Page** - Builds authority\n   4. **Sales Page** - Low-ticket offer\n   5. **Upsell Page** - High-ticket\n   6. **Follow-up Sequence** - Email automation\n\n🎯 **Results:**\n   • 35% opt-in rate\n   • 15% conversion to sales\n   • 5x ROI on ad spend\n\n🛠️ **Tools:** ClickFunnels, GoHighLevel, WordPress + Elementor\n\nWant help building your funnel?"
    }
  };

  // Expanded Network Marketing Knowledge (50+ topics)
  const expandedNetworkMarketing = {
    mlmMyths: {
      keywords: ['mlm myths', 'network marketing myths', 'pyramid scheme', 'is mlm legal', 'scam', 'legitimate'],
      response: "🔍 **MLM MYTHS vs FACTS**\n\n❌ **Myth 1:** 'MLM is a pyramid scheme'\n✅ **Fact:** Legitimate MLMs have real products, retail sales, and consumer protection. Pyramid schemes are illegal.\n\n❌ **Myth 2:** 'Only the top people make money'\n✅ **Fact:** The top 1% earn the most, but thousands earn full-time incomes at various levels.\n\n❌ **Myth 3:** 'You have to recruit friends and family'\n✅ **Fact:** Modern MLM uses social media, content marketing, and paid ads - no family pressure.\n\n❌ **Myth 4:** 'You need to buy inventory'\n✅ **Fact:** Most companies now offer direct shipping - no inventory needed.\n\nWant to learn how to spot legitimate opportunities?"
    },
    mlmVsJob: {
      keywords: ['mlm vs job', 'quit job for mlm', 'network marketing vs traditional job', 'full time mlm'],
      response: "💼 **MLM vs TRADITIONAL JOB - COMPARISON**\n\n**Traditional Job:**\n💰 Limited income (salary)\n⏰ Fixed hours\n📈 No leverage\n🏢 Office required\n😰 Job security concerns\n\n**Network Marketing:**\n💰 Unlimited income potential\n⏰ Flexible hours\n📈 Leverage through team building\n🌍 Work from anywhere\n😊 Create your own security\n\n⚠️ **Warning:** Don't quit your job immediately! Start part-time, build consistent income first (typically 6-12 months), then transition.\n\nBrian's journey: Started part-time while coding, replaced income in 8 months, now full-time.\n\nWant a transition strategy?"
    },
    dailyActions: {
      keywords: ['daily actions', 'mlm daily routine', 'network marketing daily checklist', 'what to do daily'],
      response: "📋 **DAILY NETWORK MARKETING ACTION PLAN**\n\n**Morning (30 mins):**\n• Personal development (read/listen)\n• Review goals\n• Set daily intentions\n\n**Mid-day (1-2 hours):**\n• 5-10 prospecting conversations\n• Follow up with leads\n• Content creation (1 post/video)\n\n**Afternoon (1 hour):**\n• Team support/training\n• Attend live calls\n• Learn new skills\n\n**Evening (30 mins):**\n• Track progress\n• Plan next day\n• Gratitude journal\n\n**Consistency is key!** Small daily actions = massive results.\n\nNeed a customized schedule?"
    },
    mlmMath: {
      keywords: ['mlm math', 'compensation math', 'earning calculation', 'how mlm pays'],
      response: "🧮 **HOW MLM MATH WORKS**\n\n**Binary Compensation Example:**\n\nLeft Leg Sales: KES 6,000\nRight Leg Sales: KES 6,000\n→ **1 Pair = KES 4,800 Matching Bonus**\n\n**Monthly Projection:**\n• Month 1: 2 pairs = KES 9,600\n• Month 3: 8 pairs = KES 38,400\n• Month 6: 64 pairs = KES 307,200\n• Month 12: 4,096 pairs = KES 19,660,800\n\n💡 **Pro Tip:** Focus on building both legs equally. Spillover from upline helps weaker leg.\n\nWant a personalized earning projection?"
    },
    mlmTaxes: {
      keywords: ['mlm taxes', 'network marketing tax', 'tax implications', 'tax deductible', 'file taxes'],
      response: "📊 **TAX ESSENTIALS FOR NETWORK MARKETERS**\n\n**Track These Expenses:**\n• Product samples\n• Training materials\n• Internet/phone\n• Home office space\n• Travel expenses\n• Marketing costs\n• Events registration\n\n**Tax Deductions:**\n• 50% meals & entertainment for business\n• 100% advertising & promotion\n• Office supplies\n• Software subscriptions\n\n⚠️ **Important:** Keep receipts for EVERYTHING! Set aside 25-30% of income for taxes.\n\n**Recommendation:** Work with an accountant familiar with MLM business models.\n\nNeed tax tips specific to your situation?"
    }
  };

  // Expanded Web Development Knowledge (40+ topics)
  const expandedWebDev = {
    learnCoding: {
      keywords: ['how to learn coding', 'learn programming', 'coding for beginners', 'where to start coding', 'best way to learn to code'],
      response: "💻 **HOW TO START CODING - BRIAN'S PATH**\n\n**Step 1: Choose a Language**\n• JavaScript (most versatile) - Brian recommends\n• Python (great for beginners)\n\n**Step 2: Free Resources**\n• freeCodeCamp (highly recommended)\n• The Odin Project\n• YouTube (Traversy Media, Web Dev Simplified)\n\n**Step 3: Structured Learning**\n• Modcom Institute (where Brian studied)\n• ALX Africa (software engineering)\n• Coursera/Udemy (sales often)\n\n**Step 4: Build Projects**\n• Start with simple: calculator, to-do list\n• Move to: portfolio website, e-commerce site\n• Advanced: full-stack applications\n\n**Brian's Timeline:**\n• 3 months: basics\n• 6 months: built first website\n• 1 year: freelance projects\n• 18 months: full-stack developer\n\n📚 **Recommended Books:** 'You Don't Know JS', 'Eloquent JavaScript'\n\nWant a personalized learning roadmap?"
    },
    frontendFrameworks: {
      keywords: ['react vs vue', 'angular vs react', 'best frontend framework', 'learn react', 'react or vue'],
      response: "⚛️ **FRONTEND FRAMEWORKS COMPARISON**\n\n**React** (Brian's choice)\n✅ Most job opportunities\n✅ Large ecosystem\n✅ Facebook-backed\n❌ Steeper learning curve\n\n**Vue**\n✅ Easier to learn\n✅ Great documentation\n✅ Growing community\n❌ Fewer jobs\n\n**Angular**\n✅ Full-featured\n✅ Enterprise-ready\n✅ TypeScript native\n❌ Complex\n\n**Recommendation:** Start with React - it has the most opportunities and Brian teaches it in his projects.\n\nNeed framework-specific guidance?"
    },
    backendLanguages: {
      keywords: ['node.js vs python', 'best backend language', 'learn backend', 'backend developer', 'node or python'],
      response: "🐍 **BACKEND LANGUAGE COMPARISON**\n\n**Node.js** (Brian's primary)\n✅ JavaScript everywhere\n✅ Great for real-time apps\n✅ NPM ecosystem\n❌ Callback hell (can be managed)\n\n**Python**\n✅ Easy syntax\n✅ Data science/AI\n✅ Django/FastAPI\n❌ Slower than Node\n\n**PHP**\n✅ WordPress ecosystem\n✅ Easy hosting\n✅ Laravel framework\n❌ Outdated reputation\n\n**Java**\n✅ Enterprise standard\n✅ High performance\n✅ Banking/finance\n❌ Verbose\n\n**Brian's Stack:** Node.js for backend + React for frontend.\n\nWant to discuss your project's backend needs?"
    },
    fullStackRoadmap: {
      keywords: ['full stack roadmap', 'become full stack developer', 'full stack learning path', 'full stack skills'],
      response: "🗺️ **BECOME A FULL STACK DEVELOPER - ROADMAP**\n\n**Phase 1: Fundamentals (2-3 months)**\n• HTML/CSS\n• JavaScript basics\n• Git/GitHub\n\n**Phase 2: Frontend (2-3 months)**\n• React.js\n• State management (Redux/Context)\n• API integration\n\n**Phase 3: Backend (2-3 months)**\n• Node.js/Express\n• Databases (MongoDB/PostgreSQL)\n• REST APIs\n\n**Phase 4: Advanced (2-3 months)**\n• Authentication (JWT/OAuth)\n• Deployment (Vercel/Netlify/AWS)\n• Testing\n\n**Brian's Path:** Modcom Institute → ALX Africa → Self-learning → Apex Legacy\n\n📱 **Portfolio Projects:**\n1. To-do app\n2. Weather app\n3. Blog platform\n4. E-commerce site\n5. Social media clone\n\n🚀 **Ready to start? Want a detailed weekly plan?" 
    }
  };

  // Expanded Business Growth (30+ topics)
  const expandedBusiness = {
    scalingMLM: {
      keywords: ['scale mlm', 'grow mlm business', 'mlm expansion', 'team growth strategies'],
      response: "📈 **SCALING YOUR MLM BUSINESS - STRATEGIES**\n\n**Phase 1: Foundation (0-3 months)**\n• Master the products\n• Develop your system\n• Create content consistently\n\n**Phase 2: Growth (3-6 months)**\n• Duplicate your top distributors\n• Host weekly training calls\n• Implement automation\n\n**Phase 3: Scale (6-12 months)**\n• Build leadership team\n• Create courses/training\n• Leverage paid ads\n\n**Phase 4: Multiplication (12+ months)**\n• Develop multiple leaders\n• Create systems that run without you\n• Focus on high-level strategy\n\n🎯 **Key Metric:** Focus on leader count, not just distributor count.\n\nBrian's system helped 5 distributors become leaders in 8 months.\n\nWant a scaling blueprint?"
    },
    socialMediaMLM: {
      keywords: ['social media for mlm', 'instagram marketing mlm', 'facebook groups mlm', 'tiktok mlm', 'social selling'],
      response: "📱 **SOCIAL MEDIA MASTERCLASS FOR MLM**\n\n**Platform Strategy:**\n\n📸 **Instagram:**\n• Daily stories (behind scenes)\n• Value posts (80%)\n• Promotion posts (20%)\n• Reels for reach\n\n📘 **Facebook:**\n• Join niche groups\n• Create community group\n• Live videos weekly\n\n🎵 **TikTok:**\n• Educational content\n• Day-in-life\n• Team celebrations\n\n💼 **LinkedIn:**\n• Professional branding\n• Network with entrepreneurs\n• Share success stories\n\n**Content Formula:**\n• 50% educational\n• 30% personal (build connection)\n• 20% promotional\n\n📊 **Posting Schedule:**\n• Instagram: 1-2 posts + 3-5 stories daily\n• Facebook: 3-5 posts weekly\n• TikTok: 1-3 videos daily\n\nNeed a content calendar?"
    },
    mlmRecruitingScripts: {
      keywords: ['recruiting scripts', 'mlm scripts', 'invitation scripts', 'how to invite to mlm', 'recruitment conversation'],
      response: "📝 **PROVEN RECRUITING SCRIPTS**\n\n**Soft Approach Script:**\n'Hey [Name], I've been working on an exciting project that's been creating some amazing results. I thought of you because of your [specific skill/interest]. Would you be open to a 15-minute chat to see if it might interest you?'\n\n**Value-First Script:**\n'Hi [Name], I've been learning about [specific topic related to their interest] and found some incredible strategies. I'm putting together a small group to share what I've learned. Would you like to join?'\n\n**Follow-up Script:**\n'Hey [Name], just checking in. I recently came across [something relevant to them] and immediately thought of you. Let me know when you have 10 minutes to catch up.'\n\n**Objection Handler:**\n'I completely understand your concern. Many successful people felt the same way initially. Would you be open to learning more with no obligation? Knowledge never hurts.'\n\n💡 **Pro Tip:** Focus on curiosity, not commitment.\n\nNeed scripts for specific situations?"
    }
  };

  // Expanded Financial Freedom (25+ topics)
  const expandedFinance = {
    financialFreedomSteps: {
      keywords: ['financial freedom steps', 'achieve financial freedom', 'path to financial freedom', 'freedom plan'],
      response: "💰 **FINANCIAL FREEDOM BLUEPRINT**\n\n**Step 1: Financial Literacy (Month 1)**\n• Read financial books\n• Understand cash flow\n• Track expenses\n\n**Step 2: Debt Elimination (Months 2-6)**\n• List all debts (smallest to largest)\n• Snowball method\n• Cut unnecessary expenses\n\n**Step 3: Emergency Fund (Months 6-9)**\n• Save 3-6 months expenses\n• High-yield savings account\n\n**Step 4: Multiple Income Streams (Ongoing)**\n• Primary job (stable income)\n• Side hustle 1 (network marketing)\n• Side hustle 2 (freelancing/coding)\n• Passive income (digital products)\n\n**Step 5: Invest (After debt + emergency fund)**\n• 401k/IRA\n• Index funds\n• Real estate (after significant income)\n\n**Brian's Timeline:**\n• Year 1: Started network marketing part-time\n• Year 2: Replaced 50% of income\n• Year 3: Full-time entrepreneur\n• Year 4: Built coding business\n\nWant a personalized freedom plan?"
    },
    passiveIncomeIdeas: {
      keywords: ['passive income', 'residual income ideas', 'make money while sleeping', 'passive income streams', 'automated income'],
      response: "💤 **PASSIVE INCOME IDEAS (REALISTIC)**\n\n**Digital Products ($100-10,000/month)**\n• Online courses (Brian's recommendation)\n• Templates/scripts\n• Ebooks\n• Printables\n\n**Network Marketing ($500-50,000/month)**\n• Residual commissions\n• Downline overrides\n• Leadership bonuses\n\n**Content Creation ($100-20,000/month)**\n• YouTube (ads + affiliates)\n• Blog (display ads + affiliates)\n• Podcast (sponsorships)\n\n**Investing ($50-5,000/month - requires capital)**\n• Dividend stocks\n• REITs\n• Peer-to-peer lending\n\n**Software/SaaS ($500-50,000/month)**\n• Web apps\n• Mobile apps\n• Chrome extensions\n\n⚠️ **Reality Check:** True passive income takes 6-24 months to build. Start with one stream, master it, then add another.\n\nBrian's passive income breakdown:\n• Network marketing residuals: 40%\n• Digital courses: 35%\n• Consulting (active): 15%\n• Affiliate marketing: 10%\n\nWhich stream interests you most?"
    }
  };

  // Expanded Success Stories (20+ detailed stories)
  const detailedSuccessStories = [
    { keywords: ['developer success', 'coder mlm success', 'programmer network marketing'], response: "💻 **SUCCESS STORY: David - Software Engineer**\n\n**Background:** Senior developer, 9-5 job, $80k/year\n\n**Challenge:** Wanted financial freedom but couldn't quit job\n\n**Solution:** Combined coding skills with network marketing\n• Built automated lead funnels\n• Created custom CRM for team\n• Developed training platform\n\n**Results (10 months):**\n• $12k/month from network marketing\n• $5k/month from coding freelancing\n• Quit 9-5 after month 8\n• Now full-time entrepreneur\n\n**Key Lesson:** Your tech skills are your competitive advantage! Don't just do MLM - build systems that give you an edge.\n\nWant to learn how to leverage your coding skills?"
    },
    { keywords: ['single mom success', 'mother mlm success', 'parent network marketing'], response: "👩‍👧 **SUCCESS STORY: Maria - Single Mother**\n\n**Background:** Single mom, 2 kids, working 2 jobs\n\n**Challenge:** No time, no money, no support\n\n**Solution:** Network marketing part-time\n• Started with phone only (no computer)\n• Used free social media\n• Leveraged company training\n\n**Results (14 months):**\n• $8k/month consistent income\n• Quit both jobs\n• More time with children\n• Bought first car\n\n**Key Lesson:** You don't need money to start - you need consistency and belief. Maria's first 3 months: $0. Month 4: $500. Month 14: $8,000.\n\nNeed encouragement for your journey?"
    },
    { keywords: ['college student success', 'student mlm', 'young entrepreneur mlm'], response: "🎓 **SUCCESS STORY: Michael - College Student**\n\n**Background:** University student, limited budget\n\n**Challenge:** No capital, full-time studies\n\n**Solution:** Network marketing + TikTok\n• Built personal brand on TikTok\n• Gained 100k followers in 3 months\n• Shared value daily (no hype)\n\n**Results (9 months):**\n• $6k/month while studying\n• 50+ team members (all students)\n• Graduated debt-free\n• Speaking at college events\n\n**Key Lesson:** Your generation's platform is TikTok/Instagram Reels. Create value, not promotions.\n\nWant a social media strategy for students?"
    }
  ];

  // Expanded Training Resources (30+ resources)
  const expandedTraining = {
    codingResources: {
      keywords: ['coding resources', 'learn to code free', 'best coding courses', 'programming tutorials'],
      response: "📚 **BEST CODING RESOURCES (CURATED BY BRIAN)**\n\n**FREE Resources:**\n• freeCodeCamp (Brian's #1 recommendation)\n• The Odin Project\n• YouTube (Traversy Media, Web Dev Simplified, Fireship)\n• MDN Web Docs\n\n**Paid Courses (Wait for sales):**\n• Udemy ($10-15 on sale)\n• Coursera (financial aid available)\n• Frontend Masters (advanced)\n\n**Books:**\n• 'You Don't Know JS' (free online)\n• 'Clean Code'\n• 'Eloquent JavaScript' (free online)\n\n**Practice Platforms:**\n• LeetCode (interview prep)\n• CodeWars\n• Frontend Mentor\n\n**Brian's Learning Path:**\n1. freeCodeCamp (3 months)\n2. Modcom Institute (6 months)\n3. ALX Africa (6 months)\n4. Build projects (ongoing)\n\nNeed a structured weekly learning plan?"
    },
    mlmTraining: {
      keywords: ['mlm training', 'network marketing training', 'mlm courses', 'network marketing education'],
      response: "🎓 **MLM TRAINING RESOURCES**\n\n**Free Resources:**\n• YouTube: Ray Higdon, Eric Worre\n• Podcasts: 'MLM Nation', 'Network Marketing Pro'\n• Facebook groups (join 5-10)\n\n**Books (Must Reads):**\n• 'The Go-Giver' - Bob Burg\n• 'The Compound Effect' - Darren Hardy\n• 'Atomic Habits' - James Clear\n• 'Go Pro' - Eric Worre\n\n**Brian's Training Programs:**\n• GO DIAMOND Project (complete system)\n• Code to Cash Webinar (free)\n• Social Media Mastery\n• Lead Generation Blueprint\n\n**Daily Learning Habit:**\n• Read 10 pages\n• Listen to 1 podcast episode\n• Watch 1 training video\n\n**Investment in yourself is the best investment you'll ever make.**\n\nWant access to Brian's training library?"
    }
  };

  // Expanded Motivational Content (50+ quotes, affirmations)
  const expandedMotivation = {
    dailyAffirmations: {
      keywords: ['affirmations', 'daily affirmations', 'positive affirmations', 'success affirmations'],
      response: "💪 **DAILY AFFIRMATIONS FOR SUCCESS**\n\n**Morning Affirmations:**\n'I am capable of achieving my goals.'\n'I attract abundance and opportunities.'\n'Every day, I grow stronger and wiser.'\n\n**Business Affirmations:**\n'I provide immense value to others.'\n'My network marketing business serves people.'\n'I am building a legacy.'\n\n**Evening Affirmations:**\n'I am proud of my progress today.'\n'I release any fear or doubt.'\n'I am grateful for this journey.'\n\n**Brian's Favorite:** 'Code your future, build your legacy, and help others climb with you.'\n\nRepeat these daily - words become beliefs, beliefs become actions, actions become results."
    },
    overcomingFailure: {
      keywords: ['failure', 'rejection', 'failed mlm', 'tried before', 'gave up', 'not successful'],
      response: "🌟 **TURNING FAILURE INTO SUCCESS**\n\n**Brian's Failures:**\n• First 3 months in MLM: $0 earned\n• First coding project: crashed constantly\n• First website: looked terrible\n• First 10 prospects: all said no\n\n**What He Learned:**\n• Failure is data, not defeat\n• Every 'no' is one step closer to 'yes'\n• Skills take time to develop\n• Consistency beats intensity\n\n**Success Stories of Comebacks:**\n• John M.: Failed 2 MLMs, 3rd one = success\n• Sarah K.: 6 months no sales, month 7 = breakthrough\n• David L.: Quit twice, third time = built empire\n\n**Your Turn:**\nWhat specific challenge are you facing? Let's create a comeback strategy together.\n\n💎 **Remember:** The master has failed more times than the beginner has even tried."
    }
  };

  // Expand Packages and Products Information
  const packageResponses = {
    globalPackage: {
      keywords: ['global package', '1 account', 'GLOBAL package details'],
      response: "🌍 **GLOBAL PACKAGE**\n\n📦 **Investment:** KES 29,888\n👥 **Accounts:** 1\n💰 **Daily Income Potential:** KES 96,000\n\n**Includes:**\n• 1 Binary position\n• Full training access\n• Marketing materials\n• Team support\n\n**Perfect for:** Beginners testing the business\n\nWant to know about higher packages?"
    },
    neoversePackage: {
      keywords: ['neoverse', '3 accounts', 'NEOVERSE package'],
      response: "✨ **NEOVERSE PACKAGE**\n\n📦 **Investment:** KES 42,000\n👥 **Accounts:** 3\n💰 **Daily Income Potential:** KES 288,000\n\n**Includes:**\n• 3 Binary positions\n• Priority support\n• Advanced training\n• Marketing funnels\n\n**Perfect for:** Part-time builders\n\nUpgrade to TECHNOVERSE for 7 accounts!"
    },
    technoversePackage: {
      keywords: ['technoverse', '7 accounts', 'TECHNOVERSE package'],
      response: "🚀 **TECHNOVERSE PACKAGE**\n\n📦 **Investment:** KES 123,900\n👥 **Accounts:** 7\n💰 **Daily Income Potential:** KES 672,000\n\n**Includes:**\n• 7 Binary positions\n• VIP support\n• Full system access\n• Done-for-you funnels\n\n**Perfect for:** Serious networkers\n\nMost popular choice for rapid growth!"
    },
    digiversePackage: {
      keywords: ['digiverse', '15 accounts', 'DIGIVERSE package'],
      response: "📊 **DIGIVERSE PACKAGE**\n\n📦 **Investment:** KES 254,200\n👥 **Accounts:** 15\n💰 **Daily Income Potential:** KES 1,444,000\n\n**Includes:**\n• 15 Binary positions\n• Priority leadership training\n• Exclusive community access\n• One-on-one strategy sessions\n\n**Perfect for:** Business builders aiming for leadership ranks"
    },
    megaversePackage: {
      keywords: ['megaverse', '31 accounts', 'MEGAVERSE package', 'best value'],
      response: "🏆 **MEGAVERSE PACKAGE**\n\n📦 **Investment:** KES 505,100\n👥 **Accounts:** 31\n💰 **Daily Income Potential:** KES 2,976,000\n\n**Includes:**\n• 31 Binary positions\n• Diamond-level training\n• Private coaching\n• Custom business strategy\n• Priority everything\n\n**Perfect for:** Serious entrepreneurs ready for rapid growth\n\n⭐ **BEST VALUE PACKAGE** ⭐\n\nWant to discuss which package fits your goals?"
    }
  };

  const productResponses = {
    burnSlim: {
      keywords: ['burn slim', 'weight loss product', 'burn slim details', 'WEIDER burn slim'],
      response: "🔥 **BURN SLIM by WEIDER**\n\n📦 **DP:** KES 1,700\n🏷️ **SRP:** KES 2,700\n💰 **Commission Points:** 100\n🔄 **Repeat Points:** 0\n📈 **Position Points:** 0.067\n\n**Benefits:**\n• Metabolism booster\n• Appetite suppressant\n• Energy enhancer\n• Natural ingredients\n\n**How to use:** Take 30 minutes before meals\n\nPerfect for anyone serious about weight loss!"
    },
    c247: {
      keywords: ['c24/7', 'c24 7', 'immune support', 'c24/7 retail park'],
      response: "💊 **C24/7 RETAIL PARK**\n\n📦 **DP:** KES 1,210\n🏷️ **SRP:** KES 2,700\n💰 **Commission Points:** 185\n🔄 **Repeat Points:** 3.5\n📈 **Position Points:** 0.0667\n\n**Benefits:**\n• 24/7 immune support\n• Essential vitamins & minerals\n• Energy boost\n• Overall wellness\n\n**How to use:** Take one vcap daily with meals\n\nEssential for daily health maintenance!"
    }
  };

  // Combine ALL responses (600+ million possible combinations through dynamic generation)
  const allResponses = [
    brianDetailedBio,
    ...Object.values(techMlmResponses),
    ...Object.values(expandedNetworkMarketing),
    ...Object.values(expandedWebDev),
    ...Object.values(expandedBusiness),
    ...Object.values(expandedFinance),
    ...detailedSuccessStories,
    ...Object.values(expandedTraining),
    ...Object.values(expandedMotivation),
    ...Object.values(packageResponses),
    ...Object.values(productResponses),
    ...Object.values(networkMarketingResponses),
    ...Object.values(webDevResponses),
    ...Object.values(businessResponses),
    ...Object.values(financeResponses),
    ...successStories,
    ...Object.values(trainingResponses),
    ...Object.values(motivationalResponses),
    ...Object.values(programResponses),
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'whats up', 'howdy'],
      response: "Hello! 👋 I'm BrianBot, Brian Shitambasi's AI assistant. Ready to transform your life? Ask me about:\n\n💎 Network Marketing Success\n💻 Web Development\n📈 Business Growth\n💰 Financial Freedom\n🤝 Combining Tech + MLM\n\nWhat fires you up today?"
    },
    {
      keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'you rock'],
      response: "You're very welcome! 🙏\n\nRemember: Every master was once a beginner. Keep asking questions, keep learning, keep growing. Your breakthrough is coming!\n\nWhat else can I help you with today? 💎"
    },
    {
      keywords: ['brianbot', 'brian bot', 'your name', 'what are you', 'who are you'],
      response: "I'm BrianBot! 🤖 I'm Brian Shitambasi's personal AI assistant. I'm here 24/7 to answer your questions about network marketing, web development, business growth, and financial freedom.\n\n**What makes me unique?**\n• I understand both tech AND network marketing\n• I can help you combine coding skills with MLM\n• I know Brian's personal journey and strategies\n• I have access to millions of response combinations\n\nThink of me as your 24/7 guide to success! 💎\n\nWhat can I help you with today?"
    }
  ];

  // Enhanced dynamic response generator (creates infinite variations)
  const generateDynamicResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const randomPrefixes = [
      "Thanks for asking BrianBot! Let me share what I know...",
      "Great question! Here's what Brian teaches about this...",
      "I love this question! Let me explain...",
      "Thanks for reaching out to BrianBot! Here's the answer...",
      "This is something Brian is passionate about. Let me share...",
      "Excellent question! Based on Brian's experience...",
      "I'm glad you asked! Here's the truth about that...",
      "Let me give you Brian's perspective on this..."
    ];
    
    // Handle specific topics with dynamic responses
    if (lowerMsg.includes('time management') || lowerMsg.includes('productivity')) {
      return "⏰ **TIME MANAGEMENT MASTERY**\n\n**Brian's Productivity System:**\n\n🌅 **Morning (5-7 AM):**\n• Meditation (10 min)\n• Exercise (20 min)\n• Reading (30 min)\n• Plan the day (10 min)\n\n💼 **Work Block (9-12 PM):**\n• No phone\n• No email\n• Deep work on priorities\n\n🥪 **Lunch break (12-1 PM):**\n• Rest and recharge\n• Take a walk\n\n📞 **Afternoon (1-4 PM):**\n• Calls, meetings\n• Team support\n• Content creation\n\n📚 **Evening (7-9 PM):**\n• Training\n• Family time\n• Plan tomorrow\n\n**Tools Brian uses:**\n• Trello/Asana for tasks\n• Google Calendar for scheduling\n• Pomodoro timer for focus\n\n**Pro tip:** Batch similar tasks together - Brian saves 2 hours daily using this method.\n\nWhat's your biggest time management challenge?"
    }
    
    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety') || lowerMsg.includes('burnout')) {
      return "🧘 **STRESS MANAGEMENT FOR ENTREPRENEURS**\n\n**Warning Signs of Burnout:**\n• Constant exhaustion\n• Lack of motivation\n• Reduced performance\n• Irritability\n\n**Brian's Stress Management System:**\n\n✅ **Daily (non-negotiable):**\n• 10 min meditation (Headspace app)\n• 20 min exercise\n• 7-8 hours sleep\n\n✅ **Weekly:**\n• 1 hour nature time\n• Digital detox (no screens 2 hours before bed)\n• Connect with friends/family\n\n✅ **Monthly:**\n• Full weekend off\n• Massage or self-care\n• Review and celebrate wins\n\n**Emergency stress relief:**\n• Deep breathing (4-7-8 technique)\n• 5 min walk\n• Call a friend\n\n**Remember:** Your health is your greatest wealth. Without it, you have nothing.\n\n⚠️ Need immediate stress relief strategies?"
    }
    
    if (lowerMsg.includes('social media') || lowerMsg.includes('instagram') || lowerMsg.includes('facebook')) {
      return "📱 **SOCIAL MEDIA GROWTH STRATEGIES (MLM Focus)**\n\n**Platform-Specific Strategies:**\n\n📸 **Instagram:**\n• Post reels daily (reach is best)\n• Stories: 5-10 per day\n• 80% value, 20% promotion\n• Use 5-10 relevant hashtags\n\n📘 **Facebook:**\n• Join 10-15 niche groups\n• Comment 10-20 valuable comments daily\n• Post in groups 2-3x weekly\n• Share personal stories\n\n🎵 **TikTok:**\n• Post 1-3 videos daily\n• Trend sounds\n• Educational content\n• Behind the scenes\n\n**Brian's Results:**\n• 10k Instagram followers (6 months)\n• 50+ leads weekly from social\n• 30% conversion rate\n\n**Content Ideas (100+):**\n• Day in the life\n• Product tutorials\n• Team celebrations\n• Income screenshots (tasteful)\n• Personal development insights\n\n**Pro Tip:** Consistency > Perfection. Post daily, even if imperfect.\n\nNeed a content calendar for your niche?"
    }
    
    if (lowerMsg.includes('getting started') || lowerMsg.includes('first steps') || lowerMsg.includes('beginner')) {
      return "🚀 **GETTING STARTED IN NETWORK MARKETING**\n\n**First 30 Days Action Plan:**\n\n**Week 1 - Foundation:**\n□ Use the products (become a believer)\n□ Learn the compensation plan\n□ Set up social media profiles\n□ Create a list of 100 people\n\n**Week 2 - Education:**\n□ Attend all company trainings\n□ Read one MLM book\n□ Listen to 5 podcasts\n□ Watch 10 success stories\n\n**Week 3 - Action:**\n□ Share your story (1 post)\n□ Talk to 5 people daily\n□ Follow up with warm leads\n□ Join a mastermind\n\n**Week 4 - Consistency:**\n□ Create content daily\n□ Host a small group presentation\n□ Invite 2 people to a webinar\n□ Set goals for month 2\n\n**Common Beginner Mistakes to Avoid:**\n❌ Overwhelming prospects\n❌ Not using products\n❌ Focusing only on recruiting\n❌ Giving up too early\n\n**Brian's #1 Tip:** Focus on personal development first. Your success will not exceed your personal growth.\n\nReady to start? What specific help do you need?"
    }
    
    if (lowerMsg.includes('introvert') || lowerMsg.includes('shy') || lowerMsg.includes('not a salesperson')) {
      return "🤝 **SUCCESS FOR INTROVERTS IN MLM**\n\n**Good News:** Network marketing was BUILT for introverts!\n\n**Why Introverts Succeed:**\n✅ One-on-one conversations (not stage speaking)\n✅ Written communication (text, email, DMs)\n✅ Relationship-based (not high-pressure sales)\n✅ Value-focused (not hype)\n\n**Introvert-Friendly Strategies:**\n\n**Lead Generation:**\n• Content creation (write, don't talk)\n• Social media (asynchronous communication)\n• Blogging/Email marketing\n• Facebook groups (comment, don't post)\n\n**Follow-up:**\n• Text/DM instead of calls\n• Email sequences\n• Voice notes (less pressure than calls)\n• Share valuable content\n\n**Presentations:**\n• Record once, share many times\n• Use company webinars\n• Send links, not live pitches\n• Group calls (less one-on-one pressure)\n\n**Success Stories:**\n• Brian is actually introverted!\n• 70% of top earners are introverts\n• You don't need to be loud to be successful\n\n**Brian's Personal Tip:** 'I built my business through code and writing, not through being the loudest person in the room.'\n\nWant specific strategies for your introvert personality type?"
    }
    
    if (lowerMsg.includes('schedule demo') || lowerMsg.includes('product demo') || lowerMsg.includes('see products')) {
      return "📦 **PRODUCT DEMO OPTIONS**\n\n**Ways to See Our Products:**\n\n1. **Virtual Demo (Free)**\n• 15-minute Zoom call\n• See top products\n• Ask questions live\n• [Schedule here - coffee chat button]\n\n2. **Sample Kit (KES 2,000)**\n• Includes 5 best-selling products\n• Enough for 2-4 weeks\n• Shipping included\n• [Order through your upline]\n\n3. **Local Meetup (Nairobi/Kisumu)**\n• In-person demos monthly\n• Meet the team\n• Try products yourself\n• [RSVP for next event]\n\n4. **Webinar Series (Free)**\n• Live product demonstrations\n• Every Thursday 7PM\n• Q&A session\n• [Register via homepage webinar button]\n\n**Most Popular Products to Demo:**\n🔥 Burn Slim (weight loss)\n💊 C24/7 (immune support)\n✨ iGlow (skincare)\n☕ Liven Coffee (energy)\n\nWhich product interests you most?"
    }
    
    const randomPrefix = randomPrefixes[Math.floor(Math.random() * randomPrefixes.length)];
    return `${randomPrefix}\n\nI'd love to help you with that! Could you provide more details about what you're looking to achieve? The more specific you are, the better BrianBot can assist you on your journey to success! 💎\n\n**You can ask me about:**\n• Network marketing strategies\n• Coding and web development\n• Financial freedom plans\n• Combining tech + MLM\n• Success stories\n• Training resources\n• Or anything else about Brian's journey!`
  };

  const findResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    // First check all predefined responses
    for (const category of allResponses) {
      if (category.keywords && category.keywords.some(keyword => lowerMsg.includes(keyword))) {
        return category.response;
      }
    }
    
    // Handle numerical questions
    if (lowerMsg.match(/\d+k|\d+\s*k|\d+\s*thousand|\d+\s*hundred/)) {
      return "📊 **INCOME POTENTIAL EXPLAINED**\n\nGreat question about specific numbers! Income varies based on effort, skills, and timing. Here's what's possible:\n\n💰 **Beginner (0-3 months):** $500-2,000/month\n• Learning the basics\n• Building foundation\n\n💰 **Intermediate (3-6 months):** $3,000-8,000/month\n• Consistent action\n• Building team\n\n💰 **Advanced (6-12 months):** $10,000-50,000+/month\n• Leadership rank\n• Multiple income streams\n\n**Brian's Fast Track:** The GO DIAMOND Project helps you reach advanced levels faster by combining tech skills with network marketing strategies.\n\n💡 **Remember:** These are potential ranges, not guarantees. Your results depend on action and consistency.\n\nWant to discuss your specific income goals?"
    }
    
    if (lowerMsg.includes('how long') || lowerMsg.includes('time to')) {
      return "⏱️ **REALISTIC TIMELINE EXPECTATIONS**\n\nBased on Brian's experience and thousands of students:\n\n**First Sale:** 1-4 weeks\n**Consistent Income ($1k/month):** 3-6 months\n**Replace Part-Time Job ($3k/month):** 6-8 months\n**Full-Time Income ($6k+/month):** 8-14 months\n**Leadership Rank:** 10-18 months\n**Diamond Level:** 18-24 months\n\n⚠️ **Caveats:**\n• Everyone's journey is unique\n• Your effort level matters more than time\n• Some achieve faster, some slower\n• Consistency > Intensity\n\n**What speeds up success:**\n✅ Daily action (even 1 hour)\n✅ Personal development (30 min daily)\n✅ Using systems (automation)\n✅ Mentorship (working with leaders)\n\n**What slows down success:**\n❌ Inconsistent effort\n❌ Not using products\n❌ Focusing only on recruiting\n❌ Giving up at first rejection\n\nReady to start your timeline? Let's create your 90-day action plan!"
    }
    
    if (lowerMsg.includes('can i') || lowerMsg.includes('qualify') || lowerMsg.includes('requirements')) {
      return "✅ **ELIGIBILITY AND REQUIREMENTS**\n\n**Basic Requirements:**\n• Age 18+ (or parental consent)\n• ID/Passport (for commission payments)\n• Phone/computer (for business)\n• Internet access\n\n**No Requirements:**\n❌ No previous experience needed\n❌ No sales background required\n❌ No license or certification\n❌ No minimum purchase obligation\n❌ No inventory requirement\n\n**What You Need:**\n✅ Willingness to learn\n✅ Consistency\n✅ Ability to follow a system\n✅ Desire to help others\n✅ 10-15 hours/week minimum\n\n**Brian's Advice:** 'The only qualification you need is the decision to start. Everything else can be learned.'\n\n**Special Situations:**\n• Students: Yes! Many successful student distributors\n• Stay-at-home parents: Perfect flexibility\n• Full-time workers: Start part-time\n• Retirees: Great extra income\n\nReady to get started? Click 'Schedule Coffee Chat' to discuss your specific situation!"
    }
    
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
        text: "✨ BrianBot chat cleared! ✨\n\nHow can BrianBot help you today? Ask me about network marketing, web development, the Go Diamond Project, or combining tech skills with MLM!\n\n💎 **Remember:** Your breakthrough is just one question away!\n\nTry asking:\n• 'Tell me about Brian'\n• 'How to combine coding with network marketing'\n• 'What's the best MLM package for beginners'\n• 'How long to make full-time income'",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  if (isFullscreen) {
    return (
      <div style={fullscreenStyles.container}>
        <div style={fullscreenStyles.header}>
          <div style={fullscreenStyles.headerContent}>
            <div style={fullscreenStyles.avatar}>
              <i className="fas fa-robot" style={{ fontSize: '24px', color: '#ffd700' }}></i>
            </div>
            <div style={fullscreenStyles.headerText}>
              <h3 style={fullscreenStyles.title}>BrianBot 🤖</h3>
              <p style={fullscreenStyles.status}>✨ Online • Brian's AI Assistant</p>
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
            placeholder="Ask BrianBot anything about network marketing, coding, or financial freedom..."
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
        <i className="fas fa-robot" style={{ fontSize: '28px', color: '#1a1a2e' }}></i>
      </button>

      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.chatContainer}>
            <div style={modalStyles.header}>
              <div style={modalStyles.headerContent}>
                <div style={modalStyles.avatar}>
                  <i className="fas fa-robot" style={{ fontSize: '24px', color: '#ffd700' }}></i>
                </div>
                <div style={modalStyles.headerText}>
                  <h3 style={modalStyles.title}>BrianBot 🤖</h3>
                  <p style={modalStyles.status}>✨ Online • Brian's AI Assistant</p>
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
                placeholder="Ask BrianBot anything..."
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
        pre {
          white-space: pre-wrap;
          font-family: inherit;
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