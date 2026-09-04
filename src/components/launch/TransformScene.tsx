import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { launchInputs } from "@/data/launch";
import { usePrefersReducedMotion, useScrollProgress } from "@/hooks/use-scroll-stage";

const STAGE_COPY = [
  {
    eyebrow: "Scene 02 — The raw material",
    headline: "Your work already contains the raw material.",
  },
  {
    eyebrow: "Scene 03 — The instruction",
    headline: "The difference is knowing what to ask.",
  },
  {
    eyebrow: "Scene 04 — The result",
    headline: "From context to work you can use.",
  },
] as const;

/** Scenes 2–4, pinned: scattered inputs → one instruction → a usable result. */
export function TransformScene() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const [selectedId, setSelectedId] = useState(launchInputs[0].id);
  const isNarrow = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  const selected = useMemo(
    () => launchInputs.find((i) => i.id === selectedId) ?? launchInputs[0],
    [selectedId],
  );

  const scrollStage = progress < 0.34 ? 0 : progress < 0.66 ? 1 : 2;
  const stage = reduced ? 2 : scrollStage;
  const copy = STAGE_COPY[stage];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="scene-transformation"
      className="scene-ink relative"
      style={{ minHeight: reduced ? undefined : "300vh" }}
    >
      <div className={reduced ? "py-16" : "sticky top-0 flex min-h-screen flex-col justify-center py-16"}>
        <div className="container mx-auto px-6">
          <div className="mb-8 max-w-3xl">
            <p className="label-eyebrow ink-muted mb-4">{reduced ? "Scenes 02–04" : copy.eyebrow}</p>
            <h2 id="scene-transformation" className="headline-lg">
              {reduced ? "Raw material, one instruction, work you can use." : copy.headline}
            </h2>
          </div>

          {/* Input selection — always available, keyboard operable */}
          <div className="mb-8 border-y py-4 ink-rule">
            <p className="label-eyebrow ink-muted mb-3">Choose an input</p>
            <div className="flex flex-wrap gap-2">
              {launchInputs.map((input) => {
                const active = input.id === selected.id;
                return (
                  <button
                    key={input.id}
                    type="button"
                    onClick={() => setSelectedId(input.id)}
                    aria-pressed={active}
                    className={[
                      "rounded-sm border px-3.5 py-2 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary/15 text-foreground"
                        : "ink-rule ink-muted hover:border-primary/60",
                    ].join(" ")}
                    style={active ? { color: "hsl(var(--ink-fg))" } : undefined}
                  >
                    {input.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            {/* Left: scatter → alignment */}
            <div className="relative h-[22rem] sm:h-[26rem]">
              {launchInputs.map((input, idx) => {
                const isSelected = input.id === selected.id;
                const scattered = stage === 0 && !reduced && !isNarrow;
                const style = scattered
                  ? {
                      left: `${input.scatter.x}%`,
                      top: `${input.scatter.y}%`,
                      transform: `rotate(${input.scatter.rotate}deg)`,
                      opacity: 1,
                    }
                  : {
                      left: "2%",
                      top: `${idx * 19}%`,
                      transform: "rotate(0deg)",
                      opacity: isSelected ? 1 : 0.4,
                    };
                return (
                  <article
                    key={input.id}
                    className="stage-layer absolute w-[46%] min-w-0 border p-3.5"
                    style={{
                      ...style,
                      borderColor: isSelected && !scattered ? "hsl(var(--primary))" : "hsl(var(--ink-rule))",
                      background: "hsl(222 26% 11% / 0.9)",
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold" style={{ color: "hsl(var(--ink-fg))" }}>
                        {input.label}
                      </h3>
                      <span className="font-mono-prompt text-[0.6875rem] text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="ink-muted mt-1 text-xs">{input.hint}</p>
                  </article>
                );
              })}
              <span className="numeral-xl pointer-events-none absolute bottom-0 right-2" aria-hidden="true">
                {String(stage + 2).padStart(2, "0")}
              </span>
            </div>

            {/* Right: instruction → result */}
            <div className="space-y-6">
              <div
                className="stage-layer border p-6"
                style={{
                  borderColor: stage === 1 ? "hsl(var(--primary))" : "hsl(var(--ink-rule))",
                  background: "hsl(222 26% 11% / 0.9)",
                  opacity: stage === 0 && !reduced ? 0.35 : 1,
                }}
              >
                <p className="label-eyebrow ink-muted mb-3">The instruction</p>
                <p className="font-mono-prompt text-sm leading-relaxed" style={{ color: "hsl(var(--ink-fg))" }}>
                  “{selected.instruction}”
                </p>
              </div>

              <div
                className="stage-layer border p-6"
                style={{
                  borderColor: stage === 2 ? "hsl(var(--accent))" : "hsl(var(--ink-rule))",
                  background: "hsl(222 26% 11% / 0.9)",
                  opacity: stage === 2 ? 1 : 0.25,
                  transform: stage === 2 ? "none" : "translateY(14px)",
                }}
              >
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b pb-3 ink-rule">
                  <div>
                    <p className="label-eyebrow ink-muted">{selected.output.kind}</p>
                    <h3 className="font-display text-xl" style={{ color: "hsl(var(--ink-fg))" }}>
                      {selected.output.title}
                    </h3>
                  </div>
                </div>
                <dl className="space-y-3">
                  {selected.output.lines.map((line) => (
                    <div key={line.label} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                      <dt className="label-eyebrow ink-muted">{line.label}</dt>
                      <dd className="text-sm leading-relaxed" style={{ color: "hsl(var(--ink-fg))" }}>
                        {line.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to={`/workflow/${selected.output.workflowId}`}
                  className="mt-5 inline-flex items-center gap-2 border-t pt-4 text-sm font-medium text-primary ink-rule"
                >
                  Open “{selected.output.workflowTitle}”
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
