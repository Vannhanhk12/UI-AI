import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  CheckCircle,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  Repeat,
  BarChart,
  Target,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: "daily" | "weekly" | "monthly";
  timeOfDay?: "morning" | "afternoon" | "evening" | "anytime";
  daysOfWeek?: number[];
  completionRate: number;
  streak: number;
  category: string;
  createdAt: string;
  history: HabitCompletion[];
}

interface HabitCompletion {
  date: string;
  completed: boolean;
}

const HabitsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("week");

  // Mock data
  const habits: Habit[] = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "10 minutes of mindfulness meditation",
      frequency: "daily",
      timeOfDay: "morning",
      completionRate: 85,
      streak: 12,
      category: "Wellness",
      createdAt: "2023-05-01",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.2,
      })),
    },
    {
      id: 2,
      title: "Read for 30 minutes",
      description: "Read non-fiction books",
      frequency: "daily",
      timeOfDay: "evening",
      completionRate: 70,
      streak: 5,
      category: "Learning",
      createdAt: "2023-05-10",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.3,
      })),
    },
    {
      id: 3,
      title: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day",
      frequency: "daily",
      timeOfDay: "anytime",
      completionRate: 90,
      streak: 20,
      category: "Health",
      createdAt: "2023-04-15",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.1,
      })),
    },
    {
      id: 4,
      title: "Weekly meal planning",
      description: "Plan meals for the upcoming week",
      frequency: "weekly",
      daysOfWeek: [0], // Sunday
      completionRate: 75,
      streak: 6,
      category: "Organization",
      createdAt: "2023-05-20",
      history: Array.from({ length: 10 }, (_, i) => ({
        date: new Date(Date.now() - (9 - i) * 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.25,
      })),
    },
    {
      id: 5,
      title: "Exercise for 30 minutes",
      description: "Any form of physical activity",
      frequency: "daily",
      timeOfDay: "afternoon",
      completionRate: 60,
      streak: 3,
      category: "Health",
      createdAt: "2023-06-01",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.4,
      })),
    },
    {
      id: 6,
      title: "Practice guitar",
      description: "Practice for at least 20 minutes",
      frequency: "daily",
      timeOfDay: "evening",
      completionRate: 50,
      streak: 0,
      category: "Hobbies",
      createdAt: "2023-06-05",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: i < 27 && Math.random() > 0.5,
      })),
    },
  ];

  // Filter habits based on active tab
  const filteredHabits = habits.filter((habit) => {
    if (activeTab === "daily") return habit.frequency === "daily";
    if (activeTab === "weekly") return habit.frequency === "weekly";
    if (activeTab === "monthly") return habit.frequency === "monthly";
    return true; // 'all' tab
  });

  // Calculate stats
  const totalHabits = habits.length;
  const dailyHabits = habits.filter(
    (habit) => habit.frequency === "daily",
  ).length;
  const weeklyHabits = habits.filter(
    (habit) => habit.frequency === "weekly",
  ).length;
  const monthlyHabits = habits.filter(
    (habit) => habit.frequency === "monthly",
  ).length;
  const averageCompletionRate = Math.round(
    habits.reduce((sum, habit) => sum + habit.completionRate, 0) / totalHabits,
  );

  // Get today's habits
  const todayHabits = habits
    .filter((habit) => {
      // For daily habits, show all
      if (habit.frequency === "daily") return true;

      // For weekly habits, check if today is the day
      if (habit.frequency === "weekly") {
        const today = new Date().getDay();
        return habit.daysOfWeek?.includes(today);
      }

      // For monthly habits, check if today is the day of month
      if (habit.frequency === "monthly") {
        // Logic for monthly habits would go here
        return false;
      }

      return false;
    })
    .map((habit) => ({
      id: habit.id,
      title: habit.title,
      description: habit.description,
      timeOfDay: habit.timeOfDay,
      category: habit.category,
      completed: habit.history[habit.history.length - 1]?.completed || false,
    }));

  // Get categories
  const categories = Array.from(new Set(habits.map((habit) => habit.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900">Habits Tracker</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus size={16} />
                Add Habit
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
                  Total Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <Repeat className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalHabits}</div>
                    <p className="text-xs text-blue-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {dailyHabits} daily, {weeklyHabits} weekly
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
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <div className="text-3xl font-bold">
                        {averageCompletionRate}%
                      </div>
                      <span className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5% from last week
                      </span>
                    </div>
                    <Progress value={averageCompletionRate} className="h-2" />
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
                  Longest Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 p-2">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {Math.max(...habits.map((h) => h.streak))} days
                    </div>
                    <p className="text-xs text-orange-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Drink 8 glasses of water
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
                  Top Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <BarChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">Health</div>
                    <p className="text-xs text-purple-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />2 habits in this
                      category
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Habits and Today's Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Habits List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Habits</CardTitle>
                  <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>
                  Track your habits and build consistent routines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div
                              className={`rounded-full p-2 mr-3 ${habit.streak > 0 ? "bg-green-100" : "bg-gray-100"}`}
                            >
                              <Repeat
                                className={`h-5 w-5 ${habit.streak > 0 ? "text-green-600" : "text-gray-400"}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {habit.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {habit.description}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                              <DropdownMenuItem>Edit Habit</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {habit.frequency.charAt(0).toUpperCase() +
                              habit.frequency.slice(1)}
                          </span>
                          {habit.timeOfDay && (
                            <span className="flex items-center mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              {habit.timeOfDay.charAt(0).toUpperCase() +
                                habit.timeOfDay.slice(1)}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {habit.category}
                          </span>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Completion Rate</span>
                            <span>{habit.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${habit.completionRate}%`,
                                backgroundColor:
                                  habit.completionRate < 30
                                    ? "#F59E0B"
                                    : habit.completionRate < 70
                                      ? "#3B82F6"
                                      : "#10B981",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Last 7 Days
                          </h4>
                          <div className="flex space-x-1">
                            {habit.history.slice(-7).map((day, index) => (
                              <div
                                key={index}
                                className={`h-6 w-6 rounded-sm flex items-center justify-center text-xs ${day.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                                title={`${day.date}: ${day.completed ? "Completed" : "Missed"}`}
                              >
                                {day.completed ? "✓" : "×"}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Current streak: {habit.streak} days
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${habit.history[habit.history.length - 1]?.completed ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"}`}
                            disabled={
                              habit.history[habit.history.length - 1]?.completed
                            }
                          >
                            {habit.history[habit.history.length - 1]?.completed
                              ? "Completed Today"
                              : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add New Habit
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Today's Habits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>Today's Habits</CardTitle>
                <CardDescription>
                  Complete these habits to maintain your streaks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center ${habit.completed ? "bg-green-100" : "bg-gray-100"}`}
                          >
                            {habit.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{habit.title}</h3>
                            <p className="text-xs text-gray-500">
                              {habit.timeOfDay && (
                                <span className="capitalize">
                                  {habit.timeOfDay}
                                </span>
                              )}
                              {habit.timeOfDay && " • "}
                              {habit.category}
                            </p>
                          </div>
                        </div>
                        {!habit.completed && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full text-center text-sm text-gray-500">
                  <div className="font-medium mb-1">Habit Science</div>
                  <p>
                    Research shows that it takes an average of 66 days to form a
                    new habit
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    The Science of Habit Formation
                  </h2>
                  <p className="mb-4">
                    According to research by James Clear, author of "Atomic
                    Habits", small habits compound over time. The effects of
                    your habits multiply as you repeat them. They seem to make
                    little difference on any given day but the impact they
                    deliver over months and years can be enormous.
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Learn More About Habit Science
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">1%</div>
                  <p className="text-center text-sm">
                    Getting 1% better every day compounds to a 37x improvement
                    over a year
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

export default HabitsPage;
