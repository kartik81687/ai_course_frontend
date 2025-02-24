import React from 'react';
import { FaStar, FaQuoteLeft, FaGraduationCap, FaCode, FaBriefcase, FaLinkedin } from 'react-icons/fa';
import { motion } from "framer-motion";
import '../../styles/colors.css';

const SlideSix = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Data Science Student",
            company: "Stanford University",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            quote: "The AI-powered course generation has revolutionized my learning journey. The personalized content and adaptive learning path have significantly improved my understanding of complex data science concepts.",
            rating: 5,
            field: "Data Science",
            linkedin: "#",
            color: "gold",
            delay: 0.2
        },
        {
            name: "Michael Chen",
            role: "Senior Developer",
            company: "Google",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            quote: "As a professional developer, finding quality learning resources was always challenging. This platform has made it incredibly easy to upskill in new technologies and stay ahead in my career.",
            rating: 5,
            field: "Software Development",
            linkedin: "#",
            color: "neon",
            delay: 0.4
        },
        {
            name: "Emma Davis",
            role: "Marketing Director",
            company: "Tesla",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            quote: "The multi-language support is fantastic! I can learn complex marketing strategies in my native language while still accessing global content. The AI teacher chat provides instant clarification.",
            rating: 5,
            field: "Digital Marketing",
            linkedin: "#",
            color: "gold",
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
                        <span className="text-gradient-gold">Success </span>
                        <span className="text-gradient-neon">Stories</span>
                    </h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed max-md:text-lg">
                        Hear from our learners who have transformed their careers through our platform
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: testimonial.delay }}
                            className={`card-luxury p-8 ${
                                testimonial.color === 'gold' ? 'hover-glow-gold' : 'hover-glow-neon'
                            } group relative`}
                        >
                            {/* Quote Icon */}
                            <div className={`${
                                testimonial.color === 'gold' 
                                    ? 'bg-[#FFD700]/10 text-[#FFD700]' 
                                    : 'bg-[#3498DB]/10 text-[#3498DB]'
                            } w-12 h-12 rounded-xl flex items-center justify-center mb-6
                            transform group-hover:scale-110 transition-transform duration-500`}>
                                <FaQuoteLeft className="text-xl" />
                            </div>

                            {/* Rating */}
                            <div className="flex mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className={`${
                                        testimonial.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    } text-lg`} />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="mb-6">
                                <p className="text-white/80 text-lg italic leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-start space-x-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-xl object-cover"
                                />
                                <div>
                                    <h4 className={`font-bold ${
                                        testimonial.color === 'gold' ? 'text-[#FFD700]' : 'text-[#3498DB]'
                                    }`}>
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                                    <p className="text-white/40 text-sm">{testimonial.company}</p>
                                    <div className="flex items-center mt-2 space-x-3">
                                        {testimonial.field === 'Data Science' && (
                                            <FaGraduationCap className="text-white/40" />
                                        )}
                                        {testimonial.field === 'Software Development' && (
                                            <FaCode className="text-white/40" />
                                        )}
                                        {testimonial.field === 'Digital Marketing' && (
                                            <FaBriefcase className="text-white/40" />
                                        )}
                                        <span className="text-white/40 text-sm">{testimonial.field}</span>
                                    </div>
                                </div>
                            </div>

                            {/* LinkedIn Link */}
                            <a
                                href={testimonial.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`absolute top-6 right-6 ${
                                    testimonial.color === 'gold' 
                                        ? 'text-[#FFD700] hover:text-[#FFD700]/80' 
                                        : 'text-[#3498DB] hover:text-[#3498DB]/80'
                                } transition-colors`}
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="card-luxury p-6 hover-glow-gold">
                            <div className="text-4xl font-black text-[#FFD700] mb-2">98%</div>
                            <div className="text-white/60">Satisfaction Rate</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-neon">
                            <div className="text-4xl font-black text-[#3498DB] mb-2">1.2K+</div>
                            <div className="text-white/60">Success Stories</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-gold">
                            <div className="text-4xl font-black text-[#FFD700] mb-2">45+</div>
                            <div className="text-white/60">Countries</div>
                        </div>
                        <div className="card-luxury p-6 hover-glow-neon">
                            <div className="text-4xl font-black text-[#3498DB] mb-2">4.9/5</div>
                            <div className="text-white/60">Average Rating</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SlideSix;
