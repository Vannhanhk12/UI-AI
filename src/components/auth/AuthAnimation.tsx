import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AnimationType = "success" | "error" | "loading" | "idle";

interface AuthAnimationProps {
  type?: AnimationType;
  message?: string;
  onComplete?: () => void;
  duration?: number;
}

const AuthAnimation = ({
  type = "idle",
  message = "",
  onComplete = () => {},
  duration = 2000,
}: AuthAnimationProps) => {
  const [visible, setVisible] = useState(type !== "idle");

  useEffect(() => {
    setVisible(type !== "idle");

    let timer: NodeJS.Timeout;
    if (type === "success" || type === "error") {
      timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 300); // Wait for exit animation
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [type, duration, onComplete]);

  const getAnimationContent = () => {
    switch (type) {
      case "success":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-green-50 rounded-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-green-700 font-medium text-center"
            >
              {message || "Success! Your request was completed."}
            </motion.p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-50 rounded-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <XCircle className="w-16 h-16 text-red-500" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-red-700 font-medium text-center"
            >
              {message || "Oops! Something went wrong."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  setVisible(false);
                  setTimeout(onComplete, 300);
                }}
              >
                Try Again
              </Button>
            </motion.div>
          </div>
        );

      case "loading":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-blue-50 rounded-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Loader2 className="w-12 h-12 text-blue-500" />
            </motion.div>
            <p className="text-blue-700 font-medium text-center">
              {message || "Loading, please wait..."}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full"
          >
            {getAnimationContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthAnimation;
