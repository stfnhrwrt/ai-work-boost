import { DiscoveryItem, discoveryItems, environmentName } from "@/data/discovery";
import { TaskTypeId } from "@/data/taskTypes";
import { ExecutionEnvironmentId } from "@/data/workflows";
import { RoleId, roles } from "@/data/workflows";

export type SituationId =
  | "too-many-emails"
  | "prepare-meeting"
  | "notes-to-document"
  | "explain-numbers"
  | "create-presentation"
  | "organize-project"
  | "plan-week"
  | "difficult-message";

export type OutputTypeId =
  | "any"
  | "summary"
  | "document"
  | "message"
  | "presentation"
  | "plan"
  | "analysis";

export type TimeBudgetId = "any" | "under-10" | "under-20";

export interface Situation {
  id: SituationId;
  label: string;
  /** Task types that answer this situation, best first. */
  taskTypes: TaskTypeId[];
  /** Search terms that indicate a workflow addresses this situation. */
  keywords: string[];
  /** Used in the "why it fits" sentence. */
  fitPhrase: string;
}

export const situations: Situation[] = [
  {
    id: "too-many-emails",
    label: "I have too many emails",
    taskTypes: ["administration", "communication", "automation"],
    keywords: ["inbox", "email", "mailbox", "outlook", "triage", "reply", "message"],
    fitPhrase: "cuts an overloaded inbox down to what actually needs you",
  },
  {
    id: "prepare-meeting",
    label: "I need to prepare for a meeting",
    taskTypes: ["meetings", "research", "administration"],
    keywords: ["meeting", "brief", "agenda", "attendee", "prepare", "notes"],
    fitPhrase: "gets you into the meeting prepared instead of catching up in the room",
  },
  {
    id: "notes-to-document",
    label: "I need to turn notes into a document",
    taskTypes: ["writing", "meetings", "reporting"],
    keywords: ["notes", "draft", "document", "write", "summary", "report", "word"],
    fitPhrase: "turns rough notes and source material into a structured first draft",
  },
  {
    id: "explain-numbers",
    label: "I need to explain numbers or trends",
    taskTypes: ["analysis", "reporting"],
    keywords: ["data", "numbers", "budget", "variance", "kpi", "trend", "excel", "forecast"],
    fitPhrase: "explains what the figures show and what moved, in plain language",
  },
  {
    id: "create-presentation",
    label: "I need to create a presentation",
    taskTypes: ["communication", "reporting", "writing"],
    keywords: ["presentation", "deck", "slide", "powerpoint", "narrative", "speaker"],
    fitPhrase: "gets you from raw material to a deck outline you can present",
  },
  {
    id: "organize-project",
    label: "I need to organize a project",
    taskTypes: ["planning", "administration", "reporting"],
    keywords: ["project", "task", "plan", "planner", "milestone", "risk", "status", "kickoff"],
    fitPhrase: "brings a project's tasks, owners and risks into one working view",
  },
  {
    id: "plan-week",
    label: "I need to plan my week",
    taskTypes: ["planning", "administration"],
    keywords: ["week", "priorit", "calendar", "schedule", "day", "briefing", "workload"],
    fitPhrase: "sets your priorities for the week before the week sets them for you",
  },
  {
    id: "difficult-message",
    label: "I need to write a difficult message",
    taskTypes: ["communication", "writing"],
    keywords: ["message", "tone", "escalation", "stakeholder", "difficult", "response", "reply"],
    fitPhrase: "helps you land a sensitive message in the right tone",
  },
];

export const outputTypes: { id: OutputTypeId; label: string }[] = [
  { id: "any", label: "Any output" },
  { id: "summary", label: "Summary or brief" },
  { id: "document", label: "Document or draft" },
  { id: "message", label: "Email or message" },
  { id: "presentation", label: "Presentation" },
  { id: "plan", label: "Plan or task list" },
  { id: "analysis", label: "Analysis of data" },
];

export const timeBudgets: { id: TimeBudgetId; label: string }[] = [
  { id: "any", label: "Any" },
  { id: "under-10", label: "Under 10 minutes" },
  { id: "under-20", label: "Under 20 minutes" },
];

export const finderRoles: { id: RoleId | "any"; label: string }[] = [
  { id: "any", label: "Any role" },
  ...roles.map((role) => ({ id: role.id, label: role.shortName })),
];

export const finderTools: { id: ExecutionEnvironmentId | "any"; label: string }[] = [
  { id: "any", label: "Any approved tool" },
  { id: "copilot", label: "Microsoft Copilot" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "gemini", label: "Gemini" },
  { id: "internal", label: "Internal AI tool" },
];

