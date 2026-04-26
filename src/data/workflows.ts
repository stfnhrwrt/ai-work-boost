import { Briefcase, Users, KanbanSquare, LucideIcon } from "lucide-react";

export type RoleId = "executive-assistants" | "managers" | "project-managers";

export interface Role {
  id: RoleId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
}

export interface Workflow {
  id: string;
  roleId: RoleId;
  title: string;
  description: string;
  situation: string;
  contextSources: string[];
  copilotPrompt: string;
  chatgptPrompt: string;
  improvementPrompts: string[];
  realWorldAction: string;
  timeRange: string;
}

export const roles: Role[] = [
  {
    id: "executive-assistants",
    name: "Executive Assistants",
    shortName: "EA",
    tagline: "Stay one step ahead of your executive.",
    description:
      "Workflows for daily briefings, inbox triage and meeting prep — built to save you hours every week.",
    icon: Briefcase,
  },
  {
    id: "managers",
    name: "Managers & Leaders",
    shortName: "Manager",
    tagline: "Lead your team with sharper, faster decisions.",
    description:
      "Practical workflows for 1:1s, feedback and weekly priorities — ready to use before your next meeting.",
    icon: Users,
  },
  {
    id: "project-managers",
    name: "Project Managers",
    shortName: "PM",
    tagline: "Keep projects moving and stakeholders aligned.",
    description:
      "Status summaries, risk reviews and stakeholder updates — turn scattered context into clear communication.",
    icon: KanbanSquare,
  },
];

export const workflows: Workflow[] = [
  // ───────────────────────── Executive Assistants ─────────────────────────
  {
    id: "daily-executive-briefing",
    roleId: "executive-assistants",
    title: "Daily Executive Briefing",
    description: "Build a one-page morning briefing covering today's meetings, key updates and prep notes.",
    situation:
      "It's early morning and your executive needs a clear, executive-ready overview of the day before back-to-back meetings.",
    contextSources: [
      "Today's calendar (meetings and attendees)",
      "Emails from the last 24–48 hours",
      "Recent Teams conversations with key stakeholders",
      "Documents shared overnight",
    ],
    copilotPrompt: `Create a daily executive briefing for today.

Use:
- My executive's calendar for today (meetings and attendees)
- Relevant emails from the last 24–48 hours
- Important Teams conversations with direct reports and key stakeholders

Structure:
- Top 3 priorities for today
- Meeting overview (time, attendees, purpose)
- Key updates since yesterday
- Risks or issues to watch
- Preparation notes per meeting (1–2 bullets each)

Keep it concise, executive-ready and under one page.`,
    chatgptPrompt: `Create a daily executive briefing based on the notes below.

Structure:
- Top 3 priorities for today
- Meetings (time, attendees, purpose)
- Key updates
- Risks or issues
- Preparation notes per meeting

Keep it concise and executive-ready.

Notes:
[Paste calendar, key emails and Teams highlights here]`,
    improvementPrompts: [
      "Make it more concise — half a page maximum.",
      "Highlight the top 3 priorities at the very top.",
      "Rewrite in a more direct, executive tone.",
    ],
    realWorldAction:
      "Send the briefing to your executive in Teams or email before the day starts (ideally before 8 a.m.).",
    timeRange: "5–10 minutes",
  },
  {
    id: "summarize-inbox",
    roleId: "executive-assistants",
    title: "Summarize Inbox",
    description: "Turn an overloaded inbox into a clear list of urgent items, decisions needed and follow-ups.",
    situation:
      "Your inbox is overloaded after a day of meetings and you need a quick, actionable overview in five minutes.",
    contextSources: [
      "Recent email threads",
      "Flagged or starred messages",
      "Threads with VIP contacts",
    ],
    copilotPrompt: `Summarize my recent emails from the last 24 hours.

Focus on:
- Urgent items needing a response today
- Decisions needed (and from whom)
- Follow-ups required
- Deadlines mentioned

Group similar topics together. For each item include sender, one-line summary and the recommended action.

Keep the whole summary short and skimmable.`,
    chatgptPrompt: `Summarize the following emails.

Highlight:
- Urgent topics
- Decisions needed
- Actions required (with owner)
- Deadlines

Group similar topics together and keep it short.

Emails:
[Paste emails or subject + sender + first lines here]`,
    improvementPrompts: [
      "Prioritize urgent items at the top.",
      "Add clear action points with owners.",
      "Only show emails from VIPs and direct reports.",
    ],
    realWorldAction:
      "Use the summary to organize your day: respond to urgent items first, schedule follow-ups, archive the rest.",
    timeRange: "5 minutes",
  },
  {
    id: "prepare-meeting-notes",
    roleId: "executive-assistants",
    title: "Prepare Meeting Notes",
    description: "Turn a meeting transcript or notes into structured decisions, actions, owners and deadlines.",
    situation: "A meeting just ended and you need clean, structured notes to share with participants right away.",
    contextSources: [
      "Teams meeting transcript or recording",
      "Your own notes",
      "Follow-up emails",
    ],
    copilotPrompt: `Create structured meeting notes from my latest meeting.

Use:
- The Teams meeting transcript or recording
- Any of my notes from the meeting
- Related follow-up emails

Include:
- Key decisions
- Action items (specific and outcome-oriented)
- Owners
- Deadlines
- Open questions to follow up on

Keep it clear, structured and easy to scan.`,
    chatgptPrompt: `Create structured meeting notes from this transcript.

Include:
- Decisions
- Actions (specific and outcome-oriented)
- Owners
- Deadlines
- Open questions

Transcript:
[Paste meeting transcript or notes here]`,
    improvementPrompts: [
      "Make action items more specific and outcome-oriented.",
      "Highlight decisions clearly at the top.",
      "Convert into a short email I can send to participants.",
    ],
    realWorldAction:
      "Share the notes with all participants in Teams or email immediately after the meeting.",
    timeRange: "5–10 minutes",
  },

  // ───────────────────────── Managers ─────────────────────────
  {
    id: "prepare-1-1-meeting",
    roleId: "managers",
    title: "Prepare a 1:1 Meeting",
    description: "Build a structured 1:1 plan with topics, feedback points and questions tailored to the team member.",
    situation: "You have a 1:1 meeting with a team member tomorrow and want it to be useful, not generic.",
    contextSources: [
      "Recent Teams conversations with the employee",
      "Emails exchanged with the employee",
      "Notes from previous 1:1 meetings",
      "Shared project documents",
    ],
    copilotPrompt: `Prepare a structured 1:1 meeting plan for my upcoming meeting with [Employee Name].

Use:
- Our recent Teams conversations
- Relevant emails between us
- Past 1:1 meeting notes and follow-ups
- Any project documents we've both worked on

Structure:
- Key topics to discuss
- Feedback points (positive and constructive)
- Open issues from previous 1:1s
- Suggested questions to ask them

Keep it concise and actionable.`,
    chatgptPrompt: `Create a structured 1:1 meeting plan using the notes below.

Structure:
- Key topics
- Feedback points
- Open issues
- Suggested questions

Notes:
[Paste recent interactions, project updates and previous 1:1 notes]`,
    improvementPrompts: [
      "Focus on top priorities and blockers only.",
      "Make feedback more specific with concrete examples.",
      "Add 2 career-development questions at the end.",
    ],
    realWorldAction:
      "Open the plan in your 1:1 doc and use it as the live agenda. Capture decisions directly underneath each section.",
    timeRange: "5–10 minutes",
  },
  {
    id: "write-feedback",
    roleId: "managers",
    title: "Write Performance Feedback",
    description: "Draft clear, balanced and constructive feedback for a team member based on real recent context.",
    situation:
      "You need to write performance feedback — for a review, a project debrief or a 1:1 — and want it specific, fair and actionable.",
    contextSources: [
      "Teams conversations with the employee",
      "Project documents they've contributed to",
      "Recent meetings where they participated",
      "Emails with stakeholders about their work",
    ],
    copilotPrompt: `Write performance feedback for [Employee Name] covering the last [time period].

Use:
- Our recent Teams conversations
- Documents they've authored or contributed to
- Meetings where they presented or participated
- Stakeholder emails referencing their work

Make it:
- Constructive
- Clear
- Balanced (strengths and areas to improve)

Structure:
- 2–3 specific strengths with concrete examples
- 1–2 areas for improvement with concrete examples
- Suggested next steps for development

Avoid generic phrases — always include examples.`,
    chatgptPrompt: `Write performance feedback based on the notes below.

Make it:
- Clear
- Balanced
- Actionable

Structure:
- 2–3 specific strengths with examples
- 1–2 areas to improve with examples
- Suggested next steps

Notes:
[Paste examples of their work, contributions, behaviours and outcomes]`,
    improvementPrompts: [
      "Make the tone more empathetic without losing directness.",
      "Add a specific example for each strength and growth area.",
      "Rewrite as if I'm delivering it verbally in a 1:1.",
    ],
    realWorldAction:
      "Use the draft in your performance tool, review document or 1:1. Personalize names and specifics before sharing.",
    timeRange: "5–10 minutes",
  },
  {
    id: "define-weekly-priorities",
    roleId: "managers",
    title: "Define Weekly Priorities",
    description: "Turn a noisy week of inputs into 3–5 clear team priorities you can act on Monday morning.",
    situation:
      "It's Sunday evening or Monday morning and you need to align yourself and your team on what actually matters this week.",
    contextSources: [
      "Recent emails from leadership and stakeholders",
      "Upcoming meetings this week",
      "Ongoing tasks and projects",
      "Last week's Teams conversations with your team",
    ],
    copilotPrompt: `Define my top priorities for this week as a manager of [team description].

Use:
- My recent emails (especially from leadership and key stakeholders)
- My upcoming meetings this week
- Ongoing tasks and projects
- Teams conversations from the last 7 days

Output:
- Top 3–5 priorities
- Key actions for each priority (with owner)
- Expected outcome by Friday
- Risks to watch
- A short kickoff message I can post in my team channel

Keep it focused, realistic and actionable.`,
    chatgptPrompt: `Based on the following inputs, define this week's priorities.

Include:
- Top 3–5 priorities
- Key actions for each (with owner)
- Expected outcome by Friday
- Risks to watch
- A short kickoff message for my team channel

Inputs:
[Paste last week's recap, current projects, leadership goals and upcoming meetings]`,
    improvementPrompts: [
      "Reduce to the top 3 priorities only.",
      "Make actions more concrete and outcome-oriented.",
      "Rewrite the kickoff message in a more energising tone.",
    ],
    realWorldAction:
      "Use the list as your weekly plan and post the kickoff message in your team Teams channel Monday morning.",
    timeRange: "5 minutes",
  },

  // ───────────────────────── Project Managers ─────────────────────────
  {
    id: "project-status-summary",
    roleId: "project-managers",
    title: "Project Status Summary",
    description: "Generate a crisp status summary leadership and stakeholders can read in 60 seconds.",
    situation: "You need a quick, shareable overview of project status for leadership or your steering committee.",
    contextSources: [
      "Teams channels for the project",
      "Recent emails with sponsor and stakeholders",
      "Project plan and tracking documents",
      "Stand-up notes from the last 2 weeks",
    ],
    copilotPrompt: `Create a project status summary for project [Project Name].

Use:
- Recent Teams discussions in the project channel
- Relevant emails with the sponsor and stakeholders
- The project plan and tracking documents
- Stand-up notes from the last 2 weeks

Structure:
- Current status (Green / Amber / Red, with one-line justification)
- Key updates since last report
- Risks and blockers
- Next steps for the next 2 weeks
- Decisions or support needed from leadership

Keep it under 200 words and be honest about issues.`,
    chatgptPrompt: `Create a project status summary from these updates.

Structure:
- Current status (Green / Amber / Red)
- Key updates
- Risks and blockers
- Next steps
- Decisions or support needed

Updates:
[Paste project plan excerpts, recent updates and risks]`,
    improvementPrompts: [
      "Make it more concise — under 100 words.",
      "Highlight blockers at the top.",
      "Rewrite for a non-technical executive audience.",
    ],
    realWorldAction:
      "Send the summary to stakeholders by email or paste it into your steering committee deck.",
    timeRange: "5–10 minutes",
  },
  {
    id: "identify-risks",
    roleId: "project-managers",
    title: "Identify Project Risks",
    description: "Proactively surface project risks hiding in your conversations, plans and recent updates.",
    situation: "You sense things may be slipping. You need a structured view of project risks before they escalate.",
    contextSources: [
      "Recent Teams discussions in the project channel",
      "Emails mentioning blockers or concerns",
      "Project updates and stand-up notes",
      "The current project plan and timeline",
    ],
    copilotPrompt: `Identify potential risks in my current project [Project Name].

Use:
- Recent Teams discussions
- Emails mentioning blockers, delays or concerns
- Project updates and stand-up notes from the last 2 weeks
- The current project plan and timeline

Output a top-5 risk register. For each risk include:
- Risk description (1 sentence)
- Likelihood (High / Medium / Low)
- Impact (High / Medium / Low)
- Suggested mitigation action and owner
- Early-warning signal to watch

Order by combined severity (likelihood × impact).`,
    chatgptPrompt: `Identify risks based on these updates.

For each of the top 5 risks include:
- Risk
- Likelihood (High / Medium / Low)
- Impact (High / Medium / Low)
- Mitigation (with owner)
- Early-warning signal

Order by combined severity.

Updates:
[Paste project plan, recent updates, blockers and concerns]`,
    improvementPrompts: [
      "Prioritize the highest-severity risks only.",
      "Add concrete mitigation steps for each risk.",
      "Rewrite as a one-slide executive view.",
    ],
    realWorldAction:
      "Address the top risks early — add them to your risk register and raise the top 3 at your next sponsor sync.",
    timeRange: "5–10 minutes",
  },
  {
    id: "stakeholder-update",
    roleId: "project-managers",
    title: "Stakeholder Update",
    description: "Draft a clear, professional update tailored to a specific stakeholder or audience.",
    situation:
      "A stakeholder, sponsor or leadership group needs an update — and a generic status report won't be enough.",
    contextSources: [
      "Recent project updates and milestones",
      "Past communications with this stakeholder",
      "Emails with the project team",
      "Recent meeting notes",
    ],
    copilotPrompt: `Create a stakeholder update for my project [Project Name], tailored for [Stakeholder Name].

Use:
- Recent project updates and milestones
- Our past emails and Teams chats with this stakeholder
- Emails with the project team
- Recent meeting notes

Structure:
- Progress since last update (focused on what they care about)
- Key updates and changes
- Risks and blockers
- Next steps and timing
- What we need from them (decisions, input, support)

Keep it concise, professional and free of jargon. Maximum 200 words.`,
    chatgptPrompt: `Create a stakeholder update.

Structure:
- Progress
- Key updates
- Risks
- Next steps
- What we need from them

Keep it concise and professional.

Notes:
[Paste stakeholder profile, past concerns, current status and recent changes]`,
    improvementPrompts: [
      "Make it shorter — a 5-bullet Teams message.",
      "Focus on business impact and outcomes.",
      "Add a clear ask in the closing line.",
    ],
    realWorldAction:
      "Send the update to stakeholders or leadership via email or Teams ahead of your next checkpoint.",
    timeRange: "5–10 minutes",
  },
];

export const getRole = (id: string): Role | undefined => roles.find((r) => r.id === id);
export const getWorkflow = (id: string): Workflow | undefined => workflows.find((w) => w.id === id);
export const getWorkflowsByRole = (roleId: RoleId): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId);
