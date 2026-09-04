import { WorkflowLevel, Workflow } from "@/data/workflows";

export type WorkflowFormatId = "core" | "advanced" | "repeatable" | "multi-step";

export interface WorkflowFormat {
  id: WorkflowFormatId;
  label: string;
  shortLabel: string;
  description: string;
}

export const workflowFormats: WorkflowFormat[] = [
  {
    id: "core",
    label: "Core workflows",
    shortLabel: "Core",
    description: "Ready-to-run prompts you can copy and use today, with no setup.",
  },
  {
    id: "advanced",
    label: "Advanced workflows",
    shortLabel: "Advanced",
    description:
      "Multi-source prompts that pull several inputs together and depend on the access you already have.",
  },
  {
    id: "repeatable",
    label: "Repeatable workflows",
    shortLabel: "Repeatable",
    description:
      "Recurring routines you set up once — scheduled prompts and standing briefings that run on their own.",
  },
  {
    id: "multi-step",
    label: "Multi-step workflows",
    shortLabel: "Multi-step",
    description:
      "Chained workflows that combine several steps or tools, such as reusable agents and rule-based automation.",
  },
];

const LEVEL_TO_FORMAT: Record<WorkflowLevel, WorkflowFormatId> = {
  essential: "core",
  advanced: "advanced",
  scheduled: "repeatable",
  agent: "multi-step",
  automation: "multi-step",
};

export const getFormatId = (level: WorkflowLevel): WorkflowFormatId => LEVEL_TO_FORMAT[level];

export const getFormat = (level: WorkflowLevel): WorkflowFormat =>
  workflowFormats.find((f) => f.id === LEVEL_TO_FORMAT[level]) as WorkflowFormat;

export const getFormatsForWorkflows = (items: Workflow[]): WorkflowFormat[] => {
  const present = new Set(items.map((w) => LEVEL_TO_FORMAT[w.level]));
  return workflowFormats.filter((f) => present.has(f.id));
};
