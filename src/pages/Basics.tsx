import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Cpu,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PromptBlock } from "@/components/PromptBlock";
import { Button } from "@/components/ui/button";

const examplePrompt = `You are an executive assistant.

Use my recent emails and meetings.

Create a structured daily briefing.

Output:
- Meetings
- Key updates
- Risks`;

const Basics = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-hero-gradient">
          <div className="container mx-auto max-w-4xl px-6 py-14">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Brain className="h-3.5 w-3.5" />
              AI Basics
            </span>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How to Use AI Effectively
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Five short blocks. Two-minute read. Everything you need to get
              dramatically better results from Copilot and ChatGPT — starting today.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-12">
          {/* Block 1 */}
          <Block
            number="01"
            icon={Target}
            title="How to structure a prompt"
            subtitle="Every good prompt has 4 parts."
          >
            <ol className="mb-6 grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Role",
                  desc: "Tell AI who it is.",
                  ex: '"You are an executive assistant"',
                },
                {
                  label: "Context",
                  desc: "What information should it use.",
                  ex: "emails, meetings, notes",
                },
                {
                  label: "Task",
                  desc: "What should it do.",
                  ex: "summarize, write, analyze",
                },
                {
                  label: "Output format",
                  desc: "How the result should look.",
                  ex: "bullet points, structured list",
                },
              ].map((p, i) => (
                <li
                  key={p.label}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {p.label}
                    </span>
                  </div>
                  <p className="mb-1.5 text-sm text-muted-foreground">{p.desc}</p>
                  <p className="text-sm text-foreground">
                    Example: <span className="text-muted-foreground">{p.ex}</span>
                  </p>
                </li>
              ))}
            </ol>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Example prompt
            </h3>
            <PromptBlock prompt={examplePrompt} />
          </Block>

          {/* Block 2 */}
          <Block
            number="02"
            icon={Cpu}
            title="What happens inside the AI"
            subtitle="It does not 'think' like a human."
          >
            <p className="mb-4 text-base leading-relaxed text-foreground">The AI:</p>
            <ul className="mb-5 space-y-2">
              {[
                "Reads your prompt.",
                "Predicts the most likely useful response.",
                "Uses patterns from training + your context.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground">{line}</span>
                </li>
              ))}
            </ul>
            <Callout>
              <strong className="font-semibold text-foreground">Important:</strong>{" "}
              Better input = better output.
            </Callout>
          </Block>

          {/* Block 3 */}
          <Block
            number="03"
            icon={Sparkles}
            title="Why Copilot is powerful"
            subtitle="It's different from ChatGPT."
          >
            <p className="mb-4 text-base leading-relaxed text-foreground">
              Copilot can use:
            </p>
            <div className="mb-5 grid gap-2 sm:grid-cols-2">
              {["Emails", "Teams chats", "Calendar", "Documents"].map((src) => (
                <div
                  key={src}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5 text-sm font-medium text-foreground"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  {src}
                </div>
              ))}
            </div>
            <Callout>You don't need to paste everything manually.</Callout>
          </Block>

          {/* Block 4 */}
          <Block
            number="04"
            icon={Wand2}
            title="How to improve results"
            subtitle="Always iterate. Don't expect a perfect first draft."
          >
            <p className="mb-3 text-sm text-muted-foreground">
              After the first answer, follow up with short refinement prompts:
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Make it shorter.",
                "Focus on top priorities.",
                "Make it more formal.",
                "Add examples.",
              ].map((p) => (
                <li
                  key={p}
                  className="rounded-lg border border-border bg-card p-3.5 text-sm font-medium text-foreground"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Block>

          {/* Block 5 */}
          <Block
            number="05"
            icon={AlertTriangle}
            title="Common mistakes"
            subtitle="The fastest way to bad output."
          >
            <ul className="space-y-2">
              {[
                "Prompts too vague.",
                "No structure.",
                "No context.",
                "Expecting perfect output immediately.",
              ].map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3.5 text-sm"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span className="text-foreground">{m}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-primary-soft p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Now put it into practice
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Pick a role and run a real workflow — the prompts already follow these
              principles.
            </p>
            <Button asChild size="lg">
              <Link to="/#roles">
                Browse workflows
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
};

interface BlockProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function Block({ number, icon: Icon, title, subtitle, children }: BlockProps) {
  return (
    <section className="mb-10 border-t border-border pt-8 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Block {number}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="pl-0 sm:pl-14">{children}</div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm leading-relaxed text-foreground">
      {children}
    </div>
  );
}

export default Basics;
