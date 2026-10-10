---
name: technical-curriculum-app
description: Scaffold, structure, and document an engineering/technical training curriculum or course web app with zero dependencies, local server, ATA-style numbered tasks, reading digests, progress persistence, and verification check sheets—identical to the MLIR and LLVM training program structure.
---

# Technical Curriculum App Skill

Create, scaffold, structure, and document interactive, zero-dependency engineering training courses and technical manuals. Modeled on aviation maintenance manuals (ATA Spec 100 / Simplified Technical English ASD-STE100) and delivered as a lightweight local single-page web app with persistent state.

## When to Use This Skill

Activate this skill when:
- Creating a new technical training curriculum, course, or workshop syllabus.
- Building an interactive procedural engineering manual or onboarding guide.
- Requiring a zero-dependency web app that tracks task step completion, reading card signoffs, and record verification sheets.
- Porting documentation into an ATA-style structured format with numbered lesson IDs, general sections, setup info, and step-by-step procedures.
- Wanting persistent progress saved both to a local JSON file (`data/progress.json`) and `localStorage`.

---

## Architecture Overview

The system requires **zero npm packages** and only **Node.js 18+**.

```
index.html              App shell (sidebar, top bar, progress meter, scrim)
src/
  app.js                Hash router (#/tab/chapter/anchor), state manager, widget hydrator
  app.css               Aviation-grade document stylesheet (B612 fonts, paper sheet, print-ready)
server.js               Local HTTP static server + state API (/api/state GET/PUT)
content/
  manifest.json         Central manifest defining tabs, groups, chapters, and planned weeks
  home/start.html       Home title page and interactive dashboard widget
  program/              Introduction, program schedule table, applicability/revisions
  week-NN/              Weekly chapters with tasks, reading cards, and check sheets
  reference/            Glossary, reference lists, and session guides
data/
  progress.json         Local JSON file persisting step checkoffs, completed tasks, read dates
assets/
  icon.svg              Brand icon
```

### 1. Dual-Persistence Engine
- **Local Server API (`/api/state`)**:
  - `GET /api/state`: returns `data/progress.json` (or `{}` if uninitialized).
  - `PUT /api/state`: atomically saves state to `data/progress.json.tmp` then renames to `data/progress.json`.
  - Protection against DNS rebinding (local host verification) and payload size limit (1 MB).
- **LocalStorage Fallback**:
  - When viewed without a server or over `file://` protocol, progress saves to `localStorage`.
  - Upon starting the server, local state is automatically synchronized to `data/progress.json`.

### 2. Client-Side Hash Router
- URL format: `#/<tab-id>/<chapter-id>/<anchor-id>`
  - Example: `#/week-0/computer-setup/t-00-20-00-200-801`
- On route change, dynamically loads chapter HTML via `fetch()` and HTML `<template>`.
- Smoothly scrolls to target anchor and applies a temporary highlight flash (`.flash`).

---

## Document & Technical Writing Standards

### 1. Simplified Technical English (ASD-STE100)
- Short, active voice sentences.
- One thought per instruction step.
- Consistent, unambiguous verbs (e.g., *Make sure*, *Show*, *Start*, *Examine*, *Write*).
- Explicit callout blocks for warnings, cautions, and notes.

### 2. Numbering Conventions
- **Chapters**: `XX-YY-ZZ`
  - `00-00-00` Introduction
  - `00-10-00` Program schedule
  - `00-20-00` Environment set-up
  - `01-10-00` Week 1 Module 1
  - `REF-10` References / Reference sections
  - `RES-10` Research sections
- **Tasks**: `TASK XX-YY-ZZ-AAA-BBB`
  - Example: `TASK 00-20-00-200-801` (Week 0, section 20, operation 200, task 801)
  - Subtasks: `SUBTASK XX-YY-ZZ-AAA-002`
- **References**: `R1`, `R2`, `R3` ...
- **Tables & Figures**: `Table 0-1`, `Figure 1-2`

---

## Component Reference

### 1. Procedural Task Card (`.task`)
Each task is wrapped in an `<article class="task">` element with `data-task`, `data-title`, and `data-time`. The JavaScript engine automatically injects checkboxes into each `<li class="step">`, tracks completion counts, and appends a completion signoff block.

```html
<article class="task" id="t-00-20-00-100-001" data-task="00-20-00-100-001" data-week="0" data-title="Configure Compiler Toolchain" data-time="20 min">
  <div class="task-head">
    <span class="tno">TASK 00-20-00-100-001</span>
    <span class="ttl">Configure Compiler Toolchain</span>
    <span class="time">20 min</span>
  </div>
  <div class="task-body">
    <h4>1. General</h4>
    <p>This task installs and validates the required C++ and LLVM compiler toolchains.</p>

    <h4>2. Job set-up information</h4>
    <table>
      <thead><tr><th>Tools and equipment</th><th>Referenced information</th></tr></thead>
      <tbody><tr><td>Ubuntu Terminal, Clang 18</td><td>R1, R5</td></tr></tbody>
    </table>

    <h4>3. Procedure</h4>
    <ol class="steps">
      <li class="step">
        <b class="n">(1)</b>
        <div class="body">Verify clang installation:
<pre class="cmd" data-sh="WSL"><code>clang-18 --version</code></pre>
        </div>
      </li>
      <li class="step">
        <b class="n">(2)</b>
        <div class="body">Confirm the release string contains <code>version 18</code>.</div>
      </li>
    </ol>

    <div class="note"><span class="nh">NOTE:</span>If clang is not installed, run <code>sudo apt install clang-18</code>.</div>
  </div>
</article>
```

