import PageHeader from "@/components/shared/PageHeader";
import MetricCard from "@/components/shared/MetricCard";
import { BarChart3, TrendingUp, Target, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const branchData = [
  { branch: "CSE", apps: 245 }, { branch: "IT", apps: 89 },
  { branch: "ECE", apps: 67 }, { branch: "EE", apps: 34 }, { branch: "ME", apps: 21 },
];

const selectionData = [
  { name: "Selected", value: 12, color: "hsl(142, 60%, 45%)" },
  { name: "Waitlisted", value: 8, color: "hsl(38, 92%, 50%)" },
  { name: "Rejected", value: 65, color: "hsl(0, 72%, 51%)" },
];

const jobData = [
  { role: "SDE Intern", views: 1200, apps: 245, selected: 5 },
  { role: "ML Engineer", views: 800, apps: 89, selected: 3 },
  { role: "Backend Dev", views: 650, apps: 122, selected: 4 },
];

const tooltipStyle = { background: "hsl(224, 35%, 10%)", border: "1px solid hsl(224, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" };

const RecruiterAnalytics = () => (
  <div className="animate-fade-in">
    <PageHeader title="Analytics" description="Hiring performance insights and metrics" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard title="Selection Rate" value="2.6%" subtitle="Applications to offers" icon={Target} trend={{ value: "+0.4%", positive: true }} />
      <MetricCard title="Avg. Time to Hire" value="18 days" subtitle="From post to offer" icon={TrendingUp} trend={{ value: "-3 days", positive: true }} />
      <MetricCard title="Active Candidates" value={280} subtitle="In pipeline" icon={Users} />
      <MetricCard title="Offer Acceptance" value="83%" subtitle="Offers accepted" icon={BarChart3} trend={{ value: "+5%", positive: true }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Applications by Branch</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={branchData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 20%, 18%)" />
            <XAxis dataKey="branch" stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="apps" fill="hsl(250, 75%, 60%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Selection Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={selectionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
              {selectionData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 justify-center">
          {selectionData.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Job Post Performance</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {["Role", "Views", "Applications", "Selected", "Conversion"].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobData.map((j, i) => (
              <tr key={i} className="border-b border-border/30">
                <td className="py-3 font-medium text-foreground">{j.role}</td>
                <td className="py-3 text-muted-foreground">{j.views.toLocaleString()}</td>
                <td className="py-3 text-muted-foreground">{j.apps}</td>
                <td className="py-3 text-success font-medium">{j.selected}</td>
                <td className="py-3 text-primary font-medium">{((j.selected / j.apps) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default RecruiterAnalytics;
