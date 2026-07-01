import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

type EventCard = {
  cover: string;
  date: string;
  city: string;
  title: string;
  pull: string;
  body: string;
  tags: string[];
  host: string;
  venue?: string;
  luma: string;
};

const events2026: EventCard[] = [
  {
    cover: "https://images.lumacdn.com/event-covers/sb/4e9e0880-232d-4634-a0b6-2608cc061984.jpg",
    date: "Mar 30, 2026 · 5:00 PM EDT",
    city: "New York",
    title: "Less Chat, More Do: A Playa AI Hackathon to Give Birth to Your Own Agentic AI Creature",
    pull: "A hands-on mini-hackathon where you'll leave with a PhD-level AI chief of staff living on your own cloud server.",
    body: "Hosted at The National Arts Club, the working session walked participants through OpenClaw setup, connecting tools, and real-time troubleshooting so everyone could leave with a live and secure agent.",
    tags: ["Sold out", "Approval required", "National Arts Club"],
    host: "The National Arts Club",
    venue: "15 Gramercy Park South",
    luma: "https://luma.com/swo49pu6",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/ep/7e0f45af-582c-4135-9df9-b2a2e7772a8e.png",
    date: "Mar 18, 2026 · 12:30 PM EDT",
    city: "Online",
    title: "Less Chat, More Do: A Playa AI Hackathon to Give Birth to Your Own Agentic AI Creature",
    pull: "The goal of this hackathon: everyone leaves with a live and secure agent.",
    body: "OpenClaw runs locally, connects to real tools such as email, calendar, Slack, WhatsApp, Telegram, and the file system, maintains memory across sessions, and executes tasks autonomously.",
    tags: ["Free", "Working session", "OpenClaw"],
    host: "Hosted by Playa AI",
    luma: "https://luma.com/9l14ff56",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/ep/7e0f45af-582c-4135-9df9-b2a2e7772a8e.png",
    date: "Mar 4, 2026 · 12:30 PM EST",
    city: "Online",
    title: "Less Chat, More Do: A Playa AI Hackathon to Give Birth to Your Own Agentic AI Creature",
    pull: "This is a working session. We'll walk through setup together, troubleshoot in real time.",
    body: "The session centered on leaving the age of Chat and entering the age of Do, with participants building toward an agent living on their own cloud server.",
    tags: ["Free", "Mini-hackathon", "Agentic AI"],
    host: "Hosted by Playa AI",
    luma: "https://luma.com/0zsak1dj",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/oo/49dc308a-7218-4b18-a4c8-344110850d78.png",
    date: "Feb 6, 2026 · 9:30 AM PST",
    city: "Online",
    title: "MOLTSTERMIND: When AI's stop chatting and start acting, what happens to your work — and to you?",
    pull: "We are leaving the age of CHAT and entering into the age of DO.",
    body: "A curated salon centered on OpenClaw, formerly Clawdbot/Moltbot, for people exploring personal AI agents, agency, trust, and human identity.",
    tags: ["Free", "Salon", "Agency"],
    host: "Hosted by Playa AI",
    luma: "https://luma.com/lyggjgba",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/wx/b1da1552-24ec-429b-825b-ef64300da39f.jpg",
    date: "Jan 26, 2026 · 5:30 PM CET",
    city: "Samedan",
    title: "St Moritz AI Spa Salon & Mastermind — Alpine Intelligence",
    pull: "Format: Warm water. Cold takes. Zero slides. Takeaway: One actionable insight per attendee.",
    body: "A post-polo AI mastermind in Mineralbad & Spa Samedan, where historic mineral waters, modern architecture, and mountain stillness framed deep conversation.",
    tags: ["Free", "Mastermind", "Alpine intelligence"],
    host: "Mineralbad & Spa Samedan",
    venue: "Switzerland",
    luma: "https://luma.com/ax3dthl9",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/ui/8d0f4b64-428f-451c-bd8a-ee13912654ab.png",
    date: "Jan 23, 2026 · 3:00 PM CET",
    city: "Davos",
    title: "Apres-Davos apres-ski spa + optional workout @ Hard Rock",
    pull: "Unwind & Connect: A Relaxing Spa Social.",
    body: "A stress-free gathering at the Hard Rock Spa in Davos with exclusive treatments, light meaningful conversation, and optional workout, massage, and dinner.",
    tags: ["Approval required", "Spa social", "Davos"],
    host: "Hosted by XRWorkout",
    luma: "https://luma.com/5vglk4dv",
  },
];

