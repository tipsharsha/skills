---
name: consolidated-intelligence
description: >-
  Generate consolidated stock intelligence PDF reports with all portfolio data, sources searched,
  screener funnels, failure post-mortems, stock dossiers with audited filings, 45/30/25 asset split,
  daily trading lessons, and self-improving memory. Dispatches via Telegram as PDF attachment.
  Supports dynamic AI model selection. Use this skill when the user asks for a consolidated report,
  daily intelligence brief, PDF brief, stock summary, trading lesson, failure analysis, or model switch.
---

# Consolidated Stock Intelligence Report System

## Overview

This skill generates a **single comprehensive, multi-page PDF intelligence brief** consolidating all
stock data, screening funnels, audited filings, trading education, failure post-mortems, and self-improvement
metrics into one intuitive document. The report is dispatched via Telegram as a PDF attachment.

## When to Activate

- User asks for a "consolidated report", "daily brief", "intelligence report", "PDF brief", or "all data in one message"
- User asks to inspect "sources searched", "screener query matches", "shortlisted vs failed stocks"
- User asks for "documents searched for each stock", "auditor reports", "RPT analysis", or "stock dossiers"
- User asks about "failures", "why did SRM fail", "cash flow traps", or "what new filters were mined"
- User asks to "switch model", "change AI model", or "generate with Gemini / Claude"
- User wants a "trading lesson" or "teach me about trading"
- During daily automated runs via `daily_harness.py` or interactive bot commands (`/pdf`, `/model`, `/holdings`)

## Report Structure & Sections

The consolidated intelligence brief includes 8 core sections:

1. **Executive Cover & Portfolio Dashboard** — Net worth, returns, asset allocation, deployable cash, active AI model badge
2. **Sources Searched & Screener Query Funnel** — Detailed breakdown of 6 primary sources (Screener.in API, Finviz, NSE archives, INDmoney MCP, SEC 10-K/PDFs, DuckDuckGo snippets) and exact SQL strategy parameters
3. **Post-Mortem of Failures & Self-Learning Filter Evolution** — Case study on cash flow traps (SRM Contractors 0.02x CFO/PAT), why headline metrics failed, and how the system auto-mined `dynamic_cash_quality_filter.sql` (CFO/PAT >= 1.0)
4. **Consolidated Stock Analysis Dossiers** — Dedicated page/card for EVERY stock:
   - Live Price, MCap, Position Size, Color-coded Verdict (BUY / HOLD / SELL)
   - Audited Filings: Exact Annual Report PDF / 10-K filename, Statutory Auditor Name, Audit Opinion, RPT, Contingent Liabilities
   - 8-Metric Scorecard: P/E, EV/EBITDA, ROCE, ROE, Debt/Equity, CFO/PAT, Sales/Profit Growth
   - Candidate Champion Bull Pitch vs Adversarial Risk Auditor Bear Attack
   - Master Agent Action Plan & Tax Advisory (STCG 20% vs LTCG 12.5%)
5. **SBI Multi-Asset Cash Deployment Plan** — 45% India (₹59.8K) / 30% US ETFs (₹39.9K) / 25% MF SIPs (₹33.2K) with exact share calculations
6. **Market Sentiment Dashboard & 7-Pillar Quality Score Heatmap** — News flags + complete scoring matrix per stock
7. **Daily Rotating Trading Lesson** — 30+ rotating topics across Fundamental, Cash Flow, Technical, Risk, Tax & Behavioral concepts
8. **Episodic Memory, Prediction Accuracy & Continuous Improvement Log** — 30/60/90-day trajectory tracking, rolling accuracy win rate, active learned rules

## Model Switching & Control

The active AI model is displayed prominently and can be switched dynamically:

```bash
# Generate report specifying the AI Model
python consolidated_report_generator.py --model "Gemini 3.7 Flash"
python consolidated_report_generator.py --model "Claude Opus 4.6 (Thinking)"

# Run full daily harness with custom model
python daily_harness.py --model "Gemini 3.7 Flash"
```

In Telegram chat:
- `/model` — View active AI reasoning model
- `/model Gemini 3.7 Flash` — Switch active model
- `/pdf` — Generate & receive fresh PDF brief on demand

## Key Files

| File | Purpose |
|---|---|
| [`consolidated_report_generator.py`](file:///C:/Users/tipsh/finance/consolidated_report_generator.py) | Full PDF brief generation engine using ReportLab & Telegram document dispatcher |
| [`intelligence_memory.py`](file:///C:/Users/tipsh/finance/intelligence_memory.py) | Self-improving episodic memory with 30/60/90-day prediction outcome tracking |
| [`trading_lessons.json`](file:///C:/Users/tipsh/finance/trading_lessons.json) | 30+ rotating daily trading education topics |
| [`reports/intelligence_brief_2026-08-16.pdf`](file:///C:/Users/tipsh/finance/reports/intelligence_brief_2026-08-16.pdf) | Generated PDF output document |
| [`dynamic_cash_quality_filter.sql`](file:///C:/Users/tipsh/finance/dynamic_cash_quality_filter.sql) | Auto-mined SQL strategy enforcing 100%+ CFO/PAT cash conversion |
| [`harness_config.json`](file:///C:/Users/tipsh/finance/harness_config.json) | Configuration file containing `llm_model`, thresholds, and portfolio state |
