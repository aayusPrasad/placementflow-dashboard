import { useLocation, Link } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import {
  LayoutDashboard, FileText, Building2, ClipboardList, Calendar, Bell, BarChart3,
  User, Settings, PlusCircle, Users, CheckSquare, Sparkles
} from "lucide-react";

const studentNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Resume Analyzer", icon: Sparkles, path: "/resume-analyzer" },
  { label: "Companies", icon: Building2, path: "/companies" },
  { label: "Applications", icon: ClipboardList, path: "/applications" },
  { label: "Interviews", icon: Calendar, path: "/interviews" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const recruiterNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Create Job", icon: PlusCircle, path: "/create-job" },
  { label: "Applicants", icon: Users, path: "/applicants" },
  { label: "Shortlist", icon: CheckSquare, path: "/shortlist" },
  { label: "Interviews", icon: Calendar, path: "/interviews" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const AppSidebar = () => {
  const { role } = useRole();
  const location = useLocation();
  const nav = role === "student" ? studentNav : recruiterNav;

  return (
    <aside className="w-60 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold text-foreground tracking-tight">PlacementFlow</span>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="glass-card p-3">
          <p className="text-xs font-semibold text-foreground">Upgrade to Pro</p>
          <p className="text-xs text-muted-foreground mt-0.5">Unlock AI insights & priority support</p>
          <button className="mt-2 w-full gradient-primary text-primary-foreground text-xs font-semibold py-1.5 rounded-md hover:opacity-90 transition-opacity">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
