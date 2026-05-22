# Battle Tracker Sidebar Layout Design

**Date:** 2026-05-22  
**Status:** Approved

## Problem

The Battle Tracker is the only module that scrolls off the bottom of the display on typical desktop monitors. The current three-row stacked grid (Setup + Saved Battles → Engagement Score → Battle State + Battle Intel) totals ~1,350px of content against a ~950px available viewport, forcing the `.view-body` scrollbar to activate. The layout also feels clumsy because the most-used panel (Battle Intel) is constrained to a `max-height: 520px` hard cap alongside a narrow Battle State column.

## Design

Replace the three-row stacked grid with a **two-column sidebar layout**:

- **Left sidebar (4/12 width, ~33%):** Battle Setup → Saved Battles → Battle State, stacked vertically. The sidebar scrolls independently if its content exceeds the viewport height (rare; most users won't notice).
- **Right main (8/12 width, ~67%):** Engagement Score on top, Battle Intel filling all remaining height. Battle Intel's existing internal scroll (`.battle-panel-scroll { overflow-y: auto }`) handles long unit lists, battle logs, and secondary objectives naturally.

The Engagement Score strip moves from full-width (span-12) to the right column only. At 8/12 width it is still comfortably wide for the 4-column YOU/OPP score display.

## What Changes

### HTML (`astra_militarum_dice_calculator_vFinal_themed_v2.html`)

Replace the `<div class="grid">` wrapper inside `#battleTrackerView .view-body` with a new two-column structure:

```
<div class="bt-layout">
  <div class="bt-sidebar">
    [card: Battle Setup]
    [card: Saved Battles]
    [card: Battle State]
  </div>
  <div class="bt-main">
    [card: Engagement Score]
    [card: Battle Intel]
  </div>
</div>
```

- Remove `span-4`, `span-8`, `span-12` classes from these five cards (no longer needed).
- All card content, element IDs, and event-driven attributes are untouched.

### CSS (`styles/app.css`)

Add new rules scoped to `#battleTrackerView`:

```css
/* Make view-body a flex column so bt-layout can fill height */
#battleTrackerView .view-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Two-column flex layout fills available height */
.bt-layout {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
  align-items: flex-start;
}

/* Left sidebar: fixed 4/12 width, independent scroll */
.bt-sidebar {
  flex: 0 0 calc(33.333% - 8px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  min-height: 0;
  max-height: 100%;
}

/* Right main: grows to fill remaining width, stacks score + intel */
.bt-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}

/* Battle Intel fills remaining right-column height */
#battleTrackerView .battle-panel-card {
  flex: 1;
  min-height: 0;
  max-height: none;
  overflow: hidden;
}
```

## What Does NOT Change

- All JavaScript: element IDs, event listeners, DOM queries — untouched.
- All card content: score buttons, phase controls, undo, stratagems, unit state list, battle log, secondaries.
- All other views: every rule is scoped to `#battleTrackerView` or the new `.bt-layout` / `.bt-sidebar` / `.bt-main` classes which don't exist elsewhere.
- Mobile responsive behaviour: the existing `@media (max-width: 900px)` breakpoint will need a rule to collapse `.bt-layout` to a single column (`flex-direction: column`), same as the current grid does.

## Responsive Consideration

Add to the existing mobile breakpoint (`@media (max-width: 900px)`):

```css
.bt-layout {
  flex-direction: column;
}
.bt-sidebar {
  flex: none;
  width: 100%;
  max-height: none;
  overflow-y: visible;
}
```

This restores vertical stacking on small screens, matching the current behaviour.

## Verification

1. Open the Battle Tracker at typical desktop resolution (1080p or 1440p). No outer scrollbar should appear — all five cards fit within the viewport.
2. Left sidebar (Setup, Saved Battles, Battle State) stacks top-to-bottom with consistent 16px gaps.
3. Right column shows Engagement Score on top, Battle Intel below expanding to fill remaining height.
4. Battle Intel internal scroll works: long unit lists scroll within the card; Secondaries and Battle Log tabs function normally.
5. All interactive controls work: score +1/−1 buttons, phase advancement, undo, stratagem browser, unit state updates.
6. At viewport width ≤ 900px, the layout collapses to single-column stacking (same as current mobile behaviour).
