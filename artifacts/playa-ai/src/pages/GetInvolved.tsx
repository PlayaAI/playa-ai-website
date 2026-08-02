import { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import { ContinueExploring } from "@/components/ContinueExploring";
import { motion } from "framer-motion";

// ── Email endpoint ────────────────────────────────────────────────────────────
// Injected at build time from VITE_GET_INVOLVED_FORM_ENDPOINT.
// When absent or blank the form renders in an "unconfigured" state with a
// mailto fallback; no network request is made.
const ENDPOINT = (import.meta.env.VITE_GET_INVOLVED_FORM_ENDPOINT ?? "").trim();
const IS_CONFIGURED = ENDPOINT.length > 0;

// ── Participation paths ───────────────────────────────────────────────────────
const PATHS = [
  { value: "builders",     label: "Builders" },
  { value: "artists",      label: "Artists" },
  { value: "researchers",  label: "Researchers" },
  { value: "funders",      label: "Funders" },
  { value: "stewards",     label: "Cultural Stewards" },
  { value: "institutions", label: "Institutions" },
  { value: "general",      label: "General Participation" },
] as const;

type PathValue = typeof PATHS[number]["value"];

// ── Section content ───────────────────────────────────────────────────────────
const SECTIONS: {
  anchor: string;
  n: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  pathValue: PathValue;
}[] = [
  {
    anchor: "builders",
    n: "01",
    tag: "For Builders",
    title: "Build under a consent framework",
    body: "Playa AI is developing practical consent infrastructure for human-centered AI. If you build tools, platforms, or community systems that collect or act on participant data, share your relevant experience, join the working group, or propose a collaboration around what you're building.",
    cta: "Get started as a builder →",
    pathValue: "builders",
  },
  {
    anchor: "artists",
    n: "02",
    tag: "For Artists",
    title: "Shape responsible creative AI",
    body: "Artists and artist-technologist teams working at the intersection of creativity and human-centered AI are central to this initiative. Introduce yourself, contribute your perspective, or explore how your practice might intersect with consent-first AI design.",
    cta: "Introduce yourself →",
    pathValue: "artists",
  },
  {
    anchor: "researchers",
    n: "03",
    tag: "For Researchers",
    title: "Contribute rigorous field research",
    body: "Our field methods are designed with research in mind: clear consent layers, minimal data collection, and publishable learning. If you work in HCI, AI ethics, participatory research, or consent design, propose a collaboration or contribute perspective on what responsible field methods look like.",
    cta: "Propose a collaboration →",
    pathValue: "researchers",
  },
  {
    anchor: "funders",
    n: "04",
    tag: "For Funders",
    title: "Support the standards work",
    body: "Fund consent infrastructure, governance design, field experiments, documentation, and public field reporting. Explore what aligned support looks like for your philanthropic goals.",
    cta: "Explore aligned support →",
    pathValue: "funders",
  },
  {
    anchor: "stewards",
    n: "05",
    tag: "For Cultural Stewards",
    title: "Help shape responsible cultural practices",
    body: "Facilitators, community organizers, festival producers, and civic practitioners bring essential experience to how AI shows up in human spaces. Discuss a partnership, propose programming, or share how your community is navigating this terrain.",
    cta: "Start a conversation →",
    pathValue: "stewards",
  },
  {
    anchor: "institutions",
    n: "06",
    tag: "For Institutions",
    title: "Discuss an institutional collaboration",
    body: "Universities, museums, festivals, and civic AI teams can implement EELP consent standards in real community settings. The Founding Adopter pathway is open for institutions wanting to apply consent-first AI practices with their communities.",
    cta: "Discuss a collaboration →",
    pathValue: "institutions",
  },
  {
    anchor: "general",
    n: "07",
    tag: "General Participation",
    title: "Introduce yourself and your interests",
    body: "Not sure where you fit? Playa AI welcomes participation from anyone committed to human-centered AI — researchers, practitioners, skeptics, and curious observers alike. Introduce yourself and share what brought you here.",
    cta: "Say hello →",
    pathValue: "general",
  },
];

// ── Animation ─────────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ── Types ─────────────────────────────────────────────────────────────────────
type FormStatus = "idle" | "submitting" | "success" | "error";
interface Fields { name: string; email: string; org: string; message: string }
interface Errs {
  name?: string; email?: string; path?: string;
  org?: string; message?: string; consent?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function GetInvolved() {
  // Detect a valid hash on the very first render (before effects run).
  // Used to skip the hero entry animation so layout is stable immediately,
  // preventing Framer Motion's y:20→0 transform from shifting sections after scroll.
  const hasDirectHashNav =
    typeof window !== "undefined" &&
    PATHS.some((p) => p.value === window.location.hash.slice(1));

  const [selectedPath, setSelectedPath] = useState<PathValue | "">("");
  const [fields, setFields]   = useState<Fields>({ name: "", email: "", org: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors]   = useState<Errs>({});
  const [status, setStatus]   = useState<FormStatus>("idle");

  const formSectionRef  = useRef<HTMLElement>(null);
  const formRef         = useRef<HTMLFormElement>(null);
  const nameRef         = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // ── Direct hash navigation: preselect path + bounded stability-loop scroll ──
  //
  // Root cause of the production failure: the hero's `initial="hidden"
  // animate="visible"` animation fires after React hydration. Even though
  // Framer Motion uses CSS transforms (which don't affect document flow),
  // the browser's scroll-restoration and React's createRoot hydration can
  // reset scrollY before useEffect fires. We solve this in two layers:
  //
  //  1. hasDirectHashNav → hero starts at initial="visible" (no entry anim),
  //     so there is zero layout change after mount.
  //  2. Bounded RAF stability loop: keeps measuring the target's actual
  //     getBoundingClientRect().top and scrolls whenever it is outside the
  //     acceptable range, until the position is stable and correct or the
  //     2 000 ms budget is exhausted. This handles any residual browser
  //     scroll-restoration interference.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as PathValue;
    if (!PATHS.some((p) => p.value === hash)) return;

    // Preselect immediately — no visual delay on the dropdown
    setSelectedPath(hash);

    // Prevent the browser from fighting our scroll with its own restoration
    if (typeof history !== "undefined") history.scrollRestoration = "manual";

    const HEADER_OFFSET   = 80;  // matches scroll-mt-20 (5 rem = 80 px)
    const ACCEPT_MIN      = 70;  // target top ≥ 70 px below viewport top
    const ACCEPT_MAX      = 260; // target top ≤ 260 px below viewport top
    const MAX_MS          = 2000;
    const STABLE_FRAMES   = 4;   // consecutive frames within 1.5 px = settled
    const SCROLL_COOLDOWN = 350; // ms between scroll commands (avoid fighting smooth)

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId       = 0;
    let prevTop: number | null = null;
    let stableCount = 0;
    let lastScrollMs = -Infinity;
    const startMs = performance.now();

    function tick() {
      const el  = document.getElementById(hash);
      const now = performance.now();

      if (!el || now - startMs > MAX_MS) return;

      const top = el.getBoundingClientRect().top;

      // Track positional stability across frames
      if (prevTop !== null && Math.abs(top - prevTop) < 1.5) {
        stableCount++;
      } else {
        stableCount = 0;
      }
      prevTop = top;

      const inRange = top >= ACCEPT_MIN && top <= ACCEPT_MAX;
      const settled = stableCount >= STABLE_FRAMES;

      if (settled && inRange) return; // target is visible and stable — done

      // Only scroll once layout has settled (stable) and scroll cooldown passed
      if (settled && !inRange && now - lastScrollMs > SCROLL_COOLDOWN) {
        const targetY = Math.max(0, window.scrollY + top - HEADER_OFFSET);
        window.scrollTo({ top: targetY, behavior: prefersReduced ? "instant" : "smooth" });
        lastScrollMs = now;
        stableCount  = 0; // reset — position will change as scroll animates
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (typeof history !== "undefined") history.scrollRestoration = "auto";
    };
  }, []);

  // Handle hashchange events: back/forward navigation and jump-nav link clicks
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace("#", "") as PathValue;
      if (!PATHS.some((p) => p.value === hash)) return;
      setSelectedPath(hash);
      const el = document.getElementById(hash);
      if (!el) return;
      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function getPathLabel(v: string): string {
    return PATHS.find((p) => p.value === v)?.label ?? "General Inquiry";
  }

  function clearError(key: keyof Errs) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function updateField(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      clearError(key as keyof Errs);
    };
  }

  // Activate a participation path, scroll to the form, and focus the first field
  function selectPath(value: PathValue) {
    setSelectedPath(value);
    clearError("path");

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const formEl = formSectionRef.current;
    if (formEl) {
      formEl.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
    // Focus the name field after scrolling settles
    setTimeout(() => nameRef.current?.focus(), prefersReduced ? 0 : 500);
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): Errs {
    const e: Errs = {};
    const name  = fields.name.trim();
    const email = fields.email.trim();
    const msg   = fields.message.trim();

    if (!name) e.name = "Your name is required.";
    else if (fields.name.length > 120) e.name = "Name must be 120 characters or fewer.";

    if (!email) e.email = "Your email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address.";
    else if (fields.email.length > 254) e.email = "Email must be 254 characters or fewer.";

    if (!selectedPath) e.path = "Please select a participation path.";

    if (fields.org.length > 160) e.org = "Organization name must be 160 characters or fewer.";

    if (!msg) e.message = "A message is required.";
    else if (msg.length < 20) e.message = "Message must be at least 20 characters.";
    else if (fields.message.length > 2000) e.message = "Message must be 2,000 characters or fewer.";

    if (!consent) e.consent = "You must confirm this before submitting.";

    return e;
  }

  // ── Submission ──────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot: silently discard filled submissions (bot detection)
    if (honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Move focus to error summary so screen readers announce it
      setTimeout(() => errorSummaryRef.current?.focus(), 0);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const label = getPathLabel(selectedPath);
      const fd = new FormData();
      fd.append("name",               fields.name.trim());
      fd.append("email",              fields.email.trim());
      fd.append("participation_path", label);
      fd.append("organization",       fields.org.trim());
      fd.append("message",            fields.message.trim());
      fd.append("consent",            "yes");
      fd.append("_subject",           `Playa AI Get Involved — ${label}`);
      // Honeypot field for providers that support it (e.g. Formspree _gotcha)
      fd.append("_gotcha",            "");

      // Do NOT manually set Content-Type — let fetch set it with the FormData boundary
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      if (res.ok) {
        // Reset form only after confirmed successful delivery
        setStatus("success");
        setFields({ name: "", email: "", org: "", message: "" });
        setSelectedPath("");
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // ── Derived values ───────────────────────────────────────────────────────────
  const hasErrors       = Object.keys(errors).length > 0;
  const msgLength       = fields.message.length;
  const pathLabel       = getPathLabel(selectedPath || "general");
  const mailtoHref      = `mailto:team@playa-ai.org?subject=${encodeURIComponent(
    `Playa AI Get Involved — ${selectedPath ? pathLabel : "General Inquiry"}`
  )}`;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        active="get-involved"
        contextLine={
          <>
            <span>GET INVOLVED</span>
            <span>·</span>
            <span className="text-accent-gold">Seven participation paths</span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">
              Builders / Artists / Researchers / Funders / Stewards / Institutions
            </span>
          </>
        }
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        id="main-content"
        className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16"
      >
        <div className="hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>Get Involved · Playa AI · 2026</span>
          <span className="text-muted-foreground">
            Builders · Artists · Researchers · Funders · Stewards · Institutions
          </span>
        </div>

        <motion.div
          initial={hasDirectHashNav ? "visible" : "hidden"}
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-6"
          >
            Seven paths in
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight mb-8"
          >
            Participate in{" "}
            <i className="italic font-normal text-accent-gold">
              building human&#8209;centered AI.
            </i>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mb-5"
          >
            Playa AI is an early-stage, human-centered AI initiative. We are building with
            builders, artists, researchers, funders, cultural stewards, and institutions —
            not just for them. Choose the path closest to you and introduce yourself.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            No guaranteed outcomes · Open to inquiry · Early stage
          </motion.p>
        </motion.div>

        {/* In-page jump navigation */}
        <nav
          aria-label="Participation paths"
          className="mt-10 font-mono text-[11px] uppercase tracking-widest border-t border-border pt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.anchor}
              href={`#${s.anchor}`}
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1"
            >
              {s.n} {s.tag}
            </a>
          ))}
          <a
            href="#participation-form"
            className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 text-accent-gold"
          >
            → Send a message
          </a>
        </nav>
      </section>

      {/* ── Seven participation sections ──────────────────────────────────── */}
      <div className="hairline-y border-border">
        {SECTIONS.map((section, i) => (
          <section
            key={section.anchor}
            id={section.anchor}
            aria-labelledby={`${section.anchor}-heading`}
            className={`scroll-mt-20 px-4 max-w-[1400px] mx-auto py-12 md:py-20${
              i < SECTIONS.length - 1 ? " hairline-b border-border" : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Number */}
              <div
                className="hidden lg:block lg:col-span-1 font-serif text-5xl leading-none text-muted-foreground/20 select-none"
                aria-hidden="true"
              >
                {section.n}
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                  {section.tag}
                </p>
                <h2
                  id={`${section.anchor}-heading`}
                  className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight mb-5"
                >
                  {section.title}
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                  {section.body}
                </p>
              </div>

              {/* CTA */}
              <div className="lg:col-span-4 flex flex-col items-start gap-4 lg:pt-14">
                <button
                  type="button"
                  onClick={() => selectPath(section.pathValue)}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300 font-mono text-[11px] uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  {section.cta}
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="participation-form"
        ref={formSectionRef}
        className="px-4 max-w-[1400px] mx-auto py-16 md:py-24 hairline-t border-border"
        aria-labelledby="form-heading"
      >
        <MonoLabel className="mb-8">§ Get in touch</MonoLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <div className="lg:col-span-6">
            <h2
              id="form-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight"
            >
              Send us a message.{" "}
              <i className="italic font-normal text-accent-gold">
                We read every one.
              </i>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Your submission is processed through Formspree, delivered to Playa AI at{" "}
                <a
                  href="mailto:team@playa-ai.org"
                  className="text-foreground border-b border-current pb-0.5 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  team@playa-ai.org
                </a>
                , and available to authorized Playa AI administrators in the Formspree account.
                It will be used to respond to your inquiry. Please do not include sensitive
                personal information.
              </p>
              <p className="text-sm">
                For privacy or deletion questions related to this submission, email{" "}
                <a
                  href="mailto:team@playa-ai.org"
                  className="border-b border-current pb-0.5 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  team@playa-ai.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="max-w-2xl border border-border p-8 md:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-4">
              Message sent
            </p>
            <h3 className="font-serif text-3xl mb-4">Thank you — we'll be in touch.</h3>
            <p className="text-base leading-relaxed text-muted-foreground mb-6">
              Your message has been delivered. Playa AI is a small team, so responses may take
              a few days. We appreciate your patience.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              Send another message →
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Participation interest form"
            className="max-w-2xl space-y-8"
          >
            {/* Screen-reader live status */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {status === "submitting" && "Submitting your message, please wait."}
              {status === "error" &&
                "There was a problem sending your message. Please try again or use the email link."}
            </div>

            {/* Error summary */}
            {hasErrors && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="gi-error-heading"
                className="border border-border p-5 focus:outline-none"
              >
                <h3
                  id="gi-error-heading"
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                >
                  Please fix the following before submitting:
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  {errors.name    && <li>{errors.name}</li>}
                  {errors.email   && <li>{errors.email}</li>}
                  {errors.path    && <li>{errors.path}</li>}
                  {errors.org     && <li>{errors.org}</li>}
                  {errors.message && <li>{errors.message}</li>}
                  {errors.consent && <li>{errors.consent}</li>}
                </ul>
              </div>
            )}

            {/* Honeypot — hidden from real users; must remain empty */}
            <div
              className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="gi-website">Leave blank</label>
              <input
                id="gi-website"
                type="text"
                name="_website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="gi-name"
                className="block font-mono text-xs uppercase tracking-widest mb-2"
              >
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="gi-name"
                ref={nameRef}
                type="text"
                name="name"
                value={fields.name}
                onChange={updateField("name")}
                required
                maxLength={120}
                aria-required="true"
                aria-describedby={errors.name ? "gi-name-error" : undefined}
                aria-invalid={!!errors.name}
                className={`w-full bg-background border px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  errors.name ? "border-foreground" : "border-border"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="gi-name-error" role="alert" className="mt-1.5 text-sm font-mono">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="gi-email"
                className="block font-mono text-xs uppercase tracking-widest mb-2"
              >
                Email address <span aria-hidden="true">*</span>
              </label>
              <input
                id="gi-email"
                type="email"
                name="email"
                value={fields.email}
                onChange={updateField("email")}
                required
                maxLength={254}
                aria-required="true"
                aria-describedby={errors.email ? "gi-email-error" : undefined}
                aria-invalid={!!errors.email}
                className={`w-full bg-background border px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  errors.email ? "border-foreground" : "border-border"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="gi-email-error" role="alert" className="mt-1.5 text-sm font-mono">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Participation path */}
            <div>
              <label
                htmlFor="gi-path"
                className="block font-mono text-xs uppercase tracking-widest mb-2"
              >
                Participation path <span aria-hidden="true">*</span>
              </label>
              <p id="gi-path-desc" className="text-sm text-muted-foreground mb-2">
                Choose the option that best describes how you'd like to engage.
              </p>
              <select
                id="gi-path"
                name="participation_path"
                value={selectedPath}
                onChange={(e) => {
                  setSelectedPath(e.target.value as PathValue | "");
                  if (errors.path) clearError("path");
                }}
                required
                aria-required="true"
                aria-describedby={`gi-path-desc${errors.path ? " gi-path-error" : ""}`}
                aria-invalid={!!errors.path}
                className={`w-full bg-background border px-4 py-3 font-sans text-base text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground appearance-none cursor-pointer ${
                  errors.path ? "border-foreground" : "border-border"
                }`}
              >
                <option value="">Select a participation path…</option>
                {PATHS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.path && (
                <p id="gi-path-error" role="alert" className="mt-1.5 text-sm font-mono">
                  {errors.path}
                </p>
              )}
            </div>

            {/* Organization (optional) */}
            <div>
              <label
                htmlFor="gi-org"
                className="block font-mono text-xs uppercase tracking-widest mb-2"
              >
                Organization{" "}
                <span className="text-muted-foreground font-normal normal-case tracking-normal">
                  (optional)
                </span>
              </label>
              <input
                id="gi-org"
                type="text"
                name="organization"
                value={fields.org}
                onChange={updateField("org")}
                maxLength={160}
                aria-describedby={errors.org ? "gi-org-error" : "gi-org-desc"}
                aria-invalid={!!errors.org}
                className={`w-full bg-background border px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  errors.org ? "border-foreground" : "border-border"
                }`}
                placeholder="University, studio, company, community…"
              />
              <p id="gi-org-desc" className="mt-1.5 text-sm text-muted-foreground">
                Where you work, study, or create — if relevant.
              </p>
              {errors.org && (
                <p id="gi-org-error" role="alert" className="mt-0.5 text-sm font-mono">
                  {errors.org}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="gi-message"
                className="block font-mono text-xs uppercase tracking-widest mb-2"
              >
                Message <span aria-hidden="true">*</span>
              </label>
              <p id="gi-message-desc" className="text-sm text-muted-foreground mb-2">
                Tell us what brings you to Playa AI and what you hope to contribute, explore, or
                support. Minimum 20 characters.
              </p>
              <textarea
                id="gi-message"
                name="message"
                value={fields.message}
                onChange={updateField("message")}
                required
                minLength={20}
                maxLength={2000}
                rows={6}
                aria-required="true"
                aria-describedby={`gi-message-desc${errors.message ? " gi-message-error" : ""}`}
                aria-invalid={!!errors.message}
                className={`w-full bg-background border px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground resize-y min-h-[120px] ${
                  errors.message ? "border-foreground" : "border-border"
                }`}
                placeholder="What brings you to Playa AI? What would you like to explore, contribute, or support?"
              />
              <div className="flex justify-between items-start mt-1.5 gap-4">
                {errors.message ? (
                  <p id="gi-message-error" role="alert" className="text-sm font-mono">
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  aria-live="polite"
                  className={`text-xs font-mono shrink-0 ${
                    msgLength > 1800 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {msgLength}/2000
                </span>
              </div>
            </div>

            {/* Consent */}
            <div>
              <div
                className={`flex items-start gap-3 p-4 border ${
                  errors.consent ? "border-foreground" : "border-border"
                }`}
              >
                <input
                  id="gi-consent"
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) clearError("consent");
                  }}
                  required
                  aria-required="true"
                  aria-describedby={errors.consent ? "gi-consent-error" : undefined}
                  aria-invalid={!!errors.consent}
                  className="mt-0.5 w-4 h-4 shrink-0 border border-border bg-background checked:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 cursor-pointer"
                />
                <label
                  htmlFor="gi-consent"
                  className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                >
                  I understand that Playa AI may use this information to respond to my inquiry. I
                  will not submit sensitive personal information.
                </label>
              </div>
              {errors.consent && (
                <p id="gi-consent-error" role="alert" className="mt-1.5 text-sm font-mono">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Submit area — unconfigured OR configured states */}
            {!IS_CONFIGURED ? (
              /* Online submission unavailable — show honest state and mailto fallback */
              <div className="border border-border p-6 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Online submission temporarily unavailable
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  The submission form has not been configured yet. Please reach out directly by
                  email — the link below will pre-address your message with your selected path.
                </p>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors font-mono text-[11px] uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Email team@playa-ai.org →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Delivery error */}
                {status === "error" && (
                  <div role="alert" className="border border-border p-4 text-sm text-muted-foreground">
                    <strong className="font-mono uppercase tracking-widest text-xs block mb-2">
                      Delivery problem
                    </strong>
                    There was a problem sending your message. Your entered information has been
                    preserved. Please try again, or{" "}
                    <a
                      href={mailtoHref}
                      className="border-b border-current pb-0.5 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                    >
                      email us directly
                    </a>
                    .
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-disabled={status === "submitting"}
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors font-mono text-[11px] uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Send message →"}
                  </button>
                  <a
                    href={mailtoHref}
                    className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground border-b border-transparent hover:border-current pb-0.5"
                  >
                    Or email directly →
                  </a>
                </div>
              </div>
            )}
          </form>
        )}
      </section>

      <ContinueExploring
        links={[
          { label: "Explore all work", href: "/work" },
          { label: "Read the EELP protocol", href: "/eelp" },
        ]}
      />

      <SiteFooter
        contextLine="Get Involved · Playa AI · 2026"
        contentStatus="Website content reviewed July 2026."
      />
    </main>
  );
}
