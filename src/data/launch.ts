/**
 * Content for the homepage launch narrative: raw material → instruction → result.
 * Every output links to a real workflow in the library.
 */

export interface LaunchOutputLine {
  label: string;
  value: string;
}

export interface LaunchInput {
  id: string;
  label: string;
  hint: string;
  /** Rough position on the desktop scatter composition, in percent. */
  scatter: { x: number; y: number; rotate: number };
  instruction: string;
  output: {
    kind: string;
    title: string;
    lines: LaunchOutputLine[];
    workflowId: string;
    workflowTitle: string;
  };
}

export const launchInputs: LaunchInput[] = [
  {
    id: "meeting-notes",
    label: "Meeting notes",
    hint: "Decisions, open questions",
    scatter: { x: 6, y: 10, rotate: -3 },
    instruction:
      "Create a concise, decision-ready update from these meeting notes. Separate facts, assumptions, risks, and next steps.",
    output: {
      kind: "Decision summary",
      title: "Steering meeting — 12 September",
      lines: [
        { label: "Current status", value: "Scope agreed for phase two; budget review still open." },
        { label: "Key decisions", value: "Launch date moved to 14 October; vendor B selected." },
        { label: "Risks", value: "Data migration window overlaps with month-end close." },
        { label: "Next steps", value: "Finance to confirm budget by Friday; PM to update the plan." },
      ],
      workflowId: "prepare-meeting-notes",
      workflowTitle: "Turn meeting notes into decisions and actions",
    },
  },
  {
    id: "inbox",
    label: "Inbox",
    hint: "Threads needing replies",
    scatter: { x: 68, y: 4, rotate: 2.5 },
    instruction:
      "Read this inbox extract and produce a decision-ready summary. Separate what is confirmed, what is assumed, what is at risk, and what I must answer today.",
    output: {
      kind: "Executive briefing",
      title: "Inbox briefing — this morning",
      lines: [
        { label: "Current status", value: "38 unread; 6 threads need a reply from you." },
        { label: "Key decisions", value: "Approve the revised supplier terms or extend the deadline." },
        { label: "Risks", value: "Two client threads have been waiting more than 48 hours." },
        { label: "Next steps", value: "Reply to the client escalation, delegate the rest." },
      ],
      workflowId: "summarize-inbox",
      workflowTitle: "Summarize the inbox and surface what needs a reply",
    },
  },
  {
    id: "spreadsheet",
    label: "Spreadsheet",
    hint: "Numbers, trends, gaps",
    scatter: { x: 12, y: 58, rotate: 3.5 },
    instruction:
      "Explain what changed in this data in plain language. Separate the facts, the assumptions behind them, the risks, and the next steps.",
    output: {
      kind: "Weekly priorities",
      title: "KPI summary — week 37",
      lines: [
        { label: "Current status", value: "Revenue 4% above plan; cost per order flat." },
        { label: "Key decisions", value: "Hold the current spend level for one more cycle." },
        { label: "Risks", value: "Two regions are below plan and driving the variance." },
        { label: "Next steps", value: "Ask the regional leads for a short explanation each." },
      ],
      workflowId: "kpi-summary",
      workflowTitle: "Explain what the numbers actually mean",
    },
  },
  {
    id: "project-plan",
    label: "Project plan",
    hint: "Milestones, owners, dates",
    scatter: { x: 72, y: 54, rotate: -2 },
    instruction:
      "Turn this project plan into a concise status update for stakeholders. Separate facts, assumptions, risks, and next steps.",
    output: {
      kind: "Project update",
      title: "Project update — platform rollout",
      lines: [
        { label: "Current status", value: "Four of six milestones complete; testing underway." },
        { label: "Key decisions", value: "Pilot group reduced to two teams to protect quality." },
        { label: "Risks", value: "Integration testing depends on one unavailable specialist." },
        { label: "Next steps", value: "Confirm cover for testing; re-baseline the final milestone." },
      ],
      workflowId: "project-status-summary",
      workflowTitle: "Write a project status summary people read",
    },
  },
  {
    id: "rough-document",
    label: "Rough document",
    hint: "Half-written, unstructured",
    scatter: { x: 40, y: 76, rotate: 1.5 },
    instruction:
      "Rewrite this rough draft as a structured stakeholder update. Separate facts, assumptions, risks, and next steps, and keep it to one page.",
    output: {
      kind: "Executive briefing",
      title: "Stakeholder update — draft one",
      lines: [
        { label: "Current status", value: "Draft covers the right ground but buries the decision." },
        { label: "Key decisions", value: "Lead with the funding request, evidence second." },
        { label: "Risks", value: "Unsourced figures in the second section need a check." },
        { label: "Next steps", value: "Verify the two numbers, then send for review." },
      ],
      workflowId: "stakeholder-update",
      workflowTitle: "Draft a stakeholder update from rough material",
    },
  },
];
