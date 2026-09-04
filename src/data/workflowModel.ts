import { Workflow, ExecutionEnvironmentId } from "@/data/workflows";
import { getTaskType, isMicrosoft365Workflow, TaskTypeId } from "@/data/taskTypes";
import { getFormat, WorkflowFormat } from "@/data/formats";

/**
 * Recommended execution environments.
 * Copilot is deliberately described differently from the other tools:
 * it can use authorized Microsoft 365 context, the others cannot.
 */
export type { ExecutionEnvironmentId };

export interface ExecutionEnvironment {
  id: ExecutionEnvironmentId;
  name: string;
  /** How this environment gets the context the workflow needs */
  contextBehaviour: string;
  /** Governance / privacy characteristics — never claim equivalence between tools */
  governanceNote: string;
}

export const executionEnvironments: Record<ExecutionEnvironmentId, ExecutionEnvironment> = {
  "any-approved": {
    id: "any-approved",
    name: "Any approved AI assistant",
    contextBehaviour:
      "Works with any assistant your organisation has approved. You provide the inputs listed below.",
    governanceNote:
      "Check what your organisation allows you to paste into the assistant before you start.",
  },
  copilot: {
    id: "copilot",
    name: "Microsoft Copilot",
    contextBehaviour:
      "Can use Microsoft 365 content you are already authorized to access — mail, calendar, Teams, files — without pasting it.",
    governanceNote:
      "Copilot follows your existing Microsoft 365 permissions. It never expands them, and it can still surface content you were over-permissioned to see.",
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    contextBehaviour:
      "Has no access to your company systems. Paste or attach the inputs the workflow needs.",
    governanceNote:
      "Handled outside your Microsoft 365 tenant. Remove names, figures and client details you are not allowed to share externally.",
  },
  claude: {
    id: "claude",
    name: "Claude",
    contextBehaviour:
      "Has no access to your company systems. Paste or attach the inputs the workflow needs.",
    governanceNote:
      "Handled outside your Microsoft 365 tenant. Remove names, figures and client details you are not allowed to share externally.",
  },
  internal: {
    id: "internal",
    name: "Internal AI tool",
    contextBehaviour:
      "Depends on the connections your organisation has configured. Provide anything it is not connected to.",
    governanceNote:
      "Governance depends on how your organisation deployed the tool. Follow its published usage rules.",
  },
};

const ALL_ENVIRONMENTS: ExecutionEnvironmentId[] = [
  "any-approved",
  "copilot",
  "chatgpt",
  "claude",
  "internal",
];

/** Microsoft 365-specific mechanics can only run in Copilot. */
const COPILOT_ONLY: ExecutionEnvironmentId[] = ["copilot"];

const EXPECTED_OUTPUT_BY_TASK: Record<TaskTypeId, string> = {
  meetings:
    "A structured brief or set of notes: purpose, key points, decisions, agreed actions with owners, and open questions.",
  communication:
    "A ready-to-review draft in a professional tone, with a clear subject or opening line, the key message up front, and a specific next step.",
  knowledge:
    "A concise answer with the relevant points summarised, the documents or sources it relied on, and anything it could not confirm.",
  planning:
    "A prioritised plan: what matters most, why, sequencing or dependencies, and the risks or trade-offs to watch.",
  reporting:
    "A management-ready summary: headline position, the main figures or status, drivers behind the change, and recommended next steps.",
  automation:
    "A repeatable result produced on the schedule or trigger you configured, in the same structure every time it runs.",
};

const REVIEW_CHECKLIST_BY_TASK: Record<TaskTypeId, string[]> = {
  meetings: [
    "Every decision and action has a named owner and a date.",
    "Nothing is listed as agreed that was not actually agreed.",
    "Attendee names, titles and meeting details are correct.",
    "Sensitive discussion points are removed before you share it.",
  ],
  communication: [
    "The tone matches how you normally write to this audience.",
    "Facts, figures, names and dates are correct.",
    "The ask or next step is unambiguous.",
    "Nothing confidential is included for the recipients on the message.",
  ],
  knowledge: [
    "Each key claim is traceable to a document or source you can open.",
    "The version of the policy or document used is the current one.",
    "Gaps and uncertainties are stated, not glossed over.",
    "The answer is not treated as legal, tax or compliance advice.",
  ],
  planning: [
    "Priorities reflect what your stakeholders actually care about.",
    "Dependencies and capacity constraints are realistic.",
    "Risks include mitigations, not just descriptions.",
    "Dates and milestones match the source systems.",
  ],
  reporting: [
    "All figures are checked against the source data.",
    "Variances and trends are explained, not just stated.",
    "The summary matches the numbers underneath it.",
    "Commentary is neutral and free of unsupported conclusions.",
  ],
  automation: [
    "The first few runs are checked manually before you rely on the output.",
    "The trigger fires on the intended items only.",
    "The output goes to the right place and the right people.",
    "Nothing is sent or actioned automatically without a human review step.",
  ],
};

const DEFAULT_PRIVACY_NOTE =
  "Keep the inputs to what you are authorized to use, and review the output before you share it. Copilot works inside your existing Microsoft 365 permissions; ChatGPT, Claude and internal tools do not — with those, remove personal data, client names and confidential figures first.";

const DEFAULT_LAST_REVIEWED = "2026-09-01";

export interface ResolvedWorkflow {
  workflow: Workflow;
  taskTypeName: string;
  format: WorkflowFormat;
  environments: ExecutionEnvironment[];
  copilotOnly: boolean;
  expectedOutput: string;
  reviewChecklist: string[];
  privacyNote: string;
  followUpPrompts: string[];
  typicalEffort: string;
  manualEffortAvoided?: string;
  lastReviewed: string;
}

const FALLBACK_FOLLOW_UPS = [
  "Make it shorter and keep only what I need to act on.",
  "Rewrite this in my usual tone for this audience.",
  "List anything you were unsure about or could not verify.",
];

export function resolveWorkflow(workflow: Workflow): ResolvedWorkflow {
  const taskType = getTaskType(workflow.id);
  const taskId: TaskTypeId = (taskType?.id as TaskTypeId) ?? "planning";
  const copilotOnly = isMicrosoft365Workflow(workflow);
  const envIds = workflow.environments ?? (copilotOnly ? COPILOT_ONLY : ALL_ENVIRONMENTS);

  const followUps = [...workflow.improvementPrompts];
  for (const fallback of FALLBACK_FOLLOW_UPS) {
    if (followUps.length >= 3) break;
    if (!followUps.includes(fallback)) followUps.push(fallback);
  }

  return {
    workflow,
    taskTypeName: taskType?.name ?? "General",
    format: getFormat(workflow.level),
    environments: envIds.map((id) => executionEnvironments[id]),
    copilotOnly,
    expectedOutput: workflow.expectedOutput ?? EXPECTED_OUTPUT_BY_TASK[taskId],
    reviewChecklist: workflow.reviewChecklist ?? REVIEW_CHECKLIST_BY_TASK[taskId],
    privacyNote: workflow.privacyNote ?? DEFAULT_PRIVACY_NOTE,
    followUpPrompts: followUps.slice(0, 5),
    typicalEffort: workflow.timeRange,
    manualEffortAvoided: workflow.timeSaved,
    lastReviewed: workflow.lastReviewed ?? DEFAULT_LAST_REVIEWED,
  };
}

export const formatReviewDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};
