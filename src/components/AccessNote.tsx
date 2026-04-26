import { ShieldAlert } from "lucide-react";

interface AccessNoteProps {
  note: string;
}

export function AccessNote({ note }: AccessNoteProps) {
  return (
    <aside className="my-8 flex gap-4 rounded-xl border border-accent/40 bg-accent-soft p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <ShieldAlert className="h-5 w-5" />
      </div>
      <div>
        <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground">
          ⚠️ Access Matters
        </h3>
        <p className="text-sm leading-relaxed text-foreground">{note}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/80">
          <li>Copilot only uses data you can access.</li>
          <li>Delegate permissions are critical.</li>
          <li>Always verify before sending outputs.</li>
        </ul>
      </div>
    </aside>
  );
}
