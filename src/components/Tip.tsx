import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface TipProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle micro-tip — feels like inline help, not content.
 * Use sparingly: max 1–2 per section, keep under 2 lines.
 */
export function Tip({ children, className }: TipProps) {
  return (
    <aside
      className={cn(
        "flex items-start gap-2.5 rounded-md border border-accent/30 bg-accent-soft/60 px-3.5 py-2.5",
        className,
      )}
    >
      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-foreground" />
      <div className="text-xs leading-relaxed text-foreground/85">
        <span className="font-semibold text-accent-foreground">Tip · </span>
        {children}
      </div>
    </aside>
  );
}
