import React, { useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // Save the element that opened the modal so focus can be restored on close
    triggerRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      // Restore focus to the element that triggered the modal
      triggerRef.current?.focus();
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
            ref={dialogRef}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pledge-modal-title"
            className="relative w-full max-w-2xl bg-background border border-foreground"
            data-testid="pledge-modal"
          >
            <div className="flex items-start justify-between hairline-b border-border px-8 py-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Founding Signatories / Public Commitment
                </div>
                <div
                  id="pledge-modal-title"
                  className="font-serif text-3xl md:text-4xl leading-none"
                >
                  The Pledge
                </div>
              </div>
              <button
                ref={closeButtonRef}
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
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Drafted Spring 2026 · Black Rock Desert origin
                </div>
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) setFullOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
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
  const fullBlocks = thousandIndex >= 0 ? blocks.slice(thousandIndex) : [];

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
            ref={drawerRef}
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
              ref={closeButtonRef}
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

// ─── Page data ────────────────────────────────────────────────────────────────

const OPERATING_MODEL = [
  {
    n: "01",
    title: "Convene",
    desc: "We design and host salons, workshops, hackathons, and civic gatherings where AI is explored through practice — not spectacle. The rooms are the product.",
    cta: "View events →",
    href: "/events",
  },
  {
    n: "02",
    title: "Build",
    desc: "Community members build tools under Playa AI's consent protocols — relational tools, purpose-discovery apps, and facilitation instruments that respect the people they serve.",
    cta: "Explore the work →",
    href: "/work",
  },
  {
    n: "03",
    title: "Fund",
    desc: "We are developing responsible ways to support artists, researchers, and builders working on human-centered AI experiences under EELP consent and disclosure guidelines. The Year-One microgrant program is in development, and the artist interest list is open.",
    cta: "Support Year One →",
    href: "mailto:hello@playa-ai.org?subject=Donor%20Inquiry",
  },
  {
    n: "04",
    title: "Publish",
    desc: "Each pilot is designed to produce public learning—such as field notes, consent patterns, methods, failures, and, where appropriate, a public field report that other communities can adapt.",
    cta: "Request field report updates →",
    href: "mailto:hello@playa-ai.org?subject=Field%20Report%20Notification",
  },
];

const INITIATIVES = [
  {
    n: "01",
    title: "Connect App",
    subtitle: "",
    body: "A non-extractive relational tool. AI-guided prompts move two people from digital interaction into face-to-face connection. Private by default — microphone access requires explicit permission.",
    status: "Live Pilot",
    cta: "Open Connect →",
    href: "https://connect.playai.party",
    external: true,
  },
  {
    n: "02",
    title: "Living Trust Framework",
    subtitle: "",
    body: "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences, intended for open-source release.",
    status: "Working Draft",
    cta: "Open the Living Trust Framework →",
    href: "/living-trust-framework",
  },
  {
    n: "03",
    title: "EELP",
    subtitle: "Ethical Experience Lab Protocol",
    body: "A public draft protocol for consent, disclosure, data minimization, and human override in AI-mediated experiences. Designed to be adopted without a legal team.",
    status: "Draft",
    cta: "Explore EELP →",
    href: "/eelp",
  },
  {
    n: "04",
    title: "Human Connection Research",
    subtitle: "JoyScore Experiment",
    body: "A global open-science project measuring how human connection drives flourishing. Playa AI's Connect app is its technology layer. Led by Tina Woods.",
    status: "Active",
    cta: "Join the research →",
    href: "mailto:hello@playa-ai.org?subject=Human%20Connection%20Research",
    external: true,
  },
  {
    n: "05",
    title: "Agent Labs",
    subtitle: "OpenClaw Hackathons",
    body: "Hands-on working sessions where participants build and run their own self-hosted AI agents. Participants work toward deploying a live agent on their own cloud server.",
    status: "Active",
    cta: "View events →",
    href: "/events",
  },
];

