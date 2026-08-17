import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layouts/Footer';
import '../../styles/Landing.css';

// --- Assets Imports ---
import logo from '../../assets/images/logo-gupjob-primary.png';
import hero from '../../assets/images/Course app-amico.png';

// Icons
import iconRoadmaps from '../../assets/images/icon-interactive-roadmaps.png';
import iconSkills from '../../assets/images/icon-verified-skills.png';
import iconMentorship from '../../assets/images/icon-expert-mentorship.png';
import iconHiring from '../../assets/images/icon-data-driven-hiring.png';
import iconProjects from '../../assets/images/icon-real-projects.png';
import iconCohort from '../../assets/images/icon-cohort-tracking.png';

export default function Landing() {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* --- Header --- */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <Link to="/">
              <img src={logo} alt="GUPJOB" className="brand-logo" />
            </Link>
          </div>
          <nav className="site-nav">
            <button onClick={() => scrollToSection('features')} className="nav-link">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
              How it Works
            </button>
            
            <Link to="/companies" className="nav-link">For Companies</Link>
            <Link to="/login" className="btn btn--ghost small">Sign in</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="hero container">
          <div className="hero-content">
            <h1 className="hero-title">Bridge the gap between learning and hiring</h1>
            <p className="hero-desc">
              Master real-world skills through structured learning paths, get mentored by industry experts,
              and land opportunities with leading companies.
            </p>
            
            <div className="hero-actions">
              <Link to="/register" className="btn btn--primary">Start Learning (Free)</Link>
              <Link to="/companies" className="btn btn--ghost">Find Top Talent</Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item"><strong>50K+</strong><span>Learners</span></div>
              <div className="stat-item"><strong>500+</strong><span>Verified Skills</span></div>
              <div className="stat-item"><strong>200+</strong><span>Companies</span></div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img src={hero} alt="Platform Preview" className="hero-img" />
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="features-section container">
          <div className="section-header">
            <h2>Why Choose SkillBridge?</h2>
          </div>

          <div className="features-grid">
            <FeatureCard 
              icon={iconRoadmaps} 
              title="Interactive Roadmaps" 
              desc="Follow structured learning paths with visual DAG representation. See prerequisites, track progress, and unlock new skills." 
            />
            <FeatureCard 
              icon={iconSkills} 
              title="Verified Skills" 
              desc="Submit real projects for verification. Get reviewed by industry mentors and earn blockchain-backed skill badges." 
            />
            <FeatureCard 
              icon={iconMentorship} 
              title="Expert Mentorship" 
              desc="Connect with engineers from top companies. Book 1-on-1 sessions, get code reviews, and receive career guidance." 
            />
            <FeatureCard 
              icon={iconHiring} 
              title="Data-Driven Hiring" 
              desc="Companies find talent based on verified skills, not keywords. See actual project work and roadmap completion." 
            />
            <FeatureCard 
              icon={iconProjects} 
              title="Real Projects" 
              desc="Learn by building. Every skill requires a real project submission, ensuring practical, hands-on experience." 
            />
            <FeatureCard 
              icon={iconCohort} 
              title="Cohort Tracking" 
              desc="Companies can track internship cohorts with real-time progress matrices. See who’s excelling and who needs support." 
            />
          </div>
        </section>

        {/* --- CTA Band --- */}
        <section className="cta-band">
          <div className="container cta-content">
            <h2>Ready to bridge the gap?</h2>
            <p>Join thousands of learners transforming their careers today.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn--white">Start Learning Now</Link>
              <Link to="/contact" className="btn btn--transparent">Schedule a Demo</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// Sub-component cho Feature Card
const FeatureCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <article className="feature-card">
    <div className="icon-wrapper">
      <img src={icon} alt={title} />
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </article>
);