import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getTaskTypeMeta } from "@/data/taskTypes";
import { ResolvedChain } from "@/data/chains";
import { cn } from "@/lib/utils";

interface WorkflowChainProps {
  chain: ResolvedChain;
}

export function WorkflowChain({ chain }: WorkflowChainProps) {
  return (
    <div>
      <p className="max-w-measure text-sm leading-relaxed text-muted-foreground">
        {chain.chain.description}
      </p>
      <ol className="mt-5 flex flex-col gap-px bg-rule sm:flex-row">
        {chain.steps.map((step, idx) => {
          const taskName = getTaskTypeMeta(step.taskTypeId)?.name ?? "Step";
          const content = (
            <>
              <span className="label-marker">
                {String(idx + 1).padStart(2, "0")} · {taskName}
              </span>
              <span className="mt-1 block font-display text-base leading-tight">
                {step.item.title}
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">
                {step.isCurrent ? "You are here" : step.item.effort ?? "5–10 minutes"}
              </span>
            </>
          );
          return (
            <li key={step.item.key} className="flex flex-1 items-stretch bg-card">
              {step.isCurrent ? (
                <span
                  aria-current="step"
                  className={cn("block w-full border-l-2 border-primary bg-primary-soft/50 p-4 text-foreground")}
                >
                  {content}
                </span>
              ) : (
                <Link
                  to={step.item.href}
                  className="group block w-full p-4 text-foreground transition-colors hover:bg-primary-soft/40"
                >
                  {content}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
