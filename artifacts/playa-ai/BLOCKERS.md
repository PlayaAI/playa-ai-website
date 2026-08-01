# Playa AI — Blocker Register and Audit Documentation

_Updated: 2026-08-01. Owner: main agent (technical implementation)._
_This document covers: (A) unresolved implementation blockers, (B) the original 36-item PDF audit matrix, and (C) the comprehensive implementation matrix for all engineering tasks._

---

## Part A — Blocker Resolution Register

Blockers are grouped by type. Every blocker includes the original audit ID, current failure, resolution options, and responsible owner. The goal is to make each blocker an answerable question, not a parking lot.

---

### Group 1 — Product / Privacy

#### BLOCKER P1 — Connect App: data collection disclosure
- **Audit ID:** #14 (rewrite Connect disclosure), #13 (ship /privacy)
- **Current failure:** The Connect app at `https://connect.playai.party` currently presents no audited consent or disclosure screen before the microphone is activated. The `/privacy` route on `https://playa-ai.org/privacy` returns HTTP 200 with the branded 404 UI — the live Connect app links to this route.
- **Why code cannot fix it yet:** Privacy-related copy cannot be invented. The following facts must be confirmed before anything is written:
  - Does Connect record audio to disk? Or does it stream and discard?
  - If recorded: What is the raw-audio retention period?
  - Who is the transcription provider? (OpenAI Whisper, Deepgram, other?)
  - What is the transcript/summary retention period?
  - What third-party processors receive data (and under what legal basis)?
  - Who is the data controller and who is the operator?
  - Is there a deletion mechanism? Who owns it?
- **Exact questions:**
  1. "Does Connect record raw audio to a server? If so, which server and who controls it?"
  2. "How long are recordings retained? Who can delete them and how?"
  3. "Which transcription service receives the audio? Do they retain data?"
  4. "Is the Connect app currently in a live pilot with real participants? If so, do they have a consent disclosure?"
- **Documents required:** Product specification, Connect app data-flow diagram, privacy review, processor agreements.
- **Owner:** Product + Legal
- **Affected routes/files:** `connect.playai.party` (external), `/privacy` (not yet built), `public/llms.txt` (currently says "live pilot")
- **Resolution options:**
  - Option A (Recommended): Pause new participant intake on Connect until disclosure is written and /privacy is published. Write the disclosure based on documented facts. Ship /privacy.
  - Option B: Add a temporary disclaimer on the Connect app stating "This is a research prototype. No data is stored." — only if true.
  - Option C: Remove "Live Pilot" status label from Work.tsx and llms.txt until disclosure is confirmed.
- **Legal/privacy implication:** CCPA/GDPR-adjacent exposure if audio is collected from California or EU persons without adequate disclosure.
- **Implementation task after decision:** Build `/privacy` page using confirmed facts; rewrite Connect disclosure screen; update status label in Work.tsx.
- **Verification test:** `curl -sL https://playa-ai.org/privacy` returns a real privacy page (not 404). Connect app disclosure is visible before microphone activation.
- **Priority:** P0 — before any further participant intake on Connect.
- **Timeline:** Can be resolved this week if product owner answers the questions above.

---

#### BLOCKER P2 — /privacy page (website side) — REDIRECT IMPLEMENTED
- **Audit ID:** #13
- **Previous failure:** `/privacy` returned HTTP 200 with the branded 404 page (soft-404).
- **Current state (2026-08-01):** `/privacy` now returns HTTP **308 Permanent Redirect → /living-trust-framework** via the production server. A prerendered `/privacy/index.html` is also generated with `noindex` meta and canonical `https://playa-ai.org/living-trust-framework`, providing a client-side fallback via `window.location.replace()`.
- **Audit item #13 status:** **Partial** — broken destination resolved; the Living Trust Framework serves as the privacy policy destination. A complete standalone `/privacy` page with verified data-collection, retention, processor, and deletion facts remains outstanding (see BLOCKER P1).
- **What remains:** Full privacy policy with confirmed facts (data controller, processors, retention periods, deletion mechanism). The redirect is a necessary first step but does not complete audit item #13 on its own.
- **Owner:** Legal + Product
- **Priority:** P1 (down from P0 — broken destination resolved; full policy still needed)

---

