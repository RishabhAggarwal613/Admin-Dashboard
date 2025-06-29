
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KanbanSquare } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: 1, title: "Setup Database", description: "Configure PostgreSQL database", priority: "high", assignee: "John" },
      { id: 2, title: "Design UI", description: "Create mockups for dashboard", priority: "medium", assignee: "Jane" },
    ]
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [
      { id: 3, title: "API Integration", description: "Connect frontend with backend", priority: "high", assignee: "Bob" },
      { id: 4, title: "User Authentication", description: "Implement login system", priority: "medium", assignee: "Alice" },
    ]
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: 5, title: "Testing", description: "Write unit tests", priority: "low", assignee: "Charlie" },
    ]
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: 6, title: "Project Setup", description: "Initialize React project", priority: "low", assignee: "John" },
      { id: 7, title: "Dependencies", description: "Install required packages", priority: "low", assignee: "Jane" },
    ]
  }
];

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const newColumns = columns.map(column => {
      if (column.tasks.find(task => task.id === draggedTask.id)) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggedTask.id)
        };
      }
      
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, draggedTask]
        };
      }
      
      return column;
    });

    setColumns(newColumns);
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <KanbanSquare className="mr-2 h-5 w-5" />
              Project Board
            </CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column, columnIndex) => (
              <div
                key={column.id}
                className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 min-h-[500px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
                style={{ animationDelay: `${columnIndex * 100}ms` }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  {column.title}
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
