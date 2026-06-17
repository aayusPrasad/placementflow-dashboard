import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bell, Briefcase, Building2, Calendar, CheckCircle, Sparkles, UploadCloud } from 'lucide-react';
import { Badge, State, StatCard } from '@/components/ui/Shell';
import { useToast } from '@/context/ToastContext';
import { useAsync } from '@/hooks/useAsync';
import { jobsApi, studentApi } from '@/services/api';
import type { Job, ResumeAnalysis } from '@/types';

export function StudentDashboard() {
  const dashboard = useAsync(studentApi.dashboard, []);
  const applications = dashboard.data?.applications || [];

  return (
    <div className="page">
      <div className="grid-cards">
        <StatCard label="Applications" value={dashboard.data?.totalApplications ?? 0} icon={<Briefcase />} />
        <StatCard
          label="Interviews"
          value={applications.filter((application) => application.status === 'shortlisted').length}
          icon={<Calendar />}
        />
        <StatCard label="Eligible companies" value={dashboard.data?.student?.eligibleCompanies ?? 0} icon={<Building2 />} />
        <StatCard label="Resume score" value={dashboard.data?.student?.resumeScore ?? 0} icon={<Sparkles />} />
      </div>

      <State loading={dashboard.loading} error={dashboard.error} empty={!applications.length}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Recent activity">
            {applications.slice(0, 5).map((application) => (
              <Row
                key={application._id}
                main={application.job?.companyName || application.company || 'Company'}
                sub={application.job?.roleTitle || application.role || 'Role'}
                right={<Badge>{application.status}</Badge>}
              />
            ))}
          </Panel>
          <Panel title="Upcoming interviews">
            {applications
              .filter((application) => application.status === 'shortlisted')
              .map((application) => (
                <Row
                  key={application._id}
                  main={application.job?.companyName || 'Company'}
                  sub="Interview stage"
                  right={<CheckCircle className="text-emerald-400" />}
                />
              ))}
          </Panel>
        </div>
      </State>
    </div>
  );
}

