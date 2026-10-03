import axios, {
  AxiosError,
  type AxiosProgressEvent,
  type AxiosRequestConfig,
} from 'axios';

import type {
  Applicant,
  Application,
  Job,
  Recruiter,
  RecruiterDashboard,
  ResumeAnalysis,
  Student,
  StudentDashboard,
} from '@/types';

/* ========================= API BASE URL ========================= */

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : '/api';

const configuredApiBaseUrl = import.meta.env.VITE_API_URL?.trim();

const apiBaseUrl = (
  configuredApiBaseUrl || DEFAULT_API_BASE_URL
).replace(/\/+$/, '');

/* ========================= AXIOS INSTANCE ========================= */

export const api = axios.create({
  baseURL: apiBaseUrl,
});

/* ========================= TOKEN HELPERS ========================= */

const getToken = (role: 'student' | 'recruiter') => {
  if (role === 'student') {
    return localStorage.getItem('studentToken');
  }
  return localStorage.getItem('recruiterToken');
};

/* ========================= AUTH CONFIG ========================= */

const auth = (
  role: 'student' | 'recruiter'
): AxiosRequestConfig => {
  const token = getToken(role);

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ========================= GENERIC API CALL ========================= */

const call = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      'Something went wrong';

    throw new Error(message);
  }
};

/* ========================= AUTH API ========================= */

export const authApi = {
  studentLogin: (data: { email: string; password: string }) =>
    call<{
      token: string;
      student?: Student;
      user?: Student;
      message?: string;
    }>({
      method: 'POST',
      url: '/auth/login/student',
      data,
    }),

  studentSignup: (data: Record<string, unknown>) =>
    call<{
      token?: string;
      student?: Student;
      user?: Student;
      message?: string;
    }>({
      method: 'POST',
      url: '/auth/signup/student',
      data,
    }),

  recruiterLogin: (data: { email: string; password: string }) =>
    call<{
      token: string;
      recruiter?: Recruiter;
      user?: Recruiter;
      message?: string;
    }>({
      method: 'POST',
      url: '/auth/login/recruiter',
      data,
    }),

  recruiterSignup: (data: Record<string, unknown>) =>
    call<{
      token?: string;
      recruiter?: Recruiter;
      user?: Recruiter;
      message?: string;
    }>({
      method: 'POST',
      url: '/auth/signup/recruiter',
      data,
    }),
};

/* ========================= STUDENT API ========================= */

export const studentApi = {
  profile: () =>
    call<Student>({
      method: 'GET',
      url: '/student/profile',
      ...auth('student'),
    }),

  dashboard: () =>
    call<StudentDashboard>({
      method: 'GET',
      url: '/student/dashboard',
      ...auth('student'),
    }),

  applications: () =>
    call<Application[]>({
      method: 'GET',
      url: '/student/applications',
      ...auth('student'),
    }),

  apply: (jobId: string) =>
    call<Application>({
      method: 'POST',
      url: '/applicants/apply',
      data: { jobId },
      ...auth('student'),
    }),

  settings: (data: Record<string, unknown>) =>
    call<Student>({
      method: 'PUT',
      url: '/settings',
      data,
      ...auth('student'),
    }),

  /* ========================= RESUME UPLOAD ========================= */

  uploadResume: (
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    const formData = new FormData();
    formData.append('resume', file);

    const token = getToken('student');

    return call<ResumeAnalysis>({
      method: 'POST',
      url: '/resume/upload',
      data: formData,
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
      onUploadProgress,
    });
  },
};

/* ========================= RECRUITER API ========================= */

export const recruiterApi = {
  dashboard: () =>
    call<RecruiterDashboard>({
      method: 'GET',
      url: '/recruiter/dashboard',
      ...auth('recruiter'),
    }),

  profile: () =>
    call<Recruiter>({
      method: 'GET',
      url: '/recruiter/profile',
      ...auth('recruiter'),
    }),

  updateProfile: (data: Record<string, unknown>) =>
    call<Recruiter>({
      method: 'PUT',
      url: '/recruiter/profile',
      data,
      ...auth('recruiter'),
    }),

  jobs: () =>
    call<Job[]>({
      method: 'GET',
      url: '/recruiter/jobs',
      ...auth('recruiter'),
    }),

  createJob: (data: Record<string, unknown>) =>
    call<Job>({
      method: 'POST',
      url: '/jobs',
      data,
      ...auth('recruiter'),
    }),

  updateJob: (jobId: string, data: Record<string, unknown>) =>
    call<Job>({
      method: 'PUT',
      url: `/recruiter/job/${jobId}`,
      data,
      ...auth('recruiter'),
    }),

  deleteJob: (jobId: string) =>
    call<{ message: string }>({
      method: 'DELETE',
      url: `/recruiter/job/${jobId}`,
      ...auth('recruiter'),
    }),

  applicants: () =>
    call<Applicant[]>({
      method: 'GET',
      url: '/applicants',
      ...auth('recruiter'),
    }),

  applicantsByJob: (jobId: string) =>
    call<Applicant[]>({
      method: 'GET',
      url: `/applicants/job/${jobId}`,
      ...auth('recruiter'),
    }),

  shortlisted: () =>
    call<Applicant[]>({
      method: 'GET',
      url: '/applicants/shortlisted',
      ...auth('recruiter'),
    }),
};

/* ========================= JOBS API ========================= */

export const jobsApi = {
  all: () =>
    call<Job[]>({
      method: 'GET',
      url: '/jobs',
    }),

  getById: (jobId: string) =>
    call<Job>({
      method: 'GET',
      url: `/jobs/${jobId}`,
    }),
};
