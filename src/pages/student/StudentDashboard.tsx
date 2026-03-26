import { ClipboardList, FileText, Building2, Calendar, TrendingUp } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const areaData = [
  { month: "Jan", applications: 4 }, { month: "Feb", applications: 7 }, { month: "Mar", applications: 12 },
  { month: "Apr", applications: 9 }, { month: "May", applications: 15 }, { month: "Jun", applications: 18 },
];

const pieData = [
  { name: "Applied", value: 12, color: "hsl(199, 89%, 48%)" },
  { name: "Shortlisted", value: 5, color: "hsl(38, 92%, 50%)" },
  { name: "Selected", value: 2, color: "hsl(142, 60%, 45%)" },
  { name: "Rejected", value: 3, color: "hsl(0, 72%, 51%)" },
];

const recentApps = [
  { company: "Google", role: "SDE Intern", date: "Mar 15, 2026", status: "Shortlisted" },
  { company: "Microsoft", role: "Software Engineer", date: "Mar 12, 2026", status: "Applied" },
  { company: "Amazon", role: "SDE I", date: "Mar 10, 2026", status: "Selected" },
  { company: "Meta", role: "Frontend Engineer", date: "Mar 8, 2026", status: "Rejected" },
  { company: "Adobe", role: "ML Engineer", date: "Mar 5, 2026", status: "Applied" },
];

const interviews = [
  { company: "Google", role: "SDE Intern", date: "Mar 28, 2026", time: "10:00 AM", type: "Technical" },
  { company: "Amazon", role: "SDE I", date: "Mar 30, 2026", time: "2:00 PM", type: "HR" },
  { company: "Stripe", role: "Backend Engineer", date: "Apr 2, 2026", time: "11:30 AM", type: "System Design" },
];

const StudentDashboard = () => (
  <div className="animate-fade-in">
    <PageHeader title="Student Dashboard" description="Track your placement journey and stay ahead" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard title="Total Applications" value={22} subtitle="Across 18 companies" icon={ClipboardList} trend={{ value: "+12%", positive: true }} />
      <MetricCard title="Resume Score" value="87/100" subtitle="Above average" icon={FileText} trend={{ value: "+5pts", positive: true }} />
      <MetricCard title="Eligible Companies" value={34} subtitle="Based on your profile" icon={Building2} trend={{ value: "+3", positive: true }} />
      <MetricCard title="Upcoming Interviews" value={3} subtitle="Next 7 days" icon={Calendar} trend={{ value: "+2", positive: true }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApps.map((app, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{app.company}</td>
                  <td className="py-3 text-muted-foreground">{app.role}</td>
                  <td className="py-3 text-muted-foreground">{app.date}</td>
                  <td className="py-3"><StatusBadge status={app.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Upcoming Interviews</h3>
        <div className="space-y-3">
          {interviews.map((iv, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{iv.company}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">{iv.type}</span>
              </div>
              <p className="text-xs text-muted-foreground">{iv.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{iv.date} • {iv.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 20%, 18%)" />
            <XAxis dataKey="month" stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(224, 35%, 10%)", border: "1px solid hsl(224, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
            <Area type="monotone" dataKey="applications" stroke="hsl(250, 75%, 60%)" fill="url(#colorApps)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Application Status</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(224, 35%, 10%)", border: "1px solid hsl(224, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {pieData.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
