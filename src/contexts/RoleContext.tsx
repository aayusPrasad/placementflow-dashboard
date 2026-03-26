import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "student" | "recruiter";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType>({ role: "student", setRole: () => {} });

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("student");
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};
