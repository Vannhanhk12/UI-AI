import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Medal,
  Users,
  Award,
  Crown,
  ArrowUpRight,
  Filter,
  ChevronUp,
  ChevronDown,
  Flame,
  CheckCircle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  tasksCompleted: number;
  streakDays: number;
  badges: string[];
  change: "up" | "down" | "same";
  changeAmount: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  users: number;
}

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [category, setCategory] = useState("all");
  const { t } = useTranslation();

  // Mock data for users
  const users: User[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      points: 1250,
      rank: 1,
      tasksCompleted: 48,
      streakDays: 15,
      badges: ["early-adopter", "streak-master", "task-machine"],
      change: "same",
      changeAmount: 0,
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      points: 1180,
      rank: 2,
      tasksCompleted: 42,
      streakDays: 12,
      badges: ["early-adopter", "streak-master"],
      change: "up",
      changeAmount: 1,
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      points: 1050,
      rank: 3,
      tasksCompleted: 39,
      streakDays: 10,
      badges: ["task-machine", "goal-crusher"],
      change: "down",
      changeAmount: 1,
    },
    {
      id: 4,
      name: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      points: 980,
      rank: 4,
      tasksCompleted: 36,
      streakDays: 8,
      badges: ["early-adopter"],
      change: "up",
      changeAmount: 2,
    },
    {
      id: 5,
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      points: 920,
      rank: 5,
      tasksCompleted: 34,
      streakDays: 7,
      badges: ["goal-crusher"],
      change: "down",
      changeAmount: 1,
    },
    {
      id: 6,
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      points: 880,
      rank: 6,
      tasksCompleted: 32,
      streakDays: 6,
      badges: ["early-adopter"],
      change: "up",
      changeAmount: 3,
    },
    {
      id: 7,
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      points: 820,
      rank: 7,
      tasksCompleted: 30,
      streakDays: 5,
      badges: ["task-machine"],
      change: "same",
      changeAmount: 0,
    },
    {
      id: 8,
      name: "Sophia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      points: 780,
      rank: 8,
      tasksCompleted: 28,
      streakDays: 4,
      badges: [],
      change: "up",
      changeAmount: 1,
    },
    {
      id: 9,
      name: "Daniel Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      points: 720,
      rank: 9,
      tasksCompleted: 26,
      streakDays: 3,
      badges: ["early-adopter"],
      change: "down",
      changeAmount: 2,
    },
    {
      id: 10,
      name: "Olivia Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      points: 650,
      rank: 10,
      tasksCompleted: 24,
      streakDays: 2,
      badges: [],
      change: "up",
      changeAmount: 4,
    },
  ];

  // Mock data for badges
  const badges: Badge[] = [
    {
      id: "early-adopter",
      name: "Early Adopter",
      description: "Joined during the first month of launch",
      icon: <Award className="h-5 w-5" />,
      rarity: "rare",
      users: 42,
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintained a streak for 10+ days",
      icon: <Flame className="h-5 w-5" />,
      rarity: "uncommon",
      users: 78,
    },
    {
      id: "task-machine",
      name: "Task Machine",
      description: "Completed 30+ tasks in a week",
      icon: <CheckCircle className="h-5 w-5" />,
      rarity: "rare",
      users: 35,
    },
    {
      id: "goal-crusher",
      name: "Goal Crusher",
      description: "Completed 5+ goals ahead of schedule",
      icon: <Target className="h-5 w-5" />,
      rarity: "epic",
      users: 12,
    },
    {
      id: "productivity-guru",
      name: "Productivity Guru",
      description: "Achieved 90%+ productivity score for a month",
      icon: <TrendingUp className="h-5 w-5" />,
      rarity: "legendary",
      users: 5,
    },
  ];

  // Get current user (for this demo, we'll assume it's the 4th user)
  const currentUser = users[3];

  // Get top 3 users
  const topUsers = users.slice(0, 3);

  // Get users around current user
  const getUsersAroundCurrent = () => {
    const currentIndex = users.findIndex((user) => user.id === currentUser.id);
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(users.length, currentIndex + 2);
    return users.slice(start, end);
  };

  const usersAroundCurrent = getUsersAroundCurrent();

  // Function to render rank change indicator
  const renderRankChange = (change: "up" | "down" | "same", amount: number) => {
    if (change === "same") return null;

    return change === "up" ? (
      <span className="flex items-center text-green-600 dark:text-green-400 text-xs">
        <ChevronUp className="h-3 w-3" />
        {amount}
      </span>
    ) : (
      <span className="flex items-center text-red-600 dark:text-red-400 text-xs">
        <ChevronDown className="h-3 w-3" />
        {amount}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("leaderboard")}</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem value="all" className="dark:text-white dark:focus:bg-gray-600">{t("allCategories")}</SelectItem>
                  <SelectItem value="tasks" className="dark:text-white dark:focus:bg-gray-600">{t("tasksCompleted")}</SelectItem>
                  <SelectItem value="streaks" className="dark:text-white dark:focus:bg-gray-600">{t("streakDays")}</SelectItem>
                  <SelectItem value="goals" className="dark:text-white dark:focus:bg-gray-600">{t("goalsAchieved")}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <Filter size={16} />
                {t("filter")}
              </Button>
            </div>
          </div>
        </div>
      </header>
  
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Users Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6 dark:text-white">{t("topPerformers")}</h2>
            <div className="flex flex-col md:flex-row items-end justify-center gap-4 w-full">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16 border-2 border-gray-200 dark:border-gray-600">
                  <AvatarImage
                    src={topUsers[1].avatar}
                    alt={topUsers[1].name}
                  />
                  <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                    {topUsers[1].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-2 text-center">
                  <div className="font-semibold dark:text-white">{topUsers[1].name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {topUsers[1].points} {t("pts")}
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 h-24 w-full md:w-24 rounded-t-lg mt-2 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                  <span className="text-xl font-bold ml-1 dark:text-white">2</span>
                </div>
              </div>
  
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Crown className="h-6 w-6 text-yellow-500 absolute -top-8 left-1/2 transform -translate-x-1/2" />
                  <Avatar className="h-20 w-20 border-4 border-yellow-400 dark:border-yellow-500">
                    <AvatarImage
                      src={topUsers[0].avatar}
                      alt={topUsers[0].name}
                    />
                    <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                      {topUsers[0].name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-semibold dark:text-white">{topUsers[0].name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {topUsers[0].points} {t("pts")}
                  </div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 h-32 w-full md:w-24 rounded-t-lg mt-2 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-yellow-500" />
                  <span className="text-xl font-bold ml-1 dark:text-white">1</span>
                </div>
              </div>
  
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16 border-2 border-gray-200 dark:border-gray-600">
                  <AvatarImage
                    src={topUsers[2].avatar}
                    alt={topUsers[2].name}
                  />
                  <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                    {topUsers[2].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-2 text-center">
                  <div className="font-semibold dark:text-white">{topUsers[2].name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {topUsers[2].points} {t("pts")}
                  </div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 h-16 w-full md:w-24 rounded-t-lg mt-2 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-orange-500" />
                  <span className="text-xl font-bold ml-1 dark:text-white">3</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
  
        {/* Tabs for different time periods */}
        <Tabs
          defaultValue="weekly"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6 dark:bg-gray-700">
            <TabsTrigger value="weekly" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("weekly")}</TabsTrigger>
            <TabsTrigger value="monthly" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("monthly")}</TabsTrigger>
            <TabsTrigger value="alltime" className="dark:text-white dark:data-[state=active]:bg-gray-600">{t("allTime")}</TabsTrigger>
          </TabsList>
  
          <TabsContent value="weekly" className="space-y-6">
            {/* Your Position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:bg-gray-800 dark:text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                      <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-600 mr-4">
                        <AvatarImage
                          src={currentUser.avatar}
                          alt={currentUser.name}
                        />
                        <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                          {currentUser.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold dark:text-white">{t("yourPosition")}</h3>
                        <p className="text-blue-100 dark:text-blue-200">
                          {t("keepGoingToClimb")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold dark:text-white">
                          {currentUser.rank}
                        </div>
                        <div className="text-sm text-blue-200 dark:text-blue-300">{t("rank")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold dark:text-white">
                          {currentUser.points}
                        </div>
                        <div className="text-sm text-blue-200 dark:text-blue-300">{t("points")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold dark:text-white">
                          {currentUser.tasksCompleted}
                        </div>
                        <div className="text-sm text-blue-200 dark:text-blue-300">{t("tasks")}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
  
            {/* Full Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">{t("weeklyLeaderboard")}</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    {t("rankingsBasedOnWeek")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-600">
                          <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("rank")}
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("user")}
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("points")}
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("tasks")}
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("streak")}
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-300">
                            {t("badges")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700 ${user.id === currentUser.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <span className="font-semibold mr-2 dark:text-white">
                                  {user.rank}
                                </span>
                                {renderRankChange(
                                  user.change,
                                  user.changeAmount,
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                                    {user.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium dark:text-white">{user.name}</span>
                                {user.rank <= 3 && (
                                  <span className="ml-2">
                                    {user.rank === 1 && (
                                      <Crown className="h-4 w-4 text-yellow-500" />
                                    )}
                                    {user.rank === 2 && (
                                      <Medal className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                                    )}
                                    {user.rank === 3 && (
                                      <Medal className="h-4 w-4 text-orange-500" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-semibold dark:text-white">
                              {user.points}
                            </td>
                            <td className="py-3 px-4 text-right dark:text-white">
                              {user.tasksCompleted}
                            </td>
                            <td className="py-3 px-4 text-right dark:text-white">
                              {user.streakDays} {t("days")}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-1">
                                {user.badges
                                  .slice(0, 3)
                                  .map((badgeId, index) => {
                                    const badge = badges.find(
                                      (b) => b.id === badgeId,
                                    );
                                    return badge ? (
                                      <div
                                        key={index}
                                        className="h-6 w-6 rounded-full flex items-center justify-center"
                                        style={{
                                          backgroundColor:
                                            badge.rarity === "legendary"
                                              ? "#FEF3C7"
                                              : badge.rarity === "epic"
                                                ? "#EDE9FE"
                                                : badge.rarity === "rare"
                                                  ? "#DBEAFE"
                                                  : badge.rarity === "uncommon"
                                                    ? "#D1FAE5"
                                                    : "#F3F4F6",
                                        }}
                                        title={badge.name}
                                      >
                                        {badge.icon}
                                      </div>
                                    ) : null;
                                  })}
                                {user.badges.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                    +{user.badges.length - 3}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="border-t dark:border-gray-700 pt-4">
                  <div className="w-full text-center text-sm text-gray-500 dark:text-gray-300">
                    {t("rankingsUpdate")}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
  
          <TabsContent value="monthly">
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{t("monthlyLeaderboard")}</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t("rankingsBasedOnMonth")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                  {t("monthlyLeaderboardData")}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="alltime">
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{t("allTimeLeaderboard")}</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t("rankingsBasedOnAllTime")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                  {t("allTimeLeaderboardData")}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LeaderboardPage;
