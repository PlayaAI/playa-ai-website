import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import { ContinueExploring } from "@/components/ContinueExploring";
import ltfSystemsMapImg from "@assets/ChatGPT_Image_Jul_15,_2026,_09_28_07_PM_1784140223332.png";

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
    bm: "Radical Inclusion",
    right: "Right to Equitable Access",
    action: "Attribute-Based Access Control (ABAC); inclusive design — target practices, implementation in progress",
  },
  {
    bm: "Gifting",
    right: "Right to Generous Transparency",
    action: "Open documentation; data provenance tools",
  },
  {
    bm: "Decommodification",
    right: "Right to Non-Exploitation",
    action: "No dark patterns; data use limitations",
  },
  {
    bm: "Radical Self-Reliance",
    right: "Right to Sovereign Control",
    action: "Portable data formats; robust self-service tools — implementation direction",
  },
  {
    bm: "Communal Effort",
    right: "Right to Co-Created Governance",
    action: "Participatory policy review; ethics advisory boards",
  },
  {
    bm: "Radical Self-Expression",
    right: "Right to Contextual Integrity",
    action: "Granular consent controls; purpose limitation",
  },
  {
    bm: "Civic Responsibility",
    right: "Right to Accountable Stewardship",
    action: "Data Protection Impact Assessments (DPIAs); human oversight for AI — target practices",
  },
  {
    bm: "Leaving No Trace",
    right: "Right to Ephemeral Presence",
    action: "Automated data minimization and deletion — implementation direction",
  },
  {
    bm: "Participation",
    right: "Right to Meaningful Agency",
    action: "Frictionless DSAR portals; interactive privacy dashboards — target practices",
  },
  {
    bm: "Immediacy",
    right: "Right to Present-tense Relevance",
    action: "Real-time consent updates; dynamic data valuation — implementation direction",
  },
];

const OP_PILLARS = [
  {
    title: "Proactive Stewardship",
    body: "Establish a rotating ethics review process that includes community members. Use Data Protection Impact Assessments (DPIAs) for new projects before sensitive systems are deployed — a target practice, not a currently deployed capability.",
  },
  {
    title: "Architectural Integrity",
    body: "Use privacy-by-design architecture and policy-as-code where appropriate, so ethical rules such as data minimization are enforced inside the system — not added afterward. These are implementation directions the framework is moving toward.",
  },
  {
    title: "Cultural Embodiment",
    body: "Train builders, engineers, and product teams in humane technology design. Measure success through trust, agency, and community benefit — not data accumulation.",
  },
];

const OLD_CONTRACT = [
  "Privacy as legal shield",
  "Data as corporate asset",
  "Consent as checkbox",
  "Deletion as support request",
  "Users as data subjects",
  "Policy as static document",
];

const NEW_COVENANT = [
  "Privacy as relationship",
  "Data as extension of identity",
  "Consent as ongoing participation",
  "Deletion as right",
  "Participants as co-governors",
  "Policy as living agreement",
];

const AI_AREAS = [
  {
    title: "Training data rights",
    body: "Participants should know whether their data may be used to train models, and should be able to opt out without losing access.",
  },
  {
    title: "Inference ethics",
    body: "AI systems can infer things people did not share. Inferred identity should be treated with the same care as disclosed identity.",
  },
  {
    title: "Emergent behavior governance",
    body: "AI systems can develop behaviors not anticipated by their designers. Governance frameworks must include monitoring for unexpected patterns in how data is used.",
  },
  {
    title: "Collective and relational data",
    body: "When data belongs to a relationship, camp, gathering, or community, governance cannot be reduced to one individual checkbox.",
  },
  {
    title: "Temporal sovereignty",
    body: "People should be able to distinguish what is remembered from what is forgotten. Not every interaction should be archived.",
  },
  {
    title: "Consent in altered states",
    body: "Consent should not be designed as if every participant is always fully resourced, sober, calm, or cognitively unimpaired.",
  },
  {
    title: "Indigenous data sovereignty",
    body: "Communities with distinct cultural, historical, and relational knowledge require governance frameworks that respect collective ownership.",
  },
  {
    title: "Digital legacy",
    body: "People should have a say in what happens to their data, stories, and AI-mediated memory after death.",
  },
  {
    title: "Children and future generations",
    body: "Some participants require stronger protections, clearer defaults, and less extractive data practices by design.",
  },
  {
    title: "Economic justice",
    body: "When data generates value, the people who produced it should not be left entirely outside that relationship.",
  },
  {
    title: "Environmental impact",
    body: "The compute and storage footprint of AI systems is a privacy-adjacent concern — communities have a stake in the infrastructure that processes their data.",
  },
];

