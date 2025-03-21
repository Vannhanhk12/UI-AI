import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiBarChart2, FiClock, FiTarget, FiArrowRight, FiMenu, FiX, FiGlobe, FiChevronDown } from 'react-icons/fi';
import PricingSection from './pricing/PricingSection';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background patterns for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-green-100 to-blue-100 opacity-40 blur-3xl"></div>
      </div>
  
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-white/70 backdrop-blur-sm py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 shadow-md">N</div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">{t("appTitle")}</span>
            </motion.div>
          </div>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { key: 'features', href: '#features' },
              { key: 'benefits', href: '#benefits' },
              { key: 'testimonials', href: '#testimonials' },
              { key: 'pricing', href: '#pricing' }
            ].map((item, i) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                {t(item.key)}
              </motion.a>
            ))}
            
            {/* Language Switcher */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 cursor-pointer border border-gray-200 transition-colors group"
              >
                <FiGlobe className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">{getLanguageLabel(i18n.language)}</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Language dropdown */}
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[160px] z-50"
                  >
                    {['en', 'vi', 'ja', 'ko', 'es'].map((lang) => (
                      <div 
                        key={lang} 
                        className={`flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer ${i18n.language === lang ? 'bg-blue-50' : ''}`}
                        onClick={() => {
                          i18n.changeLanguage(lang);
                          setLangMenuOpen(false);
                        }}
                      >
                        <div className="w-5 h-5 mr-3 relative overflow-hidden rounded-full">
                          <img 
                            src={`/flags/${lang}.svg`} 
                            alt={getLanguageLabel(lang)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{getLanguageLabel(lang)}</span>
                        {i18n.language === lang && (
                          <FiCheck className="w-4 h-4 ml-auto text-blue-600" />
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/auth">
                <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  {t("getStarted")}
                </button>
              </Link>
            </motion.div>
          </nav>
  
          {/* Mobile menu and language switcher */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700"
            >
              <FiGlobe size={20} />
            </button>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700">
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Language Menu */}
        <AnimatePresence>
          {langMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { opacity: 1, height: 'auto' },
                hidden: { opacity: 0, height: 0 }
              }}
            >
              <div className="container mx-auto px-4 py-2">
                <div className="grid grid-cols-5 gap-2">
                  {['en', 'vi', 'ja', 'ko', 'es'].map((lang) => (
                    <motion.div
                      key={lang}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        i18n.changeLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg ${i18n.language === lang ? 'bg-blue-100' : 'bg-gray-50'}`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img 
                          src={`/flags/${lang}.svg`}
                          alt={getLanguageLabel(lang)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs mt-1 font-medium">{lang.toUpperCase()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden bg-white/95 backdrop-blur-sm shadow-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}
          initial="hidden"
          animate={mobileMenuOpen ? "visible" : "hidden"}
          variants={{
            visible: { height: 'auto', opacity: 1 },
            hidden: { height: 0, opacity: 0 }
          }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {[
              { key: 'features', href: '#features' },
              { key: 'benefits', href: '#benefits' },
              { key: 'testimonials', href: '#testimonials' },
              { key: 'pricing', href: '#pricing' }
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition shadow-md">
                {t("getStarted")}
              </button>
            </Link>
          </div>
        </motion.div>
      </header>
  
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-40 pb-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <motion.h1
                className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("heroTitle")}<br />
                <span className="text-blue-600">{t("heroSubtitle")}</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {t("heroDescription")}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link to="/auth">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-blue-200 shadow-lg flex items-center justify-center">
                    {t("startForFree")}
                    <FiArrowRight className="ml-2" />
                  </button>
                </Link>
                <a href="#features" className="px-8 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-600 hover:text-blue-600 transition flex items-center justify-center shadow-sm hover:shadow-md">
                  {t("learnMore")}
                </a>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: i === 1 ? '#60a5fa' : i === 2 ? '#818cf8' : i === 3 ? '#a78bfa' : '#c084fc' }}></div>
                  ))}
                </div>
                <p className="ml-4 text-gray-700">{t("joinedBy")} <span className="font-medium">5,000+</span> {t("enthusiasts")}</p>
              </motion.div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt={t("productivityDashboard")}
                  className="relative z-10 rounded-2xl shadow-2xl max-w-full h-auto border-4 border-white"
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-20 border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <FiBarChart2 className="text-blue-600 text-xl" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">{t("productivityScore")}</p>
                      <p className="text-lg font-bold text-gray-800">+27% {t("thisWeek")}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
  
      {/* Features Section */}
      <section id="features" className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p
              className="text-blue-600 font-semibold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("powerfulFeatures")}
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              {t("everythingYouNeed")}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={2}
            >
              {t("comprehensiveToolkit")}
            </motion.p>
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index * 0.2 + 3}
              >
                <div className={`bg-gradient-to-r ${feature.gradient} px-6 py-4 flex items-center`}>
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-white">{t(feature.titleKey)}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{t(feature.descriptionKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-40 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-40 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p
              className="text-blue-600 font-semibold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("successStories")}
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              {t("whatUsersSay")}
            </motion.h2>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index * 0.2 + 2}
              >
                <div className={`h-2 bg-gradient-to-r ${
                  index === 1 
                    ? "from-blue-500 to-indigo-500" 
                    : index === 2 
                      ? "from-indigo-500 to-purple-500" 
                      : "from-purple-500 to-pink-500"
                }`}></div>
                <div className="p-6">
                  <p className="text-gray-700 italic mb-6">{t(`testimonialQuote${index}`)}</p>
                  <div className="flex items-center">
                    <img 
                      src={`/testimonials/user${index}.jpg`} 
                      alt={t(`testimonialName${index}`)} 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md" 
                    />
                    <div className="ml-3">
                      <h4 className="font-bold text-gray-900">{t(`testimonialName${index}`)}</h4>
                      <p className="text-gray-600 text-sm">{t(`testimonialTitle${index}`)}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  
      {/* PricingSection component remains unchanged as it's imported */}
      <PricingSection />
  
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-20 bg-white/5"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        </div>
      
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("readyToTransform")}
            </motion.h2>
            <motion.p
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              {t("joinThousands")}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={2}
            >
              <Link to="/auth">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition shadow-xl hover:shadow-2xl font-medium text-lg transform hover:-translate-y-1 duration-300">
                  {t("getStartedToday")}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
  
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-12 relative overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-3/4 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 shadow-lg shadow-blue-900/20">N</div>
                <span className="text-xl font-bold text-white">{t("appTitle")}</span>
              </div>
              <p className="text-gray-400 mb-6">{t("footerTagline")}</p>
              <div className="flex space-x-4">
                {[
                  { name: 'twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                  { name: 'facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.87 18h10.26A3.87 3.87 0 0021 14.13V9.87A3.87 3.87 0 0017.13 6H6.87A3.87 3.87 0 003 9.87v4.26A3.87 3.87 0 006.87 18z' },
                  { name: 'linkedin', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' }
                ].map(social => (
                  <motion.a 
                    key={social.name} 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center shadow-md transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon}></path>
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {[
              {
                title: "footerProduct",
                items: ['features', 'pricing', 'integrations', 'updates', 'roadmap']
              },
              {
                title: "footerResources",
                items: ['blog', 'helpCenter', 'tutorials', 'apiDocs', 'community']
              },
              {
                title: "footerCompany",
                items: ['aboutUs', 'careers', 'contact', 'privacyPolicy', 'termsOfService']
              }
            ].map((column, idx) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-5 text-white border-b border-gray-700 pb-2">
                  {t(column.title)}
                </h3>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <motion.li 
                      key={item} 
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                        {t(item)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center"
            >
              <p className="text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} {t("appTitle")}. {t("allRightsReserved")}
              </p>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">{t("privacy")}</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">{t("terms")}</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">{t("cookies")}</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">{t("contact")}</a>
              </div>
            </motion.div>
            
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;