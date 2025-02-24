import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import '../../styles/colors.css';

const SlideSeven = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-luxury py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="card-luxury p-12 text-center max-w-4xl mx-auto hover-glow-gold">
                    {/* Icon */}
                    <div className="bg-gold/10 w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                        <FaRocket className="text-[#FFD700] text-4xl animate-float" />
                    </div>

                    {/* Title */}
                    <h2 className="text-5xl font-black text-[#FFD700] mb-6 max-md:text-3xl">
                        Ready to Transform Your Learning?
                    </h2>

                    {/* Description */}
                    <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of learners who have already revolutionized their education journey with our AI-powered platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-luxury px-10 py-4 rounded-xl text-lg font-medium animate-pulse-gold"
                        >
                            Get Started Now
                        </button>
                        <button
                            onClick={() => navigate('/features')}
                            className="btn-neon px-10 py-4 rounded-xl text-lg font-medium"
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 pt-12 border-t border-white/10">
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <h4 className="text-[#FFD700] text-4xl font-bold mb-2">10K+</h4>
                                <p className="text-white/60">Active Learners</p>
                            </div>
                            <div>
                                <h4 className="text-[#FFD700] text-4xl font-bold mb-2">23+</h4>
                                <p className="text-white/60">Languages</p>
                            </div>
                            <div>
                                <h4 className="text-[#FFD700] text-4xl font-bold mb-2">98%</h4>
                                <p className="text-white/60">Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideSeven; 