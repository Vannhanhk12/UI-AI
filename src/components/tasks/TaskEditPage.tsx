import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Task, updateTask } from "@/services/taskService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { getToken } from "@/services/api";

const API_URL = import.meta.env.VITE_API_URL;

const TaskEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    deadline: Date;
    estimatedDuration: number;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    priority: "LOW" | "MEDIUM" | "HIGH";
  }>({
    title: "",
    description: "",
    deadline: new Date(),
    estimatedDuration: 30,
    difficulty: "MEDIUM",
    priority: "MEDIUM",
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      setIsLoading(true);
      setError(null);

      try {
        const token = getToken();
        if (!token) {
          throw new Error("Bạn phải đăng nhập để chỉnh sửa nhiệm vụ");
        }

        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải nhiệm vụ");
        }

        const result = await response.json();
        const task = result.data;

        setFormData({
          title: task.title || "",
          description: task.description || "",
          deadline: new Date(task.deadline),
          estimatedDuration: task.estimatedDuration || 30,
          difficulty: task.difficulty || "MEDIUM",
          priority: task.priority || "MEDIUM",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
        toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, deadline: date }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) return;
    
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        deadline: formData.deadline.toISOString(),
        estimatedDuration: Number(formData.estimatedDuration),
      };

      await updateTask(taskId, formattedData);
      toast.success(t('taskUpdatedSuccessfully'));
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(t('failedToUpdateTask'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          theme === 'dark' ? 'border-indigo-400' : 'border-blue-500'
        }`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className={`p-4 rounded-md ${
          theme === 'dark' ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-800'
        }`}>
          {error}
        </div>
        <Button 
          onClick={() => navigate("/tasks")}
          className="mt-4"
        >
          {t('backToTasks')}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t("editTask")}
          </h1>
          <Button variant="outline" onClick={() => navigate("/tasks")}>
            {t("cancel")}
          </Button>
        </div>

        <div className={`${
          theme === 'dark' ? 'bg-slate-900/80 shadow-lg' : 'bg-white shadow-sm'
        } p-6 rounded-xl`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t("taskTitle")}</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t("enterTaskTitle")}
                required
                className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t("enterTaskDescription")}
                rows={4}
                className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="deadline">{t("deadline")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? (
                        format(formData.deadline, "PPP")
                      ) : (
                        <span>{t("pickDate")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`w-auto p-0 ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''
                  }`}>
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={handleDateChange}
                      initialFocus
                      className={theme === 'dark' ? 'bg-slate-800' : ''}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">
                  {t("estimatedDuration")}
                </Label>
                <Input
                  id="estimatedDuration"
                  name="estimatedDuration"
                  type="number"
                  min="1"
                  value={formData.estimatedDuration}
                  onChange={handleInputChange}
                  required
                  className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">{t("difficulty")}</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    handleSelectChange("difficulty", value)
                  }
                >
                  <SelectTrigger className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                    <SelectValue placeholder={t("selectDifficulty")} />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                    <SelectItem value="EASY">{t("easy")}</SelectItem>
                    <SelectItem value="MEDIUM">{t("medium")}</SelectItem>
                    <SelectItem value="HARD">{t("hard")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">{t("priority")}</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                    <SelectValue placeholder={t("selectPriority")} />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                    <SelectItem value="LOW">{t("low")}</SelectItem>
                    <SelectItem value="MEDIUM">{t("medium")}</SelectItem>
                    <SelectItem value="HIGH">{t("high")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className={`w-full md:w-auto ${
                  theme === 'dark' 
                    ? 'bg-indigo-600 hover:bg-indigo-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("updating") : t("updateTask")}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskEditPage; 