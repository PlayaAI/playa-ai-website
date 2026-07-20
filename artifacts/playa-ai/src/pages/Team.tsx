import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MonoLabel } from "@/components/MonoLabel";
import alexAzziPortrait from "@assets/image_1778692884554.png";
import tinaWoodsPortrait from "@assets/tina-woods.jpg";
import richardRothenbergPortrait from "@assets/image_1778693180155.png";
import jennaSeidenPortrait from "@assets/image_1778693297348.png";
import davidRockPortrait from "@assets/image_1778693303199.png";
import alvinGraylinPortrait from "@assets/image_1778693315898.png";
import robGriffittsPortrait from "@assets/image_1778693321677.png";

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

const LEADERSHIP = [
  {
    n: "001",
    role: "Founder",
    name: "Alex Azzi",
    title: "Founder & Executive Director",
    photo: alexAzziPortrait,
    lines: ["Holds the vision.", "Tends the flame."],
  },
  {
    n: "002",
    role: "Research",
    name: "Tina Woods",
    title: "Head of Research",
    photo: tinaWoodsPortrait,
    lines: ["Science & Research."],
  },
  {
    n: "003",
    role: "Community",
    name: "Rebecca Nelson",
    title: "Director",
    photo:
      "https://playaai.github.io/Playa-AI/team-page-assets/rebecca-nelson.jpg",
    lines: ["Community & Comms."],
  },
  {
    n: "004",
    role: "Programs",
    name: "Raed Marji",
    title: "CTO",
    photo: "https://playaai.github.io/Playa-AI/team-page-assets/raed-marji.jpg",
    lines: ["Programs & Operations."],
  },
];

const CHARTER = [
  "The Leadership Council is advisory only.",
  "Council members provide perspective, expertise, and strategic input.",
  "Council members have no governance authority.",
  "Council members have no power to bind Playa AI or its fiscal sponsor.",
  "Council members have no fiduciary duties.",
  "Council members have no signing authority.",
];

type Council = {
  ref: string;
  first: string;
  last: string;
  role: string;
  photo?: string;
};

const COUNCIL: Council[] = [
  {
    ref: "A·002",
    first: "Richard",
    last: "Rothenberg",
    role: "Senior AI Advisor",
    photo: richardRothenbergPortrait,
  },
  {
    ref: "A·003",
    first: "Jenna",
    last: "Seiden",
    role: "Strategic Guardian",
    photo: jennaSeidenPortrait,
  },
  {
    ref: "A·004",
    first: "Dr. David",
    last: "Rock",
    role: "Head of Neuro",
    photo: davidRockPortrait,
  },
  {
    ref: "A·005",
    first: "Alvin",
    last: "Wang Graylin",
    photo: alvinGraylinPortrait,
    role: "Senior AI Advisor",
  },
  {
    ref: "A·006",
    first: "Rob",
    last: "Griffitts",
    photo: robGriffittsPortrait,
    role: "Legal & Policy",
  },
  {
    ref: "A·007",
    first: "Timothy",
    last: "Johnson",
    role: "Ethics & Principles",
  },
];

type RadialNode = {
  name: string;
  role: string;
  ring: "center" | "leadership" | "council";
  angle: number;
};

const RADIAL: RadialNode[] = [
  {
    name: "Alex Azzi",
    role: "Founder & Executive Director",
    ring: "center",
    angle: 0,
  },
  {
    name: "Tina Woods",
    role: "Head of Research",
    ring: "leadership",
    angle: 210,
  },
  { name: "Rebecca Nelson", role: "Director", ring: "leadership", angle: 270 },
  {
    name: "Raed Marji",
    role: "Chief Technology Officer",
    ring: "leadership",
    angle: 330,
  },
  {
    name: "Timothy Johnson",
    role: "Ethics & Principles",
    ring: "council",
    angle: 200,
  },
  { name: "Dr David Rock", role: "Head of Neuro", ring: "council", angle: 270 },
  {
    name: "Jenna Seiden",
    role: "Strategic Guardian",
    ring: "council",
    angle: 340,
  },
  {
    name: "Alvin Graylin",
    role: "Senior AI Advisor",
    ring: "council",
    angle: 160,
  },
  {
    name: "Richard Rothenberg",
    role: "Senior AI Advisor",
    ring: "council",
    angle: 90,
  },
  { name: "Rob Griffitts", role: "Legal Lead", ring: "council", angle: 20 },
];

