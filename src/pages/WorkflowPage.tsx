import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PromptBlock } from "@/components/PromptBlock";
import { CopyButton } from "@/components/CopyButton";
import { AccessNote } from "@/components/AccessNote";
import { Tip } from "@/components/Tip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  getRole,
  getWorkflow,
  getWorkflowsByRole,
  LEVEL_META,
} from "@/data/workflows";

const sourceIconFor = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes("email") || s.includes("mailbox")) return Mail;
  if (s.includes("teams") || s.includes("chat") || s.includes("conversation"))
    return MessageSquare;
  if (s.includes("calendar") || s.includes("meeting") || s.includes("stand-up"))
    return Calendar;
  return FileText;
};

const WorkflowPage = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const workflow = workflowId ? getWorkflow(workflowId) : undefined;

  if (!workflow) return <Navigate to="/" replace />;

  const role = getRole(workflow.roleId)!;
  const siblings = getWorkflowsByRole(workflow.roleId);
  const currentIndex = siblings.findIndex((w) => w.id === workflow.id);
  const next = siblings[(currentIndex + 1) % siblings.length];
  const meta = LEVEL_META[workflow.level];
  const isAdvanced = workflow.level !== "essential";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-hero-gradient">
          <div className="container mx-auto max-w-4xl px-6 py-10">
            <nav className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/role/${role.id}`} className="transition-colors hover:text-foreground">
                {role.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{workflow.title}</span>
            </nav>

            {isAdvanced && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                {workflow.level === "advanced" && <Zap className="h-3.5 w-3.5" />}
                {workflow.level === "agent" && <Bot className="h-3.5 w-3.5" />}
                {workflow.level === "scheduled" && <CalendarClock className="h-3.5 w-3.5" />}
                {meta.label}
              </span>
            )}

            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {workflow.title}
            </h1>
            <p className="mb-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {workflow.description}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Copilot recommended
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                ChatGPT alternative
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {workflow.timeRange}
              </span>
            </div>
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-12">
          {/* Situation */}
          <Section title="Situation">
            <div className="rounded-xl border border-border bg-secondary/50 p-5 text-base leading-relaxed text-foreground">
              {workflow.situation}
            </div>
          </Section>

          {/* Context Source */}
          <Section title="Context source" subtitle="What Copilot can pull in automatically">
            <ul className="grid gap-2 sm:grid-cols-2">
              {workflow.contextSources.map((src) => {
                const Icon = sourceIconFor(src);
                return (
                  <li
                    key={src}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 text-sm"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{src}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Copilot accesses these for you when used inside Microsoft 365. With ChatGPT,
              you'll paste the relevant context manually.
            </p>
            {workflow.contextTip && (
              <div className="mt-3">
                <Tip>{workflow.contextTip}</Tip>
              </div>
            )}
          </Section>

          {/* Access Matters callout */}
          {workflow.accessNote && <AccessNote note={workflow.accessNote} />}

          {/* Agent setup (Level 2) */}
          {workflow.agent && (
            <Section title="Build the agent" subtitle="Setup steps in Copilot Studio" icon={Bot}>
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <InfoBox label="Purpose" value={workflow.agent.purpose} />
                <InfoBox label="Why it's powerful" value={workflow.agent.benefit} />
              </div>

              <div className="mb-5 rounded-xl border border-border bg-card p-5">
                <h4 className="mb-3 text-sm font-semibold text-foreground">Setup steps</h4>
                <ol className="space-y-2 text-sm text-foreground">
                  {workflow.agent.setupSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mb-3">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Agent instruction</h4>
                <PromptBlock prompt={workflow.agent.instruction} />
              </div>

              <div className="rounded-lg border border-border bg-secondary/50 p-4 text-sm">
                <span className="font-semibold text-foreground">Example trigger: </span>
                <span className="text-muted-foreground">{workflow.agent.triggerExample}</span>
              </div>
            </Section>
          )}

          {/* Scheduled flow setup (Level 3) */}
          {workflow.scheduled && (
            <Section
              title="Schedule the automation"
              subtitle="Setup steps in Microsoft Power Automate"
              icon={CalendarClock}
            >
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <InfoBox label="Purpose" value={workflow.scheduled.purpose} />
                <InfoBox label="Schedule" value={workflow.scheduled.schedule} />
                <InfoBox label="Output" value={workflow.scheduled.output} />
              </div>

              <div className="mb-5 rounded-xl border border-border bg-card p-5">
                <h4 className="mb-3 text-sm font-semibold text-foreground">Setup steps</h4>
                <ol className="space-y-2 text-sm text-foreground">
                  {workflow.scheduled.setupSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Section>
          )}

          {/* Tool Mode + Prompts */}
          <Section
            title={
              workflow.agent
                ? "Prompt for the agent"
                : workflow.scheduled
                  ? "Prompt for the scheduled flow"
                  : "Run the workflow"
            }
            subtitle="Pick the tool you have access to"
          >
            <Tabs defaultValue="copilot" className="w-full">
              <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="copilot">Copilot (Recommended)</TabsTrigger>
                <TabsTrigger value="chatgpt">ChatGPT</TabsTrigger>
              </TabsList>
              <TabsContent value="copilot" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Uses your real company data — emails, Teams, calendar, documents — automatically.
                </p>
                <PromptBlock prompt={workflow.copilotPrompt} />
              </TabsContent>
              <TabsContent value="chatgpt" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Paste the relevant notes, emails or context where the prompt indicates.
                </p>
                <PromptBlock prompt={workflow.chatgptPrompt} />
              </TabsContent>
            </Tabs>
            {workflow.promptTip && (
              <div className="mt-4">
                <Tip>{workflow.promptTip}</Tip>
              </div>
            )}
          </Section>

          {/* Improve Output */}
          <Section
            title="Improve the output"
            subtitle="Short follow-up prompts to refine the result"
            icon={Wand2}
          >
            <ul className="space-y-2.5">
              {workflow.improvementPrompts.map((p) => (
                <li
                  key={p}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <span className="text-sm text-foreground">{p}</span>
                  <CopyButton text={p} label="Copy" size="sm" variant="outline" />
                </li>
              ))}
            </ul>
            {workflow.improvementTip && (
              <div className="mt-4">
                <Tip>{workflow.improvementTip}</Tip>
              </div>
            )}
            {workflow.extraTips && workflow.extraTips.length > 0 && (
              <div className="mt-3 space-y-2">
                {workflow.extraTips.map((t) => (
                  <Tip key={t}>{t}</Tip>
                ))}
              </div>
            )}
          </Section>

          {/* Real-World Action */}
          <Section title="Real-world action" icon={Target}>
            <div className="rounded-xl border border-primary/20 bg-primary-soft p-5 text-base leading-relaxed text-foreground">
              {workflow.realWorldAction}
            </div>
          </Section>

          {/* Bottom nav */}
          <div className="mt-14 flex flex-col items-stretch justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
            <Button asChild variant="outline">
              <Link to={`/role/${role.id}`}>
                <ArrowLeft className="h-4 w-4" />
                Back to {role.name}
              </Link>
            </Button>
            {next && next.id !== workflow.id && (
              <Button asChild>
                <Link to={`/workflow/${next.id}`}>
                  Next: {next.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
};

interface SectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function Section({ title, subtitle, icon: Icon, children }: SectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <CheckCircle2 className="h-3 w-3 text-primary" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

export default WorkflowPage;
