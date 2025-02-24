import React, { useState } from 'react';
import slide from '../../res/img/slideTwo.svg';
import { PiStudentFill, PiFeatherFill, PiBookOpenTextFill, PiTranslateFill, PiCertificateFill, PiChartLineUpFill } from "react-icons/pi";
import { FaLightbulb } from "react-icons/fa";
import '../../styles/colors.css';

const SlideTwo = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: PiStudentFill,
            title: "Smart Learning",
            description: "AI-powered personalized learning paths that adapt to your pace and style",
            color: "#FFD700"
        },
        {
            icon: PiTranslateFill,
            title: "Multi-Language",
            description: "Learn in your preferred language with support for 23+ languages",
            color: "#3498DB"
        },
        {
            icon: PiBookOpenTextFill,
            title: "Rich Content",
            description: "Comprehensive video lectures and interactive theory materials",
            color: "#FFD700"
        },
        {
            icon: PiCertificateFill,
            title: "Certification",
            description: "Earn certificates upon successful course completion",
            color: "#3498DB"
        }
    ];

    return (
        <div className="relative bg-luxury py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                {/* Floating Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Section - Left */}
                    <div className="lg:w-1/2 space-y-10">
                        {/* Section Label */}
                        <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 px-4 py-2 rounded-full">
                            <FaLightbulb className="text-[#FFD700] animate-pulse" />
                            <span className="text-[#FFD700] font-medium">Why Choose Us</span>
                        </div>

                        {/* Main Title */}
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black tracking-tight leading-none">
                                <span className="text-gradient-gold">Revolutionary</span>
                                <span className="text-white block mt-2">Learning Experience</span>
                            </h2>
                            <p className="text-xl text-white/80 leading-relaxed">
                                Experience the future of education with our cutting-edge AI technology that transforms how you learn and grow.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="card-luxury p-6 backdrop-blur-sm border border-white/10 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                                    onMouseEnter={() => setActiveFeature(index)}
                                    style={{
                                        background: activeFeature === index 
                                            ? `linear-gradient(45deg, ${feature.color}10, transparent)`
                                            : undefined
                                    }}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
                                        style={{ backgroundColor: `${feature.color}20` }}>
                                        <feature.icon className={`text-2xl`} style={{ color: feature.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: feature.color }}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/70">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Display - Right */}
                    <div className="lg:w-1/2 relative">
                        {/* Main Container */}
                        <div className="relative bg-luxury/50 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                            {/* Feature Highlight */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3498DB]/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                                <div className="flex items-center gap-2">
                                    <PiChartLineUpFill className="text-[#3498DB] animate-pulse" />
                                    <span className="text-[#3498DB] font-medium">Interactive Learning</span>
                                </div>
                            </div>

                            {/* Main Image Container */}
                            <div className="relative rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-luxury/50 via-transparent to-luxury/50"></div>
                                <img
                                    src={slide}
                                    alt="Learning Interface"
                                    className="w-full rounded-xl transform group-hover:scale-105 transition-all duration-500"
                                />
                                
                                {/* Floating Stats */}
                                <div className="absolute top-4 right-4 bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10 animate-float">
                                    <div className="flex items-center gap-3">
                                        <PiFeatherFill className="text-[#FFD700] text-xl" />
                                        <div>
                                            <p className="text-[#FFD700] font-bold">95%</p>
                                            <p className="text-white/60 text-sm">Success Rate</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10 animate-float" style={{animationDelay: '1s'}}>
                                    <div className="flex items-center gap-3">
                                        <PiStudentFill className="text-[#3498DB] text-xl" />
                                        <div>
                                            <p className="text-[#3498DB] font-bold">10K+</p>
                                            <p className="text-white/60 text-sm">Active Learners</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Indicators */}
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/80">Courses</span>
                                        <span className="text-[#FFD700]">1.2K+</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-[#FFD700] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/80">Languages</span>
                                        <span className="text-[#3498DB]">23+</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-[#3498DB] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="bg-luxury/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/80">Satisfaction</span>
                                        <span className="text-[#FFD700]">98%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] bg-[#FFD700] rounded-full"></div>
                                    </div>
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

export default SlideTwo;
