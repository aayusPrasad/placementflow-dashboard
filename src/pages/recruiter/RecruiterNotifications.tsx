import { Bell, CheckCircle, Users, Calendar, FileText } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const notifications = [
  { icon: Users, color: "text-info", title: "New Application", desc: "Ananya Gupta applied for SDE Intern position.", time: "1 hour ago", read: false },
  { icon: CheckCircle, color: "text-success", title: "Shortlist Updated", desc: "3 new candidates added to shortlist for ML Engineer role.", time: "3 hours ago", read: false },
  { icon: Calendar, color: "text-primary", title: "Interview Confirmed", desc: "Arjun Sharma confirmed interview for Mar 28 at 10:00 AM.", time: "5 hours ago", read: false },
  { icon: FileText, color: "text-warning", title: "Job Post Expiring", desc: "Backend Developer position deadline is in 2 days.", time: "1 day ago", read: true },
  { icon: Users, color: "text-info", title: "Bulk Applications", desc: "15 new applications received for SDE Intern position.", time: "2 days ago", read: true },
  { icon: CheckCircle, color: "text-success", title: "Offer Accepted", desc: "Priya Patel accepted the offer for SDE Intern.", time: "3 days ago", read: true },
];

const RecruiterNotifications = () => (
  <div className="animate-fade-in">
    <PageHeader title="Notifications" description="Stay updated on hiring activities" />
    <div className="glass-card divide-y divide-border/30">
      {notifications.map((n, i) => (
        <div key={i} className={`flex items-start gap-4 p-4 hover:bg-secondary/20 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
          <div className={`h-9 w-9 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 ${n.color}`}>
            <n.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
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

export default RecruiterNotifications;
