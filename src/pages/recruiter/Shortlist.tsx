import { Calendar, Mail, User } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const shortlisted = [
  { name: "Arjun Sharma", branch: "CSE", cgpa: 8.74, score: 87, role: "SDE Intern" },
  { name: "Priya Patel", branch: "CSE", cgpa: 9.1, score: 92, role: "SDE Intern" },
  { name: "Sneha Reddy", branch: "IT", cgpa: 8.5, score: 85, role: "Backend Dev" },
  { name: "Ananya Gupta", branch: "CSE", cgpa: 9.3, score: 94, role: "SDE Intern" },
  { name: "Deepika Nair", branch: "CSE", cgpa: 8.8, score: 89, role: "ML Engineer" },
];

const Shortlist = () => (
  <div className="animate-fade-in">
    <PageHeader title="Shortlisted Candidates" description="Manage shortlisted candidates and schedule interviews" />

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {shortlisted.map((c, i) => (
        <div key={i} className="glass-card p-5 hover:shadow-elevated transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{c.name}</h4>
              <p className="text-xs text-muted-foreground">{c.role} • {c.branch}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{c.cgpa}</p>
              <p className="text-xs text-muted-foreground">CGPA</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{c.score}</p>
              <p className="text-xs text-muted-foreground">Resume</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 gradient-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Calendar className="h-3 w-3" /> Schedule
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-secondary/50 text-muted-foreground text-xs font-medium py-2 rounded-lg hover:bg-secondary transition-colors border border-border/50">
              <Mail className="h-3 w-3" /> Notify
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Shortlist;
