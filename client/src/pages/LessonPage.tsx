import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Trophy, ArrowRight } from 'lucide-react';

export const LessonPage: React.FC = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await axios.get(`/api/lessons/${id}`);
                setLesson(res.data);
            } catch (error) {
                console.error('Error fetching lesson', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id]);

    if (loading) return <div className="p-12 text-center">Loading lesson...</div>;
    if (!lesson) return <div className="p-12 text-center text-red-500">Lesson not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Link to={`/subject/${lesson.subtopic.subjectId}`} className="text-primary-600 mb-8 inline-block hover:underline">← Back to Subject</Link>
                <h1 className="text-4xl font-bold mb-8">{lesson.title}</h1>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700 prose prose-slate dark:prose-invert max-w-none mb-12">
                    {lesson.content.split('\n').map((para: string, i: number) => (
                        <p key={i} className="text-lg leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            {para}
                        </p>
                    ))}
                </div>

                {lesson.quizzes && lesson.quizzes.length > 0 && (
                    <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-2">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                                <span className="font-bold tracking-wider uppercase text-sm">Ready to test yourself?</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Quiz: {lesson.quizzes[0].title}</h2>
                            <p className="text-indigo-100 max-w-md mb-6 md:mb-0">
                                Put your knowledge to the test and earn XP to level up your profile!
                            </p>
                        </div>
                        <Link
                            to={`/quiz/${lesson.quizzes[0].id}`}
                            className="relative z-10 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center group"
                        >
                            Start Quiz
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
