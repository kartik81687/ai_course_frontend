import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../res/img/logo.svg';
import DarkLogo from '../res/img/darkLogo.svg';
import { company, websiteURL } from '../constants';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import '../styles/colors.css';

const Footers = () => {
  const storedTheme = sessionStorage.getItem('darkMode');
  const navigate = useNavigate();

  const footerLinks = [
    { label: 'About', onClick: () => navigate("/about") },
    { label: 'Privacy Policy', onClick: () => navigate("/privacy") },
    { label: 'Terms', onClick: () => navigate("/terms") },
    { label: 'Contact', onClick: () => navigate("/contact") }
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: 'https://twitter.com' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com' },
    { icon: <FaGithub />, href: 'https://github.com' },
    { icon: <FaDiscord />, href: 'https://discord.com' }
  ];

  return (
    <footer className="bg-luxury relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <a href={websiteURL} className="flex items-center mb-6 group">
              <img
                src={storedTheme === "true" ? DarkLogo : Logo}
                alt={company}
                className="h-10 w-10 transform transition-transform group-hover:scale-110"
              />
              <span className="text-[#FFD700] text-2xl font-black ml-3">{company}</span>
            </a>
            <p className="text-white/70 max-w-md">
              Transform your learning journey with our AI-powered course generation platform. Available in 23+ languages.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick}
                      className="text-white/70 hover:text-[#FFD700] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#FFD700] transition-colors text-xl"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="text-center text-white/60">
            <p>© {new Date().getFullYear()} {company}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
