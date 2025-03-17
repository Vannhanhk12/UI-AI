import React from 'react';

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, onToggle }) => {
  return (
    <div className={`flex items-center justify-between p-4 border-b ${completed ? 'bg-green-100' : 'bg-white'}`}>
      <span className={`flex-1 ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        {title}
      </span>
      <button
        onClick={() => onToggle(id)}
        className={`px-4 py-2 rounded ${completed ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
      >
        {completed ? 'Undo' : 'Complete'}
      </button>
    </div>
  );
};

export default TaskItem;