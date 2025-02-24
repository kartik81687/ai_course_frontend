import React from 'react';
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import { RiRepeat2Fill } from "react-icons/ri";
import DonutChart from 'react-donut-chart';
import '../../styles/colors.css';

const DashboardCards = ({ datas }) => {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Users Card */}
                <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm mb-1">Users</p>
                            <h3 className="text-3xl font-black text-[#FFD700]">{datas.users}</h3>
                        </div>
                        <div className="bg-[#FFD700]/10 p-4 rounded-xl">
                            <FaUsers className="text-[#FFD700] text-2xl" />
                        </div>
                    </div>
                </div>

                {/* Courses Card */}
                <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm mb-1">Courses</p>
                            <h3 className="text-3xl font-black text-[#3498DB]">{datas.courses}</h3>
                        </div>
                        <div className="bg-[#3498DB]/10 p-4 rounded-xl">
                            <PiVideoFill className="text-[#3498DB] text-2xl" />
                        </div>
                    </div>
                </div>

                {/* Recurring Revenue Card */}
                <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm mb-1">Recurring Revenue</p>
                            <h3 className="text-3xl font-black text-[#FFD700]">${datas.sum}</h3>
                        </div>
                        <div className="bg-[#FFD700]/10 p-4 rounded-xl">
                            <RiRepeat2Fill className="text-[#FFD700] text-2xl" />
                        </div>
                    </div>
                </div>

                {/* Total Revenue Card */}
                <div className="card-luxury p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-black text-[#3498DB]">${datas.total}</h3>
                        </div>
                        <div className="bg-[#3498DB]/10 p-4 rounded-xl">
                            <FaDollarSign className="text-[#3498DB] text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Users Chart */}
                <div className="card-luxury p-6 rounded-xl">
                    <h2 className="text-2xl font-black text-[#FFD700] mb-6 text-center">User Distribution</h2>
                    <div className="flex justify-center">
                        <DonutChart
                            width={350}
                            height={300}
                            interactive={false}
                            colors={['#FFD700', '#3498DB']}
                            strokeColor="#1a1a1a"
                            data={[
                                {
                                    label: 'Paid Users',
                                    value: datas.paid,
                                },
                                {
                                    label: 'Free Users',
                                    value: datas.free,
                                },
                            ]}
                            legend={false}
                        />
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                            <span className="text-white/70">Paid Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#3498DB]"></div>
                            <span className="text-white/70">Free Users</span>
                        </div>
                    </div>
                </div>

                {/* Courses Chart */}
                <div className="card-luxury p-6 rounded-xl">
                    <h2 className="text-2xl font-black text-[#3498DB] mb-6 text-center">Course Types</h2>
                    <div className="flex justify-center">
                        <DonutChart
                            width={350}
                            height={300}
                            interactive={false}
                            colors={['#FFD700', '#3498DB']}
                            strokeColor="#1a1a1a"
                            data={[
                                {
                                    label: 'Text Courses',
                                    value: datas.courses - datas.videoType,
                                },
                                {
                                    label: 'Video Courses',
                                    value: datas.videoType,
                                },
                            ]}
                            legend={false}
                        />
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                            <span className="text-white/70">Text Courses</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#3498DB]"></div>
                            <span className="text-white/70">Video Courses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
