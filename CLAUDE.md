# CLAUDE.md for Agent Skills Repository

This repository contains a curated collection of **AI Agent Skills** compatible with **Claude Code**, **T3 Code**, and **Gemini**.

## Skills Catalog

| Skill Folder | Name | Primary Purpose |
| :--- | :--- | :--- |
| `technical-curriculum-app/` | `technical-curriculum-app` | Scaffold, structure, and document zero-dependency interactive training web apps and manuals (ATA Spec 100). |
| `ppt_generator/` | `ppt_generator` | Generate professional PowerPoint (`.pptx`) presentations using `python-pptx` helpers. |
| `stock_analysis/` | `stock_analysis` | Fundamental screening, equity valuation, and portfolio risk evaluation using Screener and INDmoney. |
| `deep_stock_intelligence/` | `deep_stock_intelligence` | 360-degree forensic analysis, Beneish M-Score, Altman Z-Score, reverse DCF, and pre-mortem analysis. |
| `consolidated_intelligence/` | `consolidated-intelligence` | Consolidated stock intelligence PDF reports dispatched via Telegram with multi-model support. |

## Usage with Claude Code

- When asked to scaffold or document a technical course, review `technical-curriculum-app/SKILL.md` and run `node technical-curriculum-app/scripts/scaffold.js`.
- When asked to build a presentation, review `ppt_generator/SKILL.md` and use the helper scripts in `ppt_generator/scripts/`.
- When asked for stock screening, forensics, or deep equity teardowns, consult `stock_analysis/SKILL.md` and `deep_stock_intelligence/SKILL.md`.
