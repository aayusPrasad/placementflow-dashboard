import { Link } from "react-router-dom";
import { Mail, User, Building2, Globe, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleTabSwitcher from "@/components/auth/RoleTabSwitcher";
import PasswordInput from "@/components/auth/PasswordInput";

const RecruiterSignup = () => (
  <AuthLayout role="recruiter">
    <RoleTabSwitcher activeRole="recruiter" variant="signup" />

    <div className="glass-card p-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Set up your recruiting hub</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Onboard your company and start hiring top talent.</p>
      </div>

      <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Company Name" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Recruiter Name" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="recruiter@company.com" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <PasswordInput />

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Designation" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="https://company.com" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <Button className="w-full h-11 gradient-primary font-semibold text-primary-foreground hover:opacity-90 transition-opacity mt-1">
          Create Recruiter Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/recruiter-login" className="text-primary font-medium hover:text-primary/80 transition-colors">Sign in</Link>
      </p>
    </div>
  </AuthLayout>
);

export default RecruiterSignup;
