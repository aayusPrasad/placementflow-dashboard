import { Calendar, Clock, Video } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const interviews = [
  { candidate: "Arjun Sharma", role: "SDE Intern", date: "Mar 28, 2026", time: "10:00 AM", type: "Technical Round 1", status: "Scheduled" },
  { candidate: "Priya Patel", role: "SDE Intern", date: "Mar 28, 2026", time: "2:00 PM", type: "Technical Round 1", status: "Scheduled" },
  { candidate: "Sneha Reddy", role: "Backend Dev", date: "Mar 30, 2026", time: "11:00 AM", type: "System Design", status: "Scheduled" },
  { candidate: "Ananya Gupta", role: "SDE Intern", date: "Apr 1, 2026", time: "3:00 PM", type: "HR Round", status: "Pending" },
  { candidate: "Deepika Nair", role: "ML Engineer", date: "Apr 2, 2026", time: "10:30 AM", type: "Technical", status: "Scheduled" },
];

const RecruiterInterviews = () => (
  <div className="animate-fade-in">
    <PageHeader title="Interviews" description="Schedule and manage candidate interviews" />

    <div className="glass-card p-5 mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Schedule New Interview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input placeholder="Candidate name" className="h-9 rounded-lg bg-secondary/50 border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        <input type="date" className="h-9 rounded-lg bg-secondary/50 border border-border/50 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        <input type="time" className="h-9 rounded-lg bg-secondary/50 border border-border/50 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        <button className="gradient-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">Schedule</button>
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Upcoming Interviews</h3>
      {interviews.map((iv, i) => (
        <div key={i} className="glass-card p-4 hover:shadow-elevated transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{iv.candidate}</h4>
              <p className="text-xs text-muted-foreground">{iv.role} • {iv.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{iv.date}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{iv.time}</p>
            </div>
            <StatusBadge status={iv.status} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecruiterInterviews;
