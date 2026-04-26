import { CopyButton } from "./CopyButton";

interface PromptBlockProps {
  prompt: string;
}

export function PromptBlock({ prompt }: PromptBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-code-border bg-code">
      <div className="flex items-center justify-between border-b border-code-border px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Prompt
        </span>
        <CopyButton text={prompt} size="sm" variant="default" />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words px-5 py-4 font-mono-prompt text-sm leading-relaxed text-foreground">
        {prompt}
      </pre>
    </div>
  );
}
