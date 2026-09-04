import { AlertTriangle, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface Principle {
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Keep sensitive information out of unapproved tools",
    body: "Do not enter confidential, personal, regulated or otherwise sensitive information into any AI tool your organization has not approved for that purpose. When in doubt, remove names, figures and identifiers before you paste anything.",
  },
  {
    title: "Know what the tool can access",
    body: "Check which data sources and permissions the selected assistant can reach. An enterprise assistant connected to your work account behaves very differently from a consumer chat tool with no access to company systems.",
  },
  {
    title: "Treat output as a draft",
    body: "AI output is a starting point and a decision-support aid, not a finished deliverable and not a decision. You remain responsible for what you send, publish or approve.",
  },
  {
    title: "Verify the details",
    body: "Check facts, calculations, citations, owners, dates, quantities and recommendations against the source material. Confident wording is not evidence of accuracy.",
  },
  {
    title: "Review before it leaves your desk",
    body: "Read the full output before any external communication, customer contact, leadership update or important decision. Check tone, commitments and anything that could be read as a promise.",
  },
  {
    title: "Apply extra caution in sensitive areas",
    body: "HR, legal, financial, security, customer and compliance work carries higher consequences. In these areas, involve the accountable owner and keep a human decision in the loop.",
  },
  {
    title: "Follow your company policy and the law",
    body: "Internal AI policies, data protection rules, sector regulation and contractual obligations always take precedence over anything on this site.",
  },
];

const PERMISSION_POINTS = [
  "Existing permissions remain enforced",
  "Sensitivity labels remain active",
  "Compliance policies remain active",
  "Tenant and workspace isolation remains active",
  "Access controls are inherited from your organization",
];

const TOOL_NOTES = [
  {
    tool: "Enterprise assistants connected to your work account",
    note: "May use work content you are already authorized to see. They do not expand your permissions and do not unlock new data.",
  },
  {
    tool: "General assistants such as ChatGPT or Claude",
    note: "Have no access to your company systems. You provide the context, so you decide what leaves your environment — and what must not.",
  },
  {
    tool: "Internal or custom AI tools",
    note: "Behave according to how your organization configured them. Confirm the approved use cases and data handling before you rely on them.",
  },
];

const ResponsibleAI = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main className="flex-1">
      <section className="border-b border-border bg-hero-gradient">
        <div className="container mx-auto px-6 py-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3 w-3" />
            Responsible AI
          </span>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Use AI inside the rules you already work with
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Every workflow on this site is designed to run within your organization's existing
            access rights, data protection rules and review processes — whichever assistant you use.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Seven rules that apply to every workflow
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              Permissions are never expanded
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              An assistant connected to your work account only reaches information you are already
              authorized to view. It does not bypass organizational security controls.
            </p>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              {PERMISSION_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
              <strong>
                If a workflow returns nothing, it usually means you do not have access to that
                source — not that the instructions are wrong.
              </strong>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              Tools are not interchangeable
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              The instructions on this site work across assistants, but access, privacy and
              governance differ. Check the difference before you choose a tool.
            </p>
            <ul className="space-y-4">
              {TOOL_NOTES.map((t) => (
                <li key={t.tool} className="rounded-lg border border-border bg-background p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{t.tool}</p>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
              Before you accept an output
            </h2>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              {[
                "Are the facts, names, dates and numbers correct?",
                "Are calculations and totals reproducible from the source?",
                "Are citations and links real and relevant?",
                "Is anything invented, missing or overstated?",
                "Would you be comfortable if this were forwarded unchanged?",
              ].map((q) => (
                <li key={q} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
              <AlertTriangle className="h-5 w-5 text-accent-foreground" aria-hidden="true" />
              What this site is not
            </h2>
            <p className="text-sm text-muted-foreground">
              These workflows are practical guidance for individual professionals. They are not
              legal, compliance or financial advice, they make no guarantee about the quality of any
              result, and they do not replace your organization's internal AI policy. If your
              company has its own guidance, that guidance always wins.
            </p>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export default ResponsibleAI;
