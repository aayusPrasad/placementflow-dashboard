import { Bell, Shield, Palette, Globe } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const Settings = () => (
  <div className="animate-fade-in">
    <PageHeader title="Settings" description="Manage your account preferences" />

    <div className="space-y-4 max-w-2xl">
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="space-y-3">
          {["Email Notifications", "Application Updates", "Interview Reminders", "Deadline Alerts"].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">{item}</span>
              <div className="h-5 w-9 rounded-full bg-primary/30 relative cursor-pointer">
                <div className="h-4 w-4 rounded-full bg-primary absolute top-0.5 right-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Security</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div>
              <span className="text-sm text-foreground">Password</span>
              <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div>
              <span className="text-sm text-foreground">Two-Factor Authentication</span>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Enable</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm text-foreground">Language</span>
            <span className="text-xs text-muted-foreground">English</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm text-foreground">Timezone</span>
            <span className="text-xs text-muted-foreground">IST (UTC+5:30)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
