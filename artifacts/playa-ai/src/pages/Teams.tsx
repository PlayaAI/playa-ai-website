import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
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
    photo: "https://playaai.github.io/Playa-AI/team-page-assets/alex-azzi.jpg",
    lines: ["Holds the vision.", "Tends the flame.", "Calls the meeting."],
  },
  {
    n: "002",
    role: "Research",
    name: "Tina Woods",
    title: "Head of Research",
    photo: null,
    lines: ["Research & Science."],
  },
  {
    n: "003",
    role: "Community",
    name: "Rebecca Nelson",
    title: "Director",
    photo: "https://playaai.github.io/Playa-AI/team-page-assets/rebecca-nelson.jpg",
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
  "Council members have no power to bind the foundation.",
  "Council members have no fiduciary duties.",
  "Council members have no signing authority.",
  "Playa AI Foundation has a separate governing board of directors.",
];

type Council = {
  ref: string;
  first: string;
  last: string;
  role: string;
  paragraphs: string[];
};

const COUNCIL: Council[] = [
  {
    ref: "A·001",
    first: "Tina",
    last: "Woods",
    role: "Science & Research Lead",
    paragraphs: [
      "Tina is a social entrepreneur, author, and system architect working at the intersection of longevity science, AI, health policy, and data governance. Founder & CEO of Collider Health and Business for Health, she builds cross-sector ecosystems focused on preventative health, healthy longevity, and responsible innovation — across the UK National Innovation Centre for Ageing, the International Institute of Longevity, the XPRIZE Global Visioneering Brain Trust, and the Global Exposome Forum.",
      "Her book Live Longer with AI explores how artificial intelligence can extend healthspan and reshape preventative health — directly aligned with Playa AI's focus on human-centered governance. She co-founded Longevity Rave, weaving longevity, music, and intergenerational connection in a way that resonates naturally with Burning Man culture, and leads the JoyScore Experiment, a global open-science project measuring how human connection drives flourishing — using Playa AI's Connect app as its technology layer.",
      "At Playa AI, she anchors the science and research dimension — connecting governance frameworks to health, longevity, data ethics, and the institutional communities needed to turn ideas into real-world adoption.",
    ],
  },
  {
    ref: "A·002",
    first: "Richard",
    last: "Rothenberg",
    role: "Senior AI Advisor",
    paragraphs: [
      "Richard is an AI, quantitative finance, and systemic-risk strategist working at the intersection of big data, investment research, policy, and sustainable development.",
      "CEO and Co-founder of Global A.I. Corporation, an AI-driven quantitative research company generating investment and policy insights for governments and institutional investors. His earlier work includes advising DARPA and the UN on financial vulnerabilities, curating high-profile events in Davos and across the Ivy League, and research roles at Deutsche Bank and Man Investments.",
      "Richard holds an MBA from Columbia Business School and brings Playa AI a rigorous systems lens on AI, capital markets, global risk, and institutional decision-making.",
    ],
  },
  {
    ref: "A·003",
    first: "Jenna",
    last: "Seiden",
    role: "Strategic Guardian",
    paragraphs: [
      "Jenna is a senior emerging-technology executive whose career spans interactive entertainment, immersive media, strategic partnerships, publishing, and global business development. She is also an animal-rights activist and leads the Temple Guardians in Black Rock City.",
      "Vice President, Head of Business Development for LEGO GAME at The LEGO Group, with prior senior roles across Skydance Interactive, Niantic Labs, CAA, Xbox, HTC, Maker Studios, NBC, Meta, and the NBA. Her work has centered on building new forms of play, storytelling, IP, and immersive experiences across platforms. She holds a degree from the University of Pennsylvania and an MBA from UCLA Anderson.",
      "At Playa AI, she brings a rare mix of strategy, culture, play, and emerging-media fluency — translating AI governance into experiences and partnerships people can actually engage with.",
    ],
  },
  {
    ref: "A·004",
    first: "Dr. David",
    last: "Rock",
    role: "NeuroLeadership Lead",
    paragraphs: [
      "Dr. David Rock is a pioneer in applying neuroscience to leadership, culture, motivation, and organizational change.",
      "Co-founder of the NeuroLeadership Institute, a global consultancy bringing cognitive science into leadership development, he is widely credited with coining the term neuroleadership. His work has helped move neuroscience into practical use across business, education, coaching, and change management — including through his books Your Brain at Work and Coaching with the Brain in Mind. David holds a professional doctorate in the Neuroscience of Leadership from Middlesex University.",
      "At Playa AI, he anchors the neuro and human-systems dimension — ensuring the foundation's work around AI, governance, trust, attention, and collective intelligence is grounded in how humans actually think, relate, and change.",
    ],
  },
  {
    ref: "A·005",
    first: "Alvin",
    last: "Wang Graylin",
    role: "Senior AI Advisor",
    paragraphs: [
      "Alvin is a global technology strategist, author, and AI pioneer whose work sits at the intersection of artificial intelligence, spatial computing, and society-scale transformation.",
      "Co-author of Our Next Reality, as well as publications on Abundanism and A Bill of Rights for the Age of AI. Chairman of the Virtual World Society, and a fellow or senior advisor across institutions including the Stanford Human-Centered AI Institute, the Stanford Digital Economy Lab, and the Asia Society Policy Institute. Previously China President and Global VP at HTC, where he led the company's VR and immersive technology strategy.",
      "With graduate degrees from MIT in Computer Science and Business, Alvin brings Playa AI deep expertise in AI, cross-cultural technology strategy, and the future of human-centered digital environments.",
    ],
  },
  {
    ref: "A·006",
    first: "Rob",
    last: "Griffitts",
    role: "Legal & Policy",
    paragraphs: [
      "Rob is a corporate and technology attorney who has spent his career advising founders, investors, and operating companies at the intersection of emerging technology and venture capital.",
      "Founder of Griffitts LLP, a law firm for founders and operators. His practice spans M&A and restructurings, financings, strategic partnerships, governance, and stakeholder disputes, with earlier experience at Skadden in New York and Wilson Sonsini in Palo Alto.",
      "At Playa AI, Rob brings legal, governance, and transaction experience to help shape responsible AI initiatives into durable institutions, partnerships, and operating frameworks.",
    ],
  },
];

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </div>
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
      <span className="font-serif italic text-5xl text-foreground/40">{initials}</span>
    </div>
  );
}

