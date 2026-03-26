import { Calendar, Video, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const upcoming = [
  { company: "Google", role: "SDE Intern", date: "Mar 28, 2026", time: "10:00 AM", type: "Technical Round 1", mode: "Virtual", status: "Scheduled" },
  { company: "Amazon", role: "SDE I", date: "Mar 30, 2026", time: "2:00 PM", type: "HR Round", mode: "In-Person", status: "Scheduled" },
  { company: "Stripe", role: "Backend Engineer", date: "Apr 2, 2026", time: "11:30 AM", type: "System Design", mode: "Virtual", status: "Scheduled" },
];

const past = [
  { company: "Microsoft", role: "Software Engineer", date: "Mar 10, 2026", type: "Technical", result: "Passed" },
  { company: "Adobe", role: "ML Engineer", date: "Mar 5, 2026", type: "Coding Round", result: "Passed" },
  { company: "Meta", role: "Frontend Engineer", date: "Feb 28, 2026", type: "Technical", result: "Failed" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => {
  const hasInterview = [28, 30].includes(i + 1);
  return { day: i + 1, hasInterview };
});

const Interviews = () => (
  <div className="animate-fade-in">
    <PageHeader title="Interviews" description="Manage your interview schedule" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Upcoming Interviews</h3>
        {upcoming.map((iv, i) => (
          <div key={i} className="glass-card p-4 hover:shadow-elevated transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">{iv.company}</h4>
                <p className="text-xs text-muted-foreground">{iv.role} • {iv.type}</p>
              </div>
              <StatusBadge status={iv.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{iv.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{iv.time}</span>
              <span className="flex items-center gap-1">{iv.mode === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}{iv.mode}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">March 2026</h3>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["S","M","T","W","T","F","S"].map((d) => (
            <span key={d} className="text-xs text-muted-foreground py-1">{d}</span>
          ))}
          {calendarDays.map((d) => (
            <button key={d.day} className={`text-xs py-1.5 rounded-md transition-colors ${
              d.hasInterview ? "gradient-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-secondary/50"
            }`}>{d.day}</button>
          ))}
        </div>
      </div>
    </div>

    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Past Interviews</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {["Company", "Role", "Date", "Type", "Result"].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {past.map((iv, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 font-medium text-foreground">{iv.company}</td>
                <td className="py-3 text-muted-foreground">{iv.role}</td>
                <td className="py-3 text-muted-foreground">{iv.date}</td>
                <td className="py-3 text-muted-foreground">{iv.type}</td>
                <td className="py-3"><StatusBadge status={iv.result === "Passed" ? "Selected" : "Rejected"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Interviews;
