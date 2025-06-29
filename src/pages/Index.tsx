
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DataTables } from "@/components/dashboard/DataTables";
import { Calendar } from "@/components/dashboard/Calendar";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ThemeProvider } from "@/components/dashboard/ThemeProvider";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "tables":
        return <DataTables />;
      case "calendar":
        return <Calendar />;
      case "kanban":
        return <KanbanBoard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          
          <div className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
          }`}>
            <Header />
            
            <main className="p-6">
              <div className="animate-fade-in">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
