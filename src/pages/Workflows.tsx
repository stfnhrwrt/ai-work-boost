import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DiscoveryCard } from "@/components/DiscoveryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  countForOption,
  discoveryFilterLabels,
  discoveryItems,
  filterDiscoveryItems,
  DiscoveryFilters,
} from "@/data/discovery";

const FILTER_KEYS = ["role", "task", "format", "app", "skill", "environment"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const Workflows = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");

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

  const rows: { key: FilterKey; label: string; allLabel: string; options: { id: string; label: string }[] }[] = [
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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="border-b border-border bg-hero-gradient">
          <div className="container mx-auto px-6 py-10 sm:py-12">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse workflows
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Search {discoveryItems.length} practical workflows by task, role, format, app or skill
              level. Most work with Copilot, ChatGPT, Claude or an approved internal AI tool; the
              Microsoft 365 app workflows are Copilot-specific.
            </p>
            <div className="relative mt-6 max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, description, role, task or tag"
                className="h-12 bg-card pl-10 pr-10"
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
          </div>
        </section>

        <section className="container mx-auto px-6 py-8 sm:py-10">
          <div className="mb-8 space-y-4">
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

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "workflow" : "workflows"}
              {hasActiveFilters ? " match your filters" : ""}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={reset}>
                Clear all
              </Button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center sm:p-10">
              <p className="mb-2 font-medium text-foreground">No workflow matches this combination</p>
              <p className="mb-5 text-sm text-muted-foreground">
                Try a shorter search term, or remove one filter — app and skill level together are
                often too narrow.
              </p>
              <Button variant="outline" onClick={reset}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {results.map((item) => (
                <DiscoveryCard key={item.key} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

interface FilterRowProps {
  label: string;
  options: { id: string; label: string; count: number }[];
  active: string;
  onSelect: (value: string) => void;
}

function FilterRow({ label, options, active, onSelect }: FilterRowProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-24">
        {label}
      </span>
      <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
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
              className={
                isActive
                  ? "shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  : disabled
                    ? "shrink-0 cursor-not-allowed rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground/40"
                    : "shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {option.label}
              <span className={isActive ? "ml-1.5 opacity-80" : "ml-1.5 opacity-60"}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Workflows;
