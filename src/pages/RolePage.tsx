import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkflowCard } from "@/components/WorkflowCard";
import { getRole, getWorkflowsByRole, roles } from "@/data/workflows";
import { getFormatId, getFormatsForWorkflows, WorkflowFormatId } from "@/data/formats";
import { getTaskType, taskTypes, TaskTypeId } from "@/data/taskTypes";

const RolePage = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const role = roleId ? getRole(roleId) : undefined;
  const [taskFilter, setTaskFilter] = useState<TaskTypeId | "all">("all");
  const [formatFilter, setFormatFilter] = useState<WorkflowFormatId | "all">("all");

  const roleWorkflows = useMemo(() => (role ? getWorkflowsByRole(role.id) : []), [role]);

  const availableTaskTypes = useMemo(() => {
    const present = new Set(roleWorkflows.map((w) => getTaskType(w.id)?.id));
    return taskTypes.filter((t) => present.has(t.id));
  }, [roleWorkflows]);

  const availableFormats = useMemo(() => getFormatsForWorkflows(roleWorkflows), [roleWorkflows]);

  const filtered = useMemo(
    () =>
      roleWorkflows.filter((w) => {
        if (taskFilter !== "all" && getTaskType(w.id)?.id !== taskFilter) return false;
        if (formatFilter !== "all" && getFormatId(w.level) !== formatFilter) return false;
        return true;
      }),
    [roleWorkflows, taskFilter, formatFilter],
  );

  if (!role) return <Navigate to="/roles" replace />;

  const Icon = role.icon;
  const relatedRoles = roles.filter((r) => r.id !== role.id).slice(0, 4);
  const relatedWorkflows = roles
    .filter((r) => r.id !== role.id)
    .flatMap((r) => getWorkflowsByRole(r.id).slice(0, 1))
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="border-b border-rule">
          <div className="container mx-auto px-6 py-12">
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/roles" className="transition-colors hover:text-foreground">
                Roles
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{role.name}</span>
            </nav>
            <div className="flex flex-col items-start gap-5 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center  bg-primary text-primary-foreground shadow-card">
                <Icon className="h-7 w-7" />
              </div>
              <div className="max-w-2xl">
                <h1 className="mb-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {role.name}
                </h1>
                <p className="mb-3 text-lg text-muted-foreground">{role.tagline}</p>
                <p className="mb-4 text-muted-foreground">{role.description}</p>
                <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-card px-3 py-1 text-sm font-medium text-foreground">
                  {roleWorkflows.length}{" "}
                  {roleWorkflows.length === 1 ? "workflow" : "workflows"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <div className="mb-8 space-y-4">
            <FilterRow
              label="Task type"
              options={[
                { value: "all", label: "All tasks" },
                ...availableTaskTypes.map((t) => ({ value: t.id, label: t.name })),
              ]}
              active={taskFilter}
              onSelect={(v) => setTaskFilter(v as TaskTypeId | "all")}
            />
            <FilterRow
              label="Format"
              options={[
                { value: "all", label: "All formats" },
                ...availableFormats.map((f) => ({ value: f.id, label: f.label })),
              ]}
              active={formatFilter}
              onSelect={(v) => setFormatFilter(v as WorkflowFormatId | "all")}
            />
          </div>

          <p className="mb-5 text-sm text-muted-foreground">
            Showing {filtered.length} of {roleWorkflows.length} workflows
          </p>

          {filtered.length === 0 ? (
            <div className="border border-rule bg-card p-10 text-center text-muted-foreground">
              No workflow matches this combination yet. Reset a filter to see more.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          )}
        </section>

        <section className="container mx-auto px-6 pb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="border border-rule bg-card p-8 shadow-card">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Related roles</h2>
              <ul className="space-y-3">
                {relatedRoles.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/role/${r.id}`}
                      className="group flex items-center justify-between gap-4 text-sm"
                    >
                      <span>
                        <span className="font-medium text-foreground">{r.name}</span>
                        <span className="block text-muted-foreground">{r.tagline}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-rule bg-card p-8 shadow-card">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Related workflows from other roles
              </h2>
              <ul className="space-y-3">
                {relatedWorkflows.map((w) => (
                  <li key={w.id}>
                    <Link
                      to={`/workflow/${w.id}`}
                      className="group flex items-center justify-between gap-4 text-sm"
                    >
                      <span>
                        <span className="font-medium text-foreground">{w.title}</span>
                        <span className="block text-muted-foreground">{w.description}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              : "rounded-full border border-rule bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default RolePage;
