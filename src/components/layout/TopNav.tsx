import { Bell, Search, User } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const TopNav = () => {
  const { role, setRole } = useRole();

  return (
    <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search anything..."
            className="h-9 w-72 rounded-lg bg-secondary/50 border border-border/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center bg-secondary/50 rounded-lg p-1 border border-border/50">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              role === "student"
                ? "gradient-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              role === "recruiter"
                ? "gradient-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Recruiter
          </button>
        </div>

        <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
        </button>

        <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
