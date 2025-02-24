import React, { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { FaUserCircle, FaEnvelope, FaCalendar, FaTrash } from 'react-icons/fa';
import AdminSidebar from './components/adminsidebar';
import AdminHead from './components/adminhead';
import AdminSidebarMobile from './components/adminsidebarmobile';
import { serverURL } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import '../styles/colors.css';

const Users = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/getusers`);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            showToast('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setProcessing(true);
            try {
                await axios.delete(`${serverURL}/api/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
                showToast('User deleted successfully');
            } catch (error) {
                showToast('Failed to delete user');
            }
            setProcessing(false);
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

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        (user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <h1 className="text-[#FFD700] text-xl font-black">Users Management</h1>
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
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#FFD700]/50"
                                />
                            </div>
                        </div>

                        {/* Users Table */}
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
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">User</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Email</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Join Date</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#FFD700]">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/10">
                                                {currentUsers.map((user) => (
                                                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="bg-[#FFD700]/10 p-2 rounded-lg">
                                                                    <FaUserCircle className="text-[#FFD700] text-xl" />
                                                                </div>
                                                                <span className="text-white/90">{user.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaEnvelope className="text-[#3498DB]" />
                                                                <span className="text-white/70">{user.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaCalendar className="text-[#FFD700]" />
                                                                <span className="text-white/70">
                                                                    {new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() => handleDelete(user._id)}
                                                                disabled={processing}
                                                                className="text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                                                            >
                                                                <FaTrash />
                                                            </button>
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

export default Users;
