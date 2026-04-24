// components/HomeComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HomeComponent = () => {
  const mountRef = useRef(null);
  const [showWebinarModal, setShowWebinarModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  // --- 3D Scene Setup with Professional Gold/Diamond Theme ---
  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);
    scene.fog = new THREE.FogExp2(0x05070a, 0.006);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    // --- Diamond-like Central Object (Icosahedron with gold material) ---
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

    // Gold wireframe
    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffaa33 });
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
    coreMesh.add(wireframe);

    // --- Floating Diamonds / Particles (Luxury effect) ---
    const particleCount = 2500;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      posArray[i*3] = (Math.random() - 0.5) * 50;
      posArray[i*3+1] = (Math.random() - 0.5) * 25;
      posArray[i*3+2] = (Math.random() - 0.5) * 35 - 15;
      
      // Gold/white particles
      const isGold = Math.random() > 0.7;
      colorArray[i*3] = isGold ? 1.0 : 0.9;
      colorArray[i*3+1] = isGold ? 0.8 : 0.7;
      colorArray[i*3+2] = isGold ? 0.2 : 0.4;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particlesSys = new THREE.Points(particlesGeometry, particlesMat);
    scene.add(particlesSys);

    // --- Rotating Ring (Crown effect) ---
    const ringGeo = new THREE.TorusGeometry(1.7, 0.06, 128, 200);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.9, roughness: 0.3, emissive: 0x442200 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);
    
    const outerRingGeo = new THREE.TorusGeometry(2.0, 0.04, 128, 200);
    const outerRingMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, metalness: 0.8 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // --- Floating small diamonds around (small tetrahedrons) ---
    const diamondGroup = [];
    const diamondPositions = [
      [-2.2, 1.3, 1.5], [2.2, 1.3, 1.5], [-1.8, -1.2, 2.0], [1.8, -1.2, 2.0],
      [0, 2.0, 1.2], [0, -1.8, 2.2], [-2.5, 0.5, 1.0], [2.5, 0.5, 1.0]
    ];
    const diamondGeo = new THREE.TetrahedronGeometry(0.18);
    diamondPositions.forEach(pos => {
      const diamondMat = new THREE.MeshStandardMaterial({ color: 0xffcc55, metalness: 0.9, emissive: 0x331100 });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.set(pos[0], pos[1], pos[2]);
      scene.add(diamond);
      diamondGroup.push(diamond);
    });

    // --- Lighting (Dramatic, highlighting gold tones) ---
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
    
    // Additional gold fill from below
    const bottomLight = new THREE.PointLight(0xff9933, 0.4);
    bottomLight.position.set(0, -3, 0);
    scene.add(bottomLight);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.008;
      
      coreMesh.rotation.y = time * 0.6;
      coreMesh.rotation.x = Math.sin(time * 0.4) * 0.2;
      ring.rotation.z = time * 0.3;
      ring.rotation.x = Math.sin(time * 0.5) * 0.15;
      outerRing.rotation.z = -time * 0.25;
      outerRing.rotation.y = time * 0.2;
      
      particlesSys.rotation.y = time * 0.03;
      particlesSys.rotation.x = Math.sin(time * 0.1) * 0.05;
      
      diamondGroup.forEach((diamond, idx) => {
        diamond.rotation.x = time * 0.5 * (idx % 2 === 0 ? 1 : -1);
        diamond.rotation.y = time * 0.8;
      });
      
      camera.position.x += (0 - camera.position.x) * 0.02;
      camera.position.y += (Math.sin(time * 0.2) * 0.08 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.3, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Professional Network Marketing Content ---
  const features = [
    { icon: "fa-crown", title: "yobby Legacy", desc: "Human-Estate Investor | Next-Gen CEO Training" },
    { icon: "fa-chart-line", title: "E-Com Business Builder", desc: "Proven systems to build profitable online stores" },
    { icon: "fa-gem", title: "GO DIAMOND Project", desc: "Exclusive mentorship for diamond-level success" },
    { icon: "fa-calendar-alt", title: "Lifestyle by Design", desc: "Create freedom & lifestyle you deserve" }
  ];

  const links = [
    { icon: "fa-gem", title: "JOIN GO DIAMOND PROJECT", color: "#ffd700", url: "#" },
    { icon: "fa-shopping-cart", title: "SHOP LUXURY WELLNESS", color: "#ffaa44", url: "#" },
    { icon: "fa-tv", title: "FINANCIAL FREEDOM TV", color: "#ff8844", url: "#" },
    { icon: "fa-facebook", title: "MY FACEBOOK", color: "#3b5998", url: "#" }
  ];

  return (
    <>
      {/* 3D Canvas Background */}
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
      
      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem' }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                {/* Badge */}
                <div className="mb-4">
                  <span style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,100,50,0.2))', padding: '0.5rem 1.5rem', borderRadius: '50px', backdropFilter: 'blur(10px)' }}>
                    <i className="fas fa-gem text-warning me-2"></i>
                    <span style={{ color: '#ffd700' }}>⚙️ Empowering aspiring entrepreneurs become next-gen CEOs</span>
                  </span>
                </div>

                {/* Main Title */}
                <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B4A)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginBottom: '1rem'
                }}>
                  yobby Legacy
                </h1>
                
                <p style={{ fontSize: '1.3rem', color: '#ffddaa', marginBottom: '2rem' }}>
                  Human-Estate Investor • E-Com Business Builder • Freedom Architect
                </p>

                <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '700px', margin: '0 auto 2rem' }}>
                  📘 Build E-Com Business • 🏢 Create freedom & lifestyle by design
                </p>

                {/* CTA Buttons */}
                <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                  <button 
                    onClick={() => setShowCoffeeModal(true)}
                    style={{ background: 'linear-gradient(90deg, #ffd700, #ff8c00)', border: 'none', borderRadius: '50px', padding: '14px 32px', fontWeight: 'bold', color: '#1a1a2e' }}
                  >
                    <i className="fas fa-coffee me-2"></i> SCHEDULE SUCCESS OVER COFFEE SESSION
                  </button>
                  <button 
                    onClick={() => setShowWebinarModal(true)}
                    style={{ background: 'linear-gradient(90deg, #ff6b4a, #ff3a6f)', border: 'none', borderRadius: '50px', padding: '14px 32px', fontWeight: 'bold', color: 'white' }}
                  >
                    <i className="fas fa-video me-2"></i> WEALTH RENAISSANCE WEBINAR - LIMITED SLOTS
                  </button>
                </div>

                {/* GO DIAMOND Project Highlight */}
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,100,50,0.1))',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  marginTop: '2rem',
                  border: '1px solid rgba(255,215,0,0.3)'
                }}>
                  <i className="fas fa-gem fa-2x text-warning mb-2"></i>
                  <h3 style={{ color: '#ffd700', fontWeight: 'bold' }}>JOIN GO DIAMOND PROJECT ❤️</h3>
                  <p style={{ color: '#ddd' }}>Limited spots • Exclusive mentorship • Diamond-level success system</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid - Overlapping Section */}
        <div className="container" style={{ marginTop: '-3rem', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
          <div className="row g-4">
            {features.map((feature, idx) => (
              <div className="col-md-3 col-sm-6" key={idx}>
                <div style={{ 
                  background: 'rgba(15, 20, 35, 0.85)', 
                  backdropFilter: 'blur(16px)',
                  borderRadius: '1.5rem',
                  padding: '1.8rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,215,0,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = '#ffd700'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,215,0,0.2)'; }}>
                  <i className={`fas ${feature.icon} fa-3x`} style={{ color: '#ffd700', marginBottom: '1rem' }}></i>
                  <h5 style={{ color: '#ffd700', fontWeight: 'bold' }}>{feature.title}</h5>
                  <p style={{ color: '#bbb', fontSize: '0.9rem', marginBottom: 0 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links Section (Linktree style) */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#ffd700', fontWeight: 'bold' }}>
                  <i className="fas fa-link me-2"></i> Connect With Me
                </h2>
                <p style={{ color: '#aaa' }}>Join the community • Start your journey • Go Diamond</p>
              </div>
              <div className="d-flex flex-column gap-3">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
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

        {/* Bottom Badge */}
        <div className="container text-center" style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>
            <i className="fas fa-shield-alt me-1"></i> Cookie Preferences · Report · Privacy · Explore
          </p>
        </div>
      </div>

      {/* Coffee Session Modal */}
      {showCoffeeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowCoffeeModal(false)}>
          <div style={{ background: 'rgba(20,25,45,0.95)', borderRadius: '2rem', padding: '2rem', maxWidth: '500px', width: '90%', border: '1px solid #ffd700' }} onClick={e => e.stopPropagation()}>
            <i className="fas fa-coffee fa-3x text-warning mb-3"></i>
            <h3 style={{ color: '#ffd700' }}>Schedule Your Success Coffee Session</h3>
            <p style={{ color: '#ccc' }}>Let's discuss your goals and create a roadmap to financial freedom.</p>
            <input type="email" placeholder="Your email address" className="form-control mb-3" style={{ background: '#2a2a3e', border: '1px solid #ffd700', color: 'white' }} />
            <button className="btn btn-warning w-100" onClick={() => setShowCoffeeModal(false)}>Book Session →</button>
            <button className="btn btn-link text-white-50 mt-2 w-100" onClick={() => setShowCoffeeModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Webinar Modal */}
      {showWebinarModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowWebinarModal(false)}>
          <div style={{ background: 'rgba(20,25,45,0.95)', borderRadius: '2rem', padding: '2rem', maxWidth: '500px', width: '90%', border: '1px solid #ff6b4a' }} onClick={e => e.stopPropagation()}>
            <i className="fas fa-video fa-3x" style={{ color: '#ff6b4a' }}></i>
            <h3 style={{ color: '#ff6b4a' }}>Wealth Renaissance Webinar</h3>
            <p style={{ color: '#ccc' }}>Limited slots available! Learn the exact systems to build wealth through network marketing.</p>
            <input type="email" placeholder="Your email address" className="form-control mb-3" style={{ background: '#2a2a3e', border: '1px solid #ff6b4a', color: 'white' }} />
            <button className="btn w-100" style={{ background: '#ff6b4a', color: 'white' }} onClick={() => setShowWebinarModal(false)}>Reserve My Spot →</button>
            <button className="btn btn-link text-white-50 mt-2 w-100" onClick={() => setShowWebinarModal(false)}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(255,215,0,0.25);
          border-color: #ffd700;
        }
      `}</style>
    </>
  );
};

export default HomeComponent;