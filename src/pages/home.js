import React from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import UserCourses from '../components/usercourses';
import { FaGraduationCap, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/colors.css';

const Home = () => {
    const navigate = useNavigate();

    const redirectCreate = () => {
        navigate('/create');
    };

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={true} />
            
            {/* Main Content */}
            <div className="flex-1 relative mt-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                    {/* Animated Orbs */}
                    <div className="absolute w-full h-full overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-8">
                    {/* Dashboard Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block">
                            <div className="bg-[#FFD700]/10 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center transform hover:scale-110 transition-transform duration-500">
                                <FaGraduationCap className="text-[#FFD700] text-4xl" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-[#FFD700] mb-4">My Learning Dashboard</h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Track your progress and continue your learning journey with our AI-powered courses
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#FFD700]/10 p-4 rounded-xl">
                                    <FaGraduationCap className="text-[#FFD700] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg">Active Courses</h3>
                                    <p className="text-white/70">Continue learning</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#3498DB]/10 p-4 rounded-xl">
                                    <FaSearch className="text-[#3498DB] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#3498DB] font-bold text-lg">Discover</h3>
                                    <p className="text-white/70">Find new courses</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#FFD700]/10 p-4 rounded-xl">
                                    <FaGraduationCap className="text-[#FFD700] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg">Completed</h3>
                                    <p className="text-white/70">View certificates</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="card-luxury p-8 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#FFD700]">My Courses</h2>
                            <div className="flex space-x-4">
                                <button className="btn-luxury px-6 py-2 rounded-xl text-sm hover:scale-105 transition-transform duration-300">
                                    All Courses
                                </button>
                                <button 
                                    onClick={redirectCreate}
                                    className="btn-neon px-6 py-2 rounded-xl text-sm hover:scale-105 transition-transform duration-300"
                                >
                                    Generate New
                                </button>
                            </div>
                        </div>
                        <UserCourses userId={sessionStorage.getItem('uid')} />
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Home;
