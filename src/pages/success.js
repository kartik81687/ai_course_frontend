import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../constants';
import axios from 'axios';
import { FaCheckCircle, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import '../styles/colors.css';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('uid') === null) {
            navigate("/signin");
            return;
        }
        updateSubscription();
    }, [navigate]);

    async function updateSubscription() {
        try {
            const response = await axios.post(serverURL + '/api/update-subscription', {
                userId: sessionStorage.getItem('uid'),
                planType: sessionStorage.getItem('type'),
                planPrice: sessionStorage.getItem('price')
            });

            if (response.data.success) {
                setTimeout(() => {
                    navigate('/home');
                }, 5000);
            } else {
                navigate('/failed');
            }
        } catch (error) {
            navigate('/failed');
        }
    }

    return (
        <div className="min-h-screen bg-luxury flex items-center justify-center relative overflow-hidden">
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

            {/* Success Content */}
            <div className="relative z-10">
                <div className="card-luxury p-12 max-w-lg mx-auto text-center rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                    {/* Success Icon */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#3498DB]/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-r from-[#FFD700] to-[#3498DB] w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                            <FaCheckCircle className="text-5xl text-white animate-pulse" />
                    </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl font-black text-[#FFD700] mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-white/70 text-lg mb-8">
                        Thank you for subscribing to our premium plan. Your payment has been processed successfully.
                    </p>

                    {/* Plan Details */}
                    <div className="bg-white/5 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <FaGraduationCap className="text-[#FFD700] text-3xl mr-3" />
                            <h2 className="text-xl font-bold text-white">Plan Details</h2>
                    </div>
                        <div className="space-y-2 text-white/70">
                            <p>Plan: {sessionStorage.getItem('type')}</p>
                            <p>Amount: ${sessionStorage.getItem('price')}</p>
                    </div>
                    </div>

                    {/* Redirect Message */}
                    <div className="text-white/60 flex items-center justify-center space-x-2">
                        <span>Redirecting to dashboard</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    </div>

                    {/* Manual Redirect Button */}
                    <button
                        onClick={() => navigate('/home')}
                        className="btn-luxury mt-8 py-3 px-6 rounded-xl flex items-center justify-center space-x-2 mx-auto hover:scale-105 transition-transform duration-300"
                    >
                        <span>Go to Dashboard</span>
                        <FaArrowRight className="text-sm" />
                    </button>
                        </div>
                </div>
        </div>
    );
};

export default Success;