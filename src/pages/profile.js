import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { serverURL } from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaUserCog, FaCreditCard, FaDownload, FaTrash, FaShieldAlt } from 'react-icons/fa';
import '../styles/colors.css';

const Profile = () => {
    const [name, setName] = useState(sessionStorage.getItem('mName'));
    const email = sessionStorage.getItem('email');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('uid') === null) {
            navigate("/signin");
        }
    }, [navigate]);

    function redirectSubscription() {
        navigate("/manage");
    }

    async function deleteProfile() {
        const postURL = serverURL + '/api/deleteprofile';
        await axios.post(postURL, { email }).then(() => {
            sessionStorage.clear();
            showToast('Profile Deleted Successfully');
            redirectLogin();
        });
    }

    function redirectLogin() {
        navigate("/signin");
    }

    async function startDeletion() {
        const result = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
        if (result) {
            deleteProfile();
        }
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !password) {
            showToast('Please fill in all required fields');
            return;
        }
        if (password.length < 9) {
            showToast('Password should be at least 9 characters');
            return;
        }
        setProcessing(true);
        const postURL = serverURL + '/api/updateprofile';
        try {
            const response = await axios.post(postURL, { email, name, password });
            if (response.data.success) {
                sessionStorage.setItem('mName', name);
                showToast('Profile Updated Successfully');
            } else {
                showToast(response.data.message);
            }
        } catch (error) {
            showToast('Internal Server Error');
        }
    };

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={true} />
            
            <div className="flex-1 relative mt-24">
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

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Left Column - Profile Settings */}
                        <div className="w-full md:w-1/2">
                            <div className="card-luxury p-8 rounded-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-[#FFD700]">Profile Settings</h2>
                                    <FaUserCog className="text-2xl text-[#FFD700]" />
                                </div>
                                <p className="text-white/70 mb-8">Manage your account preferences</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="text-[#FFD700] font-medium block mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            className="input-luxury w-full px-4 py-3 rounded-xl"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[#FFD700] font-medium block mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="input-luxury w-full px-4 py-3 rounded-xl"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[#FFD700] font-medium block mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="input-luxury w-full px-4 py-3 rounded-xl"
                                            placeholder="Enter new password (min. 9 characters)"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-luxury w-full py-4 rounded-xl flex items-center justify-center space-x-2"
                                    >
                                        {processing ? (
                                            <AiOutlineLoading className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                <FaShieldAlt className="mr-2" />
                                                <span>Update Profile</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Actions */}
                        <div className="w-full md:w-1/2">
                            <div className="card-luxury p-8 rounded-2xl">
                                <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Account Actions</h2>
                                
                                <div className="space-y-4">
                                    <button
                                        onClick={redirectSubscription}
                                        className="btn-luxury w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaCreditCard className="text-2xl mr-3" />
                                            <span>Manage Subscription</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => window.open('https://github.com/peterflipsen/desktop-app/releases/download/v1.0.0/AiCourse.exe', '_blank')}
                                        className="btn-neon w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaDownload className="text-2xl mr-3" />
                                            <span>Download Desktop App</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={startDeletion}
                                        className="btn-luxury w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30"
                                    >
                                        <div className="flex items-center">
                                            <FaTrash className="text-2xl mr-3" />
                                            <span>Delete Account</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-8 p-6 bg-black/20 rounded-xl">
                                    <h3 className="text-[#FFD700] font-medium mb-2">Security Notice</h3>
                                    <p className="text-white/60 text-sm">
                                        Keep your account secure by using a strong password and regularly updating your credentials. Never share your login information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Profile;
