import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import LandingPage from '@/pages/LandingPage';
import {
  RecruiterLogin,
  RecruiterSignup,
  StudentLogin,
  StudentSignup,
} from '@/pages/AuthPages';
import {
  Applications,
  Companies,
  Interviews,
  Notifications,
  ResumeAnalyzer,
  Settings,
  StudentAnalytics,
  StudentDashboard,
} from '@/pages/student/StudentPages';
import {
  Applicants,
  Jobs,
  RecruiterAnalytics,
  RecruiterDashboard,
  RecruiterInterviews,
  RecruiterSettings,
  Shortlist,
} from '@/pages/recruiter/RecruiterPages';

function Protected({ role }: { role: 'student' | 'recruiter' }) {
  const auth = useAuth();
  const hasToken = role === 'student' ? auth.studentToken : auth.recruiterToken;

  return hasToken ? <DashboardLayout role={role} /> : <Navigate to={`/${role}-login`} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/recruiter-login" element={<RecruiterLogin />} />
      <Route path="/recruiter-signup" element={<RecruiterSignup />} />

      <Route path="/student" element={<Protected role="student" />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="applications" element={<Applications />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="analytics" element={<StudentAnalytics />} />
        <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/recruiter" element={<Protected role="recruiter" />}>
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="shortlist" element={<Shortlist />} />
        <Route path="interviews" element={<RecruiterInterviews />} />
        <Route path="analytics" element={<RecruiterAnalytics />} />
        <Route path="settings" element={<RecruiterSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}