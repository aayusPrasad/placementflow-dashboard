import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import TopNav from "./TopNav";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen w-full bg-background">
    <AppSidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <TopNav />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;
