import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Plus,
  CheckCircle,
  Clock,
  Calendar,
  ArrowUpRight,
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

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: string;
  milestones: Milestone[];
}

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

const GoalsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const { t } = useTranslation();

  // Mock data
  const goals: Goal[] = [
    {
      id: 1,
      title: "Complete Web Development Course",
      description: "Finish the full-stack web development bootcamp",
      deadline: "2023-08-15",
      progress: 65,
      category: "Education",
      milestones: [
        {
          id: 1,
          title: "HTML & CSS Basics",
          completed: true,
          dueDate: "2023-06-01",
        },
        {
          id: 2,
          title: "JavaScript Fundamentals",
          completed: true,
          dueDate: "2023-06-15",
        },
        {
          id: 3,
          title: "React Framework",
          completed: true,
          dueDate: "2023-07-01",
        },
        {
          id: 4,
          title: "Backend Development",
          completed: false,
          dueDate: "2023-07-15",
        },
        {
          id: 5,
          title: "Final Project",
          completed: false,
          dueDate: "2023-08-10",
        },
      ],
    },
    {
      id: 2,
      title: "Save $5,000 for Emergency Fund",
      description: "Build an emergency fund for unexpected expenses",
      deadline: "2023-12-31",
      progress: 40,
      category: "Finance",
      milestones: [
        {
          id: 1,
          title: "Save first $1,000",
          completed: true,
          dueDate: "2023-03-31",
        },
        {
          id: 2,
          title: "Reach $2,000",
          completed: true,
          dueDate: "2023-06-30",
        },
        {
          id: 3,
          title: "Reach $3,500",
          completed: false,
          dueDate: "2023-09-30",
        },
        {
          id: 4,
          title: "Reach $5,000",
          completed: false,
          dueDate: "2023-12-31",
        },
      ],
    },
    {
      id: 3,
      title: "Run a Half Marathon",
      description: "Train and complete a half marathon race",
      deadline: "2023-10-10",
      progress: 30,
      category: "Health",
      milestones: [
        {
          id: 1,
          title: "Run 5K without stopping",
          completed: true,
          dueDate: "2023-05-15",
        },
        {
          id: 2,
          title: "Run 10K under 60 minutes",
          completed: false,
          dueDate: "2023-07-15",
        },
        {
          id: 3,
          title: "Run 15K under 90 minutes",
          completed: false,
          dueDate: "2023-08-30",
        },
        {
          id: 4,
          title: "Complete half marathon",
          completed: false,
          dueDate: "2023-10-10",
        },
      ],
    },
    {
      id: 4,
      title: "Read 12 Books This Year",
      description: "Read one book per month to expand knowledge",
      deadline: "2023-12-31",
      progress: 50,
      category: "Personal",
      milestones: [
        {
          id: 1,
          title: "Books 1-3 (Q1)",
          completed: true,
          dueDate: "2023-03-31",
        },
        {
          id: 2,
          title: "Books 4-6 (Q2)",
          completed: true,
          dueDate: "2023-06-30",
        },
        {
          id: 3,
          title: "Books 7-9 (Q3)",
          completed: false,
          dueDate: "2023-09-30",
        },
        {
          id: 4,
          title: "Books 10-12 (Q4)",
          completed: false,
          dueDate: "2023-12-31",
        },
      ],
    },
  ];

  // Filter goals based on active tab
  const filteredGoals = goals.filter((goal) => {
    if (activeTab === "active") return goal.progress < 100;
    if (activeTab === "completed") return goal.progress === 100;
    return true; // 'all' tab
  });

  // Calculate stats
  const completedGoals = goals.filter((goal) => goal.progress === 100).length;
  const inProgressGoals = goals.filter(
    (goal) => goal.progress > 0 && goal.progress < 100,
  ).length;
  const notStartedGoals = goals.filter((goal) => goal.progress === 0).length;
  const totalMilestones = goals.reduce(
    (acc, goal) => acc + goal.milestones.length,
    0,
  );
  const completedMilestones = goals.reduce(
    (acc, goal) =>
      acc + goal.milestones.filter((milestone) => milestone.completed).length,
    0,
  );

  // Get upcoming milestones
  const upcomingMilestones = goals
    .flatMap((goal) =>
      goal.milestones
        .filter((milestone) => !milestone.completed)
        .map((milestone) => ({
          ...milestone,
          goalTitle: goal.title,
          goalId: goal.id,
        })),
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("goalsTracker")}</h1>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 mt-4 md:mt-0">
              <Plus size={16} />
              {t("createNewGoal")}
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
                  {t("totalGoals")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{goals.length}</div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      2 {t("newThisMonth")}
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
                  {t("completedGoals")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{completedGoals}</div>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((completedGoals / goals.length) * 100)}%
                      {t("completionRate")}
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
                  {t("inProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{inProgressGoals}</div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((inProgressGoals / goals.length) * 100)}% {t("ofTotalGoals")}
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
                  {t("milestoneProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-100 dark:bg-amber-900 p-2">
                    <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">
                      {completedMilestones}/{totalMilestones}
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((completedMilestones / totalMilestones) * 100)}%
                      {t("complete")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
  
        {/* Goals and Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Goals List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">{t("myGoals")}</CardTitle>
                  <Tabs defaultValue="active" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6 dark:bg-gray-700">
                      <TabsTrigger value="active" className="dark:text-white dark:hover:bg-gray-700">
                        {t("active")}
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="dark:text-white dark:hover:bg-gray-700">
                        {t("completed")}
                      </TabsTrigger>
                      <TabsTrigger value="all" className="dark:text-white dark:hover:bg-gray-700">
                        {t("all")}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription className="dark:text-gray-300">
                  {t("trackYourProgress")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg dark:text-white">
                              {goal.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                              {goal.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("editGoal")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("addMilestone")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                                {t("deleteGoal")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
  
                        <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-300">
                          <span className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {t("due")}: {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {t(goal.category.toLowerCase(), goal.category)}
                          </span>
                        </div>
  
                        <div className="mt-4">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>{t("progress")}</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${goal.progress}%`,
                                backgroundColor:
                                  goal.progress < 30
                                    ? "#F59E0B"
                                    : goal.progress < 70
                                      ? "#3B82F6"
                                      : "#10B981",
                              }}
                            ></div>
                          </div>
                        </div>
  
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2 dark:text-white">
                            {t("recentMilestones")}
                          </h4>
                          <div className="space-y-2">
                            {goal.milestones.slice(0, 3).map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`h-4 w-4 rounded-full mr-2 flex items-center justify-center ${
                                      milestone.completed
                                        ? "bg-green-100 dark:bg-green-900"
                                        : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                  >
                                    {milestone.completed && (
                                      <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    )}
                                  </div>
                                  <span
                                    className={
                                      milestone.completed
                                        ? "line-through text-gray-400 dark:text-gray-500"
                                        : ""
                                    }
                                  >
                                    {milestone.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(milestone.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
  
                        {goal.milestones.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 p-0 h-auto"
                          >
                            {t("viewAllMilestones", { count: goal.milestones.length })}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <Plus size={16} />
                  {t("addNewGoal")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
  
          {/* Upcoming Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{t("upcomingMilestones")}</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t("nextSteps")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium dark:text-white">
                            {t(milestone.title.toLowerCase(), milestone.title)}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {t("for")} {milestone.goalTitle.length > 30
                              ? milestone.goalTitle.substring(0, 30) + "..."
                              : milestone.goalTitle}{" "}
                            • {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 dark:text-gray-400"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 pt-4">
                <div className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                  {t("milestonesCompletionTip")}
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
          <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-700 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    {t("goalSettingScience")}
                  </h2>
                  <p className="mb-4">
                    {t("goalSettingScienceDesc")}
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("learnMoreAboutGoalScience")}
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 dark:bg-gray-700/10 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">42%</div>
                  <p className="text-center text-sm">
                    {t("higherSuccessRate")}
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

export default GoalsPage;
