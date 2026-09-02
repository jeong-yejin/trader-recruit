# Clean Architecture Refactor Design

## Goal

Reorganize the existing Next.js recruitment site into focused modules while preserving every existing route, rendered content, TemplateHouse class/id contract, animation, accessibility behavior, and application submission behavior.

## Scope

This is a structural refactor only. Do not change CSS, animation algorithms, visual parameters, network endpoints, copy, route semantics, or form validation rules. Do not add runtime dependencies.

## Architecture

The App Router page becomes a thin route adapter: it validates params, supplies metadata, and delegates page composition. The page composition moves to a recruitment feature module, while shared page sections, layout infrastructure, event assets, and application-form concerns live behind focused module boundaries.

The i18n module is split into route primitives, dictionary types, and dictionary lookup. Event-specific art and logo metadata moves out of presentational components into a typed asset registry. The application form is split into a section shell, field primitives, select behavior, and pure submission helpers; its uncontrolled-input behavior remains unchanged.

## Planned structure

```text
app/[lang]/
  layout.tsx
  page.tsx
  [event]/page.tsx

features/recruitment/
  RecruitPage.tsx

features/application/
  ApplySection.tsx
  ApplyForm.tsx
  form-contract.ts
  form-submit.ts
  components/
    FormField.tsx
    SelectField.tsx

components/layout/
  Header.tsx
  Footer.tsx
  StickyCta.tsx
  TemplateScripts.tsx

components/sections/
  Arena.tsx
  ArenaCarousel.tsx
  Faq.tsx
  FinalCta.tsx
  Hero.tsx
  Marquee.tsx
  Partners.tsx
  Process.tsx
  Prize.tsx
  SeatBand.tsx
  Who.tsx

components/visuals/
  CodeRain.tsx
  MatrixRain.tsx
  RetroGrid.tsx
  StageBackdrop.tsx

lib/events/
  assets.ts

lib/i18n/
  types.ts
  routes.ts
  dictionaries.ts
  index.ts
  perp-dex-day/{en,ko}.ts
  token-2049/{en,ko}.ts
```

## Invariants

- `/`, `/en`, `/ko`, and all four event routes keep their current behavior.
- `generateStaticParams`, metadata, locale validation, and event validation remain equivalent.
- Existing DOM IDs, classes, element nesting required by TemplateHouse scripts, and stylesheet/script order remain unchanged.
- `ApplyForm` remains an uncontrolled form and continues to support both the configured endpoint and fallback `mailto:` flow.
- Existing client boundaries remain client boundaries; no animation or form lifecycle semantics are changed.

## Verification

Run the existing `npm run typecheck` and `npm run build` commands after each major boundary move. Add focused tests for the extracted pure form helpers and route/dictionary boundaries using the repository's available Node runtime without adding a test dependency. Finish with a full test run and a final diff review for unintended CSS, copy, or asset changes.
