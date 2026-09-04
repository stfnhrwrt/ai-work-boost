import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DiscoveryCard } from "@/components/DiscoveryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  countForOption,
  discoveryFilterLabels,
  discoveryItems,
  filterDiscoveryItems,
  DiscoveryFilters,
  libraryCounts,
} from "@/data/discovery";
import { SituationFinder } from "@/components/SituationFinder";

const FILTER_KEYS = ["role", "task", "format", "app", "skill", "environment"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const Workflows = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const active: Record<FilterKey, string> = {
    role: params.get("role") ?? "all",
    task: params.get("task") ?? "all",
    format: params.get("format") ?? "all",
    app: params.get("app") ?? "all",
    skill: params.get("skill") ?? "all",
    environment: params.get("environment") ?? "all",
  };

  const setFilter = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filters: DiscoveryFilters = { ...active, query };

  const results = useMemo(() => filterDiscoveryItems(filters), [
    query,
    active.role,
    active.task,
    active.format,
    active.app,
    active.skill,
    active.environment,
  ]);

  const hasActiveFilters =
    query.trim().length > 0 || FILTER_KEYS.some((key) => active[key] !== "all");

  const reset = () => {
    setQuery("");
    setParams(new URLSearchParams(), { replace: true });
  };

  const rows: {
    key: FilterKey;
    label: string;
    allLabel: string;
    options: { id: string; label: string }[];
  }[] = [
    { key: "task", label: "Task type", allLabel: "All tasks", options: discoveryFilterLabels.taskTypes },
    { key: "role", label: "Role", allLabel: "All roles", options: discoveryFilterLabels.roles },
    { key: "format", label: "Format", allLabel: "All formats", options: discoveryFilterLabels.formats },
    { key: "app", label: "App", allLabel: "All apps", options: discoveryFilterLabels.apps },
    { key: "skill", label: "Skill level", allLabel: "All levels", options: discoveryFilterLabels.skills },
    {
      key: "environment",
      label: "Run in",
      allLabel: "Any environment",
      options: discoveryFilterLabels.environments,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="border-b border-rule">
          <div className="container mx-auto px-6 py-10">
            <p className="label-eyebrow mb-3">The index</p>
            <h1 className="font-display text-4xl text-foreground sm:text-5xl">Browse workflows</h1>
            <p className="mt-3 max-w-measure text-base text-muted-foreground">
              Search {libraryCounts.general} general workflows and {libraryCounts.microsoft365}{" "}
              Microsoft 365 specialist workflows by task, role, format, app or skill level. Most
              general workflows run in Copilot, ChatGPT, Claude, Gemini or an approved internal AI
              tool; the Microsoft 365 workflows are Copilot-specific.
            </p>
            <p className="mt-2 max-w-measure text-xs text-muted-foreground">
              {libraryCounts.shared} workflows appear in both collections, so the two counts
              overlap. The index below lists {discoveryItems.length} unique entries.
            </p>
            <SituationFinder eyebrow="Not sure where to start" className="mt-8" />
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-14 z-30 border-b border-rule bg-background/95 backdrop-blur">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, description, role, task or tag"
                  className="h-11 rounded-sm border-rule bg-card pl-10 pr-10"
                  aria-label="Search workflows"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1 border border-rule bg-card p-1">
                <ViewToggle
                  active={view === "list"}
                  onClick={() => setView("list")}
                  label="List view"
                  icon={List}
                />
                <ViewToggle
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  label="Grid view"
                  icon={LayoutGrid}
                />
              </div>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" className="rounded-sm" onClick={reset}>
                  Clear all
                </Button>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {rows.map((row) => (
                <FilterRow
                  key={row.key}
                  label={row.label}
                  options={[
                    { id: "all", label: row.allLabel, count: results.length },
                    ...row.options.map((o) => ({
                      id: o.id,
                      label: o.label,
                      count: countForOption({ ...filters, [row.key]: "all" }, row.key, o.id),
                    })),
                  ]}
                  active={active[row.key]}
                  onSelect={(value) => setFilter(row.key, value)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-8">
          <h2 className="label-eyebrow mb-4 border-b border-rule pb-3">
            {results.length} {results.length === 1 ? "entry" : "entries"}
            {hasActiveFilters ? " matching your filters" : " in the library"}
          </h2>

          {results.length === 0 ? (
            <div className="border border-rule bg-card p-10 text-center">
              <p className="font-display text-xl text-foreground">
                No workflow matches this combination
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Try a shorter search term, or remove one filter — app and skill level together are
                often too narrow.
              </p>
              <Button variant="outline" className="mt-5 rounded-sm" onClick={reset}>
                Clear all filters
              </Button>
            </div>
          ) : view === "list" ? (
            <div className="border-t border-rule">
              {results.map((item, idx) => (
                <div key={item.key} className={idx < 8 ? "fade-in-up" : undefined} style={{ ["--i" as string]: idx }}>
                  <DiscoveryCard item={item} variant="row" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, idx) => (
                <div key={item.key} className={idx < 8 ? "fade-in-up bg-card" : "bg-card"} style={{ ["--i" as string]: idx }}>
                  <DiscoveryCard item={item} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

function ViewToggle({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

interface FilterRowProps {
  label: string;
  options: { id: string; label: string; count: number }[];
  active: string;
  onSelect: (value: string) => void;
}

function FilterRow({ label, options, active, onSelect }: FilterRowProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="label-eyebrow shrink-0 sm:w-24">{label}</span>
      <div className="flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {options.map((option) => {
          const isActive = active === option.id;
          const disabled = option.count === 0 && !isActive;
          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              aria-pressed={isActive}
              onClick={() => onSelect(option.id)}
              className={cn(
                "shrink-0 border px-2.5 py-1 text-xs transition-colors",
                isActive
                  ? "border-primary bg-primary font-semibold text-primary-foreground"
                  : disabled
                    ? "cursor-not-allowed border-rule bg-card text-muted-foreground/40"
                    : "border-rule bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {option.label}
              <span className="ml-1.5 opacity-60">{option.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Workflows;
