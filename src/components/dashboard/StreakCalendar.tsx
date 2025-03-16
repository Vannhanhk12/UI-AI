import React from "react";

const StreakCalendar = () => {
  // Mock data for the calendar
  // In a real app, this would come from your backend
  const generateMockData = () => {
    const today = new Date();
    const data = [];

    // Generate data for the last 5 weeks (35 days)
    for (let i = 34; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Random activity level (0 = none, 1 = low, 2 = medium, 3 = high)
      let activityLevel;
      if (i % 7 === 0 || i % 7 === 6) {
        // Weekends have less activity
        activityLevel = Math.floor(Math.random() * 2); // 0 or 1
      } else {
        activityLevel = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
      }

      data.push({
        date,
        activityLevel,
      });
    }

    return data;
  };

  const calendarData = generateMockData();

  // Group the data by week
  const weeks = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  // Get day labels (Sun, Mon, etc.)
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100";
      case 1:
        return "bg-green-200";
      case 2:
        return "bg-green-400";
      case 3:
        return "bg-green-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="w-full">
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((day, index) => (
          <div key={index} className="text-xs text-center text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => {
              const dateStr = day.date.toISOString().split("T")[0];
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-full aspect-square rounded-sm ${getActivityColor(day.activityLevel)} hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer`}
                  title={`${dateStr}: ${day.activityLevel === 0 ? "No" : day.activityLevel === 1 ? "1-3" : day.activityLevel === 2 ? "4-6" : "7+"} tasks completed`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCalendar;
