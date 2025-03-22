import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiCheckSquare,
  FiDollarSign,
  FiTarget,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiMessageSquare,
  FiBook,
} from "react-icons/fi";
import { useSidebar } from "../../context/SidebarContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ui/ThemeToggle";

const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navItems = [
    { icon: <FiHome />, title: t("dashboard"), path: "/dashboard" },
    { icon: <FiCheckSquare />, title: t("tasks"), path: "/tasks" },
    { icon: <FiDollarSign />, title: t("expenses"), path: "/expenses" },
    { icon: <FiTarget />, title: t("goals"), path: "/goals" },
    { icon: <FiAward />, title: t("streaks"), path: "/streaks" },
    { icon: <FiTrendingUp />, title: t("leaderboard"), path: "/leaderboard" },
    { icon: <FiClock />, title: t("habits"), path: "/habits" },
    { icon: <FiBook />, title: t("blogs"), path: "/blogs" },
    { icon: <FiMessageSquare />, title: t("aiAssistant"), path: "/ai-chat" },
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 h-screen shadow-lg z-20 transition-colors ${
        theme === "dark" ? "bg-slate-900 shadow-blue-900/30" : "bg-white shadow-gray-200"
      }`}
      animate={{ width: isOpen ? "240px" : "72px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      initial={false}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center p-4 border-b ${
          theme === "dark" ? "border-slate-800" : "border-gray-100"
        }`}>
          <button
            onClick={toggle}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-100"
            }`}
            aria-label={isOpen ? t("collapseSidebar") : t("expandSidebar")}
          >
            <FiMenu size={24} className={theme === "dark" ? "text-indigo-300" : ""} />
          </button>
          {isOpen && (
            <motion.h1
              className={`ml-3 text-xl font-bold ${
                theme === "dark" 
                  ? "heading-glow" 
                  : "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t("appName")}
            </motion.h1>
          )}
          
          {isOpen && <div className="flex-1" />}
          
          <ThemeToggle className={isOpen ? "ml-auto" : "hidden"} />
        </div>

        <div className={`flex-1 overflow-y-auto py-4 space-y-1 ${
          theme === "dark" ? "scrollbar-dark" : ""
        }`}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={index}>
                <motion.div
                  className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                    isActive 
                      ? theme === "dark"
                        ? "bg-blue-900/30 text-indigo-300"
                        : "bg-blue-50 text-blue-600"
                      : theme === "dark"
                        ? "hover:bg-slate-800/70"
                        : "hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`text-xl ${
                      isActive 
                        ? theme === "dark"
                          ? "text-indigo-300" 
                          : "text-blue-600"
                        : theme === "dark"
                          ? "text-slate-400"
                          : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isOpen && (
                    <motion.span
                      className={`ml-4 text-base ${isActive ? "font-medium" : ""}`}
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
                      className={`ml-auto w-1 h-5 rounded-full ${
                        theme === "dark" ? "bg-indigo-300" : "bg-blue-600"
                      }`}
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* Theme Toggle Button khi Sidebar thu gọn */}
          {!isOpen && (
            <div className="mx-auto w-fit mt-6">
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
