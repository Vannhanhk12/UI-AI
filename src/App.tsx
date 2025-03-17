// src/App.tsx
import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/home";
import routes from "tempo-routes";
import DashboardLayout from "./components/layout/DashboardLayout";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const TaskForm = lazy(() => import("./components/dashboard/TaskForm"));
const Profile = lazy(() => import("./components/profile/Profile"));
const About = lazy(() => import("./components/about/About"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const TasksPage = lazy(() => import("./components/tasks/TaskPage"));
const GoogleAuthCallback = lazy(() => import("./components/auth/GoogleAuthCallback"));

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
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
            
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
              <Route path="/expenses" element={<div>Expenses Page</div>} /> 
              <Route path="/goals" element={<div>Goals Page</div>} />
              <Route path="/streaks" element={<div>Streaks Page</div>} />
              <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
              <Route path="/habits" element={<div>Habits Page</div>} />
              <Route path="/ai-chat" element={<div>AI Assistant Page</div>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Add a redirect for any other routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;