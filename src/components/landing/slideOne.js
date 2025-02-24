import React, { useState, useEffect } from 'react';
import slide from '../../res/img/slideOne.png'
import { useNavigate } from "react-router-dom";
import { FaRocket, FaGraduationCap, FaGlobe, FaArrowRight, FaBrain, FaCode, FaVideo, FaBook, FaCheckCircle } from 'react-icons/fa';
import '../../styles/colors.css';

const SlideOne = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        { icon: FaBrain, text: "Analyzing Topic...", color: "#FFD700" },
        { icon: FaCode, text: "Generating Content...", color: "#3498DB" },
        { icon: FaVideo, text: "Creating Videos...", color: "#FFD700" },
        { icon: FaBook, text: "Finalizing Course...", color: "#3498DB" },
        { icon: FaCheckCircle, text: "Course Ready!", color: "#FFD700" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    function redirectSignIn() {
        navigate("/signin");
    }
    function redirectSignUp() {
        navigate("/signup");
    }

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden bg-luxury">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
                </div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Section - Left */}
                    <div className="lg:w-1/2 space-y-10">
                        {/* Pre-title */}
                        <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 px-4 py-2 rounded-full">
                            <FaRocket className="text-[#FFD700] animate-pulse" />
                            <span className="text-[#FFD700] font-medium">AI-Powered Learning Platform</span>
                        </div>

                        {/* Hero Title */}
                        <div className="space-y-6">
                            <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none">
                                <span className="text-gradient-gold block mb-2">Transform</span>
                                <span className="text-white">Your Learning</span>
                                <span className="text-gradient-gold block mt-2">Journey</span>
                            </h1>
                            <p className="text-2xl text-[#3498DB] font-light max-w-xl">
                                Create personalized courses instantly with advanced AI technology
                            </p>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center">
                                    <FaGraduationCap className="text-[#FFD700] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#FFD700]">Smart Learning</h3>
                                    <p>AI adapts to your learning style</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#3498DB]/10 rounded-2xl flex items-center justify-center">
                                    <FaGlobe className="text-[#3498DB] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#3498DB]">Global Access</h3>
                                    <p>Available in 23+ languages</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={redirectSignUp} 
                                    className="btn-luxury px-8 py-4 rounded-2xl text-lg font-medium hover:scale-105 transition-all animate-pulse-gold flex items-center gap-2"
                                >
                                    Begin Your Journey
                                    <FaArrowRight className="text-sm" />
                                </button>
                                <button 
                                    onClick={redirectSignIn} 
                                    className="btn-neon px-8 py-4 rounded-2xl text-lg font-medium hover:scale-105 transition-all glass-premium"
                                >
                                    Sign In
                                </button>
                            </div>
                            <p className="text-white/60 text-sm">
                                Join 10,000+ learners worldwide
                            </p>
                        </div>
                    </div>

                    {/* Image Section - Right */}
                    <div className="lg:w-1/2 relative">
                        {/* Main Container */}
                        <div className="relative bg-luxury/50 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                            {/* AI Processing Animation */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD700]/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                                <div className="flex items-center gap-2">
                                    <FaBrain className="text-[#FFD700] animate-pulse" />
                                    <span className="text-[#FFD700] font-medium">AI Processing</span>
                                </div>
                            </div>

                            {/* Course Creation Visualization */}
                            <div className="relative aspect-video bg-luxury/80 rounded-2xl p-6 overflow-hidden">
                                {/* Processing Steps */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="space-y-6 w-full">
                                        {steps.map((step, index) => {
                                            const Icon = step.icon;
                                            const isActive = index === currentStep;
                                            const isPast = index < currentStep;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`transform transition-all duration-500 ${
                                                        isActive ? 'scale-110 opacity-100' :
                                                        isPast ? 'opacity-50 scale-95' : 'opacity-0 scale-90'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4 bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} 
                                                            style={{ backgroundColor: `${step.color}20` }}>
                                                            <Icon className={`text-2xl`} style={{ color: step.color }} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-white/80 font-medium">{step.text}</p>
                                                            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                                                                <div 
                                                                    className="h-full rounded-full transition-all duration-500"
                                                                    style={{ 
                                                                        backgroundColor: step.color,
                                                                        width: isActive ? '100%' : isPast ? '100%' : '0%'
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 animate-float" style={{animationDelay: '0.5s'}}>
                                    <div className="bg-[#FFD700]/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                        <FaVideo className="text-[#FFD700] text-xl" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 animate-float" style={{animationDelay: '1s'}}>
                                    <div className="bg-[#3498DB]/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                        <FaBook className="text-[#3498DB] text-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Generated Content Preview */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="h-2 w-3/4 bg-[#FFD700]/20 rounded-full mb-2"></div>
                                    <div className="h-2 w-1/2 bg-[#FFD700]/10 rounded-full"></div>
                                </div>
                                <div className="bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="h-2 w-2/3 bg-[#3498DB]/20 rounded-full mb-2"></div>
                                    <div className="h-2 w-3/4 bg-[#3498DB]/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute -inset-4 -z-10">
                            <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/20 via-[#3498DB]/20 to-[#FFD700]/20 rounded-3xl blur-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideOne;