const WHAT_WE_DO = [
  "Ask before capturing sensitive data",
  "Explain how data may be used",
  "Minimize what is collected",
  "Require human review for high-risk AI use",
  "Publish meaningful policy changes clearly",
  "Design for deletion from the beginning",
];

const NEVER_DO = [
  "Sell intimate data",
  "Use dark patterns to force consent",
  "Treat consent as permanent",
  "Hide sensitive AI inference behind vague language",
  "Design for extraction over agency",
  "Use community memory without community accountability",
];

const YOU_CONTROL = [
  "Whether to participate",
  "What can be remembered",
  "What can be deleted",
  "What can be shared",
  "When consent changes",
  "Whether your data can train or improve systems",
];

const SPECIAL_PROTECTIONS = [
  {
    title: "Altered States",
    body: "Consent should not be designed as if every participant is always fully resourced, sober, calm, or cognitively unimpaired. The framework targets architecture that accounts for human vulnerability.",
  },
  {
    title: "Digital Legacy",
    body: "People should have a say in what happens to their data, stories, and AI-mediated memory after death. This remains an open design challenge the framework explicitly names.",
  },
  {
    title: "Children and Vulnerable Populations",
    body: "Some participants require stronger protections, clearer defaults, and less extractive data practices. Higher standards apply whenever the power differential is greatest.",
  },
  {
    title: "Collective Memory",
    body: "When data belongs to a relationship, camp, gathering, or community, governance should not be reduced to one individual checkbox.",
  },
];

const IMPL_PHASES = [
  {
    n: "01",
    title: "Internal review",
    body: "Core team alignment on principles, definitions, and edge cases. Ethics review with community advisors.",
  },
  {
    n: "02",
    title: "Community preview",
    body: "Share the working framework with trusted contributors. Gather structured feedback before wider publication.",
  },
  {
    n: "03",
    title: "Pilot application",
    body: "Apply the framework across Playa AI projects — Connect, EELP, Oracle — as real-world test cases and stress tests.",
  },
  {
    n: "04",
    title: "Public open-source release",
    body: "Prepare the framework for public release under an approved open license with templates, adaptation guidance, versioning, and a public repository.",
  },
];

const GITHUB_URL = "https://github.com/PlayaAI/playa-ai-living-trust-framework";

