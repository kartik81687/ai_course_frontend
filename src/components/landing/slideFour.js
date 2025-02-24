import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaCrown, FaRocket, FaShieldAlt, FaDownload, FaHeadset, FaGlobe, FaCode } from 'react-icons/fa';
import { motion } from "framer-motion";
import '../../styles/colors.css';

const SlideFour = () => {
    const navigate = useNavigate();

    const pricingPlans = [
        {
            name: "Monthly Plan",
            price: "$9",
            period: "/month",
            description: "Perfect for individual learners",
            features: [
                {
                    icon: <FaRocket />,
                    text: "Unlimited Course Generation"
                },
                {
                    icon: <FaCode />,
                    text: "Access to All Features"
                },
                {
                    icon: <FaHeadset />,
                    text: "24/7 Support Access"
                },
                {
                    icon: <FaGlobe />,
                    text: "Multiple Languages"
                }
            ],
            buttonText: "Start Monthly",
            isPopular: false,
            delay: 0.2
        },
        {
            name: "Yearly Plan",
            price: "$99",
            period: "/year",
            description: "Best value for committed learners",
            features: [
                {
                    icon: <FaCrown />,
                    text: "Everything in Monthly"
                },
                {
                    icon: <FaRocket />,
                    text: "2 Months Free"
                },
                {
                    icon: <FaHeadset />,
                    text: "Priority Support"
                },
                {
                    icon: <FaDownload />,
                    text: "Offline Downloads"
                }
            ],
            buttonText: "Start Yearly",
            isPopular: true,
            delay: 0.4
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
                        <span className="text-gradient-gold">Simple </span>
                        <span className="text-gradient-neon">Pricing</span>
                    </h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed max-md:text-lg">
                        Choose the perfect plan for your learning journey
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: plan.delay }}
                            className={`card-luxury p-8 relative ${plan.isPopular ? 'hover-glow-gold' : 'hover-glow-neon'} group`}
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
                                <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? 'text-[#FFD700]' : 'text-[#3498DB]'}`}>
                                    {plan.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-6">{plan.description}</p>
                                <div className="flex items-center justify-center mb-4">
                                    <span className={`text-6xl font-black ${plan.isPopular ? 'text-[#FFD700]' : 'text-[#3498DB]'}`}>
                                        {plan.price}
                                    </span>
                                    <span className="text-white/60 ml-2">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 group">
                                        <div className={`${
                                            plan.isPopular ? 'bg-[#FFD700]/10' : 'bg-[#3498DB]/10'
                                        } p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <div className={`${
                                                plan.isPopular ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                            }`}>
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <span className="text-white/80">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/pricing')}
                                className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-500 ${
                                    plan.isPopular 
                                        ? 'btn-luxury animate-pulse-gold' 
                                        : 'btn-neon'
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                        <div className="flex items-center gap-2 text-white/60">
                            <FaShieldAlt className="text-[#FFD700]" />
                            <span>30-Day Money Back</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                            <FaRocket className="text-[#3498DB]" />
                            <span>Cancel Anytime</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                            <FaHeadset className="text-[#FFD700]" />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                    <p className="text-white/40 text-sm">
                        All prices are in USD and include all applicable taxes
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SlideFour;