#### BLOCKER P3 — Connect "Live Pilot" status
- **Audit ID:** #14 (Connect disclosure)
- **Current failure:** Work.tsx and llms.txt label Connect as "Live Pilot." This status claim requires verified confirmation that the pilot is currently active and that participants are consented.
- **Exact question:** "Is Connect actively collecting data from participants right now? Are those participants informed about data handling?"
- **Owner:** Product
- **Resolution options:**
  - Option A: Confirm the pilot is live and consented → keep the label.
  - Option B (Recommended): Change label to "Live — consent disclosure pending" or "Limited pilot" until disclosure is confirmed.
- **Priority:** P1
- **Timeline:** Can resolve today with a one-line answer from the product team.

---

### Group 2 — Legal / Organizational

#### BLOCKER L1 — Organizational / fiscal-sponsorship wording confirmation
- **Audit ID:** #26 (decision record), #31 (MAF/EIN on /about)
- **Current failure:** Playa AI's canonical web copy, metadata, and llms.txt use "Playa AI is a human-centered AI initiative fiscally sponsored by Mystic Arts Foundation, a California nonprofit and U.S. 501(c)(3) public charity." This wording was approved by the session user. The audit PDF's residual vault note states: "MAF's formal governance of the initiative is still unconfirmed, and 'public charity' as a sub-classification is not established anywhere in the vault."
- **Exact question:** "Is Mystic Arts Foundation actively and formally the fiscal sponsor of Playa AI? Has MAF's 501(c)(3) public-charity classification been confirmed via IRS documentation or EIN lookup?"
- **Documents required:** MAF's EIN, a current IRS determination letter or 990 filing confirming 501(c)(3) status, a signed fiscal-sponsorship agreement between Playa AI and MAF.
- **Owner:** Leadership / Finance
- **Resolution options:**
  - Option A (Recommended): Confirm via EIN search (IRS Tax Exempt Organization Search) and produce the signed FSA. Add MAF's EIN to /about when built.
  - Option B: Change wording to a safer "Playa AI operates under fiscal sponsorship" until the specific details are confirmed.
- **Legal implication:** Publishing an incorrect 501(c)(3) classification could mislead donors about tax-deductibility of contributions.
- **Priority:** P1 (used on all 7 canonical pages and in llms.txt)

---

#### BLOCKER L2 — Living Trust Framework LICENSE
- **Audit ID:** #3
- **Current failure:** The Living Trust Framework GitHub repo (`github.com/PlayaAI/playa-ai-living-trust-framework`) has no LICENSE file. The README discloses "licence pending."
- **Why code cannot fix it:** The licence choice is an organizational decision. Cannot publish one without authorization.
- **Exact question:** "What open-source licence should the Living Trust Framework be published under?" (e.g., CC BY 4.0, Apache 2.0, MIT, CC BY-SA 4.0)
- **Owner:** Leadership + Legal
- **Resolution options:**
  - Option A: CC BY 4.0 — allows use with attribution; appropriate for frameworks/protocols.
  - Option B: CC BY-SA 4.0 — copyleft; derivatives must carry same licence.
  - Option C: Apache 2.0 — appropriate if implementers might add code.
- **Recommended:** CC BY 4.0 for a public-interest framework (allows open adoption, requires attribution).
- **Implementation task:** Add LICENSE file to GitHub repo and update README.
- **Priority:** P2 (deferred to GitHub phase per task instructions)

---

#### BLOCKER L3 — MAF regranting confirmation
- **Audit ID:** #32
- **Current failure:** It is unconfirmed whether MAF operates as a pure fiscal sponsor (pass-through) or as a regranting organization for Playa AI funds.
- **Exact question:** "Does MAF hold Playa AI funds in a dedicated account and pay expenses directly? Or does it regrant to Playa AI as an operating entity?"
- **Owner:** Finance / Leadership
- **Priority:** P2

---

#### BLOCKER L4 — Crisis protocol
- **Audit ID:** #33
- **Current failure:** No published crisis or mental-health protocol exists for events or for the Connect app.
- **Why code cannot fix it:** Clinical review required. Cannot publish mental-health guidance without professional input.
- **Exact question:** "Has a crisis protocol been drafted? Has it been reviewed by a mental-health professional?"
- **Owner:** Legal / Clinical
- **Priority:** P2

---

### Group 3 — Evidence / Metrics

