import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import { ContinueExploring } from "@/components/ContinueExploring";
import workHeroImg from "@assets/ChatGPT_Image_Jul_18,_2026,_12_02_36_PM_1784365480389.png";

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


// ─── Data ────────────────────────────────────────────────────────────────────

type Workstream = {
  id: string;
  n: string;
  category: string;
  status: string;
  need: string;
  title: string;
  subtitle: string;
  pull: string;
  body: string;
  aiRole: string;
  consent: string;
  evidence: string;
  people: string;
  cta: string;
  href: string;
  caution?: string;
  secondaryCta?: string;
  secondaryHref?: string;
};

const WORKSTREAMS: Workstream[] = [
  {
    id: "ws-connect-app",
    n: "01",
    category: "Build / Field Experiment",
    status: "Live Pilot",
    need: "Authentic connection",
    title: "Connect App",
    subtitle: "",
    pull: "A digital bridge designed to accelerate serendipity and anchor us in the present moment.",
    body: "Connect is a web-based connection experiment that guides two people through a shared dialogue using transformative prompts. Participants choose a vibe — playful, curious, deep, or intimate — then are invited to put the phone down, maintain eye contact, and move beyond \u201Cwhat do you do?\u201D into the deeper layers of human essence.",
    aiRole:
      "With consent, AI can synthesize the spoken conversation into an Oracle Card or digital poster, offering the pair a unique quest to carry the insight back into life.",
    consent:
      "Microphone access requires explicit permission for each session. Data should be processed as locally and ephemerally as possible, with deletion-first workflows explored to honor immediacy.",
    evidence:
      "Piloted in early field sessions and now being refined for camp-level use and the Joy Score research project.",
    people: "Alex Azzi · Raed Marji",
    cta: "Join pilot →",
    href: "mailto:team@playa-ai.org?subject=Connect%20App%20Pilot",
    secondaryCta: "Open Connect ↗",
    secondaryHref: "https://connect.playai.party",
  },
  {
    id: "ws-ikigai-app-1",
    n: "02",
    category: "Build / Open Tool",
    status: "Pilot",
    need: "Purpose and self-actualization",
    title: "Ikigai App 1",
    subtitle: "Miami Workshop Edition",
    pull: "A guided journey to unlock your reason for being through the four circles of purpose.",
    body: "Ikigai App 1 began as an interactive workshop tool for people seeking clarity, purpose, and professional alignment. It guides participants through what they love, what they are good at, what the world needs, and what they can be paid for — using adaptive prompts to help them move beyond surface answers into a more honest sense of direction.",
    aiRole:
      "AI acts as a reflective facilitator: adapting follow-up questions, synthesizing participant responses into a formal Ikigai Statement, and helping generate visual artifacts that make the purpose discovery process easier to see and share.",
    consent:
      "The pilot is being reviewed through Playa AI\u2019s consent-first privacy lens. Current workflows use structured intake and workshop data, while the next phase focuses on clearer data boundaries, user control, and safer handling of personal reflection data.",
    evidence:
      "Piloted through the Menta Series in Miami with approximately 80 participants, showing strong engagement with the generated Ikigai statements and visual outputs.",
    people: "Raed Marji · Katya Vinnikova",
    cta: "Open app — currently unavailable →",
    href: "https://ikigai-rmarji.replit.app", /* TODO: Link currently unavailable — retained by explicit request. Verify or restore later. */
  },
  {
    id: "ws-ikigai-app-2",
    n: "03",
    category: "Research / Build",
    status: "Prototype",
    need: "Structured growth",
    title: "Ikigai App 2",
    subtitle: "Leala Life Path / Claude Code Prototype",
    pull: "A research-based partner for moving from inklings to clarity, and from clarity to a concrete roadmap.",
    body: "Ikigai App 2 is a more rigorous evolution of the purpose-discovery process. Built around positive psychology, life design, and a multi-phase discovery protocol \u2014 Foundation, Core Discovery, Synthesis, and Action \u2014 it explores how AI can help translate abstract values into daily practice.",
    aiRole:
      "Built with Claude Code, the system acts as a research partner that sifts through personal narrative, finds hidden patterns, and proposes next steps for a user\u2019s life path.",
    consent:
      "This prototype is being developed toward a sandboxed, user-controlled environment for sensitive life-path data. The privacy goal is to protect the user\u2019s personal repository while making AI involvement clear and consent-based.",
    evidence:
      "Currently documented as a technical prototype and README-style framework. It builds on the first Ikigai workshop pilot, but is not yet positioned as a finished consumer application.",
    people: "Raed Marji · Alex Azzi",
    cta: "Open Ikigai App 2 prototype ↗",
    href: "https://ikigai-ai-qgergqr8.manus.space",
  },
  {
    id: "ws-relationship-nurturer",
    n: "04",
    category: "Research",
    status: "Research Prototype",
    need: "Safety, empathy, and repair",
    title: "Relationship Nurturer",
    subtitle: "Niles / Neuro-intelligent Nudges",
    pull: "An emotionally attuned partner for navigating the subtle dance of human interaction.",
    body: "Relationship Nurturer explores how AI can help people understand the patterns beneath their conversations. It analyzes meeting transcripts and communication patterns through neuroscience frameworks such as SCARF, offering nudges that may improve relational dynamics.",
    aiRole:
      "AI acts as a third-phase integrator, surfacing subtle triggers, defensive postures, and recurring patterns that humans may miss in the moment.",
    consent:
      "This work is highly sensitive and requires strict recording consent, careful data access, and a trust-but-verify posture.",
    evidence:
      "Early personal experiments have tested Esther Perel, Gottman, and SCARF-inspired frameworks on recorded relationship conflicts.",
    people: "David Rock · Alana Winter · Raed Marji",
    cta: "Contact us →",
    href: "mailto:team@playa-ai.org?subject=Relationship%20Nurturer",
    caution: "Research prototype only. Not a therapy product or clinical tool.",
  },
  {
    id: "ws-living-trust-framework",
    n: "05",
    category: "Protocol / Open Tool",
    status: "Working Draft",
    need: "Dignity, autonomy, and data sovereignty",
    title: "Playa AI Living Trust Framework",
    subtitle: "",
    pull: "A radical blueprint for decommodifying data and returning sovereignty to the individual.",
    body: "This framework translates participatory culture into concrete data rights, consent practices, AI-specific protections, and open governance patterns.",
    aiRole:
      "The framework was co-created through a synthesis process using multiple AI systems to compare, critique, and refine principles from humane technology, AI governance, and Burning Man-inspired values such as consent, decommodification, participation, and leaving no trace.",
    consent:
      "Radical consent is the center: participation should be opt-in, reversible, understandable, trauma-informed, and supported by deletion practices that are being reviewed for stronger accountability.",
    evidence:
      "The framework is actively guiding Playa AI tools, with broader integration planned across our tools over the next few weeks. Technical practices listed here are implementation directions, not fully deployed capabilities.",
    people: "Alex Azzi · Alina Latinina · Lino Velev · Raed Marji",
    cta: "Open the Living Trust Framework →",
    href: "/living-trust-framework",
    secondaryCta: "View the Living Trust Framework on GitHub ↗",
    secondaryHref: "https://github.com/PlayaAI/playa-ai-living-trust-framework",
  },
  {
    id: "ws-eelp",
    n: "06",
    category: "Protocol / Open Standard",
    status: "Draft",
    need: "Consent, disclosure, and accountability",
    title: "EELP — Ethical Experience Lab Protocol",
    subtitle: "",
    pull: "A public draft protocol for consent, disclosure, data minimization, and human override in AI-mediated experiences.",
    body: "EELP is a public draft protocol for consent, disclosure, data minimization, human override, and community accountability in AI-mediated experiences. Designed to be adopted without a legal team. The draft protocol is in active development.",
    aiRole: "AI is a participant in the experiences EELP governs — the protocol defines the conditions under which AI involvement is disclosed, consented to, and overrideable by people in the room.",
    consent: "Radical consent is the foundation of EELP: participation is opt-in, revocable, and understandable — with human override built in by design, not bolted on after.",
    evidence: "Derived from field experiments across Connect, Ikigai, and Burning Man community gatherings. Draft framework in active development.",
    people: "Alex Azzi",
    cta: "Open the EELP page →",
    href: "/eelp",
  },
  {
    id: "ws-consent-first-data-trust",
    n: "07",
    category: "Govern",
    status: "Planned",
    need: "Data sovereignty and identity control",
    title: "Consent-First Data Trust",
    subtitle: "",
    pull: "A governance model for participant control over stories, data, and identity.",
    body: "The Data Trust is a governance model giving participants control over how their stories, data, identity, and permissions are used, stored, or deleted — being designed before sensitive data is collected rather than bolted on after.",
    aiRole: "AI systems operating under the Data Trust are required to operate within participant-defined permissions. Identity and story data is governed by the participant, not the platform.",
    consent: "Data sovereignty is the design principle: participants choose what is stored, for how long, and can request deletion. The trust is designed to protect people before sensitive data enters the system.",
    evidence: "Currently in governance design phase. Derived from the Year-One framework and applied as a privacy layer to Connect Protocol and EELP.",
    people: "Alex Azzi",
    cta: "Contact us about the Data Trust →",
    href: "mailto:team@playa-ai.org?subject=Data%20Trust%20Inquiry",
  },
  {
    id: "ws-burner-ai-manifesto",
    n: "08",
    category: "Govern",
    status: "Published",
    need: "A shared moral compass",
    title: "Burner-AI Manifesto",
    subtitle: "",
    pull: "A Declaration of Interdependence for the Age of Sentience.",
    body: "The Burner-AI Manifesto is the founding text of Playa AI's moral imagination. It frames Burning Man as a prototype for civilization and asks what it would mean for AI to inherit the values of participation, consent, creativity, and interdependence.",
    aiRole:
      "The manifesto is a living document first drafted with the help of NotebookLM and refined through community feedback across months of council calls.",
    consent:
      "Published transparently, it serves as a constitutional layer for the Playa AI trust council and the broader governance work.",
    evidence:
      "Version 1.0 is live and has been used as an overture for outreach to Burning Man leadership and global technology figures.",
    people: "Rebecca Nelson · Alex Azzi · Steven Blumenfeld",
    cta: "Read manifesto →",
    href: "/manifesto",
  },
];

