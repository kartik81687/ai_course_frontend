import React from 'react';
import { FaBrain, FaGlobe, FaRobot, FaVideo, FaChartLine, FaShieldAlt, FaGraduationCap, FaCertificate, FaUserGraduate, FaLaptopCode } from 'react-icons/fa';
import { motion } from "framer-motion";
import '../../styles/colors.css';

const SlideFive = () => {
    const features = [
        {
            icon: <FaBrain />,
            title: "AI-Powered Learning",
            description: "Advanced algorithms adapt to your learning style for personalized education",
            stats: "95% Learning Efficiency",
            color: "gold",
            delay: 0
        },
        {
            icon: <FaGlobe />,
            title: "Global Access",
            description: "Learn in 23+ languages with our comprehensive translation system",
            stats: "23+ Languages Available",
            color: "neon",
            delay: 0.1
        },
        {
            icon: <FaRobot />,
            title: "AI Teacher Chat",
            description: "Get instant answers and guidance from our AI teaching assistant",
            stats: "24/7 AI Support",
            color: "gold",
            delay: 0.2
        },
        {
            icon: <FaVideo />,
            title: "Rich Content",
            description: "Access video lectures, theory materials, and interactive content",
            stats: "1000+ Video Hours",
            color: "neon",
            delay: 0.3
        },
        {
            icon: <FaChartLine />,
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics and insights",
            stats: "Real-time Analytics",
            color: "gold",
            delay: 0.4
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Platform",
            description: "Enterprise-grade security for your learning environment",
            stats: "256-bit Encryption",
            color: "neon",
            delay: 0.5
        },
        {
            icon: <FaCertificate />,
            title: "Certification",
            description: "Earn recognized certificates upon course completion",
            stats: "Verified Certificates",
            color: "gold",
            delay: 0.6
        },
        {
            icon: <FaLaptopCode />,
            title: "Interactive Learning",
            description: "Engage with hands-on exercises and practical assignments",
            stats: "100+ Interactive Tools",
            color: "neon",
            delay: 0.7
        }
    ];

    return (
        <div className="relative bg-luxury py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                {/* Animated Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-black mb-4 max-md:text-3xl">
                        <span className="text-gradient-gold">Premium </span>
                        <span className="text-gradient-neon">Features</span>
                    </h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed max-md:text-lg">
                        Experience the future of learning with our cutting-edge features
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: feature.delay }}
                            className={`card-luxury p-6 ${
                                feature.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                            } group relative overflow-hidden`}
                        >
                            {/* Feature Icon */}
                            <div className={`${
                                feature.color === 'gold' 
                                    ? 'bg-[#FFD700]/10 text-[#FFD700]' 
                                    : 'bg-[#3498DB]/10 text-[#3498DB]'
                            } w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
                            transform group-hover:scale-110 transition-transform duration-500`}>
                                <div className="text-3xl">{feature.icon}</div>
                            </div>

                            {/* Feature Content */}
                            <h3 className={`text-xl font-bold mb-3 ${
                                feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                            }`}>
                                {feature.title}
                            </h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Feature Stats */}
                            <div className={`absolute bottom-0 left-0 right-0 ${
                                feature.color === 'gold' 
                                    ? 'bg-[#FFD700]/10' 
                                    : 'bg-[#3498DB]/10'
                            } py-2 px-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}>
                                <span className={`text-sm font-medium ${
                                    feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                }`}>
                                    {feature.stats}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="card-luxury p-6 hover-glow-gold">
                            <div className="text-4xl font-black text-[#FFD700] mb-2">10K+</div>
                            <div className="text-white/60">Active Learners</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-neon">
                            <div className="text-4xl font-black text-[#3498DB] mb-2">95%</div>
                            <div className="text-white/60">Success Rate</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-gold">
                            <div className="text-4xl font-black text-[#FFD700] mb-2">23+</div>
                            <div className="text-white/60">Languages</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-neon">
                            <div className="text-4xl font-black text-[#3498DB] mb-2">24/7</div>
                            <div className="text-white/60">Support</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SlideFive;
