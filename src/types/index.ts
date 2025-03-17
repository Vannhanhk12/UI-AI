export interface Task {
  id: string;
  title: string;
  completed: boolean;
  timer: number;
}

export interface Timer {
  isRunning: boolean;
  duration: number;
}

export type TaskList = Task[];