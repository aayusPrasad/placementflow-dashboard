import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { authApi } from '@/services/api';

function AuthShell({ kind, signup = false }: { kind: 'student' | 'recruiter'; signup?: boolean }) {
  const navigate = useNavigate();
  const { loginStudent, loginRecruiter } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const setField = (key: string, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signup) {
        if (kind === 'student') {
          await authApi.studentSignup(formData as { name: string; email: string; password: string });
        } else {
          await authApi.recruiterSignup(
            formData as {
              email: string;
              password: string;
              companyName?: string;
              recruiterName?: string;
              designation?: string;
              website?: string;
            },
          );
        }

        toast('Signup successful. Please login.', 'success');
        navigate(`/${kind}-login`);
      } else {
        if (kind === 'student') {
          await loginStudent(formData.email, formData.password);
        } else {
          await loginRecruiter(formData.email, formData.password);
        }

        toast('Logged in successfully', 'success');
        navigate(`/${kind}/dashboard`);
      }
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(99,102,241,.28),transparent_35%)] p-6">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <Link to="/" className="gradient-text text-2xl font-black">
          PlacementFlow AI
        </Link>
        <h1 className="text-3xl font-bold capitalize">
          {kind} {signup ? 'signup' : 'login'}
        </h1>

        {signup && (
          <input
            className="input"
            placeholder={kind === 'student' ? 'Full name' : 'Company name'}
            onChange={(event) => setField(kind === 'student' ? 'name' : 'companyName', event.target.value)}
            required
          />
        )}

        {signup && kind === 'recruiter' && (
          <>
            <input
              className="input"
              placeholder="Recruiter name"
              onChange={(event) => setField('recruiterName', event.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Designation"
              onChange={(event) => setField('designation', event.target.value)}
            />
            <input
              className="input"
              placeholder="Website"
              onChange={(event) => setField('website', event.target.value)}
            />
          </>
        )}

        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(event) => setField('email', event.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(event) => setField('password', event.target.value)}
          required
        />
        <button disabled={loading} className="btn w-full">
          {loading ? 'Please wait...' : signup ? 'Create account' : 'Login'}
        </button>
        <p className="text-sm text-muted-foreground">
          {signup ? 'Already have an account?' : 'Need an account?'}{' '}
          <Link className="text-primary" to={`/${kind}-${signup ? 'login' : 'signup'}`}>
            {signup ? 'Login' : 'Signup'}
          </Link>
        </p>
      </form>
    </div>
  );
}

export function StudentLogin() {
  return <AuthShell kind="student" />;
}

export function StudentSignup() {
  return <AuthShell kind="student" signup />;
}

export function RecruiterLogin() {
  return <AuthShell kind="recruiter" />;
}

export function RecruiterSignup() {
  return <AuthShell kind="recruiter" signup />;
}