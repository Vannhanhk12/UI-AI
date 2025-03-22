import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthAnimation from "./AuthAnimation";
import SocialLogin from "./SocialLogin";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

interface AuthCardProps {
  defaultTab?: "login" | "signup";
  onAuthSuccess?: () => void;
}

type AnimationType = "idle" | "loading" | "success" | "error";

const AuthCard = ({
  defaultTab = "login",
  onAuthSuccess = () => console.log("Auth success"),
}: AuthCardProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [animationState, setAnimationState] = useState<{
    type: AnimationType;
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoading(false);
    setAnimationState({
      type: "success",
      message: "Login successful! Redirecting to dashboard...",
    });
    setTimeout(() => {
      onAuthSuccess();
      // Navigate to dashboard after successful login
      window.location.href = "/dashboard";
    }, 2000);
  };

  const handleSignupSuccess = () => {
    setIsLoading(false);
    setAnimationState({
      type: "success",
      message: "Account created successfully! Redirecting to dashboard...",
    });
    setTimeout(() => {
      onAuthSuccess();
      // Navigate to dashboard after successful signup
      window.location.href = "/dashboard";
    }, 2000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setAnimationState({
      type: "loading",
      message: "Authenticating with Google...",
    });
    // Simulate Google OAuth process
    setTimeout(() => {
      handleLoginSuccess();
    }, 1500);
  };

  const resetAnimationState = () => {
    setAnimationState({
      type: "idle",
      message: "",
    });
    setIsLoading(false);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen w-full p-4 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={`overflow-hidden border-none shadow-xl ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}>
          {animationState.type !== "idle" ? (
            <div className={`p-6 h-[500px] flex items-center justify-center ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}>
              <AuthAnimation
                type={animationState.type}
                message={animationState.message}
                onComplete={resetAnimationState}
              />
            </div>
          ) : (
            <CardContent className="p-0">
              <div className={`p-6 text-white text-center ${
                theme === "dark"
                  ? "bg-gradient-to-r from-indigo-800 to-purple-800"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}>
                <motion.h1
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {t("appTitle")}
                </motion.h1>
                <motion.p
                  className={theme === "dark" ? "text-indigo-200" : "text-blue-100"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {activeTab === "login"
                    ? t("signInToAccount")
                    : t("createAccountToStart")}
                </motion.p>
              </div>
  
              <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "login" | "signup")
                }
                className="w-full"
              >
                <div className="px-6 pt-6">
                  <TabsList className={`grid w-full grid-cols-2 ${
                    theme === "dark" ? "bg-slate-700" : ""
                  }`}>
                    <TabsTrigger 
                      value="login" 
                      disabled={isLoading}
                      className={theme === "dark" ? "data-[state=active]:bg-slate-900 data-[state=active]:text-white" : ""}
                    >
                      {t("login")}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup" 
                      disabled={isLoading}
                      className={theme === "dark" ? "data-[state=active]:bg-slate-900 data-[state=active]:text-white" : ""}
                    >
                      {t("signUp")}
                    </TabsTrigger>
                  </TabsList>
                </div>
  
                <div className="px-6 pb-6 pt-2">
                  <AnimatePresence mode="wait">
                    <TabsContent
                      value="login"
                      className="mt-4 focus-visible:outline-none focus-visible:ring-0"
                    >
                      <LoginForm
                        onSuccess={handleLoginSuccess}
                        onToggleForm={() => setActiveTab("signup")}
                        isLoading={isLoading}
                      />
                    </TabsContent>
  
                    <TabsContent
                      value="signup"
                      className="mt-4 focus-visible:outline-none focus-visible:ring-0"
                    >
                      <SignupForm
                        onSuccess={handleSignupSuccess}
                        onSwitch={() => setActiveTab("login")}
                      />
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </Tabs>
            </CardContent>
          )}
        </Card>
  
        {/* Decorative elements */}
        <motion.div
          className={`absolute -z-10 w-72 h-72 rounded-full opacity-10 blur-3xl ${
            theme === "dark" ? "bg-indigo-700" : "bg-blue-500"
          }`}
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
          className={`absolute -z-10 w-96 h-96 rounded-full opacity-10 blur-3xl ${
            theme === "dark" ? "bg-purple-800" : "bg-indigo-600"
          }`}
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
      </motion.div>
    </div>
  );
};

export default AuthCard;
