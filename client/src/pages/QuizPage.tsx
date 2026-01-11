import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Check, X, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';

export const QuizPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Since we don't have a direct quiz by ID endpoint in seed, we fetch lesson and get quiz
                // But for production, we'll assume the API provides it
                const res = await axios.get(`/api/lessons/${id}`); // Mocking using lesson ID for now
                setQuiz(res.data.quizzes[0]);
            } catch (error) {
                console.error('Error fetching quiz', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionSelect = (idx: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(idx);
        if (idx === quiz.questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNext = async () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
            // Submit progress
            try {
                await axios.post(
                    '/api/progress',
                    {
                        lessonId: quiz.lessonId,
                        completed: true,
                        score: Math.round((score / quiz.questions.length) * 100),
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Error submitting progress', error);
            }
        }
    };

    if (loading) return <div className="p-12 text-center">Loading quiz...</div>;
    if (!quiz) return <div className="p-12 text-center text-red-500">Quiz not found.</div>;

    if (showResult) {
        const percentage = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-morphism p-12 rounded-3xl"
                >
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold mb-2">Quiz Completed!</h1>
                    <p className="text-xl text-slate-500 mb-8">You scored {score} out of {quiz.questions.length}</p>

                    <div className="text-6xl font-black gradient-text mb-8">{percentage}%</div>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-secondary flex items-center justify-center"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2" />
                            Retry Quiz
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-primary flex items-center justify-center"
                        >
                            Back to Dashboard
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="mb-8 flex justify-between items-center text-sm font-semibold text-slate-400">
                <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                <span>Score: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    className="h-full bg-primary-600"
                ></motion.div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="glass-morphism p-8 md:p-12 rounded-3xl"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">{question.text}</h2>

                    <div className="space-y-4">
                        {question.options.map((option: string, idx: number) => {
                            const isSelected = selectedOption === idx;
                            const isCorrect = idx === question.answer;
                            const showCorrect = selectedOption !== null && isCorrect;
                            const showWrong = isSelected && !isCorrect;

                            return (
                                <button
                                    key={idx}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${isSelected
                                        ? isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                        : showCorrect
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-500 bg-transparent'
                                        }`}
                                >
                                    <span className="text-lg font-medium">{option}</span>
                                    {showCorrect && <Check className="w-6 h-6 text-green-500" />}
                                    {showWrong && <X className="w-6 h-6 text-red-500" />}
                                </button>
                            );
                        })}
                    </div>

                    {selectedOption !== null && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="mt-10 flex justify-end"
                        >
                            <button
                                onClick={handleNext}
                                className="btn-primary px-10 py-4 flex items-center"
                            >
                                {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
