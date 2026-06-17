import {
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChartNoAxesCombined,
  FileText,
  Home,
  ListChecks,
  LogOut,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const navigation = {
  student: [
    [Home, 'Dashboard', '/student/dashboard'],
    [Building2, 'Companies', '/student/companies'],
    [ListChecks, 'Applications', '/student/applications'],
    [Calendar, 'Interviews', '/student/interviews'],
    [ChartNoAxesCombined, 'Analytics', '/student/analytics'],
    [Sparkles, 'Resume AI', '/student/resume-analyzer'],
    [Bell, 'Notifications', '/student/notifications'],
    [Settings, 'Settings', '/student/settings'],
  ],
  recruiter: [
    [Home, 'Dashboard', '/recruiter/dashboard'],
    [Briefcase, 'Jobs', '/recruiter/jobs'],
    [Users, 'Applicants', '/recruiter/applicants'],
    [FileText, 'Shortlist', '/recruiter/shortlist'],
    [Calendar, 'Interviews', '/recruiter/interviews'],
    [ChartNoAxesCombined, 'Analytics', '/recruiter/analytics'],
    [Settings, 'Settings', '/recruiter/settings'],
  ],
} as const;

export function DashboardLayout({ role }: { role: 'student' | 'recruiter' }) {
  const { logout, student, recruiter } = useAuth();
  const navigate = useNavigate();
  const name = role === 'student' ? student?.name : recruiter?.companyName;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,.14),transparent_35%)]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-card/50 p-4 backdrop-blur-xl lg:block">
        <div className="mb-8 text-2xl font-black gradient-text">PlacementFlow AI</div>
        <nav className="space-y-2">
          {navigation[role].map(([Icon, label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'hover:bg-muted'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/70 px-4 py-3 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[.3em] text-muted-foreground">{role} portal</p>
            <h1 className="font-semibold">Welcome{name ? `, ${name}` : ''}</h1>
          </div>
          <button
            className="btn-ghost"
            onClick={() => {
              logout(role);
              navigate('/');
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}