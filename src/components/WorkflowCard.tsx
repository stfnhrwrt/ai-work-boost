import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { Workflow } from "@/data/workflows";
import { getFormat } from "@/data/formats";
import { getTaskType, isMicrosoft365Workflow } from "@/data/taskTypes";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const format = getFormat(workflow.level);
  const task = getTaskType(workflow.id)?.name;
  const copilotOnly = isMicrosoft365Workflow(workflow);

  return (
    <Link
      to={`/workflow/${workflow.id}`}
      className="hover-lift group flex h-full flex-col border border-rule bg-card p-5"
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="label-marker">{task}</span>
        <span className="text-[0.7rem] text-muted-foreground">/ {format.shortLabel}</span>
        {copilotOnly && (
          <span className="border border-primary/40 bg-primary-soft px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Copilot-specific
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
        {workflow.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {workflow.description}
      </p>
      <p className="mt-3 truncate text-xs text-muted-foreground">
        {copilotOnly ? "Microsoft Copilot" : "Any approved AI assistant"}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-rule pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          {workflow.timeRange}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-primary">
          Open
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
