export type ID = string;

export type Job = {
  _id: ID;
  companyName: string;
  roleTitle: string;
  package?: string;
  location?: string;
  eligibility?: string;
  skills?: string[];
  deadline?: string;
  description?: string;
  recruiterId?: string;
};

export type Application = {
  _id: ID;
  job?: Job;
  company?: string;
  role?: string;
  location?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Student = {
  id?: ID;
  _id?: ID;
  name: string;
  email: string;
  branch?: string;
  cgpa?: string;
  semester?: string;
  skills?: string | string[];
  phone?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
  resumeScore?: number;
  resumeFeedback?: string[];
  eligibleCompanies?: number;
  interviews?: number;
  notifications?: unknown[];
};

export type Recruiter = {
  id?: ID;
  _id?: ID;
  companyName?: string;
  recruiterName?: string;
  email: string;
  designation?: string;
  website?: string;
};

export type StudentDashboard = {
  totalApplications?: number;
  applied?: number;
  shortlisted?: number;
  rejected?: number;
  applications?: Application[];
  formattedApplications?: Application[];
  student?: Student;
};

export type RecruiterDashboard = {
  totalJobs: number;
  totalApplicants: number;
  applied: number;
  shortlisted: number;
  rejected: number;
};

export type Applicant = {
  _id?: ID;
  name: string;
  branch?: string;
  cgpa?: string;
  skills?: string[] | string;
  score?: number;
  resumeScore?: number;
  status?: string;
  email?: string;
  role?: string;
  applicationId?: string;
};

export type ResumeAnalysis = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};