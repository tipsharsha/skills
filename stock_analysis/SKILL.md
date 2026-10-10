---
name: stock_analysis
description: Stock Market Fundamental Analysis, Equity Screening, and Portfolio Risk Evaluation using Screener MCP & INDmoney MCP.
---

# Stock Analysis & Portfolio Evaluation Skill

Use this skill when analyzing Indian equities, running stock screeners, evaluating balance sheets, or auditing personal portfolios.

## 1. Core Fundamental Screening Criteria
When screening or assessing Indian stocks (via Screener MCP or Screener.in data):
- **Valuation**: Stock P/E < Industry P/E, EV/EBITDA < 12.
- **Profitability & Efficiency**: Return on Capital Employed (ROCE) > 20%, Return on Equity (ROE) > 20%.
- **Growth**: YoY Sales Growth > 15%, YoY EPS / Profit Growth > 15%.
- **Financial Health**: Debt to Equity < 0.5, Operating Cash Flow (CFO) > 0, Promoter Pledged Shares = 0%.

## 2. Screener MCP Integration (`screener-mcp`)
Use `screener` MCP tools for:
- Querying company financial statements (Balance Sheet, P&L, Cash Flows).
- Running raw SQL-style fundamental queries on Screener.in.
- Comparing peer metrics (e.g., ROCE, Margin trend, Debtor Days).

## 3. INDmoney MCP Integration (`indmoney-mcp`)
Use `indmoney` MCP tools for:
- Retrieving real-time personal net worth breakdown.
- Auditing stock & mutual fund SIP holdings.
- Detecting sector over-concentration or high-risk stock exposure.

## 4. Analysis Output Standard
Always present equity evaluations using structured Markdown matrices:

| Company | Stock P/E | EV/EBITDA | Sales Gr | Profit Gr | Debt/Eq | ROCE | CFO (₹ Cr) | Status |
|---|---|---|---|---|---|---|---|---|
