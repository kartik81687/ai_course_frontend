import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { serverURL } from '../constants';
import axios from 'axios';
import StyledText from '../components/styledText';
import '../styles/colors.css';

const TermsPolicy = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        async function dashboardData() {
            const postURL = serverURL + `/api/policies`;
            const response = await axios.get(postURL);
            setData(response.data[0].terms)
        }
        if (sessionStorage.getItem('TermsPolicy') === null && sessionStorage.getItem('PrivacyPolicy') === null) {
            dashboardData();
        } else {
            setData(sessionStorage.getItem('TermsPolicy'))
        }
    }, []);

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={false} />
            
            {/* Main Content */}
            <div className="flex-1 relative mt-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                    {/* Animated Orbs */}
                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                        <div className="absolute top-2/3 left-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-16">
                    <div className="card-luxury p-8 max-w-4xl mx-auto">
                        <h1 className="text-4xl font-black text-[#FFD700] text-center mb-8">
                            Terms of Service
                        </h1>
                        <div className="prose prose-lg prose-invert max-w-none">
                            <StyledText text={data} />
                        </div>
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default TermsPolicy;
