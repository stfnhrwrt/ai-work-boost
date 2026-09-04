import { roles, workflows, RoleId, Workflow, WorkflowLevel } from "@/data/workflows";
import { getTaskType, taskTypes, TaskTypeId } from "@/data/taskTypes";
import { getFormatId, workflowFormats, WorkflowFormatId } from "@/data/formats";
import { copilotApps, CopilotAppId } from "@/data/copilotApps";
import { executionEnvironments, resolveWorkflow } from "@/data/workflowModel";
import { ExecutionEnvironmentId } from "@/data/workflows";

export type AppFilterId =
  | "any-approved"
  | "copilot"
  | "word"
  | "excel"
  | "powerpoint"
  | "planner"
  | "chatgpt"
  | "claude"
  | "internal"
  | "cross-app";

export type SkillLevelId = "beginner" | "intermediate" | "advanced";

export interface FilterOption<T extends string = string> {
  id: T;
  label: string;
}

export const appFilters: FilterOption<AppFilterId>[] = [
  { id: "any-approved", label: "Any approved AI assistant" },
  { id: "copilot", label: "Copilot" },
  { id: "word", label: "Word" },
  { id: "excel", label: "Excel" },
  { id: "powerpoint", label: "PowerPoint" },
  { id: "planner", label: "Planner" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "internal", label: "Internal AI tool" },
  { id: "cross-app", label: "Cross-app" },
];

