import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiHome, FiCheckSquare, FiDollarSign, 
  FiTarget, FiAward, FiTrendingUp, FiClock, FiMessageSquare 
} from 'react-icons/fi';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();

  const navItems = [
    { icon: <FiHome />, title: 'Dashboard', path: '/dashboard' },
    { icon: <FiCheckSquare />, title: 'Tasks', path: '/tasks' },
    { icon: <FiDollarSign />, title: 'Expenses', path: '/expenses' },
    { icon: <FiTarget />, title: 'Goals', path: '/goals' },
    { icon: <FiAward />, title: 'Streaks', path: '/streaks' },
    { icon: <FiTrendingUp />, title: 'Leaderboard', path: '/leaderboard' },
    { icon: <FiClock />, title: 'Habits', path: '/habits' },
    { icon: <FiMessageSquare />, title: 'AI Assistant', path: '/ai-chat' },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen bg-white shadow-lg z-20"
      animate={{ width: isOpen ? '240px' : '72px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      initial={false}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b">
          <button 
            onClick={toggle} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <FiMenu size={24} />
          </button>
          {isOpen && (
            <motion.h1 
              className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              NexaTask
            </motion.h1>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={index}>
                <motion.div 
                  className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>{item.icon}</div>
                  {isOpen && (
                    <motion.span 
                      className={`ml-4 text-base ${isActive ? 'font-medium' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div 
                      className="ml-auto w-1 h-5 bg-blue-600 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;