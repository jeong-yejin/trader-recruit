# Clean Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the recruitment site's existing code into focused modules while preserving runtime behavior exactly.

**Architecture:** Keep the App Router as the route adapter and move page composition into `features/recruitment`. Separate i18n contracts, event assets, layout infrastructure, page sections, visuals, and application-form responsibilities without changing the existing markup contracts or client behavior.

**Tech Stack:** Next.js 16.3.3 App Router, React 19.1.1, TypeScript 5.9.2, Node 24 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-03-clean-architecture-refactor-design.md`

## Global Constraints

- Structural refactor only; do not change CSS, animation algorithms, visual parameters, network endpoints, copy, route semantics, or form validation rules.
- Preserve all existing TemplateHouse DOM IDs, classes, nesting, stylesheet order, and script order.
- Preserve the existing uncontrolled form behavior and both endpoint and fallback `mailto:` submission paths.
- Do not add runtime dependencies.

### Task 1: Establish testable pure boundaries

**Files:**
- Create: `features/application/form-contract.ts`
- Create: `features/application/form-submit.ts`
- Create: `features/application/form-submit.test.ts`
- Create: `lib/i18n/routes.test.ts`
- Modify: `package.json`

**Interfaces:**
- `form-contract.ts` exports `FormValues = Record<string, FormDataEntryValue>`.
- `form-submit.ts` exports `fill(template: string, vars: Record<string, string>): string`, `serializeFormData(values: FormValues): string`, and `buildMailtoUrl(args: { email: string; subject: string; body: string }): string`.
- The helpers must remain browser-independent where possible so Node can test them.

- [ ] **Step 1: Add the test command and write failing tests**

  Add `"test": "node --experimental-strip-types --test"` to `package.json`. Create tests covering template replacement, deterministic form body serialization, and the fallback mailto URL shape. Import the not-yet-created helper module so the tests fail because the module is missing.

- [ ] **Step 2: Run the focused tests and verify the expected failure**

  Run `npm test -- features/application/form-submit.test.ts`. Expected result: test discovery fails with a missing-module error for `features/application/form-submit.ts`.

- [ ] **Step 3: Implement the minimal pure helpers**

  Extract the current `fill` behavior and the current `Object.entries(data).map(...).join("\\n")` and `mailto:` construction into typed functions. Preserve encoding, field order, subject template replacement, and fallback email exactly.

- [ ] **Step 4: Run the focused tests and verify they pass**

  Run `npm test -- features/application/form-submit.test.ts`. Expected result: all focused tests pass.

- [ ] **Step 5: Commit the pure-boundary extraction**

  Run `git add package.json features/application/form-contract.ts features/application/form-submit.ts features/application/form-submit.test.ts && git commit -m "refactor: extract application form helpers"`.

### Task 2: Split i18n responsibilities and centralize event assets

**Files:**
- Create: `lib/i18n/types.ts`
- Create: `lib/i18n/routes.ts`
- Create: `lib/i18n/dictionaries.ts`
- Create: `lib/events/assets.ts`
- Modify: `lib/i18n/index.ts`
- Modify: `lib/i18n/perp-dex-day/en.ts`
- Modify: `lib/i18n/perp-dex-day/ko.ts`
- Modify: `lib/i18n/token-2049/en.ts`
- Modify: `lib/i18n/token-2049/ko.ts`
- Modify: `components/Prize.tsx`
- Modify: `components/Process.tsx`
- Modify: `components/Partners.tsx`
- Modify: `components/Marquee.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- `lib/i18n/types.ts` owns `Dictionary`, `Segment`, `Field`, and `Choice`.
- `lib/i18n/routes.ts` owns `LOCALES`, `Locale`, `EVENTS`, `EventSlug`, `EVENT_LABELS`, `isLocale`, `isEvent`, and `otherLocale`.
- `lib/i18n/dictionaries.ts` owns dictionary imports and `getDictionary`.
- `lib/i18n/index.ts` re-exports the public i18n API so existing imports remain valid.
- `lib/events/assets.ts` exports typed event art, partner logo, marquee logo, and footer logo records with the same values currently embedded in components.

- [ ] **Step 1: Add route/dictionary boundary tests**

  Extend the Node tests with assertions that the two locale values, two event values, `getDictionary("perp-dex-day", "en")`, and `otherLocale` retain their current behavior. These tests should import public exports from `lib/i18n/index.ts`.

- [ ] **Step 2: Run the tests and verify the boundary tests fail for the new modules**

  Run `npm test -- features/application/form-submit.test.ts lib/i18n/routes.test.ts`. Expected result: both test files are discovered and fail with missing-module errors for the not-yet-created helper and route modules.

- [ ] **Step 3: Move the i18n types and route primitives**

  Copy the existing type declarations and route constants verbatim into their focused modules. Change dictionary files to import `Dictionary` from `../types`, and make `index.ts` re-export the same public names.

- [ ] **Step 4: Move dictionary lookup and event asset records**

  Move the dictionary registry into `dictionaries.ts`. Move each current `ART`/`LOGOS` record into `lib/events/assets.ts` with literal values unchanged. Update the five consumers to import asset metadata from the registry.

- [ ] **Step 5: Run tests and typecheck**

  Run `npm test` and `npm run typecheck`. Expected result: all tests pass and TypeScript reports no errors.

