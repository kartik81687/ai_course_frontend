import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { serverURL } from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCrown, FaRegClock, FaCreditCard, FaHistory, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import '../styles/colors.css';

const Manage = () => {
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('uid') === null) {
            navigate("/signin");
            return;
        }
        fetchSubscriptionData();
    }, [navigate]);

    const fetchSubscriptionData = async () => {
        try {
            const response = await axios.post(serverURL + '/api/subscription', {
                userId: sessionStorage.getItem('uid')
            });
            setSubscriptionData(response.data);
            setLoading(false);
        } catch (error) {
            showToast('Error fetching subscription data');
            setLoading(false);
        }
    };

    const showToast = (msg) => {
        toast(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const handleCancelSubscription = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel your subscription?");
        if (confirmed) {
            try {
                const response = await axios.post(serverURL + '/api/cancel-subscription', {
                    userId: sessionStorage.getItem('uid')
                });
                if (response.data.success) {
                    showToast('Subscription cancelled successfully');
                    fetchSubscriptionData();
                } else {
                    showToast('Failed to cancel subscription');
                }
            } catch (error) {
                showToast('Error cancelling subscription');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={true} />
            
            <div className="flex-1 relative mt-24">
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#3498DB]/5"></div>
                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 relative z-10">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block p-3 rounded-2xl bg-gradient-to-r from-[#FFD700]/10 to-[#3498DB]/10 backdrop-blur-sm mb-6">
                            <FaCrown className="text-4xl text-[#FFD700] animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-black text-[#FFD700] mb-3">Manage Subscription</h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            View and manage your subscription details and payment information
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Left Column - Subscription Details */}
                        <div className="w-full md:w-2/3">
                            <div className="card-luxury p-8 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                                            Subscription Details
                                        </h2>
                                        <p className="text-white/70 mt-2">Current plan information and status</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFD700]/10 to-[#3498DB]/10">
                                        <FaCreditCard className="text-2xl text-[#FFD700]" />
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
                                    </div>
                                ) : subscriptionData ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                            <div className="flex items-center">
                                                <FaCrown className="text-[#FFD700] text-xl mr-3" />
                                                <div>
                                                    <h3 className="text-white font-medium">Plan Type</h3>
                                                    <p className="text-[#FFD700]">{subscriptionData.planType || 'Premium Plan'}</p>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1 rounded-full ${subscriptionData.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {subscriptionData.status === 'active' ? 'Active' : 'Inactive'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-white/5">
                                                <div className="flex items-center mb-2">
                                                    <FaRegClock className="text-[#FFD700] mr-2" />
                                                    <h3 className="text-white font-medium">Start Date</h3>
                                                </div>
                                                <p className="text-white/70">{formatDate(subscriptionData.startDate)}</p>
                                            </div>

                                            <div className="p-4 rounded-xl bg-white/5">
                                                <div className="flex items-center mb-2">
                                                    <FaHistory className="text-[#FFD700] mr-2" />
                                                    <h3 className="text-white font-medium">Next Billing</h3>
                                                </div>
                                                <p className="text-white/70">{formatDate(subscriptionData.nextBilling)}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-8">
                                            <button
                                                onClick={handleCancelSubscription}
                                                className="btn-luxury py-3 px-6 rounded-xl flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30"
                                            >
                                                <FaTimesCircle className="text-lg" />
                                                <span>Cancel Subscription</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FaInfoCircle className="text-4xl text-[#FFD700] mx-auto mb-4" />
                                        <p className="text-white/70">No active subscription found</p>
                                        <button
                                            onClick={() => navigate('/pricing')}
                                            className="btn-luxury mt-4 py-3 px-6 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                                        >
                                            View Plans
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Payment Security */}
                        <div className="w-full md:w-1/3">
                            <div className="card-luxury p-8 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                                        Payment Security
                                    </h2>
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFD700]/10 to-[#3498DB]/10">
                                        <FaShieldAlt className="text-2xl text-[#FFD700]" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <div className="flex items-center mb-3">
                                            <FaCheckCircle className="text-green-400 mr-3" />
                                            <p className="text-white">Secure Payment Processing</p>
                                        </div>
                                        <p className="text-white/60 text-sm ml-8">
                                            All transactions are encrypted and secure
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5">
                                        <div className="flex items-center mb-3">
                                            <FaCheckCircle className="text-green-400 mr-3" />
                                            <p className="text-white">Automatic Billing</p>
                                        </div>
                                        <p className="text-white/60 text-sm ml-8">
                                            Hassle-free automatic payments
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5">
                                        <div className="flex items-center mb-3">
                                            <FaCheckCircle className="text-green-400 mr-3" />
                                            <p className="text-white">Cancel Anytime</p>
                                        </div>
                                        <p className="text-white/60 text-sm ml-8">
                                            No long-term commitments required
                                        </p>
                                    </div>
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

export default Manage;
