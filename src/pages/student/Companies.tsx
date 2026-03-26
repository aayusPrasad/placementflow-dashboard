import { Building2, MapPin, DollarSign, Clock, Users } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const companies = [
  { name: "Google", role: "SDE Intern", package: "₹45 LPA", location: "Bangalore", deadline: "Apr 5, 2026", eligibility: "CGPA ≥ 8.0", skills: ["DSA", "Python", "System Design"], applicants: 342 },
  { name: "Microsoft", role: "Software Engineer", package: "₹42 LPA", location: "Hyderabad", deadline: "Apr 10, 2026", eligibility: "CGPA ≥ 7.5", skills: ["C++", "Azure", "Algorithms"], applicants: 289 },
  { name: "Amazon", role: "SDE I", package: "₹38 LPA", location: "Bangalore", deadline: "Apr 15, 2026", eligibility: "CGPA ≥ 7.0", skills: ["Java", "AWS", "OOP"], applicants: 456 },
  { name: "Adobe", role: "ML Engineer", package: "₹35 LPA", location: "Noida", deadline: "Apr 8, 2026", eligibility: "CGPA ≥ 8.0", skills: ["Python", "ML", "TensorFlow"], applicants: 178 },
  { name: "Stripe", role: "Backend Engineer", package: "₹50 LPA", location: "Remote", deadline: "Apr 20, 2026", eligibility: "CGPA ≥ 7.5", skills: ["Go", "Distributed Systems", "APIs"], applicants: 134 },
  { name: "Flipkart", role: "Full Stack Dev", package: "₹28 LPA", location: "Bangalore", deadline: "Apr 12, 2026", eligibility: "CGPA ≥ 7.0", skills: ["React", "Node.js", "MongoDB"], applicants: 267 },
];

const Companies = () => (
  <div className="animate-fade-in">
    <PageHeader title="Companies" description="Explore eligible companies and open positions" />
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {companies.map((c, i) => (
        <div key={i} className="glass-card p-5 hover:shadow-elevated transition-all group">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.role}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" /><span>{c.package}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /><span>{c.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /><span>Deadline: {c.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" /><span>{c.applicants} applicants</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Eligibility: {c.eligibility}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {c.skills.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{s}</span>
            ))}
          </div>
          <button className="w-full gradient-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Companies;
