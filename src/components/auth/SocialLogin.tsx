import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "@/context/ThemeContext";

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  isLoading?: boolean;
  type?: "login" | "signup";
}

const SocialLogin = ({
  onGoogleLogin = () => console.log("Google login clicked"),
  isLoading = false,
  type = "login",
}: SocialLoginProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full space-y-4 p-4 rounded-lg ${
      theme === "dark" ? "bg-slate-800" : "bg-white"
    }`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className={`w-full border-t ${
            theme === "dark" ? "border-slate-600" : "border-gray-300"
          }`} />
        </div>
        <div className={`relative px-4 text-sm ${
          theme === "dark" ? "bg-slate-800 text-slate-400" : "bg-white text-gray-500"
        }`}>
          Or {type === "login" ? "sign in" : "sign up"} with
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <Button
          variant="outline"
          className={`w-full border-gray-300 font-medium ${
            theme === "dark" 
              ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600" 
              : "bg-white hover:bg-gray-50 text-gray-700"
          }`}
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          {type === "login" ? "Sign in" : "Sign up"} with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default SocialLogin;
