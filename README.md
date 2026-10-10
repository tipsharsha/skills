# AI Agent Skills Collection

> A production-ready collection of AI agent skills designed for **Claude Code**, **T3 Code**, and **Gemini CLI**.

Each skill adheres to the Agent Skill specification (`SKILL.md` with YAML frontmatter, execution instructions, scripts, templates, and schemas).

---

## Skills Catalog

### 1. [Technical Curriculum App](technical-curriculum-app/) (`technical-curriculum-app`)
Scaffold, structure, and document an engineering or technical training curriculum or course web app with zero dependencies, local server, ATA-style numbered tasks, reading digests, progress persistence, and verification check sheets—identical to the MLIR and LLVM training program structure.
- **CLI Scaffolder**: `node technical-curriculum-app/scripts/scaffold.js <target_folder> --title "..." --docno "..."`
- **Highlights**: Zero npm dependencies, native Node.js HTTP & REST persistence server, B612 aviation typography, dynamic check sheets, auto-calculated reading times.

### 2. [PowerPoint Presentation Generator](ppt_generator/) (`ppt_generator`)
Generate professional PowerPoint (`.pptx`) presentations from structured content using `python-pptx` with reusable layouts, cards, and accent palettes.
- **Highlights**: Reusable Python helpers (`ppt_helpers.py`), title slides, 2-column, 3-column, metric cards, process flows, and comparison grids.

### 3. [Stock Analysis & Screening](stock_analysis/) (`stock_analysis`)
Stock market fundamental analysis, equity screening, and portfolio risk evaluation using Screener MCP & INDmoney MCP.
- **Highlights**: Rule-based screening criteria (ROCE > 20%, ROE > 20%, Debt/Equity < 0.5, CFO > 0), valuation multiples, and margin of safety checks.

### 4. [Deep Stock Intelligence & Forensics](deep_stock_intelligence/) (`deep_stock_intelligence`)
360-degree institutional fundamental forensics, business model dissection, earnings quality auditing (Beneish M-Score, Altman Z-Score, Piotroski F-Score), working capital cycle forensics, concall guidance verification, reverse DCF valuation, and pre-mortem adversarial destruction analysis.

### 5. [Consolidated Stock Intelligence](consolidated_intelligence/) (`consolidated-intelligence`)
Generate consolidated stock intelligence PDF reports with all portfolio data, sources searched, screener funnels, failure post-mortems, stock dossiers with audited filings, 45/30/25 asset split, daily trading lessons, and self-improving memory. Dispatches via Telegram as PDF attachment.

---

## Installation

### For Claude Code

You can make all skills available to Claude Code globally by cloning this repository into your Claude skills directory:

```bash
# Clone the entire collection
git clone https://github.com/tipsharsha/skills.git ~/.claude/skills/collection

# Or symlink/copy individual skills directly into ~/.claude/skills/
cp -r ~/.claude/skills/collection/technical-curriculum-app ~/.claude/skills/
cp -r ~/.claude/skills/collection/ppt_generator ~/.claude/skills/
```

Claude Code will automatically detect each folder containing a `SKILL.md` and activate its tools and instructions.

### For T3 Code / Antigravity

These skills are natively compatible with T3 Code. Place this directory or its subdirectories in your T3 skills configuration path:
```
<config-directory>/skills/
```

---

## Repository Structure

```
skills/
├── README.md                           Catalog overview and installation guide
├── CLAUDE.md                           Claude Code steering instructions
├── .gitignore
├── technical-curriculum-app/            Zero-dependency curriculum app generator
│   ├── SKILL.md
│   ├── CLAUDE.md
│   ├── README.md
│   ├── scripts/scaffold.js
│   └── template/                       Complete starter codebase
├── ppt_generator/                      PowerPoint slide deck generator
│   ├── SKILL.md
│   ├── scripts/ppt_helpers.py
│   └── examples/sample_presentation.py
├── stock_analysis/                     Equity screening and portfolio evaluation
│   └── SKILL.md
├── deep_stock_intelligence/            360-degree fundamental forensics
│   └── SKILL.md
└── consolidated_intelligence/          Consolidated PDF reports & Telegram delivery
    └── SKILL.md
```

---

## License

MIT © [tipsharsha](https://github.com/tipsharsha)
