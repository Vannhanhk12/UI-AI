import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
}

const SignupForm = ({
  onSuccess = () => {},
  onSwitch = () => {},
}: SignupFormProps) => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/auth/register`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Successfully registered
      const { accessToken, refreshToken, user } = data;

      // Save tokens and user info via the auth context
      login(accessToken, refreshToken, user);

      toast.success("Registration successful!");
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error cases
      if (error instanceof Error) {
        if (
          error.message.includes("email") ||
          error.message.toLowerCase().includes("already exists")
        ) {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already registered",
          }));
        } else {
          toast.error(
            error.message || "Registration failed. Please try again.",
          );
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Redirect to Google OAuth endpoint
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`w-full p-6 rounded-lg shadow-lg ${
        theme === "dark" 
          ? "bg-slate-800 text-white" 
          : "bg-white text-gray-900"
      }`}
    >
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          {t("createAccount")}
        </h2>
        <p className={`mt-1 ${
          theme === "dark" ? "text-slate-400" : "text-gray-600"
        }`}>
          {t("joinToday")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={theme === "dark" ? "text-slate-300" : ""}>
            {t("email")}
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""} 
                ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" : ""}`}
            />
            {errors.email && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm mt-1 flex items-center gap-1 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={theme === "dark" ? "text-slate-300" : ""}>
            {t("password")}
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""} 
                ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-300" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm mt-1 flex items-center gap-1 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                <AlertCircle size={14} />
                <span>{errors.password}</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={theme === "dark" ? "text-slate-300" : ""}>
            {t("confirmPassword")}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""} 
                ${theme === "dark" ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-300" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm mt-1 flex items-center gap-1 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                <AlertCircle size={14} />
                <span>{errors.confirmPassword}</span>
              </motion.div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 mt-4"
          variant={theme === "dark" ? "gradient" : "default"}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
              <span>{t("creatingAccount")}</span>
            </div>
          ) : (
            t("signUp")
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${
              theme === "dark" ? "border-slate-600" : "border-gray-300"
            }`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${
              theme === "dark" 
                ? "bg-slate-800 text-slate-400" 
                : "bg-white text-gray-500"
            }`}>
              {t("orContinueWith")}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-center ${
              theme === "dark" 
                ? "bg-slate-700 text-white border-slate-600 hover:bg-slate-600" 
                : ""
            }`}
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
        </div>
      </div>

      <div className={`mt-6 text-center ${
        theme === "dark" ? "text-slate-400" : ""
      }`}>
        <p className="text-sm">
          {t("alreadyHaveAccount")}{" "}
          <button
            type="button"
            onClick={onSwitch}
            className={`font-medium ${
              theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {t("signIn")}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupForm;