### 2. Reading Digest Card (`article[data-read]`)
For assigned papers, architectural chapters, and blog posts. Reading time is computed automatically from word count (180 WPM):

```html
<article class="task" id="r-r1-digest" data-read="r1-digest" data-ref="R1" data-title="Democratizing AI Compute Digest">
  <div class="task-head">
    <span class="tno">R1 · DIGEST</span>
    <span class="ttl">Democratizing AI Compute</span>
    <span class="time">About 5 min</span>
  </div>
  <div class="task-body">
    <h4>1. Summary</h4>
    <p>Core takeaways from Chris Lattner's series on compiler ecosystems and hardware acceleration.</p>
    <h4>2. Key Points</h4>
    <ul>
      <li>Point 1: Modular compiler design avoids N × M front-end to back-end explosions.</li>
      <li>Point 2: Hardware fragmentation requires multi-level IRs.</li>
    </ul>
  </div>
</article>
```

### 3. Verification Check & Record Sheet (`data-widget="record"`)
Placed at the end of each module in `check.html`. It dynamically discovers every task and reading card in the tab, displaying real-time completion state, step counts, and timestamped signoffs:

```html
<table class="record" data-widget="record" data-tab="week-0">
  <caption>Record sheet · Week 0</caption>
  <thead>
    <tr><th>Task</th><th>Title</th><th>Time</th><th>Steps</th><th>Status</th><th>Date</th></tr>
  </thead>
  <tbody></tbody>
</table>
```

### 4. Self-Assessment Question Toggles (`<details class="q">`)
Provides non-spoilered review questions:

```html
<details class="q">
  <summary><span class="qn">Q1</span>What is the main role of MLIR dialects?</summary>
  <div class="a">Dialects provide domain-specific operations, types, and custom verifications within a unified compiler infrastructure.</div>
</details>
```

### 5. Interactive Home Dashboard (`data-widget="home"`)
Renders the "Continue where you stopped" action button, overall progress percentage bar, and cards for all weeks:

```html
<div data-widget="home"></div>
```

### 6. Interactive Terminal & Code Blocks
Any `<pre class="cmd">` or `<pre class="code">` automatically receives a styled **Copy** button:

```html
<pre class="cmd" data-sh="PS"><code>git status</code></pre>
<pre class="code"><code>#include &lt;iostream&gt;</code></pre>
```

---

## Scaffolding a New Project

### Using the Bundled CLI Tool
To scaffold a new curriculum app in any directory:

```bash
node scripts/scaffold.js <target_folder> --title "My Program Title" --docno "TM-NEW" --desc "Course description" --weeks 12
```

This automatically:
1. Copies the complete application shell, styling, server, and assets.
2. Customizes `package.json`, `index.html`, and `manifest.json` with your metadata.
3. Generates the program schedule table with the requested number of weeks.
4. Creates ready-to-run Week 0 setup and check chapters.

### Starting and Viewing
```bash
cd <target_folder>
npm start
```
The application opens in your default browser at `http://localhost:4318/`.

---

## Authoring Workflow: Adding a New Week

1. **Create the folder**:
   Create `content/week-NN/` (e.g., `content/week-02/`).
2. **Add Chapter Files**:
   Create HTML files for the week's chapters (e.g., `setup.html`, `kernels.html`, `check.html`).
3. **Update Manifest**:
   In `content/manifest.json`, update or replace the planned entry for that week:
   ```json
   {
     "id": "week-2",
     "group": "Weeks",
     "label": "Week 2",
     "sub": "Kernel Optimization",
     "chapters": [
       { "id": "setup", "num": "02-00-00", "title": "Setup", "file": "week-02/setup.html" },
       { "id": "kernels", "num": "02-10-00", "title": "Writing Kernels", "file": "week-02/kernels.html" },
       { "id": "check", "num": "02-90-00", "title": "Check and record", "file": "week-02/check.html" }
     ]
   }
   ```
4. **Update Schedule**:
   In `content/program/schedule.html`, mark the week row with `class="now"` and set badge to `<span class="badge now">This issue</span>`.

---

## Claude Code Integration

### Using as a Skill in Claude Code
To make this skill available to Claude Code:
1. Copy or clone this repository to your project's `.claude/skills/technical-curriculum-app` directory or your global Claude skills folder:
   ```bash
   git clone https://github.com/tipsharsha/technical-curriculum-app.git ~/.claude/skills/technical-curriculum-app
   ```
2. In any project, ask Claude Code:
   > "Scaffold a new technical curriculum web app for CUDA GPU Optimization using the technical-curriculum-app skill."
3. Claude Code will read this `SKILL.md` and use `scripts/scaffold.js` to generate your new curriculum project immediately.