function RadialMap() {
  const size = 560;
  const center = size / 2;
  const leadershipR = 130;
  const councilR = 230;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" role="img" aria-label="Playa AI team and advisory council structure">
      {/* Outer frame */}
      <rect
        x="2"
        y="2"
        width={size - 4}
        height={size - 4}
        fill="none"
        stroke="#0E0D0B"
        strokeWidth="1"
        opacity="0.25"
      />
      <rect
        x="14"
        y="14"
        width={size - 28}
        height={size - 28}
        fill="none"
        stroke="#0E0D0B"
        strokeWidth="1"
        opacity="0.15"
      />

      {/* Concentric rings */}
      <circle
        cx={center}
        cy={center}
        r={leadershipR}
        fill="none"
        stroke="#0E0D0B"
        strokeWidth="0.5"
        opacity="0.18"
      />
      <circle
        cx={center}
        cy={center}
        r={councilR}
        fill="none"
        stroke="#0E0D0B"
        strokeWidth="0.5"
        opacity="0.18"
      />
      <circle
        cx={center}
        cy={center}
        r={leadershipR + (councilR - leadershipR) / 2}
        fill="none"
        stroke="#0E0D0B"
        strokeWidth="0.5"
        opacity="0.08"
        strokeDasharray="2 4"
      />

      {/* Cross lines */}
      <line
        x1={center}
        y1="20"
        x2={center}
        y2={size - 20}
        stroke="#0E0D0B"
        strokeWidth="0.5"
        opacity="0.08"
      />
      <line
        x1="20"
        y1={center}
        x2={size - 20}
        y2={center}
        stroke="#0E0D0B"
        strokeWidth="0.5"
        opacity="0.08"
      />

      {/* Sun mark above Alex */}
      <g transform={`translate(${center}, ${center - 70})`}>
        <circle r="9" className="fill-accent-gold" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={Math.cos((a * Math.PI) / 180) * 14}
            y1={Math.sin((a * Math.PI) / 180) * 14}
            x2={Math.cos((a * Math.PI) / 180) * 22}
            y2={Math.sin((a * Math.PI) / 180) * 22}
            className="stroke-accent-gold"
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* Center label: Alex Azzi */}
      <text
        x={center}
        y={center - 6}
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontFamily: "'Instrument Serif', serif", fontSize: "30px" }}
      >
        Alex Azzi
      </text>
      <text
        x={center}
        y={center + 18}
        textAnchor="middle"
        className="fill-foreground"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "8px",
          letterSpacing: "0.18em",
        }}
      >
        FOUNDER & EXECUTIVE DIRECTOR
      </text>

      {/* Ring labels */}
      <text
        x={center}
        y={center - leadershipR + 8}
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "8px",
          letterSpacing: "0.22em",
        }}
      >
        — LEADERSHIP —
      </text>
      <text
        x={center}
        y={center - councilR + 8}
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "8px",
          letterSpacing: "0.22em",
        }}
      >
        — ADVISORY COUNCIL —
      </text>

      {/* Nodes */}
      {RADIAL.filter((n) => n.ring !== "center").map((n) => {
        const r = n.ring === "leadership" ? leadershipR : councilR;
        const rad = ((n.angle - 90) * Math.PI) / 180;
        const x = center + Math.cos(rad) * r;
        const y = center + Math.sin(rad) * r;
        const labelOffset = n.ring === "leadership" ? 30 : 30;
        const ly = y + labelOffset;
        return (
          <g key={n.name}>
            <circle cx={x} cy={y} r="2.5" fill="#0E0D0B" />
            <text
              x={x}
              y={ly}
              textAnchor="middle"
              className="fill-foreground"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "16px",
              }}
            >
              {n.name}
            </text>
            <text
              x={x}
              y={ly + 14}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "7px",
                letterSpacing: "0.2em",
              }}
            >
              {n.role.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Bottom dot */}
      <circle cx={center} cy={size - 22} r="2" className="fill-accent-gold" />
    </svg>
  );
}

function PortraitFallback({ name }: { name: string }) {
  const initials = name
    .replace(/^Dr\.\s+/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary">
      <span className="font-serif italic text-5xl text-foreground/40">
        {initials}
      </span>
    </div>
  );
}

