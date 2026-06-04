import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";

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

type Workstream = {
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
};

const WORKSTREAMS: Workstream[] = [
  {
    n: "01",
    category: "Build / Field Experiment",
    status: "Pilot",
    need: "Authentic connection",
    title: "Connect App",
    subtitle: "",
    pull: "A digital bridge designed to accelerate serendipity and anchor us in the present moment.",
    body: "Connect is a web-based connection experiment that guides two people through a shared dialogue using transformative prompts. Participants choose a vibe — playful, curious, deep, or intimate — then are invited to put the phone down, maintain eye contact, and move beyond \u201Cwhat do you do?\u201D into the deeper layers of human essence.",
    aiRole:
      "With consent, AI can synthesize the spoken conversation into an Oracle Card or digital poster, offering the pair a unique quest to carry the insight back into life.",
    consent:
      "Private by default. Microphone access requires explicit permission for each session. Data can be processed locally or deleted immediately to honor immediacy.",
    evidence:
      "Piloted with 80+ initial users and now being refined for camp-level use and the Joy Score research project.",
    people: "Alex Azzi · Raed Marji",
    cta: "Join pilot →",
    href: "mailto:hello@playa-ai.org?subject=Connect App Pilot",
  },
  {
    n: "02",
    category: "Build / Open Tool",
    status: "Pilot",
    need: "Purpose and self-actualization",
    title: "Ikigai App 1",
    subtitle: "Miami Workshop Edition",
    pull: "A guided journey to unlock your reason for being through the four circles of Ikigai.",
    body: "The first Ikigai app is an interactive workshop tool for people seeking clarity, purpose, and professional alignment. It asks adaptive questions across what someone loves, what they are good at, what the world needs, and what they can be paid for.",
    aiRole:
      "AI analyzes the responses, generates a formal Ikigai Statement, and creates high-fidelity visual artifacts to help the participant see their purpose more clearly.",
    consent:
      "Structured data is captured through Formless, with results traditionally shared only with the participant.",
    evidence:
      "Tested in the Menta Series in Miami, with 80+ participants showing high engagement with the generated results.",
    people: "Raed Marji · Katya Vinnikova",
    cta: "Request access →",
    href: "mailto:hello@playa-ai.org?subject=Ikigai App Access",
  },
  {
    n: "03",
    category: "Research / Build",
    status: "Prototype",
    need: "Structured growth",
    title: "Ikigai App 2",
    subtitle: "Leala Life Path / Claude Code Prototype",
    pull: "A personalized system for moving from the inklings of a dream to a concrete roadmap.",
    body: "The second Ikigai app is a more technical evolution of the purpose-discovery process. It brings together positive psychology, life design, and a multi-phase discovery protocol: Foundation, Core Discovery, Synthesis, and Action.",
    aiRole:
      "Built with Claude Code, the system acts as a research partner that sifts through personal inklings, finds patterns, and proposes specific next steps.",
    consent:
      "Designed for sandboxed environments that protect the user's life repository of data.",
    evidence:
      "Developed as a README and structural framework during active development sessions using command-line AI tools.",
    people: "Raed Marji · Alex Azzi",
    cta: "Learn more →",
    href: "mailto:hello@playa-ai.org?subject=Ikigai App 2",
  },
  {
    n: "04",
    category: "Research",
    status: "Concept / Pilot",
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
    href: "mailto:hello@playa-ai.org?subject=Relationship Nurturer",
    caution: "Research prototype only. Not a therapy product or clinical tool.",
  },
  {
    n: "05",
    category: "Protocol / Open Tool",
    status: "Draft",
    need: "Dignity, autonomy, and data sovereignty",
    title: "Privacy Toolkit",
    subtitle: "",
    pull: "A radical blueprint for decommodifying data and returning sovereignty to the individual.",
    body: "The Privacy Toolkit is a set of open-source templates, best-practice hardening procedures, and burner-inspired privacy language for people and organizations building with AI agents. It treats data as a gift, not oil.",
    aiRole:
      "The toolkit was co-created through a mega-prompt process that synthesized principles from humane technology with the Ten Principles of Burning Man.",
    consent:
      "Radical consent is the center: participation should be opt-in, reversible, trauma-informed, and supported by auditable deletion.",
    evidence:
      "A first draft of the Playa AI Accord governance section has been completed, with guidelines for auditable deletion now in review.",
    people: "Alex Azzi · Alina Latinina · Raed Marji",
    cta: "Request the brief →",
    href: "mailto:hello@playa-ai.org?subject=Privacy Toolkit Brief",
  },
  {
    n: "06",
    category: "Govern",
    status: "Published / Living Document",
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
    href: "/",
  },
];

const OPEN_QUESTIONS = [
  {
    title: "Voice-only mode",
    body: "Can Connect remove screen distraction without losing consent clarity?",
  },
  {
    title: "Purpose matching",
    body: "Can Ikigai statements help people find aligned collaborators without exposing private identity data?",
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
    body: "How do we invite hackers and privacy experts to stress-test the standards?",
  },
  {
    title: "From manifesto to constraint",
    body: "How do founding values become enforceable model, product, and governance constraints?",
  },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1 text-muted-foreground">
      {status}
    </span>
  );
}

function WorkBlock({ ws, testId }: { ws: Workstream; testId: string }) {
  return (
    <motion.article
      variants={fadeInUp}
      data-testid={testId}
      className="hairline-t border-border pt-10 md:pt-14"
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
            "{ws.pull}"
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

          <div className="hairline-t border-border pt-5">
            <a
              href={ws.href}
              className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              {ws.cta}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

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
        data-testid="work-hero"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>A field guide · Our Work · 2026</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
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
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Read the Manifesto →
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-8 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-4">
          BUILDING TOOLS · TESTING IN COMMUNITY · PUBLISHING WHAT CAN BE REUSED
        </div>
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
                Six workstreams.{" "}
                <i className="italic font-normal text-accent-gold">
                  One public-interest system.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-6 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                The work moves through three modes: tools that help people
                connect and reflect, research prototypes that test what AI can
                responsibly mediate, and protocols that keep the whole system
                accountable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 hairline-t border-border divide-x divide-border">
            {[
              { value: "6", label: "Active workstreams" },
              { value: "3", label: "Modes: tools, research, protocols" },
              {
                value: "80+",
                label: "Early participants across pilots and workshops",
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

      {/* 4. Featured Work / Workstreams */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 02 / Featured Work
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              The living body of{" "}
              <i className="italic font-normal text-accent-gold">
                the foundation.
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
            <WorkBlock key={ws.n} ws={ws} testId={`workstream-0${i + 1}`} />
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
            "Data is a gift, not oil. Deletion is a right, not a support
            ticket."
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

      {/* 6. Open Questions */}
      <section
        id="open-questions"
        data-testid="open-questions"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16"
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
                i % 3 < 2 ? "lg:hairline-r" : ""
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

      {/* 7. Final CTA */}
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
            work into public-interest infrastructure.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href="mailto:hello@playa-ai.org?subject=Join a Playa AI Pilot"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Join a pilot →
            </a>
            <a
              href="mailto:hello@playa-ai.org?subject=Support Playa AI Work"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Support the work →
            </a>
            <a
              href="mailto:hello@playa-ai.org?subject=Request Playa AI Work Briefs"
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

      <SiteFooter contextLine="Our Work · Tools / Research / Protocols / Governance" />
    </main>
  );
}
