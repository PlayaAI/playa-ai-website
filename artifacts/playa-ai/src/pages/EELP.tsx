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

const PRINCIPLES = [
  {
    n: "01",
    title: "Consent first",
    body: "No data is collected, processed, or retained without a clear, informed, and freely given consent decision. Consent is specific to purpose — not a blanket agreement.",
  },
  {
    n: "02",
    title: "Disclosure",
    body: "Participants are told when AI is involved, what it does, what data it uses, and what the outputs may be — before the experience begins, in plain language.",
  },
  {
    n: "03",
    title: "Data minimization",
    body: "Only the data necessary for the stated purpose is collected. Optional fields are clearly marked. Unnecessary retention is avoided by design.",
  },
  {
    n: "04",
    title: "Participant control",
    body: "Participants retain meaningful control over their data throughout an experience — including the ability to pause, withdraw, correct, or request deletion.",
  },
  {
    n: "05",
    title: "Human override",
    body: "AI systems operating under EELP must include clear points at which a human can review, correct, or stop an automated process — particularly in sensitive or high-stakes contexts.",
  },
  {
    n: "06",
    title: "Community accountability",
    body: "EELP implementations are accountable not only to individual participants but to the communities in which they operate. Community feedback shapes how the protocol evolves.",
  },
  {
    n: "07",
    title: "Deletion rights",
    body: "Participants have the right to request deletion of their data. Deletion workflows should be practical, documented, and honored in a reasonable time frame.",
  },
];

export default function EELP() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        active="work"
        contextLine={
          <>
            <span>EELP</span>
            <span>·</span>
            <span className="text-accent-gold">
              Consent / Disclosure / Human Override
            </span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">
              A public draft protocol for AI-mediated experiences
            </span>
          </>
        }
      />

      {/* Hero */}
      <section
        data-testid="eelp-hero"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>EELP · Playa AI · Public Draft Protocol</span>
          <span className="text-muted-foreground">Govern · In Active Development</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-6"
          >
            Ethical Experience Lab Protocol
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight mb-8"
          >
            A public draft protocol for{" "}
            <i className="italic font-normal text-accent-gold">
              AI-mediated experiences.
            </i>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-5 text-foreground max-w-2xl"
          >
            EELP — the Ethical Experience Lab Protocol — is a public draft protocol for
            consent, disclosure, data minimization, human override, and community
            accountability in AI-mediated experiences.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-10 text-muted-foreground max-w-2xl"
          >
            It is designed to be adopted without a legal team — practical enough
            to implement, principled enough to matter.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Status — public draft protocol · in active development · license under review
          </motion.p>
        </motion.div>

        <div className="mt-8 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-4">
          CONSENT BEFORE CAPTURE · HUMAN OVERRIDE BY DESIGN · COMMUNITY ACCOUNTABILITY
        </div>
      </section>

      {/* Section 1 — What EELP is */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 01 / What EELP Is
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                A protocol, not{" "}
                <i className="italic font-normal text-accent-gold">
                  a policy document.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-center">
              <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                <p>
                  Most ethics frameworks for AI ask to be read. EELP is designed
                  to be implemented — a practical set of operating principles
                  that organizations can adopt, adapt, and demonstrate in the
                  field.
                </p>
                <p>
                  It applies wherever AI systems mediate human experience:
                  workshops, events, research settings, community tools, and
                  any context where people share sensitive data about identity,
                  purpose, memory, relationship, or voice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Core Principles */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 02 / Core Principles
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Seven principles.{" "}
              <i className="italic font-normal text-accent-gold">
                One evolving protocol.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              EELP is organized around seven operating principles that define
              how an organization must behave before, during, and after an
              AI-mediated experience.
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
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.n}
              variants={fadeInUp}
              className="hairline-t border-border pt-10 pb-10 md:pt-14 md:pb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="font-serif text-7xl md:text-8xl leading-none text-muted-foreground/20 select-none">
                  {p.n}
                </div>
              </div>
              <div className="lg:col-span-9">
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight mb-5">
                  {p.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 3 — Relationship to Privacy Toolkit and Data Trust */}
      <section className="bg-foreground text-background px-4 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-10">
            § 03 / How EELP Fits
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
                EELP,{" "}
                <i className="italic font-normal" style={{ color: "#C8A96E" }}>
                  the Living Trust Framework,
                </i>{" "}
                and the Data Trust.
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-background/70">
                EELP does not stand alone. It is part of a layered governance
                architecture that separates the operating protocol from the
                data rights framework and the trust structure that governs what
                happens to data after it is collected.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-background/20">
            {[
              {
                n: "01",
                title: "EELP",
                body: "The operating standard. Defines how an AI-mediated experience must be run — consent gates, disclosure requirements, human override points, and community accountability mechanisms.",
              },
              {
                n: "02",
                title: "Living Trust Framework",
                body: "The data rights framework. Defines what data can be collected, why, who can access it, and how it can be corrected, exported, or deleted. A living trust agreement between builders and participants.",
              },
              {
                n: "03",
                title: "Data Trust",
                body: "The governance structure. A participant-governed architecture for how data collected across EELP-compliant experiences is stored, managed, and used — with community input shaping the rules.",
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

      {/* Section 4 — Status + CTA */}
      <section
        data-testid="eelp-cta"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-20 md:pb-32 hairline-t border-border"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-4xl"
        >
          <MonoLabel className="mb-6">Current status</MonoLabel>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8"
          >
            A draft framework,{" "}
            <i className="italic font-normal text-accent-gold">
              actively being refined.
            </i>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 max-w-2xl"
          >
            EELP is a draft framework in active development. It is being refined
            through active pilots and prototypes — including the Connect protocol and Ikigai
            workshops — and through community feedback. It is not yet finalized,
            certified, or legally approved.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10"
          >
            Status — public draft protocol · in active development · license under review
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@playa-ai.org&su=EELP%20Brief%20Request"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Request the EELP brief →
            </a>
            <a
              href="/living-trust-framework"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              View Living Trust Framework →
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-5">
          PUBLIC DRAFT PROTOCOL · DRAFT FRAMEWORK · DESIGNED TO BE ADOPTED WITHOUT A LEGAL TEAM
        </div>
      </section>

      <SiteFooter contextLine="EELP · Ethical Experience Lab Protocol · Govern" />
    </main>
  );
}