const events2025: EventCard[] = [
  {
    cover: "https://images.lumacdn.com/event-covers/4g/2fc055a7-9e14-4e70-aa27-08e6d5be4f74.jpg",
    date: "Nov 13, 2025 · 5:30 PM WET",
    city: "Lisbon",
    title: "The Playa AI Foundation | Dust to Data: Codifying the Essence of Humanity in the Age of AI.",
    pull: "This gathering marks our European launch — a civic, cultural, and scientific movement dedicated to aligning artificial intelligence with the best of humanity.",
    body: "With roots in Black Rock City, the fundraiser asked how AI can amplify human dignity, imagination, and connection rather than train on humanity's digital exhaust.",
    tags: ["Sold out", "Fundraiser", "European launch"],
    host: "Hosted by XRWorkout, PLAYA AI, Rebecca, Maria Velkova, Octavio Valente",
    luma: "https://luma.com/uyrafi6e",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/07/7121d6e0-d9c2-45e4-b5e1-de7021e3a2a9.png",
    date: "Jun 4, 2025 · 8:00 PM EDT",
    city: "Detroit",
    title: "AI Pre-Game: Connect Before the Chaos @ Summit Detroit",
    pull: "Before the Summit machine starts spinning, join a select group of AI-curious minds to build an AI nucleus for the event.",
    body: "Rebecca Nelson and Alex Azzi shared the Playa AI Initiative: an experiment in bringing AI into the Burning Man community consciously, creatively, and with deep integrity.",
    tags: ["Free", "Summit Detroit", "Community nucleus"],
    host: "The Vinyl Society, Detroit",
    luma: "https://luma.com/91470wk1",
  },
  {
    cover: "https://images.lumacdn.com/event-covers/26/eda7522a-723f-439d-af52-38a60d456b5a.png",
    date: "Mar 29, 2025 · 4:00 PM GST",
    city: "Dubai",
    title: "dubAI Mastermind & beach sunset",
    pull: "This is not your typical tech meetup — it's a sunset gathering of brilliant minds, right on the beach.",
    body: "Hosted by Briar Prestidge and Alex Azzi, the curated evening mixed AI use cases, goals, challenges, and an open-mic roundtable on what participants were building.",
    tags: ["Approval required", "Mastermind", "Beach sunset"],
    host: "Dubai, United Arab Emirates",
    luma: "https://luma.com/2xz9207r",
  },
];

const FORMATS = [
  { n: "01", title: "Curated salons", body: "High-signal circles for agency, trust, identity, and the social consequences of agentic AI." },
  { n: "02", title: "Working sessions", body: "Mini-hackathons that get people from concept to working agent, with setup and troubleshooting in the room." },
  { n: "03", title: "Embodied masterminds", body: "Spa, beach, and mountain settings for relaxation, connection, and sharper conversation." },
  { n: "04", title: "Civic launches", body: "Gatherings that frame Playa AI as a cultural, scientific, and public-interest movement." },
];

