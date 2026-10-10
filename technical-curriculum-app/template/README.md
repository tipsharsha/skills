<img src="assets/icon.svg" width="64" height="64" alt="">

# {{TITLE}}

{{DESCRIPTION}}

## Start the app

```bash
npm start
```

The app opens automatically in your browser at `http://localhost:4318/` (or the next available port). No `npm install` or third-party dependencies are required. Only Node.js 18+ is needed.

Your progress is automatically saved to `data/progress.json`.

## Project Structure

```
index.html            App shell
src/app.js, app.css   Core application router, UI hydration, and design system
server.js             Zero-dependency local HTTP and state server
content/manifest.json Tab and chapter manifest
content/home/         Course dashboard and overview
content/program/      Introduction, schedule, applicability
content/week-00/      Week 0 set-up tasks, reading digests, check sheet
content/reference/    Glossary and reference sources
data/progress.json    Persistent user progress (git-ignored)
```
