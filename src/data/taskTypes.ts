import {
  BarChart3,
  CalendarCheck,
  ListChecks,
  MessageSquareText,
  Search,
  Workflow as WorkflowIcon,
  LucideIcon,
} from "lucide-react";
import { workflows, Workflow } from "@/data/workflows";

export type TaskTypeId =
  | "meetings"
  | "communication"
  | "knowledge"
  | "planning"
  | "reporting"
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
    name: "Meetings & follow-ups",
    tagline: "Prepare, capture and close the loop.",
    description:
      "Turn agendas, transcripts and notes into decisions, actions and follow-ups people actually act on.",
    icon: CalendarCheck,
  },
  {
    id: "communication",
    name: "Writing & communication",
    tagline: "Draft faster, sound like yourself.",
    description:
      "Emails, updates, difficult messages and inbox triage — drafted in your tone and reviewed by you before sending.",
    icon: MessageSquareText,
  },
  {
    id: "knowledge",
    name: "Research & knowledge",
    tagline: "Find answers inside your own documents.",
    description:
      "Retrieve, compare and summarize policies, documents and prior decisions using the sources you are allowed to access.",
    icon: Search,
  },
  {
    id: "planning",
    name: "Planning & prioritization",
    tagline: "Decide what matters this week.",
    description:
      "Weekly priorities, kick-offs, risk reviews and business cases — structured thinking instead of a blank page.",
    icon: ListChecks,
  },
  {
    id: "reporting",
    name: "Reporting & analysis",
    tagline: "From raw numbers to a clear story.",
    description:
      "Status reports, KPI narratives, variance commentary and management summaries built from data you already have.",
    icon: BarChart3,
  },
  {
    id: "automation",
    name: "Automation & recurring work",
    tagline: "Set it up once, let it run.",
    description:
      "Recurring briefings, triage rules and scheduled prompts that handle repetitive work in the background.",
    icon: WorkflowIcon,
  },
];

const TASK_TYPE_BY_WORKFLOW: Record<string, TaskTypeId> = {
  "daily-executive-briefing": "planning",
  "summarize-inbox": "communication",
  "prepare-meeting-notes": "meetings",
  "manage-multi-mailbox": "communication",
  "draft-executive-responses": "communication",
  "meeting-brief-full-context": "meetings",
  "agent-daily-briefing": "automation",
  "agent-email-triage": "automation",
  "scheduled-morning-briefing": "automation",
  "scheduled-end-of-day": "automation",
  "scheduled-weekly-prep": "automation",
  "ea-talking-points": "meetings",
  "ea-detect-escalations": "communication",
  "ea-draft-followups": "communication",
  "ea-auto-accept-meetings": "automation",
  "ea-prioritize-leadership-emails": "automation",
  "ea-calendar-optimization": "automation",
  "ea-auto-prepare-meetings": "automation",
  "ea-delegate-meetings": "automation",
  "prepare-1-1-meeting": "meetings",
  "write-feedback": "communication",
  "define-weekly-priorities": "planning",
  "draft-difficult-message": "communication",
  "plan-team-offsite": "planning",
  "project-status-summary": "reporting",
  "identify-risks": "planning",
  "stakeholder-update": "communication",
  "steering-committee-update": "reporting",
  "project-kickoff": "planning",
  "build-business-case": "planning",
  "policy-qa": "knowledge",
  "compliance-document-summary": "knowledge",
  "governance-search": "knowledge",
  "kpi-summary": "reporting",
  "variance-summary": "reporting",
  "forecast-prep": "reporting",
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
