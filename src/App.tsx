import { Suspense, lazy, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";
import Home from "./components/home";
import routes from "tempo-routes";
import DashboardLayout from "./components/layout/DashboardLayout";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const TaskForm = lazy(() => import("./components/dashboard/TaskForm"));
const TaskEditPage = lazy(() => import("./components/tasks/TaskEditPage"));
const Profile = lazy(() => import("./components/profile/Profile"));
const About = lazy(() => import("./components/about/About"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const TasksPage = lazy(() => import("./components/tasks/TaskPage"));
const GoogleAuthCallback = lazy(
  () => import("./components/auth/GoogleAuthCallback"),
);
const ExpensesPage = lazy(() => import("./components/expenses/ExpensesPage"));
const GoalsPage = lazy(() => import("./components/goals/GoalsPage"));
const StreaksPage = lazy(() => import("./components/streaks/StreaksPage"));
const LeaderboardPage = lazy(
  () => import("./components/leaderboard/LeaderboardPage"),
);
const HabitsPage = lazy(() => import("./components/habits/HabitsPage"));
const BlogsPage = lazy(() => import("./components/blogs/BlogsPage"));
const AIChatPage = lazy(() => import("./components/ai-chat/AIChatPage"));

// Setup global axios interceptor for 401 handling
const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page on 401 Unauthorized
        navigate('/auth');
      }
      return Promise.reject(error);
    }
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  const navigate = useNavigate();

  // Setup axios interceptors when the app mounts
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          }
        >
          <>
            <Toaster position="top-center" richColors />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/auth/google/callback"
                element={<GoogleAuthCallback />}
              />

              {/* Public routes that don't require authentication */}
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/about" element={<About />} />

              {/* Protected routes that require authentication */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/edit/:taskId" element={<TaskEditPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/streaks" element={<StreaksPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/ai-chat" element={<AIChatPage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Add a redirect for any other routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
