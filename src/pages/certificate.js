import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { Button } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import Logos from '../res/img/certificate.png';
import logo from '../res/img/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toPng } from 'html-to-image';
import { name } from '../constants';
import { FaGraduationCap, FaDownload, FaShare } from 'react-icons/fa';
import '../styles/colors.css';

const Certificate = () => {
    const [processing, setProcessing] = useState(false);
    const userName = sessionStorage.getItem('mName');
    const { state } = useLocation();
    const navigate = useNavigate();
    const { courseTitle, end } = state || {};
    const [showShareOptions, setShowShareOptions] = useState(false);

    const pdfRef = useRef(null);

    const handleDownload = async () => {
        setProcessing(true);
        toPng(pdfRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "certificate.png";
                link.href = dataUrl;
                link.click();
                showToast("Certificate downloaded successfully! 🎉")
            })
            .catch((err) => {
                showToast("Failed to download certificate. Please try again.");
            });
    };

    useEffect(() => {
        if (!courseTitle) {
            navigate("/create");
        }
    }, []);

    function isValidFormat(dateString) {
        // Regex to check if date is in M/D/YY format
        const regex = /^([1-9]|1[0-2])\/([1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;
        return regex.test(dateString);
    }

    function formatDateToMDYY(date) {
        // Create a Date object from the ISO string
        const dateObj = new Date(date);

        // Handle invalid date scenarios
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date");
        }

        // Format the date to M/D/YY
        const month = dateObj.getMonth() + 1; // No leading zero
        const day = dateObj.getDate();
        const year = dateObj.getFullYear().toString().slice(-2); // Last two digits of the year

        return `${month}/${day}/${year}`;
    }

    function checkAndFormatDate(dateString) {
        if (isValidFormat(dateString)) {
            return dateString; // Already in M/D/YY format
        } else {
            // Assume input is in ISO 8601 format if not already valid
            return formatDateToMDYY(dateString);
        }
    }

    const showToast = async (msg) => {
        setProcessing(false);
        toast(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900'>
            <Header isHome={true} className="sticky top-0 z-50" />
            
            {/* Animated background elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </div>

            <div className='flex-1 relative z-10'>
                <div className='container mx-auto px-4 py-12'>
                    <div className='text-center space-y-6 mb-12'>
                        <div className="flex justify-center mb-8">
                            <FaGraduationCap className="text-6xl text-[#FFD700]" />
                        </div>
                        <h1 className='text-5xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]'>
                            Congratulations! 🎉
                        </h1>
                        <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                            <strong className="text-[#FFD700]">{userName}</strong>, you've successfully completed<br/>
                            <strong className="text-[#FFD700]">{courseTitle}</strong>
                        </p>
                        
                        <div className="flex justify-center gap-4 mt-8">
                            <Button
                                onClick={handleDownload}
                                isProcessing={processing}
                                processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                                className='btn-luxury flex items-center gap-2 px-6 py-3 rounded-xl'
                            >
                                <FaDownload className="text-xl" />
                                <span>Download Certificate</span>
                            </Button>
                            
                            <Button
                                onClick={() => setShowShareOptions(!showShareOptions)}
                                className='btn-luxury-secondary flex items-center gap-2 px-6 py-3 rounded-xl'
                            >
                                <FaShare className="text-xl" />
                                <span>Share</span>
                            </Button>
                        </div>
                    </div>

                    <div className='relative max-w-4xl mx-auto backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10'>
                        <div ref={pdfRef} className="relative">
                            <img src={Logos} alt="Certificate background" className="w-full h-auto" />
                            <p className='absolute text-4xl font-black italic text-center w-full max-lg:text-2xl max-md:text-xl'
                               style={{ top: '47%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                {sessionStorage.getItem('mName')}
                            </p>
                            <p className='absolute text-xl font-medium text-center w-full max-lg:text-lg max-md:text-[9px]'
                               style={{ top: '67.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                on {checkAndFormatDate(end)}
                            </p>
                            <div className='absolute w-full text-center'
                                 style={{ top: '63%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <p className='text-xl font-bold capitalize max-lg:text-lg max-md:text-[9px]'>
                                    {courseTitle}
                                </p>
                            </div>
                            <div className='absolute w-full text-center'
                                 style={{ top: '83%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <img src={logo} alt={name} className="w-[15%] h-[15%] mx-auto" />
                                <p className='text-xl font-semibold max-lg:text-lg max-md:text-xs mt-2'>
                                    {name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footers className="sticky bottom-0 z-50" />
        </div>
    );
};

export default Certificate;