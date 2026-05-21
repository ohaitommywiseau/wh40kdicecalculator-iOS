# WH40k Companion App — Style Pass Design

**Date:** 2026-05-20  
**Scope:** Visual polish + targeted layout improvements across all 4 modules  
**Approach:** Approach 2 — Surgical changes + spacing consistency pass

---

## Goals

1. Make different cards and areas easier to read and distinguish from each other
2. Surface important information more prominently, especially on iPad
3. Normalize internal spacing inconsistencies that become more noticeable once card separation improves

## Out of Scope

- Responsive breakpoints — current behavior (collapse to single column at 900px) is kept as-is
- New features or data changes
- Any changes to localStorage schema or JS logic (except the Battle Tracker restructure and Calculator restructure noted below)

---

## Section 1 — Global: Amber Accent Headers

**What changes:** Every `.card` element's header gets a unified amber accent treatment.

- A 3px vertical amber bar (`var(--amber)` = `#dbaa4f`) on the left edge of the header
- A subtle left-to-right amber gradient (`rgba(219,170,79,0.12)` → transparent) on the header background
- A bottom border on the header using `rgba(219,170,79,0.35)`
- Card header titles shift from muted green (`var(--accent-2)`) to amber to match

**What this replaces:** The existing `h2::before` CSS rule that prepends `"> "` to section titles is removed in favour of the bar+gradient treatment.

**Applies to:** All `.card` headers across all 4 modules and the landing page.

**Error/alert text** (`--warn: #ff6262`, `--accent: #ff5e5e`) is unchanged and continues to be used for invalid states in the Army Builder, out-of-range values, and validation messages. Any places currently using inconsistent reds are normalized to `--warn`.

---

## Section 2 — Global: Spacing & Consistency Pass

Light normalization pass — no layout changes, just tightening inconsistent values.

| Property | Current (varies) | Standardized |
|---|---|---|
| Card body padding | 8px / 10px / 14px | `12px` |
| Label font-size | 0.62rem – 0.86rem | `0.72rem` |
| Card grid gap | 8px / 10px / 14px | `12px` |
| Card header font-size | 0.65rem – 0.80rem | `0.75rem` uppercase |

These are CSS-only changes in `styles/app.css`.

---

## Section 3 — Battle Tracker: Always-Visible Scoreboard

**Problem:** During active play the CP, VP, and Primary scores are inside a "Scoreboard" tab — players must tab-switch to check the score.

**Change:** The scoreboard content moves out of the tab panel into a permanent always-visible section directly above the tab panel.

### Always-visible score section layout

Two columns side by side:

| Left — "You" | Right — "Opponent" |
|---|---|
| Green-tinted amber header | Red-tinted amber header |
| CP · VP · Primary stat boxes | CP · VP · Primary stat boxes |
| +/− adjustment controls | +/− adjustment controls |

The amber accent header treatment (Section 1) applies to both player columns.

### Tab panel update

The tab panel loses the "Scoreboard" tab (now redundant). The remaining 3 tabs are:

1. **Secondaries** — secondary objective tracking (unchanged)
2. **Battle Log** — action history (unchanged)
3. **Unit State** — unit health/status tracker (unchanged)

### Files affected

- `astra_militarum_dice_calculator_vFinal_themed_v2.html` — Battle Tracker HTML restructure (`#battleTrackerView`)
- `js/app-battle.js` — tab initialization and panel toggle logic updated to reference 3 tabs instead of 4; score update functions wired to the new always-visible section
- `styles/app.css` — new player column styles, two-column score layout

---

## Section 4 — Calculator: Weapon Profile in Results Card

**Problem:** The weapon profile card (Range, A, BS, S, AP, D) sits in a separate `span-4` card alongside the results. When an opponent needs to check their save, the AP value is in a different card from the engagement analysis.

**Change:** The standalone weapon profile card is removed. Its content is integrated into the top of the Engagement Analysis card in this order:

1. **Weapon name** — `var(--green-bright)`, bold, left-aligned, `0.82rem`
2. **Ability pills row** — all abilities rendered as identical green pills (`rgba(143,227,172,0.07)` background, `rgba(143,227,172,0.22)` border, `var(--accent-2)` text, `0.6rem` uppercase). Existing tooltip behavior is fully preserved.
3. **Stat badge row** — six bordered chips with value + label:
   - Range, Attacks, BS — green (`var(--accent-2)`)
   - Strength — blue (`#c4d8ff`)
   - AP — orange (`#ff9e6a`), slightly warmer background to draw the eye
   - Damage — yellow-green (`var(--good)`)
4. **Existing result boxes** — Attacks · To Hit · To Wound · Save · Avg Damage (unchanged)

The space freed by removing the `span-4` weapon profile card is absorbed by expanding the Engagement Analysis card from `span-8` to `span-12`.

> **Note:** The unit stat line box inside the Attacker card (the datasheet row showing A / WS·BS / S / T / W / Sv for the selected unit) is a separate element and is **not changed** by this section.

### Files affected

- `astra_militarum_dice_calculator_vFinal_themed_v2.html` — remove standalone weapon profile card, expand results card to `span-12`
- `js/app-calculator.js` — weapon profile render logic moved into the results card render function; ability pill + stat badge HTML generation added
- `styles/app.css` — new `.weapon-profile-strip` styles (name, ability pills, stat badges)

---

## Verification

1. **Army Builder** — select a faction and unit; confirm all cards have amber headers, spacing feels consistent, invalid selections still show red
2. **Combat Calculator** — select a unit and weapon; confirm weapon name, ability pills (with working tooltips), and stat badges appear above the result boxes; confirm AP is distinctly orange; confirm results card is full width
3. **Battle Tracker** — start a battle; confirm CP/VP/Primary are visible without any tab interaction; adjust a score with +/−; switch through the 3 remaining tabs and confirm no reference to the old Scoreboard tab
4. **Rulebook** — run a search; confirm all cards have consistent amber headers and padding
5. **Landing page** — confirm amber header treatment applies to any cards present
6. **Responsive** — resize below 900px; confirm single-column collapse still works as before
