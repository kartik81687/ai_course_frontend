import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaVideo, FaDollarSign, FaUserShield, FaAddressBook, FaFileContract, FaLock, FaBan, FaUndo, FaCreditCard } from 'react-icons/fa';
import '../../styles/colors.css';

const AdminSidebarMobile = ({ isSidebarOpen }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
        { path: '/admin/users', icon: FaUsers, label: 'Users' },
        { path: '/admin/courses', icon: FaVideo, label: 'Courses' },
        { path: '/admin/paid', icon: FaDollarSign, label: 'Paid Users' },
        { path: '/admin/admins', icon: FaUserShield, label: 'Admins' },
        { path: '/admin/contacts', icon: FaAddressBook, label: 'Contacts' },
        { path: '/admin/terms', icon: FaFileContract, label: 'Terms' },
        { path: '/admin/privacy', icon: FaLock, label: 'Privacy' },
        { path: '/admin/cancellation', icon: FaBan, label: 'Cancellation' },
        { path: '/admin/refund', icon: FaUndo, label: 'Refund' },
        { path: '/admin/billing', icon: FaCreditCard, label: 'Subscription & Billing' },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-luxury/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
            <div className="h-full flex flex-col">
                {/* Logo Section */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-[#FFD700] text-2xl font-black">Admin Panel</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-[#FFD700]/10 ${
                                        isActive(item.path)
                                            ? 'bg-[#FFD700]/10 text-[#FFD700]'
                                            : 'text-white/70 hover:text-[#FFD700]'
                                    }`}
                                >
                                    <Icon className={`text-xl ${
                                        isActive(item.path)
                                            ? 'text-[#FFD700]'
                                            : 'text-white/70 group-hover:text-[#FFD700]'
                                    }`} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                    <div className="text-center">
                        <p className="text-white/40 text-sm">
                            © {new Date().getFullYear()} Admin Panel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebarMobile;
