# CLAUDE.md for technical-curriculum-app

This repository provides an **Agent Skill** and **Starter Template Engine** for scaffolding and authoring interactive, zero-dependency technical curriculum web apps.

## Architecture & Commands

- **Zero dependencies**: Pure Node.js 18+ HTTP server and client-side vanilla ES5/ES6 application. No `npm install` needed.
- **Run the local app**: `npm start`
- **Scaffold a new curriculum project**:
  ```bash
  node scripts/scaffold.js <target_path> --title "<Title>" --docno "<Code>" --sub "<Subtitle>" --weeks <Num>
  ```

## Authoring Standards
- **Style**: ASD-STE100 Simplified Technical English. Short, clear sentences. Direct imperative instructions.
- **Task Numbers**: `TASK XX-YY-ZZ-AAA-BBB` with `1. General`, `2. Job set-up information`, `3. Procedure` with `<li class="step"><b class="n">(1)</b><div class="body">...</div></li>`.
- **Reading Cards**: `<article class="task" data-read="..." data-ref="R1" data-title="...">`.
- **Check Sheets**: `<table class="record" data-widget="record" data-tab="week-NN">`.
- **Review Questions**: `<details class="q"><summary><span class="qn">Q1</span>...</summary><div class="a">...</div></details>`.
- **Admonitions**: `<div class="note"><span class="nh">NOTE:</span>...</div>`, `<div class="warning"><div class="wh">WARNING</div>...</div>`.