const PRINCIPLES = [
  {
    playa: "Radical Inclusion",
    ai: "Design AI that serves everyone — not just the optimized demographic. No community should be an edge case in an AI system.",
  },
  {
    playa: "Gifting",
    ai: "Open-source the standards. Share the learning publicly. The work becomes infrastructure when the lessons travel freely.",
  },
  {
    playa: "Decommodification",
    ai: "AI should not commodify human attention, identity, memory, or relationships. People are not data exhaust.",
  },
  {
    playa: "Participation",
    ai: "The community shapes what the AI becomes. Design is done with people, not for them — and the standard reflects what they actually need.",
  },
  {
    playa: "Leaving No Trace",
    ai: "Data minimization. Ephemeral by default, persistent only by consent. Deletion is a right, not a support ticket.",
  },
];

const MOMENTUM = [
  {
    stat: "9",
    label: "Public events",
    sublabel: "Across six cities + online · 2025–26",
    cta: "View archive →",
    href: "/events",
  },
  {
    stat: "80+",
    label: "Early participants",
    sublabel: "Across pilots and workshops",
    cta: "Explore the work →",
    href: "/work",
  },
  {
    stat: "EELP",
    label: "Draft framework active",
    sublabel: "Open standard in development",
    cta: null,
    href: null,
  },
  {
    stat: "Fiscal sponsor",
    label: "Fiscal sponsorship secured",
    sublabel: "Mystic Arts Foundation",
    cta: null,
    href: null,
  },
];

const PARTICIPATION = [
  {
    tag: "For Builders",
    title: "Build under a consent framework",
    desc: "Access the working group, EELP consent protocols, and community testing infrastructure. Build tools that respect the people they serve.",
    cta: "Join the working group →",
    href: "mailto:hello@playa-ai.org?subject=Working%20Group%20Interest",
    highlight: false,
  },
  {
    tag: "For Artists",
    title: "Year-One Microgrant Program",
    desc: "The Year-One microgrant program is in development, for artists and artist-technologist teams building responsible, human-centered AI experiences under EELP consent and disclosure guidelines.",
    cta: "Join the artist interest list →",
    href: "mailto:hello@playa-ai.org?subject=Artist%20Grant%20Interest",
    highlight: false,
  },
  {
    tag: "For Researchers",
    title: "Research-oriented field methods",
    desc: "Clear consent layers, minimal data collection, and publishable learning — designed to support rigorous collaborative research.",
    cta: "Propose a collaboration →",
    href: "mailto:hello@playa-ai.org?subject=Research%20Collaboration",
    highlight: false,
  },
  {
    tag: "For Funders",
    title: "Support Year One",
    desc: "Fund the standards work, governance design, Connect pilots, artist microgrants, documentation, and public field reporting. Tax-deductible giving through Mystic Arts Foundation.",
    cta: "Schedule donor conversation →",
    href: "mailto:hello@playa-ai.org?subject=Donor%20Inquiry",
    highlight: true,
  },
  {
    tag: "For Cultural Stewards",
    title: "Bring programming and partnerships",
    desc: "Help translate the connection between culture, community, and responsible AI. Bring events, programming, and field partnerships to the initiative.",
    cta: "Start the conversation →",
    href: "mailto:hello@playa-ai.org?subject=Cultural%20Stewardship",
    highlight: false,
  },
  {
    tag: "For Institutions",
    title: "Become a Founding Adopter",
    desc: "Universities, museums, festivals, civic AI teams. Test EELP in real community settings. The Founding Adopter pathway is open.",
    cta: "Request adopter conversation →",
    href: "mailto:hello@playa-ai.org?subject=Founding%20Adopter%20Inquiry",
    highlight: false,
  },
];

const TRUST_ITEMS = [
  {
    n: "01",
    title: "Fiscal sponsorship",
    body: "Fiscally sponsored by Mystic Arts Foundation, a U.S. 501(c)(3) public charity. Tax-deductible giving available. Infrastructure, not theater.",
  },
  {
    n: "02",
    title: "Consent-first design",
    body: "Consent is a precondition, not a checkbox. Playa AI tools are being reviewed against the developing EELP principles.",
  },
  {
    n: "03",
    title: "Data minimization",
    body: "We design toward collecting less: only what is needed, optional fields clearly marked, and unnecessary retention avoided.",
  },
  {
    n: "04",
    title: "Human override",
    body: "AI may guide, summarize, and reflect. People remain the final authority over identity, meaning, and action.",
  },
  {
    n: "05",
    title: "Public learning",
    body: "When field experiments teach something useful, the lesson becomes protocol, documentation, or public infrastructure others can reuse.",
  },
  {
    n: "06",
    title: "Transparent governance",
    body: "Clear separation between charitable work and any future commercial implementation. We aim to document programs publicly as they mature.",
  },
];

