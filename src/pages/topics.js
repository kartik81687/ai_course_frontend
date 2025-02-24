import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import { serverURL } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/colors.css';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const Topics = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const { jsonData, mainTopic, type, lang } = location.state || {};

    useEffect(() => {
        if (!jsonData || !mainTopic || !type) {
            redirectCreate();
        }
    }, [jsonData, mainTopic, type]);

    function redirectCreate() {
        navigate("/create");
    }

    const showToast = async (msg) => {
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

    function redirectCourse() {
        const mainTopicData = jsonData[mainTopic][0];
        const firstSubtopic = mainTopicData.subtopics[0];

        if (type === 'video & text course') {
            const query = `${firstSubtopic.title} ${mainTopic}`;
            sendVideo(query, firstSubtopic.title);
            setProcessing(true);
        } else {
            const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${firstSubtopic.title}. Please Strictly Don't Give Additional Resources And Images.`;
            const promptImage = `Example of ${firstSubtopic.title} in ${mainTopic}`;
            setProcessing(true);
            sendPrompt(prompt, promptImage);
        }
    }

    async function sendPrompt(prompt, promptImage) {
        const dataToSend = {
            prompt: prompt,
        };
        try {
            const postURL = serverURL + '/api/generate';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.text;
            const htmlContent = generatedText;

            try {
                const parsedJson = htmlContent;
                sendImage(parsedJson, promptImage);
            } catch (error) {
                sendPrompt(prompt, promptImage)
            }

        } catch (error) {
            sendPrompt(prompt, promptImage)
        }
    }

    async function sendImage(parsedJson, promptImage) {
        const dataToSend = {
            prompt: promptImage,
        };
        try {
            const postURL = serverURL + '/api/image';
            const res = await axios.post(postURL, dataToSend);
            try {
                const generatedText = res.data.url;
                sendData(generatedText, parsedJson);
                setProcessing(false);
            } catch (error) {
                sendImage(parsedJson, promptImage)
            }

        } catch (error) {
            sendImage(parsedJson, promptImage)
        }
    }

    async function sendData(image, theory) {
        jsonData[mainTopic][0].subtopics[0].theory = theory;
        jsonData[mainTopic][0].subtopics[0].image = image;

        const user = sessionStorage.getItem('uid');
        const content = JSON.stringify(jsonData);
        const postURL = serverURL + '/api/course';
        const response = await axios.post(postURL, { user, content, type, mainTopic, lang });

        if (response.data.success) {
            showToast(response.data.message);
            sessionStorage.setItem('courseId', response.data.courseId);
            sessionStorage.setItem('first', response.data.completed);
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            navigate('/course', { state: { jsonData: jsonData, mainTopic: mainTopic.toUpperCase(), type: type.toLowerCase(), courseId: response.data.courseId, end: '', pass: false, lang } });
        } else {
            sendData(image, theory)
        }
    }

    async function sendDataVideo(image, theory) {
        jsonData[mainTopic][0].subtopics[0].theory = theory;
        jsonData[mainTopic][0].subtopics[0].youtube = image;

        const user = sessionStorage.getItem('uid');
        const content = JSON.stringify(jsonData);
        const postURL = serverURL + '/api/course';
        const response = await axios.post(postURL, { user, content, type, mainTopic, lang });

        if (response.data.success) {
            showToast(response.data.message);
            sessionStorage.setItem('courseId', response.data.courseId);
            sessionStorage.setItem('first', response.data.completed);
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            navigate('/course', { state: { jsonData: jsonData, mainTopic: mainTopic.toUpperCase(), type: type.toLowerCase(), courseId: response.data.courseId, end: '', pass: false, lang } });
        } else {
            sendDataVideo(image, theory)
        }
    }

    async function sendVideo(query, subtopic) {
        const dataToSend = {
            prompt: query,
        };
        try {
            const postURL = serverURL + '/api/yt';
            const res = await axios.post(postURL, dataToSend);

            try {
                const generatedText = res.data.url;
                sendTranscript(generatedText, subtopic);
            } catch (error) {
                sendVideo(query, subtopic)
            }

        } catch (error) {
            sendVideo(query, subtopic)
        }
    }

    async function sendTranscript(url, subtopic) {
        const dataToSend = {
            prompt: url,
        };
        try {
            const postURL = serverURL + '/api/transcript';
            const res = await axios.post(postURL, dataToSend);

            try {
                const generatedText = res.data.url;
                const allText = generatedText.map(item => item.text);
                const concatenatedText = allText.join(' ');
                const prompt = `Strictly in ${lang}, Summarize this theory in a teaching way and :- ${concatenatedText}.`;
                sendSummery(prompt, url);
            } catch (error) {
                const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtopic}. Please Strictly Don't Give Additional Resources And Images.`;
                sendSummery(prompt, url);
            }

        } catch (error) {
            const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtopic}. Please Strictly Don't Give Additional Resources And Images.`;
            sendSummery(prompt, url);
        }
    }

    async function sendSummery(prompt, url) {
        const dataToSend = {
            prompt: prompt,
        };
        try {
            const postURL = serverURL + '/api/generate';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.text;
            const htmlContent = generatedText;

            try {
                const parsedJson = htmlContent;
                setProcessing(false);
                sendDataVideo(url, parsedJson);
            } catch (error) {
                sendSummery(prompt, url)
            }

        } catch (error) {
            sendSummery(prompt, url)
        }
    }

    const renderTopicsAndSubtopics = (topics) => {
        try {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topics.map((topic, index) => (
                        <div key={topic.title} className={`card-luxury p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300 ${
                            index % 2 === 0 ? 'md:transform md:translate-y-4' : ''
                        }`}>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-[#FFD700]/10 p-3 rounded-xl">
                                    <span className="text-[#FFD700] font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#FFD700]">{topic.title}</h3>
                            </div>
                            <div className="space-y-2">
                                {topic.subtopics.map((subtopic, subIndex) => (
                                    <div 
                                        key={subtopic.title}
                                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-[#3498DB]/10 h-8 w-8 rounded-full flex items-center justify-center">
                                                <span className="text-[#3498DB] text-sm font-medium">{subIndex + 1}</span>
                                            </div>
                                            <p className="text-white/80">{subtopic.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        } catch (error) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topics.map((topic, index) => (
                        <div key={topic.title} className={`card-luxury p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300 ${
                            index % 2 === 0 ? 'md:transform md:translate-y-4' : ''
                        }`}>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-[#FFD700]/10 p-3 rounded-xl">
                                    <span className="text-[#FFD700] font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#FFD700]">{topic.title}</h3>
                            </div>
                            <div className="space-y-2">
                                {topic.subtopics.map((subtopic, subIndex) => (
                                    <div 
                                        key={subtopic.title}
                                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-[#3498DB]/10 h-8 w-8 rounded-full flex items-center justify-center">
                                                <span className="text-[#3498DB] text-sm font-medium">{subIndex + 1}</span>
                                            </div>
                                            <p className="text-white/80">{subtopic.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
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
                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Course Information */}
                        <div className="lg:w-1/3">
                            <div className="card-luxury p-6 rounded-xl sticky top-28">
                                <div className="text-center mb-6">
                                    <div className="bg-[#FFD700]/10 w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                        <FaGraduationCap className="text-[#FFD700] text-3xl" />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#FFD700] mb-2">
                                        {mainTopic.toUpperCase()}
                                    </h2>
                                    <p className="text-white/70">
                                        {type.toLowerCase() === 'video' ? 'Video & Text Course' : 'Theory & Image Course'}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h3 className="text-[#FFD700] font-bold mb-2">Course Type</h3>
                                        <p className="text-white/70">{type.toLowerCase() === 'video' ? 'Interactive video lessons with text support' : 'Comprehensive theory with illustrative images'}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h3 className="text-[#FFD700] font-bold mb-2">Language</h3>
                                        <p className="text-white/70">{lang}</p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={redirectCourse}
                                        disabled={processing}
                                        className="btn-luxury w-full py-3 rounded-xl flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <AiOutlineLoading className="h-5 w-5 animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Continue to Course</span>
                                                <FaArrowRight className="text-sm" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Topics List */}
                        <div className="lg:w-2/3">
                            <div className="card-luxury p-6 rounded-xl">
                                <h2 className="text-2xl font-black text-[#FFD700] mb-6">Course Structure</h2>
                                {jsonData ? (
                                    renderTopicsAndSubtopics(jsonData[mainTopic])
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
                                        <p className="text-white/70">Loading course structure...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Topics;