#### BLOCKER E1 — Participant aggregate
- **Audit ID:** #17 (participant total), #26 (decision record)
- **Current failure:** Website says "80+ early participants across pilots and workshops." The audit PDF recommends "≈520 across two pilots, a workshop series and monthly build sessions, 2025–26." llms.txt correctly says "80+." A discrepancy exists between the audit recommendation and published figures.
- **Exact question:** "What is the verified participant count, broken down by: (a) Black Rock City pilot, (b) London pilot, (c) workshop series, (d) monthly build sessions?"
- **Documents required:** Sign-in sheets, Luma registrations, Connect session logs, or equivalent attendance records.
- **Owner:** Operations
- **Resolution options:**
  - Option A: Verify the ≈520 figure with documentation and update the website.
  - Option B: Keep "80+" until records are verified.
- **Implementation task:** Update `Work.tsx` participant stats strip and `llms.txt` once verified.
- **Priority:** P1

---

#### BLOCKER E2 — Event count and London pilot inclusion
- **Audit ID:** #30 (reconciled nine-row event log)
- **Current failure:** The audit recommends publishing a reconciled nine-row event log that includes the London pilot and a definition of "Playa AI public event." The Events page currently lists events without this reconciliation.
- **Exact question:** "Did the London event qualify as a 'Playa AI public event' by the initiative's own definition? If so, what were the date, location, format, and approximate attendance?"
- **Owner:** Operations / Editorial
- **Priority:** P2

---

#### BLOCKER E3 — "Year-One microgrant program is in development"
- **Audit ID:** #10 (remove unsupported microgrant language)
- **Current failure:** `Home.tsx` Operating Model "Fund" item (line 221) and DOORS array (line 331) say "Year-One microgrant program is in development." The audit's original requirement was to "remove 'artist microgrants' from the donor CTA until eligibility, a budget and a review process are published." The text has been softened but still implies a program exists in development without confirmed details.
- **Exact question:** "Has the Year-One microgrant program been formally approved with a budget, timeline, and eligibility criteria? If not, should this sentence be removed entirely?"
- **Owner:** Leadership / Operations
- **Priority:** P2

---

#### BLOCKER E4 — OpenAI grant record
- **Audit ID:** #27
- **Current failure:** The audit references an OpenAI grant record that requires either correction or a licence decision. The nature of this item is not fully clear from available documentation.
- **Exact question:** "What was the OpenAI grant? Is there a record of it that should be publicly disclosed or corrected? Does it have licensing implications for the website or the Living Trust Framework?"
- **Owner:** Leadership
- **Priority:** P2 (external records phase)

---

### Group 4 — Hosting / Infrastructure

