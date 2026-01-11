import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Award, BookOpen, Clock, ChevronRight } from 'lucide-react';

export const Profile: React.FC = () => {
    const { user, token } = useAuth();
    const [progress, setProgress] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get('/api/user/progress', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProgress(res.data);
            } catch (error) {
                console.error('Error fetching progress', error);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchProgress();
    }, [token]);

    const totalLessons = progress.length;
    const avgScore = totalLessons > 0 ? Math.round(progress.reduce((acc, p) => acc + (p.score || 0), 0) / totalLessons) : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1"
                >
                    <div className="glass-morphism p-8 rounded-3xl text-center">
                        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                        <p className="text-slate-500 mb-8">{user?.email}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                <div className="text-2xl font-bold text-primary-600">{totalLessons}</div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Lessons</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                <div className="text-2xl font-bold text-indigo-600">{avgScore}%</div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg Score</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 glass-morphism p-8 rounded-3xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-amber-500" />
                            Achievements
                        </h3>
                        <div className="space-y-4">
                            <AchievementItem title="Early Bird" description="Joined Study Hub" completed={true} />
                            <AchievementItem title="Quick Learner" description="Complete 5 lessons" completed={totalLessons >= 5} />
                            <AchievementItem title="Quiz Master" description="Score 100% in a quiz" completed={progress.some(p => p.score === 100)} />
                        </div>
                    </div>
                </motion.div>

                {/* Progress List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2"
                >
                    <h2 className="text-3xl font-bold mb-8">Recent Activity</h2>
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
                            ))}
                        </div>
                    ) : progress.length > 0 ? (
                        <div className="space-y-4">
                            {progress.map((p, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mr-4">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{p.lesson.title}</h4>
                                            <p className="text-sm text-slate-400">{p.lesson.subtopic.subject.name} • {new Date(p.updatedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-right">
                                            <div className="font-bold text-indigo-600">{p.score}%</div>
                                            <div className="text-xs text-slate-400">Score</div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass-morphism rounded-3xl">
                            <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No activity yet. Start learning today!</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

const AchievementItem: React.FC<{ title: string; description: string; completed: boolean }> = ({ title, description, completed }) => (
    <div className={`p-4 rounded-xl border flex items-center ${completed ? 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20' : 'bg-slate-50 border-slate-100 dark:bg-slate-800 dark:border-slate-700 opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
            <CheckCircle className="w-5 h-5" />
        </div>
        <div>
            <div className={`font-bold text-sm ${completed ? 'text-green-700 dark:text-green-400' : 'text-slate-500'}`}>{title}</div>
            <div className="text-xs text-slate-400">{description}</div>
        </div>
    </div>
);

const CheckCircle: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
