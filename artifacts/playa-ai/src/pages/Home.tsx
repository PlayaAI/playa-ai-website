import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "wouter";
import gatheringScreenImg from "@assets/image_1778690528207.png";
import salonDiscussionImg from "@assets/image_1778690538108.png";
import abstractArtImg from "@assets/image_1778690543179.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const PLEDGE_ITEMS = [
  "We hold these truths to be self-evident.",
  "That our humanness is foundational to wellbeing.",
  "That trust is essential, especially in the digital age.",
  "That hope is the antidote to fear, and is built through creativity, connection, and community.",
  "That our values must be evident in how we design and engage with technology.",
  "That consent is a precondition, not a checkbox.",
  "That identity belongs to the person, not the platform.",
  "That participation is the difference between an audience and a community.",
  "That stories are infrastructure and deserve to be protected as such.",
  "That a future worth living in must be designed with the people who will live in it.",
  "We pledge to build, fund, and adopt AI that earns this future.",
];

function PledgeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Layer 0 / Founding signers
                </div>
                <div className="font-serif text-3xl md:text-4xl leading-none">The Pledge</div>
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
                A short, plain-language commitment to the kind of AI we will build, fund, and adopt. Sign it as an institution, a funder, or a person.
              </p>

              <ul className="space-y-4 mb-10">
                {PLEDGE_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-xs text-muted-foreground pt-1.5 shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base md:text-lg leading-snug text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="hairline-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Filed · Spring 2026 · Black Rock Desert
                </div>
                <a
                  href="#fund"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest border border-foreground hover:bg-background hover:text-foreground transition-colors"
                  data-testid="button-send-pledge"
                >
                  Send The Pledge →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [pledgeOpen, setPledgeOpen] = useState(false);

  return (
    <main className="min-h-screen w-full font-sans text-foreground bg-background overflow-x-hidden selection:bg-foreground selection:text-background">
      
      {/* 1. Dispatch top bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md hairline-b font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <div className="max-w-[1400px] mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <span>Field Status / Layer 0 active</span>
            <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-slow"></div>
            <span className="hidden md:inline">· Salons in session</span>
          </div>
          <div className="hidden md:block text-center">
            Dispatch No. / 07 · Spring 2026 · Black Rock Desert ⇄ Worldwide
          </div>
          <div className="hidden md:flex justify-end items-center gap-4">
            <span>Filed Under / Standard · Governance · Reference Implementation</span>
            <Link href="/events" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors" data-testid="link-events">
              Events →
            </Link>
            <Link href="/teams" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors" data-testid="link-teams">
              Teams →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Hero */}
      <section className="pt-8 pb-24 md:pt-16 md:pb-32 px-4 max-w-[1400px] mx-auto">
        <div className="mb-24 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
          Playa AI Foundation
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-6xl">
          <motion.h1 variants={fadeInUp} className="font-serif text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.88] tracking-tight text-foreground mb-12">
            The ethical<br />standard for<br /><i className="italic font-normal">human-centered</i><br />AI.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-3xl max-w-3xl leading-relaxed mb-16 text-foreground">
            Playa AI Foundation uses Burning Man as a living laboratory to design, test, and publish consent-first standards for AI experiences that involve human stories, communities, and trust.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 font-mono text-sm uppercase">
            <a href="#standard" className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300" data-testid="link-adopt-standard">
              Adopt the Standard
            </a>
            <a href="#fund" className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300" data-testid="link-fund-year-1">
              Fund Year 1
            </a>
            <button
              type="button"
              onClick={() => setPledgeOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300 font-mono text-sm uppercase"
              data-testid="button-take-pledge"
            >
              Take The Pledge
            </button>
            <a href="#manifesto" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors" data-testid="link-read-manifesto">
              Read Manifesto
            </a>
            <a href="#oracle" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors" data-testid="link-meet-oracle">
              Meet the Oracle
            </a>
          </motion.div>
        </motion.div>
        
        <div className="mt-32 font-mono text-xs tracking-widest text-muted-foreground border-t border-border pt-4">
          40°47′00″N · 119°13′00″W · HORIZON · ELEV 1191m
        </div>
      </section>

      {/* 3. Field environment grid */}
      <section className="hairline-y border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border">
          {[
            { label: "Field Environment", val1: "80,000-person", val2: "civic laboratory" },
            { label: "Reference Build", val1: "The Oracle", val2: "relational AI" },
            { label: "Open Standard", val1: "EELP v1.0", val2: "protocol" },
            { label: "Governance", val1: "Participant-controlled", val2: "data trust" },
            { label: "Replication", val1: "Experience", val2: "Lab Kit" },
            { label: "Fiscal Sponsor", val1: "Mystic Arts", val2: "501(c)(3)", className: "md:hidden" } // For mobile alignment if needed, but original had 6
          ].slice(0, 6).map((item, i) => (
            <div key={i} className={`p-6 flex flex-col justify-between aspect-square md:aspect-auto md:h-48 ${item.className || ''}`}>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-4">{item.label}</div>
              <div className="text-lg md:text-xl leading-tight">
                {item.val1}<br />{item.val2}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. § 01 / The architecture */}
      <section id="standard" className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 01 / The architecture</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-5xl md:text-7xl leading-none mb-8">One system. Five surfaces. <i className="italic">Built in the dust.</i></h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Most AI ethics frameworks are written before they touch the world. EELP is different. It is built from field experience: real people, real consent, real community, and a governance model that participants can understand before they engage.
            </p>
          </div>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-border"
        >
          {[
            { num: "01", title: "Community Consent", desc: "Layered, revocable. Joining the community is separate from joining the experiment." },
            { num: "02", title: "Oracle Experience", desc: "A consent-first AI conversation designed to witness, not interpret." },
            { num: "03", title: "Data Trust", desc: "Stories live in a participant-controlled trust. Deletion is a feature, not a request form." },
            { num: "04", title: "EELP Standard", desc: "An open protocol for AI-mediated research. Adopt, certify, or co-author v1.1." },
            { num: "05", title: "Institutional Adoption", desc: "Museums, universities, festivals, civic AI teams. The receipts ship with the kit." }
          ].map((card, i) => (
            <motion.div key={i} variants={fadeInUp} className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 flex flex-col hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm mb-8">
                <span className="text-foreground">→</span>
                <span>{card.num}</span>
              </div>
              <h3 className="font-serif text-3xl mb-4 leading-none">{card.title}</h3>
              <p className="text-base text-muted-foreground leading-snug mt-auto">{card.desc}</p>
              <div className="mt-8 text-xl">›</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. § 02 / What we are building */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto border-t border-border">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 02 / What we are building</div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-24">Five programs. <i className="italic">One mission.</i></h2>
        
        <div className="grid grid-cols-1 gap-0">
          <p className="text-xl md:text-2xl max-w-3xl mb-16 text-muted-foreground">
            Not a coalition. Not a manifesto. A working system with shipping artifacts — each one already in the field, each one publicly governed.
          </p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="divide-y divide-border border-y border-border">
            {[
              { num: "01", tag: "Reference Implementation · Flagship", id: "oracle", title: "The Oracle", desc: "A consent-first AI conversation experience designed to witness, not interpret. The Oracle does not diagnose, advise, categorize, or decide. It reflects what a participant brings, returns an artifact in their own language, and asks for consent before anything enters the research commons.", link: "Request Oracle Brief" },
              { num: "02", tag: "Open Protocol · The Standard", title: "EELP", desc: "The Ethical Experience Lab Protocol — an open standard for AI experiences that involve human stories, consent, community, and trust. AI ethics with receipts.", link: "Read EELP v1.0" },
              { num: "03", tag: "Governance Layer · Trust Architecture", title: "Data Trust", desc: "Participant-controlled governance for stories, consent, deletion, and research access. No researcher accesses participant data without permission. No story is published without the right consent layer.", link: "See Public Use Registry" },
              { num: "04", tag: "Replication Package · Experience Lab Kit", title: "ELK", desc: "A replication package for institutions that want to run ethical AI experiences without reinventing the governance. Space design, facilitation training, consent architecture, compliance checklist.", link: "Request the Kit" },
              { num: "05", tag: "Longitudinal Layer · Layer 0 Community", title: "Community", desc: "The longitudinal research and consent surface before and after the Oracle. Salons, calls, field activations — where the standard is practiced, not just published.", link: "Join the Community" },
            ].map((prog, i) => (
              <motion.div key={i} id={prog.id} variants={fadeInUp} className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                  Program {prog.num} <br/> {prog.tag}
                </div>
                <div className="lg:col-span-8">
                  <h3 className="font-serif text-5xl md:text-7xl mb-8">{prog.title}</h3>
                  <p className="text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">{prog.desc}</p>
                  <a href="#" className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors inline-block">{prog.link}</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Manifesto pull-quote (INVERTED) */}
      <section id="manifesto" className="bg-foreground text-background py-32 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-16 text-muted-foreground uppercase tracking-wider">Manifesto / A living ethic</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
              <h2 className="font-serif text-6xl md:text-8xl leading-none mb-12">A future born<br/>in the desert.</h2>
            </div>
            <div className="flex flex-col items-start justify-end">
              <p className="text-2xl md:text-3xl leading-relaxed mb-12 text-[#E2D9C5]">
                Artificial intelligence is already shaping culture, cognition, community, and creativity. Playa AI exists to make sure this next intelligence is shaped by human values — consent, generosity, participation, civic responsibility, and care.
              </p>
              <a href="#" className="font-mono text-sm uppercase tracking-wider border-b border-background pb-1 hover:text-[#E2D9C5] transition-colors inline-block">Read the Manifesto</a>
            </div>
          </div>
          
          <div className="border-t border-[#6B6258] pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h3 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
              Most AI ethics is written <i className="italic">before</i> it touches the world.<br/>
              <span className="text-[#E2D9C5]">We built the receipts.</span>
            </h3>
            <div className="font-mono text-xs uppercase tracking-wider text-[#6B6258]">
              Operating thesis · Playa AI Foundation · Filed 2026
            </div>
          </div>
        </div>
      </section>

      {/* 7. § 03 / This is already happening */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 03 / This is already happening</div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-24">Field-tested before<br/>it was a foundation.</h2>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { stat: "150+", label: "Community calls" },
            { stat: "18", label: "Months in session" },
            { stat: "3", label: "Continents · physical salons" },
            { stat: "v1.0", label: "EELP standard · drafted" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="border-t border-border pt-6">
              <div className="font-serif text-5xl md:text-7xl italic mb-4">{item.stat}</div>
              <div className="font-mono text-sm text-muted-foreground uppercase">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xl md:text-3xl max-w-4xl leading-relaxed mb-16">
          Physical salons in New York, London, and Dubai. Fortnightly community calls with hundreds of recorded sessions. A growing field network of artists, technologists, funders, researchers, and civic builders working on what human-centered AI should actually mean. The work is not theoretical and it is not hypothetical. It is documented.
        </p>

        <div className="py-6 border-y border-border mb-16 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span className="font-serif text-3xl md:text-4xl italic">New York · London · Dubai · San Francisco · Black Rock City · — next: Berlin</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary">
              <img src={gatheringScreenImg} alt="Field gathering" className="w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider">Field gathering · Playa AI in session</div>
            <p className="text-lg leading-snug">Proof belongs in rooms: people gathered around language, ethics, tools, and the social conditions of human-centered AI.</p>
          </div>
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary">
              <img src={salonDiscussionImg} alt="Salon documentation" className="w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider">Salon documentation · Community assembly</div>
            <p className="text-lg leading-snug">The standard begins in listening, dialogue, consent, and shared inquiry.</p>
          </div>
          <div className="space-y-4">
            <div className="aspect-[3/2] overflow-hidden bg-secondary">
              <img src={abstractArtImg} alt="Cultural context" className="w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider">Cultural context · Art as signal</div>
            <p className="text-lg leading-snug">Playa culture gives AI ethics a place to become embodied, strange, social, and human.</p>
          </div>
        </div>
      </section>

      {/* 8. § 04 / From salons to standards */}
      <section className="py-24 md:py-32 bg-secondary/30 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-12 text-muted-foreground">§ 04 / From salons to standards</div>
          <h2 className="font-serif text-5xl md:text-7xl leading-none mb-16 max-w-4xl">A clear path from rooms to reference systems.</h2>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed mb-24">
            The movement did not begin as a document. It began in rooms: questions, prototypes, funders, builders, artists, and cultural stewards moving from conversation into public infrastructure.
          </p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { num: "01", title: "London Salon", desc: "The first room where the question 'What does it mean to be human?' proved the movement was real." },
              { num: "02", title: "New York Hatchathons", desc: "Hands-on building sessions where founders and operators tested AI agents and tools live." },
              { num: "03", title: "Lisbon Ignition", desc: "The first intentional fundraiser and formal declaration that Playa AI was becoming a foundation." },
              { num: "04", title: "Year 1", desc: "Oracle, EELP, Data Trust, community layer, field activations, and public documentation." },
              { num: "05", title: "Public Standard", desc: "The work moves from gatherings into a replicable ethical AI standard for institutions." }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="border-t border-foreground pt-6">
                <div className="font-mono text-sm mb-6">{step.num}</div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. § 05 / Why the Playa */}
      <section className="py-32 px-4 max-w-[1000px] mx-auto text-center">
        <div className="font-mono text-sm mb-8 text-muted-foreground">§ 05 / Why the Playa</div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">Not a festival.<br/>A civic laboratory.</h2>
        <p className="text-2xl md:text-4xl leading-relaxed text-muted-foreground">
          Burning Man is a temporary civilization where gifting, participation, radical self-expression, decommodification, civic responsibility, and leaving no trace are practiced at scale. Playa AI uses that environment to test whether AI can be designed around <span className="italic text-foreground">consent, creativity, trust, and human flourishing</span> instead of extraction.
        </p>
      </section>

      {/* 10. § 06 / Principles → AI design */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto border-t border-border">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 06 / Principles → AI design</div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12 max-w-3xl">The burner values become a design language.</h2>
        <p className="text-xl md:text-2xl max-w-3xl mb-24 text-muted-foreground">
          This is where the cultural thesis becomes practical governance: a translation layer for teams designing AI experiences around people, memory, consent, and community.
        </p>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {[
            { title: "Radical Inclusion", desc: "AI that works for everyone." },
            { title: "Gifting", desc: "Systems that give value before extracting value." },
            { title: "Decommodification", desc: "Technology beyond pure market logic." },
            { title: "Participation", desc: "Humans in the loop, deeply engaged." },
            { title: "Radical Self-Expression", desc: "AI as creative expansion, not homogenization." },
            { title: "Leaving No Trace", desc: "Consent-first data practices. Deletion as standard." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="p-8 md:p-12 border-b lg:border-b-0 lg:border-b-border [&:nth-child(-n+3)]:border-b border-r border-border last:border-0 hover:bg-secondary/30 transition-colors">
              <h3 className="font-serif text-3xl mb-4">{item.title}</h3>
              <p className="text-xl text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 11. Marquee credentials strip */}
      <section className="overflow-hidden border-y border-foreground bg-foreground text-background py-6">
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee font-mono text-lg uppercase tracking-widest flex items-center">
            {Array(4).fill(0).map((_, idx) => (
              <span key={idx} className="mx-4">
                Consent-first · Participant-controlled · No hidden extraction · Open standard · Field-tested · Fiscal sponsorship secured · 
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 12. § 07 / Three paths */}
      <section id="fund" className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 07 / Three paths</div>
        <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">Adopt. Fund. <i className="italic">Or build with us.</i></h2>
        <p className="text-xl md:text-2xl max-w-3xl mb-24 text-muted-foreground">
          Three ways to help build the standard for human-centered AI. Each path is segmented because the conversation differs — institutions, donors, and community members deserve language built for them, not for a press release.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { tag: "Path 01 / Institutions", title: "Adopt the Standard", desc: "For universities, museums, festivals, civic AI teams, and research labs. Become a Founding Adopter of EELP. Help co-author the next version of the standard and run your own ethical experience lab — with the protocol, the kit, and the governance already worked out.", link: "Request Adopter Conversation →" },
            { tag: "Path 02 / Funders", title: "Fund Year 1", desc: "For DAF donors, foundations, AI wealth, Burning Man-aligned philanthropists. $160K closes Year 1: the Oracle deployment, foundation operations, and publication of EELP as a public-benefit standard. Fiscal sponsorship via Mystic Arts Foundation. DAF accepted.", link: "Schedule Donor Conversation →", bg: "bg-foreground text-background", border: "border-foreground" },
            { tag: "Path 03 / Community", id: "partners", title: "Join the Layer 0", desc: "For builders, artists, facilitators, burners, researchers. Join the people helping shape how AI meets human experience — through salons, calls, Field Notes, Oracle volunteer cohorts, and Experience Lab Kit testing. Layer 0 consent is its own thing. No extraction.", link: "Join the Community →" }
          ].map((path, i) => (
            <div key={i} id={path.id} className={`border p-8 md:p-12 flex flex-col ${path.bg || 'bg-background text-foreground border-border'}`}>
              <div className="font-mono text-xs uppercase tracking-wider mb-16 opacity-70">{path.tag}</div>
              <h3 className="font-serif text-4xl mb-6">{path.title}</h3>
              <p className={`text-lg leading-relaxed mb-16 ${path.bg ? 'text-[#E2D9C5]' : 'text-muted-foreground'}`}>{path.desc}</p>
              <a href="#" className={`mt-auto font-mono text-sm uppercase tracking-wider inline-block border-b pb-1 transition-colors w-fit ${path.bg ? 'border-background hover:text-[#E2D9C5] hover:border-[#E2D9C5]' : 'border-foreground hover:text-muted-foreground hover:border-muted-foreground'}`}>
                {path.link}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 13. § 08 / Governance */}
      <section className="py-24 px-4 max-w-[1400px] mx-auto border-t border-border">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 08 / Governance</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">Governed by people who understand systems.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Builders, researchers, artists, legal minds, and cultural stewards hold the work between technology and human experience. The Council turns philosophy into operating discipline.
            </p>
            <a href="#" className="font-mono text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted-foreground transition-colors inline-block">Meet the Council →</a>
          </div>
          <div className="flex flex-wrap items-center content-center gap-x-6 gap-y-4 font-serif text-2xl md:text-3xl leading-tight">
            <span>Alex Azzi <span className="text-muted-foreground italic text-xl">Founder & Executive Director</span></span> <span className="text-muted-foreground">·</span>
            <span>Tina Woods <span className="text-muted-foreground italic text-xl">Research & Science</span></span> <span className="text-muted-foreground">·</span>
            <span>Rebecca Nelson <span className="text-muted-foreground italic text-xl">Community & Comms</span></span> <span className="text-muted-foreground">·</span>
            <span>Raed Marji <span className="text-muted-foreground italic text-xl">Technology & Programs</span></span> <span className="text-muted-foreground">·</span>
            <span>Rob Griffitts <span className="text-muted-foreground italic text-xl">Legal & Governance</span></span> <span className="text-muted-foreground">·</span>
            <span>Dr. David Rock <span className="text-muted-foreground italic text-xl">NeuroLeadership</span></span>
          </div>
        </div>
      </section>

      {/* 14. § 09 / What funding unlocks (INVERTED) */}
      <section className="bg-foreground text-background py-24 md:py-32 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-sm mb-12 text-[#6B6258] uppercase tracking-wider">§ 09 / What funding unlocks</div>
          <h2 className="font-serif text-5xl md:text-7xl leading-none mb-24 max-w-4xl">Year 1 turns the standard into public infrastructure.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#6B6258]/30">
            {[
              "Oracle deployment", "EELP publication", "Data Trust implementation",
              "Experience Lab Kit", "Field activations", "Public documentation"
            ].map((title, i) => (
              <div key={i} className="p-8 border-b lg:border-b-0 [&:nth-child(-n+3)]:border-b border-r border-[#6B6258]/30 last:border-0 hover:bg-[#1a1816] transition-colors">
                <div className="font-mono text-sm text-[#6B6258] mb-8">0{i+1}</div>
                <h3 className="font-serif text-3xl">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. § 10 / Field Notes */}
      <section className="py-24 md:py-32 px-4 max-w-[1400px] mx-auto">
        <div className="font-mono text-sm mb-12 text-muted-foreground">§ 10 / Field Notes</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl md:text-7xl leading-none">What we publish<br/>between fundraises.</h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-xl text-muted-foreground leading-relaxed">
              The website is not a billboard. It is the dispatch desk. Every fortnight: what we learned, what we changed, what we got wrong, and what the standard now requires.
            </p>
          </div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "Consent Architecture", date: "04.18.26", title: "Why consent cannot be a checkbox in relational AI.", meta: "9 min read · Field Notes No. 014" },
            { tag: "Methodology", date: "04.04.26", title: "Five things 150+ Playa calls taught us about AI governance.", meta: "12 min read · Field Notes No. 013" },
            { tag: "Relational AI", date: "03.21.26", title: "AI that witnesses vs. AI that decides — and why we chose one.", meta: "7 min read · Field Notes No. 012" }
          ].map((note, i) => (
            <motion.div key={i} variants={fadeInUp} className="group cursor-pointer border-t border-border pt-6 flex flex-col h-full">
              <div className="flex justify-between items-center font-mono text-xs uppercase tracking-wider text-muted-foreground mb-8">
                <span>{note.tag}</span>
                <span>{note.date}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-16 group-hover:text-muted-foreground transition-colors">
                {note.title}
              </h3>
              <div className="mt-auto font-mono text-xs text-muted-foreground">
                — {note.meta}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 16. Closing CTA */}
      <section className="py-32 px-4 max-w-[1400px] mx-auto border-t border-foreground text-center">
        <h2 className="font-serif text-6xl md:text-8xl leading-none max-w-5xl mx-auto mb-16">
          Help set the standard before human-centered AI becomes another slogan.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-sm uppercase">
          <a href="#standard" className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-colors duration-300">
            Adopt the Standard
          </a>
          <a href="#fund" className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
            Fund Year 1
          </a>
          <a href="#partners" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
            Join Layer 0
          </a>
          <a href="#manifesto" className="text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
            Read Manifesto
          </a>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="bg-foreground text-background py-12 px-4 font-mono text-xs uppercase tracking-wider">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-80">
          <div>
            <div className="font-bold mb-4 tracking-widest text-[#F2EBDD]">PLAYA AI FOUNDATION</div>
            <div className="text-[#6B6258]">© 2026 Playa AI Foundation</div>
          </div>
          <div>
            <div className="mb-2 text-[#E2D9C5]">Dispatch No. / 07</div>
            <div className="text-[#6B6258]">Spring 2026 · Black Rock Desert</div>
          </div>
          <div>
            <div className="mb-2 text-[#E2D9C5]">Filed Under</div>
            <div className="text-[#6B6258]">Standard · Governance · Reference</div>
          </div>
          <div>
            <div className="mb-2 text-[#E2D9C5]">Fiscal sponsorship via</div>
            <div className="text-[#6B6258]">Mystic Arts Foundation · 501(c)(3)</div>
          </div>
        </div>
      </footer>

      <PledgeModal open={pledgeOpen} onClose={() => setPledgeOpen(false)} />
    </main>
  );
}
