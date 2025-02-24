import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { Button, Label, Radio, Select } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../constants';
import '../styles/colors.css';

const Create = () => {

    const maxSubtopics = 5;
    const [formValues, setFormValues] = useState([{ sub: "" }]);
    const [processing, setProcessing] = useState(false);
    const [selectedValue, setSelectedValue] = useState('4');
    const [selectedType, setSelectedType] = useState('Text & Image Course');
    const [paidMember, setPaidMember] = useState(false);
    const [lang, setLang] = useState('English');
    const [lableText, setLableText] = useState('For free member sub topics is limited to 5');
    const navigate = useNavigate();

    const languages = [
        { "code": "en", "name": "English" },
        { "code": "ar", "name": "Arabic" },
        { "code": "bn", "name": "Bengali" },
        { "code": "bg", "name": "Bulgarian" },
        { "code": "zh", "name": "Chinese" },
        { "code": "hr", "name": "Croatian" },
        { "code": "cs", "name": "Czech" },
        { "code": "da", "name": "Danish" },
        { "code": "nl", "name": "Dutch" },
        { "code": "et", "name": "Estonian" },
        { "code": "fi", "name": "Finnish" },
        { "code": "fr", "name": "French" },
        { "code": "de", "name": "German" },
        { "code": "el", "name": "Greek" },
        { "code": "he", "name": "Hebrew" },
        { "code": "hi", "name": "Hindi" },
        { "code": "hu", "name": "Hungarian" },
        { "code": "id", "name": "Indonesian" },
        { "code": "it", "name": "Italian" },
        { "code": "ja", "name": "Japanese" },
        { "code": "ko", "name": "Korean" },
        { "code": "lv", "name": "Latvian" },
        { "code": "lt", "name": "Lithuanian" },
        { "code": "no", "name": "Norwegian" },
        { "code": "pl", "name": "Polish" },
        { "code": "pt", "name": "Portuguese" },
        { "code": "ro", "name": "Romanian" },
        { "code": "ru", "name": "Russian" },
        { "code": "sr", "name": "Serbian" },
        { "code": "sk", "name": "Slovak" },
        { "code": "sl", "name": "Slovenian" },
        { "code": "es", "name": "Spanish" },
        { "code": "sw", "name": "Swahili" },
        { "code": "sv", "name": "Swedish" },
        { "code": "th", "name": "Thai" },
        { "code": "tr", "name": "Turkish" },
        { "code": "uk", "name": "Ukrainian" },
        { "code": "vi", "name": "Vietnamese" }
    ];

    useEffect(() => {

        if (sessionStorage.getItem('type') !== 'free') {
            setPaidMember(true);
            setLableText('Select number of sub topics')
        }

    }, []);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        if (formValues.length < maxSubtopics) {
            setFormValues([...formValues, { sub: "" }]);
        } else {
            showToast('You can only add 5 sub topics');
        }
    }

    let removeFormFields = () => {
        let newFormValues = [...formValues];
        newFormValues.pop();
        setFormValues(newFormValues);
    }

    const showPaidToast = async () => {
        if (!paidMember) {
            toast("For paid members only", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const subtopics = [];
        setProcessing(true);
        formValues.forEach(subtopic => {
            subtopics.push(subtopic.subtopic);
        });

        const mainTopic = document.getElementById('topic1').value;

        if (!mainTopic.trim()) {
            setProcessing(false);
            showToast('Please fill in all required fields');
            return;
        }

        if (subtopics.length === 0) {
            setProcessing(false);
            showToast('Please fill in all required fields');
            return;
        }

        const prompt = `Strictly in ${lang}, Generate a list of Strict ${selectedValue} topics and any number sub topic for each topic for main title ${mainTopic.toLowerCase()}, everything in single line. Those ${selectedValue} topics should Strictly include these topics :- ${subtopics.join(', ').toLowerCase()}. Strictly Keep theory, youtube, image field empty. Generate in the form of JSON in this format {
            "${mainTopic.toLowerCase()}": [
       {
       "title": "Topic Title",
       "subtopics": [
        {
        "title": "Sub Topic Title",
        "theory": "",
        "youtube": "",
        "image": "",
        "done": false
        },
        {
        "title": "Sub Topic Title",
        "theory": "",
        "youtube": "",
        "image": "",
        "done": false
        }
       ]
       },
       {
       "title": "Topic Title",
       "subtopics": [
        {
        "title": "Sub Topic Title",
        "theory": "",
        "youtube": "",
        "image": "",
        "done": false
        },
        {
        "title": "Sub Topic Title",
        "theory": "",
        "youtube": "",
        "image": "",
        "done": false
        }
       ]
       }
      ]
      }`;

        sendPrompt(prompt, mainTopic, selectedType)

    };

    async function sendPrompt(prompt, mainTopic, selectedType) {
        const dataToSend = {
            prompt: prompt,
        };
        try {
            const postURL = serverURL + '/api/prompt';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.generatedText;
            const cleanedJsonString = generatedText.replace(/```json/g, '').replace(/```/g, '');
            try {
                const parsedJson = JSON.parse(cleanedJsonString);
                setProcessing(false);
                navigate('/topics', { state: { jsonData: parsedJson, mainTopic: mainTopic.toLowerCase(), type: selectedType.toLowerCase(), lang } });
            } catch (error) {
                sendPrompt(prompt, mainTopic, selectedType)
            }

        } catch (error) {
            sendPrompt(prompt, mainTopic, selectedType)
        }
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleRadioChangeType = (event) => {
        setSelectedType(event.target.value);
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
                    <div className="absolute w-full h-full overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
                        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#3498DB] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-8">
                    <div className="card-luxury p-8 max-w-6xl mx-auto rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-black text-[#FFD700] mb-4">Generate Course</h1>
                                <p className="text-white/70">
                                    Enter your main topic and subtopics to generate a personalized course structure
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Main Topic Input */}
                                    <div className="space-y-2">
                                        <Label className="text-white font-medium" htmlFor="topic1" value="Main Topic" />
                                        <input 
                                            id="topic1" 
                                            type="text" 
                                            className="input-luxury w-full"
                                            placeholder="Enter main topic"
                                        />
                                    </div>

                                    {/* Subtopics */}
                                    <div className="space-y-2">
                                        <Label className="text-white font-medium" htmlFor="subtopic" value="Subtopics" />
                                        {formValues.map((element, index) => (
                                            <input
                                                key={index}
                                                onChange={e => handleChange(index, e)}
                                                className="input-luxury w-full mb-2"
                                                id="subtopic"
                                                type="text"
                                                placeholder={`Subtopic ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Subtopic Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={addFormFields}
                                            className="btn-luxury flex-1 py-2 rounded-xl"
                                        >
                                            Add Subtopic
                                        </button>
                                        {formValues.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={removeFormFields}
                                                className="btn-neon flex-1 py-2 rounded-xl"
                                            >
                                                Remove Subtopic
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Number of Topics */}
                                    <div className="space-y-2">
                                        <Label className="text-white font-medium" value={lableText} />
                                        <div className="space-y-2">
                                            <div className="radio-luxury">
                                                <Radio
                                                    onChange={handleRadioChange}
                                                    id="4"
                                                    name="value"
                                                    value="4"
                                                    defaultChecked
                                                />
                                                <Label className="text-white" htmlFor="4">5</Label>
                                            </div>
                                            <div className="radio-luxury" onClick={() => showPaidToast()}>
                                                <Radio
                                                    onChange={handleRadioChange}
                                                    disabled={!paidMember}
                                                    id="7"
                                                    name="value"
                                                    value="7"
                                                />
                                                <Label className="text-white" htmlFor="7">10</Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Type */}
                                    <div className="space-y-2">
                                        <Label className="text-white font-medium" value="Course Type" />
                                        <div className="space-y-2">
                                            <div className="radio-luxury">
                                                <Radio
                                                    onChange={handleRadioChangeType}
                                                    id="textcourse"
                                                    name="value1"
                                                    value="Text & Image Course"
                                                    defaultChecked
                                                />
                                                <Label className="text-white" htmlFor="textcourse">Theory & Image Course</Label>
                                            </div>
                                            <div className="radio-luxury" onClick={() => showPaidToast()}>
                                                <Radio
                                                    onChange={handleRadioChangeType}
                                                    disabled={!paidMember}
                                                    id="videocourse"
                                                    name="value1"
                                                    value="Video & Text Course"
                                                />
                                                <Label className="text-white" htmlFor="videocourse">Video & Theory Course</Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Language Selection */}
                                    <div className="space-y-2">
                                        <Label className="text-white font-medium" value="Course Language" />
                                        <Select
                                            className="select-luxury"
                                            value={lang}
                                            onChange={(e) => {
                                                if (!paidMember) {
                                                    showPaidToast();
                                                } else {
                                                    setLang(e.target.value);
                                                }
                                            }}
                                        >
                                            {languages.map((country) => (
                                                <option key={country.code} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-luxury w-full py-3 rounded-xl flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300 mt-8"
                            >
                                {processing ? (
                                    <>
                                        <AiOutlineLoading className="h-5 w-5 animate-spin" />
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <span>Generate Course</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Create;