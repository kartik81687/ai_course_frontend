import React, { useEffect, useState } from 'react';
import { name, serverURL, websiteURL } from '../constants';
import LogoComponent from './LogoComponent';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/colors.css';

const Header = ({ isHome }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = sessionStorage.getItem('uid') !== null;

  useEffect(() => {
    if (isHome && !isLoggedIn) {
      navigate("/signin");
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, navigate, isLoggedIn]);

  useEffect(() => {
    async function dashboardData() {
      const postURL = serverURL + `/api/dashboard`;
      const response = await axios.post(postURL);
      sessionStorage.setItem('adminEmail', response.data.admin.email);
      if (response.data.admin.email === sessionStorage.getItem('email')) {
        setAdmin(true);
      }
    }
    if (sessionStorage.getItem('adminEmail')) {
      if (sessionStorage.getItem('adminEmail') === sessionStorage.getItem('email')) {
        setAdmin(true);
      }
    } else if (isLoggedIn) {
      dashboardData();
    }
  }, [isLoggedIn]);

  const getNavigationItems = () => {
    if (isLoggedIn) {
      return [
        { label: 'Dashboard', onClick: () => navigate('/home'), className: 'nav-link' },
        { label: 'Profile', onClick: () => navigate('/profile'), className: 'nav-link' },
        { label: 'Pricing', onClick: () => navigate('/pricing', { state: { header: true } }), className: 'nav-link' },
        ...(admin ? [{ label: 'Admin', onClick: () => {
          sessionStorage.setItem('darkMode', false);
          window.location.href = websiteURL + '/admin/dashboard';
        }, className: 'nav-link' }] : []),
        { label: 'Logout', onClick: () => {
          sessionStorage.clear();
          toast('Logout Successful', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
          navigate('/signin');
        }, className: 'nav-link text-gradient-gold' },
        { label: 'Generate Course', onClick: () => navigate('/create'), className: 'btn-neon' }
      ];
    } else {
      return [
        { label: 'Pricing', onClick: () => navigate('/pricing', { state: { header: false } }), className: 'nav-link' },
        { label: 'Features', onClick: () => navigate('/features'), className: 'nav-link' },
        { label: 'Sign In', onClick: () => navigate('/signin'), className: 'btn-luxury' },
        { label: 'Get Started', onClick: () => navigate('/signup'), className: 'btn-neon' }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className={`container mx-auto px-6 ${isScrolled ? 'glass-premium' : ''} rounded-2xl mx-4`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate(isLoggedIn ? '/home' : '/')}
          >
            <div className="transform transition-transform group-hover:scale-110">
              <LogoComponent />
            </div>
            <span className="text-2xl font-black text-[#FFD700]">{name}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-500 ${
                  item.className === 'nav-link' 
                    ? 'text-white hover:text-[#FFD700]' 
                    : item.className
                } ${
                  item.className.includes('btn') ? 'hover:scale-110' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-[#FFD700] transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 rounded-xl text-base font-medium ${
                  item.className === 'nav-link' 
                    ? 'text-white hover:text-[#FFD700]' 
                    : item.className
                } transition-all duration-300 hover:scale-105`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;