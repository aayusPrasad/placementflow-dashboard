import { ReactNode } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Building2, TrendingUp, Users, Award, BarChart3 } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  role: "student" | "recruiter";
}

const stats = {
  student: [
    { icon: TrendingUp, value: "40,000+", label: "Placements Made" },
    { icon: Users, value: "500+", label: "Active Recruiters" },
    { icon: Award, value: "92%", label: "Placement Success" },
  ],
  recruiter: [
    { icon: BarChart3, value: "10,000+", label: "Candidates Placed" },
    { icon: Building2, value: "1,200+", label: "Companies Onboarded" },
    { icon: Award, value: "96%", label: "Hiring Satisfaction" },
  ],
};

const AuthLayout = ({ children, role }: AuthLayoutProps) => {
  const currentStats = stats[role];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden flex-col justify-between p-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/8 blur-[100px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            {role === "student" ? (
              <GraduationCap className="h-8 w-8 text-primary" />
            ) : (
              <Building2 className="h-8 w-8 text-primary" />
            )}
            <span className="text-2xl font-bold text-foreground tracking-tight">PlacementFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">AI-Powered Placement Ecosystem</p>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2
            key={role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl xl:text-4xl font-bold text-foreground leading-tight"
          >
            {role === "student"
              ? "Launch your career with confidence"
              : "Hire smarter, faster, better"}
          </motion.h2>
          <p className="text-muted-foreground text-base max-w-md">
            {role === "student"
              ? "Join thousands of students who've landed their dream placements through our AI-powered ecosystem."
              : "Streamline your campus hiring with intelligent candidate matching and automated workflows."}
          </p>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4">
            {currentStats.map((stat, i) => (
              <motion.div
                key={`${role}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[80px] -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
