export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="container mx-auto px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p>
            Designed for Microsoft Copilot (recommended) and ChatGPT. No login required.
          </p>
          <p>Get real work done in 5–10 minutes.</p>
        </div>
      </div>
    </footer>
  );
}
