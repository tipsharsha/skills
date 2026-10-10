#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    target: '',
    title: 'Technical Training Program',
    docno: 'TM-DOC-001',
    desc: 'Structured engineering training program and interactive manual.',
    sub: 'Hands-on curriculum with step-by-step verification',
    weeks: 12,
    author: 'tipsharsha',
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--title' && args[i + 1]) options.title = args[++i];
    else if (a === '--docno' && args[i + 1]) options.docno = args[++i];
    else if (a === '--desc' && args[i + 1]) options.desc = args[++i];
    else if (a === '--sub' && args[i + 1]) options.sub = args[++i];
    else if (a === '--weeks' && args[i + 1]) options.weeks = parseInt(args[++i], 10) || 12;
    else if (a === '--author' && args[i + 1]) options.author = args[++i];
    else if (!a.startsWith('--') && !options.target) options.target = a;
  }

  if (!options.target) {
    console.error('Usage: node scripts/scaffold.js <target-directory> [options]');
    console.error('Options:');
    console.error('  --title <title>      Program title (e.g. "GPU Kernel Optimization")');
    console.error('  --docno <docno>      Document code (e.g. "TM-GPU-001")');
    console.error('  --sub <subtitle>     Subtitle / focus description');
    console.error('  --desc <description> Brief package description');
    console.error('  --weeks <number>     Number of planned weeks (default: 12)');
    process.exit(1);
  }

  return options;
}

const opts = parseArgs();
const targetRoot = path.resolve(process.cwd(), opts.target);
const templateRoot = path.resolve(__dirname, '..', 'template');

if (!fs.existsSync(templateRoot)) {
  console.error('Error: Template directory not found at: ' + templateRoot);
  process.exit(1);
}

const slug = opts.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'training-program';
const today = new Date().toISOString().slice(0, 10);

console.log('Scaffolding new technical curriculum app...');
console.log('Target: ' + targetRoot);
console.log('Title:  ' + opts.title);
console.log('Doc No: ' + opts.docno);
console.log('Weeks:  ' + opts.weeks);

function copyDirRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, dstPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content
        .replace(/{{TITLE}}/g, opts.title)
        .replace(/{{DOCNO}}/g, opts.docno)
        .replace(/{{SUBTITLE}}/g, opts.sub)
        .replace(/{{DESCRIPTION}}/g, opts.desc)
        .replace(/{{SLUG}}/g, slug)
        .replace(/{{DATE}}/g, today);
      fs.writeFileSync(dstPath, content, 'utf8');
    }
  }
}

// 1. Copy template files with placeholder replacements
copyDirRecursive(templateRoot, targetRoot);

// 2. Customize manifest.json with weeks
const manifestPath = path.join(targetRoot, 'content', 'manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.title = opts.title;

  const baseTabs = manifest.tabs.filter(t => t.id === 'home' || t.id === 'program' || t.id === 'week-0' || t.id === 'reference');
  const weekTabs = [];

  for (let w = 1; w <= opts.weeks; w++) {
    weekTabs.push({
      id: 'week-' + w,
      group: 'Weeks',
      label: 'Week ' + w,
      sub: 'Module ' + w,
      planned: true
    });
  }

  // Insert weeks before reference
  const refIndex = baseTabs.findIndex(t => t.id === 'reference');
  if (refIndex >= 0) {
    manifest.tabs = [
      ...baseTabs.slice(0, refIndex),
      ...weekTabs,
      ...baseTabs.slice(refIndex)
    ];
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

// 3. Customize program schedule table with weeks
const schedPath = path.join(targetRoot, 'content', 'program', 'schedule.html');
if (fs.existsSync(schedPath)) {
  let rows = '<tr class="now"><td class="c mono"><a href="#/week-0">0</a></td><td>SET-UP</td><td>Environment set-up, toolchain installation, verification.</td><td>R1, R2</td><td>Operating environment and verified toolchain.</td><td><span class="badge now">This issue</span></td></tr>\n';

  for (let w = 1; w <= opts.weeks; w++) {
    rows += `    <tr><td class="c mono"><a href="#/week-${w}">${w}</a></td><td>MOD-${w}</td><td>Module ${w} topic and exercises.</td><td>R1</td><td>Verified implementation.</td><td><span class="badge later">Later revision</span></td></tr>\n`;
  }

  const schedHtml = `<p>The program consists of Week 0 (Set-up), followed by ${opts.weeks} modular training weeks. Each week requires approximately 6 to 8 hours.</p>

<table>
  <caption>Table 1 · Program schedule</caption>
  <thead><tr><th class="c">Week</th><th>Module</th><th>Subject</th><th>Main references</th><th>Output</th><th>Status</th></tr></thead>
  <tbody>
    ${rows.trim()}
  </tbody>
</table>
`;
  fs.writeFileSync(schedPath, schedHtml, 'utf8');
}

// Ensure data folder has empty gitkeep
fs.mkdirSync(path.join(targetRoot, 'data'), { recursive: true });

console.log('\n[SUCCESS] Project created successfully in ' + targetRoot);
console.log('\nTo start the app:');
console.log('  cd ' + opts.target);
console.log('  npm start');
console.log('\nThe app will open automatically in your browser at http://localhost:4318/');
console.log('Enjoy building your curriculum!');
