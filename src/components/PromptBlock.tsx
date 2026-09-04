import { CopyButton } from "./CopyButton";

interface PromptBlockProps {
  prompt: string;
  label?: string;
}

export function PromptBlock({ prompt, label = "Instructions" }: PromptBlockProps) {
  return (
    <div className="overflow-hidden border border-code-border bg-code shadow-raised">
      <div className="flex items-center justify-between gap-3 border-b border-code-border px-4 py-2.5">
        <span className="font-mono-prompt text-[0.7rem] uppercase tracking-[0.12em] text-code-foreground/70">
          {label}
        </span>
        <CopyButton text={prompt} size="sm" variant="default" />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words px-5 py-4 font-mono-prompt text-sm leading-relaxed text-code-foreground">
        {prompt}
      </pre>
    </div>
  );
}
