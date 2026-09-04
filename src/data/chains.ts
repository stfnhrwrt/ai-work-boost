import { DiscoveryItem, discoveryItems } from "@/data/discovery";
import { TaskTypeId } from "@/data/taskTypes";

export interface WorkflowChain {
  id: string;
  label: string;
  description: string;
  steps: TaskTypeId[];
}

/** Sequences that reflect how the work actually flows from one output into the next. */
export const workflowChains: WorkflowChain[] = [
  {
    id: "meeting-to-tasks",
    label: "From a meeting to tracked work",
    description: "Capture the meeting, report the position, present it, then turn it into tasks.",
    steps: ["meetings", "reporting", "communication", "planning"],
  },
  {
    id: "data-to-decision",
    label: "From data to a decision",
    description: "Read the numbers, write them up, then agree the next steps.",
    steps: ["analysis", "reporting", "writing", "planning"],
  },
  {
    id: "inbox-to-plan",
    label: "From inbox to a plan for the day",
    description: "Clear the inbox, answer what needs answering, then plan around what is left.",
    steps: ["administration", "communication", "planning"],
  },
  {
    id: "research-to-document",
    label: "From research to a shareable document",
    description: "Find the source material, draft it, then communicate the result.",
    steps: ["research", "writing", "communication"],
  },
];

export interface ChainStep {
  taskTypeId: TaskTypeId;
  item: DiscoveryItem;
  isCurrent: boolean;
}

export interface ResolvedChain {
  chain: WorkflowChain;
  steps: ChainStep[];
}

const pickForStep = (
  taskTypeId: TaskTypeId,
  current: DiscoveryItem,
  used: Set<string>,
): DiscoveryItem | undefined => {
  const candidates = discoveryItems
    .filter((item) => item.taskTypeId === taskTypeId && !used.has(item.key))
    .map((item) => {
      let score = 0;
      if (item.roleId && item.roleId === current.roleId) score += 3;
      if (item.formatId === current.formatId) score += 1;
      if (item.apps.some((app) => current.apps.includes(app))) score += 1;
      if (!item.roleId && current.roleId) score -= 1;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
  return candidates[0]?.item;
};

/** The chain that best fits this workflow, with one concrete workflow per step. */
export const getChainForWorkflow = (workflowKey: string): ResolvedChain | undefined => {
  const current = discoveryItems.find((item) => item.key === workflowKey);
  if (!current) return undefined;

  const chain = workflowChains.find((c) => c.steps.includes(current.taskTypeId));
  if (!chain) return undefined;

  const used = new Set<string>([current.key]);
  const steps: ChainStep[] = [];

  for (const taskTypeId of chain.steps) {
    if (taskTypeId === current.taskTypeId) {
      steps.push({ taskTypeId, item: current, isCurrent: true });
      continue;
    }
    const item = pickForStep(taskTypeId, current, used);
    if (!item) continue;
    used.add(item.key);
    steps.push({ taskTypeId, item, isCurrent: false });
  }

  return steps.length >= 3 ? { chain, steps } : undefined;
};