// ─── Home page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <main className="min-h-screen w-full font-sans text-foreground bg-background overflow-x-hidden selection:bg-foreground selection:text-background">
      <SiteHeader active="home" />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-6 pb-6 md:pt-10 md:pb-8 px-4 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] flex items-center overflow-visible">
        <div className="relative z-20 max-w-[760px] xl:max-w-[820px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] uppercase tracking-widest text-accent-gold mb-6"
            >
              Human-centered AI · Cultural infrastructure · Public interest
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-serif leading-[0.92] tracking-tight text-foreground mb-8"
            >
              <span className="block text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
                The next era of AI needs
                <br />
                more than intelligence.
              </span>
              <span className="block text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6rem] italic font-normal text-accent-gold">
                It needs culture.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base max-w-2xl leading-relaxed mb-6 text-muted-foreground"
            >
              Playa AI is a philanthropic initiative building cultural, ethical,
              and technical infrastructure for human-centered AI — bringing
              together builders, artists, researchers, funders, and community
              stewards to shape AI around creativity, consent, participation,
              and human flourishing.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-serif text-2xl md:text-3xl leading-snug mb-4 text-foreground"
            >
              Born on the Playa. Gifted to the Planet.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-8"
            >
              We convene. We build. We fund. We publish.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
            >
              <a
                href="#participate"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
                data-testid="link-join-initiative"
              >
                Join the initiative
              </a>
              <a
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                data-testid="link-explore-work"
              >
                Explore the work
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
              Playa AI is a human-centered AI initiative, part of Mystic Arts
              Foundation’s California 501(c)(3)
            </motion.p>
          </motion.div>
        </div>

        {/* Blueprint — desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.3,
          }}
          className="hidden lg:block absolute lg:left-[46%] lg:top-[48%] lg:w-[60vw] lg:max-w-[980px] xl:left-[43%] xl:top-[46%] xl:w-[66vw] xl:max-w-[1350px] 2xl:left-[38%] 2xl:top-[43%] 2xl:w-[70vw] 2xl:max-w-[1800px] -translate-y-1/2 pointer-events-none z-0"
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

        {/* Blueprint — mobile */}
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

      <div className="px-4 max-w-[1400px] mx-auto font-mono text-[11px] tracking-widest text-muted-foreground border-t border-border pt-4">
        BORN IN THE BLACK ROCK DESERT · BUILT FOR THE PUBLIC INTEREST ·
        INDEPENDENT OF BURNING MAN ORGANIZATION
      </div>

      {/* ── 2. Thesis ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto border-t border-border mt-8">
        <MonoLabel className="mb-8">§ 01 / The thesis</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight">
              AI is becoming part of{" "}
              <i className="italic font-normal text-accent-gold">
                human culture.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground">
              AI is already shaping how people create, remember, decide, relate,
              and imagine.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              That means culture has a stake in how AI is designed — and a
              responsibility to help shape it. Not after the fact. Not through
              protest. But through rigorous, creative, public-interest work that
              builds the values into the architecture before the systems scale.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Playa AI was founded on the conviction that the institutions best
              positioned to shape AI are the ones rooted in creativity, consent,
              and community — not the ones optimizing for growth.
            </p>
            <div className="border-t border-border pt-6">
              <button
                type="button"
                onClick={() => setManifestoOpen(true)}
                className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
              >
                Read the full manifesto →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Operating Model ──────────────────────────────────────────── */}
      <section
        id="standard"
        className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto border-t border-border"
      >
        <MonoLabel className="mb-8">§ 02 / Operating model</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              We convene. We build.
              <br />
              <i className="italic font-normal text-accent-gold">
                We fund. We publish.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <div className="space-y-4">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                Four jobs for a public-interest cultural AI lab. Each feeds the
                others. The standard only earns trust if it's tested in the
                field — and the field only produces learning if it's published
                openly.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Playa AI convenes communities, tests human-centered AI
                experiences, applies EELP and Living Trust safeguards, and
                publishes what the field teaches.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border"
        >
          {OPERATING_MODEL.map((item, i) => (
            <motion.div
              key={item.n}
              variants={fadeInUp}
              className={`p-8 md:p-10 flex flex-col hairline-b border-border ${
                i < 3 ? "lg:hairline-r" : ""
              } ${i < 2 ? "md:hairline-r lg:border-r-0" : ""} ${
                i === 1 ? "lg:hairline-r" : ""
              } ${i === 2 ? "lg:hairline-r" : ""}`}
            >
              <MonoLabel className="mb-6 text-muted-foreground">
                {item.n}
              </MonoLabel>
              <h3 className="font-serif text-4xl md:text-5xl leading-none mb-5">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground mb-8 flex-1">
                {item.desc}
              </p>
              <a
                href={item.href}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors w-fit mt-auto"
              >
                {item.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 4. Current Initiatives ──────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto border-t border-border">
        <MonoLabel className="mb-8">§ 03 / Current initiatives</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              What is being{" "}
              <i className="italic font-normal text-accent-gold">built now.</i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Early work is real. Some programs are still forming. None of this
              is a product catalog — it is a record of experiments in trust.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="divide-y divide-border border-y border-border"
        >
          {INITIATIVES.map((item) => (
            <motion.div
              key={item.n}
              variants={fadeInUp}
              className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
            >
              <div className="md:col-span-2 flex flex-col gap-3">
                <MonoLabel>{item.n}</MonoLabel>
                <span className="font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1 text-muted-foreground w-fit">
                  {item.status}
                </span>
              </div>
              <div className="md:col-span-10">
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {item.subtitle}
                  </div>
                )}
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-3xl">
                  {item.body}
                </p>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                >
                  {item.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 pt-6 border-t border-border">
          <a
            href="/work"
            className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            See all workstreams on the Work page →
          </a>
        </div>
      </section>

      {/* ── 5. Why the Playa ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-foreground text-background px-4">
        <div className="max-w-[1400px] mx-auto">
          <MonoLabel className="mb-8 text-background/50">
            § 04 / Origin
          </MonoLabel>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight">
                The Playa is a prototype for{" "}
                <i className="italic font-normal" style={{ color: "#C8A96E" }}>
                  another kind of civilization.
                </i>
              </h2>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center gap-6">
              <p className="text-xl md:text-2xl leading-relaxed text-[#E2D9C5]">
                For one week a year, Black Rock City becomes a temporary
                city-scale environment where participation, gifting,
                decommodification, creativity, civic responsibility,
                self-reliance, and leaving no trace are practiced under real
                pressure.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-background/70">
                That makes it a rigorous origin site for field research on what
                consent and trust actually require in a real community — not in
                theory, but when the stakes are human and immediate.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-background/70">
                What earns trust there becomes open protocol for large-scale
                gatherings, events, and civic life everywhere.
              </p>
              <div className="border-t border-[#6B6258] pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-background/40">
                  Inspired by the culture and principles of the Playa community.
                  Independent of Burning Man Organization.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#6B6258]/30">
            {[
              {
                img: gatheringScreenImg,
                label: "Field gathering · Community inquiry",
                body: "The standard begins with people in rooms asking what AI should be allowed to do around human stories, memory, identity, and trust.",
              },
              {
                img: salonDiscussionImg,
                label: "Salon documentation · Governance in practice",
                body: "The work turns dialogue into consent patterns, disclosure norms, field notes, and tools that other communities can test.",
              },
              {
                img: abstractArtImg,
                label: "Cultural context · Art as field research",
                body: "Artists make AI governance tangible: visible, embodied, questionable, memorable, and accountable to the people it touches.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#6B6258]/30" : ""}`}
              >
                <div className="aspect-[3/2] overflow-hidden bg-[#1a1816] mb-6">
                  <img
                    src={item.img}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover grayscale opacity-60"
                  />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-3">
                  {item.label}
                </div>
                <p className="text-base leading-snug text-[#E2D9C5]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Principles Into Systems ──────────────────────────────────── */}
      <section className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto border-b border-border">
        <MonoLabel className="mb-8">§ 05 / Principles into systems</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Culture becomes design when it changes{" "}
              <i className="italic font-normal text-accent-gold">
                what the system allows.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              The values that make the Playa extraordinary are not metaphors.
              They are design constraints — translated here into the principles
              that govern every tool and standard Playa AI produces.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="divide-y divide-border border-t border-border"
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start"
            >
              <div className="md:col-span-4">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {String(i + 1).padStart(2, "0")} / Playa principle
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-accent-gold">
                  {p.playa}
                </h3>
              </div>
              <div className="md:col-span-1 hidden md:flex items-center justify-center">
                <div className="text-muted-foreground text-xl">→</div>
              </div>
              <div className="md:col-span-7">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  AI design principle
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-foreground">
                  {p.ai}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 7. Proof of Momentum ────────────────────────────────────────── */}
      <section id="fund" className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto">
        <MonoLabel className="mb-8">§ 06 / Proof of momentum</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Already{" "}
              <i className="italic font-normal text-accent-gold">in motion.</i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A snapshot of early activity across public events, prototypes,
              workshops, and working frameworks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-border mb-16">
          {MOMENTUM.map((m) => (
            <div key={m.stat} className="px-6 py-10 flex flex-col">
              <MonoLabel className="mb-4">{m.label}</MonoLabel>
              <div className="font-serif italic text-5xl md:text-7xl leading-none mb-3">
                {m.stat}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 flex-1">
                {m.sublabel}
              </div>
              {m.cta && m.href && (
                <a
                  href={m.href}
                  className="font-mono text-[10px] uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors w-fit"
                >
                  {m.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a
            href="/events"
            className="group border-t border-border pt-6 flex flex-col hover:opacity-70 transition-opacity"
          >
            <MonoLabel className="mb-3">Events</MonoLabel>
            <p className="text-lg leading-snug mb-4">
              9 public events across Dubai, Detroit, Lisbon, Davos, New York,
              St. Moritz, and online — 2025 to 2026.
            </p>
            <span className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 w-fit mt-auto">
              View archive →
            </span>
          </a>
          <a
            href="/work"
            className="group border-t border-border pt-6 flex flex-col hover:opacity-70 transition-opacity"
          >
            <MonoLabel className="mb-3">Tools</MonoLabel>
            <p className="text-lg leading-snug mb-4">
              Connect App released. Ikigai App piloted in Miami. Agent Labs
              running monthly.
            </p>
            <span className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 w-fit mt-auto">
              Explore the work →
            </span>
          </a>
          <a
            href="/team"
            className="group border-t border-border pt-6 flex flex-col hover:opacity-70 transition-opacity"
          >
            <MonoLabel className="mb-3">Team &amp; governance</MonoLabel>
            <p className="text-lg leading-snug mb-4">
              Led by Alex Azzi, with a cross-disciplinary team and advisory
              council spanning AI, health, neuro, law, culture, and governance.
            </p>
            <span className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 w-fit mt-auto">
              Meet the team →
            </span>
          </a>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────────────── */}
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

      {/* ── 8. Participation Paths ──────────────────────────────────────── */}
      <section
        id="participate"
        className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto"
      >
        <MonoLabel className="mb-8">§ 07 / Who this is for</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              This is for the people shaping{" "}
              <i className="italic font-normal text-accent-gold">
                what AI becomes.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Different people need different doors. Playa AI is building a
              foundation layer for everyone who wants AI to serve human
              flourishing rather than extract it.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border"
        >
          {PARTICIPATION.map((path, i) => (
            <motion.div
              key={path.tag}
              variants={fadeInUp}
              className={`p-8 md:p-10 flex flex-col hairline-b border-border ${
                path.highlight
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground"
              } ${i % 3 !== 2 ? "lg:hairline-r" : ""} ${
                i % 2 === 0 ? "md:hairline-r lg:border-r-0" : ""
              } ${i % 3 === 0 || i % 3 === 1 ? "lg:hairline-r" : ""}`}
            >
              <div
                className={`font-mono text-[11px] uppercase tracking-widest mb-6 ${
                  path.highlight
                    ? "text-background/60"
                    : "text-muted-foreground"
                }`}
              >
                {path.tag}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-4 flex-none">
                {path.title}
              </h3>
              <p
                className={`text-base leading-relaxed mb-8 flex-1 ${
                  path.highlight ? "text-[#E2D9C5]" : "text-muted-foreground"
                }`}
              >
                {path.desc}
              </p>
              <a
                href={path.href}
                {...(path.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`font-mono text-xs uppercase tracking-widest border-b pb-0.5 transition-colors w-fit mt-auto ${
                  path.highlight
                    ? "border-background hover:text-[#E2D9C5] hover:border-[#E2D9C5]"
                    : "border-foreground hover:text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {path.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 9. Trust Layer ──────────────────────────────────────────────── */}
      <section
        id="trust"
        className="py-24 md:py-36 px-4 max-w-[1400px] mx-auto border-t border-border"
      >
        <MonoLabel className="mb-8">§ 08 / Why trust it</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              Built with responsibility{" "}
              <i className="italic font-normal text-accent-gold">
                from the beginning.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Credibility begins with honest status. These are not aspirations —
              they are operating conditions baked into every program we run.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border"
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.n}
              variants={fadeInUp}
              className={`p-8 md:p-10 hairline-b border-border ${
                i % 3 !== 2 ? "lg:hairline-r" : ""
              } ${i % 2 === 0 ? "md:hairline-r lg:border-r-0" : ""} ${
                i % 3 === 0 || i % 3 === 1 ? "lg:hairline-r" : ""
              }`}
            >
              <MonoLabel className="mb-5 text-muted-foreground">
                {item.n}
              </MonoLabel>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Legal structure
            </p>
            <p className="text-lg text-foreground">
              Playa AI is a philanthropic initiative fiscally sponsored by{" "}
              <span className="font-bold">Mystic Arts Foundation</span>, a U.S.
              501(c)(3) public charity.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Governance separation
            </p>
            <p className="text-lg text-foreground">
              Clear separation between charitable work and any future commercial
              implementation. We aim to publish program status and field
              learning as each workstream matures. The initiative is early-stage
              and clear about it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Manifesto pull-quote ────────────────────────────────────────── */}
      <section
        id="manifesto"
        className="bg-foreground text-background py-32 px-4"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-16 text-background/40 uppercase tracking-wider">
            Manifesto / A living ethic
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
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
                  className="font-mono text-sm uppercase tracking-wider border-b border-background pb-1 hover:text-[#E2D9C5] transition-colors"
                  data-testid="button-read-manifesto-2"
                >
                  Read Manifesto
                </button>
                <button
                  type="button"
                  onClick={() => setPledgeOpen(true)}
                  className="font-mono text-sm uppercase tracking-wider border-b border-[#6B6258] pb-1 hover:text-[#E2D9C5] hover:border-[#E2D9C5] transition-colors"
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

      {/* ── 10. Final CTA ───────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-32 md:py-40 px-4 max-w-[1400px] mx-auto border-t border-foreground text-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6"
          >
            This is the invitation
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight max-w-5xl mx-auto mb-12"
          >
            Will you help shape AI with{" "}
            <i className="italic font-normal text-accent-gold">human depth?</i>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            The standard needs to be built before human-centered AI becomes
            another slogan. That window is now.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 font-mono text-sm uppercase"
          >
            <a
              href="mailto:hello@playa-ai.org?subject=Join%20the%20Playa%20AI%20Initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300"
            >
              Join the initiative
            </a>
            <a
              href="mailto:hello@playa-ai.org?subject=Partner%20with%20Playa%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Partner with us
            </a>
            <button
              type="button"
              onClick={() => setManifestoOpen(true)}
              className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Read the Manifesto
            </button>
          </motion.div>
        </motion.div>
      </section>

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
