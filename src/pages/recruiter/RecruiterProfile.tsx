import { User, Building2, Briefcase } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const RecruiterProfile = () => (
  <div className="animate-fade-in">
    <PageHeader title="Recruiter Profile" description="Your recruiter account details" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="glass-card p-6 flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Meera Krishnan</h3>
        <p className="text-sm text-muted-foreground">Senior Technical Recruiter</p>
        <p className="text-xs text-muted-foreground mt-1">Google India</p>
        <div className="mt-4 w-full space-y-2">
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground font-medium">meera@google.com</span>
          </div>
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">Phone</span>
            <span className="text-foreground font-medium">+91 98765 43210</span>
          </div>
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">Emp ID</span>
            <span className="text-foreground font-medium">GGL-HR-2847</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Company Details</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Company", value: "Google India" },
              { label: "Industry", value: "Technology" },
              { label: "Team Size", value: "50,000+" },
              { label: "HQ", value: "Mountain View, CA" },
            ].map((d) => (
              <div key={d.label} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                <p className="text-xs text-muted-foreground">{d.label}</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Hiring Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Hires", value: "127" },
              { label: "Active Posts", value: "6" },
              { label: "This Season", value: "12" },
            ].map((d) => (
              <div key={d.label} className="p-3 rounded-lg bg-secondary/30 border border-border/30 text-center">
                <p className="text-xl font-bold text-foreground">{d.value}</p>
                <p className="text-xs text-muted-foreground">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RecruiterProfile;
