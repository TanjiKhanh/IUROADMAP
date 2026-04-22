import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        
        {/* Phần nội dung chính: Grid 4 cột */}
        <div className="footer-content">
          {/* Cột 1: Brand Info */}
          <div className="footer-brand">
            <h4>
               {/* Icon vô cực tượng trưng hoặc logo */}
               <span style={{color: '#3b82f6', fontSize: '1.5rem', marginRight: '8px'}}>∞</span> 
               IUROADMAP
            </h4>
            <p>Connecting learners with opportunities.</p>
          </div>

          {/* Cột 2: Product */}
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Cột 3: Company */}
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Cột 4: Legal */}
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Phần dưới: Copyright & Socials */}
        <div className="footer-bottom">
          <p>&copy; 2025 SkillBridge. All rights reserved.</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;