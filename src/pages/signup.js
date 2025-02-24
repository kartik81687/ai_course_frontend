import React, { useEffect, useState } from 'react';
import img from '../../src/res/img/signup.svg';
import { name, serverURL, websiteURL, facebookClientId } from '../constants';
import DarkModeToggle from '../components/DarkModeToggle';
import LogoComponent from '../components/LogoComponent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineLoading } from 'react-icons/ai';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from '@greatsumini/react-facebook-login';
import '../styles/colors.css';

const SignUp = () => {
    const storedTheme = sessionStorage.getItem('darkMode');
    const [mName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            navigate("/home");
        }
    }, [navigate]);

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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!mName || !email || !password) {
            showToast('Please fill in all required fields');
            return;
        } else if (password.length < 9) {
            showToast('Password should be at least 9 characters');
            return;
        }
        const postURL = serverURL + '/api/signup';
        const type = 'free';
        try {
            setProcessing(true);
            const response = await axios.post(postURL, { email, mName, password, type });
            if (response.data.success) {
                showToast(response.data.message);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('mName', mName);
                sessionStorage.setItem('auth', true);
                sessionStorage.setItem('uid', response.data.userId);
                sessionStorage.setItem('type', 'free');
                sendEmail(email, mName);
            } else {
                showToast(response.data.message);
            }
        } catch (error) {
            showToast('Internal Server Error');
        }
    };

    async function sendEmail(mEmail, mName) {
        try {
            const dataToSend = {
                subject: `Welcome to ${name}`,
                to: mEmail,
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Welcome to ${name}</h1>
                        <p style="color: #666;">Hello <strong>${mName}</strong>,</p>
                        <p style="color: #666;">Welcome to <strong>${name}</strong>! We're excited to have you join our community of learners. Get ready to explore our comprehensive AI courses and transform your learning journey.</p>
                        <div style="text-align: center; margin: 40px 0;">
                            <a href="${websiteURL}" style="background-color: #FFD700; color: #000; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold;">Get Started</a>
                        </div>
                        <p style="color: #666; margin-top: 30px;">Best regards,<br>The ${name} Team</p>
                    </div>
                </body>
                </html>`
            };
            const postURL = serverURL + '/api/data';
            await axios.post(postURL, dataToSend).then(res => {
                navigate("/home");
            }).catch(error => {
                navigate("/home");
            });
        } catch (error) {
            navigate("/home");
        }
    }

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
                            <h1 className="text-4xl font-black text-[#FFD700] text-center mb-2">Create Account</h1>
                            <p className="text-white/70 text-center mb-8">Join our community of learners</p>

                            <form onSubmit={handleSignup} className="space-y-6">
                                <div>
                                    <label className="text-[#FFD700] font-medium block mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={mName}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input-luxury w-full px-4 py-3 rounded-xl"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="text-[#FFD700] font-medium block mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-luxury w-full px-4 py-3 rounded-xl"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="text-[#FFD700] font-medium block mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-luxury w-full px-4 py-3 rounded-xl"
                                        placeholder="Enter your password (min. 9 characters)"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-luxury w-full py-3 rounded-xl flex items-center justify-center space-x-2"
                                >
                                    {processing ? (
                                        <AiOutlineLoading className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-luxury px-4 text-white/60">Or continue with</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <GoogleLogin
                                        theme="filled_black"
                                        size="large"
                                        width="100%"
                                        text="signup_with"
                                        shape="rectangular"
                                        onSuccess={async (credentialResponse) => {
                                            const decoded = jwtDecode(credentialResponse.credential);
                                            let email = decoded.email;
                                            let name = decoded.name;
                                            const postURL = serverURL + '/api/social';
                                            try {
                                                setProcessing(true);
                                                const response = await axios.post(postURL, { email, name });
                                                if (response.data.success) {
                                                    showToast(response.data.message);
                                                    sessionStorage.setItem('email', decoded.email);
                                                    sessionStorage.setItem('mName', decoded.name);
                                                    sessionStorage.setItem('auth', true);
                                                    sessionStorage.setItem('uid', response.data.userData._id);
                                                    sessionStorage.setItem('type', response.data.userData.type);
                                                    sendEmail(decoded.email, decoded.name);
                                                } else {
                                                    showToast(response.data.message);
                                                }
                                            } catch (error) {
                                                showToast('Internal Server Error');
                                            }
                                        }}
                                        onError={() => {
                                            showToast('Internal Server Error');
                                        }}
                                    />

                                    <FacebookLogin
                                        appId={facebookClientId}
                                        style={{
                                            backgroundColor: '#1a1a2e',
                                            color: '#FFD700',
                                            fontSize: '16px',
                                            padding: '12px 24px',
                                            width: '100%',
                                            border: '1px solid rgba(255, 215, 0, 0.2)',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onFail={(error) => {
                                            showToast('Internal Server Error');
                                        }}
                                        onProfileSuccess={async (response) => {
                                            let email = response.email;
                                            let name = response.name;
                                            const postURL = serverURL + '/api/social';
                                            try {
                                                setProcessing(true);
                                                const response = await axios.post(postURL, { email, name });
                                                if (response.data.success) {
                                                    showToast(response.data.message);
                                                    sessionStorage.setItem('email', email);
                                                    sessionStorage.setItem('mName', name);
                                                    sessionStorage.setItem('auth', true);
                                                    sessionStorage.setItem('uid', response.data.userData._id);
                                                    sessionStorage.setItem('type', response.data.userData.type);
                                                    sendEmail(email, name);
                                                } else {
                                                    showToast(response.data.message);
                                                }
                                            } catch (error) {
                                                showToast('Internal Server Error');
                                            }
                                        }}
                                    />
                                </div>

                                <p className="text-center text-white/60">
                                    Already have an account?{' '}
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
                            alt="Sign Up"
                            className="relative z-10 max-w-2xl w-full hover-glow-gold transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;