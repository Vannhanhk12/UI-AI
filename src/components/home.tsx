import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheck, FiBarChart2, FiClock, FiTarget, FiArrowRight, FiMenu, FiX, FiGlobe, FiChevronDown, FiTrendingUp, FiAward, FiUsers, FiCalendar, FiUser } from 'react-icons/fi';
import PricingSection from './pricing/PricingSection';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ui/ThemeToggle';
import axios from 'axios';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState({
    blogs: true,
    leaderboard: true
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const animatedTexts = [
    t('heroTextOption1'),
    t('heroTextOption2'),
    t('heroTextOption3'),
    t('heroTextOption4')
  ];
  
  // Text animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);
  
  // Language helper function
  const getLanguageLabel = (langCode: string): string => {
    const languageMap: Record<string, string> = {
      en: 'English',
      vi: 'Vietnamese',
      ja: 'Japanese',
      ko: 'Korean',
      es: 'Spanish'
    };
    
    return languageMap[langCode] || langCode;
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const features = [
    {
      icon: <FiCheck className="text-2xl text-white" />,
      titleKey: "taskManagement",
      descriptionKey: "taskManagementDesc",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <FiTarget className="text-2xl text-white" />,
      titleKey: "goalTracking",
      descriptionKey: "goalTrackingDesc",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FiClock className="text-2xl text-white" />,
      titleKey: "focusSessions",
      descriptionKey: "focusSessionsDesc",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <FiBarChart2 className="text-2xl text-white" />,
      titleKey: "performanceAnalytics",
      descriptionKey: "performanceAnalyticsDesc",
      gradient: "from-sky-500 to-sky-600"
    },
    {
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
      titleKey: "customizableDashboard",
      descriptionKey: "customizableDashboardDesc",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path></svg>,
      titleKey: "crossPlatformSync",
      descriptionKey: "crossPlatformSyncDesc",
      gradient: "from-teal-500 to-teal-600"
    }
  ];

  const benefits = [
    {
      icon: <FiTrendingUp />,
      titleKey: "productivity",
      descriptionKey: "productivityDesc",
      darkBg: 'bg-blue-900/30',
      darkText: 'text-blue-300',
      lightBg: 'bg-blue-100',
      lightText: 'text-blue-600'
    },
    {
      icon: <FiCheck />,
      titleKey: "taskCompletion",
      descriptionKey: "taskCompletionDesc",
      darkBg: 'bg-green-900/30',
      darkText: 'text-green-300',
      lightBg: 'bg-green-100',
      lightText: 'text-green-600'
    },
    {
      icon: <FiClock />,
      titleKey: "timeManagement",
      descriptionKey: "timeManagementDesc",
      darkBg: 'bg-purple-900/30',
      darkText: 'text-purple-300',
      lightBg: 'bg-purple-100',
      lightText: 'text-purple-600'
    },
    {
      icon: <FiBarChart2 />,
      titleKey: "performanceTracking",
      descriptionKey: "performanceTrackingDesc",
      darkBg: 'bg-sky-900/30',
      darkText: 'text-sky-300',
      lightBg: 'bg-sky-100',
      lightText: 'text-sky-600'
    }
  ];

  const stats = [
    {
      icon: <FiTrendingUp />,
      value: "+42%",
      labelKey: "averageImprovement"
    },
    {
      icon: <FiCheck />,
      value: "94.7%",
      labelKey: "taskCompletionRate"
    },
    {
      icon: <FiClock />,
      value: "25h 30m",
      labelKey: "averageFocusTime"
    },
    {
      icon: <FiBarChart2 />,
      value: "+27%",
      labelKey: "averageProductivity"
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?limit=3`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.data && response.data.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(prev => ({ ...prev, blogs: false }));
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/leaderboard?limit=3`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.data && response.data.data) {
          setTopUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(prev => ({ ...prev, leaderboard: false }));
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          navigate('/auth');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  // Thay đổi phần hero
  const heroSectionMarkup = (
    <section 
      ref={heroRef} 
      className={`pt-28 pb-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-b from-blue-50 to-white'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute top-0 right-0 w-1/3 h-1/3 rounded-full ${
            theme === 'dark' ? 'bg-indigo-900/20 blur-3xl' : 'bg-blue-200/30 blur-3xl'
          }`}
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className={`absolute bottom-1/4 left-1/4 w-1/4 h-1/4 rounded-full ${
            theme === 'dark' ? 'bg-purple-900/20 blur-3xl' : 'bg-indigo-200/40 blur-3xl'
          }`}
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className={`absolute -top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full ${
            theme === 'dark' ? 'bg-blue-900/10 blur-3xl' : 'bg-cyan-200/30 blur-3xl'
          }`}
          animate={{ 
            x: [0, 70, 0], 
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 30,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              className={`inline-block py-1 px-3 rounded-full text-sm font-medium mb-6 ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-800' 
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  theme === 'dark' ? 'bg-indigo-400' : 'bg-blue-500'
                }`}></span>
                {t("newProductivityApp")}
              </span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("heroTitle")}<br />
              <span className={theme === 'dark' ? 'text-indigo-400' : 'text-blue-600'}>
                {t("heroSubtitle")}
              </span>
            </motion.h1>
            
            <motion.div
              className="relative h-16 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={textAnimation}
                  className={`absolute inset-0 text-xl lg:text-2xl ${
                    theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                  }`}
                >
                  {t("helpYou")} <span className={theme === 'dark' ? 'text-indigo-300 font-medium' : 'text-blue-600 font-medium'}>
                    {animatedTexts[currentTextIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/auth?signup=true"
                className={`px-8 py-4 rounded-xl font-medium text-white shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-500/30' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
                }`}
              >
                {t("startForFree")}
              </Link>
              <a
                href="#features"
                className={`px-8 py-4 rounded-xl font-medium border-2 transform transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'border-slate-700 hover:border-slate-600 text-white' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {t("learnMore")}
              </a>
            </motion.div>
            
            <motion.div 
              className={`mt-8 flex items-center justify-center lg:justify-start ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <FiUsers className="mr-2" />
              <span>{t("joinedBy")} <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>10,000+</span> {t("enthusiasts")}</span>
            </motion.div>
          </div>
          
          <div className="flex-1 relative">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className={`absolute inset-0 rounded-3xl transform rotate-6 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 blur-lg' 
                  : 'bg-gradient-to-r from-blue-100 to-indigo-100 blur-lg'
              }`}></div>
              
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                theme === 'dark' ? 'border border-slate-700' : 'border border-gray-200'
              }`}>
                <div className={`flex items-center px-6 py-4 ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className={`mx-auto text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                    {t("productivityDashboard")}
                  </div>
                </div>
                
                <motion.div
                  className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} p-6`}
                  animate={{ 
                    y: [0, 5, 0], 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut" 
                  }}
                >
                  <img 
                    src="/assets/hero-dashboard.png" 
                    alt={t("productivityDashboard")} 
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className={`p-4 rounded-xl ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                        }`}>{t("productivityScore")}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                        }`}>+12%</div>
                      </div>
                      <div className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>92<span className="text-sm font-normal ml-1">/100</span></div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                      }`}>{t("thisWeek")}</div>
                    </div>
                    
                    <div className={`p-4 rounded-xl ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'
                    }`}>
                      <div className={`text-sm font-medium mb-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                      }`}>{t("completedTasks")}</div>
                      <div className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>24<span className="text-sm font-normal ml-1">/30</span></div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                      }`}>{t("thisWeek")}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`absolute top-1/2 -left-16 transform -translate-y-1/2 bg-gradient-to-br ${
                theme === 'dark' 
                  ? 'from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/20' 
                  : 'from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20'
              } rounded-2xl p-4 z-20`}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-white flex items-center">
                <FiCheck className="text-2xl mr-3 p-1 bg-white/20 rounded-full" />
                <div>
                  <div className="text-sm font-medium">{t("tasksCompleted")}</div>
                  <div className="text-2xl font-bold">87%</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`absolute bottom-8 -right-8 ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-gray-100'
              } rounded-2xl p-4 shadow-xl z-20`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-600'
                }`}>
                  <FiClock className="text-lg" />
                </div>
                <div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                  }`}>{t("focusTime")}</div>
                  <div className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>2h 42m</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 h-24 ${
          theme === 'dark' 
            ? 'bg-gradient-to-t from-slate-900 to-transparent' 
            : 'bg-gradient-to-t from-white to-transparent'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );

  // Thêm phần featureShowcase vào sau phần features
  const featureShowcaseSection = (
    <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {t("whyChooseUs")}
          </motion.h2>
          <motion.p 
            className={`text-xl max-w-3xl mx-auto text-center ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("designedForModernNeeds")}
          </motion.p>
        </div>
        
        {/* Feature 1: Focus Sessions */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-24">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-block py-1 px-3 rounded-full text-sm font-medium mb-4 ${
              theme === 'dark' 
                ? 'bg-purple-900/30 text-purple-300 border border-purple-800' 
                : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}>
              {t("focusSessions")}
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t("stayFocusedTitle")}
            </h3>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {t("stayFocusedDesc")}
            </p>
            
            <div className="space-y-4">
              {[
                { key: "timerFeature", icon: <FiClock /> },
                { key: "notificationsFeature", icon: <FiTarget /> },
                { key: "analyticsFeature", icon: <FiBarChart2 /> }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className={`mt-1 p-1 rounded-full ${
                    theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t(item.key + "Title")}
                    </h4>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                      {t(item.key + "Desc")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`absolute inset-0 rounded-2xl transform rotate-3 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-900/30 to-indigo-900/30 blur-lg' 
                : 'bg-gradient-to-r from-purple-100 to-indigo-100 blur-lg'
            }`}></div>
            
            <div className={`relative rounded-2xl overflow-hidden shadow-xl ${
              theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'
            }`}>
              <img 
                src="/assets/focus-sessions.png" 
                alt={t("focusSessions")} 
                className="w-full h-auto"
              />
            </div>
            
            <motion.div 
              className={`absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-gray-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-600'
                }`}>
                  <FiCheck className="text-xl" />
                </div>
                <div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {t("productivityIncrease")}
                  </div>
                  <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    +35%
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Feature 2: Task Management */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`absolute inset-0 rounded-2xl transform -rotate-3 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 blur-lg' 
                : 'bg-gradient-to-r from-blue-100 to-cyan-100 blur-lg'
            }`}></div>
            
            <div className={`relative rounded-2xl overflow-hidden shadow-xl ${
              theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'
            }`}>
              <img 
                src="/assets/task-management.png" 
                alt={t("taskManagement")} 
                className="w-full h-auto"
              />
            </div>
            
            <motion.div 
              className={`absolute -bottom-6 -left-6 p-4 rounded-xl shadow-lg ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-gray-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FiCheck className="text-xl" />
                </div>
                <div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {t("taskCompletionRate")}
                  </div>
                  <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    94%
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-block py-1 px-3 rounded-full text-sm font-medium mb-4 ${
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              {t("taskManagement")}
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t("organizeTasksTitle")}
            </h3>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {t("organizeTasksDesc")}
            </p>
            
            <div className="space-y-4">
              {[
                { key: "prioritization", icon: <FiCheck /> },
                { key: "kanban", icon: <FiBarChart2 /> },
                { key: "reminders", icon: <FiClock /> }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className={`mt-1 p-1 rounded-full ${
                    theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t(item.key + "Title")}
                    </h4>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                      {t(item.key + "Desc")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-40 blur-3xl dark:from-blue-800 dark:to-purple-900 dark:opacity-20"></div>
        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-green-100 to-blue-100 opacity-40 blur-3xl dark:from-green-800 dark:to-blue-900 dark:opacity-20"></div>
        <div className="absolute top-[50%] left-[30%] w-72 h-72 rounded-full bg-gradient-to-tl from-yellow-100 to-red-100 opacity-30 blur-3xl dark:from-yellow-800 dark:to-red-900 dark:opacity-15"></div>
      </div>
  
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md shadow-blue-900/10'
            : 'bg-white/90 backdrop-blur-md shadow-md' 
          : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className={`font-bold text-xl mr-8 ${
                theme === 'dark' ? 'heading-glow text-blue-300' : 'text-blue-700'
              }`}>
                {t('appName')}
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link to="/about" className={`font-medium hover:text-blue-600 transition-colors ${
                  theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : ''
                }`}>
                  {t('about')}
                </Link>
                <a href="#features" className={`font-medium hover:text-blue-600 transition-colors ${
                  theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : ''
                }`}>
                  {t('features')}
                </a>
                <a href="#pricing" className={`font-medium hover:text-blue-600 transition-colors ${
                  theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : ''
                }`}>
                  {t('pricing')}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button
                  className={`flex items-center space-x-1 text-sm ${
                    theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                >
                  <FiGlobe className="text-lg" />
                  <span>{getLanguageLabel(i18n.language)}</span>
                  <FiChevronDown className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div 
                    className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg ${
                      theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'
                    } z-20`}
                  >
                    {['en', 'vi', 'ja', 'ko', 'es'].map((lang) => (
                      <button
                        key={lang}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          i18n.language === lang
                            ? theme === 'dark' ? 'bg-slate-700 text-indigo-300' : 'bg-blue-50 text-blue-600'
                            : theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          i18n.changeLanguage(lang);
                          setLangMenuOpen(false);
                        }}
                      >
                        {getLanguageLabel(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <ThemeToggle />
              
              <Link
                to="/auth"
                className={`hidden md:block px-4 py-2 rounded-lg text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {t('signIn')}
              </Link>
              
              <Link
                to="/auth?signup=true"
                className={`hidden md:block px-4 py-2 rounded-lg text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {t('getStarted')}
              </Link>
              
              <button
                className="md:hidden text-2xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <FiX className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                ) : (
                  <FiMenu className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 ${
              theme === 'dark' ? 'border-t border-slate-800' : 'border-t border-gray-100'
            }`}>
              <div className="space-y-3">
                <Link
                  to="/about"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <a
                  href="#features"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('features')}
                </a>
                <a
                  href="#pricing"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('pricing')}
                </a>
                
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-800">
                  <Link
                    to="/auth"
                    className={`block w-full px-4 py-2 text-center rounded-md text-base font-medium mb-2 ${
                      theme === 'dark'
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    to="/auth?signup=true"
                    className={`block w-full px-4 py-2 text-center rounded-md text-base font-medium ${
                      theme === 'dark'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('getStarted')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main content */}
      <main>
        {heroSectionMarkup}
        
        {/* Features Section */}
        <section id="features" className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {t("featuresTitle")}
              </motion.h2>
              <motion.p 
                className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("featuresSubtitle")}
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg ${
                    theme === 'dark' ? 'bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/70' : 'bg-white hover:bg-gray-50'
                  } transition-all duration-300`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {t(feature.titleKey)}
                  </h3>
                  <p className={theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}>
                    {t(feature.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase Section */}
        {featureShowcaseSection}
        
        {/* Benefits Section */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {t("benefitsTitle")}
              </motion.h2>
              <motion.p 
                className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("benefitsSubtitle")}
              </motion.p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full mr-3 ${
                      theme === 'dark' ? 'bg-indigo-900/30 text-indigo-300' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    {t(stat.labelKey)}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className={`flex p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-white border border-gray-100 shadow-sm'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`mr-5 p-3 rounded-xl self-start ${
                    theme === 'dark' ? benefit.darkBg : benefit.lightBg
                  }`}>
                    <div className={`text-2xl ${
                      theme === 'dark' ? benefit.darkText : benefit.lightText
                    }`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t(benefit.titleKey)}
                    </h3>
                    <p className={`${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                    }`}>
                      {t(benefit.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
          <PricingSection />
        </section>
        
        {/* Testimonials and Social Proof */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {t("testimonialsTitle")}
              </motion.h2>
              <motion.p 
                className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("testimonialsSubtitle")}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-blue-600'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("ctaSubtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/auth?signup=true"
                className="px-8 py-4 rounded-xl font-medium bg-white text-indigo-700 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
              >
                {t("getStartedNow")} <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <Link to="/" className={`inline-block font-bold text-xl mb-6 ${
                theme === 'dark' ? 'heading-glow text-blue-300' : 'text-blue-700'
              }`}>
                {t('appName')}
              </Link>
              <p className={`mb-6 pr-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                {t("footerDescription")}
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-indigo-300' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600'
                    }`}
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`font-semibold text-sm uppercase mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t("product")}
              </h3>
              <ul className="space-y-3">
                {["features", "pricing", "download", "updates"].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item}`} 
                      className={`text-sm hover:underline ${
                        theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold text-sm uppercase mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t("resources")}
              </h3>
              <ul className="space-y-3">
                {["documentation", "tutorials", "blog", "apiDocs", "community"].map((item) => (
                  <li key={item}>
                    <a 
                      href={`/${item}`} 
                      className={`text-sm hover:underline ${
                        theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold text-sm uppercase mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t("company")}
              </h3>
              <ul className="space-y-3">
                {["aboutUs", "careers", "contact", "integrations", "roadmap"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item}`} 
                      className={`text-sm hover:underline ${
                        theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold text-sm uppercase mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t("legal")}
              </h3>
              <ul className="space-y-3">
                {["terms", "privacy", "cookies", "licenses"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item}`} 
                      className={`text-sm hover:underline ${
                        theme === 'dark' ? 'text-slate-300 hover:text-indigo-300' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${
            theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={theme === 'dark' ? 'text-slate-400 mb-4 md:mb-0' : 'text-gray-500 mb-4 md:mb-0'}>
                &copy; {new Date().getFullYear()} {t("appTitle")}. {t("allRightsReserved")}
              </p>
              
              <div className="flex space-x-6">
                {["terms", "privacy", "cookies"].map((item) => (
                  <Link 
                    key={item}
                    to={`/${item}`} 
                    className={`text-sm hover:underline ${
                      theme === 'dark' ? 'text-slate-400 hover:text-indigo-300' : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    {t(item)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;