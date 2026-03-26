const statusStyles: Record<string, string> = {
  applied: "bg-info/15 text-info border-info/20",
  shortlisted: "bg-warning/15 text-warning border-warning/20",
  selected: "bg-success/15 text-success border-success/20",
  rejected: "bg-destructive/15 text-destructive border-destructive/20",
  pending: "bg-muted text-muted-foreground border-border",
  scheduled: "bg-primary/15 text-primary border-primary/20",
  completed: "bg-success/15 text-success border-success/20",
  active: "bg-success/15 text-success border-success/20",
  closed: "bg-muted text-muted-foreground border-border",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status.toLowerCase()] || statusStyles.pending}`}>
    {status}
  </span>
);

export default StatusBadge;
