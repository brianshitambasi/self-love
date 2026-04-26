// components/HomeComponent.jsx - Complete Updated Version with Bonan Vivon Link
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CoffeeCalendar from './CoffeeCalendar';
import MemberBenefits from './MemberBenefits';
import { isAuthenticated, getUserRole, ROLES } from '../utils/auth';

const HomeComponent = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);
  
  const [showWebinarModal, setShowWebinarModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [webinarEmail, setWebinarEmail] = useState('');
  const [webinarName, setWebinarName] = useState('');
  const [isSubmittingWebinar, setIsSubmittingWebinar] = useState(false);
  const [webinarMessage, setWebinarMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState('guest');

  // Check authentication status
  useEffect(() => {
    setIsAuth(isAuthenticated());
    setUserRole(getUserRole());
  }, []);

  // --- 3D Scene Setup ---
  useEffect(() => {
    if (!mountRef.current) return;
    
    if (rendererRef.current) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && rendererRef.current.domElement) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.warn('Cleanup error:', e);
        }
      }
      rendererRef.current.dispose();
    }

    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);
    scene.fog = new THREE.FogExp2(0x05070a, 0.006);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    if (mountNode && !mountNode.contains(renderer.domElement)) {
      mountNode.appendChild(renderer.domElement);
    }

    // Diamond-like Central Object
    const geometry = new THREE.IcosahedronGeometry(1.1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0x442200,
      roughness: 0.25,
      metalness: 0.95,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    scene.add(coreMesh);

    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffaa33 });
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
    coreMesh.add(wireframe);

    // Floating Particles
    const particleCount = 3500;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      posArray[i*3] = (Math.random() - 0.5) * 60;
      posArray[i*3+1] = (Math.random() - 0.5) * 30;
      posArray[i*3+2] = (Math.random() - 0.5) * 40 - 15;
      
      const isGold = Math.random() > 0.7;
      const isBlue = Math.random() > 0.85;
      colorArray[i*3] = isGold ? 1.0 : isBlue ? 0.2 : 0.9;
      colorArray[i*3+1] = isGold ? 0.8 : isBlue ? 0.5 : 0.7;
      colorArray[i*3+2] = isGold ? 0.2 : isBlue ? 1.0 : 0.4;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlesSys = new THREE.Points(particlesGeometry, particlesMat);
    scene.add(particlesSys);

    // Rotating Rings
    const ringGeo = new THREE.TorusGeometry(1.7, 0.06, 128, 200);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.9, roughness: 0.3, emissive: 0x442200 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);
    
    const outerRingGeo = new THREE.TorusGeometry(2.0, 0.04, 128, 200);
    const outerRingMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, metalness: 0.8 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // Floating diamonds
    const diamondGroup = [];
    const diamondPositions = [
      [-2.2, 1.3, 1.5], [2.2, 1.3, 1.5], [-1.8, -1.2, 2.0], [1.8, -1.2, 2.0],
      [0, 2.2, 1.2], [0, -1.8, 2.2], [-2.5, 0.5, 1.0], [2.5, 0.5, 1.0]
    ];
    const diamondGeo = new THREE.TetrahedronGeometry(0.18);
    diamondPositions.forEach(pos => {
      const diamondMat = new THREE.MeshStandardMaterial({ color: 0xffcc55, metalness: 0.9, emissive: 0x331100 });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.set(pos[0], pos[1], pos[2]);
      scene.add(diamond);
      diamondGroup.push(diamond);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffdd99, 1.3);
    mainLight.position.set(3, 5, 2);
    scene.add(mainLight);
    const backLight = new THREE.PointLight(0xffaa55, 0.8);
    backLight.position.set(-2, 1, -4);
    scene.add(backLight);
    const fillLight = new THREE.PointLight(0xffaa66, 0.5);
    fillLight.position.set(2, 2, 3);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xffcc88, 0.9);
    rimLight.position.set(1, 2, -3.5);
    scene.add(rimLight);
    const bottomLight = new THREE.PointLight(0xff9933, 0.4);
    bottomLight.position.set(0, -3, 0);
    scene.add(bottomLight);
    const codeLight = new THREE.PointLight(0x3399ff, 0.5);
    codeLight.position.set(2, 1, 2);
    scene.add(codeLight);

    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.008;
      
      if (coreMesh) {
        coreMesh.rotation.y = time * 0.6;
        coreMesh.rotation.x = Math.sin(time * 0.4) * 0.2;
      }
      if (ring) {
        ring.rotation.z = time * 0.3;
        ring.rotation.x = Math.sin(time * 0.5) * 0.15;
      }
      if (outerRing) {
        outerRing.rotation.z = -time * 0.25;
        outerRing.rotation.y = time * 0.2;
      }
      
      if (particlesSys) {
        particlesSys.rotation.y = time * 0.02;
        particlesSys.rotation.x = Math.sin(time * 0.1) * 0.03;
      }
      
      if (diamondGroup) {
        diamondGroup.forEach((diamond, idx) => {
          if (diamond) {
            diamond.rotation.x = time * 0.5 * (idx % 2 === 0 ? 1 : -1);
            diamond.rotation.y = time * 0.8;
          }
        });
      }
      
      if (cameraRef.current && sceneRef.current && rendererRef.current) {
        cameraRef.current.position.x += (0 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (Math.sin(time * 0.2) * 0.08 - cameraRef.current.position.y) * 0.03;
        cameraRef.current.lookAt(0, 0.3, 0);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      if (rendererRef.current) {
        if (mountRef.current && rendererRef.current.domElement) {
          try {
            if (mountRef.current.contains(rendererRef.current.domElement)) {
              mountRef.current.removeChild(rendererRef.current.domElement);
            }
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
      
      cameraRef.current = null;
    };
  }, []);

  const handleCoffeeSchedule = (bookingData) => {
    console.log('Coffee booking confirmed:', bookingData);
  };

  // Function to create user notification for webinar
  const addWebinarUserNotification = (webinarData) => {
    let notifications = [];
    const existingNotifications = localStorage.getItem('userNotifications');
    if (existingNotifications) {
      notifications = JSON.parse(existingNotifications);
    }
    
    const newNotification = {
      id: Date.now(),
      type: 'webinar',
      title: '🎓 Webinar Registration Confirmed!',
      message: `Thank you for registering for "Code to Cash" webinar. You will receive the webinar link at ${webinarData.email} before the session.`,
      date: new Date().toISOString(),
      read: false,
      icon: 'fa-video',
      color: '#ff6347',
      actionLink: '/webinar'
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    
    const unreadCount = notifications.filter(n => !n.read).length;
    localStorage.setItem('notificationCount', unreadCount);
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: unreadCount }));
  };

  // Function to create admin notification for webinar
  const addWebinarAdminNotification = (webinarData) => {
    let notifications = [];
    const existingNotifications = localStorage.getItem('adminNotifications');
    if (existingNotifications) {
      notifications = JSON.parse(existingNotifications);
    }
    
    const newNotification = {
      id: Date.now(),
      type: 'webinar_registration',
      title: '🎓 New Webinar Registration!',
      message: `${webinarData.name} (${webinarData.email}) has registered for the "Code to Cash" webinar.`,
      date: new Date().toISOString(),
      read: false,
      icon: 'fa-video',
      color: '#ff6347',
      details: webinarData
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    
    // Also save to booking requests
    let bookingRequests = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    bookingRequests.unshift({
      id: Date.now(),
      type: 'webinar',
      name: webinarData.name,
      email: webinarData.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('bookingRequests', JSON.stringify(bookingRequests));
    
    // Update admin notification count
    const unreadCount = notifications.filter(n => !n.read).length;
    localStorage.setItem('adminNotificationCount', unreadCount);
    window.dispatchEvent(new CustomEvent('adminNotificationUpdate', { detail: unreadCount }));
  };

  const handleWebinarSubmit = async (e) => {
    e.preventDefault();
    
    if (!webinarName || !webinarEmail) {
      setWebinarMessage('Please fill in all fields');
      return;
    }
    
    if (!webinarEmail.includes('@') || !webinarEmail.includes('.')) {
      setWebinarMessage('Please enter a valid email address');
      return;
    }
    
    setIsSubmittingWebinar(true);
    setWebinarMessage('');
    
    const webinarData = {
      name: webinarName,
      email: webinarEmail,
      registeredAt: new Date().toISOString(),
      webinarId: 'code-to-cash-' + Date.now()
    };
    
    setTimeout(() => {
      addWebinarUserNotification(webinarData);
      addWebinarAdminNotification(webinarData);
      
      setIsSubmittingWebinar(false);
      setWebinarMessage('success');
      
      setTimeout(() => {
        setShowWebinarModal(false);
        setWebinarName('');
        setWebinarEmail('');
        setWebinarMessage('');
        alert(`✅ Thank you ${webinarName}! You've been registered for the "Code to Cash" webinar.\n\n📧 A confirmation has been sent to ${webinarEmail}\n🔔 Check your notifications for details!`);
      }, 1500);
    }, 1500);
  };

  const skills = [
    { icon: "fa-code", title: "Full Stack Dev", desc: "React, Node.js, Python, MongoDB", color: "#3399ff" },
    { icon: "fa-chart-line", title: "Network Marketer", desc: "6-figure earner, team builder", color: "#ffd700" },
    { icon: "fa-microchip", title: "Software Engineer", desc: "System architecture, APIs, Cloud", color: "#00cc88" },
    { icon: "fa-gem", title: "Business Mentor", desc: "Helping others achieve freedom", color: "#ff6b4a" }
  ];

  const services = [
    { icon: "fa-laptop-code", title: "Web Development", desc: "Custom websites & web apps" },
    { icon: "fa-chalkboard-teacher", title: "MLM Training", desc: "Proven network marketing systems" },
    { icon: "fa-robot", title: "AI Solutions", desc: "Smart automation & tools" },
    { icon: "fa-handshake", title: "Business Consulting", desc: "Strategic growth planning" }
  ];

  // Updated links with Bonan Vivon Project
  const links = [
    { icon: "fa-gem", title: "GO DIAMOND PROJECT", color: "#ffd700", url: "/diamond" },
    { icon: "fa-globe", title: "BONAN VIVON PROJECT", color: "#00bcd4", url: "https://golden-dreamers.vercel.app" },
    { icon: "fa-github", title: "GITHUB", color: "#ffffff", url: "https://github.com/brianshitambasi" },
    { icon: "fa-linkedin", title: "LINKEDIN", color: "#0077b5", url: "https://www.linkedin.com/in/brian-shitambasi-613050396" },
    { icon: "fa-twitter", title: "X (TWITTER)", color: "#1DA1F2", url: "https://twitter.com/BrianShita48844" },
    { icon: "fa-facebook", title: "FACEBOOK", color: "#3b5998", url: "https://facebook.com/Brian Burnix" },
    { icon: "fa-instagram", title: "INSTAGRAM", color: "#e4405f", url: "https://instagram.com/ceo_brian58" },
    { icon: "fa-tiktok", title: "TIKTOK", color: "#000000", url: "https://tiktok.com/@.brian005" },
    { icon: "fa-youtube", title: "YOUTUBE", color: "#FF0000", url: "https://youtube.com/@yobby-5" },
    { icon: "fa-envelope", title: "EMAIL ME", color: "#ffd700", url: "mailto:brianshitambasi270@gmail.com" }
  ];

  return (
    <>
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem' }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div style={profileStyles.profileContainer}>
                  <div style={profileStyles.profileRing}>
                    <div style={profileStyles.profileInner}>
                      <img 
                        src="/static/image/IMG_20260215_112337_HDR.jpg" 
                        alt="Brian Shitambasi"
                        style={profileStyles.avatarImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          if (parent && !parent.querySelector('.fallback-icon')) {
                            const fallback = document.createElement('i');
                            fallback.className = 'fas fa-user-astronaut fallback-icon';
                            fallback.style.cssText = 'font-size: 3rem; color: #ffd700;';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(51,153,255,0.2))', padding: '0.5rem 1.5rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}>
                    <i className="fas fa-crown text-warning me-2"></i>
                    <span style={{ color: '#ffd700' }}>⚡ BRIAN SHITAMBASI ⚡</span>
                  </span>
                </div>

                <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FFD700, #3399FF, #FF6B4A)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginBottom: '1rem'
                }}>
                  Full Stack Dev • Network Marketer • Software Engineer
                </h1>
                
                <p style={{ fontSize: '1.3rem', color: '#ffddaa', marginBottom: '1rem' }}>
                  Building Code • Building Wealth • Building Leaders
                </p>

                <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '700px', margin: '0 auto 2rem' }}>
                  💻 Full Stack Developer | 📈 Network Marketing Professional | 🎯 Helping You Achieve Financial Freedom
                </p>

                <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                  <button 
                    onClick={() => setShowCoffeeModal(true)}
                    style={buttonStyles.primary}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fas fa-coffee me-2"></i> SCHEDULE A COFFEE CHAT
                  </button>
                  <button 
                    onClick={() => setShowWebinarModal(true)}
                    style={buttonStyles.secondary}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fas fa-video me-2"></i> JOIN FREE WEBINAR
                  </button>
                  <a 
                    href="/contact"
                    style={buttonStyles.outline}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fas fa-envelope me-2"></i> CONTACT ME
                  </a>
                </div>

                {/* Admin Only Section - Only visible to you */}
                {userRole === ROLES.ADMIN && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,100,50,0.1))',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '2rem',
                    padding: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,0,0,0.3)'
                  }}>
                    <i className="fas fa-shield-alt fa-2x" style={{ color: '#ff4444' }}></i>
                    <h3 style={{ color: '#ff4444', marginTop: '0.5rem' }}>Admin Panel</h3>
                    <p style={{ color: '#ddd' }}>Welcome back, Brian! You have full access to all features.</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-danger btn-sm" onClick={() => window.location.href = '/admin/users'}>Manage Users</button>
                      <button className="btn btn-warning btn-sm" onClick={() => window.location.href = '/admin/analytics'}>View Analytics</button>
                    </div>
                  </div>
                )}

                {/* User Only Section - Enhanced Member Benefits */}
                {isAuth && userRole !== ROLES.ADMIN && (
                  <MemberBenefits />
                )}

                {/* Guest Only Section - Only for non-logged in users */}
                {!isAuth && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,100,50,0.1))',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '2rem',
                    padding: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,215,0,0.3)'
                  }}>
                    <i className="fas fa-gem fa-2x text-warning"></i>
                    <h3 style={{ color: '#ffd700', marginTop: '0.5rem' }}>Join Apex Legacy Today!</h3>
                    <p style={{ color: '#ddd' }}>Create a free account to book coffee chats, access exclusive content, and start your journey to financial freedom.</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-warning btn-sm" onClick={() => window.location.href = '/login'}>Sign Up Free</button>
                      <button className="btn btn-outline-warning btn-sm" onClick={() => window.location.href = '/login'}>Learn More</button>
                    </div>
                  </div>
                )}

                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(51,153,255,0.1))',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '2rem',
                  padding: '1rem',
                  marginTop: '1rem',
                  border: '1px solid rgba(255,215,0,0.3)'
                }}>
                  <i className="fas fa-quote-left fa-2x" style={{ color: '#ffd700', opacity: 0.5 }}></i>
                  <p style={{ color: '#ddd', fontSize: '1rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    "Code your future, build your legacy, and help others climb with you."
                  </p>
                  <p style={{ color: '#ffd700', marginBottom: 0 }}>— Brian Shitambasi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Visible to all */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: '#ffd700', fontWeight: 'bold' }}>
              <i className="fas fa-star-of-life me-2"></i> What I Do
            </h2>
            <p style={{ color: '#aaa' }}>Multiple streams of expertise • One mission: Your success</p>
          </div>
          <div className="row g-4">
            {skills.map((skill, idx) => (
              <div className="col-md-3 col-sm-6" key={idx}>
                <div style={{ 
                  background: 'rgba(15, 20, 35, 0.85)', 
                  backdropFilter: 'blur(16px)',
                  borderRadius: '1.5rem',
                  padding: '1.8rem',
                  textAlign: 'center',
                  border: `1px solid ${skill.color}40`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = skill.color; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${skill.color}40`; }}>
                  <i className={`fas ${skill.icon} fa-3x`} style={{ color: skill.color, marginBottom: '1rem' }}></i>
                  <h5 style={{ color: skill.color, fontWeight: 'bold' }}>{skill.title}</h5>
                  <p style={{ color: '#bbb', fontSize: '0.85rem', marginBottom: 0 }}>{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section - Visible to all */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: '#ffd700', fontWeight: 'bold' }}>
              <i className="fas fa-cogs me-2"></i> Services I Offer
            </h2>
            <p style={{ color: '#aaa' }}>Let me help you grow your business and income</p>
          </div>
          <div className="row g-4">
            {services.map((service, idx) => (
              <div className="col-md-3 col-sm-6" key={idx}>
                <div style={serviceStyles.card}>
                  <div style={serviceStyles.iconWrapper}>
                    <i className={`fas ${service.icon} fa-2x`} style={{ color: '#ffd700' }}></i>
                  </div>
                  <h5 style={serviceStyles.title}>{service.title}</h5>
                  <p style={serviceStyles.desc}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Visible to all */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div style={statStyles.card}>
                <i className="fas fa-code" style={statStyles.icon}></i>
                <h3 style={statStyles.number}>5+</h3>
                <p style={statStyles.label}>Years Coding</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={statStyles.card}>
                <i className="fas fa-users" style={statStyles.icon}></i>
                <h3 style={statStyles.number}>1000+</h3>
                <p style={statStyles.label}>Students Trained</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={statStyles.card}>
                <i className="fas fa-chart-line" style={statStyles.icon}></i>
                <h3 style={statStyles.number}>6-Figure</h3>
                <p style={statStyles.label}>Earner</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={statStyles.card}>
                <i className="fas fa-globe" style={statStyles.icon}></i>
                <h3 style={statStyles.number}>20+</h3>
                <p style={statStyles.label}>Countries Reached</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section - Visible to all */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#ffd700', fontWeight: 'bold' }}>
                  <i className="fas fa-address-card me-2"></i> Contact Information
                </h2>
                <p style={{ color: '#aaa' }}>Reach out to me directly</p>
              </div>
              <div style={contactStyles.container}>
                <div style={contactStyles.card}>
                  <i className="fas fa-envelope" style={contactStyles.icon}></i>
                  <h4 style={contactStyles.title}>Email</h4>
                  <a href="mailto:brianshitambasi270@gmail.com" style={contactStyles.link}>
                    brianshitambasi270@gmail.com
                  </a>
                </div>
                <div style={contactStyles.card}>
                  <i className="fab fa-linkedin" style={contactStyles.icon}></i>
                  <h4 style={contactStyles.title}>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/brian-shitambasi-613050396" target="_blank" rel="noopener noreferrer" style={contactStyles.link}>
                    linkedin.com/in/brian-shitambasi-613050396
                  </a>
                </div>
                <div style={contactStyles.card}>
                  <i className="fab fa-twitter" style={contactStyles.icon}></i>
                  <h4 style={contactStyles.title}>X (Twitter)</h4>
                  <a href="https://twitter.com/BrianShita48844" target="_blank" rel="noopener noreferrer" style={contactStyles.link}>
                    @BrianShita48844
                  </a>
                </div>
                <div style={contactStyles.card}>
                  <i className="fab fa-github" style={contactStyles.icon}></i>
                  <h4 style={contactStyles.title}>GitHub</h4>
                  <a href="https://github.com/brianshitambasi" target="_blank" rel="noopener noreferrer" style={contactStyles.link}>
                    github.com/brianshitambasi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Section - Visible to all */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#ffd700', fontWeight: 'bold' }}>
                  <i className="fas fa-link me-2"></i> Let's Connect
                </h2>
                <p style={{ color: '#aaa' }}>Follow me on social media • Join my community • Start your journey</p>
              </div>
              <div className="d-flex flex-column gap-3">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target={link.url.startsWith('http') || link.url.startsWith('mailto') ? "_blank" : "_self"}
                    rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      background: `linear-gradient(90deg, ${link.color}20, ${link.color}10)`,
                      border: `1px solid ${link.color}60`,
                      borderRadius: '60px',
                      padding: '1rem 2rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      color: link.color,
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = `linear-gradient(90deg, ${link.color}40, ${link.color}20)`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = `linear-gradient(90deg, ${link.color}20, ${link.color}10)`; }}
                  >
                    <i className={`fab ${link.icon} fa-lg`}></i>
                    <span>{link.title}</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee Calendar Modal - Visible to all */}
      {showCoffeeModal && (
        <CoffeeCalendar 
          onClose={() => setShowCoffeeModal(false)}
          onSchedule={handleCoffeeSchedule}
        />
      )}

      {/* Webinar Modal - Visible to all */}
      {showWebinarModal && (
        <div style={modalStyles.overlay} onClick={() => setShowWebinarModal(false)}>
          <div style={modalStyles.modal} onClick={e => e.stopPropagation()}>
            <button style={modalStyles.closeBtn} onClick={() => setShowWebinarModal(false)}>×</button>
            
            <div style={modalStyles.header}>
              <div style={modalStyles.iconContainer}>
                <i className="fas fa-chalkboard-teacher" style={modalStyles.icon}></i>
              </div>
              <h2 style={modalStyles.title}>Free Webinar: Code to Cash</h2>
              <p style={modalStyles.subtitle}>How to combine tech skills with network marketing for financial freedom</p>
            </div>

            <div style={modalStyles.content}>
              <div style={modalStyles.benefitsList}>
                <div style={modalStyles.benefitItem}>
                  <i className="fas fa-check-circle" style={modalStyles.benefitIcon}></i>
                  <span>The exact system I used to hit 6-figures</span>
                </div>
                <div style={modalStyles.benefitItem}>
                  <i className="fas fa-check-circle" style={modalStyles.benefitIcon}></i>
                  <span>How to leverage coding for MLM success</span>
                </div>
                <div style={modalStyles.benefitItem}>
                  <i className="fas fa-check-circle" style={modalStyles.benefitIcon}></i>
                  <span>Live Q&A session</span>
                </div>
                <div style={modalStyles.benefitItem}>
                  <i className="fas fa-check-circle" style={modalStyles.benefitIcon}></i>
                  <span>Free bonuses worth $497</span>
                </div>
              </div>

              <div style={modalStyles.countdownBox}>
                <i className="fas fa-clock" style={{ marginRight: '8px' }}></i>
                <span>Limited spots! Next session: Friday 7PM EST</span>
              </div>

              <form onSubmit={handleWebinarSubmit} style={modalStyles.form}>
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    style={modalStyles.formInput}
                    value={webinarName}
                    onChange={(e) => setWebinarName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    style={modalStyles.formInput}
                    value={webinarEmail}
                    onChange={(e) => setWebinarEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {webinarMessage === 'success' ? (
                  <div style={modalStyles.successMessage}>
                    <i className="fas fa-check-circle"></i>
                    <span>Registered! Redirecting...</span>
                  </div>
                ) : (
                  <button type="submit" style={modalStyles.submitBtn} disabled={isSubmittingWebinar}>
                    {isSubmittingWebinar ? (
                      <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                    ) : (
                      <><i className="fas fa-ticket-alt"></i> Reserve My Free Spot</>
                    )}
                  </button>
                )}

                {webinarMessage && webinarMessage !== 'success' && (
                  <p style={modalStyles.errorMessage}>{webinarMessage}</p>
                )}
              </form>

              <p style={modalStyles.footer}>
                <i className="fas fa-lock"></i> Your info is safe. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Styles
const buttonStyles = {
  primary: {
    background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 32px',
    fontWeight: 'bold',
    color: '#1a1a2e',
    transition: 'transform 0.3s',
    cursor: 'pointer'
  },
  secondary: {
    background: 'linear-gradient(90deg, #3399ff, #0066cc)',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 32px',
    fontWeight: 'bold',
    color: 'white',
    transition: 'transform 0.3s',
    cursor: 'pointer'
  },
  outline: {
    background: 'transparent',
    border: '2px solid #ffd700',
    borderRadius: '50px',
    padding: '14px 32px',
    fontWeight: 'bold',
    color: '#ffd700',
    transition: 'transform 0.3s',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  }
};

const profileStyles = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  profileRing: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ffd700, #3399ff, #ff6b4a)',
    padding: '3px',
    animation: 'spin 4s linear infinite'
  },
  profileInner: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  }
};

// Add keyframes for spin animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

const serviceStyles = {
  card: {
    background: 'rgba(15, 20, 35, 0.85)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid rgba(255,215,0,0.2)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  iconWrapper: {
    width: '70px',
    height: '70px',
    background: 'rgba(255,215,0,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem'
  },
  title: {
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  desc: {
    color: '#bbb',
    fontSize: '0.85rem'
  }
};

const statStyles = {
  card: {
    background: 'rgba(15, 20, 35, 0.85)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1rem',
    padding: '1.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255,215,0,0.2)'
  },
  icon: {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '0.5rem'
  },
  number: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '0'
  },
  label: {
    color: '#aaa',
    fontSize: '0.8rem',
    marginBottom: 0
  }
};

const contactStyles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  card: {
    background: 'rgba(15, 20, 35, 0.85)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255,215,0,0.2)',
    transition: 'all 0.3s'
  },
  icon: {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '1rem'
  },
  title: {
    color: '#ffd700',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  link: {
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s',
    wordBreak: 'break-all'
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
  modal: {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(51, 153, 255, 0.3)'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#fff',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  header: { textAlign: 'center', padding: '2rem 2rem 1rem', borderBottom: '1px solid rgba(51, 153, 255, 0.2)' },
  iconContainer: { width: '70px', height: '70px', background: 'linear-gradient(135deg, #3399ff, #0066cc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  icon: { fontSize: '2rem', color: 'white' },
  title: { color: '#3399ff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  subtitle: { color: '#aaa', fontSize: '0.85rem' },
  content: { padding: '2rem' },
  benefitsList: { marginBottom: '1.5rem' },
  benefitItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', color: '#ddd', fontSize: '0.9rem' },
  benefitIcon: { color: '#3399ff', fontSize: '1rem' },
  countdownBox: { background: 'rgba(51, 153, 255, 0.1)', border: '1px solid rgba(51, 153, 255, 0.3)', borderRadius: '12px', padding: '0.75rem', textAlign: 'center', marginBottom: '1.5rem', color: '#3399ff', fontSize: '0.85rem' },
  form: { marginBottom: '1rem' },
  formGroup: { marginBottom: '1.25rem' },
  formLabel: { display: 'block', color: '#3399ff', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' },
  formInput: { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem' },
  submitBtn: { width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #3399ff, #0066cc)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  successMessage: { padding: '1rem', background: 'rgba(76, 175, 80, 0.2)', border: '1px solid #4caf50', borderRadius: '12px', textAlign: 'center', color: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  errorMessage: { color: '#ff6b4a', fontSize: '0.8rem', marginTop: '0.5rem', textAlign: 'center' },
  footer: { textAlign: 'center', color: '#666', fontSize: '0.7rem', marginTop: '1rem' }
};

export default HomeComponent;