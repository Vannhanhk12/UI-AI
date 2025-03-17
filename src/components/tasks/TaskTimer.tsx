import React, { useState, useEffect } from 'react';

interface TaskTimerProps {
  taskId: string;
  onComplete: (id: string) => void;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ taskId, onComplete }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleComplete = () => {
    setIsRunning(false);
    onComplete(taskId);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="task-timer">
      <div className="time-display">{formatTime(time)}</div>
      <button onClick={handleStartStop} className="start-stop-button">
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleComplete} className="complete-button">
        Complete
      </button>
    </div>
  );
};

export default TaskTimer;