export default function Teams() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="hairline-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-5 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <Link href="/" className="flex items-center gap-3 font-bold" data-testid="link-home">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
            Playa AI Foundation
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#leadership" className="hover:text-muted-foreground transition-colors">Leadership</a>
            <a href="#council" className="hover:text-muted-foreground transition-colors">Council</a>
          </nav>
          <div className="text-muted-foreground">MMXXVI</div>
        </div>
      </header>

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
              The people building human-centered AI on, and off, the <i className="italic font-normal" style={{ color: "#9C5A2C" }}>playa</i>
            </motion.h1>

            <div className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>🔥</span>
              <span>(\O/)</span>
              <span>🤖</span>
            </div>
          </div>

          {/* Radial council map */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hairline-y hairline-x border-border p-6 md:p-10 bg-secondary/40 relative"
            >
              <img
                src="https://playaai.github.io/Playa-AI/team-page-assets/leadership-council-radial.svg?v=4"
                alt="Leadership and the Playa AI Council radial map"
                className="w-full h-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
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
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mt-4">Leadership</h2>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground max-w-xs">
              Operational core. Sets direction. Carries fiduciary duty.
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 hairline-t border-border"
          >
            {LEADERSHIP.map((m) => (
              <motion.div
                key={m.n}
                variants={fadeInUp}
                className="hairline-b lg:hairline-r last:lg:border-r-0 border-border p-6 md:p-8 flex flex-col"
                data-testid={`leadership-${m.n}`}
              >
                <div className="aspect-[3/4] w-full mb-6 overflow-hidden bg-secondary">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PortraitFallback name={m.name} />
                  )}
                </div>
                <div className="flex items-center justify-between mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{m.n}</span>
                  <span>· {m.role}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-[0.95] mb-3">{m.name}</h3>
                <div className="font-serif italic text-base md:text-lg text-muted-foreground mb-5">
                  {m.title}
                </div>
                <ul className="text-base leading-relaxed text-foreground space-y-1 mt-auto">
                  {m.lines.map((l, i) => (
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
                  <li key={i} className="flex gap-4 text-base md:text-lg leading-snug text-[#E2D9C5]">
                    <span className="font-mono text-xs text-[#A7A39A] pt-1.5 shrink-0 w-10">
                      § {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm md:text-base leading-relaxed text-[#A7A39A] max-w-2xl border-t border-[#3a342f] pt-6">
                Service on the Council does not constitute legal services to Playa AI Foundation. It does not create an attorney-client relationship. It is not privileged. The foundation retains independent counsel for legal matters. Foundation materials should not refer to Rob Griffitts as "counsel," "general counsel," or the foundation's lawyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Council bios */}
      <section className="px-4 max-w-[1400px] mx-auto py-20 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="space-y-20 md:space-y-32"
        >
          {COUNCIL.map((c, i) => (
            <motion.article
              key={c.ref}
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 hairline-t border-border pt-12 md:pt-16"
              data-testid={`council-${c.ref}`}
            >
              <div className="md:col-span-4">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  {c.ref} · Council Member
                </div>
                <h3 className="font-serif text-4xl md:text-6xl leading-[0.92] mb-3">
                  {c.first} <i className="italic font-normal">{c.last}</i>
                </h3>
                <div className="font-mono text-xs uppercase tracking-widest text-foreground border-b border-foreground inline-block pb-1">
                  {c.role}
                </div>
              </div>
              <div className="md:col-span-8 space-y-5">
                {c.paragraphs.map((p, j) => (
                  <p key={j} className="text-base md:text-lg leading-relaxed text-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Closing quote */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 py-24 md:py-40 text-center">
          <blockquote className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-5xl mx-auto">
            "We meet on the playa, and we meet in the cloud. <i className="italic font-normal">Same rules apply.</i>"
          </blockquote>
          <div className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            — Founding principle, Playa AI Foundation
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background px-4 pt-16 pb-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-xs uppercase tracking-widest">
          <div>
            <div className="mb-4 text-[#E2D9C5]">Playa AI Foundation</div>
            <Link href="/" className="text-[#A7A39A] hover:text-background transition-colors">← Back to dispatch</Link>
          </div>
          <div className="text-[#A7A39A]">
            Field guide · Edition 01 · 2026
          </div>
          <div className="text-[#A7A39A]">
            © 2026 Playa AI Foundation · Fiscal sponsorship via Mystic Arts Foundation · 501(c)(3)
          </div>
        </div>
      </footer>
    </main>
  );
}
