import { Search, Filter } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";

const applicants = [
  { name: "Arjun Sharma", branch: "CSE", cgpa: 8.74, skills: ["React", "Python", "DSA"], score: 87, status: "Shortlisted" },
  { name: "Priya Patel", branch: "CSE", cgpa: 9.1, skills: ["Java", "ML", "SQL"], score: 92, status: "Applied" },
  { name: "Rahul Kumar", branch: "ECE", cgpa: 8.2, skills: ["C++", "Embedded", "IoT"], score: 78, status: "Applied" },
  { name: "Sneha Reddy", branch: "IT", cgpa: 8.5, skills: ["Node.js", "React", "MongoDB"], score: 85, status: "Shortlisted" },
  { name: "Vikram Singh", branch: "CSE", cgpa: 7.9, skills: ["Python", "Django", "SQL"], score: 74, status: "Rejected" },
  { name: "Ananya Gupta", branch: "CSE", cgpa: 9.3, skills: ["Go", "K8s", "AWS"], score: 94, status: "Applied" },
  { name: "Karan Mehta", branch: "ME", cgpa: 7.5, skills: ["Python", "Data Analysis"], score: 68, status: "Rejected" },
  { name: "Deepika Nair", branch: "CSE", cgpa: 8.8, skills: ["React", "TypeScript", "GraphQL"], score: 89, status: "Shortlisted" },
];

const Applicants = () => (
  <div className="animate-fade-in">
    <PageHeader title="Applicants" description="Review and manage candidate applications" />

    <div className="glass-card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search applicants..." className="h-9 w-full rounded-lg bg-secondary/50 border border-border/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="h-3 w-3" /> Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {["Name", "Branch", "CGPA", "Skills", "Resume Score", "Status", "Action"].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applicants.map((a, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 font-medium text-foreground">{a.name}</td>
                <td className="py-3 text-muted-foreground">{a.branch}</td>
                <td className="py-3 text-muted-foreground">{a.cgpa}</td>
                <td className="py-3">
                  <div className="flex gap-1 flex-wrap">
                    {a.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{s}</span>
                    ))}
                    {a.skills.length > 2 && <span className="text-xs text-muted-foreground">+{a.skills.length - 2}</span>}
                  </div>
                </td>
                <td className="py-3"><span className="text-xs font-medium text-primary">{a.score}/100</span></td>
                <td className="py-3"><StatusBadge status={a.status} /></td>
                <td className="py-3">
                  <button className="text-xs font-medium text-primary hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Applicants;
