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

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function getToken(role: 'student' | 'recruiter') {
  return localStorage.getItem(role === 'student' ? 'studentToken' : 'recruiterToken');
}

function auth(role: 'student' | 'recruiter') {
  return {
    Authorization: `Bearer ${getToken(role)}`,
  };
}

async function call<T>(config: AxiosRequestConfig) {
  try {
    const response = await api.request<T>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || axiosError.message || 'API request failed');
  }
}

export const authApi = {
  studentLogin: (body: { email: string; password: string }) =>
    call<{ token: string; student: Student }>({
      url: '/auth/login/student',
      method: 'POST',
      data: body,
    }),

  studentSignup: (body: { name: string; email: string; password: string }) =>
    call<{ message: string }>({
      url: '/auth/signup/student',
      method: 'POST',
      data: body,
    }),

  recruiterLogin: (body: { email: string; password: string }) =>
    call<{ token: string; recruiter: Recruiter }>({
      url: '/auth/login/recruiter',
      method: 'POST',
      data: body,
    }),

  recruiterSignup: (body: Partial<Recruiter> & { password: string }) =>
    call<{ message: string }>({
      url: '/auth/signup/recruiter',
      method: 'POST',
      data: body,
    }),
};

export const studentApi = {
  profile: () =>
    call<{ student: Student }>({
      url: '/student/profile',
      headers: auth('student'),
    }),

  dashboard: () =>
    call<StudentDashboard>({
      url: '/student/dashboard',
      headers: auth('student'),
    }),

  applications: () =>
    call<Application[]>({
      url: '/student/applications',
      headers: auth('student'),
    }),

  apply: (jobId: string) =>
    call<{ message: string }>({
      url: '/applicants/apply',
      method: 'POST',
      headers: auth('student'),
      data: { jobId },
    }),

  settings: () =>
    call<Student>({
      url: '/settings',
      headers: auth('student'),
    }),

  updateSettings: (data: Partial<Student>) =>
    call<{ message: string; student: Student }>({
      url: '/settings',
      method: 'PUT',
      headers: auth('student'),
      data,
    }),

  uploadResume: (file: File, onUploadProgress?: (event: AxiosProgressEvent) => void) => {
    const formData = new FormData();
    formData.append('resume', file);

    return call<{ message: string; data: ResumeAnalysis }>({
      url: '/resume/upload',
      method: 'POST',
      headers: auth('student'),
      data: formData,
      onUploadProgress,
    });
  },
};

export const recruiterApi = {
  dashboard: () =>
    call<RecruiterDashboard>({
      url: '/recruiter/dashboard',
      headers: auth('recruiter'),
    }),

  profile: () =>
    call<Recruiter>({
      url: '/recruiter/profile',
      headers: auth('recruiter'),
    }),

  updateProfile: (data: Partial<Recruiter>) =>
    call<{ message: string; recruiter: Recruiter }>({
      url: '/recruiter/profile',
      method: 'PUT',
      headers: auth('recruiter'),
      data: {
        ...data,
        name: data.recruiterName,
        company: data.companyName,
      },
    }),

  jobs: () =>
    call<Job[]>({
      url: '/recruiter/jobs',
      headers: auth('recruiter'),
    }),

  createJob: (data: Partial<Job>) =>
    call<{ message: string; job: Job }>({
      url: '/jobs',
      method: 'POST',
      headers: auth('recruiter'),
      data: {
        ...data,
        skills: Array.isArray(data.skills) ? data.skills.join(',') : data.skills,
      },
    }),

  deleteJob: (jobId: string) =>
    call<{ message: string }>({
      url: `/recruiter/job/${jobId}`,
      method: 'DELETE',
      headers: auth('recruiter'),
    }),

  applicants: () =>
    call<{ applicants: Applicant[] }>({
      url: '/applicants',
      headers: auth('recruiter'),
    }),

  jobApplicants: (jobId: string) =>
    call<Applicant[]>({
      url: `/applicants/job/${jobId}`,
      headers: auth('recruiter'),
    }),

  shortlisted: () =>
    call<{ applicants?: Applicant[] } | Applicant[]>({
      url: '/applicants/shortlisted',
      headers: auth('recruiter'),
    }),
};

export const jobsApi = {
  all: () => call<Job[]>({ url: '/jobs' }),
};
import axios, { AxiosError, type AxiosProgressEvent, type AxiosRequestConfig } from 'axios';
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

