import { Bell, CheckCircle, AlertCircle, Calendar, FileText } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const notifications = [
  { icon: CheckCircle, color: "text-success", title: "Application Submitted", desc: "Your application for SDE Intern at Google has been submitted successfully.", time: "2 hours ago", read: false },
  { icon: AlertCircle, color: "text-warning", title: "Shortlisted!", desc: "Congratulations! You've been shortlisted by Amazon for SDE I position.", time: "5 hours ago", read: false },
  { icon: Calendar, color: "text-primary", title: "Interview Scheduled", desc: "Technical Round 1 with Google scheduled for Mar 28, 2026 at 10:00 AM.", time: "1 day ago", read: false },
  { icon: Bell, color: "text-info", title: "Deadline Reminder", desc: "Application deadline for Microsoft Software Engineer is in 3 days.", time: "1 day ago", read: true },
  { icon: FileText, color: "text-primary", title: "Resume Reviewed", desc: "Your resume has been reviewed. Score improved to 87/100.", time: "2 days ago", read: true },
  { icon: CheckCircle, color: "text-success", title: "Selected!", desc: "You've been selected for the final round at Amazon!", time: "3 days ago", read: true },
  { icon: Bell, color: "text-info", title: "New Company Added", desc: "Stripe is now hiring Backend Engineers. Check eligibility.", time: "4 days ago", read: true },
  { icon: AlertCircle, color: "text-destructive", title: "Application Rejected", desc: "Your application for Frontend Engineer at Meta was not selected.", time: "5 days ago", read: true },
];

const Notifications = () => (
  <div className="animate-fade-in">
    <PageHeader title="Notifications" description="Stay updated on your placement activities" />

    <div className="glass-card divide-y divide-border/30">
      {notifications.map((n, i) => (
        <div key={i} className={`flex items-start gap-4 p-4 hover:bg-secondary/20 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
          <div className={`h-9 w-9 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 ${n.color}`}>
            <n.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-foreground">{n.title}</h4>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;
