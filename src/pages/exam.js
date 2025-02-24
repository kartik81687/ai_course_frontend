import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from 'react-quiz-component';
import axios from 'axios';
import { company, logo, serverURL } from '../constants';
import { FaGraduationCap } from 'react-icons/fa';
import '../styles/colors.css';

const Exam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [examJSON, setExamJSON] = useState({});
    const [completed, setCompleted] = useState(false);
    const [passedQuiz, setPassed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location.state || !location.state.topic || !location.state.courseId || !location.state.questions) {
            navigate('/home');
            return;
        }
        init();
    }, []);

    const setQuizResult = (obj) => {
        if (obj.numberOfCorrectAnswers > 4) {
            setPassed(true);
            const percentage = obj.numberOfCorrectAnswers * 10;
            sendEmail("You Have Passed The Quiz", "You Have Passed The Quiz 🎉 Successfully with " + percentage + "%")
            updateResult(obj.numberOfCorrectAnswers);
        } else {
            setPassed(false);
        }
        setCompleted(true);
    }

    async function updateResult(correct) {
        try {
            const marks = correct * 10;
            const marksString = "" + marks;
            await axios.post(serverURL + '/api/updateresult', {
                courseId: location.state.courseId,
                marksString
            });
        } catch (error) {
            console.error('Failed to update result:', error);
        }
    }

    function init() {
        try {
            const { topic, questions } = location.state;
            const topLevelKeys = Object.keys(questions);
            
            if (!topLevelKeys.length) {
                throw new Error('No questions available');
            }

            const quiz = {
                "quizTitle": topic + " Quiz",
                "quizSynopsis": "Take the quiz on " + topic + " to test your knowledge.\nYou can take infinite attempts to clear the quiz.\nPassing percentage is 50%",
                "progressBarColor": "#FFD700",
                "nrOfQuestions": "10",
                "questions": questions[topLevelKeys[0]].map((item) => ({
                    "question": item.question,
                    "questionType": "text",
                    "answerSelectionType": "single",
                    "answers": item.options,
                    "correctAnswer": item.answer === "A" ? "1" :
                        item.answer === "B" ? "2" :
                            item.answer === "C" ? "3" : "4",
                    "messageForCorrectAnswer": "✨ Correct!",
                    "messageForIncorrectAnswer": "Try again!",
                    "explanation": "",
                    "point": "10"
                }))
            };
            setExamJSON(quiz);
        } catch (error) {
            console.error('Failed to initialize quiz:', error);
            navigate('/home');
        } finally {
            setLoading(false);
        }
    }

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setTimeout(() => {
            window.history.back();
        }, 100);
    };

    async function sendEmail(subject, msg) {
        const userName = sessionStorage.getItem('mName');
        const email = sessionStorage.getItem('email');
        const { topic } = location.state;

        const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                <html lang="en">
                  <head></head>
                  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${topic} Quiz Result</div>
                  <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif">
                    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;margin:0 auto;padding:20px;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
                      <tr style="width:100%">
                        <td>
                          <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-top:32px">
                            <tbody>
                              <tr>
                                <td><img alt="Logo" src="${logo}" width="50" height="50" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;object-fit:contain" /></td>
                              </tr>
                            </tbody>
                          </table>
                          <h1 style="color:#1a1a1a;font-size:24px;font-weight:600;text-align:center;padding:0;margin:30px 0">${topic} Quiz Result</h1>
                          <p style="font-size:16px;line-height:24px;margin:16px 0;color:#4a5568">Hello <strong style="color:#2d3748">${userName}</strong>,</p>
                          <p style="font-size:16px;line-height:24px;margin:16px 0;color:#4a5568">${msg}</p>
                          <div style="margin:24px 0;border-top:1px solid #e2e8f0"></div>
                          <p style="font-size:14px;line-height:24px;margin:16px 0;color:#718096">
                            Best regards,<br/>
                            <strong style="color:#2d3748">The ${company} Team</strong>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>
        `;

        try {
            const postURL = serverURL + '/api/sendexammail';
            await axios.post(postURL, { html, email, subjects: subject });
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-luxury flex items-center justify-center">
                <div className="card-luxury p-8 rounded-2xl text-center">
                    <div className="bg-[#FFD700]/10 w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center animate-pulse">
                        <FaGraduationCap className="text-[#FFD700] text-3xl" />
                    </div>
                    <h2 className="text-[#FFD700] text-xl font-bold mb-2">Loading Quiz</h2>
                    <p className="text-white/70">Please wait while we prepare your exam...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <div className="flex-1 container mx-auto px-4 py-8 relative">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10">
                    <div className="card-luxury p-8 rounded-2xl backdrop-blur-sm">
                        {completed ? (
                            <div className="text-center mb-8">
                                {passedQuiz ? (
                                    <div className="bg-[#FFD700]/10 p-6 rounded-xl inline-block">
                                        <h2 className="text-[#FFD700] text-2xl font-bold mb-2">Congratulations! 🎉</h2>
                                        <p className="text-white/70">You have successfully passed the quiz</p>
                                    </div>
                                ) : (
                                    <div className="bg-red-500/10 p-6 rounded-xl inline-block">
                                        <h2 className="text-red-500 text-2xl font-bold mb-2">Keep Trying! 💪</h2>
                                        <p className="text-white/70">You can retake the quiz to improve your score</p>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        <Quiz 
                            shuffle={true} 
                            quiz={examJSON} 
                            onComplete={setQuizResult}
                            showDefaultResult={false}
                        />

                        {completed && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={exitFullScreen}
                                    className="btn-luxury px-8 py-3 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300"
                                >
                                    Finish Quiz
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;
