import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { FreeType, FreeCost, FreeTime, MonthType, MonthTime, MonthCost, YearType, YearCost, YearTime } from '../constants';
import { FaInfinity, FaStar, FaCheck, FaRocket, FaCrown, FaGem, FaShieldAlt, FaHeadset, FaGlobe } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/colors.css';

const Pricing = () => {
    const { state } = useLocation();
    const { header } = state || false;
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);

    const pricingPlans = [
        {
            name: FreeType,
            price: FreeCost,
            period: FreeTime,
            icon: <FaRocket />,
            description: "Perfect for getting started",
            features: [
                "Generate 5 Sub-Topics",
                "Create Unlimited Course",
                "Video & Theory Course",
                "Lifetime access",
                "Theory & Image Course",
                "Course In 23+ Languages",
                "Ai Teacher Chat"
            ],
            isPopular: false,
            color: 'neon'
        },
        {
            name: MonthType,
            price: MonthCost,
            period: `/${MonthTime}`,
            icon: <FaCrown />,
            description: "Most popular choice",
            features: [
                "Generate 10 Sub-Topics",
                "Create Unlimited Course",
                "Video & Theory Course",
                "1 Month Access",
                "Theory & Image Course",
                "Course In 23+ Languages",
                "Ai Teacher Chat"
            ],
            isPopular: true,
            color: 'gold'
        },
        {
            name: YearType,
            price: YearCost,
            period: `/${YearTime}`,
            icon: <FaGem />,
            description: "Best value for money",
            features: [
                "Generate 10 Sub-Topics",
                "Create Unlimited Course",
                "Video & Theory Course",
                "1 Year Access",
                "Theory & Image Course",
                "Course In 23+ Languages",
                "Ai Teacher Chat"
            ],
            isPopular: false,
            color: 'neon'
        }
    ];

    const benefits = [
        {
            icon: <FaInfinity />,
            title: "Flexible Pricing",
            description: "Tailor costs to usage needs for optimal budgeting flexibility",
            color: "gold"
        },
        {
            icon: <FaStar />,
            title: "Upgrade Anytime",
            description: "Seamlessly scale plans to match evolving requirements at any moment",
            color: "neon"
        },
        {
            icon: <GiCancel />,
            title: "Cancel Anytime",
            description: "Terminate subscription anytime, providing ultimate flexibility and user control",
            color: "gold"
        }
    ];

    const faqs = [
        { 
            question: 'What is our cancellation policy?', 
            answer: <p>You can read our cancellation policy <span className='text-[#FFD700] cursor-pointer' onClick={() => navigate("/cancellation")}>here</span></p> 
        },
        { 
            question: 'What is our refund policy?', 
            answer: <p>You can read our refund policy <span className='text-[#FFD700] cursor-pointer' onClick={() => navigate("/refund")}>here</span></p> 
        },
        { 
            question: 'What is our subscription and billing policy?', 
            answer: <p>You can read our subscription and billing policy <span className='text-[#FFD700] cursor-pointer' onClick={() => navigate("/billing")}>here</span></p> 
        },
        { 
            question: 'What are the available payment gateways?', 
            answer: 'Our platform supports multiple payment gateways, including PayPal, and Razorpay.' 
        }
    ];

    const [expandedItem, setExpandedItem] = useState(null);

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={header} />
            
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
                        <h1 className="text-6xl font-black mb-6 max-md:text-4xl">
                            <span className="text-gradient-gold">Premium </span>
                            <span className="text-white">Pricing</span>
                        </h1>
                        <p className="text-white/80 text-xl max-w-2xl mx-auto">
                            Choose the Perfect Plan for Your Learning Journey
                        </p>
                    </motion.div>

                    {/* Pricing Plans Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
                        {pricingPlans.map((plan, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`card-luxury p-8 relative ${
                                    plan.isPopular ? 'hover-glow-gold transform hover:scale-105' : 'hover-glow-neon'
                                } transition-all duration-500`}
                                onMouseEnter={() => setSelectedPlan(index)}
                                onMouseLeave={() => setSelectedPlan(null)}
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-4 right-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#FFD700] blur-sm opacity-50"></div>
                                            <span className="relative bg-[#FFD700] text-luxury px-4 py-1 rounded-full text-sm font-bold">
                                                Most Popular
                                            </span>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <div className={`${
                                        plan.color === 'gold' 
                                            ? 'bg-[#FFD700]/10 text-[#FFD700]' 
                                            : 'bg-[#3498DB]/10 text-[#3498DB]'
                                    } w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl
                                    transform group-hover:scale-110 transition-transform duration-500`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-2 ${
                                        plan.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    }`}>
                                        {plan.name}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-6">{plan.description}</p>
                                    <div className="flex items-center justify-center">
                                        <span className="text-white/60 mr-1">$</span>
                                        <span className={`text-6xl font-black ${
                                            plan.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                        }`}>
                                            {plan.price}
                                        </span>
                                        <span className="text-white/60 ml-2">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 group">
                                            <div className={`${
                                                plan.color === 'gold' ? 'bg-[#FFD700]/10' : 'bg-[#3498DB]/10'
                                            } p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <FaCheck className={`${
                                                    plan.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                                }`} />
                                            </div>
                                            <span className="text-white/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/payment', { state: { plan: plan.name } })}
                                    className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-500 ${
                                        plan.color === 'gold' 
                                            ? 'btn-luxury animate-pulse-gold' 
                                            : 'btn-neon'
                                    }`}
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Benefits Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl font-black text-[#FFD700] mb-6 max-md:text-3xl">
                            Premium Benefits
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            {benefits.map((benefit, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className={`card-luxury p-8 text-left ${
                                        benefit.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                                    } group`}
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
                                    <p className="text-white/70 text-lg">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl font-black text-[#FFD700] mb-12 max-md:text-3xl">
                            Frequently Asked Questions
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            {faqs.map((faq, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="mb-6"
                                >
                                    <button
                                        onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                                        className="w-full text-left p-6 card-luxury hover-glow-gold flex justify-between items-center group"
                                    >
                                        <span className="text-white/90 text-lg font-medium group-hover:text-[#FFD700] transition-colors">
                                            {faq.question}
                                        </span>
                                        <span className={`text-[#FFD700] transition-transform duration-300 ${
                                            expandedItem === index ? 'rotate-180' : ''
                                        }`}>▼</span>
                                    </button>
                                    {expandedItem === index && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-2 p-6 card-luxury bg-opacity-50"
                                        >
                                            <div className="text-white/70 text-lg">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Section */}
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
                                Still have questions?
                            </h2>
                            <p className="text-white/80 text-xl mb-8">
                                Our support team is here to help you make the right choice for your needs.
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="btn-luxury px-10 py-4 rounded-xl text-lg font-medium animate-pulse-gold"
                            >
                                Contact Support
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Pricing;
