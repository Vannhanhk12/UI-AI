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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900">Goals Tracker</h1>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              <Plus size={16} />
              Create New Goal
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
                  Total Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{goals.length}</div>
                    <p className="text-xs text-purple-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />2 new this month
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
                  Completed Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{completedGoals}</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((completedGoals / goals.length) * 100)}%
                      completion rate
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
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{inProgressGoals}</div>
                    <p className="text-xs text-blue-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.round((inProgressGoals / goals.length) * 100)}% of
                      total goals
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
                  Milestone Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-amber-100 p-2">
                    <Target className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <div className="text-3xl font-bold">
                        {completedMilestones}/{totalMilestones}
                      </div>
                      <span className="text-xs text-amber-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {Math.round(
                          (completedMilestones / totalMilestones) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(completedMilestones / totalMilestones) * 100}
                      className="h-2"
                    />
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
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Goals</CardTitle>
                  <Tabs defaultValue="active" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>
                  Track your progress towards your personal and professional
                  goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {goal.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {goal.description}
                            </p>
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
                              <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                              <DropdownMenuItem>Add Milestone</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            Due: {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {goal.category}
                          </span>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
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
                          <h4 className="text-sm font-medium mb-2">
                            Recent Milestones
                          </h4>
                          <div className="space-y-2">
                            {goal.milestones.slice(0, 3).map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`h-4 w-4 rounded-full mr-2 flex items-center justify-center ${milestone.completed ? "bg-green-100" : "bg-gray-100"}`}
                                  >
                                    {milestone.completed && (
                                      <CheckCircle className="h-3 w-3 text-green-600" />
                                    )}
                                  </div>
                                  <span
                                    className={
                                      milestone.completed
                                        ? "line-through text-gray-400"
                                        : ""
                                    }
                                  >
                                    {milestone.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    milestone.dueDate,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {goal.milestones.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-blue-600 hover:text-blue-800 p-0 h-auto"
                          >
                            View all {goal.milestones.length} milestones
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
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
                  Add New Goal
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
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>
                  Your next steps towards achieving your goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium">{milestone.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Part of: {milestone.goalTitle}
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-gray-500">
                          Due:{" "}
                          {new Date(milestone.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full text-center text-sm text-gray-500">
                  Completing milestones regularly increases your chances of
                  achieving goals by 80%
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
          <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-2xl font-bold mb-2">
                    Goal Setting Science
                  </h2>
                  <p className="mb-4">
                    Research shows that people who explicitly set goals are 10x
                    more likely to achieve them than those who don't. Breaking
                    down goals into smaller milestones activates your brain's
                    reward system with each completion.
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Learn More About Goal Science
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/10 rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">42%</div>
                  <p className="text-center text-sm">
                    Higher success rate when goals are tracked visually and
                    reviewed weekly
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
