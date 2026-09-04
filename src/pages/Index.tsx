import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { roles, getWorkflowsByRole } from "@/data/workflows";
import { taskTypes, microsoft365Workflows } from "@/data/taskTypes";
import { discoveryItems, getTaskTypeCounts, taskTypeCountLabel } from "@/data/discovery";
import { copilotAppWorkflowCount } from "@/data/copilotApps";

const STACK = [
  { label: "Reporting", title: "Prepare a project update", effort: "8 min" },
  { label: "Writing", title: "Turn notes into a report", effort: "10 min" },
  { label: "Analysis", title: "Analyze a budget", effort: "12 min" },
  { label: "Planning", title: "Plan the week", effort: "5 min" },
];

const Index = () => {
  const totalWorkflows = discoveryItems.length;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Hero — asymmetric */}
        <section className="border-b border-rule">
          <div className="container mx-auto grid gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div className="fade-in-up" style={{ ["--i" as string]: 0 }}>
              <p className="label-eyebrow mb-6">A working library, not a course</p>
              <h1 className="font-display text-[2.75rem] leading-[1.02] text-foreground sm:text-6xl">
                Practical AI workflows for the work you do every day
              </h1>
              <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted-foreground">
                Pick a task or your role, copy the instructions, get the job done in 5–10 minutes.
                Most workflows work with Copilot, ChatGPT, Claude, Gemini, or an approved internal
                AI tool. Microsoft 365 app workflows are Copilot-specific.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-12 rounded-sm px-7 text-base">
                  <Link to="/workflows">
                    Browse workflows
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  to="/basics"
                  className="underline-grow text-sm font-medium text-foreground"
                >
                  Start with the AI basics
                </Link>
              </div>
            </div>

            {/* Editorial workflow stack */}
            <div className="fade-in-up lg:pl-8" style={{ ["--i" as string]: 2 }}>
              <div className="flex items-baseline justify-between border-b border-rule pb-2">
                <span className="label-eyebrow">From the library</span>
                <span className="label-marker">Sample</span>
              </div>
              <ul>
                {STACK.map((entry, idx) => (
                  <li
                    key={entry.title}
                    className="fade-in-up flex items-baseline justify-between gap-6 border-b border-rule py-5"
                    style={{ ["--i" as string]: idx + 3 }}
                  >
                    <div className="min-w-0">
                      <span className="label-marker">{entry.label}</span>
                      <p className="font-display text-xl text-foreground sm:text-2xl">
                        {entry.title}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono-prompt text-xs text-muted-foreground">
                      {entry.effort}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/workflows"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                See all {totalWorkflows} workflows
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Library index row */}
        <section className="border-b border-rule bg-card/60">
          <div className="container mx-auto grid grid-cols-2 gap-px px-6 py-0 sm:grid-cols-4">
            <IndexStat label="Published workflows" value={totalWorkflows.toString()} />
            <IndexStat label="Roles covered" value={roles.length.toString()} />
            <IndexStat label="Task types" value={taskTypes.length.toString()} />
            <IndexStat label="Typical effort" value="5–10 min" />
          </div>
        </section>

        {/* Primary discovery — by task */}
        <section id="tasks" className="container mx-auto scroll-mt-20 px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
            <div>
              <p className="label-eyebrow mb-2">Section 01 — Browse by task</p>
              <h2 className="font-display text-3xl text-foreground sm:text-4xl">
                What do you need to get done?
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              The task comes first. The AI tool is just how you run it. Counts show general
              workflows, then Microsoft 365 app workflows.
            </p>
          </div>
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {taskTypes.map((task, idx) => {
              const counts = getTaskTypeCounts(task.id);
              const Icon = task.icon;
              return (
                <Link
                  key={task.id}
                  to={`/workflows?task=${task.id}`}
                  className="fade-in-up group flex h-full flex-col bg-card p-6 transition-colors hover:bg-primary-soft/50"
                  style={{ ["--i" as string]: idx }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-mono-prompt text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-foreground group-hover:text-primary">
                    {task.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{task.tagline}</p>
                  <span className="mt-4 text-xs text-muted-foreground">
                    {taskTypeCountLabel(counts)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Secondary discovery — by role */}
        <section id="roles" className="container mx-auto scroll-mt-20 px-6 pb-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
            <div>
              <p className="label-eyebrow mb-2">Section 02 — Browse by role</p>
              <h2 className="font-display text-3xl text-foreground sm:text-4xl">
                Or start from the job you do
              </h2>
            </div>
            <Link to="/roles" className="text-sm font-medium text-primary underline-grow">
              All roles
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, idx) => (
              <div key={role.id} className="fade-in-up h-full" style={{ ["--i" as string]: idx }}>
                <RoleCard role={role} workflowCount={getWorkflowsByRole(role.id).length} />
              </div>
            ))}
          </div>
        </section>

        {/* Specialist collection */}
        <section className="container mx-auto px-6 pb-16">
          <Link
            to="/copilot-microsoft-365"
            className="hover-lift group grid gap-6 border border-rule bg-card p-8 sm:grid-cols-[1.6fr_1fr] sm:items-end sm:p-10"
          >
            <div>
              <p className="label-eyebrow mb-3">Specialist collection — Microsoft only</p>
              <h2 className="font-display text-2xl text-foreground group-hover:text-primary sm:text-3xl">
                Copilot in Microsoft 365 apps
              </h2>
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted-foreground">
                {copilotAppWorkflowCount + microsoft365Workflows.length} workflows that rely on
                Microsoft-specific mechanics: Copilot in Word, Excel, PowerPoint and Planner, plus
                agents, scheduled prompts, Outlook rules and Power Automate. Optional — the rest of
                the library is tool-agnostic.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-medium text-primary sm:justify-self-end">
              Open the collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </section>

        {/* Responsible AI */}
        <section id="governance" className="container mx-auto scroll-mt-20 px-6 pb-20">
          <div className="grid gap-px border border-rule bg-rule lg:grid-cols-2">
            <div className="bg-card p-8">
              <p className="label-eyebrow mb-3">Section 03 — Responsible AI</p>
              <h2 className="font-display text-2xl text-foreground">
                Built for the rules you already work with
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Use each workflow only with data and AI tools approved by your organization. Access,
                privacy, and governance depend on the tool and its configuration.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground">
                {[
                  "Use only tools your organization has approved",
                  "Check what data the tool can reach before you rely on it",
                  "Keep confidential data out of tools that are not approved for it",
                  "Treat every result as a draft, not a decision",
                  "Review output before you share or act on it",
                ].map((b) => (
                  <li key={b} className="flex gap-3 border-b border-rule pb-2.5 last:border-0">
                    <span className="font-mono-prompt text-xs text-primary">—</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/responsible-ai"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Read the Responsible AI guidance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card p-8">
              <p className="label-eyebrow mb-3">Section 04 — AI basics</p>
              <h2 className="font-display text-2xl text-foreground">
                How to get useful output, whichever tool you use
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Five short blocks: how to structure an instruction, what happens inside an AI model,
                and the common mistakes that ruin results. A two-minute read before your first
                workflow.
              </p>
              <p className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-muted-foreground">
                Each workflow lists its typical effort and an estimated manual effort avoided.
                These are indicative estimates for a typical case, not guaranteed savings.
              </p>
              <Link
                to="/basics"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Read AI basics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

function IndexStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-rule px-2 py-6 last:border-r-0 sm:px-4">
      <p className="font-display text-3xl text-foreground sm:text-4xl">{value}</p>
      <p className="label-eyebrow mt-1">{label}</p>
    </div>
  );
}

export default Index;
