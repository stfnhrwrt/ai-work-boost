import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { roles, getWorkflowsByRole } from "@/data/workflows";
import { taskTypes } from "@/data/taskTypes";
import { workflowFormats } from "@/data/formats";
import { copilotApps } from "@/data/copilotApps";
import { getTaskTypeCounts, libraryCounts, taskTypeCountLabel } from "@/data/discovery";
import { useInView } from "@/hooks/use-scroll-stage";

/** Scene 5 — the library organizes itself by role, task, app and format. */
export function LibraryScene() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <section ref={ref} id="library" className="container mx-auto scroll-mt-20 px-6 py-24" aria-labelledby="scene-library">
      <div className="reveal max-w-3xl" data-visible={visible}>
        <p className="label-eyebrow mb-4">Scene 05 — The library</p>
        <h2 id="scene-library" className="headline-lg">
          Start with the work. Choose the tool later.
        </h2>
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted-foreground">
          Most workflows run with Copilot, ChatGPT, Claude, Gemini, or an approved internal AI tool.
          Microsoft 365 app workflows are Copilot-specific.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {libraryCounts.general} general workflows · {libraryCounts.microsoft365} Microsoft 365
          specialist workflows · {libraryCounts.shared} appear in both collections.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        <Axis
          index="01"
          title="By task"
          visible={visible}
          action={{ to: "/task-types", label: "All task types" }}
        >
          {taskTypes.map((task) => (
            <Chip key={task.id} to={`/workflows?task=${task.id}`} label={task.name}>
              {taskTypeCountLabel(getTaskTypeCounts(task.id))}
            </Chip>
          ))}
        </Axis>

        <Axis index="02" title="By role" visible={visible} action={{ to: "/roles", label: "All roles" }}>
          {roles.map((role) => (
            <Chip key={role.id} to={`/role/${role.id}`} label={role.name}>
              {getWorkflowsByRole(role.id).length} workflows
            </Chip>
          ))}
        </Axis>

        <Axis
          index="03"
          title="By app"
          visible={visible}
          action={{ to: "/copilot-microsoft-365", label: "Copilot collection" }}
        >
          {copilotApps.map((app) => (
            <Chip key={app.id} to={`/copilot-microsoft-365/${app.id}`} label={app.name}>
              {app.workflows.length} workflows
            </Chip>
          ))}
        </Axis>

        <Axis
          index="04"
          title="By workflow format"
          visible={visible}
          action={{ to: "/workflows", label: "Browse everything" }}
        >
          {workflowFormats.map((format) => (
            <Chip key={format.id} to={`/workflows?format=${format.id}`} label={format.label}>
              {format.shortLabel}
            </Chip>
          ))}
        </Axis>
      </div>
    </section>
  );
}

function Axis({
  index,
  title,
  visible,
  action,
  children,
}: {
  index: string;
  title: string;
  visible: boolean;
  action: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="reveal" data-visible={visible} style={{ ["--i" as string]: Number(index) }}>
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono-prompt text-xs text-primary">{index}</span>
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
        </div>
        <Link to={action.to} className="text-sm font-medium text-primary underline-grow">
          {action.label}
        </Link>
      </div>
      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}

function Chip({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex items-baseline justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-primary-soft/50"
    >
      <span className="font-medium text-foreground group-hover:text-primary">{label}</span>
      <span className="shrink-0 text-xs text-muted-foreground">{children}</span>
    </Link>
  );
}

export function InviteScene() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <section ref={ref} className="border-t border-rule" aria-labelledby="scene-invitation">
      <div className="container mx-auto px-6 py-28 text-center">
        <div className="reveal mx-auto max-w-3xl" data-visible={visible}>
          <p className="label-eyebrow mb-5">Scene 06 — The invitation</p>
          <h2 id="scene-invitation" className="headline-lg">
            Find your next useful workflow.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/workflows"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-7 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse workflows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/basics" className="text-sm font-medium text-foreground underline-grow">
              Start with the AI basics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
