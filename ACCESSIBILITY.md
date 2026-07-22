# Accessibility (ADA / WCAG) Compliance Compendium — Green Choice Electric

**Read this before adding or changing anything on the site.** It's written so a
future session — with none of this conversation's context — has everything
needed to keep the site WCAG 2.1 Level AA compliant, or to re-verify and fix
it after new content/features are added.

- Repo: `usbmaker/green-choice-electric`
- Deployed: https://usbmaker.github.io/green-choice-electric/
- Standard targeted: **WCAG 2.1 Level AA** (the standard the U.S. DOJ and
  federal courts point to for ADA website compliance)
- Last full verification: 2026-07-21 — axe-core reported **zero violations**
  across all 8 pages (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice` tags)
- Rollback point if anything needs undoing: git tag
  `pre-ada-compliance-backup-2026-07-21` on `main`, pointing at the last
  commit before any of this work started (`16e88f8`)

## 1. Current state / what's merged vs. pending

Work happened across two rounds, on branch `worktree-ada-compliance`:

| Commit | What | Status as of 2026-07-21 |
|---|---|---|
| `1b596b0` | Initial WCAG remediation: contrast fixes, skip link, focus ring, aria-expanded | Merged to `main` via PR #1 |
| `b9b9b01` | Fixes for regressions/gaps a live axe-core + keyboard audit caught (the first pass alone wasn't enough — see §5) | Merged to `main` via PR #1 |
| `dd93ad2` | Restored the original vivid brand gradient using a text-scrim technique instead of darkening backgrounds (see §3) | **NOT yet merged** — pushed to `worktree-ada-compliance`, needs a PR opened at `https://github.com/Usbmaker/green-choice-electric/compare/main...worktree-ada-compliance` and merged |

**Before doing new accessibility work, check whether `dd93ad2` has landed on `main` yet** (`git log origin/main --oneline` and look for it) — if not, the live site still has the *first-round* (darker, fully-compliant-but-less-vivid) gradient treatment, not the current scrim-based one described below.

## 2. The compliant color palette

Every one of these substitutions was derived by computing actual WCAG contrast
ratios (not eyeballed), against the *real* background each color sits on —
including near-white surfaces like `#f0f0f3`/`#fafafa`/`#dcfce7`, not just
pure white, which matters (see §5 for why).

| Use | Original bright value | Compliant value | Contrast (worst-case bg) |
|---|---|---|---|
| Text/links/button-bg on white or near-white | `#16b84a` / `#0d8c32` | **`#0e7c3c`** | ≥4.5:1 against `#ffffff`, `#f0f0f3`, `#dcfce7` |
| Muted caption/label gray | `#8792a2` | **`#667384`** | ≥4.5:1 against `#ffffff`, `#fafafa`, `#f8f9fb` |
| Teal accent used as text (EV Charger service card) | `#0fb8a0` | **`#0b8473`** | 4.6:1 against white |

**Do not use `#16b84a`, `#0d8c32`, `#8792a2`, or `#0fb8a0` for text, links, or
button backgrounds on a light surface.** They will fail contrast. They are
still fine — and still used, deliberately — for:
- Decorative icons inside colored circle/pill badges that sit next to a
  visible text label (the icon is redundant with the label, so no contrast
  rule applies)
- The "Green Choice" logotype text and the small logo-mark icon square
  (brand/logo elements are exempt from text contrast rules)
- Purely decorative gradients/progress-bar-style UI that hold no text

If you add a **new** UI element using the bright green/teal/gray as actual
readable text on a light background, it will almost certainly fail an audit —
use the compliant value instead.

## 3. The hero/CTA gradient + scrim-panel pattern

The site's signature vivid gradient — used for the top "page header" band on
every page and the bottom "Ready to get started" CTA bands — is:

```css
background: linear-gradient(340deg, hsl(145,80%,38%) 0%, hsl(162,82%,40%) 50%, hsl(175,85%,38%) 100%);
```

This gradient is **original-brightness** and is **not** WCAG compliant on its
own for white text sitting directly on it (worst-case stop measures ~2.5:1).
Do not darken it — instead, wrap the text content in a scrim panel:

```html
<div class="max-w-3xl mx-auto px-4" style="background:rgba(0,0,0,0.34);border-radius:24px;padding:36px 40px;">
  <!-- eyebrow / h1 / lead paragraph, or h2 / paragraph / CTA button -->
</div>
```

- `rgba(0,0,0,0.34)` is the **minimum-plus-margin** alpha needed for white
  text to clear 4.5:1 against the darkest of the three gradient stops (the
  mid teal stop). Don't reduce it below ~0.30 without recomputing.
- Padding was `36px 40px` for the wider `max-w-3xl` blocks and `32px 36px`
  for narrower `max-w-xl`/`max-w-2xl` bottom-CTA blocks — purely a visual
  choice, not a compliance requirement.
- **Any new hero/CTA section using this gradient must wrap its text in a
  scrim panel like this.** If you skip it, the text will fail contrast.
- The homepage's asymmetric split-hero (`src/pages/index.astro`) applies the
  same idea but to smaller individual pieces instead of one big panel: the
  lead paragraph, the phone/services links, the trust-badge chip, and the
  star-rating pill each got their own small `rgba(0,0,0,0.34)` background.
  The giant `background-clip:text` gradient-fill headline is exempt (huge
  text, and gradient-fill text isn't reliably evaluated by contrast checkers
  anyway) and was left untouched.
- The small logo-mark icon square (Header/Footer) uses a *lighter* version
  of this same gradient (`hsl(145,80%,40%)`/`hsl(175,85%,38%)`) with **no**
  scrim — it's exempt as part of the logo, and the white bolt icon inside it
  isn't flagged by any of the WCAG rule sets that were run.

## 4. Structural accessibility features already in place — do not remove

- **Skip link**: `src/layouts/Layout.astro` has `<a href="#main-content" class="skip-link">Skip to main content</a>` as the very first element in `<body>`, styled to be visually hidden until keyboard-focused (`.skip-link:focus { top: 8px; }`).
- **`<main>` landmark**: every page in `src/pages/*.astro` wraps its entire content (everything between `<Header />` and `<Footer />`) in `<main id="main-content" tabindex="-1">...</main>`. This is what the skip link jumps to, and it's also what satisfies the WCAG "region"/landmark-navigation requirement for screen readers. **If you add a new page, it needs this wrapper too** — copy the pattern from any existing page in `src/pages/`.
- **Mobile menu ARIA state**: `src/components/Header.astro` — the mobile toggle button has `aria-expanded="false"` and `aria-controls="mobile-menu"`, and the click handler (`<script>` at the bottom of that file) calls `btn?.setAttribute('aria-expanded', String(!open))` on every toggle. Don't remove this if you touch the menu JS.
- **Focus ring on form inputs**: `src/pages/contact.astro` — `.form-input:focus { border-color: #0e7c3c !important; box-shadow: 0 0 0 3px rgba(14,124,60,0.4) !important; }`. The inputs also have `outline:none` inline, which is only safe *because* this box-shadow ring replaces it — don't remove the box-shadow rule without adding an equivalent visible focus indicator.
- **`aria-label` on duplicate nav landmarks**: `src/pages/services.astro` has a second `<nav>` (the sticky quick-jump category bar) with `aria-label="Service categories"` so screen readers can distinguish it from the header's main `<nav>`. Any new `<nav>` element on a page that already has one needs a distinguishing label too (axe rule: `landmark-unique`).
- **`src/lib/url.js`** — a `withBase()` helper that prepends the GitHub Pages base path to internal links/images at build time. Unrelated to accessibility directly, but every internal `href`/`src` in the codebase uses it — don't hardcode a bare `/path` for a new internal link/image, use `withBase('/path')` instead, or it will 404 on the deployed site.

## 5. How to re-verify compliance (do this — don't just eyeball it)

**Important lesson from this project**: manual code review and "it looks
fine" both missed real bugs twice. The first fix pass looked complete on
inspection but a real automated + keyboard test caught a WCAG regression
(bright text that was fine had been needlessly darkened, wrong background
assumed for a couple of elements, missing `<main>` landmark, duplicate nav
labels). **Always verify with a real headless browser, not just by reading
the CSS.**

This project uses **Playwright + axe-core** (the same category of tool
professional accessibility auditors use). Steps to re-run:

```bash
# 1. Build and start the dev server
npm run build
npm run dev   # note the port it prints, e.g. localhost:4321

# 2. Make sure a Chromium build is available for Playwright
npx playwright install chromium   # skip if already cached

# 3. Run the audit script below (save as a1y-check.js, adjust BASE port)
node a11y-check.js
```

Audit script (`a11y-check.js`) — fetches axe-core from a CDN (needs internet
access) and runs it against every page, plus a real keyboard walkthrough:

```js
const { chromium } = require('playwright');

const BASE = 'http://localhost:4321/green-choice-electric'; // match your dev server port
const PAGES = ['/', '/about', '/contact', '/gallery', '/reviews', '/services', '/terms', '/privacy'];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const axeSource = await (await fetch('https://cdn.jsdelivr.net/npm/axe-core@4/axe.min.js')).text();
  let anyFail = false;

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] },
      });
    });
    const mainCount = await page.evaluate(() => document.querySelectorAll('main').length);
    console.log(`${path}: violations=${results.violations.length} (${results.violations.map(v=>v.id+':'+v.nodes.length).join(',')}) <main> count=${mainCount}`);
    if (results.violations.length > 0) anyFail = true;
  }

  // Keyboard walkthrough: skip link must be the first tab stop and must focus <main>
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => document.activeElement.className);
  await page.keyboard.press('Enter');
  const landed = await page.evaluate(() => document.activeElement.tagName + '#' + document.activeElement.id);
  console.log('skip-link class:', first, '-> lands on:', landed);

  // Mobile menu: aria-expanded must flip on click/Enter
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const btn = page.locator('#mobile-btn');
  const before = await btn.getAttribute('aria-expanded');
  await btn.focus();
  await page.keyboard.press('Enter');
  const after = await btn.getAttribute('aria-expanded');
  console.log('mobile menu aria-expanded:', before, '->', after);

  console.log(anyFail ? 'RESULT: FAIL' : 'RESULT: PASS');
  await browser.close();
}
main();
```

**Expected clean output**: `violations=0` on all 8 pages, `<main> count=1` on
every page, skip-link lands on `MAIN#main-content`, aria-expanded flips
`false -> true`, final line `RESULT: PASS`.

If you don't have Playwright available as a project dependency, install it
ad hoc without touching `package.json`:
```bash
cd /tmp && npm install playwright --no-save && node /path/to/a11y-check.js
```

Also worth spot-checking manually in a real browser: Tab through the whole
page and confirm the visible focus ring shows up on every interactive
element (links, buttons, form fields) — `outline: none` anywhere without a
replacement focus style is an automatic red flag.

## 6. Checklist for any future addition/change to the site

Run through this for every new page, section, or component:

- [ ] Every new `<img>` has meaningful `alt` text (empty `alt=""` only for
      purely decorative images)
- [ ] Every new icon-only button/link has an `aria-label`
- [ ] Any new green/teal/gray text on a light background uses the
      **compliant** hex values from §2, not the bright originals
- [ ] Any new section using the brand gradient wraps its text in a scrim
      panel per §3 — don't darken the gradient itself
- [ ] Any new form field has a `<label for="...">` matching its `id`, and if
      you set `outline:none`, add an equivalent visible `:focus` style
      (border-color change alone is not enough — add a box-shadow ring)
- [ ] Any new page is wrapped in `<main id="main-content" tabindex="-1">`
      like the existing pages
- [ ] Any new `<nav>` on a page that already has one gets a distinguishing
      `aria-label`
- [ ] Heading levels stay sequential (don't skip from `h1` straight to `h3`)
- [ ] Run the audit script in §5 before shipping — **zero violations, not
      "looks fine"**

## 7. Known gaps / deliberately out of scope

- **No public "Accessibility Statement" page yet.** This is a commonly
  recommended, good-faith practice (a short page stating the commitment to
  accessibility + a contact channel for reporting issues) but wasn't built.
  Worth adding if there's ever time — low effort, meaningful signal.
- **Decorative icon colors were deliberately left at the bright original
  shades** (paired with adjacent visible text labels, so no contrast rule
  applies) — this is intentional, not an oversight, and keeps the palette as
  close to the original brand as possible everywhere compliance doesn't
  strictly require a change.
- **This was verified with automated tooling (axe-core) and scripted
  keyboard testing, not a live screen reader (NVDA/VoiceOver) session.**
  Axe-core catches the vast majority of common WCAG failures and is what
  most automated legal-risk scanners use, but a manual screen-reader pass
  would be the next level of rigor if it's ever worth the time.

## 8. Reference material for Seth (non-technical)

A plain-language summary of all of this exists as a client-facing report:
`~/Desktop/Green-Choice-Electric-Accessibility-Report.pdf` (also published as
a Claude artifact). That document is written for the business owner, not for
a future engineering session — this file (`ACCESSIBILITY.md`) is the
technical counterpart.
