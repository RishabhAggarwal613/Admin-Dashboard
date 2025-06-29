
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("blue")} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                Blue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("purple")} className="hover:bg-gray-100 dark:hover:bg-slate-700">
                Purple
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
