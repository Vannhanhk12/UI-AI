import React from "react";
import { Task } from "@/services/taskService";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onStart: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onStart }) => {
  const isCompleted = task.status === "COMPLETED";
  const isInProgress = task.status === "IN_PROGRESS";
  const isNotStarted = task.status === "NOT_STARTED";

  // Format deadline to a more readable format
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get background color based on priority
  const getPriorityColor = () => {
    switch (task.priority) {
      case "HIGH":
        return "border-red-100";
      case "MEDIUM":
        return "border-yellow-100";
      case "LOW":
        return "border-green-100";
      default:
        return "border-gray-100";
    }
  };

  // Get status badge color
  const getStatusBadge = () => {
    switch (task.status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "NOT_STARTED":
        return "bg-gray-100 text-gray-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`flex flex-col p-4 border rounded-lg mb-2 ${getPriorityColor()} hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`font-medium ${isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
        >
          {task.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge()}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        <div className="flex justify-between mb-1">
          <span>Deadline: {formatDeadline(task.deadline)}</span>
          <span>Duration: {task.estimatedDuration} min</span>
        </div>
        <div className="flex justify-between">
          <span>Difficulty: {task.difficulty}</span>
          <span>Points: {task.points}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-2">
        {isNotStarted && (
          <button
            onClick={() => onStart(task.id)}
            className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Start
          </button>
        )}

        {isInProgress && (
          <button
            onClick={() => onToggle(task.id)}
            className="px-3 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Complete
          </button>
        )}

        {isCompleted && (
          <span className="text-xs text-green-600">
            Completed:{" "}
            {new Date(task.completedAt || "").toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
