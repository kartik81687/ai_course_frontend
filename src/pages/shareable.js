import React, { useEffect } from 'react';
import axios from 'axios';
import { serverURL } from '../constants';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import '../styles/colors.css';

const Shareable = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndGetData = async () => {
            const query = new URLSearchParams(window.location.search);
            const id = query.get('id');

            if (!id) {
                showToast("Course doesn't exist");
                navigate("/create");
            } else {
                await getDataFromDatabase(id);
            }
        };

        checkAndGetData();
    }, [navigate]);

    async function getDataFromDatabase(id) {
        const postURL = serverURL + `/api/shareable?id=${id}`;
        try {
            const response = await axios.get(postURL);
            const dat = response.data[0].content;
            const jsonData = JSON.parse(dat);
            sessionStorage.setItem('courseId', id);
            sessionStorage.setItem('first', response.data[0].completed);
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            let type = response.data[0].type.toLowerCase();
            let mainTopic = response.data[0].mainTopic;
            
            if (sessionStorage.getItem('uid') === null) {
                sessionStorage.setItem('shared', id);
                navigate('/course', { 
                    state: { 
                        jsonData: jsonData, 
                        mainTopic: mainTopic.toUpperCase(), 
                        type: type, 
                        courseId: id, 
                        end: '', 
                        pass: false 
                    } 
                });
            } else {
                const user = sessionStorage.getItem('uid');
                const content = JSON.stringify(jsonData);
                const postURLs = serverURL + '/api/courseshared';
                const responses = await axios.post(postURLs, { user, content, type, mainTopic });
                
                if (responses.data.success) {
                    sessionStorage.setItem('courseId', responses.data.courseId);
                    sessionStorage.setItem('first', responses.data.completed);
                    sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
                    navigate('/course', { 
                        state: { 
                            jsonData: jsonData, 
                            mainTopic: mainTopic.toUpperCase(), 
                            type: type.toLowerCase(), 
                            courseId: responses.data.courseId, 
                            end: '', 
                            pass: false 
                        } 
                    });
                } else {
                    sessionStorage.setItem('shared', id);
                    navigate('/course', { 
                        state: { 
                            jsonData: jsonData, 
                            mainTopic: mainTopic.toUpperCase(), 
                            type: type, 
                            courseId: id, 
                            end: '', 
                            pass: false 
                        } 
                    });
                }
            }
        } catch (error) {
            showToast("Course doesn't exist");
            navigate("/create");
        }
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

    return (
        <div className="min-h-screen bg-luxury flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                {/* Animated Orbs */}
                <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                    <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                </div>
            </div>

            {/* Loading Content */}
            <div className="relative z-10 text-center">
                <div className="bg-gold/10 w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-500">
                    <FaGraduationCap className="text-[#FFD700] text-4xl animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Loading Your Course</h2>
                <p className="text-white/70 mb-8">Please wait while we prepare your learning experience</p>
                <div className="flex justify-center">
                    <Spinner size="xl" className="fill-[#FFD700]" />
                </div>
            </div>
        </div>
    );
};

export default Shareable;
