import PageHeader from "@/components/shared/PageHeader";

const CreateJob = () => (
  <div className="animate-fade-in">
    <PageHeader title="Create Job Post" description="Post a new job opportunity for candidates" />

    <div className="max-w-2xl glass-card p-6">
      <div className="space-y-5">
        {[
          { label: "Company Name", placeholder: "e.g. Google India", type: "text" },
          { label: "Role Title", placeholder: "e.g. SDE Intern", type: "text" },
          { label: "Package (CTC)", placeholder: "e.g. ₹45 LPA", type: "text" },
          { label: "Location", placeholder: "e.g. Bangalore, Remote", type: "text" },
          { label: "Eligibility Criteria", placeholder: "e.g. CGPA ≥ 8.0, No active backlogs", type: "text" },
          { label: "Required Skills", placeholder: "e.g. Python, DSA, System Design", type: "text" },
          { label: "Application Deadline", placeholder: "", type: "date" },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full h-10 rounded-lg bg-secondary/50 border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Job Description</label>
          <textarea
            rows={5}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className="w-full rounded-lg bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button className="gradient-primary text-primary-foreground text-sm font-semibold px-8 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Publish Job
          </button>
          <button className="bg-secondary/50 text-muted-foreground text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-secondary transition-colors border border-border/50">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CreateJob;
