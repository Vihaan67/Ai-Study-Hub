import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Calculator, Beaker, Book, Landmark, Globe, Cpu, Lightbulb, Languages as LangIcon, UserCheck, ChevronRight } from 'lucide-react';

const iconMap: Record<string, any> = {
    calculator: Calculator,
    beaker: Beaker,
    book: Book,
    landmark: Landmark,
    globe: Globe,
    cpu: Cpu,
    lightbulb: Lightbulb,
    languages: LangIcon,
    'user-check': UserCheck,
};

const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    indigo: 'bg-indigo-500',
    yellow: 'bg-yellow-400',
    pink: 'bg-pink-500',
    cyan: 'bg-cyan-500',
};

export const Dashboard: React.FC = () => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axios.get('/api/subjects');
                setSubjects(res.data);
            } catch (error) {
                console.error('Error fetching subjects', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-slate-600 dark:text-slate-400">Choose a subject to continue your learning journey.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((subject, index) => {
                    const Icon = iconMap[subject.icon] || Book;
                    return (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={`/subject/${subject.id}`}
                                className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl ${colorMap[subject.color] || 'bg-primary-500'} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{subject.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-400">{subject._count.subtopics} Subtopics</span>
                                    <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
                                        <span>Explore</span>
                                        <ChevronRight className="w-5 h-5 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