const OPEN_QUESTIONS = [
  {
    title: "Voice-only mode",
    body: "Can Connect remove screen distraction without losing consent clarity?",
  },
  {
    title: "Purpose matching",
    body: "Can Ikigai statements help people find aligned collaborators while protecting identity, consent, and sensitive reflection data?",
  },
  {
    title: "Prototype to interface",
    body: "How does Ikigai App 2 move from technical framework to humane front end?",
  },
  {
    title: "Anti-sycophancy",
    body: "Can relationship AI challenge users honestly instead of flattering them?",
  },
  {
    title: "Security testing",
    body: "How do we invite privacy experts and adversarial testers to stress-test the standards before the work scales?",
  },
  {
    title: "From manifesto to constraint",
    body: "How do founding values become enforceable model, product, and governance constraints?",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1 text-muted-foreground">
      {status}
    </span>
  );
}

function WorkBlock({
  ws,
  testId,
}: {
  ws: Workstream;
  testId: string;
}) {
  return (
    <motion.article
      id={ws.id}
      variants={fadeInUp}
      data-testid={testId}
      className="hairline-t border-border pt-10 md:pt-14 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="font-serif text-7xl md:text-8xl leading-none text-muted-foreground/20 select-none">
            {ws.n}
          </div>
          <div className="space-y-3">
            <MonoLabel>{ws.category}</MonoLabel>
            <StatusBadge status={ws.status} />
          </div>
          <div className="space-y-1">
            <MonoLabel>Human need</MonoLabel>
            <p className="font-mono text-xs text-foreground">{ws.need}</p>
          </div>
          <div className="space-y-1 mt-auto">
            <MonoLabel>People</MonoLabel>
            <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
              {ws.people}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-9 pb-10 md:pb-14">
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-2">
            {ws.title}
          </h3>
          {ws.subtitle && (
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {ws.subtitle}
            </div>
          )}
          <p className="font-serif italic text-lg md:text-xl leading-snug text-accent-gold mb-6 max-w-2xl">
            &ldquo;{ws.pull}&rdquo;
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground mb-6 max-w-3xl">
            {ws.body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <MonoLabel>AI role</MonoLabel>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ws.aiRole}
              </p>
            </div>
            <div className="space-y-2">
              <MonoLabel>Consent note</MonoLabel>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ws.consent}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <MonoLabel>Evidence</MonoLabel>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
              {ws.evidence}
            </p>
          </div>

          {ws.caution && (
            <div className="hairline-t border-border pt-4 mb-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                ⚠ {ws.caution}
              </p>
            </div>
          )}

          <div className="hairline-t border-border pt-5 flex flex-wrap items-center gap-6">
            <a
              href={ws.href}
              {...(ws.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              {ws.cta}
            </a>
            {ws.secondaryCta && ws.secondaryHref && (
              <a
                href={ws.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-0.5 hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                {ws.secondaryCta}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Work() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        active="work"
        contextLine={
          <>
            <span>Our Work</span>
            <span>·</span>
            <span className="text-accent-gold">
              Tools / Research / Protocols / Governance
            </span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">
              A field guide to what is being built
            </span>
          </>
        }
      />

      {/* 1. Hero */}
      <section
        id="main-content"
        data-testid="work-hero"
        className="relative px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16 overflow-visible"
      >
        <div className="relative z-20 hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>A field guide · Our Work · 2026</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-20 max-w-4xl"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight mb-8"
          >
            The work is where the philosophy becomes{" "}
            <i className="italic font-normal text-accent-gold">real.</i>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-5 text-foreground max-w-2xl"
          >
            Playa AI is not only a manifesto. It is a set of tools, field
            experiments, research prototypes, and consent-first protocols being
            built in public, tested in community, and shaped by the people they
            are meant to serve.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-10 text-muted-foreground max-w-2xl"
          >
            Some projects are live pilots. Some are early prototypes. Some are
            draft governance instruments. All of them ask the same question: can
            AI deepen human agency, creativity, connection, and trust without
            extracting the soul from the room?
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href="#work-index"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Explore the work ↓
            </a>
            <a
              href="/manifesto"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Read the Manifesto →
            </a>
          </motion.div>
        </motion.div>

        <div className="relative z-20 mt-8 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-4">
          BUILDING TOOLS · TESTING IN COMMUNITY · PUBLISHING WHAT CAN BE REUSED
        </div>

        {/* Graphic — desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
          className="hidden lg:block absolute lg:left-[16%] lg:top-[52%] lg:w-[80vw] lg:max-w-[1300px] xl:left-[13%] xl:top-[50%] xl:w-[84vw] xl:max-w-[1600px] 2xl:left-[10%] 2xl:top-[48%] 2xl:w-[88vw] 2xl:max-w-[2000px] -translate-y-1/2 pointer-events-none z-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at 65% 50%, black 52%, rgba(0,0,0,0.68) 70%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at 65% 50%, black 52%, rgba(0,0,0,0.68) 70%, transparent 100%)",
          }}
        >
          <img
            src={workHeroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain mix-blend-multiply"
          />
        </motion.div>

        {/* Graphic — mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          className="block lg:hidden absolute left-[55%] top-[40%] sm:left-[52%] sm:top-[42%] md:left-[50%] md:top-[44%] -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[130vw] md:w-[110vw] max-w-none pointer-events-none z-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at 65% 50%, black 38%, rgba(0,0,0,0.4) 58%, transparent 85%)",
            maskImage:
              "radial-gradient(ellipse at 65% 50%, black 38%, rgba(0,0,0,0.4) 58%, transparent 85%)",
          }}
        >
          <img
            src={workHeroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-[0.35] mix-blend-multiply"
          />
        </motion.div>
      </section>

      {/* 2. Work Index / Stats */}
      <section
        id="work-index"
        data-testid="work-index"
        className="hairline-y border-border"
      >
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 01 / Work Index
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Full work index
              </h2>
            </div>
            <div className="lg:col-span-6 flex items-start flex-col gap-4">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                The work moves through three modes: tools that help people
                connect and reflect, research prototypes that test what AI can
                responsibly mediate, and protocols that keep the whole system
                accountable.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Together, these workstreams form one learning loop: community gatherings inform experiments, experiments test EELP and Living Trust safeguards, and the results become public learning.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 hairline-t border-border divide-x divide-border">
            {[
              { value: "8", label: "Workstreams" },
              { value: "3", label: "Modes: tools, research, protocols" },
              {
                value: "9",
                label: "Documented field events",
              },
              { value: "1", label: "Living manifesto" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-10">
                <MonoLabel className="mb-4">{s.label}</MonoLabel>
                <div className="font-serif italic text-5xl md:text-7xl leading-none">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* 3. Workstream Index Nav */}
      <section className="px-4 max-w-[1400px] mx-auto py-10 md:py-14">
        <nav aria-label="Workstream index">
          <ol className="divide-y divide-border border-y border-border">
            {WORKSTREAMS.map((ws) => (
              <li key={ws.id}>
                <a
                  href={`#${ws.id}`}
                  className="group flex flex-wrap md:flex-nowrap items-baseline gap-x-4 gap-y-1 py-3.5 md:py-3 hover:bg-foreground/[0.03] transition-colors px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/60 w-6 shrink-0">
                    {ws.n}
                  </span>
                  <span className="font-mono text-sm font-medium text-foreground group-hover:underline underline-offset-2 flex-1 min-w-0">
                    {ws.title}
                  </span>
                  <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
                    {ws.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground shrink-0">
                    {ws.status}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* 4. What Remains Unresolved */}
      <section
        id="what-remains-unresolved"
        data-testid="open-questions"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16 scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <MonoLabel className="mb-6">Open questions</MonoLabel>
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              What remains unresolved
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              The honest edges matter. These are the questions the work must
              answer before it deserves to scale.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hairline-t border-border"
        >
          {OPEN_QUESTIONS.map((q, i) => (
            <motion.div
              key={q.title}
              variants={fadeInUp}
              className={`p-8 hairline-b border-border ${
                i % 3 === 0 || i % 3 === 1 ? "lg:hairline-r" : ""
              } ${i % 2 === 0 ? "md:hairline-r lg:border-r-0" : ""} ${
                i % 3 === 1 ? "lg:hairline-r" : ""
              }`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-3">
                {q.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {q.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Featured Work / Workstreams */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 02 / Featured Work
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              The living body of{" "}
              <i className="italic font-normal text-accent-gold">
                the initiative.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Each workstream begins as a question, becomes a prototype, and
              then earns the right to become infrastructure. What follows is not
              a product catalog. It is a record of experiments in trust.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.03 }}
          variants={stagger}
          className="space-y-0"
        >
          {WORKSTREAMS.map((ws, i) => (
            <WorkBlock
              key={ws.n}
              ws={ws}
              testId={`workstream-0${i + 1}`}
            />
          ))}
        </motion.div>
      </section>

      {/* 5. Living Standards — inverted dark section */}
      <section className="bg-foreground text-background mt-8 md:mt-16 px-4 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-10">
            Operating thesis
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
                Consent is not decoration.{" "}
                <i className="italic font-normal" style={{ color: "#C8A96E" }}>
                  It is infrastructure.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-background/70">
                Every tool on this page touches something intimate: identity,
                purpose, memory, relationship, voice, trust. That is why the
                governance work is not separate from the product work. It is the
                condition that makes the work possible.
              </p>
            </div>
          </div>

          <div
            className="font-serif text-2xl md:text-4xl leading-snug mb-14 max-w-3xl"
            style={{ color: "#C8A96E" }}
          >
            &ldquo;Data is a gift, not oil. Deletion is a right, not a support
            ticket.&rdquo;
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-background/20">
            {[
              {
                n: "01",
                title: "Consent before capture",
                body: "Before any recording, synthesis, memory, or inference, a person should understand what is happening and choose it freely.",
              },
              {
                n: "02",
                title: "Human override by design",
                body: "AI may guide, summarize, and reflect — but people remain the final authority over identity, meaning, and action.",
              },
              {
                n: "03",
                title: "Learning returned to the commons",
                body: "When a field experiment teaches something useful, the lesson should become protocol, documentation, or public infrastructure others can reuse.",
              },
            ].map((c, i) => (
              <div
                key={c.n}
                className={`p-8 md:p-12 ${i < 2 ? "border-b md:border-b-0 md:border-r border-background/20" : ""}`}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-6">
                  {c.n} /
                </div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                  {c.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-background/70">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Built on Trust */}
      <section
        id="built-on-trust"
        data-testid="built-on-trust"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16 hairline-b border-border"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <MonoLabel className="mb-6">Privacy as practice</MonoLabel>
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Built on a{" "}
              <i className="italic font-normal text-accent-gold">
                Living Trust Agreement.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Our tools ask people to share things that matter: purpose, voice,
              memory, relationship, and identity. That means privacy has to be
              more than a policy link. It has to be visible in the product,
              reflected in the data flow, and tested against the promises we
              make.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-border">
          {[
            {
              title: "Collect less",
              body: "We design toward data minimization: asking only for what is needed, making optional fields clear, and avoiding unnecessary retention.",
            },
            {
              title: "Explain more",
              body: "Participants should understand when AI is involved, what data is used, what may be stored, and what control they have before they begin.",
            },
            {
              title: "Return control",
              body: "Consent should be specific, reversible, and supported by deletion workflows that make privacy a real product behavior, not just a promise.",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              className={`p-8 md:p-10 hairline-b border-border ${
                i < 2 ? "md:hairline-r" : ""
              }`}
            >
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                {c.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final CTA */}
      <section
        data-testid="work-final-cta"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-20 md:pb-32 hairline-t border-border"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8"
          >
            Help us test what{" "}
            <i className="italic font-normal text-accent-gold">
              deserves to exist.
            </i>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground mb-10 max-w-2xl"
          >
            We are looking for builders, researchers, artists, privacy experts,
            camp leads, funders, and institutions willing to help turn early
            work into public-interest infrastructure. If you want to contribute
            directly — join a workstream, share a method, or propose a collaboration.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href="mailto:team@playa-ai.org?subject=Work%20Collaboration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Collaborate on the work →
            </a>
            <a
              href="mailto:team@playa-ai.org?subject=Support%20Playa%20AI%20Work"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Support the work →
            </a>
            <a
              href="mailto:team@playa-ai.org?subject=Request%20Playa%20AI%20Work%20Briefs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Request the briefs →
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-5">
          EARLY WORK IS REAL · SOME PROGRAMS ARE STILL FORMING · THE FIELD
          REPORT COMES NEXT
        </div>
      </section>

      <ContinueExploring links={[
        { label: "Meet the team", href: "/team" },
        { label: "Read the Manifesto", href: "/manifesto" },
      ]} />
      <SiteFooter contextLine="Our Work · Tools / Research / Protocols / Governance" contentStatus="Website content reviewed July 2026." />
    </main>
  );
}
