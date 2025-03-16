import React from "react";
import { motion } from "framer-motion";
import AuthCard from "./auth/AuthCard";

const Home = () => {
  const handleAuthSuccess = () => {
    console.log(
      "Authentication successful, would redirect to dashboard in a real app",
    );
    // In a real app, this would redirect to the dashboard or home page
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Background decorative elements */}
      <motion.div
        className="fixed -z-10 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-10 blur-3xl"
        style={{ top: "10%", right: "15%" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="fixed -z-10 w-[600px] h-[600px] bg-indigo-500 rounded-full opacity-10 blur-3xl"
        style={{ bottom: "10%", left: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="fixed -z-10 w-[300px] h-[300px] bg-purple-400 rounded-full opacity-10 blur-3xl"
        style={{ top: "40%", left: "25%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-8"
      >
        {/* Left side - Branding and info */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left px-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
            Welcome to <span className="text-indigo-600">Nyan Test</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            Join thousands of users who trust our platform for secure and
            seamless experiences. Sign in to continue your journey or create a
            new account to get started.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">End-to-end encryption</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Fast</h3>
                <p className="text-sm text-gray-600">Optimized performance</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Customizable</h3>
                <p className="text-sm text-gray-600">Tailor to your needs</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Auth card */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AuthCard onAuthSuccess={handleAuthSuccess} />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="w-full mt-auto text-center text-gray-600 text-sm py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p>© 2023 Our Platform. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Contact Us
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
