
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "task" | "reminder";
}

const mockEvents: Event[] = [
  { id: 1, title: "Team Meeting", date: "2024-01-20", time: "10:00 AM", type: "meeting" },
  { id: 2, title: "Project Review", date: "2024-01-22", time: "2:00 PM", type: "meeting" },
  { id: 3, title: "Submit Report", date: "2024-01-25", time: "5:00 PM", type: "task" },
  { id: 4, title: "Client Call", date: "2024-01-28", time: "11:00 AM", type: "meeting" },
];

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const monthYear = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                {monthYear}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  ←
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  →
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                  Today
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`
                    p-3 text-center rounded-lg transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20
                    ${day === new Date().getDate() && 
                      selectedDate.getMonth() === new Date().getMonth() && 
                      selectedDate.getFullYear() === new Date().getFullYear()
                      ? 'bg-blue-600 text-white' : ''
                    }
                    ${!day ? 'invisible' : ''}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      event.type === 'task' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              Add Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
