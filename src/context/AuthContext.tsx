import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { authApi } from '@/services/api';
import type { Recruiter, Student } from '@/types';

type Role = 'student' | 'recruiter';

type AuthContextValue = {
  student: Student | null;
  recruiter: Recruiter | null;
  studentToken: string | null;
  recruiterToken: string | null;
  loginStudent: (email: string, password: string) => Promise<void>;
  loginRecruiter: (email: string, password: string) => Promise<void>;
  logout: (role?: Role) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readLocalStorage<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') as T | null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(readLocalStorage('studentData'));
  const [recruiter, setRecruiter] = useState<Recruiter | null>(readLocalStorage('recruiterData'));
  const [studentToken, setStudentToken] = useState(localStorage.getItem('studentToken'));
  const [recruiterToken, setRecruiterToken] = useState(localStorage.getItem('recruiterToken'));

  const loginStudent = async (email: string, password: string) => {
    const response = await authApi.studentLogin({ email, password });

    localStorage.setItem('studentToken', response.token);
    localStorage.setItem('studentData', JSON.stringify(response.student));
    setStudentToken(response.token);
    setStudent(response.student);
  };

  const loginRecruiter = async (email: string, password: string) => {
    const response = await authApi.recruiterLogin({ email, password });

    localStorage.setItem('recruiterToken', response.token);
    localStorage.setItem('recruiterData', JSON.stringify(response.recruiter));
    setRecruiterToken(response.token);
    setRecruiter(response.recruiter);
  };

  const logout = (role?: Role) => {
    if (!role || role === 'student') {
      localStorage.removeItem('studentToken');
      localStorage.removeItem('studentData');
      setStudentToken(null);
      setStudent(null);
    }

    if (!role || role === 'recruiter') {
      localStorage.removeItem('recruiterToken');
      localStorage.removeItem('recruiterData');
      setRecruiterToken(null);
      setRecruiter(null);
    }
  };

  const value = useMemo(
    () => ({
      student,
      recruiter,
      studentToken,
      recruiterToken,
      loginStudent,
      loginRecruiter,
      logout,
    }),
    [student, recruiter, studentToken, recruiterToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}