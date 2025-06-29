
import { LayoutDashboard, Table, Calendar as CalendarIcon, KanbanSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tables", label: "Data Tables", icon: Table },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
  { id: "kanban", label: "Kanban Board", icon: KanbanSquare },
];

export const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className={cn(
            "font-bold text-xl text-blue-600 transition-opacity duration-300",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            Admin Pro
          </h1>
          <button
            onClick={() => setCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-4 h-4 border-2 border-current"></div>
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left transition-all duration-200 group relative",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <Icon className={cn(
                "transition-all duration-200",
                isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3",
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              )} />
              
              <span className={cn(
                "font-medium transition-opacity duration-300",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                {item.label}
              </span>

              {isCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
