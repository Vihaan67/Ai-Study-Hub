import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { SubjectPage } from './pages/SubjectPage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AnimatePresence } from 'framer-motion';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/subject/:id"
                  element={
                    <PrivateRoute>
                      <SubjectPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/lesson/:id"
                  element={
                    <PrivateRoute>
                      <LessonPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/quiz/:id"
                  element={
                    <PrivateRoute>
                      <QuizPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
          <footer className="py-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500">
            <p>© 2026 Study Hub. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
