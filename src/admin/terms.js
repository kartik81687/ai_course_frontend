import React, { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSave } from 'react-icons/fi';
import { FaFileContract } from 'react-icons/fa';
import AdminSidebar from './components/adminsidebar';
import AdminHead from './components/adminhead';
import AdminSidebarMobile from './components/adminsidebarmobile';
import { serverURL } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/colors.css';

const Terms = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [content, setContent] = useState(sessionStorage.getItem('terms') || '');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('darkMode', false);
    }, []);

    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
        adjustTextAreaHeight(e.target);
    };

    const adjustTextAreaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight) + 'px';
    };

    const showToast = (message) => {
        toast(message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const handleSave = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post(`${serverURL}/api/saveadmin`, {
                data: content,
                type: 'terms'
            });
            
            if (response.data.success) {
                sessionStorage.setItem('terms', content);
                showToast(response.data.message);
            }
        } catch (error) {
            showToast('Failed to save terms of service');
        }
        setIsProcessing(false);
    };

    return (
        <div className="min-h-screen bg-luxury">
            {/* Background Elements */}
            <div className="fixed inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                {/* Animated Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                    <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden relative z-10">
                <div className="bg-luxury/50 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center justify-between px-4 py-4">
                        <h1 className="text-[#FFD700] text-xl font-black">Terms of Service Management</h1>
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-white hover:text-[#FFD700] transition-colors"
                        >
                            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <AdminSidebarMobile isSidebarOpen={isSidebarOpen} />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex relative z-10">
                <div className="w-64 flex-shrink-0">
                    <AdminSidebar />
                </div>

                <div className="flex-1">
                    <AdminHead />
                    
                    {/* Main Content */}
                    <div className="p-6">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-[#FFD700]/10 p-3 rounded-xl">
                                    <FaFileContract className="text-[#FFD700] text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black text-[#FFD700]">
                                    Terms of Service Management
                                </h2>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={isProcessing}
                                className="btn-luxury px-6 py-2 rounded-xl flex items-center space-x-2 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <FiSave className="text-lg" />
                                <span>{isProcessing ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>

                        {/* Editor Card */}
                        <div className="card-luxury p-6 rounded-xl">
                            <div className="mb-4">
                                <p className="text-white/70">
                                    Edit your terms of service content below. Use HTML formatting for better presentation.
                                </p>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={content}
                                    onChange={handleTextAreaChange}
                                    placeholder="Enter your terms of service content in HTML format..."
                                    className="w-full min-h-[400px] bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700]/50 resize-none"
                                    style={{ fontFamily: 'monospace' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
