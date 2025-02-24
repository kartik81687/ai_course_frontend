import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { serverURL } from '../constants';
import { Card, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import found from '../res/img/found.svg';
import { FaGraduationCap, FaCertificate, FaArrowRight } from 'react-icons/fa';
import '../styles/colors.css';

const UserCourses = ({ userId }) => {
    const [courses, setCourses] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchUserCourses = useCallback(async () => {
        setProcessing(page === 1);
        setLoadingMore(page > 1);
        const postURL = `${serverURL}/api/courses?userId=${userId}&page=${page}&limit=9`;
        try {
            const response = await axios.get(postURL);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setCourses((prevCourses) => [...prevCourses, ...response.data]);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setProcessing(false);
            setLoadingMore(false);
        }
    }, [userId, page]);

    useEffect(() => {
        fetchUserCourses();
    }, [fetchUserCourses]);

    const handleScroll = useCallback(() => {
        if (!hasMore || loadingMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore, loadingMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const navigate = useNavigate();
    const redirectGenerate = () => navigate("/create");

    const handleCourse = async (content, mainTopic, type, courseId, completed, end) => {
        const postURL = serverURL + '/api/getmyresult';
        const response = await axios.post(postURL, { courseId });
        if (response.data.success) {
            const jsonData = JSON.parse(content);
            sessionStorage.setItem('courseId', courseId);
            sessionStorage.setItem('first', completed);
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            let ending = '';
            if (completed) ending = end;
            navigate('/course', {
                state: {
                    jsonData,
                    mainTopic: mainTopic.toUpperCase(),
                    type: type.toLowerCase(),
                    courseId,
                    end: ending,
                    pass: response.data.message,
                    lang: response.data.lang
                }
            });
        } else {
            const jsonData = JSON.parse(content);
            sessionStorage.setItem('courseId', courseId);
            sessionStorage.setItem('first', completed);
            sessionStorage.setItem('jsonData', JSON.stringify(jsonData));
            let ending = '';
            if (completed) ending = end;
            navigate('/course', {
                state: {
                    jsonData,
                    mainTopic: mainTopic.toUpperCase(),
                    type: type.toLowerCase(),
                    courseId,
                    end: ending,
                    pass: false,
                    lang: response.data.lang
                }
            });
        }
    };

    const handleCertificate = (mainTopic, end) => {
        const ending = new Date(end).toLocaleDateString();
        navigate('/certificate', { state: { courseTitle: mainTopic, end: ending } });
    };

    return (
        <div>
            {processing ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="bg-gold/10 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center">
                        <Spinner size="xl" className="fill-[#FFD700]" />
                    </div>
                    <p className="text-white/70">Loading your courses...</p>
                </div>
            ) : (
                <>
                    {courses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <img 
                                src={found} 
                                alt="No courses found" 
                                className="max-w-sm h-auto mb-8 hover:scale-105 transition-transform duration-500" 
                            />
                            <h2 className="text-2xl font-black text-[#FFD700] mb-4">No Courses Found</h2>
                            <p className="text-white/70 mb-8 text-center">Start your learning journey by creating your first course</p>
                            <button 
                                onClick={redirectGenerate} 
                                className="btn-luxury px-8 py-4 rounded-xl flex items-center space-x-2 hover:scale-105 transition-transform duration-500"
                            >
                                <FaGraduationCap className="text-xl" />
                                <span>Generate Course</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <div key={course._id} className="group">
                                    <Card className="card-luxury border-0 overflow-hidden transition-all duration-500 hover:scale-105">
                                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                            <img 
                                                src={course.photo} 
                                                alt={course.mainTopic} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[#FFD700] mb-2 truncate">
                                                {course.mainTopic.toUpperCase()}
                                            </h3>
                                            <div className="flex flex-col space-y-2 text-sm text-white/70 mb-6">
                                                <p className="capitalize">{course.type}</p>
                                                <p>{new Date(course.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button 
                                                    onClick={() => handleCourse(course.content, course.mainTopic, course.type, course._id, course.completed, course.end)}
                                                    className="btn-luxury flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-2"
                                                >
                                                    <span>Continue</span>
                                                    <FaArrowRight className="text-sm" />
                                                </button>
                                                {course.completed && (
                                                    <button 
                                                        onClick={() => handleCertificate(course.mainTopic, course.end)}
                                                        className="btn-neon py-2.5 px-4 rounded-xl flex items-center justify-center"
                                                        title="View Certificate"
                                                    >
                                                        <FaCertificate className="text-xl" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                    {loadingMore && (
                        <div className="flex items-center justify-center mt-8">
                            <div className="bg-gold/10 w-12 h-12 rounded-xl flex items-center justify-center">
                                <Spinner size="lg" className="fill-[#FFD700]" />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserCourses;
