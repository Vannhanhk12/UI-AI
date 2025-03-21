import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Trophy,
  Calendar,
  Plus,
  ArrowUpRight,
  CheckCircle,
  Clock,
  MoreHorizontal,
  ChevronRight,
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
import { useTranslation } from "react-i18next";

interface Streak {
  id: number;
  title: string;
  description: string;
  currentStreak: number;
  longestStreak: number;
  category: string;
  lastCompleted: string;
  history: StreakDay[];
  totalCompletions: number;
}

interface StreakDay {
  date: string;
  completed: boolean;
}

const StreaksPage = () => {
  const [activeTab, setActiveTab] = useState("active");
    const { t } = useTranslation();

  // Mock data
  const streaks: Streak[] = [
    {
      id: 1,
      title: "Daily Coding Practice",
      description: "Solve at least one coding problem every day",
      currentStreak: 12,
      longestStreak: 30,
      category: "Education",
      lastCompleted: "2023-06-15",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.2,
      })),
      totalCompletions: 45,
    },
    {
      id: 2,
      title: "Morning Meditation",
      description: "Meditate for 10 minutes every morning",
      currentStreak: 5,
      longestStreak: 21,
      category: "Wellness",
      lastCompleted: "2023-06-15",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.3,
      })),
      totalCompletions: 32,
    },
    {
      id: 3,
      title: "Read 30 Minutes",
      description: "Read a book for at least 30 minutes",
      currentStreak: 8,
      longestStreak: 14,
      category: "Personal",
      lastCompleted: "2023-06-15",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.25,
      })),
      totalCompletions: 28,
    },
    {
      id: 4,
      title: "Exercise",
      description: "Exercise for at least 30 minutes",
      currentStreak: 3,
      longestStreak: 18,
      category: "Health",
      lastCompleted: "2023-06-15",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: Math.random() > 0.35,
      })),
      totalCompletions: 25,
    },
    {
      id: 5,
      title: "Language Learning",
      description: "Practice new language for 15 minutes",
      currentStreak: 0,
      longestStreak: 10,
      category: "Education",
      lastCompleted: "2023-06-12",
      history: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: i < 27 && Math.random() > 0.4,
      })),
      totalCompletions: 18,
    },
  ];

  // Filter streaks based on active tab
  const filteredStreaks = streaks.filter((streak) => {
    if (activeTab === "active") return streak.currentStreak > 0;
    if (activeTab === "broken") return streak.currentStreak === 0;
    return true; // 'all' tab
  });

  // Calculate stats
  const totalActiveStreaks = streaks.filter(
    (streak) => streak.currentStreak > 0,
  ).length;
  const longestCurrentStreak = Math.max(
    ...streaks.map((streak) => streak.currentStreak),
  );
  const totalCompletions = streaks.reduce(
    (acc, streak) => acc + streak.totalCompletions,
    0,
  );
  const streakWithLongestHistory = streaks.reduce((prev, current) =>
    prev.longestStreak > current.longestStreak ? prev : current,
  );

  // Get today's streaks
  const todayStreaks = streaks.map((streak) => ({
    id: streak.id,
    title: streak.title,
    completed: streak.history[streak.history.length - 1].completed,
    category: streak.category,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t("streakTracker")}</h1>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              <Plus size={16} />
              {t("createNewStreak")}
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
                  {t("activeStreaks")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 p-2">
                    <Flame className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {totalActiveStreaks}
                    </div>
                    <p className="text-xs text-orange-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((totalActiveStreaks / streaks.length) * 100)}%
                      {t("activeRate")}
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
                  {t("longestCurrentStreak")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-red-100 p-2">
                    <Trophy className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {longestCurrentStreak} {t("days")}
                    </div>
                    <p className="text-xs text-red-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {t("dailyCodingPractice")}
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
                  {t("allTimeRecord")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {streakWithLongestHistory.longestStreak} {t("days")}
                    </div>
                    <p className="text-xs text-purple-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {streakWithLongestHistory.title}
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
                  {t("totalCompletions")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalCompletions}</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {t("acrossAllHabits")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
  
        {/* Streaks and Today's Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Streaks List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t("myStreaks")}</CardTitle>
                  <Tabs defaultValue="active" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="active">{t("active")}</TabsTrigger>
                      <TabsTrigger value="broken">{t("broken")}</TabsTrigger>
                      <TabsTrigger value="all">{t("all")}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>
                  {t("trackDailyHabits")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStreaks.map((streak) => (
                    <div
                      key={streak.id}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div
                              className={`rounded-full p-2 mr-3 ${streak.currentStreak > 0 ? "bg-orange-100" : "bg-gray-100"}`}
                            >
                              <Flame
                                className={`h-5 w-5 ${streak.currentStreak > 0 ? "text-orange-600" : "text-gray-400"}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {streak.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {streak.description}
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
                              <DropdownMenuItem>{t("markComplete")}</DropdownMenuItem>
                              <DropdownMenuItem>{t("editStreak")}</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                {t("delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
  
                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <Flame className="h-4 w-4 mr-1" />
                            {t("current")}: {streak.currentStreak} {t("days")}
                          </span>
                          <span className="flex items-center mr-4">
                            <Trophy className="h-4 w-4 mr-1" />
                            {t("best")}: {streak.longestStreak} {t("days")}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {streak.category}
                          </span>
                        </div>
  
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            {t("last10Days")}
                          </h4>
                          <div className="flex space-x-1">
                            {streak.history.slice(-10).map((day, index) => (
                              <div
                                key={index}
                                className={`h-6 w-6 rounded-sm flex items-center justify-center text-xs ${day.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                                title={`${day.date}: ${day.completed ? t("completed") : t("missed")}`}
                              >
                                {day.completed ? "✓" : "×"}
                              </div>
                            ))}
                          </div>
                        </div>
  
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {streak.totalCompletions} {t("totalCompletionsCount")}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${streak.history[streak.history.length - 1].completed ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"}`}
                            disabled={
                              streak.history[streak.history.length - 1]
                                .completed
                            }
                          >
                            {streak.history[streak.history.length - 1].completed
                              ? t("completedToday")
                              : t("markComplete")}
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
                  {t("addNewStreak")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
  
          {/* Today's Streaks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>{t("todaysHabits")}</CardTitle>
                <CardDescription>
                  {t("completeTasksToMaintain")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayStreaks.map((streak) => (
                    <div
                      key={streak.id}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center ${streak.completed ? "bg-green-100" : "bg-gray-100"}`}
                          >
                            {streak.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{streak.title}</h3>
                            <p className="text-xs text-gray-500">
                              {streak.category}
                            </p>
                          </div>
                        </div>
                        {!streak.completed && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          >
                            {t("complete")}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full text-center text-sm text-gray-500">
                  <div className="font-medium mb-1">{t("streakScience")}</div>
                  <p>
                    {t("maintainingStreak66Days")}
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
          <Card className="border-none shadow-md bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    {t("scienceOfHabitFormation")}
                  </h2>
                  <p className="mb-4">
                    {t("habitFormationDesc")}
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    {t("learnMoreAboutHabitScience")}
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">21x</div>
                  <p className="text-center text-sm">
                    {t("visualStreakTrackingBenefit")}
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

export default StreaksPage;
