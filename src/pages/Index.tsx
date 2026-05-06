import { Link } from "react-router-dom";
import { ArrowRight, Clock, Copy, Lock, MousePointerClick, ShieldCheck, Sparkles, TrendingDown, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { roles, getWorkflowsByRole, workflows } from "@/data/workflows";

const Index = () => {
  const totalWorkflows = workflows.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-gradient">
          {/* Animated grid + blobs */}
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
                Microsoft 365 Copilot · Enterprise workflows
              </span>

              <h1
                className="fade-in-up mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
                style={{ ["--i" as string]: 1 }}
              >
                AI-powered enterprise workflows —{" "}
                <span className="text-gradient-animated">integrated into Microsoft 365</span>
              </h1>

              <p
                className="fade-in-up mb-9 text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ ["--i" as string]: 2 }}
              >
                Practical Microsoft 365 Copilot workflows for meeting intelligence,
                knowledge retrieval and reporting — built to operate within your
                existing permissions, sensitivity labels and governance controls.
              </p>

              <p
                className="fade-in-up mb-9 text-base leading-relaxed text-muted-foreground"
                style={{ ["--i" as string]: 2 }}
              >
                Pick a role, copy a prompt, get the work done in Copilot — with ChatGPT
                provided as a manual fallback. All workflows operate within existing
                Microsoft 365 permissions and security controls.
              </p>

              <div
                className="fade-in-up flex flex-wrap items-center justify-center gap-3"
                style={{ ["--i" as string]: 3 }}
              >
                <Button asChild size="lg" className="h-12 px-7 text-base">
                  <a href="#roles">
                    Start a Workflow
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                  <Link to="/basics">Learn the basics</Link>
                </Button>
              </div>

              {/* Floating stat chips */}
              <div
                className="fade-in-up mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
                style={{ ["--i" as string]: 4 }}
              >
                <StatChip value={totalWorkflows.toString()} label="ready-to-run workflows" />
                <StatChip value={roles.length.toString()} label="roles covered" />
                <StatChip value="5–10" label="minutes per task" />
              </div>

              {/* Time-savings note */}
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
              Three steps. No setup.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: MousePointerClick,
                step: "1",
                title: "Pick your role",
                desc: "Executive Assistant, Manager, or Project Manager.",
              },
              {
                icon: Clock,
                step: "2",
                title: "Choose a task",
                desc: "Real, daily workflows ready to run in under 10 minutes.",
              },
              {
                icon: Copy,
                step: "3",
                title: "Copy the prompt",
                desc: "Paste into Copilot or ChatGPT and get usable output instantly.",
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="hover-lift fade-in-up group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card"
                  style={{ ["--i" as string]: idx }}
                >
                  {/* Step number watermark */}
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
                    <h3 className="mb-1 text-base font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
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
              <div
                key={role.id}
                className="fade-in-up h-full"
                style={{ ["--i" as string]: idx }}
              >
                <RoleCard
                  role={role}
                  workflowCount={getWorkflowsByRole(role.id).length}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Workflow categories */}
        <section className="container mx-auto px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Core capabilities
            </span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three workflow areas, one Microsoft 365 backbone
            </h2>
            <p className="text-lg text-muted-foreground">
              Every workflow on this site falls into one of these enterprise areas — built on the Copilot capabilities your tenant already supports.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Meeting Intelligence",
                desc: "Transform meetings into actionable outcomes using summaries, task extraction and decision tracking.",
                bullets: [
                  "Teams transcript summaries",
                  "Follow-up generation",
                  "Action-item tracking",
                ],
              },
              {
                title: "Enterprise Knowledge Retrieval",
                desc: "Retrieve organizational knowledge across Microsoft 365 while respecting existing permissions and governance controls.",
                bullets: [
                  "SharePoint & Teams search",
                  "Decision retrieval",
                  "Cross-source summarization",
                ],
              },
              {
                title: "Workflow Automation",
                desc: "Connect meetings, documents, reporting and task management into streamlined enterprise workflows.",
                bullets: [
                  "Meeting → Planner task",
                  "Weekly digest creation",
                  "Reporting automation",
                ],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="hover-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <h3 className="mb-2 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{c.desc}</p>
                <ul className="mt-auto space-y-1.5 text-sm text-foreground/80">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Governance & Security */}
        <section id="governance" className="container mx-auto scroll-mt-20 px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3 w-3" />
                Governance &amp; Security
              </span>
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                Built within your Microsoft 365 controls
              </h2>
              <p className="mb-5 text-muted-foreground">
                Microsoft 365 Copilot respects existing permissions, sensitivity labels, governance rules and tenant security policies. Copilot only accesses information users are already authorized to view.
              </p>
              <ul className="space-y-2.5 text-sm text-foreground/85">
                {[
                  "Existing permissions remain enforced",
                  "Sensitivity labels remain active",
                  "Compliance policies remain active",
                  "Tenant isolation remains active",
                  "Access controls are inherited",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
                <strong>Copilot does not expand user permissions or bypass organizational security controls.</strong>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                <ShieldCheck className="h-3 w-3" />
                Responsible Deployment
              </span>
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                Copilot reflects how your tenant is governed
              </h2>
              <p className="mb-5 text-muted-foreground">
                Microsoft 365 Copilot reflects existing organizational permissions and governance structures. Overshared environments or poorly managed permissions may increase visibility of existing data exposure risks.
              </p>
              <ul className="space-y-2.5 text-sm text-foreground/85">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Review SharePoint and OneDrive sharing scopes before rollout.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Apply sensitivity labels to confidential and restricted content.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Use Microsoft Purview to monitor Copilot interactions and data access.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Always require a human review before sending Copilot output externally.
                </li>
              </ul>
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
                  New · 2-minute read
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  AI Basics — How to Use AI Effectively
                </h3>
                <p className="text-muted-foreground">
                  Five short blocks. Learn how to structure a prompt, why Copilot is
                  different and the common mistakes that ruin results.
                </p>
              </div>
              <div className="flex justify-start sm:justify-end">
                <span className="inline-flex items-center gap-2 font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Read AI Basics
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
