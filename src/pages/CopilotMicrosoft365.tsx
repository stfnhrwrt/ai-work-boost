import { Bot, CalendarClock, Info, Workflow as WorkflowIcon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkflowCard } from "@/components/WorkflowCard";
import { LEVEL_META, WorkflowLevel } from "@/data/workflows";
import { microsoft365Workflows } from "@/data/taskTypes";

const GROUPS: { level: WorkflowLevel; icon: typeof Bot }[] = [
  { level: "agent", icon: Bot },
  { level: "scheduled", icon: CalendarClock },
  { level: "automation", icon: WorkflowIcon },
];

const CopilotMicrosoft365 = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main className="flex-1">
      <section className="border-b border-border bg-hero-gradient">
        <div className="container mx-auto px-6 py-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            Collection
          </span>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Copilot in Microsoft 365 apps
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {microsoft365Workflows.length} workflows that use Microsoft 365-specific mechanics —
            Copilot agents, native scheduled prompts, Outlook rules and Power Automate. Everything
            else on this site works with any AI assistant.
          </p>
          <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
            <p className="leading-relaxed">
              These workflows depend on your Microsoft 365 licence, tenant settings and the
              permissions you already have. Copilot never expands access — it only works with data
              you are authorized to see.
            </p>
          </div>
        </div>
      </section>

      {GROUPS.map(({ level, icon: Icon }) => {
        const items = microsoft365Workflows.filter((w) => w.level === level);
        if (items.length === 0) return null;
        return (
          <section key={level} className="container mx-auto px-6 py-10">
            <div className="mb-6 max-w-3xl">
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Icon className="h-3.5 w-3.5" />
                {LEVEL_META[level].shortLabel}
              </span>
              <h2 className="mb-1.5 text-xl font-semibold text-foreground">
                {LEVEL_META[level].label}
              </h2>
              <p className="text-sm text-muted-foreground">{LEVEL_META[level].description}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
    <SiteFooter />
  </div>
);

export default CopilotMicrosoft365;