export default function LivingTrustFramework() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        active="work"
        contextLine={
          <>
            <span>Living Trust Framework</span>
            <span>·</span>
            <span className="text-accent-gold">
              Consent / Data Dignity / Human Agency
            </span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">
              A working framework for AI-mediated experiences
            </span>
          </>
        }
      />

      {/* Hero */}
      <section
        id="main-content"
        data-testid="ltf-hero"
        className="relative px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16 overflow-visible"
      >
        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-20 max-w-[760px] xl:max-w-[820px]"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-6"
          >
            Playa AI Living Trust Framework
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight mb-8"
          >
            A public working framework for consent, data dignity, and{" "}
            <i className="italic font-normal text-accent-gold">
              human agency.
            </i>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-5 text-foreground max-w-2xl"
          >
            The Playa AI Living Trust Framework is the working framework guiding
            data dignity, consent, memory, identity, and human agency across
            Playa AI tools. It translates participatory culture into practical
            privacy principles that can be adopted, adapted, and improved.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground max-w-2xl"
          >
            The framework is already guiding Playa AI tools, with broader
            integration planned across our tools over the next few weeks. ABAC,
            DPIAs, policy-as-code, and comparable technical items described
            here are target practices and implementation directions, not yet
            fully deployed capabilities. Privacy Compass remains a future
            concept. The open-source license is under review.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 font-mono text-[11px] uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-300"
            >
              View the v0.1.0 public-review draft on GitHub →
            </a>
          </motion.div>
        </motion.div>

        {/* Graphic — desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
          className="hidden lg:block absolute lg:left-[18%] lg:top-[48%] lg:w-[78vw] lg:max-w-[1260px] xl:left-[15%] xl:top-[46%] xl:w-[82vw] xl:max-w-[1650px] 2xl:left-[12%] 2xl:top-[44%] 2xl:w-[86vw] 2xl:max-w-[2100px] -translate-y-1/2 pointer-events-none z-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.72) 76%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.72) 76%, transparent 100%)",
          }}
        >
          <img
            src={ltfSystemsMapImg}
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
          className="block lg:hidden absolute left-[62%] top-[35%] sm:left-[58%] sm:top-[36%] md:left-[56%] md:top-[38%] -translate-x-1/2 -translate-y-1/2 w-[160vw] sm:w-[140vw] md:w-[115vw] max-w-none pointer-events-none z-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.45) 62%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.45) 62%, transparent 88%)",
          }}
        >
          <img
            src={ltfSystemsMapImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-[0.38] mix-blend-multiply"
          />
        </motion.div>
      </section>

      {/* § 01 — A Living Trust Agreement */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 01 / A Living Trust Agreement
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                More than a{" "}
                <i className="italic font-normal text-accent-gold">
                  policy link.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-start pt-1">
              <div className="space-y-4 max-w-2xl">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  Most privacy policies are written as legal shields. This
                  framework is designed as a living agreement between
                  organizations, participants, and the communities they serve.
                  It defines how data should be collected, remembered, shared,
                  deleted, and governed before sensitive systems are deployed.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  This framework moves beyond static, legalistic documents. It
                  functions as a dynamic covenant — updated through
                  participatory review, shaped by community experience, and
                  tested against real deployments.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-border">
            {[
              {
                title: "Dynamic Covenant",
                body: "The framework evolves. Policy language is not fixed at launch — it is reviewed on a structured cadence with community input.",
              },
              {
                title: "Participatory Review",
                body: "Policy changes go through structured community preview before adoption. Contributors are credited. Feedback is published.",
              },
              {
                title: "Privacy Compass",
                body: "Long-term vision: an interactive dashboard where participants can understand and adjust their data relationship in real time. Currently a future interface concept — not a shipped product.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`p-8 hairline-b border-border ${i < 2 ? "md:hairline-r md:border-r border-border" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent-gold mb-4">
                  {String(i + 1).padStart(2, "0")} /
                </p>
                <h3 className="font-serif text-xl md:text-2xl leading-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 02 — From Principles to Data Rights */}
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
              Each one maps to a concrete data right and a set of technical
              and policy actions an organization can make and keep. Technical
              items listed are target practices and implementation directions.
            </p>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-0 hairline-t hairline-b border-border py-3 mb-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-0 pr-6">
            Burning Man Principle
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-6">
            Translated Data Right
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-6">
            Technical &amp; Policy Action
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
              className="hairline-b border-border grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-0 py-5 md:py-6"
            >
              <div className="flex items-start gap-4 lg:pr-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-6 shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl md:text-2xl leading-tight">
                  {p.bm}
                </span>
              </div>
              <div className="pl-10 lg:pl-6 lg:border-l border-border">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
                  {p.right}
                </span>
              </div>
              <div className="pl-10 lg:pl-6 lg:border-l border-border">
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {p.action}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* § 03 — Operationalizing the Philosophy */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 03 / Operationalizing the Philosophy
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                How privacy becomes{" "}
                <i className="italic font-normal text-accent-gold">practice.</i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                Philosophy without mechanism is aspiration. The framework
                defines three implementation directions that translate consent
                values into real system behaviour and organizational culture.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-border">
            {OP_PILLARS.map((card, i) => (
              <div
                key={card.title}
                className={`p-8 hairline-b border-border ${i < 2 ? "md:hairline-r md:border-r border-border" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
                  {String(i + 1).padStart(2, "0")} /
                </p>
                <h3 className="font-serif text-xl md:text-2xl leading-tight mb-4">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Target practices — implementation in progress
          </p>
        </div>
      </section>

      {/* § 04 — Old Contract / New Covenant (dark) */}
      <section className="bg-foreground text-background px-4 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-10">
            § 04 / Old Contract / New Covenant
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
                From extraction{" "}
                <i className="italic font-normal" style={{ color: "#C8A96E" }}>
                  to trust.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-background/70">
                The standard contract between platforms and people was written
                in favor of platforms. This framework proposes a different
                arrangement — one built on relationship, not extraction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-background/20">
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-background/20">
              <p className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-6">
                Old contract
              </p>
              <ul className="space-y-4">
                {OLD_CONTRACT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-mono text-background/30 shrink-0 mt-0.5">
                      —
                    </span>
                    <span className="font-serif text-lg md:text-xl leading-tight text-background/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: "#C8A96E" }}>
                New covenant
              </p>
              <ul className="space-y-4">
                {NEW_COVENANT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5" style={{ color: "#C8A96E" }}>
                      →
                    </span>
                    <span className="font-serif text-lg md:text-xl leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* § 05 — Built for the AI Era */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 05 / Built for the AI Era
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Protection areas the{" "}
              <i className="italic font-normal text-accent-gold">
                framework addresses.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              AI systems introduce privacy questions that ordinary policies
              rarely address. These are not finished legal guarantees — they
              are the questions the framework is designed to answer.
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
          {AI_AREAS.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeInUp}
              className="hairline-b border-border grid grid-cols-1 md:grid-cols-12 gap-4 py-5 md:py-6"
            >
              <div className="md:col-span-1 flex items-start">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-4 flex items-start">
                <h3 className="font-serif text-xl md:text-2xl leading-tight">
                  {c.title}
                </h3>
              </div>
              <div className="md:col-span-7 flex items-start">
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* § 06 — Rights and Practices */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 06 / Rights and Practices
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                What this means{" "}
                <i className="italic font-normal text-accent-gold">
                  in practice.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                The framework translates principles into concrete commitments —
                what organizations working under it do, what they refuse to
                do, and what participants can always control.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-border">
            <div className="p-8 hairline-b border-border md:hairline-r md:border-r border-border">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent-gold mb-6">
                What we do
              </p>
              <ul className="space-y-3">
                {WHAT_WE_DO.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-mono text-accent-gold shrink-0 text-xs mt-0.5">
                      →
                    </span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 hairline-b border-border md:hairline-r md:border-r border-border">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
                What we never do
              </p>
              <ul className="space-y-3">
                {NEVER_DO.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-mono text-muted-foreground shrink-0 text-xs mt-0.5">
                      ×
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 hairline-b border-border">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
                What you control
              </p>
              <ul className="space-y-3">
                {YOU_CONTROL.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-mono text-muted-foreground shrink-0 text-xs mt-0.5">
                      ◦
                    </span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* § 07 — Leave No Trace Protocol */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 07 / Leave No Trace Protocol
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Deletion is a right, not a{" "}
              <i className="italic font-normal text-accent-gold">
                support ticket.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-start pt-1">
            <div className="space-y-4 max-w-2xl">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Leaving No Trace translates directly into data minimization,
                expiration, deletion rights, and careful memory design. Some
                experiences should be remembered. Some should disappear.
                Participants should understand the difference before they begin.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hairline-t border-border"
        >
          {[
            {
              title: "Minimize collection",
              body: "Only capture what is needed for the stated purpose. If it is not necessary, it should not be gathered.",
            },
            {
              title: "Set expiration rules",
              body: "Where possible, define how long data is retained before automatic deletion. Expiry is a feature, not an afterthought.",
            },
            {
              title: "Make deletion understandable",
              body: "Participants should be able to find and execute deletion without navigating bureaucratic friction.",
            },
            {
              title: "Separate personal and community memory",
              body: "What belongs to an individual and what belongs to a gathering are different. Governance of each should reflect that.",
            },
            {
              title: "Avoid permanent capture by default",
              body: "Permanence is a choice, not a default. Systems should be designed with ephemerality in mind.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="p-8 hairline-b border-border hairline-r border-r border-border last:border-r-0"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">
                {String(i + 1).padStart(2, "0")} /
              </span>
              <h3 className="font-serif text-xl md:text-2xl leading-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* § 08 — Special Protections (dark) */}
      <section className="bg-foreground text-background px-4 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-10">
            § 08 / Special Protections
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
                Some contexts require{" "}
                <i className="italic font-normal" style={{ color: "#C8A96E" }}>
                  more care.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <p className="text-base md:text-lg leading-relaxed text-background/70">
                Standard consent design is built for the average case. The
                framework explicitly names the contexts where higher standards
                apply and standard assumptions break down.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-background/20">
            {SPECIAL_PROTECTIONS.map((card, i) => (
              <div
                key={card.title}
                className={`p-8 md:p-10 border-background/20 ${
                  i < 2 ? "border-b" : ""
                } ${i % 2 === 0 ? "md:border-r" : ""}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-5">
                  {String(i + 1).padStart(2, "0")} /
                </p>
                <h3 className="font-serif text-xl md:text-2xl leading-tight mb-4">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-background/65">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 09 — Gifting the Framework */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
          <div className="font-mono text-sm mb-10 text-muted-foreground">
            § 09 / Gifting the Framework
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Designed to be forked,{" "}
                <i className="italic font-normal text-accent-gold">
                  not just read.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-start pt-1">
              <div className="space-y-6 max-w-2xl">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  The Living Trust Framework is intended to become an
                  open-source resource that other communities, camps, projects,
                  and AI builders can adopt, adapt, and improve. Privacy
                  infrastructure should not require a legal team to use.
                </p>
                <div className="grid grid-cols-2 gap-4 hairline-t border-border pt-6">
                  {[
                    "Templates for common consent scenarios",
                    "Adaptation guidance for different contexts",
                    "Versioning with community changelog",
                    "Structured feedback process",
                    "Public repository (in progress)",
                    "License under review — open licensing intended",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="font-mono text-accent-gold text-xs shrink-0 mt-0.5">
                        →
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* § 10 — Implementation Notes */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 10 / Implementation Notes
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              From framework{" "}
              <i className="italic font-normal text-accent-gold">
                to field use.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              The framework moves from internal alignment to public open-source
              release across four phases. Each phase includes structured
              feedback and versioning before the next begins.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="hairline-t border-border"
        >
          {IMPL_PHASES.map((phase) => (
            <motion.div
              key={phase.n}
              variants={fadeInUp}
              className="hairline-b border-border grid grid-cols-1 md:grid-cols-12 gap-4 py-6 md:py-8"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {phase.n}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                  {phase.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {phase.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section
        data-testid="ltf-cta"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-20 md:pb-32 hairline-t border-border"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-4xl"
        >
          <MonoLabel className="mb-6">Help build it</MonoLabel>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8"
          >
            Help us make privacy a{" "}
            <i className="italic font-normal text-accent-gold">
              living agreement.
            </i>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 max-w-2xl"
          >
            This is a working framework guiding Playa AI tools today, with
            broader integration planned over the next few weeks. It is not a
            finished legal document or certified standard — technical practices
            listed here are implementation directions. We welcome privacy
            experts, AI builders, legal contributors, camp leads, researchers,
            and community stewards who want to contribute to its ongoing
            development.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10"
          >
            Status — working framework · in active development
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              View the v0.1.0 public-review draft on GitHub →
            </a>
            <a
              href="mailto:team@playa-ai.org?subject=Living%20Trust%20Framework%20Brief%20Request"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Request the brief →
            </a>
            <a
              href="mailto:team@playa-ai.org?subject=Living%20Trust%20Framework%20Contribution"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Contribute →
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-5">
          CONSENT FIRST · PRIVACY AS DESIGN · TRUST AS INFRASTRUCTURE
        </div>
      </section>

      <ContinueExploring links={[
        { label: "Review EELP", href: "/eelp" },
        { label: "Explore all work", href: "/work" },
      ]} />
      <SiteFooter contextLine="Living Trust Framework · Consent / Data Dignity / Human Agency" contentStatus="Website content reviewed 2 August 2026." />
    </main>
  );
}
