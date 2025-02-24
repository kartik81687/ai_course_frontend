import { Drawer, Navbar, Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import { FiMenu, FiX } from 'react-icons/fi';
import DarkModeToggle from '../components/DarkModeToggle';
import TruncatedText from '../components/TruncatedText';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import StyledText from '../components/styledText';
import YouTube from 'react-youtube';
import { toast } from 'react-toastify';
import { logo, name, serverURL, websiteURL } from '../constants';
import axios from 'axios';
import { FaCheck, FaGraduationCap, FaBook, FaVideo, FaImage, FaDownload, FaShare, FaHome, FaArrowRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import html2pdf from 'html2pdf.js';
import ShareOnSocial from 'react-share-on-social';
import ChatWidget from '../components/chatWidget';
import NotesWidget from '../components/notesWidget';
import '../styles/colors.css';

const Course = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [key, setkey] = useState('');
    const { state } = useLocation();
    const { mainTopic, type, courseId, end, pass, lang } = state || {};
    const jsonData = JSON.parse(sessionStorage.getItem('jsonData'));
    const storedTheme = sessionStorage.getItem('darkMode');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const [theory, setTheory] = useState('');
    const [media, setMedia] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [isComplete, setIsCompleted] = useState(false);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    async function redirectExam() {
        const id = toast.loading("Please wait...")
        const mainTopicExam = jsonData[mainTopic.toLowerCase()];
        let subtopicsString = '';
        mainTopicExam.map((topicTemp) => {
            let titleOfSubTopic = topicTemp.title;
            subtopicsString = subtopicsString + ' , ' + titleOfSubTopic;
        });

        const postURL = serverURL + '/api/aiexam';
        const response = await axios.post(postURL, { courseId, mainTopic, subtopicsString, lang });
        if (response.data.success) {
            const element = document.documentElement; // or you can use a specific container if you want
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            } else {
                console.error('Full-screen mode is not supported by this browser.');
            }
            let questions = JSON.parse(response.data.message);
            navigate('/exam', { state: { topic: mainTopic, courseId: courseId, questions: questions } });
            toast.update(id, { render: "Starting Quiz", type: "success", isLoading: false, autoClose: 3000, hideProgressBar: false, closeOnClick: true });
        } else {
            toast.update(id, { render: "Internal Server Error", type: "error", isLoading: false, autoClose: 3000, hideProgressBar: false, closeOnClick: true });
        }

    }

    async function htmlDownload() {
        const id = toast.loading("Please wait exporting...")
        // Generate the combined HTML content
        const combinedHtml = await getCombinedHtml(mainTopic, jsonData[mainTopic.toLowerCase()]);

        // Create a temporary div element
        const tempDiv = document.createElement('div');
        tempDiv.style.width = '100%';  // Ensure div is 100% width
        tempDiv.style.height = '100%';  // Ensure div is 100% height
        tempDiv.innerHTML = combinedHtml;
        document.body.appendChild(tempDiv);

        // Create the PDF options
        const options = {
            filename: `${mainTopic}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            margin: [15, 15, 15, 15],
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
            html2canvas: {
                scale: 2,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                useCORS: true
            },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };

        // Generate the PDF
        html2pdf().from(tempDiv).set(options).save().then(() => {
            // Save the PDF
            document.body.removeChild(tempDiv);
            toast.update(id, { render: "Done!", type: "success", isLoading: false, autoClose: 3000, hideProgressBar: false, closeOnClick: true });
        });
    }


    async function getCombinedHtml(mainTopic, topics) {


        async function toDataUrl(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(xhr.response);
                };

                xhr.onerror = function () {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                };

                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.send();
            }).catch(error => {
                console.error(`Failed to fetch image at ${url}:`, error);
                return ''; // Fallback or placeholder
            });
        }

        const topicsHtml = topics.map(topic => `
            <h3 style="font-size: 18pt; font-weight: bold; margin: 0; margin-top: 15px;">${topic.title}</h3>
            ${topic.subtopics.map(subtopic => `
                <p style="font-size: 16pt; margin-top: 10px;">${subtopic.title}</p>
            `).join('')}
        `).join('');

        const theoryPromises = topics.map(async topic => {
            const subtopicPromises = topic.subtopics.map(async (subtopic, index, array) => {
                const imageUrl = type === 'text & image course' ? await toDataUrl(subtopic.image) : ``;
                console.log(imageUrl);
                return `
                <div>
                    <p style="font-size: 16pt; margin-top: 20px; font-weight: bold;">
                        ${subtopic.title}
                    </p>
                    <div style="font-size: 12pt; margin-top: 15px;">
                        ${subtopic.done
                        ? `
                                ${type === 'text & image course'
                            ? (imageUrl ? `<img style="margin-top: 10px;" src="${imageUrl}" alt="${subtopic.title} image">` : `<a style="color: #0000FF;" href="${subtopic.image}" target="_blank">View example image</a>`)
                            : `<a style="color: #0000FF;" href="https://www.youtube.com/watch?v=${subtopic.youtube}" target="_blank" rel="noopener noreferrer">Watch the YouTube video on ${subtopic.title}</a>`
                        }
                                <div style="margin-top: 10px;">${subtopic.theory}</div>
                            `
                        : `<div style="margin-top: 10px;">Please visit ${subtopic.title} topic to export as PDF. Only topics that are completed will be added to the PDF.</div>`
                    }
                    </div>
                </div>
            `;
            });
            const subtopicHtml = await Promise.all(subtopicPromises);
            return `
                <div style="margin-top: 30px;">
                    <h3 style="font-size: 18pt; text-align: center; font-weight: bold; margin: 0;">
                        ${topic.title}
                    </h3>
                    ${subtopicHtml.join('')}
                </div>
            `;
        });
        const theoryHtml = await Promise.all(theoryPromises);

        return `
        <div class="html2pdf__page-break" 
             style="display: flex; align-items: center; justify-content: center; text-align: center; margin: 0 auto; max-width: 100%; height: 11in;">
            <h1 style="font-size: 30pt; font-weight: bold; margin: 0;">
                ${mainTopic}
            </h1>
        </div>
        <div class="html2pdf__page-break" style="text-align: start; margin-top: 30px; margin-right: 16px; margin-left: 16px;">
            <h2 style="font-size: 24pt; font-weight: bold; margin: 0;">Index</h2>
            <br>
            <hr>
            ${topicsHtml}
        </div>
        <div style="text-align: start; margin-right: 16px; margin-left: 16px;">
            ${theoryHtml.join('')}
        </div>
        `;
    }



    const CountDoneTopics = () => {
        let doneCount = 0;
        let totalTopics = 0;

        jsonData[mainTopic.toLowerCase()].forEach((topic) => {

            topic.subtopics.forEach((subtopic) => {

                if (subtopic.done) {
                    doneCount++;
                }
                totalTopics++;
            });
        });
        totalTopics = totalTopics + 1;
        if(pass){
            totalTopics = totalTopics - 1;
        }
        const completionPercentage = Math.round((doneCount / totalTopics) * 100);
        setPercentage(completionPercentage);
        if (completionPercentage >= '100') {
            setIsCompleted(true);
        }
    }

    const opts = {
        height: '390',
        width: '640',
    };

    const optsMobile = {
        height: '250px',
        width: '100%',
    };

    async function finish() {
        if (sessionStorage.getItem('first') === 'true') {
            if (!end) {
                const today = new Date();
                const formattedDate = today.toLocaleDateString('en-GB');
                navigate('/certificate', { state: { courseTitle: mainTopic, end: formattedDate } });
            } else {
                navigate('/certificate', { state: { courseTitle: mainTopic, end: end } });
            }

        } else {
            const dataToSend = {
                courseId: courseId
            };
            try {
                const postURL = serverURL + '/api/finish';
                const response = await axios.post(postURL, dataToSend);
                if (response.data.success) {
                    const today = new Date();
                    const formattedDate = today.toLocaleDateString('en-GB');
                    sessionStorage.setItem('first', 'true');
                    sendEmail(formattedDate);
                } else {
                    finish()
                }
            } catch (error) {
                finish()
            }
        }
    }

    async function sendEmail(formattedDate) {
        const userName = sessionStorage.getItem('mName');
        const email = sessionStorage.getItem('email');
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="initial-scale=1.0">
            <title>Certificate of Completion</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap">
            <style>
            body {
                font-family: 'Roboto', sans-serif;
                text-align: center;
                background-color: #fff;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
        
            .certificate {
                border: 10px solid #000;
                max-width: 600px;
                margin: 20px auto;
                padding: 50px;
                background-color: #fff;
                position: relative;
                color: #000;
                text-align: center;
            }
        
            h1 {
                font-weight: 900;
                font-size: 24px;
                margin-bottom: 10px;
            }
        
            h4 {
                font-weight: 900;
                text-align: center;
                font-size: 20px;
            }
        
            h2 {
                font-weight: 700;
                font-size: 18px;
                margin-top: 10px;
                margin-bottom: 5px;
                text-decoration: underline;
            }
        
            h3 {
                font-weight: 700;
                text-decoration: underline;
                font-size: 16px;
                margin-top: 5px;
                margin-bottom: 10px;
            }
        
            p {
                font-weight: 400;
                line-height: 1.5;
            }
        
            img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                text-align: center;
                align-self: center;
            }
            </style>
        </head>
        <body>
        
        <div class="certificate">
        <h1>Certificate of Completion 🥇</h1>
        <p>This is to certify that</p>
        <h2>${userName}</h2>
        <p>has successfully completed the course on</p>
        <h3>${mainTopic}</h3>
        <p>on ${formattedDate}.</p>
    
        <div class="signature">
            <img src=${logo}>
            <h4>${name}</h4>
        </div>
    </div>
        
        </body>
        </html>`;

        try {
            const postURL = serverURL + '/api/sendcertificate';
            await axios.post(postURL, { html, email }).then(res => {
                navigate('/certificate', { state: { courseTitle: mainTopic, end: formattedDate } });
            }).catch(error => {
                navigate('/certificate', { state: { courseTitle: mainTopic, end: formattedDate } });
            });

        } catch (error) {
            navigate('/certificate', { state: { courseTitle: mainTopic, end: formattedDate } });
        }

    }

    useEffect(() => {
        loadMessages()
        const CountDoneTopics = () => {
            let doneCount = 0;
            let totalTopics = 0;

            jsonData[mainTopic.toLowerCase()].forEach((topic) => {

                topic.subtopics.forEach((subtopic) => {

                    if (subtopic.done) {
                        doneCount++;
                    }
                    totalTopics++;
                });
            });
            totalTopics = totalTopics + 1;
            if(pass){
                doneCount = doneCount + 1;
            }
            const completionPercentage = Math.round((doneCount / totalTopics) * 100);
            setPercentage(completionPercentage);
            if (completionPercentage >= '100') {
                setIsCompleted(true);
            }
        }

        if (!mainTopic) {
            navigate("/create");
        } else {
            if (percentage >= '100') {
                setIsCompleted(true);
            }

            const mainTopicData = jsonData[mainTopic.toLowerCase()][0];
            const firstSubtopic = mainTopicData.subtopics[0];
            firstSubtopic.done = true
            setSelected(firstSubtopic.title)
            setTheory(firstSubtopic.theory);

            if (type === 'video & text course') {
                setMedia(firstSubtopic.youtube);
            } else {
                setMedia(firstSubtopic.image)

            }
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            CountDoneTopics();

        }

    }, []);

    const handleSelect = (topics, sub) => {

        const mTopic = jsonData[mainTopic.toLowerCase()].find(topic => topic.title === topics);
        const mSubTopic = mTopic?.subtopics.find(subtopic => subtopic.title === sub);

        if (mSubTopic.theory === '' || mSubTopic.theory === undefined || mSubTopic.theory === null) {
            if (type === 'video & text course') {

                const query = `${mSubTopic.title} ${mainTopic} in english`;
                const id = toast.loading("Please wait...")
                sendVideo(query, topics, sub, id, mSubTopic.title);

            } else {

                const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${mSubTopic.title}. Please Strictly Don't Give Additional Resources And Images.`;
                const promptImage = `Example of ${mSubTopic.title} in ${mainTopic}`;
                const id = toast.loading("Please wait...")
                sendPrompt(prompt, promptImage, topics, sub, id);

            }
        } else {
            setSelected(mSubTopic.title)

            setTheory(mSubTopic.theory)
            if (type === 'video & text course') {
                setMedia(mSubTopic.youtube);
            } else {
                setMedia(mSubTopic.image)
            }
        }

    };

    async function sendPrompt(prompt, promptImage, topics, sub, id) {
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
                sendImage(parsedJson, promptImage, topics, sub, id);
            } catch (error) {
                //sendPrompt(prompt, promptImage, topics, sub, id)
            }

        } catch (error) {
            //sendPrompt(prompt, promptImage, topics, sub, id)
        }
    }

    async function sendImage(parsedJson, promptImage, topics, sub, id) {
        const dataToSend = {
            prompt: promptImage,
        };
        try {
            const postURL = serverURL + '/api/image';
            const res = await axios.post(postURL, dataToSend);
            try {
                const generatedText = res.data.url;
                sendData(generatedText, parsedJson, topics, sub, id);
            } catch (error) {
                //sendImage(parsedJson, promptImage, topics, sub, id)
            }

        } catch (error) {
            //sendImage(parsedJson, promptImage, topics, sub, id)
        }
    }

    async function sendData(image, theory, topics, sub, id) {

        const mTopic = jsonData[mainTopic.toLowerCase()].find(topic => topic.title === topics);
        const mSubTopic = mTopic?.subtopics.find(subtopic => subtopic.title === sub);
        mSubTopic.theory = theory
        mSubTopic.image = image;
        setSelected(mSubTopic.title)

        toast.update(id, { render: "Done!", type: "success", isLoading: false, autoClose: 3000, hideProgressBar: false, closeOnClick: true });
        setTheory(theory)
        if (type === 'video & text course') {
            setMedia(mSubTopic.youtube);
        } else {
            setMedia(image)
        }
        mSubTopic.done = true;
        updateCourse();
    }

    async function sendDataVideo(image, theory, topics, sub, id) {

        const mTopic = jsonData[mainTopic.toLowerCase()].find(topic => topic.title === topics);
        const mSubTopic = mTopic?.subtopics.find(subtopic => subtopic.title === sub);
        mSubTopic.theory = theory
        mSubTopic.youtube = image;
        setSelected(mSubTopic.title)

        toast.update(id, { render: "Done!", type: "success", isLoading: false, autoClose: 3000, hideProgressBar: false, closeOnClick: true });
        setTheory(theory)
        if (type === 'video & text course') {
            setMedia(image);
        } else {
            setMedia(mSubTopic.image)
        }
        mSubTopic.done = true;
        updateCourse();

    }

    async function updateCourse() {
        CountDoneTopics();
        sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
        const dataToSend = {
            content: JSON.stringify(jsonData),
            courseId: courseId
        };
        try {
            const postURL = serverURL + '/api/update';
            await axios.post(postURL, dataToSend);
        } catch (error) {
            //updateCourse()
        }
    }

    async function sendVideo(query, mTopic, mSubTopic, id, subtop) {
        const dataToSend = {
            prompt: query,
        };
        try {
            const postURL = serverURL + '/api/yt';
            const res = await axios.post(postURL, dataToSend);

            try {
                const generatedText = res.data.url;
                sendTranscript(generatedText, mTopic, mSubTopic, id, subtop);
            } catch (error) {
                //sendVideo(query, mTopic, mSubTopic, id, subtop)
            }

        } catch (error) {
            //sendVideo(query, mTopic, mSubTopic, id, subtop)
        }
    }

    async function sendTranscript(url, mTopic, mSubTopic, id, subtop) {
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
                const prompt = `Strictly in ${lang}, Summarize this theory in a teaching way :- ${concatenatedText}.`;
                sendSummery(prompt, url, mTopic, mSubTopic, id);
            } catch (error) {
                const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtop}. Please Strictly Don't Give Additional Resources And Images.`;
                sendSummery(prompt, url, mTopic, mSubTopic, id);
            }

        } catch (error) {
            const prompt = `Strictly in ${lang}, Explain me about this subtopic of ${mainTopic} with examples :- ${subtop}.  Please Strictly Don't Give Additional Resources And Images.`;
            sendSummery(prompt, url, mTopic, mSubTopic, id);
        }
    }

    async function sendSummery(prompt, url, mTopic, mSubTopic, id) {
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
                sendDataVideo(url, parsedJson, mTopic, mSubTopic, id);
            } catch (error) {
                //sendSummery(prompt, url, mTopic, mSubTopic, id)
            }

        } catch (error) {
            //sendSummery(prompt, url, mTopic, mSubTopic, id)
        }
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenClose = (keys) => {
        setIsOpen(!isOpen)
        setkey(keys);
    };

    const defaultMessage = `<p>Hey there! I'm your AI teacher. If you have any questions about your ${mainTopic} course, whether it's about videos, images, or theory, just ask me. I'm here to clear your doubts.</p>`;
    const defaultPrompt = `I have a doubt about this topic :- ${mainTopic}. Please clarify my doubt in very short :- `;

    const loadMessages = async () => {
        try {
            const jsonValue = sessionStorage.getItem(mainTopic);
            if (jsonValue !== null) {
                setMessages(JSON.parse(jsonValue));
            } else {
                const newMessages = [...messages, { text: defaultMessage, sender: 'bot' }];
                setMessages(newMessages);
                await storeLocal(newMessages);
            }
        } catch (error) {
            loadMessages();
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        const userMessage = { text: newMessage, sender: 'user' };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        await storeLocal(updatedMessages);
        setNewMessage('');

        let mainPrompt = defaultPrompt + newMessage;
        const dataToSend = { prompt: mainPrompt };
        const url = serverURL + '/api/chat';

        try {
            const response = await axios.post(url, dataToSend);

            if (response.data.success === false) {
                sendMessage();
            } else {
                const botMessage = { text: response.data.text, sender: 'bot' };
                const updatedMessagesWithBot = [...updatedMessages, botMessage];
                setMessages(updatedMessagesWithBot);
                await storeLocal(updatedMessagesWithBot);
            }
        } catch (error) {

        }
    };

    async function storeLocal(messages) {
        try {
            sessionStorage.setItem(mainTopic, JSON.stringify(messages));
        } catch (error) {
            sessionStorage.setItem(mainTopic, JSON.stringify(messages));
        }
    }

    function redirectHome() {
        navigate("/home");
    }

    const style = {
        "root": {
            "base": "h-full bg-transparent",
            "collapsed": {
                "on": "w-16",
                "off": "w-full"
            },
            "inner": "h-full overflow-y-auto overflow-x-hidden bg-transparent"
        },
        "item": {
            "base": "flex items-center justify-start w-full p-2 text-base font-semibold transition-colors duration-300 rounded-lg group hover:bg-[#FFD700]/10",
            "active": "bg-[#FFD700]/10 text-[#FFD700]",
            "collapsed": {
                "on": "justify-center",
                "off": "justify-start"
            }
        },
        "itemGroup": "space-y-2 py-2"
    };

    const renderTopicsAndSubtopics = (topics) => {
        try {
            return (
                <Sidebar theme={style} className="bg-transparent">
                    <Sidebar.Items>
                        {topics.map((topic) => (
                            <Sidebar.ItemGroup key={topic.title}>
                                <button
                                    onClick={() => handleOpenClose(topic.title)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-lg font-semibold text-white hover:text-[#FFD700] transition-colors duration-300 rounded-lg hover:bg-[#FFD700]/10"
                                >
                                    <span>{topic.title}</span>
                                    <IoIosArrowDown 
                                        className={`transform transition-transform duration-300 ${
                                            isOpen && key === topic.title ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <div className={`transition-all duration-300 overflow-hidden ${
                                    isOpen && key === topic.title ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="pl-6 space-y-2 mt-2">
                                        {topic.subtopics.map((subtopic) => (
                                            <button
                                                key={subtopic.title}
                                                onClick={() => handleSelect(topic.title, subtopic.title)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-base ${
                                                    subtopic.done 
                                                        ? 'text-[#FFD700] bg-[#FFD700]/10' 
                                                        : 'text-white/70 hover:text-white'
                                                } transition-colors duration-300 rounded-lg hover:bg-[#FFD700]/10`}
                                            >
                                                <span>{subtopic.title}</span>
                                                {subtopic.done && <FaCheck className="text-[#FFD700] text-sm" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Sidebar.ItemGroup>
                        ))}
                    </Sidebar.Items>
                </Sidebar>
            );
        } catch (error) {
            return (
                <Sidebar theme={style} className="bg-transparent">
                    <Sidebar.Items>
                        {topics.map((topic) => (
                            <Sidebar.ItemGroup key={topic.Title}>
                                <button
                                    onClick={() => handleOpenClose(topic.Title)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-lg font-semibold text-white hover:text-[#FFD700] transition-colors duration-300 rounded-lg hover:bg-[#FFD700]/10"
                                >
                                    <span>{topic.Title}</span>
                                    <IoIosArrowDown 
                                        className={`transform transition-transform duration-300 ${
                                            isOpen && key === topic.Title ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <div className={`transition-all duration-300 overflow-hidden ${
                                    isOpen && key === topic.Title ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="pl-6 space-y-2 mt-2">
                                        {topic.Subtopics.map((subtopic) => (
                                            <button
                                                key={subtopic.Title}
                                                onClick={() => handleSelect(topic.Title, subtopic.Title)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-base ${
                                                    subtopic.done 
                                                        ? 'text-[#FFD700] bg-[#FFD700]/10' 
                                                        : 'text-white/70 hover:text-white'
                                                } transition-colors duration-300 rounded-lg hover:bg-[#FFD700]/10`}
                                            >
                                                <span>{subtopic.Title}</span>
                                                {subtopic.done && <FaCheck className="text-[#FFD700] text-sm" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Sidebar.ItemGroup>
                        ))}
                    </Sidebar.Items>
                </Sidebar>
            );
        }
    };

    return (
        <>
            {!mainTopic ? <></> :
                <div className="min-h-screen flex flex-col bg-luxury">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                        {/* Animated Orbs */}
                        <div className="absolute w-full h-full overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="flex bg-transparent md:hidden">
                        {/* Mobile Sidebar Overlay */}
                        <div 
                            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                                isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`} 
                            onClick={toggleSidebar}
                        />

                        {/* Mobile Sidebar */}
                        <div className={`fixed inset-y-0 left-0 w-[280px] bg-black/40 backdrop-blur-md z-50 transform transition-transform duration-300 ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}>
                            <div className="h-full flex flex-col">
                                <div className="p-4 border-b border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-[#FFD700]/10">
                                            <FaGraduationCap className="text-[#FFD700] text-xl" />
                                        </div>
                                        <h2 className="text-[#FFD700] text-lg font-bold truncate">{mainTopic}</h2>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4">
                                    {jsonData && renderTopicsAndSubtopics(jsonData[mainTopic.toLowerCase()])}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Main Content */}
                        <div className="flex-1 flex flex-col min-h-screen">
                            <Navbar fluid className='py-4 bg-black/40 backdrop-blur-md border-b border-white/10'>
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={toggleSidebar}
                                        className="text-white hover:text-[#FFD700] transition-colors duration-300"
                                    >
                                        <FiMenu size={24} />
                                    </button>
                                    {isComplete ? (
                                        <button 
                                            onClick={finish}
                                            className="flex items-center space-x-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
                                        >
                                            <FaGraduationCap size={20} />
                                            <span>Certificate</span>
                                        </button>
                                    ) : (
                                        <div className="w-8 h-8">
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                                styles={buildStyles({
                                                    rotation: 0.25,
                                                    strokeLinecap: 'round',
                                                    textSize: '20px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: '#FFD700',
                                                    textColor: '#FFD700',
                                                    trailColor: 'rgba(255, 215, 0, 0.2)',
                                                })}
                                            />
                                        </div>
                                    )}
                                    <span className="text-white font-medium truncate">{selected || 'Select a topic'}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button onClick={redirectHome} className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300">
                                        <FaHome size={20} />
                                    </button>
                                    <button onClick={htmlDownload} className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300">
                                        <FaDownload size={20} />
                                    </button>
                                    <ShareOnSocial
                                        textToShare={`${sessionStorage.getItem('mName')} shared you course on ${mainTopic}`}
                                        link={`${websiteURL}/shareable?id=${courseId}`}
                                        linkTitle={`${sessionStorage.getItem('mName')} shared you course on ${mainTopic}`}
                                        linkMetaDesc={`${sessionStorage.getItem('mName')} shared you course on ${mainTopic}`}
                                        linkFavicon={logo}
                                        noReferer
                                    >
                                        <button className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300">
                                            <FaShare size={20} />
                                        </button>
                                    </ShareOnSocial>
                                </div>
                            </Navbar>

                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="space-y-6">
                                    {type === 'video & text course' ? (
                                        <>
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                                <YouTube key={media} className='w-full' videoId={media} opts={optsMobile} />
                                            </div>
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                                <StyledText text={theory} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                                <StyledText text={theory} />
                                            </div>
                                            <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                                <img className="w-full rounded-lg" src={media} alt="Media" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:flex flex-row h-screen">
                        {/* Sidebar */}
                        <div className="w-80 bg-black/40 backdrop-blur-md border-r border-white/10 overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="p-2 rounded-lg bg-[#FFD700]/10">
                                        <FaGraduationCap className="text-[#FFD700] text-2xl" />
                                    </div>
                                    <h2 className="text-[#FFD700] text-xl font-bold">{mainTopic}</h2>
                                </div>
                                {jsonData && (
                                    <div className="sidebar-container">
                                        {renderTopicsAndSubtopics(jsonData[mainTopic.toLowerCase()])}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Navbar fluid className='py-4 bg-black/40 backdrop-blur-md border-b border-white/10'>
                                <div className="flex items-center space-x-6">
                                    {isComplete ? (
                                        <button 
                                            onClick={finish}
                                            className="flex items-center space-x-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
                                        >
                                            <FaGraduationCap size={20} />
                                            <span>Certificate</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center space-x-3">
                                            <div className='w-10 h-10'>
                                                <CircularProgressbar
                                                    value={percentage}
                                                    text={`${percentage}%`}
                                                    styles={buildStyles({
                                                        rotation: 0.25,
                                                        strokeLinecap: 'round',
                                                        textSize: '20px',
                                                        pathTransitionDuration: 0.5,
                                                        pathColor: '#FFD700',
                                                        textColor: '#FFD700',
                                                        trailColor: 'rgba(255, 215, 0, 0.2)',
                                                    })}
                                                />
                                            </div>
                                            <span className="text-white/70">Course Progress</span>
                                        </div>
                                    )}
                                    <button 
                                        onClick={redirectHome}
                                        className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors duration-300"
                                    >
                                        <FaHome size={18} />
                                        <span>Home</span>
                                    </button>
                                    <button 
                                        onClick={htmlDownload}
                                        className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors duration-300"
                                    >
                                        <FaDownload size={18} />
                                        <span>Export</span>
                                    </button>
                                    <ShareOnSocial
                                        textToShare={sessionStorage.getItem('mName') + " shared you course on " + mainTopic}
                                        link={websiteURL + '/shareable?id=' + courseId}
                                        linkTitle={sessionStorage.getItem('mName') + " shared you course on " + mainTopic}
                                        linkMetaDesc={sessionStorage.getItem('mName') + " shared you course on " + mainTopic}
                                        linkFavicon={logo}
                                        noReferer
                                    >
                                        <button className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors duration-300">
                                            <FaShare size={18} />
                                            <span>Share</span>
                                        </button>
                                    </ShareOnSocial>
                                    <DarkModeToggle />
                                </div>
                            </Navbar>

                            {/* Desktop Content */}
                            <div className="flex-1 overflow-y-auto p-8">
                                <div className="max-w-5xl mx-auto">
                                    <div className="book-container relative">
                                        {/* Book Cover Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-l-3xl"></div>
                                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FFD700]/20 to-transparent rounded-l-3xl"></div>
                                        
                                        {/* Book Content */}
                                        <div className="relative bg-[#1a1a1a] rounded-3xl shadow-2xl border border-[#FFD700]/10 overflow-hidden">
                                            {/* Book Header */}
                                            <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 border-b border-[#FFD700]/10">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-3xl font-black bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">{selected}</h2>
                                                        <p className="text-white/50 mt-2">Chapter {currentPage} of your learning journey</p>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="p-3 rounded-xl bg-[#FFD700]/10">
                                                            {type === 'video & text course' ? (
                                                                <FaVideo className="text-2xl text-[#FFD700]" />
                                                            ) : (
                                                                <FaBook className="text-2xl text-[#FFD700]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Book Content Area */}
                                            <div className="p-8 space-y-8">
                                                {type === 'video & text course' ? (
                                                    <>
                                                        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl">
                                                            <div className="aspect-video rounded-xl overflow-hidden">
                                                                <YouTube key={media} className='w-full h-full' videoId={media} opts={optsMobile} />
                                                            </div>
                                                        </div>
                                                        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
                                                            <div className="prose prose-lg prose-invert max-w-none">
                                                                <StyledText text={theory} />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
                                                            <div className="prose prose-lg prose-invert max-w-none">
                                                                <StyledText text={theory} />
                                                            </div>
                                                        </div>
                                                        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl">
                                                            <img className="w-full rounded-xl shadow-lg" src={media} alt="Course Media" />
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Book Footer */}
                                            <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 border-t border-[#FFD700]/10">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-white/50">
                                                        <span>Course Progress: {percentage}%</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <FaGraduationCap className="text-[#FFD700]" />
                                                        <span className="text-[#FFD700]">{mainTopic}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat and Notes Widgets */}
                    <div className='flex flex-col'>
                        <ChatWidget defaultMessage={defaultMessage} defaultPrompt={defaultPrompt} mainTopic={mainTopic} />
                        <NotesWidget courseId={courseId} mainTopic={mainTopic} />
                    </div>
                </div>
            }
        </>
    );
};


export default Course;