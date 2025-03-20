import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || "An error occurred";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_URL}/blogs/public?page=${page}&limit=${limit}`,
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    toast.error("Failed to load blogs");
    return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching blog:", error);
    toast.error("Failed to load blog");
    throw error;
  }
};

export const createBlog = async (blogData: any) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to create a blog");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating blog:", error);
    toast.error("Failed to create blog");
    throw error;
  }
};

export const likeBlog = async (blogId: string) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to like a blog");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/blogs/${blogId}/upvote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error liking blog:", error);
    toast.error("Failed to like blog");
    throw error;
  }
};

export const addComment = async (blogId: string, content: string) => {
  try {
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to comment");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error adding comment:", error);
    toast.error("Failed to add comment");
    throw error;
  }
};
