import React, { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { FaBook, FaVideo, FaUser, FaCalendar } from 'react-icons/fa';
import AdminSidebar from './components/adminsidebar';
import AdminHead from './components/adminhead';
import AdminSidebarMobile from './components/adminsidebarmobile';
import { serverURL } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import '../styles/colors.css';

const Courses = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);

    useEffect(() => {
        sessionStorage.setItem('darkMode', false);
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/getcourses`);
            // Transform the data to include formatted dates and ensure all fields exist
            const transformedCourses = response.data.map(course => ({
                ...course,
                type: course.type || 'N/A',
                mainTopic: course.mainTopic || 'N/A',
                // Extract timestamp from MongoDB ObjectId
                createdDate: new Date(parseInt(course._id.substring(0, 8), 16) * 1000)
            }));
            setCourses(transformedCourses);
            setLoading(false);
        } catch (error) {
            showToast('Failed to fetch courses');
            setLoading(false);
        }
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

    // Filter courses based on search term
    const filteredCourses = courses.filter(course =>
        (course?.mainTopic?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (course?.type?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Format date to a readable string
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                        <h1 className="text-[#FFD700] text-xl font-black">Courses</h1>
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
                        {/* Search Bar */}
                        <div className="card-luxury p-4 mb-6 rounded-xl">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#FFD700]/50"
                                />
                            </div>
                        </div>

                        {/* Courses Table */}
                        <div className="card-luxury rounded-xl overflow-hidden">
                            {loading ? (
                                <div className="flex items-center justify-center p-8">
                                    <Spinner size="xl" className="fill-[#FFD700]" />
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-white/5">
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Course Title</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Type</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">User ID</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Created Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/10">
                                                {currentCourses.map((course) => (
                                                    <tr key={course._id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="bg-[#FFD700]/10 p-2 rounded-lg">
                                                                    <FaBook className="text-[#FFD700] text-xl" />
                                                                </div>
                                                                <span className="text-white/90">{course.mainTopic}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaVideo className="text-[#3498DB]" />
                                                                <span className="text-white/70">{course.type}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaUser className="text-[#FFD700]" />
                                                                <span className="text-white/70">{course.user}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaCalendar className="text-[#3498DB]" />
                                                                <span className="text-white/70">
                                                                    {formatDate(course.createdDate)}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center space-x-2 p-4 border-t border-white/10">
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                                                        currentPage === index + 1
                                                            ? 'bg-[#FFD700] text-black font-medium'
                                                            : 'text-white/70 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
