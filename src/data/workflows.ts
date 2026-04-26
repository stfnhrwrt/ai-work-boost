import { Briefcase, Users, KanbanSquare, LucideIcon } from "lucide-react";

export type RoleId = "executive-assistants" | "managers" | "project-managers";

/**
 * Workflow level
 *  - essential: core, ready-to-run prompts (Level 0)
 *  - advanced:  Level 1 — multi-source prompts that depend on access permissions
 *  - agent:     Level 2 — reusable Copilot agents (Copilot Studio)
 *  - scheduled: Level 3 — recurring automations (Power Automate)
 */
export type WorkflowLevel = "essential" | "advanced" | "agent" | "scheduled";

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
  level: WorkflowLevel;
  title: string;
  description: string;
  situation: string;
  contextSources: string[];
  /** Shown as a prominent "Access Matters" callout for advanced+ workflows */
  accessNote?: string;
  copilotPrompt: string;
  chatgptPrompt: string;
  improvementPrompts: string[];
  realWorldAction: string;
  timeRange: string;
  /** For level: "agent" — Copilot Studio agent definition */
  agent?: {
    purpose: string;
    instruction: string;
    triggerExample: string;
    benefit: string;
    setupSteps: string[];
  };
  /** For level: "scheduled" — Power Automate scheduled flow */
  scheduled?: {
    purpose: string;
    schedule: string;
    setupSteps: string[];
    output: string;
  };
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
  // ───────────────────────── Executive Assistants — Essentials ─────────────────────────
  {
    id: "daily-executive-briefing",
    roleId: "executive-assistants",
    level: "essential",
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
    level: "essential",
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
    level: "essential",
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

  // ───────────────────────── Executive Assistants — Level 1: Advanced ─────────────────────────
  {
    id: "manage-multi-mailbox",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Manage Executive Inbox Across Multiple Mailboxes",
    description:
      "Triage your executive's mailbox and any shared mailboxes you have access to — in one structured view.",
    situation:
      "You manage your executive's inbox and possibly additional shared mailboxes. You need one consolidated, prioritized view.",
    contextSources: [
      "Executive mailbox (delegate access)",
      "Shared mailboxes you can access",
      "Recent email threads from the last 24–48 hours",
    ],
    accessNote:
      "Copilot can only use emails you have permission to access. If you have delegate access to your executive's mailbox, Copilot can use that context. Verify your delegation in Outlook before relying on the output.",
    copilotPrompt: `Review the emails in the mailboxes I have access to (my executive's mailbox and any shared mailboxes).

Identify:
- Urgent emails requiring immediate attention
- Emails that need a response from the executive
- Emails that can be delegated (and to whom)
- Emails that are FYI only

Group them by mailbox and by priority, and suggest a clear next action for each item.`,
    chatgptPrompt: `Analyze the following emails.

Identify:
- Urgent items
- Required actions (with owner)
- Suggested responses
- Items that can be delegated

Emails:
[Paste emails grouped by mailbox here]`,
    improvementPrompts: [
      "Prioritize only the top 5 urgent items.",
      "Add suggested reply drafts for the top items.",
      "Show only items that need the executive personally.",
    ],
    realWorldAction:
      "Use the output to triage the inbox: respond, delegate, or schedule. Prepare draft replies for the executive to review.",
    timeRange: "5–10 minutes",
  },
  {
    id: "draft-executive-responses",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Draft Executive Responses from Email Context",
    description:
      "Draft on-brand replies on behalf of your executive that match their tone and previous responses.",
    situation: "You need to draft a reply on behalf of your executive that sounds like them — not like a template.",
    contextSources: [
      "The current email thread",
      "Previous responses from the executive",
      "The executive's typical tone and phrasing",
    ],
    accessNote:
      "Copilot can reference tone and style from past emails only if you have access to those emails. Always have the executive review before sending.",
    copilotPrompt: `Draft a response to the latest email in this thread, on behalf of my executive.

Use:
- Previous responses from this conversation
- Past emails from my executive (for tone and style)

Make the response:
- Professional
- Concise
- Aligned with how my executive normally writes

Provide 2 versions: one slightly more formal, one slightly warmer.`,
    chatgptPrompt: `Draft a professional response based on this email thread, written in the style of a senior executive.

Provide 2 versions: one slightly more formal, one slightly warmer.

Thread:
[Paste full email thread here]`,
    improvementPrompts: [
      "Make the tone more formal.",
      "Make the tone warmer and more personal.",
      "Shorten the response to under 80 words.",
    ],
    realWorldAction:
      "Refine the draft, confirm with your executive (or use your delegated authority), then send from their mailbox.",
    timeRange: "5 minutes",
  },
  {
    id: "meeting-brief-full-context",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Prepare Meeting Brief Using Full Context",
    description:
      "Pull calendar, emails, Teams discussions and attached documents into one full-context briefing.",
    situation:
      "Your executive has an important meeting and needs a complete briefing pulling from every relevant source.",
    contextSources: [
      "The calendar event and invite",
      "Emails related to the meeting topic",
      "Teams discussions with the attendees",
      "Documents attached or linked in the invite",
    ],
    accessNote:
      "Copilot works best when the meeting invite, attendees and related documents are properly linked. If files are stored in SharePoint or OneDrive, ensure you have access — Copilot only sees what you can open.",
    copilotPrompt: `Prepare a briefing for my executive's upcoming meeting "[Meeting Title]" with [Attendees].

Use:
- The meeting invite (date, attendees, agenda)
- Emails related to this meeting topic
- Relevant Teams discussions with the attendees
- Any documents attached or linked in the invite

Structure:
- Meeting objective (1 sentence)
- Participants (with role)
- Key topics
- Decision points expected
- Risks or sensitive issues
- Suggested talking points

Keep it on one page.`,
    chatgptPrompt: `Create a meeting briefing using the materials below.

Structure:
- Meeting objective
- Participants
- Key topics
- Decision points
- Risks
- Suggested talking points

Materials:
[Paste invite, related emails, Teams notes and document excerpts here]`,
    improvementPrompts: [
      "Focus only on decision points.",
      "Highlight risks and sensitive issues at the top.",
      "Compress everything into a 5-bullet summary.",
    ],
    realWorldAction:
      "Send the briefing to your executive 60 minutes before the meeting and attach it to the calendar invite.",
    timeRange: "5–10 minutes",
  },

  // ───────────────────────── Executive Assistants — Level 2: Agents ─────────────────────────
  {
    id: "agent-daily-briefing",
    roleId: "executive-assistants",
    level: "agent",
    title: "Executive Daily Briefing Agent",
    description:
      "Build a reusable Copilot agent that generates your executive's daily briefing on demand — every time, in the same format.",
    situation:
      "You produce a daily briefing for your executive every morning. You want it to be repeatable, consistent and triggerable in one sentence.",
    contextSources: [
      "Calendar events for the day",
      "Recent emails (last 24–48 hours)",
      "Teams discussions with key stakeholders",
    ],
    accessNote:
      "Agents only see what the user running them can access. Build and test the agent with the same account that has the right delegate permissions, and respect your company's data policies.",
    copilotPrompt: `You are an executive assistant agent.

Every time you are triggered, create a daily executive briefing.

Use:
- Today's calendar events
- Recent emails (last 24–48 hours)
- Important Teams discussions

Output (in this exact order):
- Top 3 priorities for today
- Meetings (time, attendees, purpose, 1–2 prep bullets)
- Key updates since yesterday
- Risks / issues to watch

Keep it under one page. Be direct and executive-ready.`,
    chatgptPrompt: `You are an assistant generating a daily executive briefing from the inputs below.

Output:
- Top 3 priorities
- Meetings (time, attendees, purpose, prep bullets)
- Key updates
- Risks / issues

Inputs:
[Paste calendar, emails and Teams notes]`,
    improvementPrompts: [
      "Add a closing line with 'what to ignore today'.",
      "Output as a Teams-ready message.",
      "Add a 1-line headline at the very top.",
    ],
    realWorldAction:
      "Trigger the agent each morning by asking 'Create my daily briefing' — then forward the output to your executive.",
    timeRange: "Setup: 15 min · Run: 1 min",
    agent: {
      purpose: "Automatically generate a consistent daily briefing on demand.",
      instruction: `You are an executive assistant.
Every time you are triggered, create a daily executive briefing.

Use:
- Calendar events
- Recent emails
- Teams discussions

Output:
- Meetings
- Key updates
- Risks
- Preparation notes`,
      triggerExample: 'User asks: "Create my daily briefing"',
      benefit: "Reusable, consistent quality, saves time every single day.",
      setupSteps: [
        "Open Copilot Studio (or your company's Copilot agent builder).",
        "Create a new agent and give it a clear name (e.g. 'Daily Briefing').",
        "Paste the agent instruction below into the system prompt.",
        "Connect the data sources the agent should use (calendar, mail, Teams).",
        "Test with the example trigger and refine the output format.",
        "Publish the agent to yourself (or your team).",
      ],
    },
  },
  {
    id: "agent-email-triage",
    roleId: "executive-assistants",
    level: "agent",
    title: "Email Triage Assistant Agent",
    description:
      "A Copilot agent that categorizes the inbox into urgent, response needed, delegate and FYI — every time, the same way.",
    situation:
      "You triage your executive's inbox multiple times a day. Turn that recurring task into a reusable agent.",
    contextSources: [
      "Executive mailbox (with delegate access)",
      "Shared mailboxes you can access",
      "Past triage decisions for tone and style",
    ],
    accessNote:
      "The agent inherits your access — it can only see emails you can open. Verify delegate permissions in Outlook before relying on the output for the executive's mailbox.",
    copilotPrompt: `You are an assistant helping manage an executive inbox.

When triggered, analyze recent emails I have access to and:
- Identify urgent messages requiring immediate attention
- Suggest a short response for emails that need one
- Categorize emails as: Urgent, Needs Response, Delegate, FYI
- Flag anything that requires the executive personally

Output a clean table grouped by category.`,
    chatgptPrompt: `Act as an assistant helping triage an executive inbox.

For each email below, output:
- Category: Urgent / Needs Response / Delegate / FYI
- Suggested action (or short reply)
- Who should handle it

Emails:
[Paste recent emails here]`,
    improvementPrompts: [
      "Only show items in the 'Urgent' and 'Needs Response' categories.",
      "Add a suggested reply for each 'Needs Response' item.",
      "Group by sender instead of category.",
    ],
    realWorldAction:
      "Run the agent at the start of the morning, after lunch and end of day. Act on the categorized list immediately.",
    timeRange: "Setup: 15 min · Run: 2 min",
    agent: {
      purpose: "Turn inbox management into a repeatable, structured system.",
      instruction: `You are an assistant helping manage an executive inbox.

When analyzing emails:
- Identify urgent messages
- Suggest responses
- Categorize emails (Urgent / Needs Response / Delegate / FYI)`,
      triggerExample: 'User asks: "Review my inbox and categorize emails"',
      benefit: "Repeatable inbox triage with consistent categories — fewer missed urgent items.",
      setupSteps: [
        "Open Copilot Studio.",
        "Create a new agent named 'Inbox Triage'.",
        "Paste the agent instruction below into the system prompt.",
        "Connect the agent to the mailboxes you have delegate access to.",
        "Define the output format (table or grouped list).",
        "Test with a real day's inbox and refine.",
      ],
    },
  },

  // ───────────────────────── Executive Assistants — Level 3: Scheduled ─────────────────────────
  {
    id: "scheduled-morning-briefing",
    roleId: "executive-assistants",
    level: "scheduled",
    title: "Daily Morning Briefing Automation",
    description:
      "Schedule a Power Automate flow that generates and sends the daily briefing to your executive every morning.",
    situation:
      "You want the daily briefing to land in your executive's inbox or Teams every morning — without you running it manually.",
    contextSources: [
      "Today's calendar events",
      "Recent emails",
      "Teams discussions",
    ],
    accessNote:
      "Scheduled flows run with your account's permissions and require Microsoft Power Automate (and Copilot AI actions enabled). Confirm with IT that scheduled Copilot triggers and the data sources you need are allowed under your company's data policy.",
    copilotPrompt: `Create a daily executive briefing for today.

Use:
- Today's calendar
- Recent emails (last 24 hours)
- Teams updates

Output:
- Top 3 priorities
- Meetings (time, attendees, purpose, prep notes)
- Key updates
- Risks

Format the output as a clean email body with a clear subject line.`,
    chatgptPrompt: `Create a daily executive briefing from the inputs below.

Output:
- Top 3 priorities
- Meetings
- Key updates
- Risks

Inputs:
[Paste calendar, emails, Teams updates]`,
    improvementPrompts: [
      "Add a 1-line headline subject for the email.",
      "Format as a Teams adaptive card.",
      "Add a 'what to ignore today' section.",
    ],
    realWorldAction:
      "Once scheduled, the briefing arrives automatically. Review it before your executive does and add any human touches.",
    timeRange: "Setup: 20 min · Runs daily",
    scheduled: {
      purpose: "Automatically generate and send a daily morning briefing.",
      schedule: "Every weekday at 7:00 a.m. (your time zone)",
      output: "Sent via email or Teams to your executive.",
      setupSteps: [
        "Open Microsoft Power Automate.",
        "Create a new scheduled cloud flow (every weekday at 7:00 a.m.).",
        "Add a Copilot or AI Builder action and paste the prompt below.",
        "Connect calendar, mail and Teams as data sources.",
        "Add a final step: 'Send an email' (to your executive) or 'Post message in Teams'.",
        "Test the flow once manually, then enable the schedule.",
      ],
    },
  },
  {
    id: "scheduled-end-of-day",
    roleId: "executive-assistants",
    level: "scheduled",
    title: "End-of-Day Summary Automation",
    description:
      "Schedule a flow that summarizes the day's activity, open tasks and tomorrow's follow-ups — sent every evening.",
    situation:
      "Your executive wants a quick wrap-up at the end of every day so they can plan tomorrow without scrolling.",
    contextSources: [
      "Today's emails",
      "Today's Teams activity",
      "Today's calendar (completed meetings)",
    ],
    accessNote:
      "Scheduled flows run on your account's permissions. Make sure all data sources used by the flow are accessible and compliant with your company's data policy.",
    copilotPrompt: `Summarize today's activities for my executive.

Include:
- Key actions completed today
- Open tasks remaining
- Decisions made
- Follow-ups needed for tomorrow
- Top 3 priorities for tomorrow morning

Format as a short email body suitable for end-of-day delivery.`,
    chatgptPrompt: `Summarize today's activities for an executive.

Include:
- Key actions completed
- Open tasks
- Decisions made
- Follow-ups for tomorrow
- Top 3 priorities for tomorrow

Inputs:
[Paste today's emails, Teams activity and meeting outcomes]`,
    improvementPrompts: [
      "Make it shorter — 5 bullets total.",
      "Format as a Teams message instead of email.",
      "Add a quick 'wins of the day' line at the top.",
    ],
    realWorldAction:
      "Once scheduled, the summary lands automatically. Use it as your own end-of-day checkpoint before logging off.",
    timeRange: "Setup: 20 min · Runs daily",
    scheduled: {
      purpose: "Automatically wrap up the day and prepare tomorrow.",
      schedule: "Every weekday at 6:00 p.m. (your time zone)",
      output: "Sent via email or Teams to your executive.",
      setupSteps: [
        "Open Microsoft Power Automate.",
        "Create a new scheduled cloud flow (every weekday at 6:00 p.m.).",
        "Add a Copilot or AI Builder action and paste the prompt below.",
        "Connect today's emails, Teams activity and calendar as data sources.",
        "Add a 'Send an email' or 'Post in Teams' step targeting your executive.",
        "Test once, then enable the schedule.",
      ],
    },
  },

  // ───────────────────────── Managers ─────────────────────────
  {
    id: "prepare-1-1-meeting",
    roleId: "managers",
    level: "essential",
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
    level: "essential",
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
    level: "essential",
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
    level: "essential",
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
    level: "essential",
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
    level: "essential",
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

export const LEVEL_META: Record<
  WorkflowLevel,
  { label: string; shortLabel: string; description: string; cardBadge: string }
> = {
  essential: {
    label: "Essentials",
    shortLabel: "Essentials",
    description: "Core, ready-to-run prompts you can copy and use today.",
    cardBadge: "Essential",
  },
  advanced: {
    label: "Level 1 — Advanced workflows",
    shortLabel: "Advanced",
    description:
      "Multi-source prompts that depend on the access and delegate permissions you already have.",
    cardBadge: "Advanced",
  },
  agent: {
    label: "Level 2 — Build your own agent",
    shortLabel: "Agents",
    description:
      "Reusable Copilot agents (built in Copilot Studio) that turn a recurring task into a one-click workflow.",
    cardBadge: "Agent",
  },
  scheduled: {
    label: "Level 3 — Scheduled automations",
    shortLabel: "Scheduled",
    description:
      "Recurring flows in Microsoft Power Automate that run your prompt on a schedule and deliver results automatically.",
    cardBadge: "Scheduled",
  },
};

export const getRole = (id: string): Role | undefined => roles.find((r) => r.id === id);
export const getWorkflow = (id: string): Workflow | undefined => workflows.find((w) => w.id === id);
export const getWorkflowsByRole = (roleId: RoleId): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId);
export const getWorkflowsByRoleAndLevel = (roleId: RoleId, level: WorkflowLevel): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId && w.level === level);
export const getLevelsForRole = (roleId: RoleId): WorkflowLevel[] => {
  const order: WorkflowLevel[] = ["essential", "advanced", "agent", "scheduled"];
  const present = new Set(workflows.filter((w) => w.roleId === roleId).map((w) => w.level));
  return order.filter((l) => present.has(l));
};
