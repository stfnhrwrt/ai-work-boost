import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  FileSignature,
  ListChecks,
  MessageSquareText,
  PieChart,
  Search,
  Workflow as WorkflowIcon,
  LucideIcon,
} from "lucide-react";
import { workflows, Workflow } from "@/data/workflows";

export type TaskTypeId =
  | "meetings"
  | "writing"
  | "communication"
  | "planning"
  | "analysis"
  | "reporting"
  | "research"
  | "administration"
  | "automation";

export interface TaskType {
  id: TaskTypeId;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
}

export const taskTypes: TaskType[] = [
  {
    id: "meetings",
    name: "Meetings",
    tagline: "Prepare, capture and close the loop.",
    description:
      "Turn agendas, transcripts and notes into decisions, actions and follow-ups people actually act on.",
    icon: CalendarCheck,
  },
  {
    id: "writing",
    name: "Writing",
    tagline: "Get to a good first draft faster.",
    description:
      "Documents, proposals, summaries and responses drafted from your own notes and source material.",
    icon: FileSignature,
  },
  {
    id: "communication",
    name: "Communication",
    tagline: "Say it clearly, to the right audience.",
    description:
      "Updates, difficult messages and stakeholder communication adapted to who is reading them.",
    icon: MessageSquareText,
  },
  {
    id: "planning",
    name: "Planning",
    tagline: "Decide what happens next, and in what order.",
    description:
      "Priorities, plans, task breakdowns, risks and dependencies made explicit before work starts.",
    icon: ListChecks,
  },
  {
    id: "analysis",
    name: "Analysis",
    tagline: "Understand what the numbers are doing.",
    description:
      "Variances, trends, business cases and data structuring, with a clear line between fact and interpretation.",
    icon: PieChart,
  },
  {
    id: "reporting",
    name: "Reporting",
    tagline: "From raw material to a clear status.",
    description:
      "Status reports, KPI narratives and management summaries built from data you already maintain.",
    icon: BarChart3,
  },
  {
    id: "research",
    name: "Research",
    tagline: "Find and verify what already exists.",
    description:
      "Policy questions, document retrieval and knowledge lookups with traceable sources.",
    icon: Search,
  },
  {
    id: "administration",
    name: "Administration",
    tagline: "Keep the day-to-day under control.",
    description:
      "Inbox, calendar and coordination work that has to happen reliably every day.",
    icon: ClipboardList,
  },
  {
    id: "automation",
    name: "Automation",
    tagline: "Set it up once, let it run.",
    description:
      "Recurring briefings, triage rules and scheduled prompts that handle repetitive work in the background.",
    icon: WorkflowIcon,
  },
];

const TASK_TYPE_BY_WORKFLOW: Record<string, TaskTypeId> = {
  "daily-executive-briefing": "planning",
  "summarize-inbox": "administration",
  "prepare-meeting-notes": "meetings",
  "manage-multi-mailbox": "administration",
  "draft-executive-responses": "writing",
  "meeting-brief-full-context": "meetings",
  "agent-daily-briefing": "automation",
  "agent-email-triage": "automation",
  "scheduled-morning-briefing": "automation",
  "scheduled-end-of-day": "automation",
  "scheduled-weekly-prep": "automation",
  "ea-talking-points": "meetings",
  "ea-detect-escalations": "communication",
  "ea-draft-followups": "writing",
  "ea-auto-accept-meetings": "automation",
  "ea-prioritize-leadership-emails": "automation",
  "ea-calendar-optimization": "administration",
  "ea-auto-prepare-meetings": "automation",
  "ea-delegate-meetings": "administration",
  "prepare-1-1-meeting": "meetings",
  "write-feedback": "writing",
  "define-weekly-priorities": "planning",
  "draft-difficult-message": "communication",
  "plan-team-offsite": "planning",
  "project-status-summary": "reporting",
  "identify-risks": "planning",
  "stakeholder-update": "communication",
  "steering-committee-update": "reporting",
  "project-kickoff": "planning",
  "build-business-case": "analysis",
  "policy-qa": "research",
  "compliance-document-summary": "research",
  "governance-search": "research",
  "kpi-summary": "reporting",
  "variance-summary": "analysis",
  "forecast-prep": "analysis",
};

export const getTaskType = (workflowId: string): TaskType | undefined => {
  const id = TASK_TYPE_BY_WORKFLOW[workflowId];
  return id ? taskTypes.find((t) => t.id === id) : undefined;
};

export const getTaskTypeMeta = (id: string): TaskType | undefined =>
  taskTypes.find((t) => t.id === id);

export const getWorkflowsByTaskType = (id: TaskTypeId): Workflow[] =>
  workflows.filter((w) => TASK_TYPE_BY_WORKFLOW[w.id] === id);

/**
 * Workflows that rely on Microsoft 365-specific mechanics
 * (Copilot agents, native Scheduled Prompts, Outlook rules, Power Automate).
 */
export const isMicrosoft365Workflow = (w: Workflow): boolean =>
  w.level === "agent" ||
  w.level === "scheduled" ||
  w.level === "automation" ||
  Boolean(w.outlookSetup);

export const microsoft365Workflows: Workflow[] = workflows.filter(isMicrosoft365Workflow);
