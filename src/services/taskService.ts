import { toast } from "sonner";
import { getToken } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  estimatedDuration: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  points: number;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categories: any[];
  quote: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || "An error occurred";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchTasks = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to view tasks");
      throw new Error("Authentication required");
    }

    const response = await fetch(
      `${API_URL}/tasks?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    toast.error("Failed to load tasks");
    return { tasks: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  }
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  deadline: string;
  estimatedDuration: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  priority: "LOW" | "MEDIUM" | "HIGH";
  categoryIds?: string[];
}) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to create a task");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Failed to create task");
    throw error;
  }
};

export const startTask = async (taskId: string) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to start a task");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/tasks/${taskId}/start`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error starting task:", error);
    toast.error("Failed to start task");
    throw error;
  }
};

export const completeTask = async (taskId: string) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to complete a task");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error completing task:", error);
    toast.error("Failed to complete task");
    throw error;
  }
};
