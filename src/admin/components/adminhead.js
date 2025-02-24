import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/colors.css';

const AdminHead = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        toast('Logout Successful', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        navigate('/signin');
    };

    return (
        <div className="bg-luxury/50 backdrop-blur-md border-b border-white/10">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Admin Info */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-[#FFD700]/10 p-3 rounded-xl">
                            <FaUserCircle className="text-[#FFD700] text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-[#FFD700] font-bold">
                                {sessionStorage.getItem('mName')}
                            </h2>
                            <p className="text-white/60 text-sm">
                                {sessionStorage.getItem('email')}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLogout}
                            className="btn-luxury px-6 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHead;