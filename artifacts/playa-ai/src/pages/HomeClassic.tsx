import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import gatheringScreenImg from "@assets/image_1778690528207.png";
import salonDiscussionImg from "@assets/image_1778690538108.png";
import abstractArtImg from "@assets/image_1778690543179.png";
import playaHeroBlueprintImg from "@assets/playa-hero-blueprint-transparent.png";
import manifestoText from "./manifesto.txt?raw";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Pledge items — "We hold these truths" removed; plain-language commitment retained
const PLEDGE_ITEMS = [
  "That our humanness is foundational to wellbeing.",
  "That trust is essential, especially in the digital age.",
  "That hope is the antidote to fear, and is built through creativity, connection, and community.",
  "That our values must be evident in how we design and engage with technology.",
  "That consent is a precondition, not a checkbox.",
  "That identity belongs to the person, not the platform.",
  "That participation is the difference between an audience and a community.",
  "That stories are community memory — and deserve to be governed as such.",
  "That a future worth living in must be designed with the people who will live in it.",
  "We pledge to build, fund, and adopt AI that earns this future.",
];

function PledgeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-12 md:py-16 overflow-y-auto"
          style={{ backgroundColor: "rgba(14, 13, 11, 0.55)" }}
          onClick={onClose}
          data-testid="pledge-modal-backdrop"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-background border border-foreground"
            data-testid="pledge-modal"
          >
            <div className="flex items-start justify-between hairline-b border-border px-8 py-6">
              <div>
                {/* Replaced "Layer 0 / Founding signers" with plain-language label */}
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Founding Signatories / Public Commitment
                </div>
                <div className="font-serif text-3xl md:text-4xl leading-none">
                  The Pledge
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-pledge"
              >
                Close ×
              </button>
            </div>

            <div className="px-8 py-8">
              <p className="text-base md:text-lg leading-relaxed mb-6 text-foreground">
                A plain-language commitment to the kind of AI we will build,
                fund, and adopt. Sign it as an institution, a funder, or a
                person.
              </p>

              <ul className="space-y-4 mb-10">
                {PLEDGE_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-xs text-muted-foreground pt-1.5 shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base md:text-lg leading-snug text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="hairline-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
                {/* Softened filing note */}
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Drafted Spring 2026 · Black Rock Desert origin
                </div>
                {/* CTA now points to contact email rather than pretending a form exists */}
                <a
                  href="mailto:hello@playa-ai.org?subject=Public%20Commitment%20%E2%80%94%20The%20Pledge"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest border border-foreground hover:bg-background hover:text-foreground transition-colors"
                  data-testid="button-send-pledge"
                >
                  Start the Conversation →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatManifestoBlocks(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const compact = block.replace(/\s+/g, " ").trim();
      const isHeading =
        index === 0 ||
        (compact.length < 90 &&
          (/^[A-Z0-9\s·:—–-]+$/.test(compact) ||
            /^\d+\.?\s+/.test(compact) ||
            /^(In one sentence|In 100 words|In 1000 words|Our Mission|Why Now|Why Burning Man|The Call|The Pledge|What We're Building|What We're Building|This Is About More Than Technology)$/i.test(
              compact,
            )));

      return {
        id: `${index}-${compact.slice(0, 24).replace(/[^a-z0-9]+/gi, "-")}`,
        text: block,
        type: index === 0 ? "title" : isHeading ? "heading" : "paragraph",
      };
    });
}

function ManifestoDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [fullOpen, setFullOpen] = useState(false);

  useEffect(() => {
    if (!open) setFullOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const normalizedManifestoText = manifestoText.replace(/\r\n/g, "\n");

  const rawLines = normalizedManifestoText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const introTitle = rawLines[0] || "Playa AI Manifesto";
  const oneSentenceLabel = rawLines[1] || "In one sentence";
  const oneSentenceText = rawLines[2] || "";

  let skippedIntroLines = 0;
  const remainingText = normalizedManifestoText
    .split("\n")
    .filter((line) => {
      if (skippedIntroLines < 3 && line.trim()) {
        skippedIntroLines += 1;
        return false;
      }
      return skippedIntroLines >= 3;
    })
    .join("\n")
    .trim();

  const blocks = formatManifestoBlocks(remainingText);

  const thousandIndex = blocks.findIndex((block) =>
    block.text.toLowerCase().includes("in 1000 words"),
  );
  const previewBlocks =
    thousandIndex >= 0 ? blocks.slice(0, thousandIndex) : blocks;
  const fullBlocks =
    thousandIndex >= 0 ? blocks.slice(thousandIndex) : [];

  type Block = ReturnType<typeof formatManifestoBlocks>[number];

  function renderBlock(
    block: Block,
    i: number,
    siblings: Block[],
    insideAccordion: boolean,
  ) {
    if (block.type === "heading" || block.type === "title") {
      return (
        <h3
          key={block.id}
          className={`w-full text-left font-serif leading-none tracking-tight text-accent-gold ${
            insideAccordion
              ? "pt-8 text-2xl md:text-3xl"
              : "pt-10 text-2xl md:text-3xl"
          }`}
        >
          {block.text.split("\n").map((line, li) => (
            <React.Fragment key={`${block.id}-${li}`}>
              {line}
              {li < block.text.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
      );
    }
    const prevBlock = i > 0 ? siblings[i - 1] : null;
    const is100WordsParagraph =
      !insideAccordion &&
      prevBlock != null &&
      prevBlock.text.toLowerCase().includes("in 100 words");
    return (
      <p
        key={block.id}
        className={
          is100WordsParagraph
            ? "max-w-[760px] text-left font-serif text-2xl md:text-4xl leading-[1.05] tracking-tight text-accent-gold"
            : "max-w-[62ch] text-left text-base md:text-lg leading-relaxed text-muted-foreground"
        }
      >
        {block.text.split("\n").map((line, li) => (
          <React.Fragment key={`${block.id}-${li}`}>
            {line}
            {li < block.text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  }

  const accordionContent = fullBlocks.slice(1);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close manifesto"
            className="fixed inset-0 z-50 cursor-default bg-foreground/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            data-testid="manifesto-overlay"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="manifesto-drawer-title"
            className="fixed bottom-0 left-1/2 z-50 flex h-[88vh] w-[calc(100%-24px)] max-w-[920px] flex-col border border-border border-b-0 bg-background shadow-[0_-30px_100px_rgba(0,0,0,0.34)] md:h-[88vh] md:w-[calc(100%-64px)]"
            initial={{ y: "105%", x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: "105%", x: "-50%" }}
            transition={{ duration: 0.56, ease: [0.2, 0.8, 0.2, 1] as const }}
            data-testid="manifesto-drawer"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close manifesto"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center border border-foreground bg-foreground text-background transition-colors hover:border-accent-gold hover:bg-accent-gold"
              data-testid="button-close-manifesto"
            >
              ×
            </button>

            <div className="overflow-y-auto px-5 pb-20 pt-16 text-left md:px-16 md:pt-24 lg:px-24">
              <div className="mx-auto flex w-full max-w-[760px] flex-col items-start">
                <div className="mb-10 text-left font-mono text-xs uppercase tracking-widest text-accent-gold">
                  Manifesto / A future born in the desert
                </div>

                <div className="w-full space-y-6 text-left">
                  <h2
                    id="manifesto-drawer-title"
                    className="w-full max-w-none text-left font-serif text-5xl leading-none tracking-tight md:text-7xl"
                  >
                    {introTitle}
                  </h2>

                  <div className="pt-4 text-left font-mono text-xs uppercase tracking-widest text-accent-gold">
                    {oneSentenceLabel}
                  </div>

                  <p className="w-full max-w-none text-left font-serif text-4xl leading-[0.98] tracking-tight text-foreground md:text-6xl">
                    {oneSentenceText}
                  </p>

                  <div className="pt-8 space-y-6">
                    {previewBlocks.map((block, i) =>
                      renderBlock(block, i, previewBlocks, false),
                    )}
                  </div>

                  {fullBlocks.length > 0 && (
                    <div className="mt-12 w-full border-y border-border">
                      <button
                        type="button"
                        onClick={() => setFullOpen((v) => !v)}
                        aria-expanded={fullOpen}
                        aria-controls="manifesto-full-text"
                        className="w-full py-6 flex items-center justify-between gap-6 text-left"
                      >
                        <div>
                          <div className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-2">
                            In 1000 words
                          </div>
                          <div className="font-serif text-2xl md:text-3xl leading-none text-foreground">
                            Read the full manifesto
                          </div>
                        </div>
                        <div className="shrink-0 h-10 w-10 border border-foreground flex items-center justify-center font-mono text-lg select-none">
                          {fullOpen ? "–" : "+"}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {fullOpen && (
                          <motion.div
                            id="manifesto-full-text"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1] as const,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 pt-2 space-y-6">
                              {accordionContent.map((block, i) =>
                                renderBlock(block, i, accordionContent, true),
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);

  // Year-One spine — CTAs now honest: no fake "Review" or "Pilot" links
  const yearOneSpine = [
    {
      num: "01",
      tag: "The Standard",
      title: "EELP draft framework",
      // Plain-language definition added inline in the desc
      desc: "EELP — Ethical Experience Lab Protocol — is a public draft protocol for consent, disclosure, data minimization, human override, and community accountability in AI-mediated experiences. The draft framework is in active development.",
      cta: "Request the EELP brief",
      href: "mailto:hello@playa-ai.org?subject=EELP%20Brief%20Request",
    },
    {
      num: "02",
      tag: "The Governance",
      title: "Consent-first Data Trust",
      desc: "The Data Trust is a governance model giving participants control over how their stories, data, identity, and permissions are used, stored, or deleted — being designed before sensitive data is collected.",
      cta: "Contact us about the Data Trust",
      href: "mailto:hello@playa-ai.org?subject=Data%20Trust%20Inquiry",
    },
    {
      num: "03",
      tag: "The Tool",
      title: "Connect Protocol pilots",
      desc: "Connect Protocol is a set of AI-guided facilitation tools that help people move from digital interaction into deeper offline connection. Pilot design is underway.",
      cta: "Discuss a Connect pilot",
      href: "mailto:hello@playa-ai.org?subject=Connect%20Protocol%20Pilot",
    },
    {
      num: "04",
      tag: "The Output",
      title: "Artist microgrants",
      desc: "Year-One microgrants for artists and artist-technologist teams building responsible, human-centered AI experiences under EELP consent and disclosure guidelines.",
      cta: "Join the artist interest list",
      href: "mailto:hello@playa-ai.org?subject=Artist%20Grant%20Interest",
    },
    {
      num: "05",
      tag: "The Proof",
      title: "Impact / Field Report",
      desc: "The Impact / Field Report is the public record of what was tested, what failed, what changed, and what other communities can reuse — published openly at the close of Year One.",
      cta: "Get notified when it publishes",
      href: "mailto:hello@playa-ai.org?subject=Field%20Report%20Notification",
    },
  ];

  const audiencePaths = [
    {
      tag: "Path 01 / Institutions",
      title: "Become a Founding Adopter",
      desc: "For universities, museums, festivals, civic AI teams, and research labs that want to help test and improve EELP in real community settings. The Founding Adopter pathway is open.",
      link: "Request Adopter Conversation →",
      href: "mailto:hello@playa-ai.org?subject=Founding%20Adopter%20Inquiry",
    },
    {
      tag: "Path 02 / Funders",
      title: "Support Year One",
      desc: "Fund the standards work, governance design, Connect pilots, artist microgrants, documentation, and public field reporting that turn the mission into accountable, public-interest infrastructure. Tax-deductible giving available through Mystic Arts Foundation.",
      link: "Schedule Donor Conversation →",
      href: "mailto:hello@playa-ai.org?subject=Donor%20Inquiry",
      bg: "bg-foreground text-background",
      border: "border-foreground",
    },
    {
      tag: "Path 03 / Builders + Artists",
      id: "partners",
      title: "Join as an Artist, Researcher, or Builder",
      desc: "Our contributor working group — open to artists, researchers, facilitators, and builders helping translate human-centered AI from principle into practice through salons, pilots, field notes, and open tools.",
      link: "Join the Working Group →",
      href: "mailto:hello@playa-ai.org?subject=Working%20Group%20Interest",
    },
  ];

  return (
    <main className="min-h-screen w-full font-sans text-foreground bg-background overflow-x-hidden selection:bg-foreground selection:text-background">
      <SiteHeader active="home" />
      {/* 1. Hero */}
      <section className="relative pt-6 pb-6 md:pt-10 md:pb-8 px-4 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] flex items-center overflow-visible">
        <div className="relative z-20 max-w-[720px] xl:max-w-[760px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif leading-[0.92] tracking-tight text-foreground mb-8"
            >
              <span className="block text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
                <i className="italic font-normal text-accent-gold">
                  This is human-AI
                  <br />
                  co-evolution.
                </i>
              </span>

              <span className="block text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
                Born on the Playa.
                <br />
                Gifted to the Planet.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base max-w-xl leading-relaxed mb-6 text-foreground font-medium"
            >
              AI is entering intimate human spaces faster than trust can keep
              up.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base max-w-xl leading-relaxed mb-5 text-muted-foreground"
            >
              Playa AI is public-interest infrastructure for
              human-centered AI.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base max-w-xl leading-relaxed mb-5 text-muted-foreground"
            >
              We build AI experiences and open tools, research how they shape
              people and communities, and publish the consent-first standards
              that result — free for anyone to adopt.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base max-w-xl leading-relaxed mb-10 text-muted-foreground"
            >
              Black Rock City is our first proving ground. What earns trust
              there becomes open protocol for other large scale gatherings,
              events, and civic life everywhere.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6"
            >
              We convene. We build. We fund. We publish.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
            >
              <a
                href="#fund"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
                data-testid="link-fund-year-one"
              >
                Fund Year One
              </a>

              <a
                href="#standard"
                className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                data-testid="link-become-founding-adopter"
              >
                Become a Founding Adopter
              </a>

              <button
                type="button"
                onClick={() => setManifestoOpen(true)}
                className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                data-testid="button-read-manifesto"
              >
                Read the Manifesto
              </button>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] tracking-widest text-muted-foreground mt-5"
            >
              A philanthropic initiative fiscally sponsored by Mystic Arts Foundation, a U.S. 501(c)(3) public charity.
            </motion.p>
          </motion.div>
        </div>
        {/* Blueprint image layer — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.3,
          }}
          className="
            hidden lg:block absolute
            lg:left-[46%] lg:top-[48%] lg:w-[60vw] lg:max-w-[980px]
            xl:left-[43%] xl:top-[46%] xl:w-[66vw] xl:max-w-[1350px]
            2xl:left-[38%] 2xl:top-[43%] 2xl:w-[70vw] 2xl:max-w-[1800px]
            -translate-y-1/2
            pointer-events-none z-0
          "
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.72) 76%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.72) 76%, transparent 100%)",
          }}
        >
          <img
            src={playaHeroBlueprintImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-100 mix-blend-multiply"
          />
        </motion.div>
        {/* Blueprint image layer — mobile/tablet only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.2,
          }}
          className="block lg:hidden absolute left-[62%] top-[35%] sm:left-[58%] sm:top-[36%] md:left-[56%] md:top-[38%] -translate-x-1/2 -translate-y-1/2 w-[130vw] sm:w-[115vw] md:w-[95vw] max-w-none pointer-events-none z-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.45) 62%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.45) 62%, transparent 88%)",
          }}
        >
          <img
            src={playaHeroBlueprintImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-[0.38] mix-blend-multiply"
          />
        </motion.div>
      </section>
      <div className="px-4 max-w-[1400px] mx-auto mt-0 font-mono text-[11px] tracking-widest text-muted-foreground border-t border-border pt-4">
        {" "}
        BORN IN THE BLACK ROCK DESERT · BUILT FOR THE PUBLIC INTEREST ·
        INDEPENDENT OF BURNING MAN ORGANIZATION
      </div>

      {/* 4. Proof of Progress */}
      <section className="pt-8 pb-8 md:pt-12 md:pb-12 px-4 max-w-[1400px] mx-auto">
        {" "}
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 01 / Proof of Progress
        </div>
        {/* Section intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-7xl leading-none mb-8">
              Build. Convene. <i className="italic">Govern.</i>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Three jobs for a public-interest AI lab — make tools that respect
              people, gather the people who&apos;ll use them, and publish the
              rules that keep both honest. Here&apos;s where each stands.
            </p>
          </div>
        </div>
        {/* Summary cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border"
        >
          {[
            {
              num: "01",
              title: "Build",
              desc: "Tools from our community — member-built tools supported by consent protocols, convening, and responsible distribution.",
            },
            {
              num: "02",
              title: "Convene",
              desc: "Gatherings and a standing cadence — the rhythm where the work gets built, argued over, and demonstrated.",
            },
            {
              num: "03",
              title: "Govern",
              desc: "Open standards and consent protocols — the rules that keep the tools honest, published so others can use them too.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 flex flex-col hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-sm mb-8">
                <span className="text-foreground">→</span>
                <span>{card.num}</span>
              </div>

              <h3 className="font-serif text-3xl mb-4 leading-none">
                {card.title}
              </h3>

              <p className="text-base text-muted-foreground leading-snug mt-auto">
                {card.desc}
              </p>

              <div className="mt-8 text-xl">›</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Build / Convene / Govern Detail */}
      <section
        id="standard"
        className="pt-12 pb-24 md:pt-16 md:pb-32 px-4 max-w-[1400px] mx-auto border-t border-border"
      >
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 02 / Build — Convene — Govern
        </div>

        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">
          Three pillars. <i className="italic">One public-interest system.</i>
        </h2>

        <p className="text-xl md:text-2xl max-w-4xl mb-20 text-muted-foreground">
          Playa AI is early-stage, and clear about it. We give a
          community the protocols, the gatherings, and the distribution to build
          AI that respects people — and we publish the standards so others can
          too.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="divide-y divide-border border-y border-border"
        >
          {/* Pillar 01 — Build */}
          <motion.div
            variants={fadeInUp}
            className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          >
            <div className="lg:col-span-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
              Pillar 01 <br /> Build
            </div>

            <div className="lg:col-span-6">
              <h3 className="font-serif text-4xl md:text-6xl mb-6">
                Tools from our community
              </h3>

              <div className="space-y-8 text-xl md:text-2xl leading-relaxed max-w-3xl">
                <p>
                  Playa AI doesn&apos;t build in a vacuum, and doesn&apos;t
                  pretend to. Our members build the tools; the initiative
                  supplies the consent protocols, the convening, and the
                  distribution that let those tools reach people responsibly.
                </p>

                <div>
                  <p className="font-serif text-3xl mb-3">Connect</p>
                  <p className="text-muted-foreground">
                    A non-extractive relational tool — an AI-guided experience
                    that prompts reflection, intention, and face-to-face
                    connection instead of harvesting attention. EELP and the
                    Data Trust are built in from the first prototype, not added
                    later.
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Status — released
                  </p>
                  <a
                    href="https://connect.playai.party"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    Open Connect →
                  </a>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">Ikigai App 1</p>
                  <p className="text-muted-foreground">
                    A workshop-tested AI life-discovery tool that guides
                    participants through the four circles of Ikigai: what they
                    love, what they are good at, what the world needs, and what
                    they can be paid for. Developed by Raed Marji and piloted
                    through the Menta Series in Miami.
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Status — pilot
                  </p>
                  <a
                    href="https://ikigai-rmarji.replit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    Open app →
                  </a>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">Ikigai App 2</p>
                  <p className="text-muted-foreground">
                    A research-based Leala Life Path prototype built with Claude
                    Code to help people move from the inklings of a dream to a
                    concrete roadmap. It explores how positive psychology, life
                    design, and AI-guided reflection can support structured
                    growth.
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Status — prototype
                  </p>
                  <a
                    href="https://ikigai-ai-qgergqr8.manus.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    Open prototype →
                  </a>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">
                    Relationship-nurturing tool
                  </p>
                  <p className="text-muted-foreground">
                    Built by community member Aaron Coombs to nurture and
                    sustain personal friendships — an AI companion for keeping
                    the relationships that matter from quietly going cold.
                  </p>
                </div>

                <p className="italic text-muted-foreground">
                  Built by our community, governed by our protocols, made
                  available to all.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:items-end">
              <a
                href="/tools"
                className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors inline-block h-fit"
              >
                Explore the tools →
              </a>
            </div>
          </motion.div>

          {/* Pillar 02 — Convene */}
          <motion.div
            variants={fadeInUp}
            className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          >
            <div className="lg:col-span-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
              Pillar 02 <br /> Convene
            </div>

            <div className="lg:col-span-6">
              <h3 className="font-serif text-4xl md:text-6xl mb-6">
                Gatherings and a standing cadence
              </h3>

              <div className="space-y-8 text-xl md:text-2xl leading-relaxed max-w-3xl">
                <p>
                  A community isn&apos;t a mailing list — it&apos;s a rhythm
                  people keep showing up for.
                </p>

                <div>
                  <p className="font-serif text-3xl mb-3">Physical events</p>
                  <p className="text-muted-foreground">
                    In-person gatherings where the work gets built, tested,
                    argued over, and demonstrated. Event formats will be
                    published as they are confirmed, with each gathering tied to
                    a clear purpose: building tools, reviewing standards,
                    testing consent flows, or sharing field learnings.
                  </p>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">
                    A fortnightly community call — plus hundreds of working
                    sessions
                  </p>
                  <p className="text-muted-foreground">
                    The fortnightly community call is the public front door.
                    Behind it sit team and focused working sessions — the engine
                    room where the tools and standards actually get made.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:items-end">
              <a
                href="/events"
                className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors inline-block h-fit"
              >
                View events →
              </a>
            </div>
          </motion.div>

          {/* Pillar 03 — Govern */}
          <motion.div
            variants={fadeInUp}
            className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          >
            <div className="lg:col-span-3 font-mono text-sm text-muted-foreground uppercase tracking-wider">
              Pillar 03 <br /> Govern
            </div>

            <div className="lg:col-span-6">
              <h3 className="font-serif text-4xl md:text-6xl mb-6">
                Open standards and consent protocols
              </h3>

              <div className="space-y-8 text-xl md:text-2xl leading-relaxed max-w-3xl">
                <p>
                  The rules that keep the tools honest — published, so others
                  can use them too.
                </p>

                <div>
                  <p className="font-serif text-3xl mb-3">Manifesto</p>
                  <p className="text-muted-foreground">
                    Our theory of change: AI should expand human agency,
                    creativity, and connection — not extract attention or
                    replace human judgment.
                  </p>
                  <button
                    type="button"
                    onClick={() => setManifestoOpen(true)}
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    Read the Manifesto →
                  </button>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">
                    EELP — the Ethical Experience Lab Protocol
                  </p>
                  <p className="text-muted-foreground">
                    A public draft protocol for consent, disclosure, data minimization,
                    human override, and community accountability in AI-mediated
                    experiences. Designed to be adopted without a legal team.
                    Draft framework in active development.
                  </p>
                  <a
                    href="/eelp"
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    View EELP →
                  </a>
                </div>

                <div>
                  <p className="font-serif text-3xl mb-3">Privacy Toolkit</p>
                  <p className="text-muted-foreground">
                    A practical, deployable consent-and-data-governance package
                    — the working instrument behind EELP. Built on a
                    consent-first Data Trust model that gives participants
                    control over how their stories, identity, and permissions
                    are used, stored, or deleted, designed before sensitive data
                    is collected rather than bolted on after. In design.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:items-end">
              <a
                href="/privacy-toolkit"
                className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors inline-block h-fit"
              >
                View Privacy Toolkit →
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Structure footer */}
        <div className="mt-20 pt-6 border-t border-border font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Playa AI operates under fiscal sponsorship by the{" "}
          <span className="text-foreground font-bold">
            Mystic Arts Foundation
          </span>{" "}
          — the legal and financial structure to receive funding and run
          programs while we formalize as an independent entity. Infrastructure,
          not theater.
        </div>
      </section>
      {/* 6. Manifesto pull-quote — "Born on the Playa" lives here, not in hero */}
      <section
        id="manifesto"
        className="bg-foreground text-background py-32 px-4"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-16 text-muted-foreground uppercase tracking-wider">
            Manifesto / A living ethic
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
              {/* "Born on the Playa" now lives here, not in the hero */}
              <h2 className="font-serif text-6xl md:text-8xl leading-none mb-12">
                Born on the Playa.
                <br />
                Gifted to the planet.
              </h2>
            </div>
            <div className="flex flex-col items-start justify-end">
              <p className="text-2xl md:text-3xl leading-relaxed mb-12 text-[#E2D9C5]">
                The cultural thesis still matters: AI should amplify human
                creativity, connection, and agency. But the public work must be
                sober enough to earn trust — consent first, data minimized,
                people in control, and learning shared back to the commons.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  type="button"
                  onClick={() => setManifestoOpen(true)}
                  className="font-mono text-sm uppercase tracking-wider border-b border-background pb-1 hover:text-[#E2D9C5] transition-colors inline-block"
                  data-testid="button-read-manifesto"
                >
                  Read Manifesto
                </button>
                {/* "Take the Pledge" moved here, away from hero */}
                <button
                  type="button"
                  onClick={() => setPledgeOpen(true)}
                  className="font-mono text-sm uppercase tracking-wider border-b border-[#6B6258] pb-1 hover:text-[#E2D9C5] hover:border-[#E2D9C5] transition-colors inline-block"
                  data-testid="button-take-pledge"
                >
                  Take the Pledge
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#6B6258] pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h3 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
              Consent is a precondition, <i className="italic">not</i> a
              checkbox.
              <br />
              <span className="text-[#E2D9C5]">
                Deletion is a right, not a support ticket.
              </span>
            </h3>
            <div className="font-mono text-xs uppercase tracking-wider text-[#6B6258]">
              Founding cultural text · Playa AI · Published 2026
            </div>
          </div>
        </div>
      </section>

      {/* 7. Current movement — proof block now uses plain-language traction statements */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 03 / Current movement
        </div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-24">
          Early work is real.
          <br />
          Some programs are still in formation.
        </h2>

        {/* Replaced acronym stats (EELP / MOU / MAF / 2026) with plain-language traction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {[
            {
              stat: "EELP",
              label: "Draft framework in active development",
            },
            {
              stat: "Adopters",
              label: "Founding Adopter pathway open",
            },
            {
              stat: "501(c)(3)",
              label: "Fiscal sponsorship structure in place",
            },
            {
              stat: "2026",
              label: "Year-One field report planned for publication",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="border-t border-border pt-6"
            >
              <div className="font-serif text-5xl md:text-6xl italic mb-4">
                {item.stat}
              </div>
              <div className="font-mono text-sm text-muted-foreground uppercase">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xl md:text-3xl max-w-4xl leading-relaxed mb-16">
          Playa AI is moving from salons, working sessions, and strategy into a
          public foundation layer: a draft standard, a governance model, pilot
          design, founding adopter conversations, and donor-ready Year-One
          infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary ring-1 ring-border">
              <img
                src={gatheringScreenImg}
                alt="Field gathering"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <MonoLabel>Field gathering · Community inquiry</MonoLabel>
            <p className="text-lg leading-snug">
              The standard begins with people in rooms asking what AI should be
              allowed to do around human stories, memory, identity, and trust.
            </p>
          </div>
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary ring-1 ring-border">
              <img
                src={salonDiscussionImg}
                alt="Salon documentation"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <MonoLabel>Salon documentation · Governance in practice</MonoLabel>
            <p className="text-lg leading-snug">
              The work turns dialogue into consent patterns, disclosure norms,
              field notes, and tools that other communities can test.
            </p>
          </div>
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary ring-1 ring-border">
              <img
                src={abstractArtImg}
                alt="Cultural context"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <MonoLabel>Cultural context · Art as field research</MonoLabel>
            <p className="text-lg leading-snug">
              Artists make AI governance tangible: visible, embodied,
              questionable, memorable, and accountable to the people it touches.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Team / stewardship block — NEW */}
      <section className="py-16 md:py-20 px-4 max-w-[1400px] mx-auto border-t border-border">
        <div className="font-mono text-sm mb-10 text-muted-foreground">
          § 03a / Stewardship
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Led by practitioners across art,
              <br />
              <i className="italic text-muted-foreground">
                technology, governance, and community.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
              Playa AI is led by Alex Azzi, with a growing working
              group of artists, technologists, researchers, community builders,
              and governance advisors. The initiative operates transparently:
              fiscal sponsorship through Mystic Arts Foundation, public
              documentation of all programs, and clear governance separation
              between charitable work and any future commercial implementation.
            </p>
            <a
              href="mailto:hello@playa-ai.org?subject=Playa%20AI%20Foundation%20%E2%80%94%20Introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors inline-block"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* 9. The Playa — origin lab + who the work is for, merged */}
      <section className="py-24 md:py-32 bg-secondary/30 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-12 text-muted-foreground">
            § 04 / Origin + reach
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">
                Born in the desert.
                <br />
                <i className="italic text-muted-foreground">
                  Built for everywhere else.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                The Playa is a temporary city-scale environment where
                creativity, decommodification, civic responsibility, and
                self-governance are practiced under pressure. That makes it a
                rigorous origin site for field research on consent and trust.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                Playa AI is independent of official Burning Man infrastructure.
                We use the conditions of the Playa to reveal what responsible AI
                actually requires in a real community — then publish those
                lessons so any institution can use them.
              </p>
            </div>
          </div>

          {/* Who the work is for */}
          <div className="font-mono text-sm mb-10 text-muted-foreground uppercase tracking-wider">
            Field-tested lessons should travel
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border"
          >
            {[
              {
                title: "Museums + cultural spaces",
                desc: "Responsible AI experiences that disclose what is happening and preserve visitor agency.",
              },
              {
                title: "Schools + learning communities",
                desc: "Facilitated tools for reflection, belonging, creativity, and AI literacy without hidden extraction.",
              },
              {
                title: "Community organizations",
                desc: "Connection-focused pilots that help people deepen offline trust and reduce social fragmentation.",
              },
              {
                title: "Research partners",
                desc: "Research-oriented field methods, clear consent layers, minimal data collection, and publishable learning.",
              },
              {
                title: "Artists + builders",
                desc: "Microgrants and clear guidelines for work that treats AI as a medium of participation, not manipulation.",
              },
              {
                title: "Public-interest tech",
                desc: "A reusable public framework for AI that prioritizes human agency over scale, optimization, or automation.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 md:p-10 border-b lg:border-b-0 lg:border-b-border [&:nth-child(-n+3)]:border-b border-r border-border last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                <p className="text-lg text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. Marquee credentials strip */}
      <section className="overflow-hidden border-y border-foreground bg-foreground text-background py-6">
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee font-mono text-lg uppercase tracking-widest flex items-center">
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <span key={idx} className="mx-4">
                  Consent-first · Human override · No hidden extraction · Open
                  standards · Field research · Fiscal sponsorship secured ·
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* 11. Three paths + What funding unlocks — merged for funder flow */}
      <section id="fund" className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 05 / Three paths
        </div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">
          Adopt. Fund. <i className="italic">Or build with us.</i>
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mb-24 text-muted-foreground">
          Different audiences need different doors. Playa AI is building a
          foundation layer for institutions, funders, artists, researchers, and
          community partners who want AI to serve human flourishing.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {audiencePaths.map((path, i) => (
            <div
              key={i}
              id={path.id}
              className={`border p-8 md:p-12 flex flex-col ${path.bg || "bg-background text-foreground border-border"}`}
            >
              <MonoLabel className="mb-16 opacity-70 text-current">
                {path.tag}
              </MonoLabel>
              <h3 className="font-serif text-4xl mb-6">{path.title}</h3>
              <p
                className={`text-lg leading-relaxed mb-16 ${path.bg ? "text-[#E2D9C5]" : "text-muted-foreground"}`}
              >
                {path.desc}
              </p>
              <a
                href={path.href}
                {...(path.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`mt-auto font-mono text-sm uppercase tracking-wider inline-block border-b pb-1 transition-colors w-fit ${path.bg ? "border-background hover:text-[#E2D9C5] hover:border-[#E2D9C5]" : "border-foreground hover:text-muted-foreground hover:border-muted-foreground"}`}
              >
                {path.link}
              </a>
            </div>
          ))}
        </div>

        {/* What funding unlocks — appended here to keep funder flow tight */}
        <div className="mt-20 -mx-4 bg-foreground text-background py-20 px-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="font-mono text-sm mb-10 text-[#6B6258] uppercase tracking-wider">
              What funding unlocks
            </div>
            <h3 className="font-serif text-4xl md:text-5xl leading-none mb-16 max-w-3xl">
              Year One turns principles into public infrastructure.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#6B6258]/30">
              {[
                "EELP draft publication",
                "Data Trust governance design",
                "Connect Protocol pilot design",
                "Artist microgrants",
                "Founding adopter support",
                "Impact / Field Report",
              ].map((title, i) => (
                <div
                  key={i}
                  className="p-8 border-b lg:border-b-0 [&:nth-child(-n+3)]:border-b border-r border-[#6B6258]/30 last:border-0 hover:bg-[#1a1816] transition-colors"
                >
                  <div className="font-mono text-sm text-[#6B6258] mb-8">
                    0{i + 1}
                  </div>
                  <h3 className="font-serif text-3xl">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Governance + legal structure */}
      <section className="py-24 px-4 max-w-[1400px] mx-auto border-t border-border">
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 06 / Governance + legal structure
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Credibility begins with honest status.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Playa AI is currently fiscally sponsored by Mystic Arts
              Foundation while developing independent governance and a future
              public charity pathway. Tax-deductible giving is available through
              Mystic Arts Foundation as permitted by law. The governance layer
              is being built with advisors, founding adopters, public
              documentation, and clear separation between charitable work and
              any future commercial implementation.
            </p>
            <a
              href="mailto:hello@playa-ai.org?subject=Donor%20Brief%20Request"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground transition-colors inline-block"
            >
              Request donor brief →
            </a>
          </div>
          <div className="flex flex-wrap items-center content-center gap-x-6 gap-y-4 font-serif text-2xl md:text-3xl leading-tight">
            <span>
              Fiscal sponsorship{" "}
              <span className="text-muted-foreground italic text-xl">
                Mystic Arts Foundation
              </span>
            </span>{" "}
            <span className="text-muted-foreground">·</span>
            <span>
              EELP{" "}
              <span className="text-muted-foreground italic text-xl">
                draft framework in development
              </span>
            </span>{" "}
            <span className="text-muted-foreground">·</span>
            <span>
              Data Trust{" "}
              <span className="text-muted-foreground italic text-xl">
                governance model in design
              </span>
            </span>{" "}
            <span className="text-muted-foreground">·</span>
            <span>
              Oracle{" "}
              <span className="text-muted-foreground italic text-xl">
                proposed reference concept, not operational
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* 13. Field Notes — labeled as forthcoming */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">
          § 07 / What we publish
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-7xl leading-none">
              Proof should be public.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every pilot will produce useful records: consent learnings, field
              notes, methods, failures, changes, and a public report that helps
              other communities build safer AI experiences. The following topics
              are forthcoming.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              tag: "Consent Architecture",
              date: "Forthcoming",
              title: "Why consent cannot be a checkbox in relational AI.",
              meta: "Plain-language consent · revocation · no-data paths",
            },
            {
              tag: "Methodology",
              date: "Forthcoming",
              title: "What a high-trust community can teach AI governance.",
              meta: "Field research · accountable learning · public reports",
            },
            {
              tag: "Relational AI",
              date: "Forthcoming",
              title:
                "AI that witnesses vs. AI that decides — and why the difference matters.",
              meta: "Human override · agency · dignity",
            },
          ].map((note, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group border-t border-border pt-6 flex flex-col h-full"
            >
              <div className="flex justify-between items-center font-mono text-xs uppercase tracking-wider text-muted-foreground mb-8">
                <span>{note.tag}</span>
                <span>{note.date}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-16 text-muted-foreground">
                {note.title}
              </h3>
              <div className="mt-auto font-mono text-xs text-muted-foreground">
                — {note.meta}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 14. Closing CTA */}
      <section className="py-32 px-4 max-w-[1400px] mx-auto border-t border-foreground text-center">
        <h2 className="font-serif text-6xl md:text-8xl leading-none max-w-5xl mx-auto mb-16">
          Help build the standard before human-centered AI becomes another
          slogan.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-sm uppercase">
          <a
            href="mailto:hello@playa-ai.org?subject=Donor%20Inquiry%20%E2%80%94%20Year%20One"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
          >
            Support Year One
          </a>
          <a
            href="mailto:hello@playa-ai.org?subject=Founding%20Adopter%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Become a Founding Adopter
          </a>
          <a
            href="mailto:hello@playa-ai.org?subject=Working%20Group%20Interest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            Join the Working Group
          </a>
          <button
            type="button"
            onClick={() => setManifestoOpen(true)}
            className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            Read Manifesto
          </button>
        </div>
      </section>

      {/* 15. Footer */}
      <SiteFooter
        contextLine="Spring 2026 · Black Rock Desert origin · Public-interest AI field lab · Independent of Burning Man organization"
        showBackLink={false}
      />

      <PledgeModal open={pledgeOpen} onClose={() => setPledgeOpen(false)} />
      <ManifestoDrawer
        open={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </main>
  );
}
