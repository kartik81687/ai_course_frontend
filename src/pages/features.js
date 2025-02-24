import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footers from '../components/footers';
import { FaBrain, FaGlobe, FaRobot, FaVideo, FaChartLine, FaShieldAlt, FaClock, FaLightbulb, FaUserGraduate, FaRocket, FaGem, FaCrown, FaHeadset } from 'react-icons/fa';
import { IoIosTimer } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { PiVideo } from "react-icons/pi";
import { motion } from 'framer-motion';
import '../styles/colors.css';

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const navigate = useNavigate();

    const mainFeatures = [
        {
            icon: <FaBrain />,
            title: "AI-Powered Learning",
            description: "Advanced algorithms adapt to your learning style for personalized education",
            stats: "95% Learning Efficiency",
            color: "gold"
        },
        {
            icon: <FaGlobe />,
            title: "Global Access",
            description: "Learn in 23+ languages with our comprehensive translation system",
            stats: "23+ Languages Available",
            color: "neon"
        },
        {
            icon: <FaRobot />,
            title: "AI Teacher Chat",
            description: "Get instant answers and guidance from our AI teaching assistant",
            stats: "24/7 AI Support",
            color: "gold"
        },
        {
            icon: <FaVideo />,
            title: "Rich Content",
            description: "Access video lectures, theory materials, and interactive content",
            stats: "1000+ Video Hours",
            color: "neon"
        },
        {
            icon: <FaChartLine />,
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics and insights",
            stats: "Real-time Analytics",
            color: "gold"
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Platform",
            description: "Enterprise-grade security for your learning environment",
            stats: "256-bit Encryption",
            color: "neon"
        }
    ];

    const courseFeatures = [
        {
            icon: <FaClock />,
            title: "Topic Input",
            description: "Easily enter topics and subtopics with an intuitive interface",
            stats: "5-10 Topics per Course",
            color: "gold"
        },
        {
            icon: <FaLightbulb />,
            title: "Course Type Preferences",
            description: "Choose between Image + Theory or Video + Theory formats",
            stats: "Multiple Formats",
            color: "neon"
        },
        {
            icon: <FaBrain />,
            title: "AI-Powered Generation",
            description: "Advanced AI algorithms analyze your inputs to generate comprehensive courses",
            stats: "99% Accuracy",
            color: "gold"
        },
        {
            icon: <FaUserGraduate />,
            title: "Learning Styles",
            description: "Accommodate different learning styles with varied content formats",
            stats: "4+ Learning Styles",
            color: "neon"
        }
    ];

    const benefits = [
        {
            icon: <IoIosTimer />,
            title: "Time Efficiency",
            description: "Save hours of manual planning with instant course generation",
            stats: "90% Time Saved",
            color: "gold"
        },
        {
            icon: <BsSearch />,
            title: "AI-Enhanced Materials",
            description: "Ensure high-quality content with AI-driven recommendations",
            stats: "98% Quality Score",
            color: "neon"
        },
        {
            icon: <PiVideo />,
            title: "Interactive Learning",
            description: "Keep users engaged with different media formats",
            stats: "85% Engagement Rate",
            color: "gold"
        }
    ];

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={false} />
            
            {/* Main Content */}
            <div className="flex-1 relative mt-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                    {/* Animated Orbs */}
                    <div className="absolute w-full h-full overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 px-4 py-2 rounded-full mb-6">
                            <FaGem className="text-[#FFD700] animate-pulse" />
                            <span className="text-[#FFD700] font-medium">Premium Features</span>
                        </div>
                        <h1 className="text-6xl font-black mb-6 max-md:text-4xl">
                            <span className="text-gradient-gold">Revolutionary </span>
                            <span className="text-white">Learning</span>
                            <span className="text-gradient-neon block mt-2">Experience</span>
                        </h1>
                        <p className="text-white/80 text-xl max-w-2xl mx-auto">
                            Experience the next generation of education with our comprehensive suite of features
                        </p>
                    </motion.div>

                    {/* Main Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {mainFeatures.map((feature, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`card-luxury p-8 text-left ${
                                    feature.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                                } group relative overflow-hidden`}
                                onMouseEnter={() => setActiveFeature(index)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <div className={`${
                                    feature.color === 'gold' 
                                        ? 'bg-gold/10 text-[#FFD700]' 
                                        : 'bg-amethyst/10 text-[#3498DB]'
                                } p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center text-3xl
                                transform group-hover:scale-110 transition-transform duration-500`}>
                                    {feature.icon}
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${
                                    feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                }`}>
                                    {feature.title}
                                </h3>
                                <p className="text-white/70 text-lg mb-4">
                                    {feature.description}
                                </p>
                                <div className={`absolute bottom-0 left-0 w-full p-4 ${
                                    feature.color === 'gold' ? 'bg-[#FFD700]/10' : 'bg-[#3498DB]/10'
                                } backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}>
                                    <p className={`text-sm font-medium ${
                                        feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    }`}>
                                        {feature.stats}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Course Features Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#3498DB]/10 px-4 py-2 rounded-full mb-6">
                            <FaCrown className="text-[#3498DB] animate-pulse" />
                            <span className="text-[#3498DB] font-medium">Course Creation Features</span>
                        </div>
                        <h2 className="text-4xl font-black text-[#FFD700] mb-6 max-md:text-3xl">
                            Create Engaging Courses
                        </h2>
                        <p className="text-white/80 text-lg mb-12">
                            Powerful tools to create and manage your courses
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            {courseFeatures.map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`card-luxury p-8 text-left ${
                                        feature.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                                    } group relative overflow-hidden`}
                                >
                                    <div className={`${
                                        feature.color === 'gold' 
                                            ? 'bg-gold/10 text-[#FFD700]' 
                                            : 'bg-amethyst/10 text-[#3498DB]'
                                    } p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center text-3xl
                                    transform group-hover:scale-110 transition-transform duration-500`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-4 ${
                                        feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/70 text-lg mb-4">
                                        {feature.description}
                                    </p>
                                    <div className={`absolute bottom-0 left-0 w-full p-4 ${
                                        feature.color === 'gold' ? 'bg-[#FFD700]/10' : 'bg-[#3498DB]/10'
                                    } backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}>
                                        <p className={`text-sm font-medium ${
                                            feature.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                        }`}>
                                            {feature.stats}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 px-4 py-2 rounded-full mb-6">
                            <FaRocket className="text-[#FFD700] animate-pulse" />
                            <span className="text-[#FFD700] font-medium">Key Benefits</span>
                        </div>
                        <h2 className="text-4xl font-black text-[#FFD700] mb-6 max-md:text-3xl">
                            Experience the Advantages
                        </h2>
                        <p className="text-white/80 text-lg mb-12">
                            Discover how our platform transforms your learning experience
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`card-luxury p-8 text-left ${
                                        benefit.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                                    } group relative overflow-hidden`}
                                >
                                    <div className={`${
                                        benefit.color === 'gold' 
                                            ? 'bg-gold/10 text-[#FFD700]' 
                                            : 'bg-amethyst/10 text-[#3498DB]'
                                    } p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center text-3xl
                                    transform group-hover:scale-110 transition-transform duration-500`}>
                                        {benefit.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-4 ${
                                        benefit.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    }`}>
                                        {benefit.title}
                                    </h3>
                                    <p className="text-white/70 text-lg mb-4">
                                        {benefit.description}
                                    </p>
                                    <div className={`absolute bottom-0 left-0 w-full p-4 ${
                                        benefit.color === 'gold' ? 'bg-[#FFD700]/10' : 'bg-[#3498DB]/10'
                                    } backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}>
                                        <p className={`text-sm font-medium ${
                                            benefit.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                        }`}>
                                            {benefit.stats}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="card-luxury p-12 max-w-3xl mx-auto hover-glow-gold">
                            <div className="bg-gold/10 w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                                <FaHeadset className="text-[#FFD700] text-4xl animate-float" />
                            </div>
                            <h2 className="text-4xl font-black text-[#FFD700] mb-6 max-md:text-3xl">
                                Ready to Get Started?
                            </h2>
                            <p className="text-white/80 text-xl mb-8">
                                Join thousands of learners who have already transformed their education journey
                            </p>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="btn-luxury px-10 py-4 rounded-xl text-lg font-medium animate-pulse-gold"
                                >
                                    Get Started Now
                                </button>
                                <button
                                    onClick={() => navigate('/pricing')}
                                    className="btn-neon px-10 py-4 rounded-xl text-lg font-medium"
                                >
                                    View Pricing
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Features;
