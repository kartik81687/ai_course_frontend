import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import '../styles/colors.css';

const Failed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('uid') === null) {
            navigate("/signin");
            return;
        }
        // Auto-redirect after 10 seconds
        const timer = setTimeout(() => {
            navigate('/payment');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

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
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
                </div>
            </div>

            {/* Failed Content */}
            <div className="relative z-10">
                <div className="card-luxury p-12 max-w-lg mx-auto text-center rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                    {/* Failed Icon */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-[#3498DB]/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-red-600 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                            <FaTimesCircle className="text-5xl text-white animate-pulse" />
                        </div>
                    </div>

                    {/* Failed Message */}
                    <h1 className="text-4xl font-black text-red-500 mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-white/70 text-lg mb-8">
                        We couldn't process your payment. Don't worry, no charges were made to your account.
                    </p>

                    {/* Payment Details */}
                    <div className="bg-white/5 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <FaCreditCard className="text-red-500 text-3xl mr-3" />
                            <h2 className="text-xl font-bold text-white">Payment Details</h2>
                        </div>
                        <div className="space-y-2 text-white/70">
                            <p>Plan: {sessionStorage.getItem('type')}</p>
                            <p>Amount: ${sessionStorage.getItem('price')}</p>
                        </div>
                    </div>

                    {/* Common Issues */}
                    <div className="bg-red-500/5 rounded-xl p-6 mb-8">
                        <h3 className="text-lg font-semibold text-red-500 mb-4">Common Issues:</h3>
                        <ul className="text-white/70 text-left space-y-2">
                            <li>• Insufficient funds</li>
                            <li>• Card declined by bank</li>
                            <li>• Incorrect card information</li>
                            <li>• Network connectivity issues</li>
                        </ul>
                    </div>

                    {/* Redirect Message */}
                    <div className="text-white/60 flex items-center justify-center space-x-2">
                        <span>Redirecting to payment page</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>

                    {/* Manual Redirect Button */}
                    <button
                        onClick={() => navigate('/payment')}
                        className="btn-luxury mt-8 py-3 px-6 rounded-xl flex items-center justify-center space-x-2 mx-auto hover:scale-105 transition-transform duration-300 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Return to Payment</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Failed;