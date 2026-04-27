import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Calendar, Clock, ShieldAlert, Sparkles, Workflow as WorkflowIcon } from "lucide-react";
import { Workflow, LEVEL_META } from "@/data/workflows";

interface WorkflowCardProps {
  workflow: Workflow;
}

const levelIcon = {
  essential: Sparkles,
  advanced: ShieldAlert,
  agent: Bot,
  scheduled: Calendar,
  automation: WorkflowIcon,
} as const;

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const meta = LEVEL_META[workflow.level];
  const LevelIcon = levelIcon[workflow.level];
  const isAdvanced = workflow.level !== "essential";

  return (
    <Link
      to={`/workflow/${workflow.id}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {isAdvanced ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">
            <LevelIcon className="h-3 w-3" />
            {meta.cardBadge}
          </span>
        ) : (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
              Copilot
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              ChatGPT
            </span>
          </>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground">
        {workflow.title}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {workflow.description}
      </p>
      <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {workflow.timeRange}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-0.5">
          Open
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
