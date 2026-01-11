import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Zap } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 sm:pt-32 sm:pb-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                            Master Every Subject with <span className="gradient-text">Study Hub</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-10">
                            The all-in-one learning platform designed to help you excel in Mathematics, Science, English, and beyond. Personalized pathways for every student.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/register" className="btn-primary text-lg py-4 px-10">
                                Get Started for Free
                            </Link>
                            <Link to="/dashboard" className="btn-secondary text-lg py-4 px-10">
                                Explore Subjects
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-100 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="w-8 h-8 text-primary-600" />}
                            title="Rich Content"
                            description="Comprehensive lessons covering 9 major subject areas with depth and clarity."
                        />
                        <FeatureCard
                            icon={<Trophy className="w-8 h-8 text-amber-500" />}
                            title="Interactive Quizzes"
                            description="Test your knowledge with challenging quizzes and get instant feedback."
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-indigo-500" />}
                            title="Track Progress"
                            description="Visualize your learning journey and celebrate your milestones along the way."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-morphism p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
);
