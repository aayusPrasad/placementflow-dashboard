import { AlertCircle, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

export function StatCard({
  label,
  value,
  icon,
  accent = 'from-indigo-500 to-cyan-400',
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <div className="card relative overflow-hidden">
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="rounded-xl bg-muted p-2">{icon}</div>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
    </div>
  );
}

export function State({
  loading,
  error,
  empty,
  children,
}: {
  loading?: boolean;
  error?: string;
  empty?: boolean;
  children: ReactNode;
}) {
  if (loading) {
    return (
      <div className="card flex items-center gap-2">
        <Loader2 className="animate-spin" />
        Loading backend data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="card flex items-center gap-2 border-red-500/40 text-red-400">
        <AlertCircle />
        {error}
      </div>
    );
  }

  if (empty) {
    return <div className="card text-muted-foreground">No backend records found yet.</div>;
  }

  return <>{children}</>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge bg-muted/60">{children}</span>;
}