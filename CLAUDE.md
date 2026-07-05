# Green Choice Electric (seth-electric)

Astro site, deployed to GitHub Pages.
- Repo: https://github.com/Usbmaker/green-choice-electric (a.k.a. `usbmaker/green-choice-electric`)
- Deployed URL: https://usbmaker.github.io/green-choice-electric/
- Dev: `npm run dev` (Astro default port 4321)
- Build: `npm run build` (CI deploys via `.github/workflows/deploy.yml`)
- Brand name in copy: **Green Choice Electric** (not "Seth Electric", not "ContentFarms.ai")
- Sister working copy at `/Users/harco/Projects/seth-electric-v2` clones the same remote — verify which directory is canonical before making divergent changes.

---

## Credential status — RESOLVED (2026-07-05)

The compromised token (`github_pat_11AZKFWQY0…`, named "Sol-MCP") has been
deleted from GitHub and replaced. It was Sol's GitHub MCP token that was
also embedded in the seth-electric-v2 git remote URL — not the green-choice-electric
deploy token (that is a separate fine-grained PAT created 2026-06-25, never compromised).

**No action required on session start.** Rotation is complete.
