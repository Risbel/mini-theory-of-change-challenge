# Mini Theory of Change — Challenge Rules

## Goal

Build a responsive React + Tailwind interface that implements:

1. Reason we exist (textarea with helper + 250-char counter)
2. People we serve (tag input)
3. Assumptions (editable table + CRUD + pagination)
4. Four fixed-height cards (Programmes, Direct Outcomes, Indirect Outcomes, Ultimate Impact)
5. Save button (local state only)

## Global Visual Rules

- Brand color: `#7E1E9B`
- Borders: `#E5E7EB`
- Cards: `rounded-xl`, subtle shadow, fixed height (e.g. `h-64`)
- Invisible scroll (`overflow-auto`, hidden scrollbars)
- Accessibility: focus rings, `aria-label` on icon buttons, proper labels

## Key UX Notes

- “Show more / Show less” scrolls internal content, not card height.
- CRUD uses `Enter` (save) and `Esc` (cancel); blur does not save.
- Tags: Enter adds, × removes, Backspace removes last when empty.
- Certainty pills: Very / Moderately / Uncertain (colored).
- Save button only active when data changes; prints JSON to console and resets dirty state.

## Technical Requirements

- React + Tailwind (Vite, JS variant)
- Local state only (no backend)
- Clean modular structure
- Responsive for mobile/tablet/desktop
- Focus on clarity and maintainability, not pixel-perfection
