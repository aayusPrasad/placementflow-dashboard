import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Briefcase, UserCheck, Users, XCircle } from 'lucide-react';
import { Badge, State, StatCard } from '@/components/ui/Shell';
import { useToast } from '@/context/ToastContext';
import { useAsync } from '@/hooks/useAsync';
import { recruiterApi } from '@/services/api';

export function RecruiterDashboard() {
  const dashboard = useAsync(recruiterApi.dashboard, []);

  return (
    <div className="page">
      <div className="grid-cards">
        <StatCard label="Total jobs" value={dashboard.data?.totalJobs ?? 0} icon={<Briefcase />} />
        <StatCard label="Applicants" value={dashboard.data?.totalApplicants ?? 0} icon={<Users />} />
        <StatCard label="Shortlisted" value={dashboard.data?.shortlisted ?? 0} icon={<UserCheck />} />
        <StatCard label="Rejected" value={dashboard.data?.rejected ?? 0} icon={<XCircle />} />
      </div>

      <State loading={dashboard.loading} error={dashboard.error} empty={false}>
        <Panel title="Recent activity">
          <Row
            main="Applications in pipeline"
            sub={`${dashboard.data?.applied || 0} currently applied`}
            right={<Badge>Live</Badge>}
          />
        </Panel>
      </State>
    </div>
  );
}

export function Jobs() {
  const { toast } = useToast();
  const jobsRequest = useAsync(recruiterApi.jobs, []);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const create = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await recruiterApi.createJob(formData);
      toast('Job created', 'success');
      await jobsRequest.refetch();
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Create failed', 'error');
    }
  };

  const remove = async (id: string) => {
    try {
      await recruiterApi.deleteJob(id);
      toast('Job deleted', 'success');
      await jobsRequest.refetch();
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Delete failed', 'error');
    }
  };

  return (
    <div className="page grid gap-6 lg:grid-cols-[380px_1fr]">
      <form onSubmit={create} className="card space-y-3">
        {['companyName', 'roleTitle', 'package', 'location', 'eligibility', 'skills', 'deadline', 'description'].map((field) => (
          <input
            key={field}
            className="input"
            placeholder={field}
            onChange={(event) => setFormData((current) => ({ ...current, [field]: event.target.value }))}
          />
        ))}
        <button className="btn w-full">Post job</button>
      </form>

      <State loading={jobsRequest.loading} error={jobsRequest.error} empty={!jobsRequest.data?.length}>
        <div className="grid gap-4">
          {jobsRequest.data?.map((job) => (
            <div className="card" key={job._id}>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{job.roleTitle}</h3>
                  <p className="text-muted-foreground">
                    {job.companyName} • {job.location}
                  </p>
                </div>
                <button className="btn-ghost" onClick={() => remove(job._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </State>
    </div>
  );
}

export function Applicants() {
  const applicantsRequest = useAsync(recruiterApi.applicants, []);
  const applicants = applicantsRequest.data?.applicants || [];

  return (
    <div className="page">
      <State loading={applicantsRequest.loading} error={applicantsRequest.error} empty={!applicants.length}>
        <Panel title="Applicants">
          {applicants.map((applicant, index) => (
            <Row
              key={index}
              main={applicant.name}
              sub={`${applicant.branch || 'Branch N/A'} • CGPA ${applicant.cgpa || 'N/A'} • Score ${
                applicant.score || applicant.resumeScore || 0
              }`}
              right={<Badge>{applicant.status || 'applied'}</Badge>}
            />
          ))}
        </Panel>
      </State>
    </div>
  );
}

export function Shortlist() {
  const shortlistRequest = useAsync(async () => {
    const response = await recruiterApi.shortlisted();
    return Array.isArray(response) ? response : response.applicants || [];
  }, []);

  return (
    <div className="page">
      <State loading={shortlistRequest.loading} error={shortlistRequest.error} empty={!shortlistRequest.data?.length}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shortlistRequest.data?.map((applicant, index) => (
            <div className="card" key={index}>
              <h3 className="font-bold">{applicant.name}</h3>
              <p className="text-sm text-muted-foreground">{applicant.email || 'Email unavailable'}</p>
              <p>
                CGPA: {applicant.cgpa || 'N/A'} • Score: {applicant.score || applicant.resumeScore || 0}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="btn">Schedule Interview</button>
                <button className="btn-ghost">Notify</button>
              </div>
            </div>
          ))}
        </div>
      </State>
    </div>
  );
}

export function RecruiterAnalytics() {
  const dashboard = useAsync(recruiterApi.dashboard, []);
  const data = useMemo(
    () => [
      { name: 'Applicants', value: dashboard.data?.totalApplicants || 0 },
      { name: 'Shortlisted', value: dashboard.data?.shortlisted || 0 },
      { name: 'Rejected', value: dashboard.data?.rejected || 0 },
      { name: 'Jobs', value: dashboard.data?.totalJobs || 0 },
    ],
    [dashboard.data],
  );

  return (
    <State loading={dashboard.loading} error={dashboard.error} empty={data.every((item) => !item.value)}>
      <div className="page grid gap-6 lg:grid-cols-2">
        <div className="card h-80">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card h-80">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </State>
  );
}

export function RecruiterSettings() {
  const { toast } = useToast();
  const profileRequest = useAsync(recruiterApi.profile, []);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await recruiterApi.updateProfile(formData);
      toast('Profile updated', 'success');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Update failed', 'error');
    }
  };

  return (
    <form onSubmit={submit} className="page card max-w-2xl">
      {['recruiterName', 'companyName', 'designation', 'website'].map((field) => (
        <input
          key={field}
          className="input"
          placeholder={field}
          defaultValue={(profileRequest.data as Record<string, string> | null)?.[field] || ''}
          onChange={(event) => setFormData((current) => ({ ...current, [field]: event.target.value }))}
        />
      ))}
      <button className="btn">Save recruiter profile</button>
    </form>
  );
}

export function RecruiterInterviews() {
  return <Applicants />;
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