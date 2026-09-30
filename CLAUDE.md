# Green Choice Electric (seth-electric)

Astro site, deployed to GitHub Pages.
- Repo: https://github.com/Usbmaker/green-choice-electric (a.k.a. `usbmaker/green-choice-electric`)
- Deployed URL: https://usbmaker.github.io/green-choice-electric/
- Dev: `npm run dev` (Astro default port 4321)
- Build: `npm run build` (CI deploys via `.github/workflows/deploy.yml`)
- Brand name in copy: **Green Choice Electric** (not "Seth Electric", not "ContentFarms.ai")
- `seth-electric-v2` (a sister clone of the same remote) was confirmed fully superseded — its HEAD commit was an ancestor of `origin/main` and it had no unpushed work — and was deleted 2026-09-30. This directory (`seth-electric`) is the only copy.

---

## Credential status — RESOLVED (2026-07-05)

The compromised token (`github_pat_11AZKFWQY0…`, named "Sol-MCP") has been
deleted from GitHub and replaced. It was Sol's GitHub MCP token that was
also embedded in the seth-electric-v2 git remote URL — not the green-choice-electric
deploy token (that is a separate fine-grained PAT created 2026-06-25, never compromised).

**No action required on session start.** Rotation is complete.

---

## Session handoff

*Last updated: 2026-09-30*

Pulled up to date with `origin/main` (`7c116d3`) on 2026-09-30 — picked up an ADA/WCAG 2.1 AA remediation pass (contrast, skip link, focus states, aria) and a new `ACCESSIBILITY.md` compendium that had been pushed via a separate worktree/PR but weren't yet in this local checkout.

Before ending a session in this directory, update this file with anything a new session needs to know (recent decisions, open items, status changes). This file is auto-loaded by Claude Code whenever a session starts here — keeping it current is what lets a fresh session pick up without re-deriving context.