export function Companies() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const jobsRequest = useAsync(jobsApi.all, []);

  const jobs = (jobsRequest.data || []).filter((job) =>
    `${job.companyName} ${job.roleTitle} ${job.location}`.toLowerCase().includes(query.toLowerCase()),
  );

  const apply = async (jobId: string) => {
    try {
      await studentApi.apply(jobId);
      toast('Application submitted', 'success');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Apply failed', 'error');
    }
  };

  return (
    <div className="page">
      <input
        className="input"
        placeholder="Search companies, roles, locations..."
        onChange={(event) => setQuery(event.target.value)}
      />
      <State loading={jobsRequest.loading} error={jobsRequest.error} empty={!jobs.length}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div className="card" key={job._id}>
              <h3 className="text-xl font-bold">{job.companyName}</h3>
              <p className="text-primary">{job.roleTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {job.location} • {job.package}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills?.map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
              <div className="mt-5 flex gap-2">
                <button className="btn-ghost" onClick={() => setActiveJob(job)}>
                  Details
                </button>
                <button className="btn" onClick={() => apply(job._id)}>
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </State>

      {activeJob && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setActiveJob(null)}>
          <div className="card max-w-xl" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-2xl font-bold">{activeJob.roleTitle}</h2>
            <p className="text-muted-foreground">{activeJob.description}</p>
            <p className="mt-3">Eligibility: {activeJob.eligibility || 'Not specified'}</p>
            <button className="btn mt-4" onClick={() => apply(activeJob._id)}>
              Apply now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Applications() {
  const [query, setQuery] = useState('');
  const applicationsRequest = useAsync(studentApi.applications, []);
  const applications = (applicationsRequest.data || []).filter((application) =>
    `${application.job?.companyName} ${application.job?.roleTitle} ${application.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="page">
      <input className="input" placeholder="Search applications" onChange={(event) => setQuery(event.target.value)} />
      <State loading={applicationsRequest.loading} error={applicationsRequest.error} empty={!applications.length}>
        <Panel title="Applications">
          {applications.map((application) => (
            <Row
              key={application._id}
              main={`${application.job?.companyName || 'Company'} — ${application.job?.roleTitle || 'Role'}`}
              sub={new Date(application.createdAt || Date.now()).toLocaleDateString()}
              right={<Badge>{application.status}</Badge>}
            />
          ))}
        </Panel>
      </State>
    </div>
  );
}

export function Interviews() {
  const applicationsRequest = useAsync(studentApi.applications, []);
  const upcoming = (applicationsRequest.data || []).filter((application) => application.status === 'shortlisted');

  return (
    <div className="page">
      <State loading={applicationsRequest.loading} error={applicationsRequest.error} empty={!upcoming.length}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Upcoming interviews">
            {upcoming.map((application) => (
              <Row
                key={application._id}
                main={application.job?.companyName || 'Company'}
                sub={application.job?.roleTitle || 'Role'}
                right={<Badge>Scheduled</Badge>}
              />
            ))}
          </Panel>
          <Panel title="Calendar view">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, index) => (
                <div className="rounded-xl bg-muted/60 p-3 text-center" key={index}>
                  {index + 1}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </State>
    </div>
  );
}

export function Notifications() {
  const profileRequest = useAsync(studentApi.profile, []);
  const notifications = profileRequest.data?.student.notifications || [];

  return (
    <div className="page">
      <State loading={profileRequest.loading} error={profileRequest.error} empty={!notifications.length}>
        <Panel title="Notifications">
          {notifications.map((notification, index) => (
            <Row
              key={index}
              main={typeof notification === 'string' ? notification : JSON.stringify(notification)}
              sub="From PlacementFlow"
              right={<Bell />}
            />
          ))}
        </Panel>
      </State>
    </div>
  );
}

export function Settings() {
  const { toast } = useToast();
  const settingsRequest = useAsync(studentApi.settings, []);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await studentApi.updateSettings({ ...settingsRequest.data, ...formData });
      toast('Settings updated', 'success');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Update failed', 'error');
    }
  };

  return (
    <form onSubmit={submit} className="page card max-w-2xl">
      {['phone', 'github', 'linkedin', 'bio', 'skills'].map((field) => (
        <input
          key={field}
          className="input"
          placeholder={field}
          defaultValue={(settingsRequest.data as Record<string, string> | null)?.[field] || ''}
          onChange={(event) => setFormData((current) => ({ ...current, [field]: event.target.value }))}
        />
      ))}
      <button className="btn">Save settings</button>
    </form>
  );
}

export function ResumeAnalyzer() {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const upload = async (file?: File) => {
    if (!file) return;

    try {
      const response = await studentApi.uploadResume(file, (event) => {
        setProgress(Math.round((event.loaded * 100) / (event.total || event.loaded)));
      });
      setResult(response.data);
      toast('Resume analyzed', 'success');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Upload failed', 'error');
    }
  };

  return (
    <div className="page">
      <label className="card grid cursor-pointer place-items-center border-dashed py-16">
        <UploadCloud size={46} />
        <p>Drop or choose PDF resume</p>
        <input hidden type="file" accept="application/pdf" onChange={(event) => upload(event.target.files?.[0])} />
        <div className="mt-4 h-2 w-full max-w-md rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </label>

      {result && (
        <Panel title={`Resume score: ${result.score}`}>
          <Section title="Strengths" items={result.strengths} />
          <Section title="Weaknesses" items={result.weaknesses} />
          <Section title="Suggestions" items={result.suggestions} />
        </Panel>
      )}
    </div>
  );
}

export function StudentAnalytics() {
  const dashboard = useAsync(studentApi.dashboard, []);
  const data = useMemo(
    () => [
      { name: 'Applied', value: dashboard.data?.applied || 0 },
      { name: 'Shortlisted', value: dashboard.data?.shortlisted || 0 },
      { name: 'Rejected', value: dashboard.data?.rejected || 0 },
    ],
    [dashboard.data],
  );

  return <Charts loading={dashboard.loading} error={dashboard.error} data={data} />;
}

function Charts({ loading, error, data }: { loading: boolean; error: string; data: { name: string; value: number }[] }) {
  return (
    <State loading={loading} error={error} empty={data.every((item) => !item.value)}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card h-80">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name">
                {data.map((_, index) => (
                  <Cell key={index} fill={['#6366f1', '#22c55e', '#ef4444'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </State>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ main, sub, right }: { main: string; sub: string; right: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
      <div>
        <p className="font-semibold">{main}</p>
        <p className="text-sm text-muted-foreground">{sub}</p>
      </div>
      {right}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <ul className="list-disc pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}