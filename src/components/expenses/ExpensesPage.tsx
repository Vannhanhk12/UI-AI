import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Plus,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calendar,
  Filter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const { t } = useTranslation();

  // Mock data
  const expenses: Expense[] = [
    {
      id: 1,
      description: "Groceries",
      amount: 120,
      category: "Food",
      date: "2023-06-01",
    },
    {
      id: 2,
      description: "Electricity bill",
      amount: 85,
      category: "Utilities",
      date: "2023-06-03",
    },
    {
      id: 3,
      description: "Netflix subscription",
      amount: 15,
      category: "Entertainment",
      date: "2023-06-05",
    },
    {
      id: 4,
      description: "Gym membership",
      amount: 50,
      category: "Health",
      date: "2023-06-07",
    },
    {
      id: 5,
      description: "Restaurant dinner",
      amount: 65,
      category: "Food",
      date: "2023-06-10",
    },
    {
      id: 6,
      description: "Books",
      amount: 35,
      category: "Education",
      date: "2023-06-12",
    },
    {
      id: 7,
      description: "Gas",
      amount: 40,
      category: "Transportation",
      date: "2023-06-15",
    },
    {
      id: 8,
      description: "Movie tickets",
      amount: 25,
      category: "Entertainment",
      date: "2023-06-18",
    },
  ];

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  // Prepare data for pie chart
  const categoryData = expenses.reduce(
    (acc, expense) => {
      const existingCategory = acc.find(
        (item) => item.name === expense.category,
      );
      if (existingCategory) {
        existingCategory.value += expense.amount;
      } else {
        acc.push({ name: expense.category, value: expense.amount });
      }
      return acc;
    },
    [] as { name: string; value: number }[],
  );

  // Prepare data for bar chart
  const weeklyData = [
    { name: "Week 1", amount: 270 },
    { name: "Week 2", amount: 175 },
    { name: "Week 3", amount: 320 },
    { name: "Week 4", amount: 220 },
  ];

  // Prepare data for recent transactions
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Budget data
  const budgetData = [
    { category: "Food", budget: 300, spent: 185, remaining: 115 },
    { category: "Entertainment", budget: 100, spent: 40, remaining: 60 },
    { category: "Utilities", budget: 150, spent: 85, remaining: 65 },
    { category: "Transportation", budget: 80, spent: 40, remaining: 40 },
    { category: "Health", budget: 100, spent: 50, remaining: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("expensesTracker")}
            </h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("selectTimeRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t("thisWeek")}</SelectItem>
                  <SelectItem value="month">{t("thisMonth")}</SelectItem>
                  <SelectItem value="quarter">{t("thisQuarter")}</SelectItem>
                  <SelectItem value="year">{t("thisYear")}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                <Plus size={16} />
                {t("addExpense")}
              </Button>
            </div>
          </div>
        </div>
      </header>
  
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t("totalExpenses")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-red-100 dark:bg-red-900 p-2">
                    <DollarSign className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">${totalExpenses}</div>
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      8% {t("fromLastMonth")}
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
                  {t("biggestCategory")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Filter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">{t("food")}</div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      $185 (30% {t("ofTotal")})
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
                  {t("budgetStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <TrendingDown className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold dark:text-white">65%</div>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      $330 {t("remaining")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
  
        {/* Tabs */}
        <Tabs
          defaultValue="overview"
          className="mb-8"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="transactions">{t("transactions")}</TabsTrigger>
            <TabsTrigger value="budgets">{t("budgets")}</TabsTrigger>
          </TabsList>
  
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">{t("expenseCategories")}</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      {t("expenseCategoriesDesc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${t(name.toLowerCase())}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {categoryData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`$${value}`, t("amount")]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
  
              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="border-none shadow-md h-full dark:bg-gray-800 dark:shadow-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">{t("weeklySpending")}</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      {t("weeklySpendingDesc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyData.map(item => ({
                            ...item,
                            name: t(item.name.toLowerCase().replace(/\s+/g, ''))
                          }))}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`$${value}`, t("amount")]}
                          />
                          <Legend />
                          <Bar
                            dataKey="amount"
                            fill="#3B82F6"
                            name={t("amount")}
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
  
            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="dark:text-white">{t("recentTransactions")}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("viewAll")}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center">
                          <div
                            className="rounded-full p-2 mr-4"
                            style={{
                              backgroundColor:
                                COLORS[expense.id % COLORS.length] + "20",
                            }}
                          >
                            <DollarSign
                              className="h-5 w-5"
                              style={{
                                color: COLORS[expense.id % COLORS.length],
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium dark:text-white">
                              {t(expense.description.toLowerCase(), expense.description)}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {t(expense.category.toLowerCase())} •{" "}
                              {new Date(expense.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold dark:text-white">${expense.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Plus size={16} />
                    {t("addNewExpense")}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
  
          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">{t("allTransactions")}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    >
                      <Filter size={14} />
                      {t("filter")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    >
                      <Calendar size={14} />
                      {t("dateRange")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div
                          className="rounded-full p-2 mr-4"
                          style={{
                            backgroundColor:
                              COLORS[expense.id % COLORS.length] + "20",
                          }}
                        >
                          <DollarSign
                            className="h-5 w-5"
                            style={{
                              color: COLORS[expense.id % COLORS.length],
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium dark:text-white">
                            {t(expense.description.toLowerCase(), expense.description)}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {t(expense.category.toLowerCase())} •{" "}
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold dark:text-white">${expense.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <Plus size={16} />
                  {t("addNewExpense")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
  
          <TabsContent value="budgets" className="space-y-6">
            <Card className="border-none shadow-md dark:bg-gray-800 dark:shadow-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">{t("budgetTracking")}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Plus size={14} />
                    {t("newBudget")}
                  </Button>
                </div>
                <CardDescription className="dark:text-gray-300">
                  {t("budgetTrackingDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium dark:text-white">{t(item.category.toLowerCase())}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            <span className="text-green-600 dark:text-green-400">
                              ${item.remaining} {t("remaining")}
                            </span>{" "}
                            {t("of")} ${item.budget} {t("budget")}
                          </div>
                        </div>
                        <span className="font-semibold dark:text-white">
                          ${item.spent} {t("spent")}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{
                            width: `${(item.spent / item.budget) * 100}%`,
                            backgroundColor:
                              item.spent / item.budget > 0.8
                                ? "#EF4444"
                                : "#10B981",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <Plus size={16} />
                  {t("addNewBudgetCategory")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ExpensesPage;
