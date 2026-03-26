import { Link } from "react-router-dom";
import { Mail, Chrome } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleTabSwitcher from "@/components/auth/RoleTabSwitcher";
import PasswordInput from "@/components/auth/PasswordInput";

const StudentLogin = () => (
  <AuthLayout role="student">
    <RoleTabSwitcher activeRole="student" variant="login" />

    <div className="glass-card p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back to your placement ecosystem</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Track opportunities, applications, interviews, and career growth.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="student@university.edu" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <PasswordInput />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox />
            <span className="text-xs text-muted-foreground">Remember me</span>
          </label>
          <Link to="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
        </div>

        <Button className="w-full h-11 gradient-primary font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
          Sign In to Dashboard
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
        <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
      </div>

      <Button variant="outline" className="w-full h-11 border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all">
        <Chrome className="h-4 w-4 mr-2" /> Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/student-signup" className="text-primary font-medium hover:text-primary/80 transition-colors">Create one</Link>
      </p>
    </div>
  </AuthLayout>
);

export default StudentLogin;
