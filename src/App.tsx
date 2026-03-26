import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Student pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import ResumeAnalyzer from "@/pages/student/ResumeAnalyzer";
import Companies from "@/pages/student/Companies";
import Applications from "@/pages/student/Applications";
import StudentInterviews from "@/pages/student/Interviews";
import StudentNotifications from "@/pages/student/Notifications";
import StudentAnalytics from "@/pages/student/StudentAnalytics";
import StudentProfile from "@/pages/student/StudentProfile";
import StudentSettings from "@/pages/student/Settings";

// Recruiter pages
import RecruiterDashboard from "@/pages/recruiter/RecruiterDashboard";
import CreateJob from "@/pages/recruiter/CreateJob";
import Applicants from "@/pages/recruiter/Applicants";
import Shortlist from "@/pages/recruiter/Shortlist";
import RecruiterInterviews from "@/pages/recruiter/RecruiterInterviews";
import RecruiterNotifications from "@/pages/recruiter/RecruiterNotifications";
import RecruiterAnalytics from "@/pages/recruiter/RecruiterAnalytics";
import RecruiterProfile from "@/pages/recruiter/RecruiterProfile";
import RecruiterSettings from "@/pages/recruiter/RecruiterSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RoleRouter = () => {
  const { role } = useRole();

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {role === "student" ? (
          <>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/interviews" element={<StudentInterviews />} />
            <Route path="/notifications" element={<StudentNotifications />} />
            <Route path="/analytics" element={<StudentAnalytics />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/settings" element={<StudentSettings />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<RecruiterDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/shortlist" element={<Shortlist />} />
            <Route path="/interviews" element={<RecruiterInterviews />} />
            <Route path="/notifications" element={<RecruiterNotifications />} />
            <Route path="/analytics" element={<RecruiterAnalytics />} />
            <Route path="/profile" element={<RecruiterProfile />} />
            <Route path="/settings" element={<RecruiterSettings />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RoleProvider>
        <BrowserRouter>
          <RoleRouter />
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
