// AboutMe.jsx
// Personal story, credentials, and network marketing journey component
import React, { useEffect, useState } from 'react';

const AboutMe = () => {
  // State for animated counters
  const [counters, setCounters] = useState({
    years: 0,
    partners: 0,
    countries: 0,
    events: 0
  });

  // Target values for stats
  const statsData = [
    { id: 'years', label: 'Years of Experience', target: 9, icon: 'fa-calendar-alt', suffix: '+' },
    { id: 'partners', label: 'Active Partners', target: 1250, icon: 'fa-users', suffix: '+' },
    { id: 'countries', label: 'Countries Reached', target: 32, icon: 'fa-globe-americas', suffix: '' },
    { id: 'events', label: 'Live Events', target: 85, icon: 'fa-chalkboard-user', suffix: '+' }
  ];

  // Animate counters when component mounts
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const finalValues = {
      years: 9,
      partners: 1250,
      countries: 32,
      events: 85
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        years: Math.min(Math.floor(finalValues.years * progress), finalValues.years),
        partners: Math.min(Math.floor(finalValues.partners * progress), finalValues.partners),
        countries: Math.min(Math.floor(finalValues.countries * progress), finalValues.countries),
        events: Math.min(Math.floor(finalValues.events * progress), finalValues.events)
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCounters(finalValues);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  // Education journey milestones
  const educationMilestones = [
    {
      year: "2021",
      title: "Butere Boys High School",
      description: "Started Form One at Butere Boys High School. Focused on academics and personal growth.",
      icon: "fa-school",
      color: "#ffd700"
    },
    {
      year: "2024",
      title: "High School Completion",
      description: "Completed my final exams at Butere Boys High School with excellent results.",
      icon: "fa-graduation-cap",
      color: "#ffc107"
    },
    {
      year: "2024-2025",
      title: "Modcom Institute of Technology",
      description: "Learned IT skills, specialized in Web Development and Full Stack Engineering. Graduated as a Full Stack Engineer.",
      icon: "fa-laptop-code",
      color: "#ffb347"
    },
    {
      year: "2025",
      title: "Advanced Full Stack Development",
      description: "Returned to Modcom to advance and deepen my Full Stack skills because of my passion for coding. Completed advanced certification.",
      icon: "fa-code",
      color: "#ffd700"
    },
    {
      year: "2025-2026",
      title: "ALX Software Engineering",
      description: "Joined ALX Africa to learn deeper in software development, gaining world-class engineering skills.",
      icon: "fa-microchip",
      color: "#ffc107"
    }
  ];

  // Business journey milestones
  const businessMilestones = [
    {
      year: "2025",
      title: "Meeting Mr. Yusuf obalu",
      description: "Met my good friend Mr. Yusuf obalu who showed me a business opportunity in network marketing. I saw the potential and decided to pursue it.",
      icon: "fa-handshake",
      color: "#ffd700"
    },
    {
      year: "2025",
      title: "Family Support",
      description: "My parents Mr. Wycliffe Mukhanya and Miss Catherine Nelima, along with my brothers and sisters, supported me through everything. I'm truly grateful for their support.",
      icon: "fa-heart",
      color: "#ff6b4a"
    },
    {
      year: "2025-2026",
      title: "Apex Legacy Launch",
      description: "Launched Apex Legacy to help aspiring entrepreneurs achieve financial freedom through network marketing and tech skills.",
      icon: "fa-gem",
      color: "#ffd700"
    }
  ];

  // Core values
  const coreValues = [
    { title: "Gratitude First", desc: "Deeply thankful to my parents, family, and mentors who supported my journey.", icon: "fa-heart" },
    { title: "Continuous Learning", desc: "Never stop learning - from high school to Modcom to ALX, growth never ends.", icon: "fa-graduation-cap" },
    { title: "Community Power", desc: "Success is multiplied when we lift others up, just as Yusuf obalu lifted me.", icon: "fa-handshake" },
    { title: "Action Driven", desc: "Ideas without execution are just dreams - take action daily.", icon: "fa-bolt" }
  ];

  // Personal skills / expertise areas
  const expertiseAreas = [
    { skill: "Full Stack Development", level: 95, color: "#ffd700" },
    { skill: "Software Engineering", level: 92, color: "#ffc107" },
    { skill: "Web Development", level: 96, color: "#ffb347" },
    { skill: "Network Marketing", level: 90, color: "#ffa500" },
    { skill: "Leadership", level: 88, color: "#ffd700" },
    { skill: "Mentorship", level: 85, color: "#ffc107" }
  ];

  return (
    <div className="container py-5" style={{ position: 'relative', zIndex: 2, marginTop: '60px' }}>
      {/* Page Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <span className="badge px-4 py-2 rounded-pill mb-3" style={{ background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700' }}>
            <i className="fas fa-user-circle me-2"></i> My Story
          </span>
          <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B4A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Brian Shitambasi
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px', color: '#aaa' }}>
            Full Stack Developer • Network Marketer • Software Engineer • From Kakamega to Global Impact
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-lg-5">
          <div className="position-relative">
            <div className="rounded-4 overflow-shadow" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(0,0,0,0.5))', borderRadius: '2rem', padding: '0.5rem' }}>
              <div className="bg-dark rounded-4 p-4 text-center" style={{ minHeight: '300px', background: 'rgba(20,25,40,0.7)', backdropFilter: 'blur(10px)' }}>
                <i className="fas fa-user-circle fa-6x mb-3" style={{ color: '#ffd700' }}></i>
                <h3 className="text-white">Brian Shitambasi</h3>
                <p style={{ color: '#ffd700' }}>Full Stack Engineer | Network Marketer</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <i className="fab fa-linkedin fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                  <i className="fab fa-github fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                  <i className="fab fa-twitter fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="overlap-card p-4" style={{ background: 'rgba(15,20,30,0.85)', backdropFilter: 'blur(16px)', borderRadius: '2rem', border: '1px solid rgba(255,215,0,0.2)' }}>
            <h2 className="fw-bold mb-3" style={{ color: '#ffd700' }}>My Journey</h2>
            <p className="mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }}>
              I'm <span style={{ color: '#ffd700', fontWeight: 'bold' }}>Brian Shitambasi</span>, born in <strong style={{ color: '#ffd700' }}>Kakamega, Lubao</strong>. My journey started at <strong>Butere Boys High School</strong> (2021-2024), where I laid my academic foundation.
            </p>
            <p className="mb-3" style={{ color: '#ccc' }}>
              After high school, I joined <strong style={{ color: '#ffd700' }}>Modcom Institute of Technology</strong> where I discovered my passion for coding. I specialized in Web Development and Full Stack Engineering, graduating in 2025 as a <strong>Full Stack Engineer</strong>. My love for coding drove me back to Modcom for advanced training, deepening my Full Stack expertise.
            </p>
            <p className="mb-3" style={{ color: '#ccc' }}>
              I then joined <strong style={{ color: '#ffd700' }}>ALX Africa</strong> for their Software Engineering program, where I gained world-class software development skills. This journey of continuous learning shaped me into the engineer I am today.
            </p>
            <p className="mb-4" style={{ color: '#ccc' }}>
              Through my good friend <strong style={{ color: '#ffd700' }}>Mr. Yusuf obalu</strong>, I discovered network marketing. I saw it as a great opportunity to create financial freedom. My parents <strong style={{ color: '#ffd700' }}>Mr. Wycliffe Mukhanya</strong> and <strong style={{ color: '#ffd700' }}>Miss Catherine Nelima</strong>, along with my brothers and sisters, supported me through everything. I am truly lucky and forever grateful for their support.
            </p>
            <div className="row g-3">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>Full Stack Engineer</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>ALX Software Engineering Graduate</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>Network Marketing Professional</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>Born in Kakamega, Lubao</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold display-6" style={{ color: '#fff' }}>My <span style={{ color: '#ffd700' }}>Education</span> Journey</h2>
          <p style={{ color: '#aaa' }}>From Butere Boys to ALX Africa — my continuous learning path</p>
        </div>
        <div className="col-12">
          <div className="position-relative">
            {educationMilestones.map((milestone, idx) => (
              <div className="row g-0 mb-4" key={idx}>
                <div className="col-md-3 text-md-end pe-md-4">
                  <div className="d-flex align-items-center justify-content-md-end gap-2 mb-2 mb-md-0">
                    <i className={`fas ${milestone.icon} fa-lg`} style={{ color: '#ffd700' }}></i>
                    <span className="badge fs-6 px-3 py-2" style={{ background: milestone.color, color: '#000' }}>
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="overlap-card p-3" style={{ borderLeft: `4px solid ${milestone.color}` }}>
                    <h4 className="fw-bold mb-2" style={{ color: '#fff' }}>{milestone.title}</h4>
                    <p className="mb-0" style={{ color: '#aaa' }}>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Journey Timeline */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold display-6" style={{ color: '#fff' }}>My <span style={{ color: '#ffd700' }}>Business</span> Journey</h2>
          <p style={{ color: '#aaa' }}>From meeting Yusuf obalu to launching Apex Legacy</p>
        </div>
        <div className="col-12">
          <div className="position-relative">
            {businessMilestones.map((milestone, idx) => (
              <div className="row g-0 mb-4" key={idx}>
                <div className="col-md-3 text-md-end pe-md-4">
                  <div className="d-flex align-items-center justify-content-md-end gap-2 mb-2 mb-md-0">
                    <i className={`fas ${milestone.icon} fa-lg`} style={{ color: '#ffd700' }}></i>
                    <span className="badge fs-6 px-3 py-2" style={{ background: milestone.color, color: '#000' }}>
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="overlap-card p-3" style={{ borderLeft: `4px solid ${milestone.color}` }}>
                    <h4 className="fw-bold mb-2" style={{ color: '#fff' }}>{milestone.title}</h4>
                    <p className="mb-0" style={{ color: '#aaa' }}>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family Gratitude Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="overlap-card text-center p-5" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(0,0,0,0.6))' }}>
            <i className="fas fa-heart fa-3x mb-3" style={{ color: '#ff6b4a' }}></i>
            <h2 className="fw-bold mb-3" style={{ color: '#ffd700' }}>My Greatest Thanks</h2>
            <p className="lead mb-3" style={{ color: '#fff' }}>
              To my parents <strong>Mr. Wycliffe Mukhanya</strong> and <strong>Miss Catherine Nelima</strong>, and my beloved brothers and sisters
            </p>
            <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto' }}>
              Your unwavering support made everything possible. I am where I am today because of you. This journey is as much yours as it is mine. Thank you for believing in me.
            </p>
            <footer className="mt-3" style={{ color: '#ffd700' }}>— Brian Shitambasi</footer>
          </div>
        </div>
      </div>

      {/* Core Values & Expertise Row */}
      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="overlap-card p-4 h-100">
            <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}><i className="fas fa-heart me-2" style={{ color: '#ffd700' }}></i> My Core Values</h3>
            <div className="row g-3">
              {coreValues.map((value, idx) => (
                <div className="col-12" key={idx}>
                  <div className="d-flex gap-3 align-items-start">
                    <i className={`fas ${value.icon} fa-2x`} style={{ color: '#ffd700' }}></i>
                    <div>
                      <h5 className="fw-semibold mb-1" style={{ color: '#fff' }}>{value.title}</h5>
                      <p className="small mb-0" style={{ color: '#aaa' }}>{value.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="overlap-card p-4 h-100">
            <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}><i className="fas fa-chart-line me-2" style={{ color: '#ffd700' }}></i> Technical & Business Skills</h3>
            {expertiseAreas.map((area, idx) => (
              <div className="mb-3" key={idx}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-semibold" style={{ color: '#fff' }}>{area.skill}</span>
                  <span className="small" style={{ color: '#ffd700' }}>{area.level}%</span>
                </div>
                <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${area.level}%`, 
                      background: `linear-gradient(90deg, ${area.color}, #ffaa66)`,
                      borderRadius: '4px'
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-2 text-center">
              <p className="mb-0" style={{ color: '#aaa' }}>
                <i className="fas fa-graduation-cap me-2" style={{ color: '#ffd700' }}></i>
                Modcom Institute • ALX Africa • Full Stack Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Quote */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="overlap-card text-center p-5" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(0,0,0,0.6))' }}>
            <i className="fas fa-quote-right fa-3x opacity-50 mb-3" style={{ color: '#ffd700' }}></i>
            <blockquote className="display-6 fs-2 fw-semibold mb-3" style={{ color: '#fff' }}>
              "From Butere Boys to ALX Africa, from Lubao Kakamega to global impact — every step of my journey has been guided by gratitude, hard work, and the support of family."
            </blockquote>
            <footer className="mt-3" style={{ color: '#ffd700' }}>— Brian Shitambasi</footer>
            <hr className="my-4" style={{ opacity: 0.2, backgroundColor: '#fff' }} />
            <p className="mb-0" style={{ color: '#aaa' }}>
              <i className="fas fa-envelope me-2" style={{ color: '#ffd700' }}></i> brianshtambasi270@gmail.com • 
              <i className="fas fa-map-marker-alt ms-3 me-2" style={{ color: '#ffd700' }}></i> Kakamega, Lubao, Kenya
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12 text-center">
          <button className="btn-glow btn-lg px-5 py-3" style={{
            background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
            border: 'none',
            fontWeight: 600,
            borderRadius: '40px',
            boxShadow: '0 8px 20px rgba(255, 215, 0, 0.3)',
            color: '#1a1a2e',
            transition: 'all 0.3s ease'
          }}>
            <i className="fas fa-handshake me-2"></i> Connect With Me
          </button>
          <p className="mt-3 small" style={{ color: '#aaa' }}>Let's build your legacy together — schedule a coffee chat!</p>
        </div>
      </div>

      <style>{`
        .overlap-card {
          background: rgba(15, 20, 30, 0.85);
          backdrop-filter: blur(16px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 215, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .overlap-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -15px rgba(0,0,0,0.5);
          border-color: rgba(255, 215, 0, 0.4);
        }
        .btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(255, 215, 0, 0.5);
        }
        .progress {
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .display-6 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMe;