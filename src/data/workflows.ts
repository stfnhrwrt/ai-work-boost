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
    description: "Build a one-page morning briefing covering today's meetings, key emails and priorities.",
    situation:
      "It's early morning and your executive needs a clear, concise overview of the day before they walk into back-to-back meetings.",
    contextSources: [
      "Today's calendar events",
      "Unread and flagged emails from the last 24 hours",
      "Recent Teams chats with key stakeholders",
      "Documents shared overnight",
    ],
    copilotPrompt: `Create a one-page daily briefing for my executive for today.

Use:
- Today's calendar (meetings, attendees, locations)
- Unread and flagged emails from the last 24 hours
- Recent Teams chats with direct reports and key stakeholders
- Any documents shared with us in the last 24 hours

Structure:
- Top 3 priorities for today
- Schedule overview (meeting, time, who, why it matters)
- Decisions or approvals needed today
- Items that can be deferred

Keep it under one page. Use bullet points. Highlight anything time-sensitive.`,
    chatgptPrompt: `Create a one-page daily briefing for an executive based on the notes below.

Structure:
- Top 3 priorities for today
- Schedule overview (meeting, time, who, why it matters)
- Decisions or approvals needed today
- Items that can be deferred

Keep it concise and skimmable. Use bullet points.

Notes:
[Paste calendar, key emails and Teams highlights here]`,
    improvementPrompts: [
      "Make it shorter — half a page maximum.",
      "Add a 'risks to watch today' section at the end.",
      "Rewrite in a more direct, executive tone.",
    ],
    realWorldAction:
      "Send the briefing to your executive in Teams or paste it into the top of their daily agenda before 8 a.m.",
    timeRange: "5–10 minutes",
  },
  {
    id: "summarize-inbox",
    roleId: "executive-assistants",
    title: "Summarize Inbox",
    description: "Turn an overwhelming inbox into a clear list of what needs attention, what can wait and what to delete.",
    situation:
      "You return from a day of meetings to dozens of unread emails. You need to know what actually matters in five minutes.",
    contextSources: [
      "Unread emails in the executive's inbox",
      "Flagged or starred messages",
      "Email threads with VIP contacts",
    ],
    copilotPrompt: `Review my unread and flagged emails from the last 24 hours and produce a triage summary.

Group emails into:
1. Needs response today (with suggested next step)
2. FYI / no action needed
3. Can be archived or deleted

For each item in group 1, include:
- Sender
- One-line summary
- Recommended action and owner

Keep the whole summary under 250 words.`,
    chatgptPrompt: `Triage the following emails into three groups:
1. Needs response today (with suggested next step)
2. FYI / no action needed
3. Can be archived or deleted

For each "needs response" item include sender, one-line summary, and recommended action.

Emails:
[Paste emails or subject + sender + first lines here]`,
    improvementPrompts: [
      "Only show emails from VIPs and direct reports.",
      "Draft short reply suggestions for the top 3 items.",
      "Group by topic instead of by urgency.",
    ],
    realWorldAction:
      "Use the triage list as your action plan: respond to group 1, forward group 2 as FYI, bulk-archive group 3.",
    timeRange: "5–10 minutes",
  },
  {
    id: "prepare-meeting-notes",
    roleId: "executive-assistants",
    title: "Prepare Meeting Notes",
    description: "Generate structured pre-read notes for an upcoming meeting using prior context.",
    situation:
      "Your executive has an important meeting in two hours and needs background, talking points and key questions ready.",
    contextSources: [
      "Previous meetings with the same attendees",
      "Recent emails with attendees",
      "Relevant documents shared in Teams or SharePoint",
      "Calendar invite and agenda",
    ],
    copilotPrompt: `Prepare structured pre-read notes for my executive's upcoming meeting "[Meeting Title]" with [Attendees].

Use:
- The meeting invite and agenda
- Past meetings with the same attendees
- Recent email threads with these attendees
- Any documents shared in Teams or SharePoint about this topic

Structure:
- Meeting purpose (1 sentence)
- Background context (3–5 bullets)
- Key talking points
- Decisions or commitments expected
- Suggested questions to ask
- Open risks

Keep it on one page.`,
    chatgptPrompt: `Prepare structured pre-read notes for an upcoming meeting using the notes below.

Structure:
- Meeting purpose (1 sentence)
- Background context (3–5 bullets)
- Key talking points
- Decisions or commitments expected
- Suggested questions to ask
- Open risks

Notes:
[Paste agenda, past notes, relevant emails and documents]`,
    improvementPrompts: [
      "Add a section with quotes from previous emails that matter for this meeting.",
      "Make the talking points more direct and assertive.",
      "Compress everything into a 5-bullet summary.",
    ],
    realWorldAction:
      "Send the pre-read to your executive 1 hour before the meeting and attach it to the calendar invite.",
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
    chatgptPrompt: `Create a structured 1:1 meeting plan for a manager and their team member, using the notes below.

Structure:
- Key topics to discuss
- Feedback points (positive and constructive)
- Open issues
- Suggested questions to ask

Notes:
[Paste recent interactions, project updates and previous 1:1 notes]`,
    improvementPrompts: [
      "Make it more concise — 5 bullets total.",
      "Focus only on top priorities and blockers.",
      "Add 2 career development questions.",
    ],
    realWorldAction:
      "Open the plan in your 1:1 doc and use it as your live agenda. Capture decisions directly underneath each section.",
    timeRange: "5–10 minutes",
  },
  {
    id: "write-feedback",
    roleId: "managers",
    title: "Write Feedback",
    description: "Draft clear, specific feedback for a team member based on real recent context.",
    situation:
      "You need to give a team member written feedback — for a review, a project debrief or a 1:1 — and want it to be specific, fair and actionable.",
    contextSources: [
      "Teams conversations with the employee",
      "Project documents they've contributed to",
      "Recent meetings where they participated",
      "Emails with stakeholders about their work",
    ],
    copilotPrompt: `Draft written feedback for [Employee Name] based on their work over the last [time period].

Use:
- Our Teams conversations
- Documents they've authored or contributed to
- Meetings where they presented or participated
- Stakeholder emails referencing their work

Structure the feedback as:
- 2–3 specific strengths with concrete examples
- 1–2 areas to improve, with concrete examples
- Suggested next steps for development

Tone: direct, supportive, fact-based. Avoid generic phrases.`,
    chatgptPrompt: `Draft written feedback for an employee based on the notes below.

Structure:
- 2–3 specific strengths with concrete examples
- 1–2 areas to improve with concrete examples
- Suggested next steps for development

Tone: direct, supportive, fact-based.

Notes:
[Paste examples of their work, contributions, behaviours and outcomes]`,
    improvementPrompts: [
      "Make the tone warmer without losing directness.",
      "Add one example for each strength and growth area.",
      "Rewrite as if I'm delivering it verbally in a 1:1.",
    ],
    realWorldAction:
      "Paste the draft into your performance tool or 1:1 doc, edit any names or specifics, then share or deliver verbally.",
    timeRange: "5–10 minutes",
  },
  {
    id: "define-weekly-priorities",
    roleId: "managers",
    title: "Define Weekly Priorities",
    description: "Turn a noisy week of inputs into 3–5 clear team priorities you can communicate Monday morning.",
    situation:
      "It's Sunday evening or Monday morning and you need to align your team on what actually matters this week.",
    contextSources: [
      "Last week's Teams chats with your team",
      "Project status updates and dashboards",
      "Emails from leadership about company priorities",
      "Calendar for the upcoming week",
    ],
    copilotPrompt: `Help me define this week's priorities for my team of [team description].

Use:
- Teams conversations from the last 7 days
- Recent project updates and status documents
- Emails from leadership and stakeholders
- Meetings scheduled this week

Output:
- Top 3–5 priorities for the team this week
- For each priority: why it matters, who owns it, expected outcome by Friday
- Anything we should explicitly deprioritise this week
- A short kickoff message I can post in our team channel

Keep it actionable and direct.`,
    chatgptPrompt: `Help me define this week's priorities for my team based on the notes below.

Output:
- Top 3–5 priorities
- For each: why it matters, owner, expected outcome by Friday
- Anything to deprioritise
- A short kickoff message I can post in our team channel

Notes:
[Paste last week's recap, current projects, leadership goals and upcoming meetings]`,
    improvementPrompts: [
      "Cut to the top 3 priorities only.",
      "Rewrite the kickoff message in a more energising tone.",
      "Add a metric or success criterion to each priority.",
    ],
    realWorldAction:
      "Post the kickoff message in your team Teams channel Monday morning and use the priorities to anchor your weekly stand-up.",
    timeRange: "5–10 minutes",
  },

  // ───────────────────────── Project Managers ─────────────────────────
  {
    id: "project-status-summary",
    roleId: "project-managers",
    title: "Project Status Summary",
    description: "Generate a crisp status update that leadership can read in 60 seconds.",
    situation: "Leadership has asked for a quick status update on your project and you have 10 minutes to deliver it.",
    contextSources: [
      "Project plan and tracking documents",
      "Teams conversations in the project channel",
      "Recent stand-up notes",
      "Emails with the project sponsor",
    ],
    copilotPrompt: `Create a leadership-ready status summary for project [Project Name].

Use:
- The latest project plan and tracking documents
- Recent Teams conversations in the project channel
- Stand-up notes from the last 2 weeks
- Recent emails with the project sponsor

Structure (RAG-style):
- Overall status: Green / Amber / Red, with one-line justification
- Progress since last update (3 bullets)
- Key milestones for the next 2 weeks
- Top risks and mitigations
- Decisions or support needed from leadership

Keep it under 200 words. Be honest about issues.`,
    chatgptPrompt: `Create a leadership-ready status summary for a project based on the notes below.

Structure:
- Overall status (Green / Amber / Red) with one-line justification
- Progress since last update (3 bullets)
- Upcoming milestones (next 2 weeks)
- Top risks and mitigations
- Decisions or support needed from leadership

Notes:
[Paste project plan excerpts, recent updates and risks]`,
    improvementPrompts: [
      "Make it shorter — under 100 words.",
      "Rewrite for an audience of non-technical executives.",
      "Add a one-sentence headline at the top.",
    ],
    realWorldAction:
      "Paste the summary into your status email or steering committee deck. Send before your next leadership review.",
    timeRange: "5–10 minutes",
  },
  {
    id: "identify-risks",
    roleId: "project-managers",
    title: "Identify Risks",
    description: "Surface project risks hiding in your conversations, plans and recent updates.",
    situation: "You sense things are slipping but can't articulate why. You need a structured view of project risks.",
    contextSources: [
      "Project plan and timeline",
      "Teams conversations in the project channel",
      "Recent meeting notes and stand-ups",
      "Emails flagging blockers or delays",
    ],
    copilotPrompt: `Analyse my project [Project Name] and identify the most important risks right now.

Use:
- The project plan and current timeline
- Teams conversations from the last 2 weeks
- Meeting notes and stand-up summaries
- Emails mentioning blockers, delays or concerns

Output a risk register with the top 5 risks. For each risk include:
- Risk description (1 sentence)
- Likelihood (High / Medium / Low)
- Impact (High / Medium / Low)
- Mitigation action and owner
- Trigger or signal to watch

Order them by combined severity (likelihood × impact).`,
    chatgptPrompt: `Build a project risk register based on the notes below.

For the top 5 risks, include:
- Risk description (1 sentence)
- Likelihood (High / Medium / Low)
- Impact (High / Medium / Low)
- Mitigation action and owner
- Trigger or signal to watch

Order by combined severity.

Notes:
[Paste project plan, recent updates, blockers and concerns]`,
    improvementPrompts: [
      "Focus only on risks that could miss the next milestone.",
      "Add an early-warning indicator for each risk.",
      "Rewrite as a one-slide executive view.",
    ],
    realWorldAction:
      "Add the top 3 risks to your risk register and raise them in your next steering committee or sponsor sync.",
    timeRange: "5–10 minutes",
  },
  {
    id: "stakeholder-update",
    roleId: "project-managers",
    title: "Stakeholder Update",
    description: "Draft a tailored update for a specific stakeholder based on what they actually care about.",
    situation:
      "A specific stakeholder (sponsor, client or department lead) needs an update — and a generic status report won't do.",
    contextSources: [
      "Past communications with this stakeholder",
      "Their stated priorities and concerns",
      "Latest project status and milestones",
      "Recent decisions and changes",
    ],
    copilotPrompt: `Draft a tailored project update for [Stakeholder Name] about project [Project Name].

Use:
- Our past emails and Teams chats with this stakeholder
- Their stated priorities and previous questions
- The latest project status, milestones and changes
- Any recent decisions affecting their area

Structure:
- Personal opening (1 line) referencing their priorities
- What's progressed (focused on what they care about)
- What's changed since they were last updated
- What we need from them (decisions, input, support)
- Next checkpoint and timing

Tone: clear, professional, no jargon. Maximum 200 words.`,
    chatgptPrompt: `Draft a tailored project update email for a stakeholder based on the notes below.

Structure:
- Personal opening referencing their priorities
- What's progressed (focused on what they care about)
- What's changed since the last update
- What we need from them
- Next checkpoint and timing

Tone: clear, professional, no jargon. Maximum 200 words.

Notes:
[Paste stakeholder profile, past concerns, current status and recent changes]`,
    improvementPrompts: [
      "Make it more formal — for a board-level audience.",
      "Cut it to a 5-bullet Teams message.",
      "Add a clear ask in the closing line.",
    ],
    realWorldAction:
      "Send the update directly via email or Teams to the stakeholder ahead of your next checkpoint with them.",
    timeRange: "5–10 minutes",
  },
];

export const getRole = (id: string): Role | undefined => roles.find((r) => r.id === id);
export const getWorkflow = (id: string): Workflow | undefined => workflows.find((w) => w.id === id);
export const getWorkflowsByRole = (roleId: RoleId): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId);
