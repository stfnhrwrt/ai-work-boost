import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, Info, Lightbulb, XCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PromptBlock } from "@/components/PromptBlock";
import { CopyButton } from "@/components/CopyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AVAILABILITY_NOTE, copilotApps, getCopilotApp } from "@/data/copilotApps";

interface GuidanceListProps {
  title: string;
  items: string[];
  icon: typeof Info;
  tone?: "default" | "warning";
}

const GuidanceList = ({ title, items, icon: Icon, tone = "default" }: GuidanceListProps) => (
  <div className="border border-rule bg-card p-5">
    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon
        className={
          tone === "warning" ? "h-4 w-4 text-destructive" : "h-4 w-4 text-primary"
        }
      />
      {title}
    </h3>
    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CopilotAppPage = () => {
  const { appId } = useParams<{ appId: string }>();
  const { hash } = useLocation();
  const app = appId ? getCopilotApp(appId) : undefined;
  const [open, setOpen] = useState<string[]>([]);

  useEffect(() => {
    const target = hash.replace("#", "");
    if (!target) return;
    setOpen((current) => (current.includes(target) ? current : [...current, target]));
    const element = document.getElementById(target);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  if (!app) return <Navigate to="/copilot-microsoft-365" replace />;

  const Icon = app.icon;
  const otherApps = copilotApps.filter((a) => a.id !== app.id);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="border-b border-rule">
          <div className="container mx-auto px-6 py-12">
            <Link
              to="/copilot-microsoft-365"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Copilot in Microsoft 365 apps
            </Link>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {app.name}
                </h1>
                <p className="mb-3 max-w-measure text-lg text-muted-foreground">{app.tagline}</p>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {app.description}
                </p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  {app.workflows.length} workflows
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <GuidanceList title="What Copilot is useful for" items={app.usefulFor} icon={CheckCircle2} />
            <GuidanceList
              title="What source material improves the result"
              items={app.sourceMaterial}
              icon={Info}
            />
            <GuidanceList title="Prompt patterns" items={app.promptPatterns} icon={Lightbulb} />
            <GuidanceList
              title="Common mistakes"
              items={app.commonMistakes}
              icon={XCircle}
              tone="warning"
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <GuidanceList
              title="Review before accepting or sharing output"
              items={app.reviewBeforeSharing}
              icon={CheckCircle2}
            />
            <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-5 text-sm leading-relaxed text-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
              <div>
                <p className="mb-1 font-semibold">Availability varies</p>
                <p>{AVAILABILITY_NOTE}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-12">
          <h2 className="mb-1.5 text-xl font-semibold text-foreground">Workflows</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Each workflow lists when to use it, the source material to prepare, instructions you can
            copy and adapt, follow-up prompts and what a good result looks like.
          </p>

          <Accordion type="multiple" value={open} onValueChange={setOpen} className="space-y-3">
            {app.workflows.map((workflow) => (
              <AccordionItem
                key={workflow.id}
                id={workflow.id}
                value={workflow.id}
                className="border border-rule bg-card px-5"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span>
                    <span className="block text-base font-semibold text-foreground">
                      {workflow.title}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {workflow.description}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-6 pt-2">
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      When to use it
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {workflow.situation}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      Prepare this source material
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {workflow.inputs.map((input) => (
                        <li key={input} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                          <span>{input}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      Copy or adapt the instructions
                    </h4>
                    <PromptBlock prompt={workflow.prompt} />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Replace everything in square brackets before sending.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      What a good result looks like
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {workflow.expectedOutput}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      Refine the result
                    </h4>
                    <ul className="space-y-2">
                      {workflow.followUps.map((followUp) => (
                        <li
                          key={followUp}
                          className="flex items-start justify-between gap-3 rounded-md border border-rule bg-secondary/40 px-3 py-2"
                        >
                          <span className="text-sm text-foreground">{followUp}</span>
                          <CopyButton text={followUp} size="sm" variant="outline" label="Copy" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="border-t border-rule bg-secondary/30">
          <div className="container mx-auto px-6 py-10">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Other sections</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherApps.map((other) => {
                const OtherIcon = other.icon;
                return (
                  <Link
                    key={other.id}
                    to={`/copilot-microsoft-365/${other.id}`}
                    className="border border-rule bg-card p-4 transition-colors hover:border-primary/50"
                  >
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <OtherIcon className="h-4 w-4 text-primary" />
                      {other.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {other.workflows.length} workflows
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CopilotAppPage;
