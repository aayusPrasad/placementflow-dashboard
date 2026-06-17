import { ArrowRight, Brain, Building2, ChartBar, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroCards = [
  ['Live jobs', Building2],
  ['AI resume score', Brain],
  ['Placement analytics', ChartBar],
  ['Secure portals', ShieldCheck],
] as const;

const sections = ['Features', 'AI Resume Analyzer', 'Placement Statistics', 'Student Success'];
const sectionFeatures = ['Unified workflows', 'Real-time insights', 'AI recommendations'];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.35),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,.20),transparent_25%)] px-6 py-8">
        <nav className="container flex items-center justify-between">
          <div className="gradient-text text-2xl font-black">PlacementFlow AI</div>
          <div className="flex gap-2">
            <Link className="btn-ghost" to="/student-login">
              Student
            </Link>
            <Link className="btn" to="/recruiter-login">
              Recruiter
            </Link>
          </div>
        </nav>

        <div className="container grid items-center gap-10 py-24 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="badge w-fit">AI powered campus placements</div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Premium placement automation for{' '}
              <span className="gradient-text">students & recruiters.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Connect resumes, applications, interviews, analytics, and recruiter pipelines directly to
              your PlacementFlow backend.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn" to="/student-signup">
                Start as Student
                <ArrowRight size={18} />
              </Link>
              <Link className="btn-ghost" to="/recruiter-signup">
                Hire talent
              </Link>
            </div>
          </div>

          <div className="card animate-float">
            <div className="grid gap-4 md:grid-cols-2">
              {heroCards.map(([title, Icon]) => (
                <div className="rounded-2xl border bg-background/50 p-5" key={title}>
                  <Icon className="mb-5 text-primary" />
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Backend-connected, responsive and production-ready.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {sections.map((title) => (
        <section key={title} className="container py-20">
          <div className="card">
            <Sparkles className="text-primary" />
            <h2 className="mt-3 text-4xl font-black">{title}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A Lovable-style SaaS experience with glass cards, gradients, clean typography, smooth
              motion, protected routing, loading states, error states and empty states.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[Users, ChartBar, Brain].map((Icon, index) => (
                <div className="rounded-2xl bg-muted/50 p-5" key={sectionFeatures[index]}>
                  <Icon />
                  <p className="mt-4 font-semibold">{sectionFeatures[index]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container pb-20">
        <div className="card text-center">
          <h2 className="text-4xl font-black">Ready to modernize placements?</h2>
          <Link className="btn mt-6" to="/student-signup">
            Launch portal
          </Link>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © PlacementFlow AI
      </footer>
    </div>
  );
}