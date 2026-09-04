import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileText,
  Gauge,
  Lock,
  Mail,
  MessageSquare,
  Settings2,
  Sparkles,
  Target,
  TrendingDown,
  Wand2,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { DiscoveryCard } from "@/components/DiscoveryCard";
import { getRelatedItems } from "@/data/discovery";
import { SiteFooter } from "@/components/SiteFooter";
import { PromptBlock } from "@/components/PromptBlock";
import { CopyButton } from "@/components/CopyButton";
import { AccessNote } from "@/components/AccessNote";
import { AutomationIndicators } from "@/components/AutomationIndicators";
import { Tip } from "@/components/Tip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  getRole,
  getWorkflow,
  getWorkflowsByRole,
  LEVEL_META,
} from "@/data/workflows";
import { resolveWorkflow, formatReviewDate } from "@/data/workflowModel";

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
  const model = resolveWorkflow(workflow);
  const related = getRelatedItems(workflow.id, 4);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {/* Masthead */}
        <section className="border-b border-rule">
          <div className="container mx-auto px-6 py-10">
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
              <span className="mb-3 inline-flex items-center gap-1.5 bg-primary px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                {workflow.level === "advanced" && <Zap className="h-3.5 w-3.5" />}
                {workflow.level === "agent" && <Bot className="h-3.5 w-3.5" />}
                {workflow.level === "scheduled" && <CalendarClock className="h-3.5 w-3.5" />}
                {workflow.level === "automation" && <Settings2 className="h-3.5 w-3.5" />}
                {meta.label}
              </span>
            )}

            <h1 className="mb-3 max-w-measure font-display text-4xl text-foreground sm:text-5xl">
              {workflow.title}
            </h1>
            <p className="mb-5 max-w-measure text-lg leading-relaxed text-muted-foreground">
              {workflow.description}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip>{role.name}</Chip>
              <Chip>{model.taskTypeName}</Chip>
              <Chip>{model.format.shortLabel}</Chip>
              <Chip icon={Clock}>Typical effort {model.typicalEffort}</Chip>
              {model.manualEffortAvoided && (
                <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Manual effort avoided {model.manualEffortAvoided}
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto grid gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
        <article className="min-w-0 max-w-measure">
          {/* Step 1 — Understand the situation */}
          <Section step={1} title="Understand the situation">
            <div className="border border-rule bg-secondary/50 p-5 text-base leading-relaxed text-foreground">
              {workflow.situation}
            </div>
          </Section>

          {/* Step 2 — Prepare the inputs */}
          <Section
            step={2}
            title="Prepare the inputs"
            subtitle="What the assistant needs before it can help"
          >
            <ul className="grid gap-2 sm:grid-cols-2">
              {workflow.contextSources.map((src) => {
                const Icon = sourceIconFor(src);
                return (
                  <li
                    key={src}
                    className="flex items-start gap-3 border border-rule bg-card p-3.5 text-sm"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{src}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 border border-rule bg-card p-5">
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Recommended execution environment
              </h3>
              <p className="mb-4 text-xs text-muted-foreground">
                {model.copilotOnly
                  ? "This workflow depends on Microsoft 365 mechanics, so it runs in Copilot only."
                  : "Use whichever of these your organization has approved. They do not behave the same way."}
              </p>
              <ul className="space-y-3">
                {model.environments.map((env) => (
                  <li key={env.id} className="border-l-2 border-rule pl-4">
                    <div className="text-sm font-semibold text-foreground">{env.name}</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {env.contextBehaviour}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {env.governanceNote}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {workflow.contextTip && (
              <div className="mt-3">
                <Tip>{workflow.contextTip}</Tip>
              </div>
            )}
          </Section>

          {/* Access Matters callout */}
          {workflow.accessNote && <AccessNote note={workflow.accessNote} />}

          {/* Step 3 — Copy or adapt the instructions */}
          <Section
            step={3}
            title="Copy or adapt the instructions"
            subtitle="Adjust the placeholders before you run it"
          >
            <Tabs defaultValue="copilot" className="w-full">
              <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="copilot">Microsoft Copilot</TabsTrigger>
                <TabsTrigger value="other">ChatGPT, Claude or internal tool</TabsTrigger>
              </TabsList>
              <TabsContent value="copilot" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Copilot can use the Microsoft 365 content you are already authorized to
                  access, so you rarely need to paste anything.
                </p>
                <PromptBlock prompt={workflow.copilotPrompt} />
              </TabsContent>
              <TabsContent value="other" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  These tools have no access to your company systems. Paste or attach the
                  inputs where the instructions indicate, and remove anything you are not
                  allowed to share.
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

          {/* Step 4 — Review the output */}
          <Section
            step={4}
            title="Review the output"
            subtitle="You stay accountable for the result"
            icon={ClipboardCheck}
          >
            <div className="mb-4 border border-rule bg-card p-5">
              <h3 className="mb-1.5 text-sm font-semibold text-foreground">Expected output</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {model.expectedOutput}
              </p>
            </div>

            <div className="border border-rule bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Review checklist</h3>
              <ul className="space-y-2">
                {model.reviewChecklist.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-3 border border-rule bg-secondary/50 p-5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  Privacy and confidentiality
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {model.privacyNote}
                </p>
              </div>
            </div>
          </Section>

          {/* Step 5 — Refine the result */}
          <Section
            step={5}
            title="Refine the result"
            subtitle="Follow-up instructions to sharpen the output"
            icon={Wand2}
          >
            <ul className="space-y-2.5">
              {model.followUpPrompts.map((p) => (
                <li
                  key={p}
                  className="flex items-center justify-between gap-4 border border-rule bg-card p-4"
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
            <div className="border border-primary/30 bg-primary-soft p-5 text-base leading-relaxed text-foreground">
              {workflow.realWorldAction}
            </div>
          </Section>

          {/* Effort */}
          <Section title="Effort" icon={Gauge}>
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoBox label="Typical effort" value={model.typicalEffort} />
              <InfoBox
                label="Estimated manual effort avoided"
                value={model.manualEffortAvoided ?? "Varies by task"}
              />
              <InfoBox label="Last reviewed" value={formatReviewDate(model.lastReviewed)} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Effort figures are indicative estimates for a typical case, not guaranteed savings.
            </p>
          </Section>

          {/* ===== Level-specific sections ===== */}

          {/* Automation indicators (Level 4) */}
          {(workflow.automationLayers ||
            workflow.sharedMailboxSupport ||
            workflow.requiresPermissions) && (
            <AutomationIndicators
              layers={workflow.automationLayers}
              sharedMailbox={workflow.sharedMailboxSupport}
              requiresPermissions={workflow.requiresPermissions}
            />
          )}

          {/* Outlook setup (Level 4) */}
          {workflow.outlookSetup && (
            <Section
              title={workflow.outlookSetup.title}
              subtitle="Configure once — runs forever"
              icon={Settings2}
            >
              <div className="border border-rule bg-card p-5">
                <ol className="space-y-2 text-sm text-foreground">
                  {workflow.outlookSetup.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                {workflow.outlookSetup.note && (
                  <p className="mt-4 border-t border-rule pt-3 text-xs text-muted-foreground">
                    {workflow.outlookSetup.note}
                  </p>
                )}
              </div>
            </Section>
          )}

          {/* Agent setup (Level 2) */}
          {workflow.agent && (
            <Section title="Use the agent" subtitle="How the conversation works" icon={Bot}>
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <InfoBox label="Purpose" value={workflow.agent.purpose} />
                <InfoBox label="Why it's powerful" value={workflow.agent.benefit} />
              </div>

              <div className="mb-4 border border-primary/30 bg-primary-soft p-5">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Interaction mode</h4>
                <p className="mb-3 text-sm leading-relaxed text-foreground">
                  The agent asks you short questions one at a time. You answer step-by-step,
                  and it builds the final result from your inputs — no Copilot Studio required
                  to use it.
                </p>
                <ol className="space-y-1.5 text-sm text-foreground">
                  <li><span className="font-semibold">1.</span> AI asks a focused question.</li>
                  <li><span className="font-semibold">2.</span> You answer in your own words.</li>
                  <li><span className="font-semibold">3.</span> AI assembles the structured output.</li>
                </ol>
              </div>

              <div className="mb-3">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Agent instruction</h4>
                <PromptBlock prompt={workflow.agent.instruction} />
              </div>

              <div className="mb-4 border border-rule bg-secondary/50 p-4 text-sm">
                <span className="font-semibold text-foreground">Example trigger: </span>
                <span className="text-muted-foreground">{workflow.agent.triggerExample}</span>
              </div>

              <details className="group border border-rule bg-card p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
                  <span>Optional: build it in Copilot Studio</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-4">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Only needed if you want to package this as a reusable agent for your team.
                  </p>
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
              </details>
            </Section>
          )}

          {/* Scheduled prompt setup (Level 3) */}
          {workflow.scheduled && (
            <Section
              title={
                workflow.scheduled.mechanism === "power-automate"
                  ? "Schedule the automation"
                  : "Schedule the prompt"
              }
              subtitle={
                workflow.scheduled.mechanism === "power-automate"
                  ? "Setup steps in Microsoft Power Automate"
                  : "Native Microsoft 365 Copilot — no Copilot Studio required"
              }
              icon={CalendarClock}
            >
              {workflow.scheduled.mechanism !== "power-automate" && (
                <div className="mb-4 border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground">
                  <span className="font-semibold">Scheduled Prompts</span> are a
                  native Copilot feature: run a prompt manually, click the "…"
                  menu, and choose <em>Schedule this prompt</em>. Works in Work
                  mode (Teams or Outlook), not Web mode.
                </div>
              )}

              <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox label="Purpose" value={workflow.scheduled.purpose} />
                <InfoBox label="Schedule" value={workflow.scheduled.schedule} />
                <InfoBox label="Output" value={workflow.scheduled.output} />
                {workflow.scheduled.outputLocation && (
                  <InfoBox
                    label="Where it appears"
                    value={workflow.scheduled.outputLocation}
                  />
                )}
              </div>

              <div className="mb-5 border border-rule bg-card p-5">
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

              {workflow.scheduled.powerAutomateAlt && (
                <div className="border border-rule bg-secondary/50 p-4 text-sm">
                  <span className="font-semibold text-foreground">
                    Power Automate alternative:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {workflow.scheduled.powerAutomateAlt}
                  </span>
                </div>
              )}
            </Section>
          )}

          {related.length > 0 && (
            <Section title="Related workflows" subtitle="Often used alongside this one">
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <DiscoveryCard key={item.key} item={item} />
                ))}
              </div>
            </Section>
          )}

          {/* Bottom nav */}
          <div className="mt-14 flex flex-col items-stretch justify-between gap-3 border-t border-rule pt-8 sm:flex-row sm:items-center">
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

          {/* Side rail */}
          <aside className="order-first hidden lg:order-none lg:block">
            <div className="sticky top-24 border-t border-rule pt-4 text-sm">
              <p className="label-eyebrow mb-3">At a glance</p>
              <dl className="space-y-3">
                <RailItem label="Role" value={role.name} />
                <RailItem label="Task type" value={model.taskTypeName} />
                <RailItem label="Format" value={model.format.shortLabel} />
                <RailItem label="Typical effort" value={model.typicalEffort} />
                <RailItem
                  label="Recommended tools"
                  value={model.environments.map((e) => e.name).join(", ")}
                />
                <RailItem label="Last reviewed" value={formatReviewDate(model.lastReviewed)} />
              </dl>
              <div className="mt-5 border-t border-rule pt-4">
                <CopyButton text={workflow.copilotPrompt} className="w-full rounded-sm" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Copies the main instructions for this workflow.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile sticky copy action */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-background/95 p-3 backdrop-blur lg:hidden">
          <CopyButton text={workflow.copilotPrompt} className="w-full rounded-sm" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

function Chip({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-rule bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

interface SectionProps {
  title: string;
  subtitle?: string;
  step?: number;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function Section({ title, subtitle, step, icon: Icon, children }: SectionProps) {
  return (
    <section className="mb-12 scroll-mt-24">
      <div className="mb-4 border-b border-rule pb-3">
        {step && <p className="label-marker mb-1">Step {String(step).padStart(2, "0")}</p>}
        <h2 className="flex items-center gap-2 font-display text-2xl text-foreground">
          {Icon && !step && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function RailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-rule pb-3 last:border-0">
      <dt className="label-eyebrow">{label}</dt>
      <dd className="mt-1 text-sm leading-snug text-foreground">{value}</dd>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule bg-card p-4">
      <div className="label-eyebrow mb-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-3 w-3 text-primary" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

export default WorkflowPage;