#### BLOCKER H1 — Genuine HTTP 404 status — RESOLVED LOCALLY
- **Audit ID:** #16
- **Previous failure:** All unknown paths returned HTTP 200. Replit static hosting catch-all.
- **Current state (2026-08-01):** Replaced static-hosting deployment with a minimal Node.js production server (`server.js`). The server:
  - Serves known prerendered routes with HTTP 200.
  - Returns HTTP 308 → `/living-trust-framework` for `/privacy`.
  - Returns genuine HTTP 404 with the branded `dist/public/404.html` for unknown routes.
  - Verified locally with `curl` (see this session's final report).
- **Production activation:** Requires the user to republish the app. The deployment run command has been updated to `cd artifacts/playa-ai && pnpm run build && node server.js`.
- **Priority:** RESOLVED — pending user republish

---

#### BLOCKER H2 — Compression and cache headers
- **Audit ID:** #2
- **Current failure:** Cannot be verified without a published deployment.
- **Post-deployment test:** `curl -sI https://playa-ai.org/assets/index-DSsSJ05k.js | grep -i 'cache-control\|content-encoding'`
- **Owner:** Post-deployment QA
- **Priority:** POST-DEPLOYMENT

---

#### BLOCKER H3 — JavaScript bundle size (performance debt)
- **Not a PDF audit item**
- **Current state:** JS bundle is 636.97 kB minified (175.99 kB gzip). Vite warns >500 kB.
- **Why not implemented now:** Route-level lazy loading (`React.lazy`) would cause a visible flash of empty content on direct navigation because the app uses `createRoot` (not `hydrateRoot`). With `createRoot`, React immediately replaces the prerendered static HTML with its React tree — if that tree shows a Suspense fallback while the lazy chunk loads, the static content disappears briefly.
- **Recommended future approach:**
  1. Migrate `main.tsx` from `createRoot` to `hydrateRoot` (requires all page components to be SSR-compatible).
  2. Add `React.lazy` for non-home routes.
  3. This enables genuine SSR hydration without flash and unlocks code splitting.
- **Alternative:** Use Vite `rollupOptions.output.manualChunks` to split vendor libraries (Framer Motion, Radix UI, Lucide) without needing lazy routing.
- **Priority:** P3 (performance, not audit blocker)

---

#### BLOCKER H4 — True React SSR for canonical routes
- **Not a PDF audit item — relates to Phase 1F of this pass**
- **Current state:** The "prerender" is deterministic HTML injection into `#root` and `<noscript>` — not React SSR. It satisfies machine-readability criteria (navigation, H1, summary, footer, review date are all present in prerendered HTML as static strings). React's `createRoot` replaces this content on mount.
- **Why full SSR was not implemented this pass:**
  1. No `src/entry-server.tsx` exists. Building one requires auditing all page components for browser-only API usage (no `window`/`document` guards verified).
  2. Framer Motion's `motion.*` components require SSR-compatible configuration (`LazyMotion` with `domAnimation` feature set, or `renderToStaticMarkup` instead of `renderToString`).
  3. A separate Vite server build configuration would be needed.
  4. The prerender plugin would need to execute the server bundle dynamically per route.
  5. Estimated complexity: 2–4 days of careful implementation and testing.
- **Recommended future approach:**
  1. Add `react-dom/server` to build dependencies.
  2. Create `src/entry-server.tsx` using Wouter's `staticLocation` for server-side routing.
  3. Add a server-only Vite build config that produces `dist/server/entry-server.js`.
  4. Update `prerenderPlugin` to dynamically import the server bundle and call `renderToStaticMarkup` per route.
  5. Replace `createRoot` with `hydrateRoot` in `main.tsx`.
  6. Audit and guard all browser-only API usage.
- **Priority:** P3 (current static injection meets machine-readability requirements)

---

### Group 5 — Conversion / Forms

#### BLOCKER C1 — /get-involved page — inbox delivery confirmation pending
- **Audit ID:** #28
- **Status as of July 2026:** Page, form, and all seven participation sections implemented and prerendered. Formspree integration configured. `hello@playa-ai.org` is nonexistent and removed from all source files.
- **Approved endpoint:** `https://formspree.io/f/mwvgdevg` (via `VITE_GET_INVOLVED_FORM_ENDPOINT`, set in Replit shared environment)
- **Approved destination:** `team@playa-ai.org`
- **Live endpoint test:** One synthetic QA submission sent to the Formspree endpoint this session; HTTP acceptance confirmed.
- **What remains:** Inbox delivery confirmation. User must check `team@playa-ai.org` and confirm receipt. Production deployment also requires the env var to be set in the deployment environment and a rebuild.
- **Exact question:** "What happens when someone submits their interest? Who receives it, who follows up, and how quickly?"
- **Next action:** User confirms receipt at `team@playa-ai.org`, then deploy with env var configured.
- **Owner:** Product
- **Priority:** P2

---

#### BLOCKER C2 — Pledge signable and signatory list published
- **Audit ID:** #29
- **Current failure:** The pledge is an expression-of-interest mailto flow ("Express pledge interest"). The audit recommends making it signable and publishing signatories.
- **Non-negotiable constraint:** The pledge must not be described as a legally binding signature. It is a declaration of alignment.
- **Exact question:** "Should the pledge have a public signatory list? If so, what information is published (name, organization, date)? Who maintains it?"
- **Owner:** Product + Legal
- **Priority:** P2

---

#### BLOCKER C3 — /about page — SUBSTANTIALLY IMPLEMENTED
- **Audit ID:** #31
- **Current state (2026-08-01):** `/about` route is live. Page covers seven sections: hero (org description + approved wording), origin (`#origin` — Burning Man framing, "Born on the Playa. Gifted to the Planet." approved exception), what Playa AI does, legal structure (`#structure` — MAF 501(c)(3), EIN and MAF URL omitted pending source confirmation), people (`#people` — four named leadership roles from Team.tsx, link to `/team`), how we work (`#governance`), and participate (`#contact` — `team@playa-ai.org`). Page passes all 22 assertions in `verify:audit` section 13. Navigation updated (Team → About). Sitemap and `llms.txt` updated.
- **What remains:** MAF EIN (pending IRS lookup / signed FSA from BLOCKER L1). MAF official URL (pending confirmation). Council Charter (referenced in governance section as a future governance document). Full biography consent for each team member (BLOCKER C4 / Group 8).
- **Dependencies (remaining):** BLOCKER L1 (EIN + FSA), BLOCKER L3 (MAF regranting), team consent for expanded bios.
- **Owner:** Editorial + Leadership
- **Priority:** P2 → P3 (page is published; EIN/Charter are additive completions, not blockers to the page being live)

---

### Group 6 — External Records

#### BLOCKER X1 — External documents with conflated participant phrasing
- **Audit ID:** #25
- **Current failure:** The audit identified specific outbound vectors that carry the conflated "80,000 participants" phrasing (OECD.AI/Partnership on AI submission, Mozilla email, March funder emails).
- **Action:** Contact the relevant parties to issue corrections or clarifications.
- **Owner:** Leadership / Communications
- **Priority:** P2 (not a website code change)

---

#### BLOCKER X2 — Product domain consolidation
- **Audit ID:** #35
- **Current failure:** Playa AI products use multiple domains (`playa-ai.org`, `connect.playai.party`, `playai.party`). No consolidation plan exists.
- **Exact question:** "Which domain is canonical? Should Connect move to `connect.playa-ai.org` or remain at `playai.party`?"
- **Owner:** Leadership / Infrastructure
- **Priority:** P3

---

### Group 7 — GitHub / Repositories (Deferred to GitHub Phase)

These items are deferred per task instructions. They require external repository access.

| Item | Audit ID | Action required | Owner |
|---|---|---|---|
| Add LICENSE to Living Trust Framework repo | #3 | Choose and publish licence after L2 decision | Leadership |
| Add prohibited-copy CI to GitHub Actions | #36 | Add `.github/workflows/check-copy.yml` running `pnpm run check:copy` | Engineering |
| Correct external grant/email records | #25, #27 | Contact OECD.AI, Partnership on AI, Mozilla, funders | Leadership |

**Note on item #36 (CI):** `check:copy` and `typecheck` scripts are implemented locally and pass. Adding them to GitHub CI requires creating `.github/workflows/check-copy.yml`. That file lives in the external GitHub repository, not in this Replit workspace. Status: LOCALLY IMPLEMENTED, PARTIALLY FIXED for CI integration.

---

### Group 8 — Editorial / Program Decisions

| Item | Audit ID | Question | Owner |
|---|---|---|---|
| Upcoming events block on /events | #20 | "Are there confirmed upcoming events? If so, provide title, date, location, and Luma link." | Operations |
| "Last updated" stamp site-wide | #20 | Implementation is straightforward once content policy is decided. | Editorial |
| Luma calendar link | #20 | "What is the Luma calendar URL for Playa AI events?" | Operations |
| /about#origin origin block | #18 | **IMPLEMENTED** — Origin section live at `/about#origin`; "Born on the Playa. Gifted to the Planet." retained as approved audit exception (Home.tsx + About.tsx); Burning Man framed as host cultural context, not affiliated. Authorship question remains open (editorial). | Editorial |
| Team biographical disclosures | — | Individual consent required for each team member. | Team members |

---

## Part B — Original 36-Item Audit Matrix (PDF July 2026)

> These are the original 36 audit actions from the July 2026 PDF, Section 12 "Prioritised fix list," in the exact order provided. Do not renumber or reinterpret them.

| # | Original audit action | Status | Source evidence | Build evidence | Blocker |
|---|---|---|---|---|---|
| 1 | Replace Gmail-compose URLs | **LOCALLY IMPLEMENTED** | All 45 replaced; `check:copy` passes for `mail.google.com` and `gmail.com/mail` | `verify:audit` confirms 0 Gmail URLs in build output | None — post-deployment: confirm no new URLs added |
| 2 | Enable compression and immutable asset caching | **POST-DEPLOYMENT REQUIRED** | Cannot configure via `artifact.toml` | Cannot verify locally | BLOCKER H2 |
| 3 | Add the framework LICENSE | **BLOCKED** | GitHub repo has no LICENSE; README says "licence pending" | Not applicable | BLOCKER L2 (deferred to GitHub phase) |
| 4 | Remove "Privacy Toolkit in review" | **LOCALLY IMPLEMENTED** | `check:copy` passes; not found in canonical source | Not in build JS | None |
| 5 | Add reduced-motion support | **LOCALLY IMPLEMENTED** | `<MotionConfig reducedMotion="user">` in `App.tsx`; CSS `@media (prefers-reduced-motion)` backstop | In build | None |
| 6 | Remove prohibited phrases, subject to approved homepage exception | **PARTIALLY FIXED / APPROVED EXCEPTION** | "human-AI co-evolution" — absent from all canonical source ✅. "Born on the Playa. Gifted to the Planet." — retained in `Home.tsx:457` as user-approved exception (2026-07-30); `check:copy` allows it only in Home.tsx. "Born on the Playa." decorative stamp in Manifesto.tsx (uppercase, architectural) also retained. | Present in homepage build | User-approved exception documented |
| 7 | Convert Manifesto buttons into real links | **LOCALLY IMPLEMENTED** | Manifesto section uses `<a href="/manifesto">` links | Confirmed in build JS | None |
| 8 | Change the artist email subject | **LOCALLY IMPLEMENTED** | No `Artist%20Grant%20Interest` in canonical source; `check:copy` passes | Confirmed absent | None |
| 9 | Remove MMXXVI | **LOCALLY IMPLEMENTED** | `check:copy` passes for `MMXXVI` | Absent from build | None |
| 10 | Remove unsupported microgrant language | **PARTIALLY FIXED** | "artist microgrants" absent from canonical source ✅. "Year-One microgrant program is in development" remains in `Home.tsx:221` and `Home.tsx:331` — softened but unverified program claim. `check:copy` does not flag this form. | In build JS | BLOCKER E3 |
| 11 | Correct the Manifesto year | **LOCALLY IMPLEMENTED** | `Manifesto.tsx` top stamp changed to "First Published 2025" (was "2026"); footer contextLine: "First published 2025"; `verify:audit` passes; MMXXVI absent | In prerendered HTML | None |
| 12 | `noindex` archive routes | **LOCALLY IMPLEMENTED** | `routes.ts` — `/privacy-toolkit` and `/classic*` have `noindex: true`; `verify:audit` confirms noindex in HTML for all archive routes | Confirmed in build | None |
| 13 | Publish `/privacy` | **PARTIAL — REDIRECT IMPLEMENTED** | HTTP 308 → `/living-trust-framework` (production server); prerendered `/privacy/index.html` with noindex + canonical; complete policy page with verified facts remains outstanding | `dist/public/privacy/index.html` generated | BLOCKER P1 (full policy) |
| 14 | Rewrite Connect disclosure | **BLOCKED** | Off-site (connect.playai.party); no consent screen reviewed | Not applicable | BLOCKER P1 |
| 15 | Prerender canonical routes with per-route meta | **LOCALLY IMPLEMENTED** | Custom `prerenderPlugin` in `vite.config.ts` injects per-route title, description, og:url, og:title, canonical, nav, footer, H1, summary, and "Website content reviewed July 2026." into each HTML file; also generates `dist/public/404.html` | `verify:audit` confirms all 8 canonical routes pass all content checks | Note: deterministic HTML injection, not React SSR — see BLOCKER H4 for full SSR path |
| 16 | Real 404s, sitemap and robots | **LOCALLY IMPLEMENTED — PENDING REPUBLISH** | `sitemap.xml` ✅; `robots.txt` ✅; production server returns genuine HTTP 404 + 308 for /privacy ✅; `dist/public/404.html` generated ✅; verified with `curl` locally | Production server (`server.js`) | None (publish to activate) |
| 17 | Reconcile participant totals | **NOT FIXED** | Website still says "80+"; audit recommends ≈520; figure unverified | In build | BLOCKER E1 |
| 18 | Add permanent origin evidence at `/about#origin` | **LOCALLY IMPLEMENTED** | `/about#origin` section live; approved slogan retained; Burning Man framed as host cultural context | `dist/public/about/index.html` generated; `verify:audit` passes | None (authorship attribution is editorial, not a blocker) |
| 19 | Pledge modal focus management | **LOCALLY IMPLEMENTED** | `Home.tsx` — `inert` on `#root`, focus trap, Escape key, initial focus, focus restoration, `role="dialog"`, `aria-modal`, `aria-labelledby` | In build JS | None |
| 20 | Upcoming Events, update stamps, Luma calendar | **NOT FIXED** | No upcoming block; no Luma link; partial contextLine timestamp on Events footer | In build | BLOCKER Group 8 |
| 21 | Reconcile the portfolio | **LOCALLY IMPLEMENTED** | `Work.tsx` WORKSTREAMS array: 8 items (ws-connect-app through ws-burner-ai-manifesto); `verify:audit` confirms 8 | In build | None |
| 22 | Label Manifesto programs as intent and add CTA | **LOCALLY IMPLEMENTED** | `manifesto.txt:108` — "These are directions Playa AI intends to explore, not current programs."; `verify:audit` passes | In prerendered noscript | None |
| 23 | Publish `llms.txt` | **LOCALLY IMPLEMENTED** | `public/llms.txt` — 65 lines; Burning Man distinction; California nonprofit; content freshness; 8 workstreams | `verify:audit` confirms all llms.txt checks | None |
| 24 | Mobile menu and durable Contact navigation | **LOCALLY IMPLEMENTED** | `SiteHeader.tsx` — hamburger toggle with `aria-expanded`, `aria-controls`, `aria-label`, Escape key, focus return; Contact inside mobile nav | In build | None |
| 25 | Correct external documents with conflated phrasing | **EXTERNAL ACTION** | Off-site documents (OECD.AI, Mozilla, funder emails) | Not applicable | BLOCKER X1 |
| 26 | File the Burning Man vs. Playa AI participant decision record | **LOCALLY IMPLEMENTED** | `llms.txt` explicitly states the 80,000 / 80+ distinction; `verify:audit` confirms; `BORN IN THE BLACK ROCK DESERT · INDEPENDENT OF BURNING MAN ORGANIZATION` in homepage body | In build | None |
| 27 | Correct the OpenAI grant record or complete licensing | **NEEDS HUMAN DECISION** | Nature of the grant and required correction are unclear from available documentation | Not applicable | BLOCKER E4 |
| 28 | Build `/get-involved` with seven sections and a real form | **IMPLEMENTED — INBOX CONFIRMATION PENDING** | Page, 7 sections, form, Formspree integration, `team@playa-ai.org`; QA submission sent; inbox confirmation pending user | `dist/public/get-involved/index.html`; `verify:audit` passes | BLOCKER C1 (inbox confirmation) |
| 29 | Make the pledge signable and publish signatories | **BLOCKED** | Pledge is currently a mailto expression-of-interest flow | Not applicable | BLOCKER C2 |
| 30 | Publish the reconciled nine-row event log with London | **NOT FIXED** | London event status unconfirmed; no reconciled event log published | Events page partial | BLOCKER E2 |
| 31 | Build `/about` with origin, MAF/EIN, legal structure, affiliations, Council Charter | **PARTIALLY IMPLEMENTED** | Route live; origin, legal structure, people (4 leaders), governance, participation all present; EIN + MAF URL pending source confirmation (L1); Council Charter referenced but not yet published | `dist/public/about/index.html`; `verify:audit` section 13 passes (22/22) | BLOCKER L1 (EIN/MAF URL), L3 (regranting docs) |
| 32 | Resolve MAF regranting in writing | **NEEDS HUMAN DECISION** | No written documentation available | Not applicable | BLOCKER L3 |
| 33 | Publish the crisis protocol | **BLOCKED** | Requires clinical review | Not applicable | BLOCKER L4 |
| 34 | Rebuild the Work index and move unresolved work near the top | **LOCALLY IMPLEMENTED** | `Work.tsx` — "What remains unresolved" section now appears immediately after workstream nav index and before Featured Work; `verify:audit` confirms | In build | None |
| 35 | Consolidate product domains | **EXTERNAL ACTION** | Multiple domains (`playa-ai.org`, `connect.playai.party`) in use; consolidation plan not authorized | Not applicable | BLOCKER X2 |
| 36 | Add prohibited-copy checking to CI | **PARTIALLY FIXED** | `scripts/check-copy.js` implemented, passes locally (`check:copy` exit 0, 15 files scanned); `pnpm run check:copy` runs on demand. GitHub Actions CI not yet added (deferred to GitHub phase). | Not applicable | Deferred — see Group 7 |

---

## Part C — Comprehensive Implementation Matrix

Engineering tasks A–L were implemented during the July 2026 remediation sessions. These do NOT correspond 1:1 to the original PDF's items #1–36 above. They are internal engineering task labels.

| Task | Description | Status | Notes |
|---|---|---|---|
| A | Organizational and metadata consistency | ✅ DONE | `routes.ts` homepage description fixed; `Home.tsx` hero body copy fixed; `Team.tsx` section heading fixed; all 7 pages and `llms.txt` use approved wording. `check:copy` passes. |
| B | INITIATIVES array reduced to 3 items | ✅ DONE | Items 04 (Human Connection Research) and 05 (Agent Labs) removed; "Three of eight workstreams" added. `verify:audit` confirms 3 items (Connect, EELP, LTF). |
| C | Workstreams card replacing stale Tools card | ✅ DONE | WORKSTREAMS card on homepage with "8 documented tools, research, protocols." "Explore the full work index →" CTA. |
| D | Work page section order corrected | ✅ DONE | "What remains unresolved" now appears after workstream nav index, before Featured Work. Early anchor link removed. |
| E | Manifesto disclosure added | ✅ DONE | `manifesto.txt:108` — intent disclosure line. `verify:audit` confirms. |
| F | Content review date in all 7 canonical footers | ✅ DONE | `contentStatus="Website content reviewed July 2026."` in all 7 canonical pages. **Also now present in prerendered static HTML** via enhanced `patchHtml` footer injection. `verify:audit` confirms all 14 checks pass (source + build). |
| G | `public/llms.txt` created | ✅ DONE | 65 lines; all `verify:audit` checks pass. |
| H | Image accessibility sweep | ✅ DONE | Team portraits use `alt={name}`; event covers use `alt={event.displayTitle ?? event.title}`; decorative images use `alt="" aria-hidden="true"`. |
| I | Skip link and keyboard accessibility | ✅ DONE | Skip link added to `SiteHeader.tsx` (visible on focus, targets `#main-content`). `id="main-content"` added to all 7 canonical pages. `focus-visible:` classes added to initiative card CTAs, hero CTAs, Operating Model CTAs, all inline work-index links, and manifesto links. `aria-label` on new-tab external links. SiteFooter email link has `focus-visible`. |
| J | Pledge modal wording and subject | ✅ DONE | Subject → `Playa%20AI%20Pledge%20Interest`; button → "Express pledge interest"; description updated; modal a11y preserved. |
| K | `check:copy` expanded | ✅ DONE | Now scans 15 files (9 canonical pages, 4 components, `routes.ts`, `llms.txt`). New prohibited patterns: `philanthropic initiative`, `philanthropic, public-interest`, `Sign it as`, `sign it as`, `sign the pledge`. "Born on the Playa" allowed only in `Home.tsx`. |
| L | `verify:audit` expanded | ✅ DONE | 170 checks (up from 83): source checks for INITIATIVES count and names, workstream count, skip link, `id="main-content"` on all 7 pages, pledge wording, org wording, review date in prerendered HTML, sitemap completeness, archive noindex. |
| — | `patchHtml` enhanced static injection | ✅ DONE | Now injects nav, H1, description, summary, footer (with copyright and "Website content reviewed July 2026.") into `#root` for all indexable routes. |
| — | `Team.tsx` section heading fixed | ✅ DONE | "A philanthropic initiative" → "A human-centered AI initiative building in public." |
| — | Homepage slogan documented as exception | ✅ DONE | "Born on the Playa. Gifted to the Planet." approved exception recorded in `check:copy` and in this document. |
| — | Performance (bundle splitting) | ⚠️ NOT IMPLEMENTED | 636.97 kB bundle. Lazy loading deferred — would cause flash without `hydrateRoot`. See BLOCKER H3. |
| — | True React SSR | ⚠️ NOT IMPLEMENTED | Current injection is not React SSR. See BLOCKER H4. Static injection now meets all machine-readability criteria. |
| — | JSON-LD structured data | ⚠️ NOT IMPLEMENTED | Not a PDF audit requirement; identified as a gap. Add `Organization` and `WebSite` JSON-LD to `<head>` in a future pass. |
| — | CI integration for `check:copy` | ⚠️ DEFERRED | Local script works; GitHub Actions `.yml` not created (deferred to GitHub phase per task instructions). |
