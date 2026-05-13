import React from "react";

export function Page() {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <main 
        className="min-h-screen text-[#E8DFCB] selection:bg-[#D6633C] selection:text-[#0A0A0B]"
        style={{ 
          backgroundColor: '#0A0A0B',
          backgroundImage: 'radial-gradient(circle at 50% 0%, #14110D 0%, #0A0A0B 100%)',
          fontFamily: "'Space Grotesk', sans-serif" 
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-24 border-x border-[#E8DFCB]/5 relative">
          
          {/* Top coord */}
          <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-2 text-[10px] text-[#E8DFCB]/40 font-['JetBrains_Mono'] uppercase tracking-widest border-b border-[#E8DFCB]/10">
            <span>37.7749° N, 122.4194° W</span>
            <span>SEC-01 // ROOT</span>
          </div>

          {/* Hero Section */}
          <section className="pt-24 pb-32 relative">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-2 bg-[#D6633C]"></div>
                  <span className="font-['JetBrains_Mono'] text-xs tracking-[0.2em] text-[#D6633C] uppercase">Teams · 2026</span>
                </div>
                <h1 className="font-['Instrument_Serif'] text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8">
                  The people building human-centered AI on, and off, the <em className="italic text-[#E8DFCB]/80">playa</em>
                </h1>
              </div>

              {/* Summary Card */}
              <div className="w-64 border border-[#E8DFCB]/10 bg-[#14110D]/50 backdrop-blur-sm p-4 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D6633C]/50 to-transparent"></div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#E8DFCB]/40 mb-4 uppercase tracking-wider border-b border-[#E8DFCB]/10 pb-2">
                  [Index Summary]
                </div>
                <ul className="space-y-3 font-['JetBrains_Mono'] text-xs">
                  <li className="flex justify-between items-center text-[#E8DFCB]">
                    <span>AZZI, A.</span>
                    <span className="text-[#D6633C] text-[10px]">DIR</span>
                  </li>
                  <li className="flex justify-between items-center text-[#E8DFCB]/60">
                    <span>WOODS, T.</span>
                    <span className="text-[10px]">R&D</span>
                  </li>
                  <li className="flex justify-between items-center text-[#E8DFCB]/60">
                    <span>NELSON, R.</span>
                    <span className="text-[10px]">COM</span>
                  </li>
                  <li className="flex justify-between items-center text-[#E8DFCB]/60">
                    <span>MARJI, R.</span>
                    <span className="text-[10px]">OPS</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-[#E8DFCB]/10 relative my-16">
            <div className="absolute -top-[10px] left-12 bg-[#0A0A0B] px-2 font-['JetBrains_Mono'] text-[10px] text-[#D6633C]">010 — LEADERSHIP</div>
          </div>

          {/* Leadership Section */}
          <section className="py-16">
            <h2 className="font-['Instrument_Serif'] text-5xl mb-16 text-[#E8DFCB]">Leadership</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Alex Azzi - Elevated */}
              <div className="md:col-span-12 lg:col-span-6 flex flex-col md:flex-row gap-8 items-start border border-[#D6633C]/30 bg-[#14110D] p-6 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D6633C]"></div>
                <div className="relative w-48 h-64 shrink-0 grayscale border border-[#E8DFCB]/20">
                  <img src="/__mockup/images/teams/alex.png" alt="Alex Azzi" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#14110D] to-transparent"></div>
                  <div className="absolute top-2 right-2 text-[#D6633C]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  </div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-[#D6633C] text-xs mb-2 tracking-widest uppercase">Founder & Executive Director</div>
                  <h3 className="font-['Instrument_Serif'] text-4xl mb-4">Alex Azzi</h3>
                  <div className="text-sm text-[#E8DFCB]/70 font-light leading-relaxed">
                    Initiating sequence for the Playa AI Foundation. Coordinates global operations bridging the physical gathering and the digital expansion.
                  </div>
                </div>
              </div>

              {/* Other Leaders */}
              <div className="md:col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: "Tina Woods", title: "Head of Research (Research & Science)", img: "/__mockup/images/teams/tina.jpg" },
                  { name: "Rebecca Nelson", title: "Director (Community & Comms)", img: "/__mockup/images/teams/rebecca.jpg" },
                  { name: "Raed Marji", title: "Chief Technology Officer (Programs & Operations)", img: "/__mockup/images/teams/raed.jpg" }
                ].map((leader, i) => (
                  <div key={leader.name} className="flex flex-col gap-4 group">
                    <div className="relative aspect-[3/4] w-full grayscale border border-[#E8DFCB]/10 overflow-hidden">
                      <img src={leader.img} alt={leader.name} className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0A0A0B] to-transparent"></div>
                      <div className="absolute top-2 left-2 font-['JetBrains_Mono'] text-[9px] text-[#E8DFCB]/40">LDR-0{i+2}</div>
                    </div>
                    <div>
                      <div className="font-['JetBrains_Mono'] text-[#D6633C]/80 text-[10px] mb-1 tracking-wider uppercase h-8">{leader.title}</div>
                      <h3 className="font-['Instrument_Serif'] text-2xl">{leader.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-[#E8DFCB]/10 relative my-16">
             <div className="absolute -top-[10px] right-12 bg-[#0A0A0B] px-2 font-['JetBrains_Mono'] text-[10px] text-[#D6633C]">020 — CHARTER</div>
          </div>

          {/* Charter Section */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border border-[#E8DFCB]/10 bg-[#14110D]/30 p-8 md:p-12">
            <div className="md:col-span-4">
              <h2 className="font-['Instrument_Serif'] text-4xl mb-6">The Playa AI Council</h2>
              <p className="font-['JetBrains_Mono'] text-xs text-[#D6633C] uppercase tracking-widest mb-4">Council Charter & Terms of Reference</p>
            </div>
            <div className="md:col-span-8 font-['JetBrains_Mono'] text-xs text-[#E8DFCB]/80">
              <ul className="space-y-4">
                {[
                  "The Leadership Council is advisory only.",
                  "Council members provide perspective, expertise, and strategic input.",
                  "Council members have no governance authority.",
                  "Council members have no power to bind the foundation.",
                  "Council members have no legal liability.",
                  "Council members have no signing authority.",
                  "Playa AI Foundation has a separate governing board of directors."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-[#D6633C]">[{`0${i+1}`}]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#E8DFCB]/10 text-[10px] text-[#E8DFCB]/50 uppercase tracking-widest">
                * Note: Rob Griffitts acts in an advisory capacity and is not legal counsel to the foundation.
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-[#E8DFCB]/10 relative my-16">
            <div className="absolute -top-[10px] left-12 bg-[#0A0A0B] px-2 font-['JetBrains_Mono'] text-[10px] text-[#D6633C]">030 — DOSSIERS</div>
          </div>

          {/* Council Bios */}
          <section className="py-16">
            <div className="space-y-16">
              {[
                { name: "Tina Woods", role: "Science & Research Lead", img: "/__mockup/images/teams/tina.jpg", bio: "Tina is a social entrepreneur, author, and system architect at the intersection of longevity science, AI, health policy, and data governance. Founder & CEO of Collider Health and Business for Health. Author of Live Longer with AI. At Playa AI, she anchors the science and research dimension." },
                { name: "Richard Rothenberg", role: "Senior AI Advisor", img: "/__mockup/images/teams/richard.png", bio: "AI, quant finance, and systemic-risk strategist. CEO and co-founder of Global A.I. Corporation. Has advised DARPA and the UN on financial vulnerabilities. MBA from Columbia. Brings a rigorous systems lens on AI, capital markets, and institutional decision-making." },
                { name: "Jenna Seiden", role: "Strategic Guardian", img: "/__mockup/images/teams/jenna.png", bio: "Senior emerging-tech executive across interactive entertainment, immersive media, and partnerships. VP, Head of BD for LEGO GAME. Animal-rights activist. Leads the Temple Guardians in Black Rock City. UPenn / UCLA Anderson MBA." },
                { name: "Dr David Rock", role: "Head of Neuro", img: "/__mockup/images/teams/david.png", bio: "Pioneer in applying neuroscience to leadership and organizational change. Co-founder of the NeuroLeadership Institute. Author of Your Brain at Work and Coaching with the Brain in Mind. Doctorate in the Neuroscience of Leadership from Middlesex University." },
                { name: "Alvin Wang Graylin", role: "Senior AI Advisor", img: "/__mockup/images/teams/alvin.png", bio: "Global tech strategist and AI pioneer at the intersection of AI, spatial computing, and society-scale transformation. Co-author of Our Next Reality. Chairman of the Virtual World Society. Previously China President and Global VP at HTC. MIT in CS and Business." },
                { name: "Rob Griffitts", role: "Legal & Policy", img: "/__mockup/images/teams/rob.png", bio: "Corporate and tech attorney. Founder of Griffitts LLP. Practice spans M&A, financings, partnerships, governance. Earlier experience at Skadden NY and Wilson Sonsini Palo Alto." }
              ].map((council, i) => (
                <div key={council.name} className="flex flex-col md:flex-row gap-8 md:gap-16 border-l-2 border-[#D6633C]/20 hover:border-[#D6633C] transition-colors duration-500 pl-6 relative">
                  <div className="absolute -left-[20px] top-0 bg-[#0A0A0B] py-2 font-['JetBrains_Mono'] text-[10px] text-[#D6633C] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    ID-{String(i+1).padStart(3, '0')}
                  </div>
                  
                  <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 grayscale border border-[#E8DFCB]/20 relative">
                    <img src={council.img} alt={council.name} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#D6633C]/20"></div>
                  </div>

                  <div className="flex-1">
                    <div className="font-['JetBrains_Mono'] text-[#D6633C] text-xs mb-3 tracking-widest uppercase">{council.role}</div>
                    <h3 className="font-['Instrument_Serif'] text-4xl mb-6 text-[#E8DFCB]">{council.name}</h3>
                    <p className="text-[#E8DFCB]/70 font-light leading-relaxed max-w-2xl text-sm md:text-base">
                      {council.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="pt-32 pb-16 text-center border-t border-[#E8DFCB]/10 mt-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-[#D6633C]"></div>
            <div className="font-['JetBrains_Mono'] text-[#D6633C] text-[10px] mb-8 tracking-[0.3em] uppercase">
              Founding Principle
            </div>
            <h2 className="font-['Instrument_Serif'] text-4xl md:text-6xl text-[#E8DFCB] max-w-4xl mx-auto leading-tight">
              "We meet on the playa, and we meet in the cloud. Same rules apply."
            </h2>
          </section>

        </div>
      </main>
    </div>
  );
}