const OUTPUT_BY_TASK: Record<TaskTypeId, OutputTypeId> = {
  meetings: "summary",
  writing: "document",
  communication: "message",
  planning: "plan",
  analysis: "analysis",
  reporting: "summary",
  research: "summary",
  administration: "plan",
  automation: "plan",
};

const PRESENTATION_HINTS = ["presentation", "deck", "slide", "powerpoint"];

export const outputTypeOf = (item: DiscoveryItem): OutputTypeId => {
  if (PRESENTATION_HINTS.some((hint) => item.searchText.includes(hint))) return "presentation";
  return OUTPUT_BY_TASK[item.taskTypeId];
};

/** Highest number of minutes mentioned in an effort string such as "10–15 minutes". */
export const effortMinutes = (effort?: string): number | undefined => {
  if (!effort) return undefined;
  const numbers = effort.match(/\d+/g);
  if (!numbers) return undefined;
  const max = Math.max(...numbers.map(Number));
  return /hour/i.test(effort) ? max * 60 : max;
};

export interface FinderSelection {
  situation: SituationId;
  role: RoleId | "any";
  tool: ExecutionEnvironmentId | "any";
  time: TimeBudgetId;
  output: OutputTypeId;
}

export interface Recommendation {
  item: DiscoveryItem;
  reason: string;
  effort: string;
  tool: string;
}

const TIME_LIMIT: Record<TimeBudgetId, number> = {
  any: Number.POSITIVE_INFINITY,
  "under-10": 10,
  "under-20": 20,
};

const recommendedTool = (
  item: DiscoveryItem,
  selected: ExecutionEnvironmentId | "any",
): string => {
  if (!item.roleId) return `Microsoft Copilot in ${item.sourceLabel.replace(/^Copilot in /, "")}`;
  if (item.environments.length === 1) return environmentName(item.environments[0]);
  if (selected !== "any" && item.environments.includes(selected)) return environmentName(selected);
  return "Any approved AI assistant";
};

const buildReason = (
  item: DiscoveryItem,
  situation: Situation,
  taskRank: number,
  roleMatched: boolean,
  outputMatched: boolean,
): string => {
  const lead =
    taskRank === 0
      ? `Directly ${situation.fitPhrase}`
      : `A close fit — it ${situation.fitPhrase}`;
  const detail = item.description.replace(/\.$/, "");
  const extras: string[] = [];
  if (roleMatched) extras.push(`written for the ${item.sourceLabel} role`);
  if (outputMatched) extras.push("produces the output type you picked");
  if (!item.roleId) extras.push("uses Microsoft 365 context directly");
  const tail = extras.length > 0 ? ` It is ${extras.join(", ")}.` : "";
  return `${lead}: ${detail}.${tail}`;
};

export const recommendWorkflows = (
  selection: FinderSelection,
  limit = 3,
): Recommendation[] => {
  const situation = situations.find((s) => s.id === selection.situation);
  if (!situation) return [];
  const limitMinutes = TIME_LIMIT[selection.time];

  const scored = discoveryItems
    .map((item) => {
      const taskRank = situation.taskTypes.indexOf(item.taskTypeId);
      let score = taskRank >= 0 ? 6 - taskRank * 2 : 0;

      const keywordHits = situation.keywords.filter((k) => item.searchText.includes(k)).length;
      score += Math.min(keywordHits, 3) * 1.5;
      if (score === 0) return null;

      const roleMatched = selection.role !== "any" && item.roleId === selection.role;
      if (selection.role !== "any") {
        if (roleMatched) score += 3;
        else if (item.roleId) score -= 1.5;
      }

      if (selection.tool !== "any") {
        if (item.environments.includes(selection.tool)) score += 2;
        else return null;
      }

      const minutes = effortMinutes(item.effort);
      if (limitMinutes !== Number.POSITIVE_INFINITY) {
        if (minutes === undefined) score -= 1;
        else if (minutes > limitMinutes) return null;
        else score += 1;
      }

      const outputMatched = selection.output !== "any" && outputTypeOf(item) === selection.output;
      if (selection.output !== "any") {
        if (outputMatched) score += 2.5;
        else score -= 1;
      }

      return {
        item,
        score,
        reason: buildReason(item, situation, Math.max(taskRank, 0), roleMatched, outputMatched),
      };
    })
    .filter((entry): entry is { item: DiscoveryItem; score: number; reason: string } =>
      Boolean(entry && entry.score > 0),
    )
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.slice(0, limit).map((entry) => ({
    item: entry.item,
    reason: entry.reason,
    effort: entry.item.effort ?? "5–10 minutes",
    tool: recommendedTool(entry.item, selection.tool),
  }));
};
