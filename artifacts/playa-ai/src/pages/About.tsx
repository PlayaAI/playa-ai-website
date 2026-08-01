import { useEffect } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import { ContinueExploring } from "@/components/ContinueExploring";

// ── Animation ─────────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ── Known anchor sections for hash navigation ─────────────────────────────────
const ANCHORS = ["origin", "structure", "people", "governance", "contact"] as const;
type Anchor = typeof ANCHORS[number];

// ── Verified leadership (source: /team) ───────────────────────────────────────
const LEADERSHIP = [
  { name: "Alex Azzi",      role: "Founder & Executive Director" },
  { name: "Tina Woods",     role: "Head of Research"             },
  { name: "Rebecca Nelson", role: "Director, Community & Comms"  },
  { name: "Raed Marji",     role: "CTO, Programs & Operations"   },
] as const;

// ── Verified workstreams (source: /work and llms.txt) ─────────────────────────
const WORKSTREAMS = [
  { name: "Connect App",                          status: "Live pilot"              },
  { name: "EELP",                                 status: "Draft"                   },
  { name: "Living Trust Framework",               status: "Working draft"           },
  { name: "Consent-First Data Trust",             status: "Governance design phase" },
  { name: "Ikigai App 2",                         status: "Prototype"               },
  { name: "Relationship Nurturer",                status: "Early stage"             },
  { name: "Burner-AI Manifesto",                  status: "Published living document"},
  { name: "Ikigai App 1",                         status: "Currently unavailable"   },
] as const;

