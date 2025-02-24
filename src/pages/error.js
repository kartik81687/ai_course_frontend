import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { name, websiteURL } from '../constants';
import LogoComponent from '../components/LogoComponent';
import '../styles/colors.css';

const Error = () => {
    const navigate = useNavigate();
    const storedTheme = sessionStorage.getItem('darkMode');

    return (
        <div className="min-h-screen bg-luxury flex flex-col relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                {/* Animated Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
                </div>
            </div>

            {/* Header */}
            <nav className="relative z-10 container mx-auto px-6 py-8">
                <a href={websiteURL} className="flex items-center space-x-3 group w-fit">
                    <div className="transform transition-transform group-hover:scale-110">
                        <LogoComponent isDarkMode={storedTheme} />
                    </div>
                    <span className="text-2xl font-black text-[#FFD700]">{name}</span>
                </a>
            </nav>

            {/* Error Content */}
            <div className="flex-1 relative z-10 container mx-auto px-6 py-12 flex items-center justify-center">
                <div className="card-luxury p-12 max-w-2xl mx-auto text-center rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                    {/* Error Icon */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#3498DB]/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-r from-[#FFD700] to-[#3498DB] w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                            <FaExclamationTriangle className="text-5xl text-white animate-pulse" />
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-8xl font-black text-[#FFD700] mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-white/70 text-lg mb-12">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="btn-luxury w-full sm:w-auto py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300"
                        >
                            <FaHome className="text-xl" />
                            <span>Back to Home</span>
                        </button>
                        
                        <button
                            onClick={() => navigate(-1)}
                            className="btn-neon w-full sm:w-auto py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300"
                        >
                            <FaArrowLeft className="text-xl" />
                            <span>Go Back</span>
                        </button>
                    </div>

                    {/* Support Section */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-white/70 mb-4">
                            Need assistance? Our support team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center space-x-2 text-[#FFD700] hover:text-white/90 transition-colors"
                        >
                            <FaEnvelope />
                            <span>Contact Support</span>
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
                        <a href="/about" className="hover:text-[#FFD700] transition-colors">About</a>
                        <span>•</span>
                        <a href="/features" className="hover:text-[#FFD700] transition-colors">Features</a>
                        <span>•</span>
                        <a href="/pricing" className="hover:text-[#FFD700] transition-colors">Pricing</a>
                        <span>•</span>
                        <a href="/contact" className="hover:text-[#FFD700] transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
