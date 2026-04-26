import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-base">AI Workflows</span>
          <span className="hidden text-sm font-normal text-muted-foreground sm:inline">for Daily Work</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm sm:gap-6">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            to="/#roles"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Workflows
          </Link>
          <Link
            to="/basics"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            AI Basics
          </Link>
        </nav>
      </div>
    </header>
  );
}
