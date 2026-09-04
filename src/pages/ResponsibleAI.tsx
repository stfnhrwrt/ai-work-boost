import { Lock, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const PERMISSION_POINTS = [
  "Existing permissions remain enforced",
  "Sensitivity labels remain active",
  "Compliance policies remain active",
  "Tenant and workspace isolation remains active",
  "Access controls are inherited from your organization",
];

const PRACTICES = [
  "Use only AI tools your organization has approved for work data.",
  "Never paste personal, confidential or regulated data into a consumer AI tool.",
  "Review sharing scopes in SharePoint, OneDrive or your document system before rolling out retrieval workflows.",
  "Apply sensitivity labels to confidential and restricted content.",
  "Always require a human review before sending AI output externally.",
  "Treat AI output as a draft: verify names, numbers, dates and commitments.",
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
            access rights, data protection rules and review processes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
              Permissions are never expanded
            </h2>
            <p className="mb-5 text-muted-foreground">
              Enterprise AI assistants such as Microsoft 365 Copilot only access information you are
              already authorized to view. They do not unlock new data, and they do not bypass
              organizational security controls.
            </p>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              {PERMISSION_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
              <strong>
                If a workflow returns nothing, it usually means you do not have access to that
                source — not that the prompt is wrong.
              </strong>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
              Practices we recommend
            </h2>
            <p className="mb-5 text-muted-foreground">
              AI reflects how your organization is governed. Overshared drives or unclear tool
              policies make existing risks more visible — these habits keep usage safe.
            </p>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              {PRACTICES.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-card">
          <h2 className="mb-3 text-xl font-semibold text-foreground">What this site is not</h2>
          <p className="text-muted-foreground">
            These workflows are practical guidance for individual professionals. They are not legal,
            compliance or financial advice, and they do not replace your organization's internal AI
            policy. If your company has its own guidance, that guidance always wins.
          </p>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);

export default ResponsibleAI;
