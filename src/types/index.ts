export interface Timer {
  isRunning: boolean;
  duration: number;
}

export type TaskList = Task[];

// Note: Main Task interface is now in services/taskService.ts
