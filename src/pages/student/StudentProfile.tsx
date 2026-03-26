import { User, GraduationCap, Award, FileText } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const skills = ["React", "TypeScript", "Node.js", "Python", "SQL", "Git", "Docker", "REST APIs"];
const certs = ["AWS Cloud Practitioner", "Google Data Analytics", "HackerRank Problem Solving"];

const StudentProfile = () => (
  <div className="animate-fade-in">
    <PageHeader title="Profile" description="Your academic and professional profile" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="glass-card p-6 flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Arjun Sharma</h3>
        <p className="text-sm text-muted-foreground">Computer Science & Engineering</p>
        <p className="text-xs text-muted-foreground mt-1">B.Tech • 2023–2027</p>
        <div className="mt-4 w-full space-y-2">
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">University</span>
            <span className="text-foreground font-medium">IIT Delhi</span>
          </div>
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">Roll No.</span>
            <span className="text-foreground font-medium">2023CS10456</span>
          </div>
          <div className="flex justify-between text-xs p-2 rounded-lg bg-secondary/30">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground font-medium">arjun@iitd.ac.in</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Academic Details</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "CGPA", value: "8.74" },
              { label: "Branch", value: "CSE" },
              { label: "Semester", value: "6th" },
              { label: "Backlogs", value: "0" },
            ].map((d) => (
              <div key={d.label} className="p-3 rounded-lg bg-secondary/30 border border-border/30 text-center">
                <p className="text-lg font-bold text-foreground">{d.value}</p>
                <p className="text-xs text-muted-foreground">{d.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Skills & Certifications</h3>
          </div>
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Certifications</p>
            <div className="space-y-2">
              {certs.map((c) => (
                <div key={c} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 border border-border/30">
                  <Award className="h-3 w-3 text-success shrink-0" />
                  <span className="text-xs text-foreground">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Resume</h3>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30">
            <div>
              <p className="text-sm font-medium text-foreground">Arjun_Sharma_Resume.pdf</p>
              <p className="text-xs text-muted-foreground">Updated Mar 20, 2026 • Score: 87/100</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentProfile;
