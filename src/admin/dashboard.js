import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import AdminSidebar from './components/adminsidebar';
import AdminHead from './components/adminhead';
import AdminSidebarMobile from './components/adminsidebarmobile';
import DashboardCards from './components/dashboardcards';
import { serverURL } from '../constants';
import axios from 'axios';
import '../styles/colors.css';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        sessionStorage.setItem('darkMode', false);
        async function dashboardData() {
            const postURL = serverURL + `/api/dashboard`;
            const response = await axios.post(postURL);
            setData(response.data)
            sessionStorage.setItem('terms', response.data.admin.terms)
            sessionStorage.setItem('privacy', response.data.admin.privacy)
            sessionStorage.setItem('cancel', response.data.admin.cancel)
            sessionStorage.setItem('refund', response.data.admin.refund)
            sessionStorage.setItem('billing', response.data.admin.billing)
        }
        dashboardData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                    <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden relative z-10">
                {/* Mobile Header */}
                <div className="bg-luxury/50 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center justify-between px-4 py-4">
                        <h1 className="text-[#FFD700] text-xl font-black">Admin Panel</h1>
                        <button 
                            onClick={toggleSidebar}
                            className="text-white hover:text-[#FFD700] transition-colors"
                        >
                            {isSidebarOpen ? (
                                <FiX size={24} />
                            ) : (
                                <FiMenu size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Mobile Content */}
                <div className="relative">
                    <AdminSidebarMobile isSidebarOpen={isSidebarOpen} />
                    <div className="p-4">
                        <DashboardCards datas={data} />
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex relative z-10">
                {/* Desktop Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <AdminSidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-h-screen">
                    <div className="sticky top-0 z-20">
                        <AdminHead />
                    </div>
                    <div className="p-6">
                        <DashboardCards datas={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
