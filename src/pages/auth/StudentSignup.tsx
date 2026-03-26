import { Link } from "react-router-dom";
import { Mail, User, School, BookOpen, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleTabSwitcher from "@/components/auth/RoleTabSwitcher";
import PasswordInput from "@/components/auth/PasswordInput";

const StudentSignup = () => (
  <AuthLayout role="student">
    <RoleTabSwitcher activeRole="student" variant="signup" />

    <div className="glass-card p-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Start your placement journey</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Create your student account and get placed faster.</p>
      </div>

      <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Full Name" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="student@university.edu" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PasswordInput placeholder="Password" />
          <PasswordInput placeholder="Confirm Password" />
        </div>

        <div className="relative">
          <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input placeholder="College / University" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Input placeholder="Branch" className="pl-10 h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all" />
          </div>
          <Select>
            <SelectTrigger className="h-11 bg-secondary/40 border-border/50 focus:border-primary/50 focus:ring-primary/30">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Grad Year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026, 2027, 2028].map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full h-11 gradient-primary font-semibold text-primary-foreground hover:opacity-90 transition-opacity mt-1">
          Create Student Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/student-login" className="text-primary font-medium hover:text-primary/80 transition-colors">Sign in</Link>
      </p>
    </div>
  </AuthLayout>
);

export default StudentSignup;
