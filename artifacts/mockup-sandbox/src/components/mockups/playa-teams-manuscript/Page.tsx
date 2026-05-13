import React from 'react';

export function Page() {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" />
      
      <main 
        className="w-full text-base sm:text-lg leading-relaxed antialiased selection:bg-[#1A1714] selection:text-[#F4ECDB]"
        style={{ 
          backgroundColor: '#F4ECDB', 
          color: '#1A1714',
          fontFamily: "'Lora', serif",
        }}
      >
        <div className="max-w-4xl mx-auto px-8 py-24 md:py-32">
          
          {/* Top nav / Eyebrow */}
          <header className="flex justify-between items-start mb-32 border-b border-[#1A1714] pb-4">
            <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Teams &middot; 2026
            </span>
            
            <div className="text-right flex flex-col gap-1 border border-[#1A1714] p-3 text-xs uppercase tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span className="font-semibold pb-1 border-b border-[#1A1714]">Playa AI</span>
              <span>A. Azzi</span>
              <span>T. Woods</span>
              <span>R. Nelson</span>
              <span>R. Marji</span>
            </div>
          </header>

          {/* Hero */}
          <section className="mb-40">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-semibold mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The people building human-centered AI on, and off, the <em className="italic">playa</em>
            </h1>
          </section>

          <Divider />

          {/* Leadership */}
          <section className="mb-40">
            <h2 
              className="text-3xl md:text-4xl italic mb-16 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Leadership
            </h2>

            <div className="flex flex-col items-center gap-24">
              {/* Founder */}
              <div className="flex flex-col items-center text-center max-w-sm">
                <div className="mb-6 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    &#x263C;
                  </div>
                  <img 
                    src="/__mockup/images/teams/alex.png" 
                    alt="Alex Azzi" 
                    className="w-64 h-64 object-cover border border-[#1A1714] p-1 bg-[#F4ECDB]"
                    style={{ filter: "grayscale(100%) contrast(120%)" }}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Alex Azzi</h3>
                <p className="uppercase tracking-widest text-xs">Founder & Executive Director</p>
              </div>

              {/* Other Leaders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                <LeaderCard 
                  name="Tina Woods"
                  role="Head of Research (Research & Science)"
                  imgSrc="/__mockup/images/teams/tina.jpg"
                />
                <LeaderCard 
                  name="Rebecca Nelson"
                  role="Director (Community & Comms)"
                  imgSrc="/__mockup/images/teams/rebecca.jpg"
                />
                <LeaderCard 
                  name="Raed Marji"
                  role="Chief Technology Officer (Programs & Operations)"
                  imgSrc="/__mockup/images/teams/raed.jpg"
                />
              </div>
            </div>
          </section>

          <Divider />

          {/* Council Charter */}
          <section className="mb-40 max-w-2xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl italic mb-12 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Playa AI Council
            </h2>
            
            <div className="mb-16">
              <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Council Charter & Terms of Reference
              </h3>
              
              <ul className="space-y-4 list-none p-0 m-0">
                {[
                  "The Leadership Council is advisory only.",
                  "Council members provide perspective, expertise, and strategic input.",
                  "Council members have no governance authority.",
                  "Council members have no power to bind the foundation.",
                  "Council members have no legal liability.",
                  "Council members have no signing authority.",
                  "Playa AI Foundation has a separate governing board of directors."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-[#1A1714] pt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>&#x2727;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="mt-8 text-sm italic opacity-80 border-t border-[#1A1714] pt-4">
                Note: Rob Griffitts serves on the council but is not legal counsel to the foundation.
              </p>
            </div>
            
            <Divider />

            <div className="mt-32 space-y-32">
              <CouncilBio 
                num="I"
                name="Tina Woods"
                role="Science & Research Lead"
                imgSrc="/__mockup/images/teams/tina.jpg"
                bio="Tina is a social entrepreneur, author, and system architect at the intersection of longevity science, AI, health policy, and data governance. Founder & CEO of Collider Health and Business for Health. Author of Live Longer with AI. At Playa AI, she anchors the science and research dimension."
              />
              <CouncilBio 
                num="II"
                name="Richard Rothenberg"
                role="Senior AI Advisor"
                imgSrc="/__mockup/images/teams/richard.png"
                bio="AI, quant finance, and systemic-risk strategist. CEO and co-founder of Global A.I. Corporation. Has advised DARPA and the UN on financial vulnerabilities. MBA from Columbia. Brings a rigorous systems lens on AI, capital markets, and institutional decision-making."
              />
              <CouncilBio 
                num="III"
                name="Jenna Seiden"
                role="Strategic Guardian"
                imgSrc="/__mockup/images/teams/jenna.png"
                bio="Senior emerging-tech executive across interactive entertainment, immersive media, and partnerships. VP, Head of BD for LEGO GAME. Animal-rights activist. Leads the Temple Guardians in Black Rock City. UPenn / UCLA Anderson MBA."
              />
              <CouncilBio 
                num="IV"
                name="Dr David Rock"
                role="Head of Neuro"
                imgSrc="/__mockup/images/teams/david.png"
                bio="Pioneer in applying neuroscience to leadership and organizational change. Co-founder of the NeuroLeadership Institute. Author of Your Brain at Work and Coaching with the Brain in Mind. Doctorate in the Neuroscience of Leadership from Middlesex University."
              />
              <CouncilBio 
                num="V"
                name="Alvin Wang Graylin"
                role="Senior AI Advisor"
                imgSrc="/__mockup/images/teams/alvin.png"
                bio="Global tech strategist and AI pioneer at the intersection of AI, spatial computing, and society-scale transformation. Co-author of Our Next Reality. Chairman of the Virtual World Society. Previously China President and Global VP at HTC. MIT in CS and Business."
              />
              <CouncilBio 
                num="VI"
                name="Rob Griffitts"
                role="Legal & Policy"
                imgSrc="/__mockup/images/teams/rob.png"
                bio="Corporate and tech attorney. Founder of Griffitts LLP. Practice spans M&A, financings, partnerships, governance. Earlier experience at Skadden NY and Wilson Sonsini Palo Alto."
              />
            </div>
          </section>

          <Divider />

          {/* Closing */}
          <footer className="mt-40 mb-20 text-center">
            <span className="uppercase tracking-[0.2em] text-xs font-semibold mb-8 block" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Founding Principle
            </span>
            <blockquote 
              className="text-4xl md:text-5xl lg:text-6xl italic leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "We meet on the playa, and we meet in the cloud. Same rules apply."
            </blockquote>
          </footer>

        </div>
      </main>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-24 opacity-60">
      <div className="h-[1px] w-24 bg-[#1A1714]"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#1A1714]"></div>
      <div className="h-[1px] w-24 bg-[#1A1714]"></div>
    </div>
  );
}

function LeaderCard({ name, role, imgSrc }: { name: string, role: string, imgSrc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-48 h-48 object-cover border border-[#1A1714] p-1 bg-[#F4ECDB]"
          style={{ filter: "grayscale(100%) contrast(120%)" }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{name}</h3>
      <p className="uppercase tracking-widest text-[10px] leading-relaxed max-w-[180px]">{role}</p>
    </div>
  );
}

function CouncilBio({ num, name, role, imgSrc, bio }: { num: string, name: string, role: string, imgSrc: string, bio: string }) {
  // First letter for drop cap
  const firstLetter = bio.charAt(0);
  const restOfBio = bio.slice(1);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="shrink-0 flex flex-col items-center gap-4 md:w-48">
        <span className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Fig. {num}</span>
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-32 h-32 object-cover border border-[#1A1714] p-1 bg-[#F4ECDB]"
          style={{ filter: "grayscale(100%) contrast(120%)" }}
        />
      </div>
      
      <div className="flex-1 max-w-[520px]">
        <h4 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{name}</h4>
        <div className="uppercase tracking-widest text-[10px] mb-6 border-b border-[#1A1714] pb-4 inline-block">{role}</div>
        
        <p className="text-justify leading-relaxed">
          <span className="float-left text-6xl leading-[0.8] pr-2 pt-1 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstLetter}
          </span>
          {restOfBio}
        </p>
      </div>
    </div>
  );
}
