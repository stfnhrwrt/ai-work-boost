import { ShieldAlert } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-foreground">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
          <p className="leading-relaxed">
            <span className="font-semibold">Copilot only uses data you have access to.</span>{" "}
            If results are incomplete, check permissions.
          </p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-6 px-6 pb-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">
            © {year} S. Harwart. All rights reserved.
          </p>
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
            . Designed for Microsoft Copilot and ChatGPT.
          </p>
        </div>
        <p className="text-xs">Get real work done in 5–10 minutes.</p>
      </div>
    </footer>
  );
}
