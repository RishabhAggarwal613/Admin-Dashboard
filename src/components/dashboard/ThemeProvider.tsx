
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark" | "blue" | "purple";
  setTheme: (theme: "light" | "dark" | "blue" | "purple") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark" | "blue" | "purple">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("dashboard-theme") as "light" | "dark" | "blue" | "purple";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-theme", theme);
    
    // Apply theme classes to document
    document.documentElement.classList.remove("light", "dark", "theme-blue", "theme-purple");
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "blue") {
      document.documentElement.classList.add("theme-blue");
    } else if (theme === "purple") {
      document.documentElement.classList.add("theme-purple");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
