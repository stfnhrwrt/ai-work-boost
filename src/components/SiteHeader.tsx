import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/workflows", label: "Browse workflows" },
  { to: "/roles", label: "Roles" },
  { to: "/task-types", label: "Task types" },
  { to: "/copilot-microsoft-365", label: "Copilot in Microsoft 365" },
  { to: "/basics", label: "AI basics" },
  { to: "/responsible-ai", label: "Responsible AI" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-background/92 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <div className="container mx-auto flex h-14 items-center justify-between gap-6 px-6">
        <Link to="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            AI Workflows
          </span>
          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:inline">
            Field guide
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "underline-grow py-1 text-[0.8125rem] font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-rule text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <p className="label-eyebrow mt-2">Navigate</p>
            <nav className="mt-4 flex flex-col divide-y divide-rule text-sm">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "py-3 transition-colors hover:text-foreground",
                      isActive ? "font-semibold text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