// ── Verified operating principles (source: Manifesto, EELP, LTF pages) ────────
const PRINCIPLES = [
  { label: "Consent before capture",   body: "Informed, specific consent is a precondition for any data collection or AI-mediated experience — not a checkbox added after the fact." },
  { label: "Human agency",             body: "People retain meaningful control over their participation, data, and how their contributions are used." },
  { label: "Data minimization",        body: "We collect only what is necessary and hold it only as long as it serves a clear, consented purpose." },
  { label: "Public learning",          body: "Findings, frameworks, and working drafts are shared publicly. Learning happens in the open." },
  { label: "Early-stage transparency", body: "Work is labeled accurately: live pilot, working draft, prototype, or governance design phase. We do not present drafts as finished products." },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export default function About() {
  // Scroll to anchor on mount (e.g. direct load of /about#origin).
  // Two nested requestAnimationFrame calls wait for React to commit the render
  // AND for the browser to complete the first layout pass.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as Anchor;
    if (!ANCHORS.includes(hash)) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (!el) return;
        const prefersReduced =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  // Handle hashchange for back/forward navigation and in-page anchor clicks.
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace("#", "") as Anchor;
      if (!ANCHORS.includes(hash)) return;
      const el = document.getElementById(hash);
      if (!el) return;
      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      <SiteHeader
        active="about"
        contextLine={
          <>
            <span>About</span>
            <span className="text-foreground/30 mx-1">·</span>
            <span>Playa AI</span>
            <span className="text-foreground/30 mx-1">·</span>
            <a href="#origin"     className="hover:text-foreground transition-colors">Origin</a>
            <span className="text-foreground/30 mx-1">·</span>
            <a href="#structure"  className="hover:text-foreground transition-colors">Structure</a>
            <span className="text-foreground/30 mx-1">·</span>
            <a href="#people"     className="hover:text-foreground transition-colors">People</a>
            <span className="text-foreground/30 mx-1">·</span>
            <a href="#governance" className="hover:text-foreground transition-colors">How We Work</a>
            <span className="text-foreground/30 mx-1">·</span>
            <a href="#contact"    className="hover:text-foreground transition-colors">Participate</a>
          </>
        }
      />

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="px-4 max-w-[1400px] mx-auto pt-16 pb-12 md:pt-24 md:pb-16 hairline-b border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <MonoLabel className="mb-6">About the Initiative</MonoLabel>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 max-w-4xl"
            >
              About Playa AI
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-6"
            >
              Playa AI is an early-stage, human-centered AI initiative developing
              consent frameworks, community experiments, tools, and public-interest
              research rooted in creativity and participation.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed"
            >
              {/* Approved organizational sentence — U+2019 apostrophe required */}
              Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation’s California 501(c)(3).
            </motion.p>
          </motion.div>
        </section>

        {/* ── Origin ────────────────────────────────────────────────────────── */}
        <section
          id="origin"
          className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">Origin</MonoLabel>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                /about#origin
              </p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="font-serif text-3xl md:text-4xl italic text-[var(--color-gold,#9A8050)] mb-8 leading-snug"
              >
                Born on the Playa. Gifted to the Planet.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  Playa AI's earliest work grew out of Burning Man — an annual gathering
                  in the Nevada desert that operates as a living cultural laboratory for
                  experiments in community, creativity, and human connection. Burning Man
                  draws approximately 80,000 participants each year; that figure describes
                  the host cultural context, not Playa AI's participant count.
                </p>
                <p>
                  The initiative is not affiliated with, endorsed by, or sponsored by
                  Burning Man Project. Playa AI emerged from work done within that cultural
                  context and has grown into a year-round initiative operating beyond any
                  single event.
                </p>
                <p>
                  What began as field experiments in consent-first AI design — run at and
                  around Burning Man — evolved into a sustained effort: building the
                  frameworks, protocols, and community infrastructure needed for
                  human-centered AI to take root in practice, not just in principle.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── What Playa AI Does ────────────────────────────────────────────── */}
        <section className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">The Work</MonoLabel>
            </div>
            <div>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10"
              >
                Playa AI develops tools, consent protocols, governance frameworks, and
                public-interest research rooted in human agency and community participation.
                Work is published openly and labeled accurately — live pilot, working draft,
                or early stage.
              </motion.p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {WORKSTREAMS.map(({ name, status }) => (
                  <motion.div
                    key={name}
                    variants={fadeInUp}
                    className="border border-border p-5 group"
                  >
                    <div className="font-semibold text-sm mb-1">{name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {status}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 flex flex-wrap gap-5">
                <a
                  href="/work"
                  className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Explore all workstreams →
                </a>
                <a
                  href="/eelp"
                  className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  EELP consent protocol →
                </a>
                <a
                  href="/living-trust-framework"
                  className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Living Trust Framework →
                </a>
                <a
                  href="https://github.com/PlayaAI/playa-ai-living-trust-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  GitHub repository ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Legal and Organizational Structure ───────────────────────────── */}
        <section
          id="structure"
          className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">Structure</MonoLabel>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                /about#structure
              </p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-2xl"
            >
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed mb-6">
                {/* Approved organizational sentence — U+2019 apostrophe required */}
                Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation’s California 501(c)(3).
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Mystic Arts Foundation provides the fiscal infrastructure that allows
                  Playa AI to accept tax-deductible contributions and operate within an
                  established legal structure. Tax-deductible giving for funders aligned
                  with the initiative's public-interest mission is available through this
                  relationship.
                </p>

              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── People ────────────────────────────────────────────────────────── */}
        <section
          id="people"
          className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">People</MonoLabel>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                /about#people
              </p>
            </div>
            <div>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-base text-muted-foreground leading-relaxed max-w-xl mb-10"
              >
                Playa AI is built by a small, cross-disciplinary team of builders,
                researchers, and community practitioners, supported by an advisory
                Leadership Council.
              </motion.p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              >
                {LEADERSHIP.map(({ name, role }) => (
                  <motion.div
                    key={name}
                    variants={fadeInUp}
                    className="hairline border border-border p-5"
                  >
                    <div className="font-semibold text-sm mb-1">{name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {role}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <a
                href="/team"
                className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                Meet the full team →
              </a>
            </div>
          </div>
        </section>

        {/* ── How the Work Is Organized ─────────────────────────────────────── */}
        <section
          id="governance"
          className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">How We Work</MonoLabel>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                /about#governance
              </p>
            </div>
            <div>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-base text-muted-foreground leading-relaxed max-w-xl mb-10"
              >
                Playa AI's work is guided by a set of operating principles applied
                consistently across its tools, field experiments, and published frameworks.
                The Leadership Council is advisory only — providing perspective and
                expertise with no governance authority, fiduciary duties, or signing
                authority.
              </motion.p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-5"
              >
                {PRINCIPLES.map(({ label, body }) => (
                  <motion.div key={label} variants={fadeInUp} className="flex gap-5">
                    <div className="w-px bg-border shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest mb-1">
                        {label}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Participate / Contact ─────────────────────────────────────────── */}
        <section
          id="contact"
          className="scroll-mt-20 px-4 max-w-[1400px] mx-auto py-16 md:py-20 hairline-b border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div>
              <MonoLabel className="mb-4">Participate</MonoLabel>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                /about#contact
              </p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-xl"
            >
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed mb-8 text-muted-foreground">
                Playa AI is open to participation from builders, artists, researchers,
                funders, cultural stewards, and institutions. There are seven structured
                participation paths, or you can introduce yourself directly.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                <a
                  href="/get-involved"
                  className="inline-flex items-center justify-center bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-background hover:text-foreground border border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 w-fit"
                >
                  Get involved →
                </a>
                <div className="flex flex-wrap gap-6 mt-2">
                  <a
                    href="mailto:team@playa-ai.org"
                    className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  >
                    team@playa-ai.org
                  </a>
                  <a
                    href="/work"
                    className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  >
                    Explore the work →
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <ContinueExploring
        links={[
          { label: "Our Work", href: "/work" },
          { label: "Get Involved", href: "/get-involved" },
        ]}
      />

      <SiteFooter
        contextLine="About · Playa AI · 2026"
        contentStatus="Website content reviewed July 2026."
      />
    </>
  );
}