const DEFAULT_API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';
const configuredApiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = (configuredApiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

export const api = axios.create({
  baseURL: apiBaseUrl,
});

function getToken(role: 'student' | 'recruiter') {
  return localStorage.getItem(role === 'student' ? 'studentToken' : 'recruiterToken');
}

function auth(role: 'student' | 'recruiter') {
  return {
    Authorization: `Bearer ${getToken(role)}`,
  };
}

async function call<T>(config: AxiosRequestConfig) {
  try {
    const response = await api.request<T>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message;

    if (!axiosError.response && axiosError.request) {
      throw new Error(
        `Unable to reach the API server at ${apiBaseUrl}. Check that VITE_API_URL points to the deployed backend.`,
      );
    }

    throw new Error(serverMessage || axiosError.message || 'API request failed');
  }
}

export const authApi = {
  studentLogin: (body: { email: string; password: string }) =>
    call<{ token: string; student: Student }>({
      url: '/auth/login/student',
      method: 'POST',
      data: body,
    }),

  studentSignup: (body: { name: string; email: string; password: string }) =>
    call<{ message: string }>({
      url: '/auth/signup/student',
      method: 'POST',
      data: body,
    }),

  recruiterLogin: (body: { email: string; password: string }) =>
    call<{ token: string; recruiter: Recruiter }>({
      url: '/auth/login/recruiter',
      method: 'POST',
      data: body,
    }),

  recruiterSignup: (body: Partial<Recruiter> & { password: string }) =>
    call<{ message: string }>({
      url: '/auth/signup/recruiter',
      method: 'POST',
      data: body,
    }),
};

export const studentApi = {
  profile: () =>
    call<{ student: Student }>({
      url: '/student/profile',
      headers: auth('student'),
    }),

  dashboard: () =>
    call<StudentDashboard>({
      url: '/student/dashboard',
      headers: auth('student'),
    }),

  applications: () =>
    call<Application[]>({
      url: '/student/applications',
      headers: auth('student'),
    }),

  apply: (jobId: string) =>
    call<{ message: string }>({
      url: '/applicants/apply',
      method: 'POST',
      headers: auth('student'),
      data: { jobId },
    }),

  settings: () =>
    call<Student>({
      url: '/settings',
      headers: auth('student'),
    }),

  updateSettings: (data: Partial<Student>) =>
    call<{ message: string; student: Student }>({
      url: '/settings',
      method: 'PUT',
      headers: auth('student'),
      data,
    }),

  uploadResume: (file: File, onUploadProgress?: (event: AxiosProgressEvent) => void) => {
    const formData = new FormData();
    formData.append('resume', file);

    return call<{ message: string; data: ResumeAnalysis }>({
      url: '/resume/upload',
      method: 'POST',
      headers: auth('student'),
      data: formData,
      onUploadProgress,
    });
  },
};

export const recruiterApi = {
  dashboard: () =>
    call<RecruiterDashboard>({
      url: '/recruiter/dashboard',
      headers: auth('recruiter'),
    }),

  profile: () =>
    call<Recruiter>({
      url: '/recruiter/profile',
      headers: auth('recruiter'),
    }),

  updateProfile: (data: Partial<Recruiter>) =>
    call<{ message: string; recruiter: Recruiter }>({
      url: '/recruiter/profile',
      method: 'PUT',
      headers: auth('recruiter'),
      data: {
        ...data,
        name: data.recruiterName,
        company: data.companyName,
      },
    }),

  jobs: () =>
    call<Job[]>({
      url: '/recruiter/jobs',
      headers: auth('recruiter'),
    }),

  createJob: (data: Partial<Job>) =>
    call<{ message: string; job: Job }>({
      url: '/jobs',
      method: 'POST',
      headers: auth('recruiter'),
      data: {
        ...data,
        skills: Array.isArray(data.skills) ? data.skills.join(',') : data.skills,
      },
    }),

  deleteJob: (jobId: string) =>
    call<{ message: string }>({
      url: `/recruiter/job/${jobId}`,
      method: 'DELETE',
      headers: auth('recruiter'),
    }),

  applicants: () =>
    call<{ applicants: Applicant[] }>({
      url: '/applicants',
      headers: auth('recruiter'),
    }),

  jobApplicants: (jobId: string) =>
    call<Applicant[]>({
      url: `/applicants/job/${jobId}`,
      headers: auth('recruiter'),
    }),

  shortlisted: () =>
    call<{ applicants?: Applicant[] } | Applicant[]>({
      url: '/applicants/shortlisted',
      headers: auth('recruiter'),
    }),
};

export const jobsApi = {
  all: () => call<Job[]>({ url: '/jobs' }),
};
