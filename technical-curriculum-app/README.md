# Technical Curriculum App · Agent Skill & Starter Template

> An Agent Skill and Scaffolding Engine for creating interactive, zero-dependency technical training web apps, engineering manuals, and course curriculums.

Modeled on aviation maintenance specifications (**ATA Spec 100 / Simplified Technical English ASD-STE100**), this system delivers an interactive, self-contained single-page application with persistent step progress tracking, reading digests, self-assessment questions, and automated audit sheets.

---

## Features

- ⚡ **Zero NPM Dependencies**: Runs on native Node.js 18+. No `node_modules`, no bundling, no build steps.
- 💾 **Dual-Mode Persistence Engine**: Automatically persists step checkboxes, task completion dates, and reading status to `data/progress.json` via local REST API, with fallback to `localStorage`.
- 🗂️ **Manifest-Driven Router**: Dynamic hash routing (`#/week-0/setup/t-00-20-00-100-001`) with deep links and anchor highlighting.
- 📋 **ATA-Style Procedural Tasks**: Structured task cards with prerequisites, numbered verification steps, and signoff blocks.
- 📖 **Reading Cards & Digests**: Auto-calculated reading times based on word count (180 WPM) with digest signoffs.
- 📊 **Dynamic Verification Sheets**: `<table data-widget="record">` auto-gathers and visualizes task completion status.
- 🎯 **Interactive Dashboard**: Home page widget with "Continue where you stopped", progress percentage meter, and weekly badges.
- 📋 **One-Click Code Copy**: Interactive copy buttons automatically injected on all terminal commands (`pre.cmd`) and code snippets (`pre.code`).
- ✈️ **Aviation Typography**: Clean, high-legibility design system using B612 and B612 Mono fonts.

---

## Installation & Usage

### 1. In Claude Code

To add this skill to Claude Code:

```bash
# Clone to your Claude skills directory
git clone https://github.com/tipsharsha/technical-curriculum-app.git ~/.claude/skills/technical-curriculum-app
```

Or include it directly in your project under `.claude/skills/technical-curriculum-app`.

Claude Code can then immediately scaffold new courses or author chapters following the `SKILL.md` specification:
> *"Use the technical-curriculum-app skill to create a 10-week course on High-Performance CUDA Programming."*

### 2. In T3 Code / Antigravity / Gemini

This skill is pre-configured and ready to use in your skills configuration. When prompted, the agent will invoke `scripts/scaffold.js` or follow the authoring guidelines in `SKILL.md`.

### 3. As a Standalone CLI Generator

```bash
git clone https://github.com/tipsharsha/technical-curriculum-app.git
cd technical-curriculum-app

# Scaffold a new course in a target directory
node scripts/scaffold.js ../my-gpu-course \
  --title "GPU Kernel Engineering Program" \
  --docno "TM-GPU-001" \
  --sub "From Vector Addition to FlashAttention on Blackwell" \
  --weeks 12

# Run your new app
cd ../my-gpu-course
npm start
```

The app opens automatically in your browser at `http://localhost:4318/`.

---

## Project Structure

When a project is generated, it follows this structure:

```
my-course/
├── index.html            App shell (sidebar, navigation, breadcrumbs, progress meter)
├── package.json          Zero-dependency configuration ("start": "node server.js")
├── server.js             Local HTTP static & REST state server
├── assets/
│   └── icon.svg          SVG brand icon
├── src/
│   ├── app.js            Vanilla SPA router, widget hydrator, and state engine
│   └── app.css           Aviation manual stylesheet (B612 fonts, paper sheet layout)
├── content/
│   ├── manifest.json     Curriculum manifest (tabs, groups, chapters, planned status)
│   ├── home/
│   │   └── start.html    Title page, dashboard widget, getting started guide
│   ├── program/
│   │   ├── introduction.html
│   │   ├── schedule.html (Master weekly schedule table)
│   │   └── applicability.html
│   ├── week-00/
│   │   ├── setup.html    Environment setup with procedural tasks
│   │   └── check.html    Self-check questions and automated record sheet
│   └── reference/
│       ├── glossary.html Key terminology table
│       └── references.html External reference list
└── data/
    └── progress.json     Auto-persisted user progress (git-ignored)
```

---

## Authoring Guide

### Adding a Procedural Task

```html
<article class="task" id="t-01-10-00-100-001" data-task="01-10-00-100-001" data-week="1" data-title="Compile First Kernel" data-time="15 min">
  <div class="task-head">
    <span class="tno">TASK 01-10-00-100-001</span>
    <span class="ttl">Compile First Kernel</span>
    <span class="time">15 min</span>
  </div>
  <div class="task-body">
    <h4>1. General</h4>
    <p>This task compiles and tests a simple vector addition kernel.</p>

    <h4>2. Job set-up information</h4>
    <table>
      <thead><tr><th>Tools and equipment</th><th>Referenced information</th></tr></thead>
      <tbody><tr><td>NVCC, Bash</td><td>R1</td></tr></tbody>
    </table>

    <h4>3. Procedure</h4>
    <ol class="steps">
      <li class="step">
        <b class="n">(1)</b>
        <div class="body">Run the compiler:
<pre class="cmd" data-sh="SH"><code>nvcc -O3 -arch=sm_90 vec_add.cu -o vec_add</code></pre>
        </div>
      </li>
      <li class="step">
        <b class="n">(2)</b>
        <div class="body">Execute the binary and verify output:
<pre class="cmd" data-sh="SH"><code>./vec_add</code></pre>
        </div>
      </li>
    </ol>
  </div>
</article>
```

### Adding an Automatic Record Sheet

```html
<table class="record" data-widget="record" data-tab="week-1">
  <caption>Record sheet · Week 1</caption>
  <thead><tr><th>Task</th><th>Title</th><th>Time</th><th>Steps</th><th>Status</th><th>Date</th></tr></thead>
  <tbody></tbody>
</table>
```

---

## License

MIT © [tipsharsha](https://github.com/tipsharsha)
