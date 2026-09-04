import {
  FileText,
  Table2,
  Presentation,
  KanbanSquare,
  Shuffle,
  LucideIcon,
} from "lucide-react";

export type CopilotAppId = "word" | "excel" | "powerpoint" | "planner" | "cross-app";

export interface CopilotAppWorkflow {
  id: string;
  title: string;
  description: string;
  /** When this is worth doing */
  situation: string;
  /** Source material to have ready */
  inputs: string[];
  prompt: string;
  followUps: string[];
  /** What a good result looks like */
  expectedOutput: string;
}

export interface CopilotApp {
  id: CopilotAppId;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  usefulFor: string[];
  sourceMaterial: string[];
  promptPatterns: string[];
  commonMistakes: string[];
  reviewBeforeSharing: string[];
  workflows: CopilotAppWorkflow[];
}

export const AVAILABILITY_NOTE =
  "Copilot features differ by licence, platform (desktop, web, mobile), organization settings and preview status. If something described here is not available to you, use the same instructions in Copilot chat with the file attached, or ask your IT team what is enabled in your tenant.";

export const copilotApps: CopilotApp[] = [
  {
    id: "word",
    name: "Copilot in Word",
    tagline: "From rough notes to a document people can act on.",
    description:
      "Word is where Copilot is strongest at drafting, restructuring and summarizing long text. Treat it as a fast first draft and a second pair of eyes, never as the final author.",
    icon: FileText,
    usefulFor: [
      "Producing a structured first draft from notes, bullet points or an existing document",
      "Rewriting the same content for a different audience or level of detail",
      "Compressing long documents into decisions, actions and open questions",
      "Finding gaps, contradictions and unsupported claims before someone else does",
    ],
    sourceMaterial: [
      "Your own notes, even if messy — headings and bullets help more than prose",
      "Reference documents you are allowed to open (previous reports, templates, contracts)",
      "The audience, purpose and decision the document must support",
      "Any required structure: template, house style, mandatory sections",
    ],
    promptPatterns: [
      "Role + audience + purpose: \"Write for a steering committee that must approve budget.\"",
      "Name the structure you want: sections, length, tone, level of detail.",
      "Point at the source: \"Use only the attached notes; mark anything missing as [TO CONFIRM].\"",
      "Ask for the reasoning separately: \"List the assumptions you made under the draft.\"",
    ],
    commonMistakes: [
      "Asking for a document without saying who reads it and what they must decide",
      "Accepting confident wording for facts, figures or dates that were never in your source",
      "Letting Copilot invent structure when a mandatory template exists",
      "Rewriting a whole document when only one section needed work",
    ],
    reviewBeforeSharing: [
      "Every number, name, date and commitment traces back to a source you trust",
      "Nothing confidential has been pulled into a document with a wider audience",
      "Tone and terminology match your organization's language, not generic AI phrasing",
      "Claims that cannot be evidenced are removed or explicitly flagged as assumptions",
    ],
    workflows: [
      {
        id: "word-project-proposal",
        title: "Draft a project proposal from notes",
        description: "Turn scattered notes into a proposal with scope, benefits and next steps.",
        situation:
          "You have discussed an idea in meetings and now need a document that others can react to.",
        inputs: [
          "Your notes on the problem, proposed solution and rough effort",
          "Known constraints: budget, deadline, dependencies",
          "Who approves it and what they care about",
        ],
        prompt:
          "You are helping me draft a project proposal for [audience, e.g. a departmental leadership team].\n\nUse only the notes below. Where important information is missing, insert [TO CONFIRM] instead of guessing.\n\nStructure the proposal as:\n1. Problem and why it matters now\n2. Proposed approach\n3. Scope: in scope / out of scope\n4. Expected benefits (quantified where the notes allow)\n5. Effort, cost and timeline\n6. Risks and dependencies\n7. Decision requested\n\nKeep it under [1.5 pages], plain business language, no marketing tone.\n\nNotes:\n[paste notes]",
        followUps: [
          "List every assumption you made and mark which ones I must verify.",
          "Rewrite section 4 so the benefits are measurable rather than descriptive.",
          "Add a short paragraph on what happens if we do nothing.",
          "Shorten the whole proposal by a third without losing the decision requested.",
        ],
        expectedOutput:
          "A structured proposal with a clear decision request and explicit [TO CONFIRM] markers where your notes were thin.",
      },
      {
        id: "word-structured-report",
        title: "Turn rough notes into a structured report",
        description: "Convert unordered notes into a report with a logical flow and headings.",
        situation: "You have raw material from several sources and no time to organize it.",
        inputs: [
          "All notes, extracts and data points in one place",
          "The report's purpose and expected length",
          "Any mandatory sections",
        ],
        prompt:
          "Reorganise the notes below into a structured report for [audience].\n\nRules:\n- Do not add facts that are not in the notes.\n- Group related points; remove duplication.\n- Use clear headings and short paragraphs.\n- End with 'Open questions' listing anything unresolved in the notes.\n\nTarget length: [X pages]. Tone: factual and neutral.\n\nNotes:\n[paste notes]",
        followUps: [
          "Show me which notes you did not use and why.",
          "Rewrite the opening so a reader understands the situation in three sentences.",
          "Turn the findings section into a table of finding, evidence and implication.",
        ],
        expectedOutput:
          "A readable report that contains only your material, plus an explicit list of open questions.",
      },
      {
        id: "word-rewrite-audience",
        title: "Rewrite a document for a specific audience",
        description: "Adapt an existing document for executives, technical readers or customers.",
        situation:
          "A document exists but the audience has changed and the level of detail no longer fits.",
        inputs: [
          "The current document",
          "The new audience, their prior knowledge and what they must do with it",
          "Sensitivities: what must be removed or softened",
        ],
        prompt:
          "Rewrite the document below for [new audience].\n\nThey already know: [context]. They do not need: [detail to drop]. They must be able to: [decide/act].\n\nKeep all factual content accurate — do not add new claims. Adjust terminology, length and level of detail only. Flag anything you removed that might still be needed.",
        followUps: [
          "Give me a two-sentence version I can paste into an email.",
          "List the terms you simplified so I can check they are still correct.",
          "Make the tone more direct without becoming blunt.",
        ],
        expectedOutput:
          "The same substance at the right altitude for the new reader, with a list of what was cut.",
      },
      {
        id: "word-summarize-decisions",
        title: "Summarize a long document into decisions and actions",
        description: "Extract what was decided, what must happen and who owns it.",
        situation: "You received a long document and need the operational consequences only.",
        inputs: [
          "The document itself",
          "Your role and what you are accountable for",
        ],
        prompt:
          "Read the attached document and extract only what is operationally relevant.\n\nReturn three tables:\n1. Decisions taken — decision, who took it, effective date\n2. Actions required — action, owner, deadline, source section\n3. Open questions — question, why it matters\n\nIf an owner or deadline is not stated, write 'not stated'. Do not infer them.",
        followUps: [
          "Filter the actions to those that involve [my team].",
          "Sort the actions by deadline and flag anything already overdue.",
          "Draft a short message to the owners of the three most urgent actions.",
        ],
        expectedOutput:
          "Three tables that cite their source sections and never invent owners or dates.",
      },
      {
        id: "word-review-gaps",
        title: "Review a document for gaps and contradictions",
        description: "Use Copilot as a critical reader before the document is circulated.",
        situation: "The draft is finished and you want the weak points found before a reviewer finds them.",
        inputs: ["The draft", "The audience and the decision it supports", "Any policy or template it must follow"],
        prompt:
          "Act as a critical reviewer of the attached document. The audience is [audience] and it must support [decision].\n\nIdentify:\n1. Statements that contradict each other, with section references\n2. Claims presented as fact with no supporting evidence in the document\n3. Missing information a reader would reasonably expect\n4. Sections that are ambiguous about who does what by when\n\nDo not rewrite the document. Give a prioritized list of issues with a one-line suggested fix each.",
        followUps: [
          "Rank the issues by how likely they are to block approval.",
          "Fix only issues 1 to 3 and show the revised sections.",
          "Check the document against [policy/template] and list deviations.",
        ],
        expectedOutput:
          "A prioritized issue list with section references — not a silent rewrite.",
      },
      {
        id: "word-executive-summary",
        title: "Create an executive summary",
        description: "Produce a one-page summary that leads with the decision, not the background.",
        situation: "A long document needs a front page that a senior reader will actually read.",
        inputs: ["The full document", "What the reader must approve, fund or decide", "Any hard numbers that matter"],
        prompt:
          "Write a one-page executive summary of the attached document for [senior audience].\n\nOrder it as:\n1. The decision or ask (first sentence)\n2. Why now\n3. Three key points with the numbers that support them\n4. Main risk and how it is mitigated\n5. What happens next and by when\n\nUse only content from the document. Maximum [350] words. No filler openings.",
        followUps: [
          "Cut it to 150 words for a slide.",
          "Add the single strongest counter-argument and a one-line response.",
          "Check every number against the source document and list the sections you used.",
        ],
        expectedOutput:
          "A summary that opens with the ask and carries only evidence found in the document.",
      },
    ],
  },
  {
    id: "excel",
    name: "Copilot in Excel",
    tagline: "Ask the workbook what changed — then verify it.",
    description:
      "Excel is where Copilot is most useful for explaining, structuring and summarizing data, and where verification matters most. Ask for a plan before letting it change anything.",
    icon: Table2,
    usefulFor: [
      "Explaining trends, outliers and variances in data you already have",
      "Suggesting formulas from a plain-language description of the requirement",
      "Cleaning and structuring messy data into a usable table",
      "Drafting the narrative that goes with a KPI or budget view",
    ],
    sourceMaterial: [
      "Data formatted as a real table with clean headers and consistent types",
      "A definition of the measures: what counts as revenue, headcount, an open item",
      "The comparison basis: budget, forecast, prior period, target",
      "A working copy of the file — never experiment in the master workbook",
    ],
    promptPatterns: [
      "Name the range and the measure: \"Using the table on [sheet], compare actuals to budget by month.\"",
      "Ask for a plan first: \"Describe what you would change and wait for my confirmation.\"",
      "Ask for the formula and the logic: \"Give the formula and explain what each part does.\"",
      "Ask for thresholds: \"Only flag variances above [5%] or [CHF 10k].\"",
    ],
    commonMistakes: [
      "Running analysis on merged cells, mixed data types or multi-row headers",
      "Accepting a stated cause for a variance — Copilot sees numbers, not the business reason",
      "Letting it modify the workbook before you have seen what it intends to do",
      "Assuming totals recalculated correctly without spot-checking against a known figure",
    ],
    reviewBeforeSharing: [
      "Spot-check at least two figures against a source you already trust",
      "Confirm filters, date ranges and currency or unit handling are as intended",
      "Check that formulas reference the right ranges and survive added rows",
      "Separate what the data shows from any explanation of why — label assumptions",
    ],
    workflows: [
      {
        id: "excel-explain-trends",
        title: "Explain workbook trends and variances",
        description: "Get a plain-language read of what moved and by how much.",
        situation: "You have the numbers but need the story before a review meeting.",
        inputs: ["A clean table with periods and measures", "The comparison basis", "A materiality threshold"],
        prompt:
          "Analyse the data in [sheet/range]. Compare [measure] across [periods] against [budget/prior period].\n\nReturn:\n1. The five largest movements, with absolute and percentage change\n2. Any outlier that breaks an otherwise stable pattern\n3. For each movement, what the data alone can and cannot tell us\n\nOnly flag variances above [threshold]. Do not speculate about business causes — list them as 'to be explained by the owner'.",
        followUps: [
          "Show the same analysis by [region/cost centre] instead of by month.",
          "Which movements are one-off and which look like a trend across three or more periods?",
          "Draft three questions I should ask the budget owners.",
        ],
        expectedOutput:
          "A short list of material movements with figures, and an explicit boundary between data and interpretation.",
      },
      {
        id: "excel-clean-dataset",
        title: "Clean and structure a dataset",
        description: "Turn an exported or hand-maintained sheet into a usable table.",
        situation: "The data is unusable for analysis because of formatting and inconsistency.",
        inputs: ["A working copy of the file", "The intended structure and key column", "Rules for duplicates and blanks"],
        prompt:
          "I need the data in [sheet/range] cleaned for analysis. Before changing anything, describe the plan:\n\n1. Which columns you would rename, split or merge\n2. How you would handle blanks, duplicates and inconsistent formats\n3. Any rows you consider invalid and why\n\nWait for my confirmation before applying changes. Never delete rows — mark them in a new 'review' column instead.",
        followUps: [
          "Apply steps 1 and 2 only, and add the review column.",
          "List every value you standardized so I can check the mapping.",
          "How many rows would each of your rules affect?",
        ],
        expectedOutput:
          "A written plan first, then a non-destructive cleanup with a review column you can audit.",
      },
      {
        id: "excel-formula-from-requirement",
        title: "Create formulas from a plain-language requirement",
        description: "Describe the calculation in words and get a formula with an explanation.",
        situation: "You know what the result should be but not how to express it in Excel.",
        inputs: ["Column names and the sheet structure", "Edge cases: blanks, zero, negative, text values", "Whether the formula must survive added rows"],
        prompt:
          "In [sheet], I need a formula that: [describe the calculation in plain language].\n\nColumns available: [list].\n\nGive me:\n1. The formula\n2. A plain-language explanation of each part\n3. How it behaves when [blank / zero / text / no match] occurs\n4. A version that still works if rows are added below\n\nDo not apply it to the sheet yet.",
        followUps: [
          "Give a simpler alternative even if it is slightly longer.",
          "Add error handling so unmatched values show 'not found' rather than an error code.",
          "Build a small test case with three rows showing the expected result.",
        ],
        expectedOutput:
          "A formula you understand well enough to defend, plus its behaviour on edge cases.",
      },
      {
        id: "excel-kpi-summary",
        title: "Build a KPI summary with charts",
        description: "Summarize the measures that matter and propose fitting visuals.",
        situation: "You need a compact KPI view for a monthly report or dashboard.",
        inputs: ["The KPI definitions and targets", "The period and comparison basis", "The audience for the summary"],
        prompt:
          "Using the data in [sheet/range], build a KPI summary for [audience] covering [KPIs] for [period].\n\nFor each KPI show: current value, comparison value, variance, and status against target.\n\nThen propose one chart per KPI, saying which chart type you would use and why. Describe the charts before creating them.",
        followUps: [
          "Reduce this to the four KPIs that best explain performance this period.",
          "Write two sentences of commentary per KPI, separating fact from interpretation.",
          "Create the charts you proposed for KPIs 1 and 2 only.",
        ],
        expectedOutput:
          "A compact KPI table with status against target and a justified chart proposal.",
      },
      {
        id: "excel-budget-vs-actuals",
        title: "Analyze budget versus actuals",
        description: "Find the variances that need an explanation, and who should give it.",
        situation: "Month-end close and you need a variance commentary quickly.",
        inputs: ["Budget and actual columns aligned by period and cost centre", "The materiality threshold", "Owner per cost centre"],
        prompt:
          "Compare budget and actuals in [sheet/range] for [period].\n\nReturn a table: [cost centre] | budget | actual | variance | variance % | direction.\n\nSort by absolute variance. Only include variances above [threshold]. Add a column 'needs explanation from' and leave it blank for me to fill.\n\nBelow the table, summarize the overall position in three sentences using only the figures shown.",
        followUps: [
          "Separate timing differences from genuine overspend where the data allows, and say when it does not.",
          "Show the year-to-date position alongside the monthly one.",
          "Draft a neutral request to cost centre owners asking for commentary on their variance.",
        ],
        expectedOutput:
          "A sorted variance table above threshold plus a factual three-sentence position.",
      },
      {
        id: "excel-forecast-brief",
        title: "Prepare a forecasting brief",
        description: "Assemble the inputs and questions needed before a forecast round.",
        situation: "A forecast cycle is starting and you want a defensible starting point.",
        inputs: ["Historic actuals by period", "Known commitments and pipeline", "Assumptions already agreed"],
        prompt:
          "Using the historic data in [sheet/range], prepare a briefing for the [period] forecast round.\n\nInclude:\n1. Run rate and trend over the last [n] periods\n2. Items that are clearly non-recurring\n3. Which lines are stable enough to extrapolate and which are not\n4. The assumptions someone would have to make to forecast each unstable line\n\nDo not produce a forecast figure. This is preparation for a human forecast.",
        followUps: [
          "List the five lines with the widest historical volatility.",
          "Turn the assumptions into a checklist for the budget owners.",
          "Show a sensitivity range for [line] based on the historical spread only.",
        ],
        expectedOutput:
          "A preparation brief that clarifies what can be extrapolated — not an automated forecast.",
      },
      {
        id: "excel-plan-before-change",
        title: "Ask Copilot to propose a plan before changing a workbook",
        description: "A safety habit that applies to every Excel task with Copilot.",
        situation: "Any time Copilot is about to modify a workbook you or others depend on.",
        inputs: ["A working copy, not the master file", "A clear description of the intended end state"],
        prompt:
          "I want to [describe the change] in [sheet/range].\n\nBefore doing anything, give me:\n1. A step-by-step plan of the changes you would make\n2. Which cells, columns or formulas would be affected\n3. What could break, including downstream references\n4. How I would undo each step\n\nWait for my explicit confirmation before applying any change.",
        followUps: [
          "Apply step 1 only, then stop and show me the result.",
          "Which of these steps are reversible and which are not?",
          "Do the same change on a copy of the sheet instead of the original.",
        ],
        expectedOutput:
          "A reviewable plan with impact and rollback, applied only step by step after you confirm.",
      },
    ],
  },
  {
    id: "powerpoint",
    name: "Copilot in PowerPoint",
    tagline: "Structure and narrative first, slides second.",
    description:
      "Copilot is good at converting an existing, well-structured source into a deck and at tightening slide language. It is weak at inventing a story you have not defined.",
    icon: Presentation,
    usefulFor: [
      "Generating a first deck from a document, outline or set of findings",
      "Reshaping a detailed update into something a leadership audience can absorb",
      "Tightening wordy slides and making language consistent",
      "Drafting speaker notes and a decision or summary slide",
    ],
    sourceMaterial: [
      "A source document or outline that already has the argument in it",
      "Your organization's approved template",
      "The audience, the time slot and the decision you need from them",
      "The data or charts you want represented, with their definitions",
    ],
    promptPatterns: [
      "Give the spine: \"Build the deck around these five messages, one per slide.\"",
      "Constrain the format: \"Max 6 bullets, max 12 words per bullet, one message per slide.\"",
      "Name the audience and the ask explicitly.",
      "Ask for the storyline as text before any slides are generated.",
    ],
    commonMistakes: [
      "Asking for a deck before the argument exists — you get filler structure",
      "Ignoring the approved template and creating an off-brand deck",
      "Letting generated charts or figures stand in for verified data",
      "Keeping every slide Copilot produces instead of cutting to the message",
    ],
    reviewBeforeSharing: [
      "Every figure and chart matches the underlying source",
      "The deck fits the time slot and opens with the message, not the background",
      "Template, fonts and terminology comply with your organization's standards",
      "Nothing confidential from a source document has leaked onto a shared slide",
    ],
    workflows: [
      {
        id: "ppt-from-document",
        title: "Create a presentation from a Word document or outline",
        description: "Convert an approved document into a first deck without losing the argument.",
        situation: "The written version is signed off and you now need to present it.",
        inputs: ["The source document or outline", "The approved template", "Audience, time slot and the ask"],
        prompt:
          "Create a presentation from the attached [document/outline] for [audience], [duration] minutes.\n\nBefore generating slides, give me the storyline as a numbered list: one line per slide describing its single message.\n\nRules: one message per slide, maximum [6] bullets, maximum [12] words per bullet, no content that is not in the source. Use the [template name] template.",
        followUps: [
          "Cut the storyline to [8] slides, keeping the decision slide.",
          "Now generate the slides for the confirmed storyline.",
          "Which points from the source did you leave out?",
        ],
        expectedOutput:
          "A storyline you approve first, then a deck that stays inside the source material.",
      },
      {
        id: "ppt-leadership-update",
        title: "Turn a project update into a leadership presentation",
        description: "Raise a detailed status to the altitude a leadership audience needs.",
        situation: "You have a working-level status and [15] minutes with leadership.",
        inputs: ["The detailed status", "The decisions or support you need", "Known risks and their mitigations"],
        prompt:
          "Turn the attached project update into a [15]-minute leadership presentation.\n\nStructure: status in one slide, what changed since last time, decisions requested, risks and mitigations, what happens next.\n\nLeadership does not need task-level detail. Lead with impact on [scope/budget/timeline]. Give me the storyline first, then the slides once I confirm.",
        followUps: [
          "Make the decisions requested unmistakable — one slide, numbered asks.",
          "Add a backup slide with the detail we removed.",
          "Rewrite the status slide so it can be understood in ten seconds.",
        ],
        expectedOutput:
          "A short deck that leads with impact and asks, with detail moved to backup.",
      },
      {
        id: "ppt-narrative-from-data",
        title: "Create a narrative from data",
        description: "Build the story around the figures rather than showing figures alone.",
        situation: "You have analysis and charts but no argument connecting them.",
        inputs: ["The verified analysis or chart set", "The measure definitions", "What you want the audience to conclude"],
        prompt:
          "Here is my analysis: [paste findings or attach the file].\n\nPropose a narrative for [audience] that leads to [intended conclusion], as a numbered storyline. For each step, state which figure supports it.\n\nIf a step in the story is not supported by the data I gave you, say so instead of filling the gap.",
        followUps: [
          "Which parts of my intended conclusion are not supported by this data?",
          "Give an alternative narrative that a sceptical reader would build from the same figures.",
          "Turn the confirmed storyline into slides with one chart per slide.",
        ],
        expectedOutput:
          "A storyline where each step names its supporting figure, and gaps are stated openly.",
      },
      {
        id: "ppt-rewrite-slides",
        title: "Rewrite slide text for clarity and brevity",
        description: "Cut wordy slides down to one clear message each.",
        situation: "The content is right but the slides are dense and hard to read.",
        inputs: ["The existing deck", "The audience and delivery format", "Any wording that must stay verbatim"],
        prompt:
          "Rewrite the text on slides [range] of this deck for clarity.\n\nRules: one message per slide, maximum [6] bullets, maximum [12] words per bullet, active voice, no jargon that [audience] would not use.\n\nDo not change meaning, figures or any wording I marked as fixed: [list]. Show the before and after for each slide.",
        followUps: [
          "Suggest a sharper headline for each slide that states the message, not the topic.",
          "Move anything that is detail rather than message into speaker notes.",
          "Flag slides that are still carrying more than one message.",
        ],
        expectedOutput:
          "A before-and-after per slide with meaning and fixed wording preserved.",
      },
      {
        id: "ppt-decision-slide",
        title: "Add an executive summary or decision slide",
        description: "Give the deck a front slide that states the ask.",
        situation: "The deck explains everything but never states clearly what is needed.",
        inputs: ["The full deck", "The decision, approval or support required", "The deadline and consequence of delay"],
        prompt:
          "Based on this deck, write a single executive summary slide for [audience].\n\nIt must contain: the ask in one sentence, three supporting points with figures, the main risk, and the deadline with the consequence of delay.\n\nMaximum [60] words on the slide. Put the rest in the speaker notes.",
        followUps: [
          "Turn this into a decision slide with clearly numbered options and a recommendation.",
          "Write the one sentence I should say when this slide appears.",
          "Check the summary against the rest of the deck for contradictions.",
        ],
        expectedOutput:
          "One slide that states the ask, the evidence and the deadline within the word limit.",
      },
      {
        id: "ppt-template-consistency",
        title: "Improve consistency using an approved template",
        description: "Align layout, headings and terminology to your organization's standard.",
        situation: "A deck was assembled by several people and looks like it.",
        inputs: ["The approved template", "The deck", "Your terminology or naming conventions"],
        prompt:
          "Review this deck against the [template name] template and our conventions: [list, e.g. headline style, term usage, date format].\n\nList every inconsistency by slide: layout, heading style, terminology, capitalisation, date and number formats.\n\nDo not change anything yet — give me the list first, most visible issues first.",
        followUps: [
          "Fix the terminology and formatting issues only, leaving layout to me.",
          "Which slides do not use an approved layout at all?",
          "Propose consistent headline wording across all section slides.",
        ],
        expectedOutput:
          "A per-slide inconsistency list you can approve before anything is changed.",
      },
      {
        id: "ppt-speaker-notes",
        title: "Generate speaker notes",
        description: "Produce notes that support delivery instead of repeating the slide.",
        situation: "You are presenting content you did not write, or handing the deck to someone else.",
        inputs: ["The deck", "The time slot and audience", "Questions you expect"],
        prompt:
          "Write speaker notes for each slide in this deck. [Duration] minutes total, audience [audience].\n\nPer slide: the one point to make, the supporting detail not on the slide, and a suggested transition to the next slide. Do not repeat the bullet text.\n\nKeep each note under [70] words.",
        followUps: [
          "Add the two hardest questions per slide with a short factual answer.",
          "Mark which slides I can skip if I am running out of time.",
          "Rewrite the notes so a colleague who did not build the deck could present it.",
        ],
        expectedOutput:
          "Per-slide notes with a point, supporting detail and transition — not a re-read of the slide.",
      },
    ],
  },
  {
    id: "planner",
    name: "Copilot in Planner",
    tagline: "From intent to a plan someone can actually work.",
    description:
      "Planner is useful for converting goals, deliverables and meeting outcomes into tasks with owners and dates, and for spotting what is drifting. The plan quality depends entirely on how well your Planner data is maintained.",
    icon: KanbanSquare,
    usefulFor: [
      "Breaking a goal or deliverable into buckets, tasks and milestones",
      "Spotting overdue, blocked or high-risk tasks across a plan",
      "Drafting weekly status and prioritisation from live task data",
      "Turning meeting outcomes into assigned tasks without retyping",
    ],
    sourceMaterial: [
      "A plan where dates, owners and status are actually kept current",
      "The goal, deliverable or meeting summary you want converted",
      "Your team's naming conventions for buckets and labels",
      "Known dependencies and capacity constraints",
    ],
    promptPatterns: [
      "State the outcome and the deadline, then ask for buckets before tasks.",
      "Ask for owners and dates as placeholders: \"Leave owner blank where I have not told you.\"",
      "Define what counts as at risk: \"Overdue, or due within 5 days with no progress.\"",
      "Ask for review before creation: \"List the tasks you would create and wait.\"",
    ],
    commonMistakes: [
      "Generating tasks from a stale plan and treating the output as reality",
      "Accepting invented owners or due dates that were never agreed",
      "Creating dozens of micro-tasks nobody will maintain",
      "Assuming Copilot understands dependencies that are not recorded anywhere",
    ],
    reviewBeforeSharing: [
      "Owners and due dates were agreed with the people concerned, not assumed",
      "Task titles are specific enough to be actionable in three weeks' time",
      "Nothing duplicates a task that already exists in the plan",
      "Status statements match the underlying data, including its known gaps",
    ],
    workflows: [
      {
        id: "planner-goal-to-tasks",
        title: "Turn a project goal into tasks, buckets, and milestones",
        description: "Convert an outcome statement into a workable plan structure.",
        situation: "A project has been approved and there is nothing in Planner yet.",
        inputs: ["The goal, scope and deadline", "The team and their roles", "Known phases or gates"],
        prompt:
          "I need a plan for: [goal] by [deadline].\n\nFirst propose buckets (phases) only, with a one-line description each. Wait for my confirmation.\n\nThen, per bucket, propose tasks with: title, short description, suggested due date relative to the deadline, and a suggested owner role (not a person). Mark milestones separately.\n\nDo not create anything in the plan until I confirm.",
        followUps: [
          "Reduce this to the [15] tasks that actually need tracking.",
          "Add the dependencies between tasks and flag anything on the critical path.",
          "Which tasks are missing if [constraint, e.g. procurement or security review] applies?",
        ],
        expectedOutput:
          "Buckets first, then a reviewable task list with role-based owners and relative dates.",
      },
      {
        id: "planner-work-breakdown",
        title: "Break a deliverable into a work breakdown",
        description: "Decompose one deliverable into tasks at a sensible level of granularity.",
        situation: "One deliverable is large and vague and nobody can start on it.",
        inputs: ["A definition of done for the deliverable", "Who will work on it", "The available time window"],
        prompt:
          "Break down this deliverable into a work breakdown: [deliverable].\n\nDefinition of done: [criteria]. Time available: [window]. People: [roles].\n\nUse tasks of roughly [half a day to two days] each. For each task give: title, definition of done, prerequisite tasks. Do not exceed [12] tasks — group anything smaller.",
        followUps: [
          "Which of these tasks can run in parallel?",
          "Identify the task most likely to be underestimated and why.",
          "Add a review or quality-check task where it is genuinely needed.",
        ],
        expectedOutput:
          "A right-sized breakdown with definitions of done and prerequisites.",
      },
      {
        id: "planner-risk-tasks",
        title: "Identify overdue, blocked, or high-risk tasks",
        description: "Get an honest read of where the plan is slipping.",
        situation: "Before a status meeting or when the plan feels out of control.",
        inputs: ["A plan with current dates and status", "Your definition of at risk", "The next hard deadline"],
        prompt:
          "Review the plan [plan name] and list:\n1. Overdue tasks — task, owner, days overdue\n2. Blocked tasks and what they are waiting on, if recorded\n3. At-risk tasks — due within [5] days with no progress recorded\n4. Tasks with no owner or no due date\n\nSort each list by impact on [next milestone]. Where the plan data is incomplete, say so rather than estimating.",
        followUps: [
          "Which three items most threaten [milestone] and what would unblock each?",
          "Draft a short, non-accusatory message to the owners of the overdue tasks.",
          "Show only items owned by [team].",
        ],
        expectedOutput:
          "Four sorted lists, with explicit notes wherever the plan data is incomplete.",
      },
      {
        id: "planner-weekly-status",
        title: "Prepare a weekly status report",
        description: "Turn live task data into a status people can read in a minute.",
        situation: "Weekly reporting that currently takes you half an hour of copying.",
        inputs: ["An up-to-date plan", "The reporting audience", "Last week's status for comparison"],
        prompt:
          "Produce a weekly status for [plan name] for [audience].\n\nSections:\n1. Overall status in one sentence\n2. Completed this week\n3. In progress, with expected completion\n4. Overdue or blocked, with owner\n5. Coming next week\n6. Decisions or support needed\n\nUse only what is recorded in the plan. Where status is stale or missing, list it under 'unclear' rather than assuming progress.",
        followUps: [
          "Compare with last week's status and highlight what changed.",
          "Shorten to a five-line version for a chat message.",
          "Flag anything that has been 'in progress' for more than [two] weeks.",
        ],
        expectedOutput:
          "A six-section status that separates recorded facts from stale or missing data.",
      },
      {
        id: "planner-prioritize-week",
        title: "Prioritize tasks for the coming week",
        description: "Decide what actually matters next week and what can wait.",
        situation: "More open tasks than capacity, and everything looks urgent.",
        inputs: ["Open tasks with dates", "The next milestone and its hard constraints", "Available capacity"],
        prompt:
          "From the open tasks in [plan name], propose priorities for the week of [date].\n\nRank by: impact on [next milestone], whether others are blocked by it, and deadline. Available capacity: [hours/people].\n\nReturn: 'Must happen', 'Should happen', 'Can wait' — with a one-line reason each. Say explicitly what will slip if the must-happen list is completed.",
        followUps: [
          "Rebalance if [person] is unavailable this week.",
          "Which of the 'can wait' items become critical the week after?",
          "Turn the must-happen list into a short message for the team channel.",
        ],
        expectedOutput:
          "Three prioritized groups with reasons and an explicit statement of what slips.",
      },
      {
        id: "planner-workload-dependencies",
        title: "Review workload and dependencies",
        description: "Check whether the plan is deliverable by the people in it.",
        situation: "Before committing to a schedule, or when one person seems overloaded.",
        inputs: ["Tasks with owners and dates", "Known absences and part-time capacity", "Recorded dependencies"],
        prompt:
          "Review [plan name] for workload and dependency problems.\n\n1. Tasks per owner per week for the next [4] weeks\n2. Owners with more concurrent tasks than [threshold]\n3. Dependency chains where a delay would move [milestone]\n4. Tasks assigned to people marked unavailable: [absences]\n\nOnly use dependencies actually recorded in the plan; note where dependencies are probably missing.",
        followUps: [
          "Propose a rebalancing that keeps [milestone] intact.",
          "What is the longest dependency chain and its total duration?",
          "Which single reassignment would relieve the most pressure?",
        ],
        expectedOutput:
          "A workload and dependency view that flags where the recorded data is thin.",
      },
      {
        id: "planner-meeting-to-tasks",
        title: "Turn a meeting summary into Planner tasks",
        description: "Convert agreed actions into tasks without losing context.",
        situation: "A meeting produced actions that will otherwise live in notes and die there.",
        inputs: ["The meeting summary or notes", "The target plan and bucket", "Who was actually present"],
        prompt:
          "From the meeting summary below, extract actions and propose Planner tasks for [plan name].\n\nPer task: title (verb first), a one-line description with the context from the meeting, owner as stated, due date as stated.\n\nIf the owner or date was not agreed in the meeting, leave it blank and list it under 'needs confirmation'. Do not create the tasks yet.\n\nSummary:\n[paste summary]",
        followUps: [
          "Which of these already exist in the plan as tasks?",
          "Create only the tasks with a confirmed owner and date.",
          "Draft a message asking for owners on the unconfirmed items.",
        ],
        expectedOutput:
          "A proposed task list that never invents owners or dates, plus a 'needs confirmation' list.",
      },
    ],
  },
  {
    id: "cross-app",
    name: "Cross-app workflows",
    tagline: "Chains that move work between Word, Excel, PowerPoint and Planner.",
    description:
      "The largest gains usually come from chaining apps rather than from a single prompt. Each step should produce a checked artefact before it feeds the next one.",
    icon: Shuffle,
    usefulFor: [
      "Moving from raw meeting or data context to a shareable deliverable",
      "Keeping one source of truth as content changes format",
      "Reducing retyping between a document, a deck and a plan",
    ],
    sourceMaterial: [
      "A verified artefact from the previous step — never chain unchecked output",
      "Files stored where Copilot can reach them, with the access you already have",
      "The audience and purpose of the final deliverable, defined at the start",
    ],
    promptPatterns: [
      "Do one step per prompt, and review before continuing.",
      "Reference the checked file explicitly rather than pasting long content again.",
      "Restate the audience at every step — it changes between document and deck.",
      "Ask what was dropped at each conversion.",
    ],
    commonMistakes: [
      "Chaining steps without checking the intermediate output — errors compound",
      "Losing figures or nuance silently in each conversion",
      "Carrying confidential detail from an internal document into an external deliverable",
      "Automating a chain you have not yet run manually a few times",
    ],
    reviewBeforeSharing: [
      "Trace at least the key figures back through every step to the original source",
      "Confirm the final artefact matches the audience it will reach, not the first one",
      "Check that internal-only content did not travel down the chain",
      "Confirm the tasks or commitments created are ones people actually agreed to",
    ],
    workflows: [
      {
        id: "cross-meeting-to-deck",
        title: "Meeting notes → Word summary → PowerPoint update",
        description: "Move from a recorded discussion to a shareable update in two checked steps.",
        situation: "A workshop or review happened and stakeholders need an update.",
        inputs: ["Meeting notes or a summary you are authorized to use", "The stakeholder audience", "The approved deck template"],
        prompt:
          "Step 1 (Word): From the attached meeting notes, write a summary for [audience] with: context, decisions taken, actions with owners, open questions. Use only what is in the notes; mark anything unclear as [TO CONFIRM].\n\nI will review and correct this before step 2.\n\nStep 2 (PowerPoint): Build a [n]-slide update from the corrected summary for [audience], one message per slide, using the [template] template.",
        followUps: [
          "What did you drop between the summary and the deck?",
          "Add a slide with the open questions and who must answer them.",
          "Give me a three-line version for the team channel.",
        ],
        expectedOutput:
          "A corrected Word summary first, then a deck derived only from that corrected version.",
      },
      {
        id: "cross-excel-to-deck",
        title: "Excel analysis → PowerPoint leadership deck",
        description: "Turn verified analysis into a decision-oriented deck.",
        situation: "The analysis is done and leadership needs the conclusion, not the workbook.",
        inputs: ["Verified analysis with checked figures", "Measure definitions", "The decision required"],
        prompt:
          "Step 1 (Excel): Summarize the analysis in [sheet/range] as the [5] findings that matter for [decision], each with its supporting figure.\n\nAfter I verify the figures:\n\nStep 2 (PowerPoint): Build a leadership deck around those [5] findings for [audience], [duration] minutes, ending with the decision requested. One chart per finding, using the [template] template.",
        followUps: [
          "Restate each finding as a headline that says the message, not the topic.",
          "Add a slide covering the main counter-argument and our response.",
          "Move all methodology detail into backup slides.",
        ],
        expectedOutput:
          "Findings verified in Excel first, then a deck whose every chart traces to those figures.",
      },
      {
        id: "cross-kickoff-to-plan",
        title: "Project kickoff document → Planner plan",
        description: "Convert an approved kickoff document into a working plan.",
        situation: "Kickoff is signed off and the plan needs to exist by tomorrow.",
        inputs: ["The approved kickoff or charter document", "The team and their roles", "Milestones and the deadline"],
        prompt:
          "Step 1 (Word): From the attached kickoff document, extract scope, deliverables, milestones, roles and constraints as a structured list. Mark anything not stated as 'not defined'.\n\nAfter I confirm:\n\nStep 2 (Planner): Propose buckets and tasks for [plan name] based only on that list. Owners as roles, dates relative to [deadline]. Do not create tasks until I confirm.",
        followUps: [
          "Which deliverables in the document have no task covering them?",
          "Add the governance and reporting tasks the document implies.",
          "Flag anything in the plan that the kickoff document does not actually cover.",
        ],
        expectedOutput:
          "An extracted, confirmed scope list, then a proposed plan traceable to the document.",
      },
      {
        id: "cross-planner-to-update",
        title: "Planner status → stakeholder update",
        description: "Turn live plan data into an update stakeholders can act on.",
        situation: "Recurring stakeholder reporting based on the plan you already maintain.",
        inputs: ["A current plan", "The stakeholder audience and their concerns", "The previous update"],
        prompt:
          "Step 1 (Planner): Summarize [plan name]: completed, in progress, overdue or blocked, next milestone and its date. Mark stale or missing data as 'unclear'.\n\nAfter I correct it:\n\nStep 2 (Word or email): Write a stakeholder update for [audience] from that summary — status in one sentence, progress, risks with mitigations, what we need from them. Neutral tone, no task-level detail.",
        followUps: [
          "Compare with the previous update and highlight only what changed.",
          "Make the ask to stakeholders explicit and time-bound.",
          "Produce a version for [external/steering] audience with internal detail removed.",
        ],
        expectedOutput:
          "A corrected plan summary, then an update that states status, risk and the ask.",
      },
      {
        id: "cross-context-to-briefing",
        title: "Teams or Outlook context → briefing or Planner tasks",
        description: "Consolidate scattered conversation into a briefing and follow-up tasks.",
        situation: "A topic has been discussed across chats and email and nobody has the full picture.",
        inputs: ["The relevant conversations you are authorized to access", "The topic and time window", "The plan where actions belong"],
        prompt:
          "Step 1: Using only content I can access about [topic] from the last [time window], produce a briefing: what has been agreed, what is still open, who is involved, and the current position. Cite the source conversation for each point.\n\nAfter I check it:\n\nStep 2 (Planner): Propose tasks in [plan name] for the open items only, with owners as stated in the conversations and blank where not agreed.",
        followUps: [
          "Which points came from a single source and should be confirmed?",
          "Draft a short message that closes the open questions with the right people.",
          "Show only items that affect [milestone].",
        ],
        expectedOutput:
          "A source-cited briefing you verify, then tasks limited to genuinely open items.",
      },
    ],
  },
];

export const getCopilotApp = (id: string): CopilotApp | undefined =>
  copilotApps.find((a) => a.id === id);

export const copilotAppWorkflowCount = copilotApps.reduce(
  (total, app) => total + app.workflows.length,
  0,
);
