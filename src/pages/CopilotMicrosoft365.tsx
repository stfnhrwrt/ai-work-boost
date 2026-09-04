import { Link } from "react-router-dom";
import { ArrowRight, Bot, CalendarClock, Info, Workflow as WorkflowIcon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkflowCard } from "@/components/WorkflowCard";
import { LEVEL_META, WorkflowLevel } from "@/data/workflows";
import { microsoft365Workflows } from "@/data/taskTypes";
import { AVAILABILITY_NOTE, copilotApps, copilotAppWorkflowCount } from "@/data/copilotApps";

const GROUPS: { level: WorkflowLevel; icon: typeof Bot }[] = [
  { level: "agent", icon: Bot },
  { level: "scheduled", icon: CalendarClock },
  { level: "automation", icon: WorkflowIcon },
];

const CopilotMicrosoft365 = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main id="main" className="flex-1">
      <section className="border-b border-border bg-hero-gradient">
        <div className="container mx-auto px-6 py-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            Collection
          </span>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Copilot in Microsoft 365 apps
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {copilotAppWorkflowCount + microsoft365Workflows.length} workflows that use Microsoft
            365-specific mechanics — Copilot in Word, Excel, PowerPoint and Planner, plus agents,
            scheduled prompts, Outlook rules and Power Automate. Everything else on this site works
            with any AI assistant.
          </p>
          <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
            <p className="leading-relaxed">
              Copilot never expands access — it only works with data you are already authorized to
              see. {AVAILABILITY_NOTE}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <div className="mb-6 max-w-3xl">
          <h2 className="mb-1.5 text-xl font-semibold text-foreground">Sections</h2>
          <p className="text-sm text-muted-foreground">
            Each section explains what Copilot is good at in that app, what source material improves
            the result, prompt patterns, common mistakes and what to review before sharing.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copilotApps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.id}
                to={`/copilot-microsoft-365/${app.id}`}
                className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mb-1.5 text-base font-semibold text-foreground">{app.name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {app.tagline}
                </p>
                <span className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{app.workflows.length} workflows</span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            );
          })}
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
