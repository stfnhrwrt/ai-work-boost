# AI Workflows for Daily Work — MVP Plan

A practical, role-based library of ready-to-use AI workflows for Microsoft Copilot (recommended) and ChatGPT (fallback). Zero login, zero theory — every page leads to a copyable prompt users can run in under 10 minutes.

---

## 🎨 Design Direction

**Corporate-friendly, productive feel** — trustworthy enough for enterprise rollout, warm enough not to feel sterile.

- **Palette**: soft off-white background, deep navy/slate text, a confident professional blue as the primary accent, and a warm secondary accent (soft amber) for highlights like "Recommended" badges and copy confirmations.
- **Typography**: clean modern sans-serif, generous line-height, clear hierarchy (large headings, comfortable body, monospaced font for prompt blocks).
- **Layout**: card-based, lots of whitespace, soft shadows, rounded corners, subtle borders. Inspired by Notion/Linear but with a touch more warmth.
- All colors and tokens defined as semantic HSL variables in the design system so the palette stays consistent across every page.

---

## 🗺️ Pages & Navigation

Classic guided flow: **Home → Role → Library → Detail**, with a persistent top nav (logo, breadcrumb, "All workflows" link) so users can jump back at any step.

### 1. Homepage (`/`)
- Hero: "Turn AI into Daily Productivity — Not Just Theory" + subheadline + primary CTA "Start a Workflow" (scrolls to roles).
- Three-up "How it works" strip: **Pick your role → Choose a task → Copy the prompt**.
- Role selection section with 3 large cards (Executive Assistants, Managers / Leaders, Project Managers), each showing an icon, short value line, and workflow count.
- Subtle footer note about Copilot vs ChatGPT.

### 2. Role page (`/role/:roleId`)
- Role header (icon, name, one-line value prop).
- Workflow library grid — each card shows: title, short description, time badge (5–10 min), and tool badges (Copilot / ChatGPT).
- Cards link to the detail page.

### 3. Workflow detail page (`/workflow/:workflowId`) — **the core experience**
Follows the exact structure from your spec:

1. **Title** + breadcrumb back to role.
2. **Situation** — short scenario in a soft callout.
3. **Context Source** — bulleted list (Emails, Teams, Calendar, Documents) with a one-line note that Copilot can access these automatically.
4. **Tool Mode** — short explainer of Copilot (Recommended) vs ChatGPT (Alternative).
5. **Prompt block with tabs**:
   - Default tab: **Copilot (Recommended)** — marked with the warm accent badge.
   - Second tab: **ChatGPT** — manual-input version.
   - Each tab shows the prompt in a monospaced block with a prominent **Copy Prompt** button (toast confirmation on click).
6. **Improve Output** — 2–3 short refinement prompts, each individually copyable.
7. **Real-World Action** — one short paragraph on how to use the output immediately.
8. **Time to Complete** — 5–10 minutes badge.
9. Bottom nav: "← Back to {Role}" and "Next workflow →".

### 4. 404 page
Friendly fallback that points users back to the role selection.

---

## 📚 Initial Content (9 workflows)

Stored as a single typed TypeScript file (`src/data/workflows.ts`) so they're easy to edit and ship instantly — no backend needed for MVP.

**Executive Assistants**
1. Daily Executive Briefing
2. Summarize Inbox
3. Prepare Meeting Notes

**Managers / Leaders**
1. Prepare a 1:1 Meeting (built from your example as the gold standard)
2. Write Feedback
3. Define Weekly Priorities

**Project Managers**
1. Project Status Summary
2. Identify Risks
3. Stakeholder Update

Each entry includes: id, role, title, description, situation, contextSources[], copilotPrompt, chatgptPrompt, improvementPrompts[], realWorldAction, timeRange.

---

## ⚡ UX Principles Applied

- **No login** — anyone can land and copy a prompt instantly.
- **<10 seconds to a workflow** — homepage → role → workflow is two clicks.
- **One-click copy** everywhere a prompt appears, with clear visual confirmation.
- **Keyboard friendly** — focus states, accessible tabs, semantic headings.
- **Responsive** — works cleanly on laptop and mobile (cards stack, prompts stay readable).

---

## 🚫 Out of Scope (per your spec)

- Saving workflows, accounts, personalization, company-specific templates — explicitly deferred.

---

## ✅ Deliverables in this build

- Design system tokens (corporate-friendly palette, typography, spacing) in `index.css` + `tailwind.config.ts`.
- Routes for Home, Role, Workflow detail, and 404.
- Reusable components: `RoleCard`, `WorkflowCard`, `PromptBlock` (with copy + tabs), `ContextSourceList`, `ToolModeExplainer`, `Breadcrumb`.
- All 9 workflows authored with high-quality, ready-to-paste prompts following the example style.
- Copy-to-clipboard with toast confirmation.

After approval I'll implement the above end-to-end.