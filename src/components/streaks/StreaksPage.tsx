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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("streakTracker")}</h1>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 mt-4 md:mt-0">
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("activeStreaks")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 dark:bg-orange-900 p-2">
                    <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{totalActiveStreaks}</div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center">
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("longestCurrentStreak")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-red-100 dark:bg-red-900 p-2">
                    <Trophy className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">
                      {longestCurrentStreak} {t("days")}
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("allTimeRecord")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">
                      {streakWithLongestHistory.longestStreak} {t("days")}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
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
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("totalCompletions")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{totalCompletions}</div>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
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
            <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">{t("myStreaks")}</CardTitle>
                  <Tabs defaultValue="active" onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6 dark:bg-gray-700">
                      <TabsTrigger value="active" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("active")}</TabsTrigger>
                      <TabsTrigger value="broken" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("broken")}</TabsTrigger>
                      <TabsTrigger value="all" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("all")}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription className="dark:text-gray-300">
                  {t("trackDailyHabits")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStreaks.map((streak) => (
                    <Card
                      key={streak.id}
                      className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="dark:text-white">{streak.title}</CardTitle>
                            <CardDescription className="dark:text-gray-300">
                              {streak.description}
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("editStreak")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("markComplete")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("deleteStreak")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-2 mr-3">
                              <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-300">{t("currentStreak")}</p>
                              <h3 className="text-xl font-bold dark:text-white">
                                {streak.currentStreak} {t("days")}
                              </h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-300">{t("longest")}</p>
                            <h3 className="text-xl font-bold dark:text-white">
                              {streak.longestStreak} {t("days")}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            {t("lastMonthActivity")}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {streak.history.map((day, index) => (
                              <div
                                key={index}
                                className={`w-6 h-6 rounded-sm ${
                                  day.completed
                                    ? "bg-green-500 dark:bg-green-600"
                                    : "bg-gray-200 dark:bg-gray-600"
                                }`}
                                title={`${day.date}: ${
                                  day.completed ? t("completed") : t("missed")
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-300">{t("category")}: </span>
                            <span className="font-medium dark:text-white">{streak.category}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-300">{t("completed")}: </span>
                            <span className="font-medium dark:text-white">{streak.totalCompletions} {t("times")}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t dark:border-gray-700 pt-4 flex justify-between">
                        <Button
                          variant="outline"
                          className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                        >
                          {t("viewDetails")}
                        </Button>
                        {streak.currentStreak === 0 ? (
                          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                            {t("restart")}
                          </Button>
                        ) : (
                          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                            {t("markComplete")}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
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
            <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{t("todayStreaks")}</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t("todayStreaksDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {todayStreaks.map((streak) => (
                    <div
                      key={streak.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className={`mr-4 rounded-full p-2 ${
                          streak.completed
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          {streak.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium dark:text-white">{streak.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {streak.category} • {streak.completed ? t("completed") : t("notCompleted")}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={streak.completed ? "ghost" : "outline"}
                        size="sm"
                        className={
                          streak.completed
                            ? "text-green-600 dark:text-green-400 hover:text-green-700"
                            : "dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                        }
                      >
                        {streak.completed ? t("completed") : t("markDone")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4">
                <div className="w-full text-center text-sm text-gray-500 dark:text-gray-300">
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
          <Card className="border-none shadow-md bg-gradient-to-r from-orange-500 to-red-500 text-white dark:bg-gray-800 dark:text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2 dark:text-white">
                    {t("scienceOfHabitFormation")}
                  </h2>
                  <p className="mb-4 dark:text-gray-300">
                    {t("habitFormationDesc")}
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {t("learnMoreAboutHabitScience")}
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2 dark:text-white">21x</div>
                  <p className="text-center text-sm dark:text-gray-300">
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