export default function Teams() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        active="team"
        contextLine={
          <>
            <span>A field guide · Edition 01 · 2026</span>
            <span className="hidden md:inline">·</span>
            <a
              href="#leadership"
              className="hidden md:inline hover:text-foreground transition-colors"
            >
              Leadership
            </a>
            <span className="hidden md:inline">·</span>
            <a
              href="#council"
              className="hidden md:inline hover:text-foreground transition-colors"
            >
              Council
            </a>
          </>
        }
      />

      {/* Field guide intro */}
      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-32 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-foreground"></div>
              <MonoLabel>A field guide · Edition 01 · 2026</MonoLabel>
            </div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight max-w-[14ch]"
            >
              The people building human-centered AI on, and off, the{" "}
              <i className="italic font-normal text-accent-gold">playa</i>
            </motion.h1>

          </div>

          {/* Radial council map */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hairline-y hairline-x border-border p-6 md:p-10 bg-secondary/40 relative"
              data-testid="radial-map"
            >
              <RadialMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inner Camp / Leadership */}
      <section id="leadership" className="hairline-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-24">
          <div className="hairline-b border-border pb-6 mb-12 md:mb-20 flex flex-wrap items-end justify-between gap-4">
            <div>
              <MonoLabel>[ 01 / Inner Camp ]</MonoLabel>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mt-4">
                Leadership
              </h2>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground max-w-xs">
              Operational core. Sets direction. Carries fiduciary duty.
            </div>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mb-12 md:mb-16">
            Playa AI is built and led by a cross-disciplinary team connecting AI, culture, community, and governance. This is the operational core.
          </p>

          {/* Founder hero row */}
          {(() => {
            const alex = LEADERSHIP[0];
            return (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="hairline-t hairline-b border-border py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                data-testid={`leadership-${alex.n}`}
              >
                <div className="md:col-span-3 flex md:justify-start justify-center">
                  <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden bg-secondary ring-1 ring-border">
                    {alex.photo ? (
                      <img
                        src={alex.photo}
                        alt={alex.name}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale"
                      />
                    ) : (
                      <PortraitFallback name={alex.name} />
                    )}
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {alex.n} · {alex.role}
                  </div>
                  <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-4">
                    {alex.name}
                  </h3>
                  <div className="font-serif italic text-xl md:text-2xl lg:text-3xl text-muted-foreground">
                    {alex.title}
                  </div>
                </div>
                <div className="md:col-span-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:text-right space-y-1">
                  {alex.lines.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              </motion.div>
            );
          })()}

          {/* Other leaders */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 hairline-b border-border"
          >
            {LEADERSHIP.slice(1).map((m) => (
              <motion.div
                key={m.n}
                variants={fadeInUp}
                className="md:hairline-r last:md:border-r-0 hairline-b md:border-b-0 border-border p-8 md:p-12 flex flex-col items-center text-center"
                data-testid={`leadership-${m.n}`}
              >
                <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] mb-8 rounded-full overflow-hidden bg-secondary ring-1 ring-border">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <PortraitFallback name={m.name} />
                  )}
                </div>
                <MonoLabel className="mb-4">
                  {m.n} · {m.role}
                </MonoLabel>
                <h3 className="font-serif text-3xl md:text-4xl leading-[0.95] mb-3">
                  {m.name}
                </h3>
                <div className="font-serif italic text-base md:text-lg text-accent-gold mb-5">
                  {m.title}
                </div>
                <ul className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground space-y-1 mt-auto">
                  {(m.lines ?? []).map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Council Fire heading + Charter */}
      <section id="council" className="bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[#A7A39A] mb-6">
                [ 02 / Council Fire ]
              </div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.92]">
                The Playa AI <i className="italic font-normal">Council</i>.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <h3 className="font-serif italic text-2xl md:text-3xl mb-8 text-[#E2D9C5]">
                Council Charter & Terms of Reference
              </h3>
              <ul className="space-y-4 mb-10">
                {CHARTER.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-base md:text-lg leading-snug text-[#E2D9C5]"
                  >
                    <span className="font-mono text-xs text-[#A7A39A] pt-1.5 shrink-0 w-10">
                      § {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm md:text-base leading-relaxed text-[#A7A39A] max-w-2xl border-t border-[#3a342f] pt-6">
                Service on the Council does not constitute legal services to
                Playa AI. It does not create an attorney-client
                relationship. It is not privileged. Playa AI retains
                independent counsel for legal matters. Materials
                should not refer to Rob Griffitts as "counsel," "general
                counsel," or Playa AI's lawyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Council members grid */}
      <section className="px-4 max-w-[1400px] mx-auto py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 hairline-b border-border"
        >
          {COUNCIL.map((c) => (
            <motion.div
              key={c.ref}
              variants={fadeInUp}
              className="md:hairline-r last:md:border-r-0 hairline-b md:border-b-0 border-border p-8 md:p-10 flex flex-col items-center text-center"
              data-testid={`council-${c.ref}`}
            >
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-6 rounded-full overflow-hidden bg-secondary ring-1 ring-border">
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt={`${c.first} ${c.last}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <PortraitFallback name={`${c.first} ${c.last}`} />
                )}
              </div>
              <MonoLabel className="mb-3">{c.ref} · Council</MonoLabel>
              <h3 className="font-serif text-xl md:text-2xl leading-[0.95] mb-2">
                {c.first}{" "}
                <i className="italic font-normal text-accent-gold">{c.last}</i>
              </h3>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-auto pt-2">
                {c.role}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Closing quote */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-24 md:py-40 text-center">
          <blockquote className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-5xl mx-auto">
            "We meet on the playa, and we meet in the cloud.{" "}
            <i className="italic font-normal">Same rules apply.</i>"
          </blockquote>
          <div className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            — Founding principle, Playa AI
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hairline-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-24">
          <div className="border border-border p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <MonoLabel className="mb-4">Get involved</MonoLabel>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Bring your expertise to the work.
              </h2>
            </div>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@playa-ai.org&su=Working%20Group%20Interest"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground font-mono text-sm uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
            >
              Join the working group →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter contextLine="Field guide · Edition 01 · 2026" />
    </main>
  );
}
