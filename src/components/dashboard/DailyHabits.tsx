import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface Habit {
  habit: string;
  streak: number;
  target: number;
  progress: number;
}

interface DailyHabitsProps {
  habits: Habit[];
}

const DailyHabits: React.FC<DailyHabitsProps> = ({ habits }) => {
  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader>
        <CardTitle>Thói quen hàng ngày</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.map((habit, index) => (
            <motion.div 
              key={index} 
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between">
                <span className="text-gray-800">{habit.habit}</span>
                <span className="text-sm text-blue-500 font-medium">{habit.streak} ngày liên tiếp</span>
              </div>
              <Progress value={habit.progress} className="h-2" />
              <div className="text-xs text-gray-500 text-right">{habit.progress}% hoàn thành</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyHabits;