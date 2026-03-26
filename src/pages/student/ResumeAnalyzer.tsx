import { Upload, Sparkles, CheckCircle, AlertTriangle, Zap, Target } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const skills = ["React", "TypeScript", "Node.js", "Python", "SQL", "Git", "REST APIs", "Docker"];
const missingSkills = ["System Design", "AWS", "GraphQL", "Kubernetes"];
const suggestions = [
  { title: "Add quantifiable achievements", desc: "Include metrics like '30% improvement' to strengthen impact", priority: "High" },
  { title: "Optimize keyword density", desc: "Add more industry-standard keywords for ATS parsing", priority: "Medium" },
  { title: "Improve formatting", desc: "Use consistent bullet points and section headers", priority: "Low" },
  { title: "Add project links", desc: "Include GitHub repos and live project URLs", priority: "Medium" },
];

const ResumeAnalyzer = () => (
  <div className="animate-fade-in">
    <PageHeader title="Resume Analyzer" description="AI-powered resume analysis and optimization" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Upload Area */}
      <div className="lg:col-span-2 glass-card p-8 flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm font-semibold text-foreground">Drag & drop your resume</p>
        <p className="text-xs text-muted-foreground mt-1">or click to browse • PDF, DOCX up to 5MB</p>
        <button className="mt-4 gradient-primary text-primary-foreground text-xs font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Upload Resume
        </button>
      </div>

      {/* Score Card */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Resume Score</h3>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="relative h-28 w-28">
            <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(224, 20%, 18%)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(250, 75%, 60%)" strokeWidth="8"
                strokeDasharray={`${87 * 2.64} ${264 - 87 * 2.64}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">87</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">ATS Compatibility</span>
            <span className="text-success font-medium">92%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[92%] rounded-full bg-success" />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Content Quality</span>
            <span className="text-primary font-medium">85%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[85%] rounded-full bg-primary" />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Keyword Match</span>
            <span className="text-warning font-medium">78%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-warning" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* Extracted Skills */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-4 w-4 text-success" />
          <h3 className="text-sm font-semibold text-foreground">Extracted Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium border border-success/20">{s}</span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Missing Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium border border-warning/20">{s}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Improvement Suggestions */}
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Improvement Suggestions</h3>
      </div>
      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
            <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{s.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  s.priority === "High" ? "bg-destructive/15 text-destructive" :
                  s.priority === "Medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
                }`}>{s.priority}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ResumeAnalyzer;