function EventBlock({ e, index }: { e: EventCard; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 hairline-t border-border pt-12 md:pt-16"
      data-testid={`event-card-${index}`}
    >
      <div className="md:col-span-5">
        <div className="aspect-[4/3] overflow-hidden bg-secondary ring-1 ring-border">
          <img
            src={e.cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
      <div className="md:col-span-7 flex flex-col">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 flex flex-wrap gap-x-6 gap-y-2">
          <span>{e.date}</span>
          <span className="text-accent-gold">· {e.city}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-5xl leading-[0.95] mb-6 text-foreground">
          {e.title}
        </h3>
        <p className="font-serif italic text-lg md:text-xl leading-snug text-accent-gold mb-5 max-w-xl">
          "{e.pull}"
        </p>
        <p className="text-base md:text-lg leading-relaxed text-foreground mb-6 max-w-2xl">
          {e.body}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {e.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] uppercase tracking-widest border border-border px-3 py-1.5 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto hairline-t border-border pt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {e.host}{e.venue ? ` · ${e.venue}` : ""}
          </div>
          <a
            href={e.luma}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${e.title} on Luma (opens in new tab)`}
            className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            data-testid={`link-luma-${index}`}
          >
            View on Luma →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        active="events"
        contextLine={
          <>
            <span>Public event archive</span>
            <span>·</span>
            <span className="text-accent-gold">Salons / Hackathons / Field gatherings</span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">Updated continuously</span>
          </>
        }
      />

      {/* Intro */}
      <section className="px-4 max-w-[1400px] mx-auto pt-12 md:pt-16 pb-10 md:pb-14">
        <div className="hairline-b border-border pb-5 mb-10 md:mb-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>Public event archive</span>
          <span className="text-muted-foreground">Salons / Hackathons / Fundraisers / Field gatherings</span>
        </div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight max-w-[900px] mb-8"
        >
          Rooms where AI <i className="italic font-normal text-accent-gold">stops chatting</i> and starts doing.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-base md:text-lg leading-relaxed max-w-2xl text-foreground"
        >
          Playa AI events are live laboratories for builders, founders, researchers, artists, and operators exploring human-AI co-evolution with intention. The archive below uses the real public descriptions from the Luma pages.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { label: "Unique events", value: "9" },
            { label: "Locations", value: "7" },
            { label: "Years", value: "2025–26" },
            { label: "Core formats", value: "4" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-10">
              <MonoLabel className="mb-4">{s.label}</MonoLabel>
              <div className="font-serif italic text-5xl md:text-7xl leading-none">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 archive */}
      <section className="px-4 max-w-[1400px] mx-auto pt-20 md:pt-32 pb-16">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">2026 archive</div>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8 max-w-4xl">
          Agentic AI, alpine intelligence, and post-Davos recovery.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-muted-foreground mb-16 md:mb-24">
          The 2026 run moved between online working sessions, The National Arts Club, Davos, and St. Moritz.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="space-y-16 md:space-y-24"
        >
          {events2026.map((e, i) => (
            <EventBlock key={i} e={e} index={i} />
          ))}
        </motion.div>
      </section>

      {/* 2025 archive */}
      <section className="px-4 max-w-[1400px] mx-auto pt-20 md:pt-32 pb-16">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">2025 archive</div>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8 max-w-4xl">
          From Dubai beach circles to Detroit nuclei to Lisbon launch.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-muted-foreground mb-8">
          These gatherings show the Foundation's field pattern: curated rooms, real human stakes, and AI discussed through practice rather than spectacle.
        </p>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-muted-foreground mb-16 md:mb-24">
          These early gatherings — Dubai, Detroit, Lisbon — established Playa AI's field pattern and generated the questions that now shape the EELP framework and Connect protocol.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="space-y-16 md:space-y-24"
        >
          {events2025.map((e, i) => (
            <EventBlock key={i} e={e} index={i + 100} />
          ))}
        </motion.div>
      </section>

      {/* Event grammar */}
      <section className="px-4 max-w-[1400px] mx-auto pt-20 md:pt-32 pb-16">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Event grammar</div>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-12 max-w-3xl">
          The rooms are the product.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-foreground mb-16 md:mb-20">
          Across the Luma archive, Playa AI repeatedly uses four formats: intimate salons, hands-on technical sessions, embodied recovery rooms, and civic-cultural launch gatherings.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 hairline-t border-border"
        >
          {FORMATS.map((f, i) => (
            <motion.div
              key={f.n}
              variants={fadeInUp}
              className={`p-8 md:p-12 hairline-b border-border ${i % 2 === 0 ? "md:hairline-r" : ""}`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">{f.n}</div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-4">{f.title}</h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground max-w-md">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Closing */}
      <section className="px-4 max-w-[1400px] mx-auto pt-24 md:pt-40 pb-24 md:pb-32 hairline-t border-border mt-16">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-12 max-w-5xl">
          The archive grows. <i className="italic font-normal">The next room is already forming.</i>
        </h2>
        <a
          href="mailto:hello@playa-ai.org?subject=Events — Propose or Partner"
          className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground font-mono text-sm uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
          data-testid="link-share-event"
        >
          Propose or partner on a gathering →
        </a>
      </section>

      <SiteFooter contextLine="Public event archive · Updated continuously" />
    </main>
  );
}
