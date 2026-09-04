import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

/**
 * The AI Workbench — an animated editorial composition that demonstrates
 * the site's core promise: scattered inputs → clear instructions → usable output.
 * Purely presentational; no data leaves the browser.
 */

const INPUTS = [
  { label: "Meeting notes", hint: "Decisions, open questions" },
  { label: "Inbox", hint: "Threads needing replies" },
  { label: "Spreadsheet", hint: "Numbers, trends, gaps" },
  { label: "Project plan", hint: "Milestones, owners, dates" },
] as const;

const INSTRUCTION =
  "Use the context below to create a concise, decision-ready update. Separate facts, assumptions, risks, and next steps.";

const OUTPUTS = [
  { label: "Executive briefing", hint: "One page, decision-first" },
  { label: "Project update", hint: "Status, risks, next steps" },
  { label: "KPI summary", hint: "What changed and why" },
  { label: "Presentation outline", hint: "Slides, structured" },
] as const;

type Phase = "enter" | "instruct" | "output" | "pause";

const PHASE_MS: Record<Phase, number> = {
  enter: 1100,
  instruct: 1400,
  output: 2200,
  pause: 1400,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  enter: "instruct",
  instruct: "output",
  output: "pause",
  pause: "instruct",
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function Workbench() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(reducedMotion ? "output" : "enter");
  const [activeInput, setActiveInput] = useState(0);
  const [activeOutput, setActiveOutput] = useState(0);
  const lastInteraction = useRef(0);

  // Slow self-running sequence; pauses after user interaction.
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      const recentlyTouched = Date.now() - lastInteraction.current < 6000;
      if (recentlyTouched) {
        setPhase("output");
        return;
      }
      setPhase((current) => {
        const next = NEXT_PHASE[current];
        if (current === "pause") {
          setActiveInput((i) => (i + 1) % INPUTS.length);
          setActiveOutput((o) => (o + 1) % OUTPUTS.length);
        }
        return next;
      });
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  const pickInput = useCallback((idx: number) => {
    lastInteraction.current = Date.now();
    setActiveInput(idx);
    setPhase("output");
  }, []);

  const pickOutput = useCallback((idx: number) => {
    lastInteraction.current = Date.now();
    setActiveOutput(idx);
    setPhase("output");
  }, []);

  const entered = phase !== "enter" || reducedMotion;
  const instructing = phase === "instruct" && !reducedMotion;
  const showingOutput = phase === "output" || phase === "pause" || reducedMotion;

  return (
    <section
      aria-label="The AI Workbench — how a workflow turns inputs into outputs"
      className="border-b border-rule bg-card/50"
    >
      <div className="container mx-auto px-6 py-14 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
          <div>
            <p className="label-eyebrow mb-2">The AI Workbench</p>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Turn scattered inputs into work you can use
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            One clear instruction, your own context, and an approved AI assistant. That is every
            workflow in this library.
          </p>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr] lg:gap-6">
          {/* Stage 1 — Inputs */}
          <div>
            <StageHeader number="1" title="Inputs" />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {INPUTS.map((input, idx) => {
                const isActive = idx === activeInput;
                return (
                  <li key={input.label}>
                    <button
                      type="button"
                      onClick={() => pickInput(idx)}
                      onMouseEnter={() => pickInput(idx)}
                      onFocus={() => pickInput(idx)}
                      aria-pressed={isActive}
                      className={[
                        "workbench-card w-full border bg-card p-3.5 text-left transition-all duration-300",
                        entered ? "translate-x-0 translate-y-0 opacity-100" : "workbench-hidden",
                        isActive
                          ? "border-primary/70 shadow-raised"
                          : "border-rule shadow-card hover:border-primary/40",
                      ].join(" ")}
                      style={{ transitionDelay: entered && !reducedMotion ? undefined : `${idx * 90}ms` }}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-foreground">{input.label}</span>
                        <span className="label-marker">{String(idx + 1).padStart(2, "0")}</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{input.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <StageConnector />

          {/* Stage 2 — Instruction */}
          <div className="lg:max-w-xs">
            <StageHeader number="2" title="Instructions" />
            <div
              className={[
                "mt-4 flex h-[calc(100%-3.25rem)] min-h-44 flex-col justify-between border bg-card p-5 transition-all duration-500",
                instructing
                  ? "border-primary shadow-raised ring-1 ring-primary/40"
                  : "border-rule shadow-card",
                entered ? "scale-100 opacity-100" : "scale-95 opacity-0",
              ].join(" ")}
            >
              <p className="font-mono-prompt text-[0.8125rem] leading-relaxed text-foreground">
                “{INSTRUCTION}”
              </p>
              <p className="mt-4 border-t border-rule pt-3 text-xs text-muted-foreground">
                Copilot, ChatGPT, Claude, Gemini, or your approved internal tool.
              </p>
            </div>
          </div>

          <StageConnector />

          {/* Stage 3 — Outputs */}
          <div>
            <StageHeader number="3" title="Outputs" />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {OUTPUTS.map((output, idx) => {
                const isActive = idx === activeOutput;
                const visible = !isActive || showingOutput;
                return (
                  <li key={output.label}>
                    <button
                      type="button"
                      onClick={() => pickOutput(idx)}
                      onMouseEnter={() => pickOutput(idx)}
                      onFocus={() => pickOutput(idx)}
                      aria-pressed={isActive}
                      className={[
                        "workbench-card w-full border bg-card p-3.5 text-left transition-all duration-300",
                        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                        isActive
                          ? "border-accent/70 shadow-raised"
                          : "border-rule shadow-card hover:border-accent/40",
                      ].join(" ")}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-foreground">{output.label}</span>
                        <span className="label-marker text-accent">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{output.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Turn scattered inputs into work you can use.
        </p>
      </div>
    </section>
  );
}

function StageHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-2 border-b border-rule pb-2">
      <span className="font-mono-prompt text-xs text-primary">{number}</span>
      <h3 className="label-eyebrow">{title}</h3>
    </div>
  );
}

function StageConnector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-muted-foreground/70">
      <ArrowRight className="hidden h-4 w-4 lg:block" />
      <ArrowDown className="h-4 w-4 lg:hidden" />
    </div>
  );
}
