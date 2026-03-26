import { Search, Filter } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const applications = [
  { company: "Google", role: "SDE Intern", date: "Mar 15, 2026", status: "Shortlisted", stage: 3 },
  { company: "Microsoft", role: "Software Engineer", date: "Mar 12, 2026", status: "Applied", stage: 1 },
  { company: "Amazon", role: "SDE I", date: "Mar 10, 2026", status: "Selected", stage: 5 },
  { company: "Meta", role: "Frontend Engineer", date: "Mar 8, 2026", status: "Rejected", stage: 2 },
  { company: "Adobe", role: "ML Engineer", date: "Mar 5, 2026", status: "Applied", stage: 1 },
  { company: "Stripe", role: "Backend Engineer", date: "Mar 3, 2026", status: "Shortlisted", stage: 3 },
  { company: "Flipkart", role: "Full Stack Dev", date: "Feb 28, 2026", status: "Applied", stage: 1 },
  { company: "Uber", role: "Data Engineer", date: "Feb 25, 2026", status: "Shortlisted", stage: 2 },
];

const stages = ["Applied", "Screening", "Shortlisted", "Interview", "Selected"];

const Applications = () => (
  <div className="animate-fade-in">
    <PageHeader title="Applications" description="Track all your placement applications" />

    <div className="glass-card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search applications..." className="h-9 w-full rounded-lg bg-secondary/50 border border-border/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="h-3 w-3" /> Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {["Company", "Role", "Date", "Status", "Progress"].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 font-medium text-foreground">{app.company}</td>
                <td className="py-3 text-muted-foreground">{app.role}</td>
                <td className="py-3 text-muted-foreground">{app.date}</td>
                <td className="py-3"><StatusBadge status={app.status} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    {stages.map((_, si) => (
                      <div key={si} className={`h-1.5 w-6 rounded-full ${si < app.stage ? "bg-primary" : "bg-secondary"}`} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Applications;
