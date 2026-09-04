import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FinderSelection,
  finderRoles,
  finderTools,
  outputTypes,
  recommendWorkflows,
  situations,
  timeBudgets,
} from "@/data/situations";

const DEFAULTS: Omit<FinderSelection, "situation"> = {
  role: "any",
  tool: "any",
  time: "any",
  output: "any",
};

interface SituationFinderProps {
  /** Eyebrow label above the heading, keeps the editorial section numbering consistent. */
  eyebrow?: string;
  className?: string;
}

export function SituationFinder({ eyebrow = "Start here", className }: SituationFinderProps) {
  const [situation, setSituation] = useState<FinderSelection["situation"] | null>(null);
  const [refine, setRefine] = useState(DEFAULTS);

  const recommendations = useMemo(
    () => (situation ? recommendWorkflows({ situation, ...refine }) : []),
    [situation, refine],
  );

  const reset = () => {
    setSituation(null);
    setRefine(DEFAULTS);
  };

  return (
    <section
      id="situation-finder"
      className={cn("scroll-mt-20 border border-rule bg-card", className)}
      aria-labelledby="situation-finder-heading"
    >
      <div className="border-b border-rule p-6 sm:p-8">
        <p className="label-eyebrow mb-2">{eyebrow}</p>
        <h2
          id="situation-finder-heading"
          className="font-display text-2xl text-foreground sm:text-3xl"
        >
          Start with a situation
        </h2>
        <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted-foreground">
          Know the problem but not the workflow? Pick what is in front of you right now. Everything
          runs in your browser — no login, no account, nothing saved.
        </p>

        <fieldset className="mt-6">
          <legend className="label-eyebrow mb-3">What do you need help with?</legend>
          <div className="flex flex-wrap gap-2">
            {situations.map((entry) => {
              const isActive = situation === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSituation(isActive ? null : entry.id)}
                  className={cn(
                    "border px-3 py-2 text-left text-sm transition-colors",
                    isActive
                      ? "border-primary bg-primary font-semibold text-primary-foreground"
                      : "border-rule bg-background text-foreground hover:border-primary/50 hover:bg-primary-soft/50",
                  )}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {situation && (
        <>
          <div className="border-b border-rule p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <p className="label-eyebrow">Narrow it down (optional)</p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary underline-grow"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Start over
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <RefineRow
                label="Role"
                options={finderRoles}
                value={refine.role}
                onChange={(value) =>
                  setRefine((prev) => ({ ...prev, role: value as typeof prev.role }))
                }
              />
              <RefineRow
                label="Available AI tool"
                options={finderTools}
                value={refine.tool}
                onChange={(value) =>
                  setRefine((prev) => ({ ...prev, tool: value as typeof prev.tool }))
                }
              />
              <RefineRow
                label="Time available"
                options={timeBudgets}
                value={refine.time}
                onChange={(value) =>
                  setRefine((prev) => ({ ...prev, time: value as typeof prev.time }))
                }
              />
              <RefineRow
                label="Desired output"
                options={outputTypes}
                value={refine.output}
                onChange={(value) =>
                  setRefine((prev) => ({ ...prev, output: value as typeof prev.output }))
                }
              />
            </div>
          </div>

          <div className="p-6 sm:p-8" aria-live="polite">
            {recommendations.length === 0 ? (
              <div className="border border-rule bg-background p-6 text-center">
                <p className="font-display text-lg text-foreground">
                  Nothing matches that combination
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Widen the time available or set the AI tool back to any approved tool.
                </p>
                <Button variant="outline" className="mt-4 rounded-sm" onClick={() => setRefine(DEFAULTS)}>
                  Reset the optional filters
                </Button>
              </div>
            ) : (
              <>
                <p className="label-eyebrow mb-4 border-b border-rule pb-3">
                  {recommendations.length === 1
                    ? "1 recommended workflow"
                    : `${recommendations.length} recommended workflows`}
                </p>
                <ol className="grid gap-px bg-rule md:grid-cols-3">
                  {recommendations.map((rec, idx) => (
                    <li key={rec.item.key} className="flex flex-col bg-card p-5">
                      <span className="font-mono-prompt text-xs text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-display text-lg leading-tight text-foreground">
                        {rec.item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {rec.reason}
                      </p>
                      <dl className="mt-4 space-y-1.5 border-t border-rule pt-3 text-xs">
                        <div className="flex gap-2">
                          <dt className="w-28 shrink-0 text-muted-foreground">Typical effort</dt>
                          <dd className="text-foreground">{rec.effort}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-28 shrink-0 text-muted-foreground">Recommended tool</dt>
                          <dd className="text-foreground">{rec.tool}</dd>
                        </div>
                      </dl>
                      <Button asChild className="mt-4 w-full rounded-sm">
                        <Link to={rec.item.href}>
                          Open workflow
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

interface RefineRowProps {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function RefineRow({ label, options, value, onChange }: RefineRowProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="label-eyebrow mb-2">{label}</legend>
      <div className="flex w-full min-w-0 flex-wrap gap-1.5">
        {options.map((option) => {
          const isActive = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
              className={cn(
                "border px-2.5 py-1 text-xs transition-colors",
                isActive
                  ? "border-primary bg-primary font-semibold text-primary-foreground"
                  : "border-rule bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
