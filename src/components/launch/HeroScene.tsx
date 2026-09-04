import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-scroll-stage";

const PLATES = [
  { label: "Context", offset: -14 },
  { label: "Instruction", offset: 0 },
  { label: "Result", offset: 14 },
];

/** Scene 1 — the promise. Warm paper, quiet, one central workflow object. */
export function HeroScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-rule bg-hero-gradient" aria-labelledby="scene-promise">
      <div className="container mx-auto grid gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-28 lg:pt-24">
        <div>
          <p className="label-eyebrow mb-6">Scene 01 — The promise</p>
          <h1 id="scene-promise" className="headline-xl max-w-[15ch]">
            Work is messy. Your next step doesn’t have to be.
          </h1>
          <p className="mt-7 max-w-measure text-lg leading-relaxed text-muted-foreground">
            Practical AI workflows for the work you do every day.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/workflows"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-7 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse workflows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/basics" className="text-sm font-medium underline-grow">
              Start with the AI basics
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center sm:h-80">
          {PLATES.map((plate, idx) => (
            <div
              key={plate.label}
              className="absolute left-1/2 w-[78%] -translate-x-1/2 border border-rule bg-card p-5 shadow-card"
              style={{
                transform: `translate(-50%, ${plate.offset * 5.6}px) rotate(${plate.offset * 0.09}deg)`,
                animation: reduced ? undefined : `plate-drift 9s ease-in-out ${idx * 0.9}s infinite`,
              }}
            >
              <div className="flex items-baseline justify-between">
                <span className="label-eyebrow">{plate.label}</span>
                <span className="font-mono-prompt text-[0.6875rem] text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {[100, 78, 56].map((w) => (
                  <div key={w} className="h-px bg-rule" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto flex items-center gap-3 px-6 pb-10">
        <ArrowDown className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="label-eyebrow">Scroll to see one workflow run end to end</span>
      </div>

      <style>{`@keyframes plate-drift { 0%,100% { filter: none } 50% { filter: brightness(0.985) } }`}</style>
    </section>
  );
}
