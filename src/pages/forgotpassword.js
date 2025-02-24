import React, { useEffect, useState } from 'react';
import img from '../../src/res/img/forgot.svg';
import { name, serverURL, websiteURL } from '../constants';
import DarkModeToggle from '../components/DarkModeToggle';
import LogoComponent from '../components/LogoComponent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineLoading } from 'react-icons/ai';
import '../styles/colors.css';

const ForgotPassword = () => {
    const storedTheme = sessionStorage.getItem('darkMode');
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            navigate("/home");
        }

        let timer;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 1) {
                        clearInterval(timer);
                        setIsTimerRunning(false);
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isTimerRunning, navigate]);

    const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

    const showToast = async (msg) => {
        setProcessing(false);
        toast(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    const handleReset = async (e) => {
        e.preventDefault();
        if (!email) {
            showToast('Please fill in all required fields');
            return;
        }
        const postURL = serverURL + '/api/forgot';
        try {
            setProcessing(true);
            const response = await axios.post(postURL, { email });
            if (response.data.success) {
                showToast(response.data.message);
                setSeconds(60);
                setIsTimerRunning(true);
            } else {
                showToast(response.data.message);
            }
        } catch (error) {
            showToast('Internal Server Error');
        }
    };

    return (
        <div className="min-h-screen bg-luxury relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                {/* Animated Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                    <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Header */}
                <nav className="flex items-center justify-between py-8 relative z-10">
                    <a href={websiteURL} className="flex items-center space-x-3 group">
                        <div className="transform transition-transform group-hover:scale-110">
                            <LogoComponent isDarkMode={storedTheme} />
                        </div>
                        <span className="text-2xl font-black text-[#FFD700]">{name}</span>
                    </a>
                    <DarkModeToggle />
                </nav>

                <div className="flex min-h-[calc(100vh-120px)]">
                    {/* Form Section */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
                        <div className="card-luxury p-8 w-full max-w-md">
                            <h1 className="text-4xl font-black text-[#FFD700] text-center mb-2">Forgot Password</h1>
                            <p className="text-white/70 text-center mb-8">Enter your email to receive a reset link</p>

                            <form onSubmit={handleReset} className="space-y-6">
                                <div>
                                    <label className="text-[#FFD700] font-medium block mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-luxury w-full px-4 py-3 rounded-xl"
                                        placeholder="Enter your registered email"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isTimerRunning || processing}
                                    className="btn-luxury w-full py-3 rounded-xl flex items-center justify-center space-x-2"
                                >
                                    {processing ? (
                                        <AiOutlineLoading className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>

                                {isTimerRunning && (
                                    <p className="text-center text-white/70">
                                        Resend link in {formattedTime}
                                    </p>
                                )}

                                <p className="text-center text-white/60">
                                    Remember your password?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signin")}
                                        className="text-[#FFD700] hover:text-white/90 transition-colors font-medium"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="hidden lg:flex w-1/2 items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#3498DB]/20 rounded-3xl transform group-hover:scale-105 transition-transform duration-500 blur-xl"></div>
                        <img
                            src={img}
                            alt="Forgot Password"
                            className="relative z-10 max-w-2xl w-full hover-glow-gold transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;