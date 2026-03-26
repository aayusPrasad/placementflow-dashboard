import PageHeader from "@/components/shared/PageHeader";
import MetricCard from "@/components/shared/MetricCard";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const trendData = [
  { month: "Oct", apps: 2 }, { month: "Nov", apps: 5 }, { month: "Dec", apps: 8 },
  { month: "Jan", apps: 6 }, { month: "Feb", apps: 12 }, { month: "Mar", apps: 18 },
];

const categoryData = [
  { name: "Product", value: 8, color: "hsl(250, 75%, 60%)" },
  { name: "Service", value: 6, color: "hsl(199, 89%, 48%)" },
  { name: "Startup", value: 5, color: "hsl(142, 60%, 45%)" },
  { name: "Finance", value: 3, color: "hsl(38, 92%, 50%)" },
];

const conversionData = [
  { stage: "Applied", count: 22 }, { stage: "Screened", count: 15 },
  { stage: "Shortlisted", count: 8 }, { stage: "Interviewed", count: 5 }, { stage: "Selected", count: 2 },
];

const tooltipStyle = { background: "hsl(224, 35%, 10%)", border: "1px solid hsl(224, 20%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" };

const StudentAnalytics = () => (
  <div className="animate-fade-in">
    <PageHeader title="Analytics" description="Insights into your placement journey" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard title="Response Rate" value="68%" subtitle="From applications" icon={TrendingUp} trend={{ value: "+8%", positive: true }} />
      <MetricCard title="Interview Rate" value="36%" subtitle="From shortlists" icon={BarChart3} trend={{ value: "+5%", positive: true }} />
      <MetricCard title="Companies Applied" value={18} subtitle="This season" icon={Users} />
      <MetricCard title="Conversion Rate" value="9%" subtitle="Applied to selected" icon={Target} trend={{ value: "+2%", positive: true }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Applications Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 20%, 18%)" />
            <XAxis dataKey="month" stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="apps" stroke="hsl(250, 75%, 60%)" strokeWidth={2} dot={{ fill: "hsl(250, 75%, 60%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Company Categories</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
              {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryData.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Interview Conversion Funnel</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={conversionData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 20%, 18%)" />
          <XAxis type="number" stroke="hsl(215, 15%, 55%)" fontSize={12} />
          <YAxis dataKey="stage" type="category" stroke="hsl(215, 15%, 55%)" fontSize={12} width={90} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="hsl(250, 75%, 60%)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StudentAnalytics;
