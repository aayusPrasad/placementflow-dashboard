import { Link } from "react-router-dom";
import { Mail, Chrome } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleTabSwitcher from "@/components/auth/RoleTabSwitcher";
import PasswordInput from "@/components/auth/PasswordInput";

const RecruiterLogin = () => (
  <AuthLayout role="recruiter">
    <RoleTabSwitcher activeRole="recruiter" variant="login" />

    <div className="glass-card p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Access your hiring command center</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Manage drives, applicants, interviews, and hiring intelligence.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="recruiter@company.com" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
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
          Sign In to Command Center
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
        <Link to="/recruiter-signup" className="text-primary font-medium hover:text-primary/80 transition-colors">Create one</Link>
      </p>
    </div>
  </AuthLayout>
);

export default RecruiterLogin;
