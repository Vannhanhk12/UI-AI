import React from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your backend
  const stats = {
    completedTasks: 24,
    pendingTasks: 7,
    productivity: 78,
    currentStreak: 5,
    longestStreak: 12,
  };

  const recentTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      status: "completed",
      dueDate: "2023-06-10",
      priority: "high",
    },
    {
      id: 2,
      title: "Review marketing materials",
      status: "in-progress",
      dueDate: "2023-06-12",
      priority: "medium",
    },
    {
      id: 3,
      title: "Schedule team meeting",
      status: "pending",
      dueDate: "2023-06-15",
      priority: "low",
    },
    {
      id: 4,
      title: "Update documentation",
      status: "in-progress",
      dueDate: "2023-06-11",
      priority: "high",
    },
  ];

  const handleCreateTask = () => {
    navigate("/tasks/new");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button
              onClick={handleCreateTask}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle size={16} />
              Create New Task
            </Button>
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
                  Completed Tasks
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
                      12% from last week
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
                  Pending Tasks
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
                      <ArrowUpRight className="h-3 w-3 mr-1" />3 due today
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
                  Productivity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <div className="text-3xl font-bold">
                        {stats.productivity}%
                      </div>
                      <span className="text-xs text-blue-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5%
                      </span>
                    </div>
                    <Progress value={stats.productivity} className="h-2" />
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
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <Flame className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {stats.currentStreak} days
                    </div>
                    <p className="text-xs text-purple-600">
                      Longest: {stats.longestStreak} days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <CardTitle>Recent Tasks</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Your most recent tasks and their status
                </CardDescription>
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
                  Add New Task
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Streak calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>Activity Streak</CardTitle>
                <CardDescription>
                  Your daily task completion record
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StreakCalendar />
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                    <span>1-3 tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                    <span>4-6 tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                    <span>7+ tasks</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Performance chart */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Performance Overview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Weekly
                  </Button>
                  <Button variant="ghost" size="sm">
                    Monthly
                  </Button>
                  <Button variant="ghost" size="sm">
                    Yearly
                  </Button>
                </div>
              </div>
              <CardDescription>
                Track your task completion rate over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="mt-2">
                    Performance chart visualization would appear here
                  </p>
                  <p className="text-sm text-gray-400">
                    Connects to your task history data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
