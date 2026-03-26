import { Briefcase, Users, Calendar, CheckSquare } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, Cell } from "recharts";

const recentApplicants = [
  { name: "Arjun Sharma", role: "SDE Intern", branch: "CSE", cgpa: 8.74, score: 87, status: "Shortlisted" },
  { name: "Priya Patel", role: "SDE Intern", branch: "CSE", cgpa: 9.1, score: 92, status: "Applied" },
  { name: "Rahul Kumar", role: "ML Engineer", branch: "ECE", cgpa: 8.2, score: 78, status: "Applied" },
  { name: "Sneha Reddy", role: "Backend Dev", branch: "IT", cgpa: 8.5, score: 85, status: "Shortlisted" },
  { name: "Vikram Singh", role: "SDE Intern", branch: "CSE", cgpa: 7.9, score: 74, status: "Rejected" },
];

const hiringData = [
  { stage: "Applications", count: 456 },
  { stage: "Screened", count: 280 },
  { stage: "Shortlisted", count: 85 },
  { stage: "Interviewed", count: 42 },
  { stage: "Selected", count: 12 },
];

const jobPerformance = [
  { role: "SDE Intern", apps: 245 }, { role: "ML Engineer", apps: 89 },
  { role: "Backend Dev", apps: 122 }, { role: "Data Analyst", apps: 67 },
];

const tooltipStyle = { background: "hsl(224, 35%, 10%)", border: "1px solid hsl(224, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" };

const RecruiterDashboard = () => (
  <div className="animate-fade-in">
    <PageHeader title="Recruiter Dashboard" description="Manage your hiring pipeline efficiently" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard title="Active Job Posts" value={6} subtitle="Across 3 roles" icon={Briefcase} trend={{ value: "+2", positive: true }} />
      <MetricCard title="Total Applicants" value={456} subtitle="This hiring cycle" icon={Users} trend={{ value: "+18%", positive: true }} />
      <MetricCard title="Interviews Scheduled" value={12} subtitle="Next 2 weeks" icon={Calendar} trend={{ value: "+4", positive: true }} />
      <MetricCard title="Shortlisted" value={85} subtitle="Ready for interviews" icon={CheckSquare} trend={{ value: "+12", positive: true }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Applicants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                {["Name", "Role", "Branch", "CGPA", "Resume", "Status"].map((h) => (
                  <th key={h} className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentApplicants.map((a, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{a.name}</td>
                  <td className="py-3 text-muted-foreground">{a.role}</td>
                  <td className="py-3 text-muted-foreground">{a.branch}</td>
                  <td className="py-3 text-muted-foreground">{a.cgpa}</td>
                  <td className="py-3"><span className="text-xs font-medium text-primary">{a.score}/100</span></td>
                  <td className="py-3"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Hiring Pipeline</h3>
        <div className="space-y-3">
          {hiringData.map((d, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{d.stage}</span>
                <span className="text-foreground font-medium">{d.count}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(d.count / 456) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Job Post Performance</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={jobPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 20%, 18%)" />
            <XAxis dataKey="role" stroke="hsl(215, 15%, 55%)" fontSize={11} />
            <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="apps" fill="hsl(250, 75%, 60%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Selection Funnel</h3>
        <div className="space-y-2">
          {hiringData.map((d, i) => {
            const width = (d.count / hiringData[0].count) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 shrink-0">{d.stage}</span>
                <div className="flex-1 h-7 rounded-md overflow-hidden bg-secondary/30 relative">
                  <div className="h-full rounded-md gradient-primary flex items-center px-2" style={{ width: `${width}%` }}>
                    <span className="text-xs font-medium text-primary-foreground">{d.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default RecruiterDashboard;
