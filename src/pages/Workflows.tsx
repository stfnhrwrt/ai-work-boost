import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkflowCard } from "@/components/WorkflowCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LEVEL_META, roles, workflows, RoleId, WorkflowLevel } from "@/data/workflows";
import { getTaskType, taskTypes, TaskTypeId } from "@/data/taskTypes";

const LEVELS: WorkflowLevel[] = ["essential", "advanced", "agent", "scheduled", "automation"];

const Workflows = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const roleFilter = params.get("role") ?? "all";
  const taskFilter = params.get("task") ?? "all";
  const levelFilter = params.get("level") ?? "all";

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workflows.filter((w) => {
      if (roleFilter !== "all" && w.roleId !== roleFilter) return false;
      if (levelFilter !== "all" && w.level !== levelFilter) return false;
      if (taskFilter !== "all" && getTaskType(w.id)?.id !== taskFilter) return false;
      if (!q) return true;
      return (
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.situation.toLowerCase().includes(q)
      );
    });
  }, [query, roleFilter, taskFilter, levelFilter]);

  const activeRoles = roles.filter((r) => !r.comingSoon);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-hero-gradient">
          <div className="container mx-auto px-6 py-12">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse workflows
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Search {workflows.length} practical workflows by task, role or level. Every prompt works
              with Copilot, ChatGPT, Claude or an approved internal AI tool.
            </p>
            <div className="relative mt-6 max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workflows, e.g. meeting notes, status report, inbox"
                className="h-12 bg-card pl-10"
                aria-label="Search workflows"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10">
          <div className="mb-8 space-y-4">
            <FilterRow
              label="Task type"
              options={[
                { value: "all", label: "All tasks" },
                ...taskTypes.map((t) => ({ value: t.id as TaskTypeId, label: t.name })),
              ]}
              active={taskFilter}
              onSelect={(v) => setFilter("task", v)}
            />
            <FilterRow
              label="Role"
              options={[
                { value: "all", label: "All roles" },
                ...activeRoles.map((r) => ({ value: r.id as RoleId, label: r.shortName })),
              ]}
              active={roleFilter}
              onSelect={(v) => setFilter("role", v)}
            />
            <FilterRow
              label="Level"
              options={[
                { value: "all", label: "All levels" },
                ...LEVELS.map((l) => ({ value: l, label: LEVEL_META[l].shortLabel })),
              ]}
              active={levelFilter}
              onSelect={(v) => setFilter("level", v)}
            />
          </div>

          <p className="mb-5 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "workflow" : "workflows"}
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <p className="mb-4 text-muted-foreground">
                No workflow matches these filters yet. Try a broader search term or reset the filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setParams(new URLSearchParams(), { replace: true });
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
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
  options: { value: string; label: string }[];
  active: string;
  onSelect: (value: string) => void;
}

function FilterRow({ label, options, active, onSelect }: FilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onSelect(o.value)}
          className={
            active === o.value
              ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              : "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default Workflows;
