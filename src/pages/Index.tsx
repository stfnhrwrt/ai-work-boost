import { Link } from "react-router-dom";
import { ArrowRight, Clock, Copy, MousePointerClick, Sparkles, Zap } from "lucide-react";
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
                For Copilot &amp; ChatGPT
              </span>

              <h1
                className="fade-in-up mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
                style={{ ["--i" as string]: 1 }}
              >
                Turn AI into Daily Productivity —{" "}
                <span className="text-gradient-animated">Not Just Theory</span>
              </h1>

              <p
                className="fade-in-up mb-9 text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ ["--i" as string]: 2 }}
              >
                Practical AI workflows for real work. Designed for Microsoft Copilot
                and ChatGPT — pick a role, copy the prompt, get it done in minutes.
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

        {/* Differentiator strip */}
        <section className="container mx-auto px-6 pb-8 pt-4">
          <div className="hover-lift relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
            <div
              className="blob bg-primary/15"
              style={{ width: 280, height: 280, top: -100, right: -80 }}
              aria-hidden
            />
            <div className="relative grid items-center gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Built for execution, not learning
                </h3>
                <p className="text-muted-foreground">
                  These aren't tutorials. Every workflow is a ready-to-run prompt
                  that uses your real company context — emails, Teams chats, calendar
                  and documents — so you can finish the task and move on.
                </p>
              </div>
              <div className="flex justify-start sm:justify-end">
                <Button asChild variant="outline" size="lg">
                  <Link to="/role/managers">
                    Browse Manager workflows
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
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
