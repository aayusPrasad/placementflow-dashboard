import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface RoleTabSwitcherProps {
  activeRole: "student" | "recruiter";
  variant: "login" | "signup";
}

const RoleTabSwitcher = ({ activeRole, variant }: RoleTabSwitcherProps) => {
  const navigate = useNavigate();

  const handleSwitch = (role: "student" | "recruiter") => {
    if (role === activeRole) return;
    navigate(`/${role}-${variant}`);
  };

  return (
    <div className="flex items-center bg-secondary/60 rounded-xl p-1 border border-border/50 mb-6">
      {(["student", "recruiter"] as const).map((role) => (
        <button
          key={role}
          onClick={() => handleSwitch(role)}
          className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {activeRole === role && (
            <motion.div
              layoutId="roleTab"
              className="absolute inset-0 gradient-primary rounded-lg"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className={`relative z-10 flex items-center gap-2 ${activeRole === role ? "text-primary-foreground" : "text-muted-foreground"}`}>
            {role === "student" ? <GraduationCap className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
            {role === "student" ? "Student" : "Recruiter"}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RoleTabSwitcher;
