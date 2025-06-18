import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <p className="headline">
          Nobody likes being the last to know, here's your chance to be the first.
        </p>
        <p className="policy">
          By subscribing, you agree to JWA’s Privacy Policy, and Terms of Use
        </p>
        <div className="form">
          <input type="text" placeholder="First Name" />
          <input type="email" placeholder="Your Email" />
          <button>→</button>
        </div>
      </div>

      <div className="footer-rows">
        <div className="social-icons">
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
          <FaTiktok />
          <FaXTwitter />
        </div>

        <div className="links">
          <div>
            <p>Careers</p>
            <p>Store Locator</p>
            <p>Privacy</p>
            <p>Delivery and Returns</p>
            <p>Size Guide</p>
          </div>
          <div>
            <p>Book An Appointment</p>
            <p>Customer Support</p>
            <p>Terms & Conditions</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
      </div>

      <p className="copy">© 2025 JW Anderson</p>
    </footer>
  );
};

export default Footer;