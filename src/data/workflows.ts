import { Briefcase, Users, KanbanSquare, LucideIcon } from "lucide-react";

export type RoleId = "executive-assistants" | "managers" | "project-managers";

/**
 * Workflow level
 *  - essential:  core, ready-to-run prompts (Level 0)
 *  - advanced:   Level 1 — multi-source prompts that depend on access permissions
 *  - agent:      Level 2 — reusable Copilot agents (Copilot Studio)
 *  - scheduled:  Level 3 — recurring native Copilot Scheduled Prompts
 *  - automation: Level 4 — Outlook + Copilot + Power Automate combined automations
 */
export type WorkflowLevel =
  | "essential"
  | "advanced"
  | "agent"
  | "scheduled"
  | "automation";

export type AutomationLayer = "outlook-rule" | "copilot" | "power-automate";
export type SharedMailboxSupport = "yes" | "limited" | "no";

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
  /** Conservative time saved per use, e.g. "~25 min". Compared to doing it manually. */
  timeSaved?: string;
  /** Optional micro-tip shown under the prompt block */
  promptTip?: string;
  /** Optional micro-tip shown under the improvement prompts */
  improvementTip?: string;
  /** Optional micro-tip shown in the context source section */
  contextTip?: string;
  /** Extra tips rendered after improvement (max 1–2) */
  extraTips?: string[];
  /** For level: "agent" — Copilot Studio agent definition */
  agent?: {
    purpose: string;
    instruction: string;
    triggerExample: string;
    benefit: string;
    setupSteps: string[];
  };
  /** For level: "scheduled" — recurring prompt automation */
  scheduled?: {
    purpose: string;
    schedule: string;
    setupSteps: string[];
    output: string;
    /** Where the result appears (Copilot chat, Teams notification, email…) */
    outputLocation?: string;
    /** "copilot" = native Scheduled Prompt (preferred). "power-automate" = full flow */
    mechanism?: "copilot" | "power-automate";
    /** Optional Power Automate alternative when the native option is limited */
    powerAutomateAlt?: string;
  };
  /** Which layers this workflow combines (Outlook rules, Copilot, Power Automate) */
  automationLayers?: AutomationLayer[];
  /** Does this work on a shared mailbox? */
  sharedMailboxSupport?: SharedMailboxSupport;
  /** Permissions required (e.g. "Delegate access to executive mailbox") */
  requiresPermissions?: string;
  /** For level: "automation" — Outlook / rule setup steps */
  outlookSetup?: {
    title: string;
    steps: string[];
    note?: string;
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
    promptTip:
      "Mention where the data comes from (calendar, emails, Teams). Copilot will pull that context automatically.",
    improvementPrompts: [
      "Make it more concise — half a page maximum.",
      "Highlight the top 3 priorities at the very top.",
      "Rewrite in a more direct, executive tone.",
    ],
    improvementTip:
      "You rarely get the best result in one try. Short follow-up prompts improve quality significantly.",
    realWorldAction:
      "Send the briefing to your executive in Teams or email before the day starts (ideally before 8 a.m.).",
    timeRange: "5–10 minutes",
    timeSaved: "~20 min saved",
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
    timeSaved: "~25 min saved",
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
    timeSaved: "~20 min saved per run",
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
    timeSaved: "~25 min saved per run",
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

  // ───────────────────────── Executive Assistants — Level 3: Scheduled Prompts ─────────────────────────
  {
    id: "scheduled-morning-briefing",
    roleId: "executive-assistants",
    level: "scheduled",
    title: "Daily Inbox + Calendar Briefing (Automated)",
    description:
      "A native Copilot Scheduled Prompt that runs every weekday morning and drops your executive briefing into Copilot chat.",
    situation:
      "You want a daily overview of your executive's priorities every morning — without opening Copilot and re-typing the prompt yourself.",
    contextSources: [
      "Executive mailbox (delegate access required)",
      "Calendar (today's meetings)",
      "Teams chats you're part of",
    ],
    accessNote:
      "Copilot can only read mailboxes you have delegate access to, meetings you're invited to, and Teams chats you're part of. If the briefing looks incomplete, check your delegate permissions first — not the prompt.",
    copilotPrompt: `Create a daily executive briefing.

Use:
- Today's calendar
- Recent emails (last 24 hours)
- Important Teams messages

Output:
- Top 3 priorities
- Urgent emails (sender + 1-line summary)
- Key meetings with prep notes
- Open items needing my executive's attention

Format as a short, scannable email body with a 1-line subject.`,
    chatgptPrompt: `Create a daily executive briefing from the inputs below.

Output:
- Top 3 priorities
- Urgent emails
- Key meetings with prep notes
- Open items

Inputs:
[Paste calendar, recent emails, Teams updates]`,
    improvementPrompts: [
      "Add a 1-line headline subject for the email.",
      "Add a 'what to ignore today' section.",
      "Format as a Teams adaptive card.",
    ],
    realWorldAction:
      "Once scheduled, the briefing lands in Copilot chat (or Teams) every morning. Review it, add a human touch, then forward to your executive.",
    timeRange: "Setup: 5 min · Runs daily",
    timeSaved: "~15 min/day after setup",
    promptTip:
      "Keep the structure consistent every day — your executive builds trust faster when the format never changes.",
    scheduled: {
      mechanism: "copilot",
      purpose: "Generate the morning briefing automatically every weekday.",
      schedule: "Every weekday at 7:30 a.m.",
      output: "Posted to Copilot chat (and optional Teams notification).",
      outputLocation: "Microsoft 365 Copilot chat — Teams or Outlook",
      setupSteps: [
        "Open Microsoft 365 Copilot in Teams or Outlook (must be in Work mode, not Web mode).",
        "Run the prompt below once to confirm the output looks right.",
        "Click the '…' (three dots) next to the response.",
        "Select 'Schedule this prompt'.",
        "Set frequency: every weekday at 7:30 a.m.",
        "Choose where the result should appear (Copilot chat or Teams notification).",
      ],
      powerAutomateAlt:
        "If your tenant limits scheduled prompts, recreate the same flow in Power Automate with a Copilot/AI Builder action and a 'Send email' or 'Post in Teams' step.",
    },
  },
  {
    id: "scheduled-end-of-day",
    roleId: "executive-assistants",
    level: "scheduled",
    title: "End-of-Day Executive Summary (Automated)",
    description:
      "A scheduled prompt that wraps up the day — completed actions, open follow-ups and what needs attention tomorrow.",
    situation:
      "You want a clean end-of-day summary for your executive every evening, ready to send or self-review before logging off.",
    contextSources: [
      "Today's emails (sent + received)",
      "Today's meetings (completed)",
      "Today's Teams conversations",
    ],
    accessNote:
      "Copilot only sees the mailboxes, meetings and chats you have access to. If the summary misses items, the gap is almost always a permission gap — not a Copilot failure.",
    copilotPrompt: `Summarize today's activities for my executive.

Include:
- Key decisions made today
- Completed actions
- Open follow-ups (with owner)
- What needs attention tomorrow

Format as a short, ready-to-send email body.`,
    chatgptPrompt: `Summarize today's activities for an executive.

Include:
- Key decisions
- Completed actions
- Open follow-ups
- What needs attention tomorrow

Inputs:
[Paste today's emails, Teams activity and meeting outcomes]`,
    improvementPrompts: [
      "Make it shorter — 5 bullets total.",
      "Add a 'wins of the day' line at the top.",
      "Highlight anything blocked waiting on my executive.",
    ],
    realWorldAction:
      "Use the result as your end-of-day checkpoint. Review, then forward to your executive before you log off.",
    timeRange: "Setup: 5 min · Runs daily",
    improvementTip:
      "Ask Copilot to highlight 'what needs attention tomorrow' — it turns a summary into a planning tool.",
    scheduled: {
      mechanism: "copilot",
      purpose: "Wrap up the day automatically and prepare tomorrow.",
      schedule: "Every weekday at 5:00 p.m.",
      output: "A ready-to-send summary email body in Copilot chat.",
      outputLocation: "Microsoft 365 Copilot chat",
      setupSteps: [
        "Open Microsoft 365 Copilot (Teams or Outlook), in Work mode.",
        "Run the prompt below once manually.",
        "Click the '…' on the response and choose 'Schedule this prompt'.",
        "Set: every weekday at 5:00 p.m.",
        "Confirm the output location (Copilot chat or Teams notification).",
      ],
      powerAutomateAlt:
        "Power Automate alternative: scheduled flow at 5 p.m. → Copilot/AI action → 'Send email' step.",
    },
  },
  {
    id: "scheduled-weekly-prep",
    roleId: "executive-assistants",
    level: "scheduled",
    title: "Weekly Executive Prep (Friday Automation)",
    description:
      "A Friday-afternoon scheduled prompt that previews next week — meetings, prep needed, open risks.",
    situation:
      "You want to walk into Monday already prepared. Friday afternoon is the perfect moment to look ahead.",
    contextSources: [
      "Next week's calendar",
      "Open email threads",
      "Ongoing Teams topics and projects",
    ],
    accessNote:
      "The preview only covers meetings, mailboxes and chats your account can access. For shared mailboxes or your executive's calendar, delegate access must already be granted.",
    copilotPrompt: `Prepare a weekly executive preparation summary for next week.

Include:
- Next week's key meetings (with attendees and purpose)
- Required preparation per meeting
- Open topics carried over from this week
- Risks or decisions that need my executive's attention

Format as a short planning document, grouped by day.`,
    chatgptPrompt: `Prepare a weekly executive preparation summary for next week.

Include:
- Key meetings (attendees, purpose)
- Required preparation
- Open topics
- Risks and decisions needed

Inputs:
[Paste next week's calendar and ongoing topics]`,
    improvementPrompts: [
      "Group by day instead of by topic.",
      "Add an estimated prep time per meeting.",
      "Highlight any meeting still missing an agenda.",
    ],
    realWorldAction:
      "Use Friday afternoon to scan the document, line up prep work and send your executive a short Monday-readiness note.",
    timeRange: "Setup: 5 min · Runs weekly",
    timeSaved: "~30 min/week after setup",
    extraTips: [
      "This is one of the highest-value automations for assistants — it converts reactive Mondays into planned ones.",
    ],
    scheduled: {
      mechanism: "copilot",
      purpose: "Preview next week and surface required preparation every Friday.",
      schedule: "Every Friday at 3:00 p.m.",
      output: "A weekly planning document in Copilot chat.",
      outputLocation: "Microsoft 365 Copilot chat",
      setupSteps: [
        "Open Microsoft 365 Copilot in Work mode.",
        "Run the prompt manually once and refine the output.",
        "Click '…' → 'Schedule this prompt'.",
        "Set: every Friday at 3:00 p.m.",
        "Pick where results should appear (Copilot chat or Teams).",
      ],
      powerAutomateAlt:
        "Power Automate alternative: weekly recurrence (Friday 15:00) → Copilot action → 'Send email' to yourself with the planning doc.",
    },
  },

  // ───────────────────────── Executive Assistants — Level 1: Advanced (high-value) ─────────────────────────
  {
    id: "ea-talking-points",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Prepare Executive Talking Points",
    description:
      "Turn recent conversations and stakeholder context into ready-to-use talking points for upcoming discussions.",
    situation:
      "Your executive has a discussion coming up and needs sharp talking points based on what's actually been said across email, Teams and meetings.",
    contextSources: [
      "Recent Teams chats with stakeholders",
      "Email threads on the topic",
      "Meeting notes from related discussions",
    ],
    accessNote:
      "Copilot can only pull from chats and mailboxes you (or your executive, via delegate access) can read. If a key thread is missing, that's a permission gap.",
    copilotPrompt: `Create executive talking points for an upcoming discussion on [TOPIC] with [PERSON / GROUP].

Use:
- Recent conversations on this topic (Teams + email)
- Key positions of the people involved
- Open questions and stakeholder concerns

Output:
- 5–7 bullet talking points
- Suggested responses to likely objections
- 2–3 questions my executive should ask`,
    chatgptPrompt: `Create executive talking points for a discussion on [TOPIC] with [PERSON].

Output:
- 5–7 talking points
- Suggested responses to likely objections
- 2–3 questions to ask

Inputs:
[Paste recent emails, chats and meeting notes]`,
    improvementPrompts: [
      "Add likely objections and a one-line counter for each.",
      "Reorder by strategic priority.",
      "Make it tighter — 4 talking points max.",
    ],
    realWorldAction:
      "Drop the talking points into a Teams chat or short brief for your executive 30 minutes before the discussion.",
    timeRange: "5–10 minutes",
    promptTip:
      "Ask Copilot to include 'likely objections' — it forces sharper, more defendable points.",
  },
  {
    id: "ea-detect-escalations",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Detect Escalations in the Inbox",
    description:
      "Scan recent communication for escalations, negative sentiment and urgent risks before they reach your executive cold.",
    situation:
      "You manage a high-volume inbox and need to spot the messages that are actually heating up — not just the loudest ones.",
    contextSources: [
      "Executive mailbox (delegate access)",
      "Shared mailboxes you manage",
      "Teams chats and channels",
    ],
    accessNote:
      "Detection quality scales with the data Copilot can see. If you only have access to part of the inbox or no Teams visibility, escalations elsewhere will stay hidden.",
    copilotPrompt: `Analyze communication from the last 48 hours across my executive's mailbox and Teams chats.

Identify:
- Escalations (someone asking for a decision or pushing back)
- Negative sentiment or frustration
- Urgent risks or blockers
- Threads going quiet that probably shouldn't be

For each item: sender, topic, why it matters, and a suggested next step.`,
    chatgptPrompt: `Analyze the communication below.

Identify:
- Escalations
- Negative sentiment
- Urgent risks
- Threads gone quiet

For each: sender, topic, why it matters, suggested next step.

Inputs:
[Paste recent emails and Teams messages]`,
    improvementPrompts: [
      "Rank by urgency (high / medium / low).",
      "Only show items that need my executive personally.",
      "Add a draft response for each high-urgency item.",
    ],
    realWorldAction:
      "Surface the high-urgency items to your executive in a 3-line Teams message — don't forward the raw output.",
    timeRange: "5–10 minutes",
    contextTip:
      "This works best when there's enough volume for patterns to emerge. On quiet days, run it across the last 3–5 days instead of 24–48 hours.",
  },
  {
    id: "ea-draft-followups",
    roleId: "executive-assistants",
    level: "advanced",
    title: "Draft Follow-Ups Automatically",
    description:
      "Turn today's meetings into a stack of ready-to-send follow-up emails — each with summary, next steps and owners.",
    situation:
      "Your executive ran several meetings today and follow-ups need to go out fast, before momentum is lost.",
    contextSources: [
      "Today's meeting recordings or transcripts (Teams)",
      "Meeting notes",
      "Related email threads",
      "Open tasks (Planner / To Do)",
    ],
    accessNote:
      "Copilot can only summarize meetings where transcription was on and you (or your executive) attended. For external participants, double-check what's safe to share.",
    copilotPrompt: `Draft follow-up emails for each meeting my executive attended today.

For each meeting:
- 2–3 sentence summary
- Decisions made
- Next steps with owner and due date
- Anything explicitly parked

Format each as a separate email draft, ready to send to attendees.`,
    chatgptPrompt: `Draft follow-up emails based on today's meetings.

For each meeting:
- 2–3 sentence summary
- Decisions
- Next steps with owner and due date
- Parked items

Inputs:
[Paste meeting notes / transcripts]`,
    improvementPrompts: [
      "Use a more formal tone for external attendees.",
      "Tighten each email to 5 lines max.",
      "Add a clear subject line for each.",
    ],
    realWorldAction:
      "Review every draft, adjust tone for the audience, then send from your executive's mailbox (or as their delegate).",
    timeRange: "5–10 minutes",
    improvementTip:
      "Always review before sending. AI gets next steps right ~80% of the time — the last 20% is what protects your executive's credibility.",
  },

  // ───────────────────────── Executive Assistants — Level 4: Outlook + Copilot Automation ─────────────────────────
  {
    id: "ea-auto-accept-meetings",
    roleId: "executive-assistants",
    level: "automation",
    title: "Auto-Accept Meetings Based on Rules",
    description:
      "Combine Outlook calendar settings with Copilot review so routine meetings accept themselves and only edge cases land on your plate.",
    situation:
      "Your executive's calendar fills up with predictable invites. You want the obvious ones handled automatically and only the judgment calls left for you.",
    contextSources: [
      "Calendar availability",
      "Meeting invitations",
      "Sender (executive, leadership, internal/external)",
    ],
    accessNote:
      "Auto-accept rules apply to the mailbox they're configured in. For your executive's calendar you need delegate or full access — and rules must be set on that account, not yours.",
    automationLayers: ["outlook-rule", "copilot"],
    sharedMailboxSupport: "limited",
    requiresPermissions:
      "Delegate access to executive's calendar; rule configured in the target mailbox.",
    outlookSetup: {
      title: "Outlook setup (rule layer)",
      steps: [
        "Open Outlook (desktop or web), in the mailbox you're managing.",
        "Go to Settings → Calendar → Events and invitations.",
        "Enable 'Automatically accept meeting requests if available'.",
        "Optional rule: if sender = executive or leadership distribution list → accept.",
        "Optional rule: if calendar is busy → flag for review instead of declining.",
        "Save and test with a known sender.",
      ],
      note:
        "For shared mailboxes, sign into the shared mailbox directly (or via OWA) and configure the rule there — your personal rules don't apply.",
    },
    copilotPrompt: `Review my executive's upcoming meetings for the next 5 working days.

Identify:
- Conflicts and double-bookings
- Low-priority meetings that could be declined
- Meetings without a clear agenda or owner
- Meetings my executive doesn't strictly need

For each: a 1-line reason and a recommended action (accept / decline / delegate / shorten).`,
    chatgptPrompt: `Review the calendar below for the next 5 working days.

Identify:
- Conflicts
- Low-priority meetings
- Missing agendas
- Meetings to delegate

Inputs:
[Paste calendar entries with attendees, time, subject, body]`,
    improvementPrompts: [
      "Group recommendations by day.",
      "Only show meetings I should personally action.",
      "Add a draft decline message for each low-priority item.",
    ],
    realWorldAction:
      "Let the rule handle volume. Use the Copilot review every Monday morning to clear out judgment-call meetings in 5 minutes.",
    timeRange: "Setup: 10 min · Weekly review: 5 min",
    timeSaved: "~20 min/week saved",
    promptTip:
      "Automation handles volume; Copilot handles judgment. Don't try to put judgment into the rule — it ages badly.",
  },
  {
    id: "ea-prioritize-leadership-emails",
    roleId: "executive-assistants",
    level: "automation",
    title: "Prioritize Emails from Leadership Automatically",
    description:
      "Outlook rules surface leadership emails into a priority folder; Copilot then summarizes them with required actions.",
    situation:
      "You can't afford to miss a message from leadership — but you also can't stare at the inbox all day.",
    contextSources: [
      "Inbox",
      "Sender hierarchy (executives, leadership DL)",
      "Priority folder",
    ],
    accessNote:
      "Rules run inside the mailbox they live in. If you're triaging a shared or executive mailbox, configure the rule there. Copilot will only summarize what your account can read.",
    automationLayers: ["outlook-rule", "copilot"],
    sharedMailboxSupport: "yes",
    requiresPermissions:
      "Full or delegate access to the mailbox where the rule is configured.",
    outlookSetup: {
      title: "Outlook rule setup",
      steps: [
        "Open Outlook → Settings → Mail → Rules → Add new rule.",
        "Condition: 'From' = executive(s) or leadership distribution list.",
        "Actions: mark as high importance + move to 'Priority – Leadership' folder + flag for follow-up.",
        "Save and run on existing inbox to backfill.",
        "Optional: add a second rule for direct reports of the executive.",
      ],
    },
    copilotPrompt: `Summarize the unread emails in my 'Priority – Leadership' folder.

For each: sender, topic, required action, deadline, suggested response.

End with a 3-line digest of what my executive needs to know first.`,
    chatgptPrompt: `Summarize the leadership emails below.

For each: sender, topic, required action, deadline, suggested response.
End with a 3-line digest.

Inputs:
[Paste emails]`,
    improvementPrompts: [
      "Sort by deadline, soonest first.",
      "Add a draft reply for each item that needs one.",
      "Flag anything that's been waiting more than 24 hours.",
    ],
    realWorldAction:
      "Use the rule to filter, Copilot to understand. Your inbox triage drops from 30 minutes to 5.",
    timeRange: "Setup: 10 min · Daily use: 5 min",
    timeSaved: "~25 min/day saved",
    improvementTip:
      "Rules filter, Copilot interprets. Keep them as separate jobs — you'll debug each one faster.",
  },
  {
    id: "ea-calendar-optimization",
    roleId: "executive-assistants",
    level: "automation",
    title: "Intelligent Calendar Optimization",
    description:
      "Use Copilot to find conflicts, shorten bloated meetings, protect focus time and redesign your executive's week.",
    situation:
      "Your executive's calendar is overloaded and the back-to-backs are killing real work.",
    contextSources: [
      "Calendar (next 1–2 weeks)",
      "Meeting patterns (recurring vs. ad-hoc)",
      "Stated priorities for the quarter",
    ],
    accessNote:
      "You'll get the full picture only if you have delegate access to the executive's calendar. Without it, Copilot can only see invites you were copied on.",
    automationLayers: ["copilot"],
    sharedMailboxSupport: "limited",
    requiresPermissions: "Delegate access to executive's calendar.",
    copilotPrompt: `Analyze my executive's calendar for the next 2 weeks.

Identify:
- Conflicts and back-to-back stretches with no break
- Meetings that could be shortened (e.g. 60 → 30 min)
- Meetings that could be delegated (with a suggested attendee)
- Focus-time opportunities (≥90 min blocks)

Output:
- A proposed optimized schedule
- A list of meetings to renegotiate, with a 1-line justification for each`,
    chatgptPrompt: `Analyze the calendar below for the next 2 weeks.

Identify:
- Conflicts
- Meetings to shorten
- Meetings to delegate
- Focus-time opportunities

Output an optimized schedule + list of meetings to renegotiate.

Inputs:
[Paste calendar entries]`,
    improvementPrompts: [
      "Protect at least 4 hours of focus time per week — block them on the calendar.",
      "Only suggest changes I can action without my executive's approval.",
      "Show the 'before vs. after' time saved.",
    ],
    realWorldAction:
      "Walk through the proposal with your executive in your weekly sync. Even accepting half the suggestions saves hours per week.",
    timeRange: "10–15 minutes",
    timeSaved: "~45 min saved",
    promptTip:
      "Always ask Copilot to 'protect focus time' explicitly — otherwise it optimizes for fitting more meetings in.",
  },
  {
    id: "ea-auto-prepare-meetings",
    roleId: "executive-assistants",
    level: "automation",
    title: "Auto-Prepare Meetings from Invitations",
    description:
      "Turn a sparse meeting invite into a full briefing — objective, participants, key topics, prep notes — using related emails and documents.",
    situation:
      "An invite arrives with little more than a title. Your executive needs context fast.",
    contextSources: [
      "Meeting invite (subject, attendees, body, attachments)",
      "Related email threads",
      "Documents linked or shared with attendees",
      "Past meeting notes with the same group",
    ],
    accessNote:
      "Copilot can only pull from threads and documents your account can read. For external attendees, expect thinner context.",
    automationLayers: ["copilot"],
    sharedMailboxSupport: "yes",
    requiresPermissions: "Access to the executive's calendar and mailbox.",
    copilotPrompt: `Prepare a briefing for the upcoming meeting "[MEETING TITLE]" on [DATE].

Use:
- The meeting invite and any attachments
- Related email threads with the attendees
- Previous discussions on the same topic

Include:
- Objective (1 sentence)
- Participants with their role / interest
- Key topics likely to come up
- Preparation notes for my executive
- 2–3 questions my executive should ask`,
    chatgptPrompt: `Prepare a meeting briefing.

Include:
- Objective
- Participants
- Key topics
- Preparation notes
- 2–3 questions to ask

Inputs:
[Paste invite, related emails, prior notes]`,
    improvementPrompts: [
      "Make it one page max.",
      "Add a 'red flags / sensitive topics' section.",
      "Suggest a desired outcome for the meeting.",
    ],
    realWorldAction:
      "Send the briefing to your executive 30 minutes before the meeting, or paste it directly into the calendar event body.",
    timeRange: "5–10 minutes",
    contextTip:
      "Works best when meetings include documents or active email threads — invites with no context produce thin briefings.",
  },
  {
    id: "ea-delegate-meetings",
    roleId: "executive-assistants",
    level: "automation",
    title: "Delegate Meetings Automatically",
    description:
      "Identify meetings your executive doesn't need to attend and suggest who should go instead — with optional Power Automate forwarding.",
    situation:
      "Your executive is in too many meetings that someone else could handle.",
    contextSources: [
      "Calendar (upcoming 1–2 weeks)",
      "Meeting type and topic",
      "Participants and their roles",
      "Org chart / direct reports",
    ],
    accessNote:
      "Delegation suggestions are only as good as your visibility into the org. Make sure Copilot can see your executive's team in the directory.",
    automationLayers: ["copilot", "power-automate"],
    sharedMailboxSupport: "limited",
    requiresPermissions:
      "Delegate access to executive's calendar; permission to forward invites on their behalf.",
    outlookSetup: {
      title: "Optional Power Automate flow",
      steps: [
        "Open Microsoft Power Automate → Create → Automated cloud flow.",
        "Trigger: 'When a new event is created (V3)' on the executive's calendar.",
        "Condition: subject contains [TOPIC] OR organizer is in [LIST].",
        "Action: 'Forward the event' to the chosen delegate.",
        "Action: 'Send an email' to your executive: 'Delegated to X — confirm?'",
        "Test with a sample invite, then enable.",
      ],
      note:
        "Keep the auto-forward narrow: a few well-known topics. Broad rules will misfire and damage trust.",
    },
    copilotPrompt: `Review my executive's meetings for the next 2 weeks.

Identify:
- Meetings my executive doesn't strictly need to attend
- Meetings that could be delegated to a direct report

For each: suggested delegate, reason, and a 2-line message I can send to propose the delegation.`,
    chatgptPrompt: `Review the meetings below.

Identify:
- Meetings to skip
- Meetings to delegate

For each: suggested delegate, reason, 2-line proposal message.

Inputs:
[Paste meetings + team org chart]`,
    improvementPrompts: [
      "Only suggest delegations the delegate has bandwidth for.",
      "Group by delegate so I can send one message per person.",
      "Add a fallback if the delegate declines.",
    ],
    realWorldAction:
      "Send the delegation proposals as a single Teams message to your executive for a quick yes/no — then forward the invites.",
    timeRange: "10–15 minutes",
    extraTips: [
      "Delegation is one of the biggest time-savers — but always confirm with your executive before reassigning anything visible to leadership.",
    ],
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
  {
    id: "draft-difficult-message",
    roleId: "managers",
    level: "essential",
    title: "Draft a Difficult Message",
    description:
      "Write a clear, respectful and direct message for sensitive situations — feedback, change announcements or saying no.",
    situation:
      "You need to deliver a difficult message — turning down a request, addressing an issue, or announcing an unpopular decision — and want it to land well.",
    contextSources: [
      "Recent emails or Teams chats with the recipient",
      "Background documents about the situation",
      "Previous decisions or commitments",
    ],
    copilotPrompt: `Help me draft a difficult message to [Recipient Name] about [topic].

Use:
- Our recent emails and Teams chats with this person
- Background documents about the situation
- Any previous decisions or commitments related to this topic

Make the message:
- Direct and clear — no ambiguity about the decision
- Respectful and empathetic in tone
- Honest about reasoning, without over-explaining
- Forward-looking (what happens next)

Provide 2 versions: a slightly softer one and a slightly more direct one.`,
    chatgptPrompt: `Draft a difficult message to a colleague based on the notes below.

Make it:
- Direct and clear
- Respectful and empathetic
- Honest about reasoning
- Forward-looking

Provide 2 versions (softer and more direct).

Notes:
[Paste recipient name, topic, background and any previous commitments]`,
    improvementPrompts: [
      "Make it more empathetic without softening the decision.",
      "Shorten it to under 100 words.",
      "Add a clear next step at the end.",
    ],
    realWorldAction:
      "Pick the version that fits the relationship, personalize it, and send via Teams or email — don't sit on it.",
    timeRange: "5–10 minutes",
  },
  {
    id: "plan-team-offsite",
    roleId: "managers",
    level: "essential",
    title: "Plan a Team Offsite or Workshop",
    description:
      "Build a clear agenda with objectives, sessions and outcomes for an offsite, planning day or workshop.",
    situation:
      "You're organizing a team offsite, planning day or workshop and need a focused agenda with real outcomes — not death by slides.",
    contextSources: [
      "Recent team Teams conversations and pain points",
      "Last quarter's results and goals",
      "Notes from previous offsites",
      "Upcoming priorities and projects",
    ],
    copilotPrompt: `Plan a [half-day / full-day / 2-day] [offsite / workshop] for my team of [team description].

Use:
- Recent Teams conversations and team pain points
- Last quarter's results and current goals
- Notes from previous offsites
- Our upcoming priorities and projects

Output:
- 2–3 clear objectives for the day
- Detailed agenda with timings, session goals and format (discussion / workshop / break)
- Pre-reads or homework for participants
- Expected outcomes and decisions
- Suggested icebreaker that fits this team

Make it focused and outcome-driven. Avoid filler sessions.`,
    chatgptPrompt: `Plan a team offsite or workshop based on the inputs below.

Output:
- 2–3 clear objectives
- Detailed agenda with timings and session format
- Pre-reads or homework
- Expected outcomes
- Suggested icebreaker

Inputs:
[Paste team description, duration, current goals, pain points, past offsite notes]`,
    improvementPrompts: [
      "Make it more interactive — fewer slides, more workshops.",
      "Compress to a half-day version.",
      "Add a session focused on team alignment for next quarter.",
    ],
    realWorldAction:
      "Share the agenda with your team a week in advance with pre-reads, then use it as your live facilitation script on the day.",
    timeRange: "10 minutes",
    timeSaved: "~40 min saved",
  },


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
  {
    id: "steering-committee-update",
    roleId: "project-managers",
    level: "essential",
    title: "Prepare a Steering Committee Update",
    description:
      "Build the content for your steering committee — clear status, decisions needed and asks for the sponsor.",
    situation:
      "You have a steering committee meeting and need to prepare a sharp update that drives decisions, not just informs.",
    contextSources: [
      "Project plan, RAID log and tracking documents",
      "Recent emails with the sponsor and steering members",
      "Last steering committee minutes",
      "Stand-up notes and team discussions from the last sprint",
    ],
    copilotPrompt: `Prepare the content for my next steering committee meeting on project [Project Name].

Use:
- The project plan, RAID log and tracking documents
- Recent emails with the sponsor and steering committee members
- Minutes from the last steering committee
- Stand-up notes from the last sprint

Output (one slide per section):
- Headline: 1-line status with RAG (Green / Amber / Red)
- Progress since last steering (3 bullets)
- Key risks and mitigations (top 3)
- Decisions required from the committee (be explicit)
- Specific asks of the sponsor
- Look-ahead: next 4–6 weeks

Be honest about issues. Keep total content to one page.`,
    chatgptPrompt: `Prepare the content for a steering committee update based on the notes below.

Output:
- Headline + RAG status
- Progress since last steering
- Top 3 risks and mitigations
- Decisions required from the committee
- Asks of the sponsor
- Look-ahead (next 4–6 weeks)

Notes:
[Paste project status, RAID log, recent updates and previous minutes]`,
    improvementPrompts: [
      "Tighten the decisions section — make each decision a clear yes/no question.",
      "Add a 'what changed since last steering' callout at the top.",
      "Rewrite the asks more assertively.",
    ],
    realWorldAction:
      "Drop the content into your steering deck template. Send the deck and headline 24 hours before the meeting.",
    timeRange: "10 minutes",
  },
  {
    id: "project-kickoff",
    roleId: "project-managers",
    level: "essential",
    title: "Draft a Project Kickoff",
    description:
      "Create a kickoff plan: scope, roles, milestones, comms cadence and a kickoff meeting agenda — all in one go.",
    situation:
      "A new project is starting and you need to align everyone fast — scope, roles, milestones and how you'll work together.",
    contextSources: [
      "The project brief or charter",
      "Emails with the sponsor and stakeholders",
      "Documents shared during scoping",
      "Team availability and skills",
    ],
    copilotPrompt: `Help me draft a project kickoff for [Project Name].

Use:
- The project brief or charter
- Emails with the sponsor and stakeholders during scoping
- Documents shared during scoping
- Team availability and roles

Output:
- One-line project purpose
- Scope: in / out
- Key stakeholders and their role (RACI-style)
- Top 5 milestones with target dates
- Communication cadence (stand-ups, status, steering)
- Risks identified at kickoff
- Kickoff meeting agenda (60 minutes, with timings)

Make it concrete and decision-ready.`,
    chatgptPrompt: `Draft a project kickoff plan based on the inputs below.

Output:
- Project purpose (1 line)
- Scope (in / out)
- Stakeholders and roles (RACI-style)
- Top 5 milestones with dates
- Communication cadence
- Initial risks
- 60-minute kickoff meeting agenda

Inputs:
[Paste project brief, scoping notes, team list and any sponsor emails]`,
    improvementPrompts: [
      "Make the agenda more interactive — less presenting, more discussion.",
      "Compress the kickoff to 30 minutes.",
      "Add a 'definition of done' section.",
    ],
    realWorldAction:
      "Share the kickoff doc with the team 48 hours before the kickoff meeting and use the agenda to run the session.",
    timeRange: "10 minutes",
  },
  {
    id: "build-business-case",
    roleId: "project-managers",
    level: "advanced",
    title: "Build a Business Case (Interactive AI)",
    description:
      "Co-create a structured business case with the AI. It asks you the right questions step by step, then assembles a decision-ready document.",
    situation:
      "You need to create a structured business case but don't have all the inputs ready. Let the AI guide you through the gaps.",
    contextSources: [
      "Project documents and scoping notes",
      "Emails with sponsor and stakeholders",
      "Stakeholder discussions and meeting notes",
      "Existing data (cost estimates, benchmarks, market data)",
    ],
    contextTip:
      "Copilot only uses data you have access to. If a key document isn't surfacing, check sharing permissions.",
    accessNote:
      "This workflow benefits from access to project files, sponsor emails and stakeholder conversations. Copilot can only reference what you can open.",
    copilotPrompt: `You are a project manager assistant.

Help me build a complete business case.

First, ask me questions step by step to gather all required information.
Then create a structured business case.

Structure should include:
- Problem / Opportunity
- Objectives
- Options (with pros / cons)
- Costs
- Benefits
- Risks
- Recommendation

Use any relevant project documents, emails and stakeholder conversations I have access to as background.

Start by asking the most important questions first — one or two at a time — and wait for my answers before moving on.`,
    chatgptPrompt: `You are a project manager assistant.

Help me build a complete business case.

Ask me questions step by step to gather all required inputs. Wait for my answer before asking the next question.

Then create a structured business case with:
- Problem / Opportunity
- Objectives
- Options (with pros / cons)
- Costs
- Benefits
- Risks
- Recommendation

Start by asking the most important questions first.`,
    promptTip:
      "Let the AI guide the process. Answer step by step instead of dumping everything at once — the questions sharpen the output.",
    improvementPrompts: [
      "Make it more concise — one page maximum.",
      "Strengthen the recommendation with clearer reasoning.",
      "Highlight the financial impact (NPV, payback period, ROI).",
      "Challenge my assumptions and flag the weakest parts of the case.",
    ],
    improvementTip:
      "You rarely get the best result in one try. Short follow-up prompts improve quality significantly.",
    extraTips: [
      "If you don't know an answer, give an estimate. The AI can refine it later.",
      "Ask the AI to challenge your assumptions — it strengthens the case before stakeholders do.",
    ],
    realWorldAction:
      "Use the generated business case for stakeholder presentations, steering committee decisions or funding requests.",
    timeRange: "10–15 minutes",
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
    label: "Level 3 — Scheduled prompts",
    shortLabel: "Scheduled",
    description:
      "Native Microsoft 365 Copilot Scheduled Prompts that run a prompt automatically every morning, evening or week — no Copilot Studio required.",
    cardBadge: "Scheduled",
  },
  automation: {
    label: "Level 4 — Outlook + Copilot automation",
    shortLabel: "Automation",
    description:
      "Combine Outlook rules, Copilot intelligence and (optionally) Power Automate to handle inbox triage, calendar decisions and meeting prep automatically.",
    cardBadge: "Automation",
  },
};

export const AUTOMATION_LAYER_META: Record<
  AutomationLayer,
  { label: string; short: string; tone: "rule" | "ai" | "flow" }
> = {
  "outlook-rule": { label: "Rule-based (Outlook)", short: "Outlook rule", tone: "rule" },
  copilot: { label: "AI-assisted (Copilot)", short: "Copilot", tone: "ai" },
  "power-automate": {
    label: "Fully automated (Power Automate)",
    short: "Power Automate",
    tone: "flow",
  },
};

export const SHARED_MAILBOX_META: Record<
  SharedMailboxSupport,
  { label: string; tone: "ok" | "warn" | "no" }
> = {
  yes: { label: "Works with shared mailbox", tone: "ok" },
  limited: { label: "Limited shared-mailbox support", tone: "warn" },
  no: { label: "Personal mailbox only", tone: "no" },
};

export const getRole = (id: string): Role | undefined => roles.find((r) => r.id === id);
export const getWorkflow = (id: string): Workflow | undefined => workflows.find((w) => w.id === id);
export const getWorkflowsByRole = (roleId: RoleId): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId);
export const getWorkflowsByRoleAndLevel = (roleId: RoleId, level: WorkflowLevel): Workflow[] =>
  workflows.filter((w) => w.roleId === roleId && w.level === level);
export const getLevelsForRole = (roleId: RoleId): WorkflowLevel[] => {
  const order: WorkflowLevel[] = ["essential", "advanced", "agent", "scheduled", "automation"];
  const present = new Set(workflows.filter((w) => w.roleId === roleId).map((w) => w.level));
  return order.filter((l) => present.has(l));
};
