export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="container mx-auto flex flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
