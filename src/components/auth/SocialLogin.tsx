import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

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
  return (
    <div className="w-full space-y-4 bg-white p-4 rounded-lg">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative px-4 text-sm text-gray-500 bg-white">
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
          className="w-full bg-white border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
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
