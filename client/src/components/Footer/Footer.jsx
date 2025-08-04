import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        <div className="footer-column">
          <h3 className="footer-heading">Customer Service</h3>
          <ul className="footer-links">
            <li><a>FAQ</a></li>
            <li><a>Shipping & Returns</a></li>
            <li><a>Store Locator</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">About Us</h3>
          <ul className="footer-links">
            <li><a>Our Story</a></li>
            <li><a>Careers</a></li>
            <li><a>Press</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            <li><a>Puma</a></li>
            <li><a>Nike</a></li>
            <li><a>Adidas</a></li>
            <li><a>Sale</a></li>
          </ul>
        </div>
        <div className="footer-column">
        
          <div className="social-media-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/FooterLogo/facebook.png" alt="Facebook" className="social-icon-image" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src='/FooterLogo/X.png' alt="Twitter" className="social-icon-image-X" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img  style={{ width: '40px', height: '40px' }} src="/FooterLogo/instagram.webp" alt="Instagram" className="social-icon-image" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Your Scroll Through. All Rights Reserved.</p>
        <div className="footer-legal-links">
          <a>Terms of Service</a>
          <a>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;