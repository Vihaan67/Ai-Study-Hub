import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, PlayCircle } from 'lucide-react';

export const SubjectPage: React.FC = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const res = await axios.get(`/api/subjects/${id}`);
                setSubject(res.data);
            } catch (error) {
                console.error('Error fetching subject', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubject();
    }, [id]);

    if (loading) return <div className="p-12 text-center">Loading subject details...</div>;
    if (!subject) return <div className="p-12 text-center text-red-500">Subject not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <Link to="/dashboard" className="text-primary-600 mb-4 inline-block hover:underline">← Back to Dashboard</Link>
                <h1 className="text-5xl font-extrabold mb-4">{subject.name}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">{subject.description}</p>
            </motion.div>

            <div className="space-y-12">
                {subject.subtopics.map((subtopic: any, idx: number) => (
                    <motion.div
                        key={subtopic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center mr-3 text-sm">{idx + 1}</span>
                            {subtopic.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subtopic.lessons.map((lesson: any) => (
                                <Link
                                    key={lesson.id}
                                    to={`/lesson/${lesson.id}`}
                                    className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-4 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-colors">
                                            <PlayCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{lesson.title}</h4>
                                            <p className="text-sm text-slate-400">Lesson • 10 mins</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                            {subtopic.lessons.length === 0 && (
                                <p className="text-slate-400 italic col-span-2">New lessons coming soon...</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
