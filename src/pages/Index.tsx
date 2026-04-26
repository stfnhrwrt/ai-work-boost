import { Link } from "react-router-dom";
import { ArrowRight, Clock, Copy, MousePointerClick } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { roles, getWorkflowsByRole } from "@/data/workflows";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-gradient">
          <div className="container mx-auto px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                For Copilot &amp; ChatGPT
              </span>
              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Turn AI into Daily Productivity —
                <span className="text-primary"> Not Just Theory</span>
              </h1>
              <p className="mb-9 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Practical AI workflows for real work. Designed for Microsoft Copilot
                and ChatGPT — pick a role, copy the prompt, get it done in minutes.
              </p>
              <Button asChild size="lg" className="h-12 px-7 text-base">
                <a href="#roles">
                  Start a Workflow
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-6 py-16">
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
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
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
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose your role
            </h2>
            <p className="text-lg text-muted-foreground">
              Each library is built around the real tasks you do every week.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                workflowCount={getWorkflowsByRole(role.id).length}
              />
            ))}
          </div>
        </section>

        {/* Differentiator strip */}
        <section className="container mx-auto px-6 pb-8 pt-4">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
            <div className="grid items-center gap-6 sm:grid-cols-3">
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
        <section className="container mx-auto px-6 pb-16 pt-4">
          <Link
            to="/basics"
            className="group block rounded-2xl border border-border bg-primary-soft p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover sm:p-10"
          >
            <div className="grid items-center gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
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

export default Index;
