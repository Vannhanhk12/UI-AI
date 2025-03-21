import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Task } from "@/services/taskService";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Activity,
  CheckCircle,
  Clock,
  Calendar,
  PlusCircle,
  ArrowUpRight,
  Flame,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TaskList from "./TaskList";
import StreakCalendar from "./StreakCalendar";
import TaskPieChart from "./TaskPieChart";
import RecentActivities from "./RecentActivities";
import DailyHabits from "./DailyHabits";
import Navbar from "../layout/Navbar";

type TaskStatus = "completed" | "in-progress" | "pending";
type TaskPriority = "high" | "medium" | "low";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    completedTasks: 0,
    pendingTasks: 0,
    productivity: 78,
    currentStreak: 5,
    longestStreak: 12,
    focusTime: "0 giờ",
    weeklyGoal: 68,
  });

  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/tasks?limit=4`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setRecentTasks(data.tasks);

          // Calculate stats
          const completed = data.tasks.filter(
            (task: Task) => task.status === "COMPLETED",
          ).length;
          const inProgress = data.tasks.filter(
            (task: Task) => task.status === "IN_PROGRESS",
          ).length;
          const notStarted = data.tasks.filter(
            (task: Task) => task.status === "NOT_STARTED",
          ).length;

          // Calculate total focus time from completed tasks (in hours)
          const totalMinutes = data.tasks
            .filter((task: Task) => task.status === "COMPLETED")
            .reduce(
              (acc: number, task: Task) => acc + (task.estimatedDuration || 0),
              0,
            );

          const focusHours = (totalMinutes / 60).toFixed(1);

          setStats({
            ...stats,
            completedTasks: completed,
            pendingTasks: notStarted + inProgress,
            focusTime: `${focusHours} giờ`,
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasksData();
  }, []);

  // Task pie chart data
  const taskPieData = [
    { name: "Completed", value: 65, color: "#10B981" },
    { name: "In Progress", value: 25, color: "#3B82F6" },
    { name: "Pending", value: 10, color: "#F59E0B" },
  ];

  // Recent activities data
  const recentActivities = [
    {
      activity: 'Hoàn thành Task "Phân tích dữ liệu"',
      time: "2 giờ trước",
      icon: "check",
    },
    { activity: "Đã thêm task mới", time: "3 giờ trước", icon: "plus" },
    { activity: "Chỉnh sửa mục tiêu tuần", time: "5 giờ trước", icon: "edit" },
    { activity: "Đạt 95% hiệu suất", time: "Hôm qua", icon: "chart" },
  ];

  // Daily habits data
  const dailyHabits = [
    { habit: "Đọc sách", streak: 5, target: 30, progress: 65 },
    { habit: "Tập thể dục", streak: 12, target: 30, progress: 85 },
    { habit: "Học ngoại ngữ", streak: 3, target: 30, progress: 45 },
    { habit: "Thiền", streak: 8, target: 30, progress: 72 },
  ];

  const handleCreateTask = () => {
    navigate("/tasks/new");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Header with Today's Date */}
      <header className="bg-white shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {t("dashboard")}
            </h1>
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg px-4 py-2 flex items-center"
              >
                <span className="text-sm text-gray-500">Today: </span>
                <span className="ml-2 font-medium">
                  {new Date().toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </motion.div>
              <Button
                onClick={handleCreateTask}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 ml-4"
              >
                <PlusCircle size={16} />
                {t("createNewTask")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t("completedTasks")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {stats.completedTasks}
                    </div>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12% {t("fromLastWeek")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t("pendingTasks")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-100 p-2">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {stats.pendingTasks}
                    </div>
                    <p className="text-xs text-amber-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />3 {t("dueToday")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t("focusTime")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.focusTime}</div>
                    <p className="text-xs text-blue-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +30 phút
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {t("weeklyGoal")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <div className="text-3xl font-bold">
                        {stats.weeklyGoal}%
                      </div>
                      <span className="text-xs text-purple-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5%
                      </span>
                    </div>
                    <Progress value={stats.weeklyGoal} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main content grid - First row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Task list */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t("recentTasks")}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {t("viewAll")}
                  </Button>
                </div>
                <CardDescription>{t("yourRecentTasks")}</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList tasks={recentTasks} />
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleCreateTask}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  {t("addNewTask")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Task Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TaskPieChart data={taskPieData} />
          </motion.div>
        </div>

        {/* Main content grid - Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <RecentActivities activities={recentActivities} />
          </motion.div>

          {/* Daily Habits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <DailyHabits habits={dailyHabits} />
          </motion.div>
        </div>

        {/* Streak calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6"
        >
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>{t("activityStreak")}</CardTitle>
              <CardDescription>{t("dailyTaskCompletion")}</CardDescription>
            </CardHeader>
            <CardContent>
              <StreakCalendar />
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                  <span>{t("tasks13")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                  <span>{t("tasks46")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                  <span>{t("tasks7plus")}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
