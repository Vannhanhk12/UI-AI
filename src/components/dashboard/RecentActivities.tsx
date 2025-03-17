import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Activity {
  activity: string;
  time: string;
  icon: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex border-l-2 border-blue-500 pl-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1">
                <p className="text-gray-800">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;