import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface TaskDataItem {
  name: string;
  value: number;
  color: string;
}

interface TaskPieChartProps {
  data: TaskDataItem[];
}

const TaskPieChart: React.FC<TaskPieChartProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader>
        <CardTitle>Hiệu suất công việc</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-full mr-1"></div>
              <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskPieChart;