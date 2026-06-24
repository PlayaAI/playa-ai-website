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
  { bm: "Radical Inclusion", right: "Equitable access" },
  { bm: "Gifting", right: "Transparent documentation" },
  { bm: "Decommodification", right: "Non-extractive data use" },
  { bm: "Radical Self-Reliance", right: "User control and portability" },
  { bm: "Communal Effort", right: "Participatory governance" },
  { bm: "Radical Self-Expression", right: "Contextual consent" },
  { bm: "Civic Responsibility", right: "Accountable stewardship" },
  { bm: "Leaving No Trace", right: "Data minimization and deletion" },
  { bm: "Participation", right: "Meaningful agency" },
  { bm: "Immediacy", right: "Present-tense relevance" },
];

const AI_CARDS = [
  {
    title: "Training data rights",
    body: "Participants should know whether their data may be used to train models, and should be able to opt out without losing access.",
  },
  {
    title: "Inference and identity",
    body: "AI systems can infer things people did not share. Inferred identity should be treated with the same care as disclosed identity.",
  },
  {
    title: "Human override",
    body: "All high-stakes decisions made with AI input should have a clear human review point. Automation does not replace judgment.",
  },
  {
    title: "Community memory",
    body: "When a community produces collective data, no individual or organization should be able to claim exclusive ownership of what was shared.",
  },
];

const WHAT_DEFINES = [
  "What data is collected",
  "Why it is collected",
  "Who can access it",
  "How consent is requested and updated",
  "How data can be corrected, exported, or deleted",
  "When human review is required",
  "How community feedback shapes the policy",
];

export default function PrivacyToolkit() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        active="home"
        contextLine={
          <>
            <span>Privacy Toolkit</span>
            <span>·</span>
            <span className="text-accent-gold">
              Consent / Data Dignity / Human Agency
            </span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">
              A living trust agreement for AI-mediated experiences
            </span>
          </>
        }
      />

      {/* Hero */}
      <section
        data-testid="privacy-toolkit-hero"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>Privacy Toolkit · Playa AI Foundation · 2026</span>
          <span className="text-muted-foreground">Protocol / Open Tool · Draft / Under Review</span>
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
            Privacy Toolkit
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight mb-8"
          >
            A consent-first framework for AI-mediated{" "}
            <i className="italic font-normal text-accent-gold">experiences.</i>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-10 text-foreground max-w-2xl"
          >
            The Privacy Toolkit is Playa AI&rsquo;s working framework for data
            dignity, consent, memory, identity, and human agency in AI systems.
            It translates participatory culture into practical privacy principles
            that can be adopted, adapted, and improved.
          </motion.p>
        </motion.div>

        <div className="mt-8 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-4">
          CONSENT BEFORE CAPTURE · HUMAN OVERRIDE BY DESIGN · LEARNING RETURNED
          TO THE COMMONS
        </div>
      </section>

      {/* Section 1 — A Living Trust Agreement */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 01 / A Living Trust Agreement
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                More than a{" "}
                <i className="italic font-normal text-accent-gold">
                  policy link.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                Most privacy policies are written as legal shields. This toolkit
                is designed as a living agreement between organizations,
                participants, and the communities they serve. It defines how
                data should be collected, remembered, shared, deleted, and
                governed before sensitive systems are deployed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — From Principles to Data Rights */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 02 / From Principles to Data Rights
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Ten principles.{" "}
              <i className="italic font-normal text-accent-gold">
                Ten data rights.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              The Ten Principles of Burning Man are not just cultural values.
              Each one maps to a concrete data right — a promise an organization
              can make and keep.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="hairline-t border-border"
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.bm}
              variants={fadeInUp}
              className="hairline-b border-border grid grid-cols-1 md:grid-cols-2 gap-4 py-5 md:py-6"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl md:text-2xl leading-tight">
                  {p.bm}
                </span>
              </div>
              <div className="flex items-center pl-10 md:pl-0">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
                  → {p.right}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 3 — Built for the AI Era */}
      <section className="bg-foreground text-background px-4 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-10">
            § 03 / Built for the AI era
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
                Policies written for{" "}
                <i
                  className="italic font-normal"
                  style={{ color: "#C8A96E" }}
                >
                  the AI era.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-background/70">
                AI systems introduce privacy questions that ordinary policies
                rarely address: training data rights, inferred identity,
                community memory, synthetic outputs, consent in sensitive
                contexts, and what happens when systems learn more than
                participants intended to share.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-background/20">
            {AI_CARDS.map((c, i) => (
              <div
                key={c.title}
                className={`p-8 md:p-10 ${
                  i < 3
                    ? "border-b md:border-b-0 border-background/20 md:border-r"
                    : ""
                } ${i === 1 ? "lg:border-r border-background/20" : ""} ${
                  i === 2 ? "border-b lg:border-b-0 lg:border-r border-background/20" : ""
                }`}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-5">
                  {String(i + 1).padStart(2, "0")} /
                </div>
                <h3 className="font-serif text-xl md:text-2xl leading-tight mb-4">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-background/65">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — What the Toolkit Helps Define */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 04 / What the Toolkit Helps Define
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Concrete answers to{" "}
              <i className="italic font-normal text-accent-gold">
                hard questions.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              The toolkit is not a philosophy document. It is a working
              instrument that helps organizations answer the questions
              participants deserve to have answered before they share anything
              personal.
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
          {WHAT_DEFINES.map((item, i) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              className={`p-8 hairline-b border-border flex items-start gap-4 ${
                i % 3 !== 2 ? "lg:hairline-r" : ""
              } ${i % 2 === 0 ? "md:hairline-r lg:border-r-0" : ""} ${
                i % 3 === 1 ? "lg:hairline-r" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif text-xl md:text-2xl leading-tight">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 5 — Current Status + CTA */}
      <section
        data-testid="privacy-toolkit-cta"
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
            A working framework,{" "}
            <i className="italic font-normal text-accent-gold">
              openly shared.
            </i>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 max-w-2xl"
          >
            The Privacy Toolkit is currently in design as a working framework
            behind Playa AI&rsquo;s consent-first projects, including EELP and
            the Connect protocol. It is not a finished legal document — it is an
            evolving instrument, shaped by real deployments and community
            feedback.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10"
          >
            Status — in design
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href="mailto:hello@playa-ai.org?subject=Privacy Toolkit Brief Request"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Request the Privacy Toolkit brief →
            </a>
            <a
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              See all our work →
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-5">
          CONSENT FIRST · PRIVACY AS DESIGN · TRUST AS INFRASTRUCTURE
        </div>
      </section>

      <SiteFooter contextLine="Privacy Toolkit · Consent / Data Dignity / Human Agency" />
    </main>
  );
}
