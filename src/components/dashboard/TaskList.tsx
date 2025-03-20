import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/services/taskService";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks = [] }: TaskListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "NOT_STARTED":
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            High
          </Badge>
        );
      case "MEDIUM":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
          >
            Medium
          </Badge>
        );
      case "LOW":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
          >
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">{getStatusIcon(task.status)}</div>
            <div>
              <h3
                className={`font-medium ${task.status === "COMPLETED" ? "line-through text-gray-500" : "text-gray-900"}`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-gray-500">
                Due {formatDate(task.deadline)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getPriorityBadge(task.priority)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
