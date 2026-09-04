import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const FOOTER_LINKS = [
  { to: "/workflows", label: "Browse workflows" },
  { to: "/roles", label: "Roles" },
  { to: "/task-types", label: "Task types" },
  { to: "/copilot-microsoft-365", label: "Copilot in Microsoft 365 apps" },
  { to: "/basics", label: "AI basics" },
  { to: "/responsible-ai", label: "Responsible AI" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-rule/60 bg-background">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
          <p className="leading-relaxed">
            <span className="font-semibold">
              Use only AI tools approved for your organization.
            </span>{" "}
            Access, privacy, and governance depend on the tool and its configuration. Review every
            result before you share or act on it.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 pb-4">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container mx-auto flex flex-col gap-6 px-6 pb-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">© {year} S. Harwart. All rights reserved.</p>
          <p>
            Built and maintained by{" "}
            <a
              href="https://learn.agentstacker.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              learn.agentstacker.org
            </a>
            . Works with Copilot, ChatGPT, Claude, Gemini and approved internal AI tools.
          </p>
        </div>
        <p className="text-xs">Get real work done in 5–10 minutes.</p>
      </div>
    </footer>
  );
}
