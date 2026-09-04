import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { DiscoveryItem, environmentName } from "@/data/discovery";
import { getTaskTypeMeta } from "@/data/taskTypes";
import { getRole } from "@/data/workflows";
import { workflowFormats } from "@/data/formats";

interface DiscoveryCardProps {
  item: DiscoveryItem;
  variant?: "card" | "row";
}

const metaFor = (item: DiscoveryItem) => {
  const role = item.roleId ? getRole(item.roleId)?.shortName : item.sourceLabel;
  const task = getTaskTypeMeta(item.taskTypeId)?.name;
  const format = workflowFormats.find((f) => f.id === item.formatId)?.shortLabel;
  const tools = item.environments.slice(0, 3).map(environmentName).join(", ");
  return { role, task, format, tools };
};

export function DiscoveryCard({ item, variant = "card" }: DiscoveryCardProps) {
  const { role, task, format, tools } = metaFor(item);
  const isCopilotSpecific = !item.roleId;
  const toolLabel = isCopilotSpecific ? `Microsoft Copilot in ${item.sourceLabel.replace(/^Copilot in /, "")}` : tools;

  if (variant === "row") {
    return (
      <Link
        to={item.href}
        className="hover-lift group grid min-w-0 gap-3 border-b border-rule bg-transparent px-1 py-5 sm:grid-cols-[minmax(0,1fr)_14rem] sm:gap-8"
      >
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="label-marker">{task}</span>
            {role && <span className="text-[0.7rem] text-muted-foreground">/ {role}</span>}
            {format && <span className="text-[0.7rem] text-muted-foreground">/ {format}</span>}
            {isCopilotSpecific && (
              <span className="border border-primary/40 bg-primary-soft px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary">
                Copilot-specific
              </span>
            )}
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-1 max-w-measure text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:items-end sm:text-right">
          {toolLabel && <span className="truncate">{toolLabel}</span>}
          {item.effort && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {item.effort}
            </span>
          )}
          {item.effortAvoided && (
            <span className="text-accent">Effort avoided: {item.effortAvoided}</span>
          )}
          <span className="mt-1 inline-flex items-center gap-1 font-medium text-primary sm:justify-end">
            Open
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={item.href}
      className="hover-lift group flex h-full min-w-0 flex-col break-words border border-rule bg-card p-5"
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="label-marker">{task}</span>
        {role && <span className="text-[0.7rem] text-muted-foreground">/ {role}</span>}
        {isCopilotSpecific && (
          <span className="border border-primary/40 bg-primary-soft px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Copilot-specific
          </span>
        )}
      </div>
      <h3 className="font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary sm:text-lg">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <p className="mt-3 truncate text-xs text-muted-foreground">{toolLabel}</p>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-rule pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 truncate">
          {item.effort ? (
            <>
              <Clock className="h-3 w-3 shrink-0" />
              {item.effort}
            </>
          ) : (
            <span className="truncate">{item.sourceLabel}</span>
          )}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary">
          Open
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
