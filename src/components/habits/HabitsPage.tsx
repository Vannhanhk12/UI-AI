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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("habitsTracker")}</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder={t("selectTimeRange")} />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  <SelectItem value="week" className="dark:text-white dark:focus:bg-gray-700">{t("thisWeek")}</SelectItem>
                  <SelectItem value="month" className="dark:text-white dark:focus:bg-gray-700">{t("thisMonth")}</SelectItem>
                  <SelectItem value="quarter" className="dark:text-white dark:focus:bg-gray-700">{t("thisQuarter")}</SelectItem>
                  <SelectItem value="year" className="dark:text-white dark:focus:bg-gray-700">{t("thisYear")}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus size={16} />
                {t("addHabit")}
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("totalHabits")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Repeat className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{totalHabits}</div>
                    <p className="text-xs text-blue-600 dark:text-blue-300 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {dailyHabits} {t("daily")}, {weeklyHabits} {t("weekly")}
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("completionRate")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <div className="text-3xl font-bold dark:text-white">
                        {averageCompletionRate}%
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-300 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5% {t("fromLastWeek")}
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("longestStreak")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 dark:bg-orange-900 p-2">
                    <Target className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">
                      {Math.max(...habits.map((h) => h.streak))} {t("days")}
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-300 flex items-center">
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("topCategory")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                    <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">Health</div>
                    <p className="text-xs text-purple-600 dark:text-purple-300 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />2 {t("habitsInCategory")}
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
            <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">{t("myHabits")}</CardTitle>
                  <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList className="dark:bg-gray-700">
                      <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-800 dark:text-gray-300 dark:data-[state=active]:text-white">{t("all")}</TabsTrigger>
                      <TabsTrigger value="daily" className="dark:data-[state=active]:bg-gray-800 dark:text-gray-300 dark:data-[state=active]:text-white">{t("daily")}</TabsTrigger>
                      <TabsTrigger value="weekly" className="dark:data-[state=active]:bg-gray-800 dark:text-gray-300 dark:data-[state=active]:text-white">{t("weekly")}</TabsTrigger>
                      <TabsTrigger value="monthly" className="dark:data-[state=active]:bg-gray-800 dark:text-gray-300 dark:data-[state=active]:text-white">{t("monthly")}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription className="dark:text-gray-400">
                  {t("trackHabitsRoutines")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div
                              className={`rounded-full p-2 mr-3 ${habit.streak > 0 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                            >
                              <Repeat
                                className={`h-5 w-5 ${habit.streak > 0 ? "text-green-600 dark:text-green-300" : "text-gray-400 dark:text-gray-500"}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg dark:text-white">
                                {habit.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {habit.description}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                              <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700">{t("markComplete")}</DropdownMenuItem>
                              <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-gray-700">{t("editHabit")}</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:focus:bg-gray-700">
                                {t("delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
  
                        <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
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
                          <div className="flex justify-between mb-1 text-sm dark:text-gray-300">
                            <span>{t("completionRate")}</span>
                            <span>{habit.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
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
                          <h4 className="text-sm font-medium mb-2 dark:text-gray-300">
                            {t("last7Days")}
                          </h4>
                          <div className="flex space-x-1">
                            {habit.history.slice(-7).map((day, index) => (
                              <div
                                key={index}
                                className={`h-6 w-6 rounded-sm flex items-center justify-center text-xs ${day.completed ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"}`}
                                title={`${day.date}: ${day.completed ? t("completed") : t("missed")}`}
                              >
                                {day.completed ? "✓" : "×"}
                              </div>
                            ))}
                          </div>
                        </div>
  
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {t("currentStreak")}: {habit.streak} {t("days")}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${habit.history[habit.history.length - 1]?.completed ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400" : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"}`}
                            disabled={
                              habit.history[habit.history.length - 1]?.completed
                            }
                          >
                            {habit.history[habit.history.length - 1]?.completed
                              ? t("completedToday")
                              : t("markComplete")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  <Plus size={16} />
                  {t("addNewHabit")}
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
            <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-900">
              <CardHeader>
                <CardTitle className="dark:text-white">{t("todaysHabits")}</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {t("completeHabitsToMaintain")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center ${habit.completed ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                          >
                            {habit.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium dark:text-white">{habit.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
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
                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                          >
                            {t("complete")}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4">
                <div className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-medium mb-1">{t("habitScience")}</div>
                  <p>
                    {t("habitFormationTime")}
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
          <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-800 dark:to-purple-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    {t("scienceOfHabitFormation")}
                  </h2>
                  <p className="mb-4">
                    {t("atomicHabitsDescription")}
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
                  >
                    {t("learnMoreAboutHabitScience")}
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 dark:bg-white/5 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">1%</div>
                  <p className="text-center text-sm">
                    {t("onePercentBetterCompound")}
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
