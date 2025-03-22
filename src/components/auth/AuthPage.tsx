import React from 'react';
import AuthCard from './AuthCard';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const AuthPage = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex items-center justify-center py-8 px-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <AuthCard onAuthSuccess={() => window.location.href = '/dashboard'} />
      </motion.div>
    </div>
  );
};

export default AuthPage;