- [ ] **Step 6: Commit the domain-boundary refactor**

  Run `git add lib components/Prize.tsx components/Process.tsx components/Partners.tsx components/Marquee.tsx components/Footer.tsx && git commit -m "refactor: separate i18n and event assets"`.

### Task 3: Move layout, sections, visuals, and route composition

**Files:**
- Create: `features/recruitment/RecruitPage.tsx`
- Move: `components/Header.tsx` to `components/layout/Header.tsx`
- Move: `components/Footer.tsx` to `components/layout/Footer.tsx`
- Move: `components/StickyCta.tsx` to `components/layout/StickyCta.tsx`
- Move: `components/TemplateScripts.tsx` to `components/layout/TemplateScripts.tsx`
- Move: all current page section files to `components/sections/`
- Move: `CodeRain.tsx`, `MatrixRain.tsx`, `RetroGrid.tsx`, and `StageBackdrop.tsx` to `components/visuals/`
- Modify: `app/[lang]/[event]/page.tsx`
- Modify: `app/[lang]/layout.tsx`
- Modify: `features/application/ApplySection.tsx`

**Interfaces:**
- `features/recruitment/RecruitPage.tsx` accepts `{ lang: Locale; event: EventSlug; dictionary: Dictionary }` and owns only the current page section order.
- `app/[lang]/[event]/page.tsx` remains responsible only for params, metadata, static params, validation, and delegating to `RecruitPage`.
- `components/layout/*`, `components/sections/*`, and `components/visuals/*` preserve each component's current props and rendered JSX.

- [ ] **Step 1: Move files without changing implementation bodies**

  Move the listed files into their new directories. Update only relative imports and aliases needed for resolution; keep JSX, constants, comments, hooks, and CSS-facing attributes unchanged.

- [ ] **Step 2: Extract the route composition**

  Move the current return tree from `[event]/page.tsx` into `RecruitPage.tsx`. Leave metadata and route validation in the page file, then render `<RecruitPage lang={lang} event={event} dictionary={d} />`.

- [ ] **Step 3: Move the application section and form shell**

  Move the current `Apply` section to `features/application/ApplySection.tsx` and rename the exported component to `ApplySection`. Move the current `ApplyForm` implementation to `features/application/ApplyForm.tsx`; keep its current public prop and JSX behavior while importing extracted form helpers.

- [ ] **Step 4: Run typecheck and build**

  Run `npm run typecheck` and `npm run build`. Expected result: both commands exit with code 0 and all eight static routes are generated.

- [ ] **Step 5: Commit the module move**

  Run `git add app components features && git commit -m "refactor: organize page modules"`.

### Task 4: Split the application form UI responsibilities

**Files:**
- Create: `features/application/components/FormField.tsx`
- Create: `features/application/components/SelectField.tsx`
- Modify: `features/application/ApplyForm.tsx`
- Modify: `features/application/form-contract.ts`
- Modify: `features/application/form-submit.ts`

**Interfaces:**
- `FormField` keeps the current `{ name, label, required, error, children }` props and exact error markup.
- `SelectField` keeps the current `{ name, options, placeholder, required, flags }` props and native-select plus custom-list behavior.
- `ApplyForm` owns only form orchestration, current state, event handling, and field layout.

- [ ] **Step 1: Move `Field` and `Select` bodies unchanged**

  Move the module-scope components into their focused files, exporting them with the prop signatures above. Preserve native select synchronization, reset handling, outside-click handling, keyboard handling, ARIA attributes, and CSS classes.

- [ ] **Step 2: Replace local declarations with imports**

  Import `FormField` and `SelectField` in `ApplyForm.tsx`, then replace every local usage without changing field order, labels, required flags, or validation messages.

- [ ] **Step 3: Wire pure submit helpers**

  Replace the local `fill` and mailto string construction with imports from `form-submit.ts`. Keep `FormData` construction, endpoint request body, reset behavior, status messages, and busy-state handling unchanged.

- [ ] **Step 4: Run tests, typecheck, and build**

  Run `npm test && npm run typecheck && npm run build`. Expected result: all tests pass, TypeScript exits 0, and the four locale/event pages remain statically generated.

- [ ] **Step 5: Commit the form responsibility split**

  Run `git add features/application && git commit -m "refactor: separate application form concerns"`.

### Task 5: Final structural verification

**Files:**
- Modify: none unless verification finds an import or structure regression

- [ ] **Step 1: Verify the final file structure**

  Run `rg --files app components features lib | sort` and confirm no duplicate source component remains in the old `components/` root and all imports point at the new module locations.

- [ ] **Step 2: Run the complete verification suite**

  Run `npm test && npm run typecheck && npm run build`. Expected result: every test passes, typecheck exits 0, build exits 0, and the four event/locale routes are listed as static pages.

- [ ] **Step 3: Inspect the final diff for behavior changes**

  Run `git diff HEAD~4 --stat && git diff HEAD~4 -- public/resources app lib/i18n components features`. Confirm no CSS, copy, endpoint, animation parameter, route, or TemplateHouse contract changed.

- [ ] **Step 4: Commit any verification-only correction**

  If verification finds only import/path errors, correct them and run the complete verification suite again before committing with `git commit -am "fix: preserve refactor module boundaries"`. If no correction is needed, make no additional code change.
