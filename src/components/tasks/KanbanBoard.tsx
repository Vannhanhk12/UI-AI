import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task, updateTaskStatus, failTask } from '@/services/taskService';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiEdit2 } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, newStatus: Task['status']) => void;
  onToggle: (id: string) => void;
  onStart: (id: string) => void;
}

interface Column {
  id: Task['status'];
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
  color: string;
  hoverColor: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskUpdate, onToggle, onStart }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);

  // Format deadline to a more readable format
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Organize tasks into columns
  const columns: Column[] = [
    {
      id: 'NOT_STARTED',
      title: t('todo'),
      icon: <FiClock />,
      tasks: tasks.filter(task => task.status === 'NOT_STARTED'),
      color: theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100',
      hoverColor: theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
    },
    {
      id: 'IN_PROGRESS',
      title: t('inProgress'),
      icon: <FiAlertCircle />,
      tasks: tasks.filter(task => task.status === 'IN_PROGRESS'),
      color: theme === 'dark' ? 'bg-blue-900/40' : 'bg-blue-100',
      hoverColor: theme === 'dark' ? 'hover:bg-blue-900/60' : 'hover:bg-blue-50'
    },
    {
      id: 'COMPLETED',
      title: t('done'),
      icon: <FiCheckCircle />,
      tasks: tasks.filter(task => task.status === 'COMPLETED'),
      color: theme === 'dark' ? 'bg-green-900/40' : 'bg-green-100',
      hoverColor: theme === 'dark' ? 'hover:bg-green-900/60' : 'hover:bg-green-50'
    },
    {
      id: 'FAILED',
      title: t('failed'),
      icon: <FiXCircle />,
      tasks: tasks.filter(task => task.status === 'FAILED'),
      color: theme === 'dark' ? 'bg-red-900/40' : 'bg-red-100',
      hoverColor: theme === 'dark' ? 'hover:bg-red-900/60' : 'hover:bg-red-50'
    }
  ];

  const handleFailTask = async (taskId: string) => {
    try {
      setLoading(taskId);
      await failTask(taskId);
      // Update UI after API call
      onTaskUpdate(taskId, 'FAILED');
      toast.success(t('taskMarkedAsFailed'));
    } catch (error) {
      console.error("Error failing task:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleEditTask = (taskId: string) => {
    // Navigate to edit task page
    window.location.href = `/tasks/edit/${taskId}`;
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside of a valid droppable
    if (!destination) return;

    // Dropped in the same column and position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // If dropped in a different column, update task status
    if (source.droppableId !== destination.droppableId) {
      const taskId = result.draggableId;
      const newStatus = destination.droppableId as Task['status'];
      
      try {
        setLoading(taskId);
        // Call API to update status
        if (newStatus === 'FAILED') {
          await failTask(taskId);
        } else if (newStatus === 'COMPLETED') {
          await onToggle(taskId);
        } else if (newStatus === 'IN_PROGRESS' && source.droppableId === 'NOT_STARTED') {
          await onStart(taskId);
        } else {
          await updateTaskStatus(taskId, newStatus);
        }
        // Update UI after API call
        onTaskUpdate(taskId, newStatus);
        toast.success(t('taskStatusUpdated'));
      } catch (error) {
        console.error("Error updating task status:", error);
      } finally {
        setLoading(null);
      }
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'HIGH':
        return theme === 'dark' 
          ? 'bg-red-900/60 text-red-200' 
          : 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return theme === 'dark'
          ? 'bg-yellow-900/60 text-yellow-200'
          : 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return theme === 'dark'
          ? 'bg-green-900/60 text-green-200' 
          : 'bg-green-100 text-green-800';
      default:
        return theme === 'dark'
          ? 'bg-slate-800 text-slate-200'
          : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div 
            key={column.id} 
            className={`flex-1 min-w-[280px] rounded-xl ${
              theme === 'dark' ? 'bg-slate-900/80 shadow-lg' : 'bg-white shadow-sm'
            }`}
          >
            <div className={`p-3 rounded-t-xl flex items-center gap-2 ${column.color}`}>
              <span className="text-lg">{column.icon}</span>
              <h3 className="font-semibold">{column.title}</h3>
              <span className="ml-auto bg-white/20 rounded-full px-2 py-0.5 text-xs">
                {column.tasks.length}
              </span>
            </div>
            
            <Droppable droppableId={column.id} type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 min-h-[70vh] ${
                    snapshot.isDraggingOver 
                      ? theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
                      : ''
                  }`}
                >
                  {column.tasks.length === 0 ? (
                    <div className={`p-4 text-center rounded-lg border border-dashed ${
                      theme === 'dark' ? 'border-slate-700 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}>
                      {t('dragTasksHere')}
                    </div>
                  ) : (
                    column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 rounded-lg p-3 ${column.color} ${column.hoverColor} ${
                              snapshot.isDragging ? 'shadow-md' : ''
                            } transition-all`}
                          >
                            <div className="flex justify-between items-start mb-2 gap-2">
                              <h4 className={`font-medium text-sm ${column.id === 'COMPLETED' || column.id === 'FAILED' ? 'line-through opacity-70' : ''}`}>
                                {task.title}
                              </h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getPriorityBadge(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            <div className="text-xs opacity-70 mb-2">
                              <div className="truncate">{task.description}</div>
                            </div>
                            
                            <div className="text-xs flex justify-between items-center">
                              <span>{formatDeadline(task.deadline)}</span>
                              <span>{task.estimatedDuration} min</span>
                            </div>
                            
                            {(column.id === 'NOT_STARTED' || column.id === 'IN_PROGRESS') && (
                              <div className="flex gap-2 mt-2">
                                {column.id === 'NOT_STARTED' && (
                                  <button
                                    onClick={() => onStart(task.id)}
                                    disabled={loading === task.id}
                                    className={`text-xs px-2 py-1 rounded-md flex-1 ${
                                      theme === 'dark' 
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    } ${loading === task.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                  >
                                    {loading === task.id ? t('starting') + '...' : t('startTask')}
                                  </button>
                                )}
                                
                                {column.id === 'IN_PROGRESS' && (
                                  <>
                                    <button
                                      onClick={() => onToggle(task.id)}
                                      disabled={loading === task.id}
                                      className={`text-xs px-2 py-1 rounded-md flex-1 ${
                                        theme === 'dark' 
                                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                                          : 'bg-green-500 hover:bg-green-600 text-white'
                                      } ${loading === task.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                      {loading === task.id ? t('completing') + '...' : t('completeTask')}
                                    </button>
                                    
                                    <button
                                      onClick={() => handleFailTask(task.id)}
                                      disabled={loading === task.id}
                                      className={`text-xs px-2 py-1 rounded-md flex-1 ${
                                        theme === 'dark' 
                                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                                          : 'bg-red-500 hover:bg-red-600 text-white'
                                      } ${loading === task.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                      {loading === task.id ? t('marking') + '...' : t('failed')}
                                    </button>
                                  </>
                                )}
                                
                                <button
                                  onClick={() => handleEditTask(task.id)}
                                  className={`text-xs px-2 py-1 rounded-md ${
                                    theme === 'dark' 
                                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                  }`}
                                >
                                  <FiEdit2 />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard; 