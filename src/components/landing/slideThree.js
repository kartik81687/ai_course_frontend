import React from "react";
import { FaKeyboard, FaRobot, FaVideo, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import '../../styles/colors.css';

const SlideThree = () => {
    const steps = [
        {
            icon: <FaKeyboard />,
            title: "Enter Course Title",
            description: "Simply input your desired course topic and let our AI handle the rest",
            color: "gold",
            delay: 0
        },
        {
            icon: <FaRobot />,
            title: "AI Magic Happens",
            description: "Our advanced AI generates comprehensive course content tailored to your needs",
            color: "neon",
            delay: 0.2
        },
        {
            icon: <FaVideo />,
            title: "Content Generation",
            description: "Get instant access to video lectures and detailed theory materials",
            color: "gold",
            delay: 0.4
        },
        {
            icon: <FaGraduationCap />,
            title: "Start Learning",
            description: "Begin your personalized learning journey with interactive content",
            color: "neon",
            delay: 0.6
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
                        <span className="text-gradient-gold">How It </span>
                        <span className="text-gradient-neon">Works</span>
                    </h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed max-md:text-lg">
                        Experience the future of learning in four simple steps
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: step.delay }}
                            className={`card-luxury p-8 text-center ${
                                step.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                            } group relative`}
                        >
                            {/* Step Number */}
                            <div className="absolute top-4 right-4 text-sm font-bold">
                                <span className={step.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'}>
                                    Step {index + 1}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className={`${
                                step.color === 'gold' 
                                    ? 'bg-[#FFD700]/10 text-[#FFD700]' 
                                    : 'bg-[#3498DB]/10 text-[#3498DB]'
                            } w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center
                            transform group-hover:scale-110 transition-transform duration-500`}>
                                <div className="text-4xl">{step.icon}</div>
                            </div>

                            {/* Content */}
                            <h3 className={`text-2xl font-bold mb-4 ${
                                step.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                            }`}>
                                {step.title}
                            </h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                {step.description}
                            </p>

                            {/* Progress Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <div className={`w-8 h-0.5 ${
                                        step.color === 'gold' ? 'bg-[#FFD700]/30' : 'bg-[#3498DB]/30'
                                    }`}></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideThree;
