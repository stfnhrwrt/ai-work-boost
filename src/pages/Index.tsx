import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Copy,
  Lock,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { roles, getWorkflowsByRole, workflows } from "@/data/workflows";
import { taskTypes, getWorkflowsByTaskType, microsoft365Workflows } from "@/data/taskTypes";

const TOOLS = ["Microsoft Copilot", "ChatGPT", "Claude", "Gemini", "Approved internal AI tools"];

const Index = () => {
  const totalWorkflows = workflows.length;
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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-gradient">
          <div className="absolute inset-0 bg-grid-soft" aria-hidden />
          <div
            className="blob animate-blob bg-primary/30"
            style={{ width: 420, height: 420, top: -120, left: -80 }}
            aria-hidden
          />
          <div
            className="blob animate-blob bg-accent/40"
            style={{ width: 360, height: 360, top: 40, right: -100, animationDelay: "-6s" }}
            aria-hidden
          />
          <div
            className="blob animate-blob bg-primary/20"
            style={{ width: 300, height: 300, bottom: -120, left: "40%", animationDelay: "-12s" }}
            aria-hidden
          />

          <div className="container relative mx-auto px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <span
                className="fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm"
                style={{ ["--i" as string]: 0 }}
              >
                <Sparkles className="h-3 w-3 text-accent" />
                A practical library for people at work
              </span>

              <h1
                className="fade-in-up mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
                style={{ ["--i" as string]: 1 }}
              >
                Practical AI workflows for{" "}
                <span className="text-gradient-animated">the work you do every day</span>
              </h1>

              <p
                className="fade-in-up mb-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ ["--i" as string]: 2 }}
              >
                Pick a task or your role, copy a prompt, get the job done in 5–10 minutes. Every
                workflow works with Copilot, ChatGPT, Claude or the AI tools your company has
                approved.
              </p>

              <div
                className="fade-in-up mb-9 flex flex-wrap items-center justify-center gap-2"
                style={{ ["--i" as string]: 2 }}
              >
                {TOOLS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                className="fade-in-up flex flex-wrap items-center justify-center gap-3"
                style={{ ["--i" as string]: 3 }}
              >
                <Button asChild size="lg" className="h-12 px-7 text-base">
                  <Link to="/workflows">
                    Browse workflows
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                  <Link to="/basics">Learn the basics</Link>
                </Button>
              </div>

              <div
                className="fade-in-up mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
                style={{ ["--i" as string]: 4 }}
              >
                <StatChip value={totalWorkflows.toString()} label="ready-to-run workflows" />
                <StatChip value={taskTypes.length.toString()} label="task types" />
                <StatChip value="5–10" label="minutes per task" />
              </div>

              <p
                className="fade-in-up mx-auto mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground"
                style={{ ["--i" as string]: 5 }}
              >
                Each workflow shows a conservative{" "}
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent-foreground">
                  <TrendingDown className="h-3 w-3" />
                  time-saved
                </span>{" "}
                estimate vs. doing it manually. Use 3–5 per week and most people gain 2–4 hours back.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-6 py-20">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Three steps. No setup, no account.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: MousePointerClick,
                step: "1",
                title: "Start with a task or role",
                desc: "Browse by what you need to get done, or by the job you do.",
              },
              {
                icon: Clock,
                step: "2",
                title: "Choose a workflow",
                desc: "Real, daily workflows ready to run in under 10 minutes.",
              },
              {
                icon: Copy,
                step: "3",
                title: "Copy the prompt",
                desc: "Paste it into your approved AI assistant and get usable output.",
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="hover-lift fade-in-up group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card"
                  style={{ ["--i" as string]: idx }}
                >
                  <span
                    className="pointer-events-none absolute -right-2 -top-4 select-none text-[88px] font-bold leading-none text-primary/5 transition-colors group-hover:text-primary/10"
                    aria-hidden
                  >
                    {s.step}
                  </span>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-card transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {s.step}
                    </div>
                    <h3 className="mb-1 text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Task types */}
        <section id="tasks" className="container mx-auto scroll-mt-20 px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3 w-3 text-accent" />
              Browse by task
            </span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What do you need to get done?
            </h2>
            <p className="text-lg text-muted-foreground">
              The task comes first. The AI tool is just how you run it.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {taskTypes.map((task, idx) => {
              const Icon = task.icon;
              const count = getWorkflowsByTaskType(task.id).length;
              return (
                <Link
                  key={task.id}
                  to={`/workflows?task=${task.id}`}
                  className="hover-lift fade-in-up group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
                  style={{ ["--i" as string]: idx }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-foreground">{task.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{task.tagline}</p>
                  <span className="mt-auto text-sm text-muted-foreground">
                    {count} {count === 1 ? "workflow" : "workflows"}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Role selection */}
        <section id="roles" className="container mx-auto scroll-mt-20 px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3 w-3 text-accent" />
              Browse by role
            </span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose your role
            </h2>
            <p className="text-lg text-muted-foreground">
              Each library is built around the real tasks you do every week.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role, idx) => (
              <div key={role.id} className="fade-in-up h-full" style={{ ["--i" as string]: idx }}>
                <RoleCard role={role} workflowCount={getWorkflowsByRole(role.id).length} />
              </div>
            ))}
          </div>
        </section>

        {/* Microsoft 365 collection */}
        <section className="container mx-auto px-6 py-16">
          <Link
            to="/copilot-microsoft-365"
            className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover sm:p-10"
          >
            <div className="relative grid items-center gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <span className="mb-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Collection
                </span>
                <h2 className="mb-2 text-xl font-semibold text-foreground">
                  Copilot in Microsoft 365 apps
                </h2>
                <p className="text-muted-foreground">
                  {microsoft365Workflows.length} workflows that use Microsoft-specific mechanics:
                  Copilot agents, scheduled prompts, Outlook rules and Power Automate. Optional — the
                  rest of the library is tool-agnostic.
                </p>
              </div>
              <div className="flex justify-start sm:justify-end">
                <span className="inline-flex items-center gap-2 font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Open the collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* Responsible AI */}
        <section id="governance" className="container mx-auto scroll-mt-20 px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3 w-3" />
                Responsible AI
              </span>
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                Built for the rules you already work with
              </h2>
              <p className="mb-5 text-muted-foreground">
                Enterprise AI assistants respect existing permissions, sensitivity labels and
                security policies. They only access information you are already authorized to view.
              </p>
              <ul className="space-y-2.5 text-sm text-foreground/85">
                {[
                  "Existing permissions remain enforced",
                  "Sensitivity labels remain active",
                  "Compliance policies remain active",
                  "Tenant and workspace isolation remains active",
                  "Access controls are inherited",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
                <strong>AI does not expand your permissions or bypass security controls.</strong>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                <ShieldCheck className="h-3 w-3" />
                Use it responsibly
              </span>
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                A few habits that keep AI usage safe
              </h2>
              <p className="mb-5 text-muted-foreground">
                AI reflects how your organization is governed. These practices keep results useful
                and compliant.
              </p>
              <ul className="space-y-2.5 text-sm text-foreground/85">
                {[
                  "Use only AI tools your organization has approved for work data.",
                  "Never paste confidential data into a consumer AI tool.",
                  "Apply sensitivity labels to confidential and restricted content.",
                  "Always require a human review before sending output externally.",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/responsible-ai"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Read the Responsible AI guidance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Basics teaser */}
        <section className="container mx-auto px-6 pb-20 pt-4">
          <Link
            to="/basics"
            className="group relative block overflow-hidden rounded-2xl border border-border bg-primary-soft p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover sm:p-10"
          >
            <div
              className="blob animate-blob bg-accent/30"
              style={{ width: 220, height: 220, bottom: -60, right: 40 }}
              aria-hidden
            />
            <div className="relative grid items-center gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3 w-3 text-accent" />
                  2-minute read
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  AI basics — how to use AI effectively
                </h3>
                <p className="text-muted-foreground">
                  Five short blocks. Learn how to structure a prompt, what happens inside an AI model
                  and the common mistakes that ruin results.
                </p>
              </div>
              <div className="flex justify-start sm:justify-end">
                <span className="inline-flex items-center gap-2 font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Read AI basics
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <span className="animate-float-slow inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 shadow-card backdrop-blur-sm">
      <span className="text-base font-bold text-primary">{value}</span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </span>
  );
}

export default Index;
