import React, { useEffect, useState } from 'react';
import img from '../../src/res/img/signin.svg';
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

const SignIn = () => {
    const storedTheme = sessionStorage.getItem('darkMode');
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [password, setPassword] = useState('');
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

    const handleSignin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast('Please fill in all required fields');
            return;
        }
        const postURL = serverURL + '/api/signin';
        try {
            setProcessing(true);
            const response = await axios.post(postURL, { email, password });
            if (response.data.success) {
                showToast(response.data.message);
                sessionStorage.setItem('email', response.data.userData.email);
                sessionStorage.setItem('mName', response.data.userData.mName);
                sessionStorage.setItem('auth', true);
                sessionStorage.setItem('uid', response.data.userData._id);
                sessionStorage.setItem('type', response.data.userData.type);
                if (sessionStorage.getItem('shared') === null) {
                    navigate("/home");
                } else {
                    getDataFromDatabase(sessionStorage.getItem('shared'));
                }
            } else {
                showToast(response.data.message);
            }
        } catch (error) {
            showToast('Internal Server Error');
        }
    };

    async function getDataFromDatabase(id) {
        const postURL = serverURL + `/api/shareable?id=${id}`;
        try {
            const response = await axios.get(postURL);
            const dat = response.data[0].content;
            const jsonData = JSON.parse(dat);
            let type = response.data[0].type.toLowerCase();
            let mainTopic = response.data[0].mainTopic;
            const user = sessionStorage.getItem('uid');
            const content = JSON.stringify(jsonData);

            const postURLs = serverURL + '/api/courseshared';
            const responses = await axios.post(postURLs, { user, content, type, mainTopic });
            if (responses.data.success) {
                sessionStorage.removeItem('shared');
                navigate("/home");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
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
                            <h1 className="text-4xl font-black text-[#FFD700] text-center mb-2">Welcome Back</h1>
                            <p className="text-white/70 text-center mb-8">Enter your credentials to continue</p>

                            <form onSubmit={handleSignin} className="space-y-6">
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
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/forgot")}
                                        className="text-[#FFD700] hover:text-white/90 transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-luxury w-full py-3 rounded-xl flex items-center justify-center space-x-2"
                                >
                                    {processing ? (
                                        <AiOutlineLoading className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Sign In"
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
                                        text="signin_with"
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
                                                    navigate("/home");
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
                                                    navigate("/home");
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
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signup")}
                                        className="text-[#FFD700] hover:text-white/90 transition-colors font-medium"
                                    >
                                        Sign Up
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
                            alt="Sign In"
                            className="relative z-10 max-w-2xl w-full hover-glow-gold transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;