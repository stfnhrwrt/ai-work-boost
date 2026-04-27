import { Bot, CheckCircle2, MinusCircle, Settings2, Sparkles, XCircle, Zap } from "lucide-react";
import {
  AUTOMATION_LAYER_META,
  AutomationLayer,
  SHARED_MAILBOX_META,
  SharedMailboxSupport,
} from "@/data/workflows";
import { cn } from "@/lib/utils";

interface AutomationIndicatorsProps {
  layers?: AutomationLayer[];
  sharedMailbox?: SharedMailboxSupport;
  requiresPermissions?: string;
}

const layerIcon: Record<AutomationLayer, React.ComponentType<{ className?: string }>> = {
  "outlook-rule": Settings2,
  copilot: Sparkles,
  "power-automate": Bot,
};

const sharedMailboxIcon: Record<SharedMailboxSupport, React.ComponentType<{ className?: string }>> = {
  yes: CheckCircle2,
  limited: MinusCircle,
  no: XCircle,
};

const sharedMailboxTone: Record<SharedMailboxSupport, string> = {
  yes: "border-primary/30 bg-primary-soft text-foreground",
  limited: "border-accent/40 bg-accent-soft text-accent-foreground",
  no: "border-border bg-secondary text-muted-foreground",
};

export function AutomationIndicators({
  layers,
  sharedMailbox,
  requiresPermissions,
}: AutomationIndicatorsProps) {
  if (!layers && !sharedMailbox && !requiresPermissions) return null;

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Zap className="h-3.5 w-3.5 text-primary" />
        Automation profile
      </div>

      {layers && layers.length > 0 && (
        <div className="mb-3">
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">Layers used</div>
          <div className="flex flex-wrap gap-2">
            {layers.map((l) => {
              const meta = AUTOMATION_LAYER_META[l];
              const Icon = layerIcon[l];
              return (
                <span
                  key={l}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {meta.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {sharedMailbox && (
        <div className="mb-3">
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">Shared mailbox</div>
          {(() => {
            const meta = SHARED_MAILBOX_META[sharedMailbox];
            const Icon = sharedMailboxIcon[sharedMailbox];
            return (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  sharedMailboxTone[sharedMailbox],
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </span>
            );
          })()}
        </div>
      )}

      {requiresPermissions && (
        <div>
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">Permissions</div>
          <p className="text-sm leading-relaxed text-foreground">{requiresPermissions}</p>
        </div>
      )}
    </div>
  );
}
