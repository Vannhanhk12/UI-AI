import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCalendar, FiClock, FiCheck, FiX } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate: string;
  timeEstimate?: number; // in minutes
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Hoàn thành báo cáo dự án', priority: 'high', completed: false, dueDate: 'Hôm nay', timeEstimate: 120 },
    { id: 2, title: 'Chuẩn bị tài liệu cuộc họp', priority: 'medium', completed: false, dueDate: 'Hôm nay', timeEstimate: 45 },
    { id: 3, title: 'Nghiên cứu về xu hướng thị trường', priority: 'low', completed: false, dueDate: 'Ngày mai', timeEstimate: 60 },
    { id: 4, title: 'Cập nhật thông tin khách hàng', priority: 'medium', completed: false, dueDate: '21/03', timeEstimate: 30 },
  ]);
  const [timer, setTimer] = useState<{ active: boolean; taskId: number | null; timeLeft: number }>({
    active: false,
    taskId: null,
    timeLeft: 0
  });
  
  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const startTimer = (task: Task) => {
    if (timer.active) return;
    
    setTimer({
      active: true,
      taskId: task.id,
      timeLeft: task.timeEstimate ? task.timeEstimate * 60 : 25 * 60 // default to 25 minutes if no estimate
    });
    
    // In a real app, you'd set up an interval to count down the timer
  };
  
  const stopTimer = () => {
    setTimer({
      active: false,
      taskId: null, 
      timeLeft: 0
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>
        
        {timer.active && (
          <motion.div 
            className="bg-blue-500 text-white p-4 mb-6 rounded-xl shadow-lg flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center">
              <FiClock className="text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium opacity-90">Currently focusing on:</p>
                <p className="font-bold">
                  {tasks.find(t => t.id === timer.taskId)?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-4">{formatTime(timer.timeLeft)}</div>
              <button 
                onClick={stopTimer}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </motion.div>
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center transition-colors">
              <FiPlus className="mr-2" /> Add Task
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div 
                key={task.id}
                className={`flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors ${task.completed ? 'bg-gray-50' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  task.priority === 'high' ? 'bg-red-500' : 
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</p>
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
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                      } transition-colors`}
                      onClick={() => startTimer(task)}
                      disabled={timer.active && timer.taskId !== task.id}
                    >
                      <FiClock className="mr-1" />
                      {task.timeEstimate} min
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
      </motion.div>
    </div>
  );
};

export default TasksPage;