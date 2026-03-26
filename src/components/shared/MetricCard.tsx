import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
}

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) => (
  <div className="metric-card group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-1 mt-3">
        {trend.positive ? (
          <TrendingUp className="h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span className={`text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
          {trend.value}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    )}
  </div>
);

export default MetricCard;