export const skillLevels: FilterOption<SkillLevelId>[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const environmentFilters: FilterOption<ExecutionEnvironmentId>[] = [
  { id: "any-approved", label: "Any approved AI assistant" },
  { id: "copilot", label: "Microsoft Copilot" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "internal", label: "Internal AI tool" },
];

export interface DiscoveryItem {
  key: string;
  title: string;
  description: string;
  href: string;
  /** Where the item lives, e.g. "Copilot in Excel" or the role name */
  sourceLabel: string;
  roleId?: RoleId;
  taskTypeId: TaskTypeId;
  formatId: WorkflowFormatId;
  apps: AppFilterId[];
  skill: SkillLevelId;
  environments: ExecutionEnvironmentId[];
  tags: string[];
  effort?: string;
  effortAvoided?: string;
  searchText: string;
}

const SKILL_BY_LEVEL: Record<WorkflowLevel, SkillLevelId> = {
  essential: "beginner",
  advanced: "intermediate",
  agent: "advanced",
  scheduled: "intermediate",
  automation: "advanced",
};

const APP_TASK_TYPE: Record<CopilotAppId, TaskTypeId> = {
  word: "writing",
  excel: "analysis",
  powerpoint: "communication",
  planner: "planning",
  "cross-app": "reporting",
};

const APP_SKILL: Record<CopilotAppId, SkillLevelId> = {
  word: "beginner",
  excel: "intermediate",
  powerpoint: "beginner",
  planner: "intermediate",
  "cross-app": "advanced",
};

/** Task type overrides where the app default does not fit the workflow. */
const APP_WORKFLOW_TASK_TYPE: Record<string, TaskTypeId> = {
  "word-summarize-decisions": "meetings",
  "word-review-gaps": "research",
  "word-executive-summary": "reporting",
  "excel-clean-dataset": "administration",
  "excel-kpi-summary": "reporting",
  "excel-budget-vs-actuals": "reporting",
  "ppt-narrative-from-data": "analysis",
  "ppt-speaker-notes": "writing",
  "ppt-template-consistency": "administration",
  "planner-weekly-status": "reporting",
  "planner-meeting-to-tasks": "meetings",
  "planner-risk-tasks": "analysis",
  "cross-meeting-to-deck": "meetings",
  "cross-excel-to-deck": "analysis",
  "cross-kickoff-to-plan": "planning",
  "cross-context-to-briefing": "administration",
};

const APP_FORMAT: Record<CopilotAppId, WorkflowFormatId> = {
  word: "core",
  excel: "core",
  powerpoint: "core",
  planner: "core",
  "cross-app": "multi-step",
};

const roleName = (id: RoleId): string => roles.find((r) => r.id === id)?.name ?? "";

const appsForWorkflow = (
  workflow: Workflow,
  environments: ExecutionEnvironmentId[],
): AppFilterId[] => {
  const apps = new Set<AppFilterId>();
  environments.forEach((env) => apps.add(env as AppFilterId));
  if (workflow.level === "agent" || workflow.level === "automation") apps.add("cross-app");
  return appFilters.filter((a) => apps.has(a.id)).map((a) => a.id);
};

const buildSearchText = (parts: (string | undefined)[]): string =>
  parts.filter(Boolean).join(" ").toLowerCase();

const workflowItems: DiscoveryItem[] = workflows.map((workflow) => {
  const resolved = resolveWorkflow(workflow);
  const taskType = getTaskType(workflow.id);
  const taskTypeId = (taskType?.id as TaskTypeId) ?? "planning";
  const environments = resolved.environments.map((e) => e.id);
  const apps = appsForWorkflow(workflow, environments);
  const role = roleName(workflow.roleId);
  const tags = [
    resolved.format.shortLabel,
    taskType?.name ?? "",
    ...(resolved.copilotOnly ? ["Microsoft 365"] : []),
  ].filter(Boolean);

  return {
    key: workflow.id,
    title: workflow.title,
    description: workflow.description,
    href: `/workflow/${workflow.id}`,
    sourceLabel: role,
    roleId: workflow.roleId,
    taskTypeId,
    formatId: getFormatId(workflow.level),
    apps,
    skill: SKILL_BY_LEVEL[workflow.level],
    environments,
    tags,
    effort: workflow.timeRange,
    effortAvoided: resolved.manualEffortAvoided,
    searchText: buildSearchText([
      workflow.title,
      workflow.description,
      workflow.situation,
      role,
      taskType?.name,
      ...tags,
    ]),
  };
});

const copilotAppItems: DiscoveryItem[] = copilotApps.flatMap((app) =>
  app.workflows.map((workflow) => {
    const taskTypeId = APP_WORKFLOW_TASK_TYPE[workflow.id] ?? APP_TASK_TYPE[app.id];
    const apps: AppFilterId[] =
      app.id === "cross-app"
        ? ["copilot", "cross-app", "word", "excel", "powerpoint", "planner"]
        : ["copilot", app.id];
    const tags = [app.name, "Microsoft 365"];

    return {
      key: `${app.id}:${workflow.id}`,
      title: workflow.title,
      description: workflow.description,
      href: `/copilot-microsoft-365/${app.id}#${workflow.id}`,
      sourceLabel: app.name,
      taskTypeId,
      formatId: APP_FORMAT[app.id],
      apps,
      skill: APP_SKILL[app.id],
      environments: ["copilot"] as ExecutionEnvironmentId[],
      tags,
      searchText: buildSearchText([
        workflow.title,
        workflow.description,
        workflow.situation,
        app.name,
        taskTypes.find((t) => t.id === taskTypeId)?.name,
        ...tags,
      ]),
    };
  }),
);

export const discoveryItems: DiscoveryItem[] = [...workflowItems, ...copilotAppItems];

export interface DiscoveryFilters {
  query?: string;
  role?: string;
  task?: string;
  format?: string;
  app?: string;
  skill?: string;
  environment?: string;
}

export const matchesFilters = (item: DiscoveryItem, filters: DiscoveryFilters): boolean => {
  if (filters.role && filters.role !== "all" && item.roleId !== filters.role) return false;
  if (filters.task && filters.task !== "all" && item.taskTypeId !== filters.task) return false;
  if (filters.format && filters.format !== "all" && item.formatId !== filters.format) return false;
  if (filters.app && filters.app !== "all" && !item.apps.includes(filters.app as AppFilterId))
    return false;
  if (filters.skill && filters.skill !== "all" && item.skill !== filters.skill) return false;
  if (
    filters.environment &&
    filters.environment !== "all" &&
    !item.environments.includes(filters.environment as ExecutionEnvironmentId)
  )
    return false;
  const q = filters.query?.trim().toLowerCase();
  if (q && !q.split(/\s+/).every((token) => item.searchText.includes(token))) return false;
  return true;
};

export const filterDiscoveryItems = (filters: DiscoveryFilters): DiscoveryItem[] =>
  discoveryItems.filter((item) => matchesFilters(item, filters));

/** Count of items that would remain if this single filter value were applied on top of the others. */
export const countForOption = (
  filters: DiscoveryFilters,
  key: keyof DiscoveryFilters,
  value: string,
): number => filterDiscoveryItems({ ...filters, [key]: value }).length;

export const discoveryFilterLabels = {
  roles: roles.map((r) => ({ id: r.id, label: r.shortName })),
  taskTypes: taskTypes.map((t) => ({ id: t.id, label: t.name })),
  formats: workflowFormats.map((f) => ({ id: f.id, label: f.label })),
  apps: appFilters,
  skills: skillLevels,
  environments: environmentFilters,
};

/**
 * Related items for a workflow detail page: same task type first,
 * then same role, then anything sharing a tag.
 */
export const getRelatedItems = (workflowId: string, limit = 4): DiscoveryItem[] => {
  const current = discoveryItems.find((i) => i.key === workflowId);
  if (!current) return [];
  const scored = discoveryItems
    .filter((i) => i.key !== current.key)
    .map((item) => {
      let score = 0;
      if (item.taskTypeId === current.taskTypeId) score += 3;
      if (item.roleId && item.roleId === current.roleId) score += 2;
      if (item.formatId === current.formatId) score += 1;
      if (item.apps.some((a) => current.apps.includes(a))) score += 1;
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
};

export const environmentName = (id: ExecutionEnvironmentId): string =>
  executionEnvironments[id].name;

export interface TaskTypeCounts {
  general: number;
  microsoft365: number;
  total: number;
}

export const getTaskTypeCounts = (taskTypeId: string): TaskTypeCounts => {
  const items = discoveryItems.filter((i) => i.taskTypeId === taskTypeId);
  const microsoft365 = items.filter((i) => i.href.startsWith("/copilot-microsoft-365")).length;
  return { general: items.length - microsoft365, microsoft365, total: items.length };
};

export const taskTypeCountLabel = (counts: TaskTypeCounts): string => {
  const general = `${counts.general} general ${counts.general === 1 ? "workflow" : "workflows"}`;
  return counts.microsoft365 > 0
    ? `${general} · ${counts.microsoft365} Microsoft 365`
    : general;
};
