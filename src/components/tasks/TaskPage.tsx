import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiCalendar,
  FiClock,
  FiCheck,
  FiX,
  FiPlusCircle,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Task {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  dueDate: string;
  timeEstimate?: number; // in minutes
  completedAt?: string;
}

const motivationalSlogans = [
  "Hãy biến mỗi nhiệm vụ thành một bước tiến đến thành công!",
  "Năng suất không phải là ngẫu nhiên, đó là kết quả của nỗ lực!",
  "Mỗi nhiệm vụ hoàn thành là một chiến thắng nhỏ trên con đường thành công!",
  "Hôm nay bạn làm điều khó, ngày mai nó sẽ trở thành dễ dàng!",
  "Tập trung vào tiến độ, không phải sự hoàn hảo!",
  "Hành động nhỏ mỗi ngày tạo nên kết quả lớn!",
  "Kỷ luật là cây cầu giữa mục tiêu và thành tựu!",
  "Thành công đến từ việc biến những nhiệm vụ khó khăn thành thói quen!",
  "Mỗi phút tập trung đều đáng giá!",
  "Hãy làm việc thông minh hơn, không chỉ chăm chỉ hơn!",
];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Hoàn thành báo cáo dự án",
      priority: "high",
      completed: false,
      dueDate: "Hôm nay",
      timeEstimate: 120,
    },
    {
      id: 2,
      title: "Chuẩn bị tài liệu cuộc họp",
      priority: "medium",
      completed: false,
      dueDate: "Hôm nay",
      timeEstimate: 45,
    },
    {
      id: 3,
      title: "Nghiên cứu về xu hướng thị trường",
      priority: "low",
      completed: false,
      dueDate: "Ngày mai",
      timeEstimate: 60,
    },
    {
      id: 4,
      title: "Cập nhật thông tin khách hàng",
      priority: "medium",
      completed: false,
      dueDate: "21/03",
      timeEstimate: 30,
    },
  ]);

  const [timer, setTimer] = useState<{
    active: boolean;
    taskId: number | null;
    timeLeft: number;
    initialTime: number;
    progress: number;
  }>({
    active: false,
    taskId: null,
    timeLeft: 0,
    initialTime: 0,
    progress: 0,
  });

  const [slogan, setSlogan] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([]);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [showAddTimeModal, setShowAddTimeModal] = useState<boolean>(false);

  // Generate random slogan on page load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalSlogans.length);
    setSlogan(motivationalSlogans[randomIndex]);

    // Generate mock data for the chart
    generateChartData();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer.active && timer.timeLeft > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          const newTimeLeft = prev.timeLeft - 1;
          const newProgress = (newTimeLeft / prev.initialTime) * 100;

          if (newTimeLeft <= 0) {
            clearInterval(interval);
            return {
              ...prev,
              timeLeft: 0,
              progress: 0,
              active: false,
            };
          }

          return {
            ...prev,
            timeLeft: newTimeLeft,
            progress: newProgress,
          };
        });
      }, 1000);

      setTimerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [timer.active]);

  const generateChartData = () => {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
    const data = days.map((day) => ({
      name: day,
      completed: Math.floor(Math.random() * 8),
      important: Math.floor(Math.random() * 5),
    }));
    setChartData(data);
  };

  const toggleCompletion = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : undefined,
          };
        }
        return task;
      }),
    );

    // Update chart data when a task is completed
    if (tasks.find((t) => t.id === id)?.completed === false) {
      const newChartData = [...chartData];
      const today = new Date().getDay();
      const dayIndex = today === 0 ? 6 : today - 1; // Adjust for Sunday
      newChartData[dayIndex].completed += 1;
      if (tasks.find((t) => t.id === id)?.priority === "high") {
        newChartData[dayIndex].important += 1;
      }
      setChartData(newChartData);
    }
  };

  const startTimer = (task: Task) => {
    if (timer.active) return;

    const timeInSeconds = task.timeEstimate ? task.timeEstimate * 60 : 25 * 60; // default to 25 minutes if no estimate

    setTimer({
      active: true,
      taskId: task.id,
      timeLeft: timeInSeconds,
      initialTime: timeInSeconds,
      progress: 100,
    });
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    setTimer({
      active: false,
      taskId: null,
      timeLeft: 0,
      initialTime: 0,
      progress: 0,
    });
  };

  const addTime = (minutes: number) => {
    const additionalSeconds = minutes * 60;

    setTimer((prev) => {
      const newTimeLeft = prev.timeLeft + additionalSeconds;
      const newInitialTime = prev.initialTime + additionalSeconds;

      return {
        ...prev,
        timeLeft: newTimeLeft,
        initialTime: newInitialTime,
        progress: (newTimeLeft / newInitialTime) * 100,
      };
    });

    setShowAddTimeModal(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Manager</h1>

        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-2">Lời nhắc hôm nay</h2>
          <p className="text-lg italic">"{slogan}"</p>
        </motion.div>

        <AnimatePresence>
          {timer.active && (
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 mb-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <FiClock className="text-3xl mr-4" />
                  <div>
                    <p className="text-sm font-medium opacity-90">
                      Đang tập trung vào:
                    </p>
                    <p className="font-bold text-xl">
                      {tasks.find((t) => t.id === timer.taskId)?.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2">
                    {formatTime(timer.timeLeft)}
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${timer.progress}%` }}
                      animate={{ width: `${timer.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAddTimeModal(true)}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors flex items-center"
                    >
                      <FiPlusCircle className="text-xl mr-1" />
                      <span>Thêm thời gian</span>
                    </button>
                    <button
                      onClick={stopTimer}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <motion.div
                  animate={{
                    x: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24"
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=pikachu&mouth=smile&eyes=happy"
                    alt="Motivational character"
                    className="w-full h-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Nhiệm vụ</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center transition-colors">
              <FiPlus className="mr-2" /> Thêm nhiệm vụ
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                className={`flex items-center p-4 border ${task.priority === "high" ? "border-red-100" : task.priority === "medium" ? "border-yellow-100" : "border-green-100"} rounded-lg hover:bg-gray-50 transition-colors ${task.completed ? "bg-gray-50" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full mr-3 ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p
                    className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}
                  >
                    {task.title}
                  </p>
                  {task.completed && task.completedAt && (
                    <p className="text-xs text-gray-400">
                      Hoàn thành:{" "}
                      {new Date(task.completedAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>

                <div className="mr-4 text-sm text-gray-500 flex items-center">
                  <FiCalendar className="mr-1" />
                  {task.dueDate}
                </div>

                {task.timeEstimate && !task.completed && (
                  <div className="mr-4">
                    <button
                      className={`flex items-center py-1 px-3 rounded-full text-xs font-medium ${
                        timer.taskId === task.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                      } transition-colors`}
                      onClick={() => startTimer(task)}
                      disabled={timer.active && timer.taskId !== task.id}
                    >
                      <FiClock className="mr-1" />
                      {task.timeEstimate} phút
                    </button>
                  </div>
                )}

                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompletion(task.id)}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Thống kê tuần qua
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="important"
                  name="Nhiệm vụ quan trọng"
                  fill="#ef4444"
                />
                <Bar
                  dataKey="completed"
                  name="Nhiệm vụ hoàn thành"
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              Mẹo tăng năng suất:
            </h3>
            <p className="text-sm text-blue-700">
              Hãy ưu tiên các nhiệm vụ quan trọng và khó khăn vào đầu ngày khi
              năng lượng của bạn còn cao. Kỹ thuật Pomodoro (làm việc tập trung
              25 phút, nghỉ 5 phút) có thể giúp bạn duy trì sự tập trung và năng
              suất.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal to add time */}
      <AnimatePresence>
        {showAddTimeModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 className="text-xl font-bold mb-4">Thêm thời gian</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[5, 10, 15, 20, 25, 30].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => addTime(minutes)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    {minutes} phút
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddTimeModal(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
