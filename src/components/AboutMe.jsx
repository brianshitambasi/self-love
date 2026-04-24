// AboutMe.jsx
// Personal story, credentials, and network marketing journey component
// Designed to work with the 3D portfolio ecosystem (Bootstrap 5 + React)

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

  // Personal journey milestones
  const journeyMilestones = [
    {
      year: "2016",
      title: "First Step",
      description: "Started my network marketing journey with just $200 and a dream. Faced rejection but never gave up.",
      icon: "fa-seedling",
      color: "#ffd700"
    },
    {
      year: "2018",
      title: "First Leadership Role",
      description: "Promoted to Team Leader, built my first 100-person team. Discovered the power of mentorship.",
      icon: "fa-chart-line",
      color: "#ffc107"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded operations to 15+ countries, mastered digital recruiting systems.",
      icon: "fa-globe",
      color: "#ffb347"
    },
    {
      year: "2022",
      title: "Top 1% Achiever",
      description: "Recognized as Top 1% earner globally. Launched my own training academy.",
      icon: "fa-trophy",
      color: "#ffd700"
    },
    {
      year: "2024",
      title: "Mentor & Speaker",
      description: "Keynote speaker at 20+ industry events. Now helping others achieve financial freedom.",
      icon: "fa-microphone-alt",
      color: "#ffc107"
    }
  ];

  // Core values
  const coreValues = [
    { title: "Integrity First", desc: "Building trust through transparency and ethical leadership.", icon: "fa-shield-heart" },
    { title: "Growth Mindset", desc: "Continuous learning and pushing beyond comfort zones.", icon: "fa-chart-simple" },
    { title: "Community Power", desc: "Success is multiplied when we lift others up.", icon: "fa-handshake" },
    { title: "Action Driven", desc: "Ideas without execution are just dreams.", icon: "fa-bolt" }
  ];

  // Personal skills / expertise areas
  const expertiseAreas = [
    { skill: "Recruitment Systems", level: 95, color: "#ffd700" },
    { skill: "Leadership Coaching", level: 98, color: "#ffc107" },
    { skill: "Digital Marketing", level: 92, color: "#ffb347" },
    { skill: "Sales Psychology", level: 96, color: "#ffa500" },
    { skill: "Team Building", level: 97, color: "#ffd700" },
    { skill: "Personal Branding", level: 90, color: "#ffc107" }
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
            About Me
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px', color: '#aaa' }}>
            From humble beginnings to global network marketing leader — this is my journey and how I can help you succeed.
          </p>
        </div>
      </div>

      {/* Bio Section with overlapping image effect */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-lg-5">
          <div className="position-relative">
            <div className="rounded-4 overflow-shadow" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(0,0,0,0.5))', borderRadius: '2rem', padding: '0.5rem' }}>
              <div className="bg-dark rounded-4 p-4 text-center" style={{ minHeight: '300px', background: 'rgba(20,25,40,0.7)', backdropFilter: 'blur(10px)' }}>
                <i className="fas fa-gem fa-6x mb-3" style={{ color: '#ffd700' }}></i>
                <h3 className="text-white">Apex Legacy</h3>
                <p style={{ color: '#ffd700' }}>Network Marketing Architect</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <i className="fab fa-linkedin fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                  <i className="fab fa-instagram fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                  <i className="fab fa-youtube fa-2x" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="overlap-card p-4" style={{ background: 'rgba(15,20,30,0.85)', backdropFilter: 'blur(16px)', borderRadius: '2rem', border: '1px solid rgba(255,215,0,0.2)' }}>
            <h2 className="fw-bold mb-3" style={{ color: '#ffd700' }}>Who Am I?</h2>
            <p className="mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }}>
              I'm <span style={{ color: '#ffd700', fontWeight: 'semibold' }}>the founder of Apex Legacy</span>, a network marketing professional with over 9 years of hands-on experience. 
              I started with zero connections, minimal capital, and a burning desire to create financial freedom. 
              Today, I've built a thriving community of <strong style={{ color: '#ffd700' }}>1,250+ active partners</strong> across 32 countries.
            </p>
            <p className="mb-4" style={{ color: '#ccc' }}>
              My philosophy is simple: <strong style={{ color: '#ffd700' }}>authentic relationships + proven systems = exponential growth</strong>. 
              I don't believe in shortcuts or hype — only sustainable strategies that create real leaders.
            </p>
            <div className="row g-3">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>5000+ team members trained</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-check-circle" style={{ color: '#ffd700' }}></i>
                  <span style={{ color: '#aaa' }}>Multiple industry awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="row g-4 mb-5">
        {statsData.map((stat) => (
          <div className="col-md-3 col-6" key={stat.id}>
            <div className="overlap-card text-center p-4 h-100">
              <i className={`fas ${stat.icon} fa-2x mb-3`} style={{ color: '#ffd700' }}></i>
              <div className="stat-number display-3 fw-bold" style={{ color: '#ffd700' }}>
                {counters[stat.id]}{stat.suffix}
              </div>
              <p className="mb-0 small" style={{ color: '#aaa' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Journey Timeline */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold display-6" style={{ color: '#fff' }}>My Journey <span style={{ color: '#ffd700' }}>Timeline</span></h2>
          <p style={{ color: '#aaa' }}>Key milestones that shaped my network marketing career</p>
        </div>
        <div className="col-12">
          <div className="position-relative">
            {journeyMilestones.map((milestone, idx) => (
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
            <h3 className="fw-bold mb-4" style={{ color: '#ffd700' }}><i className="fas fa-chart-line me-2" style={{ color: '#ffd700' }}></i> Expertise Areas</h3>
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
                Certified Network Marketing Professional • International Speaker
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
              "Success in network marketing isn't about selling — it's about serving, leading, and empowering others to become their best selves."
            </blockquote>
            <footer className="mt-3" style={{ color: '#ffd700' }}>— Apex Legacy</footer>
            <hr className="my-4" style={{ opacity: 0.2, backgroundColor: '#fff' }} />
            <p className="mb-0" style={{ color: '#aaa' }}>
              <i className="fas fa-envelope me-2" style={{ color: '#ffd700' }}></i> hello@apexlegacy.com • 
              <i className="fas fa-phone ms-3 me-2" style={{ color: '#ffd700' }}></i> +1 (555) 789-0123
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
            <i className="fas fa-handshake me-2"></i> Join Apex Legacy Today
          </button>
          <p className="mt-3 small" style={{ color: '#aaa' }}>Book a free 20-min discovery call → Limited slots weekly</p>
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
          .stat-number {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMe;