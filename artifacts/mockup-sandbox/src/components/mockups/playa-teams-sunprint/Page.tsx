import React from "react";

export function Page() {
  return (
    <div style={{ backgroundColor: "#F1E2C5", color: "#2A1E15" }} className="min-h-screen relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: `
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Vollkorn', serif; }
        .bg-cream { background-color: #F1E2C5; }
        .bg-terracotta { background-color: #B7461F; }
        .text-terracotta { color: #B7461F; }
        .border-terracotta { border-color: #B7461F; }
        .text-brown { color: #2A1E15; }
        .bg-ochre { background-color: #E0A140; }
        .text-ochre { color: #E0A140; }
        .border-ochre { border-color: #E0A140; }

        .sun-ring {
          position: relative;
        }
        .sun-ring::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid #B7461F;
          border-radius: 50%;
        }
        .sun-ring::after {
          content: '';
          position: absolute;
          inset: -12px;
          border: 1px dashed #E0A140;
          border-radius: 50%;
        }
      `}} />

      <main className="font-body mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-24 flex flex-col gap-32">
        
        {/* HERO */}
        <section className="relative pt-12">
          {/* Summary Card */}
          <div className="absolute top-0 right-0 border-2 border-terracotta p-4 rounded-xl max-w-xs bg-[#EAD5AE] shadow-[4px_4px_0_#B7461F] rotate-2 hidden md:block">
            <div className="text-terracotta font-display font-bold text-sm tracking-widest uppercase mb-3">At a glance</div>
            <ul className="space-y-3 font-display text-sm">
              <li className="flex items-center gap-3">
                <img src="/__mockup/images/teams/alex.png" className="w-8 h-8 rounded-full grayscale mix-blend-multiply border border-terracotta" alt="" />
                <span>Alex Azzi</span>
              </li>
              <li className="flex items-center gap-3">
                <img src="/__mockup/images/teams/tina.jpg" className="w-8 h-8 rounded-full grayscale mix-blend-multiply border border-terracotta" alt="" />
                <span>Tina Woods</span>
              </li>
              <li className="flex items-center gap-3">
                <img src="/__mockup/images/teams/rebecca.jpg" className="w-8 h-8 rounded-full grayscale mix-blend-multiply border border-terracotta" alt="" />
                <span>Rebecca Nelson</span>
              </li>
              <li className="flex items-center gap-3">
                <img src="/__mockup/images/teams/raed.jpg" className="w-8 h-8 rounded-full grayscale mix-blend-multiply border border-terracotta" alt="" />
                <span>Raed Marji</span>
              </li>
            </ul>
          </div>

          <div className="max-w-4xl">
            <div className="font-display font-bold text-terracotta tracking-[0.2em] text-sm mb-6 flex items-center gap-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="#B7461F"/>
                <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.92893 4.92893L7.05025 7.05025M16.9497 16.9497L19.0711 19.0711M4.92893 19.0711L7.05025 16.9497M16.9497 4.92893L19.0711 7.05025" stroke="#B7461F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              TEAMS &middot; 2026
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-medium leading-[1.1] tracking-tight">
              The people building human-centered AI on, and off, the <em className="text-terracotta italic font-light">playa</em>
            </h1>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section>
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-px bg-terracotta flex-1 opacity-30"></div>
            <h2 className="font-display text-4xl md:text-5xl text-center font-bold italic">Leadership</h2>
            <div className="h-px bg-terracotta flex-1 opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-x-12 md:gap-y-24 justify-items-center">
            {/* Alex - Elevated */}
            <div className="col-span-1 md:col-span-3 flex flex-col items-center text-center">
              <div className="relative mb-8 p-3">
                <div className="absolute inset-0 border-2 border-terracotta rounded-full animate-[spin_60s_linear_infinite] border-dashed"></div>
                <div className="absolute inset-2 border border-ochre rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="sun-ring">
                  <img src="/__mockup/images/teams/alex.png" alt="Alex Azzi" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover grayscale mix-blend-multiply shadow-xl" />
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold mb-2">Alex Azzi</h3>
              <p className="text-terracotta font-medium italic text-lg tracking-wide">Founder & Executive Director</p>
            </div>

            {/* Other Leaders */}
            {[
              { name: "Tina Woods", role: "Head of Research (Research & Science)", img: "/__mockup/images/teams/tina.jpg" },
              { name: "Rebecca Nelson", role: "Director (Community & Comms)", img: "/__mockup/images/teams/rebecca.jpg" },
              { name: "Raed Marji", role: "Chief Technology Officer (Programs & Operations)", img: "/__mockup/images/teams/raed.jpg" }
            ].map((leader) => (
              <div key={leader.name} className="flex flex-col items-center text-center max-w-[280px]">
                <div className="relative mb-8">
                  <div className="sun-ring">
                    <img src={leader.img} alt={leader.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover grayscale mix-blend-multiply" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{leader.name}</h3>
                <p className="text-terracotta font-medium italic text-base leading-snug">{leader.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE PLAYA AI COUNCIL */}
        <section className="bg-[#EAD5AE] -mx-6 sm:-mx-12 lg:-mx-24 px-6 sm:px-12 lg:px-24 py-24 border-y border-terracotta/30">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-terracotta">
                The Playa AI Council
              </h2>
              <p className="font-display italic text-lg opacity-80">Council Charter & Terms of Reference</p>
            </div>
            
            <div className="md:w-2/3">
              <ul className="space-y-4 text-lg md:text-xl leading-relaxed">
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
                    <span className="text-terracotta shrink-0 mt-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-terracotta/20 text-sm opacity-70 italic font-display">
                * Note: Rob Griffitts serves as an advisor and is not legal counsel to the foundation.
              </div>
            </div>
          </div>
        </section>

        {/* COUNCIL BIOS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                name: "Tina Woods",
                role: "Science & Research Lead",
                img: "/__mockup/images/teams/tina.jpg",
                bio: "Tina is a social entrepreneur, author, and system architect at the intersection of longevity science, AI, health policy, and data governance. Founder & CEO of Collider Health and Business for Health. Author of *Live Longer with AI*. At Playa AI, she anchors the science and research dimension."
              },
              {
                name: "Richard Rothenberg",
                role: "Senior AI Advisor",
                img: "/__mockup/images/teams/richard.png",
                bio: "AI, quant finance, and systemic-risk strategist. CEO and co-founder of Global A.I. Corporation. Has advised DARPA and the UN on financial vulnerabilities. MBA from Columbia. Brings a rigorous systems lens on AI, capital markets, and institutional decision-making."
              },
              {
                name: "Jenna Seiden",
                role: "Strategic Guardian",
                img: "/__mockup/images/teams/jenna.png",
                bio: "Senior emerging-tech executive across interactive entertainment, immersive media, and partnerships. VP, Head of BD for LEGO GAME. Animal-rights activist. Leads the Temple Guardians in Black Rock City. UPenn / UCLA Anderson MBA."
              },
              {
                name: "Dr David Rock",
                role: "Head of Neuro",
                img: "/__mockup/images/teams/david.png",
                bio: "Pioneer in applying neuroscience to leadership and organizational change. Co-founder of the NeuroLeadership Institute. Author of *Your Brain at Work* and *Coaching with the Brain in Mind*. Doctorate in the Neuroscience of Leadership from Middlesex University."
              },
              {
                name: "Alvin Wang Graylin",
                role: "Senior AI Advisor",
                img: "/__mockup/images/teams/alvin.png",
                bio: "Global tech strategist and AI pioneer at the intersection of AI, spatial computing, and society-scale transformation. Co-author of *Our Next Reality*. Chairman of the Virtual World Society. Previously China President and Global VP at HTC. MIT in CS and Business."
              },
              {
                name: "Rob Griffitts",
                role: "Legal & Policy",
                img: "/__mockup/images/teams/rob.png",
                bio: "Corporate and tech attorney. Founder of Griffitts LLP. Practice spans M&A, financings, partnerships, governance. Earlier experience at Skadden NY and Wilson Sonsini Palo Alto."
              }
            ].map((member, i) => (
              <div key={member.name} className="border-2 border-terracotta p-8 rounded-tr-3xl rounded-bl-3xl relative bg-cream shadow-[8px_8px_0_#E0A140] hover:-translate-y-1 hover:shadow-[12px_12px_0_#E0A140] transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start">
                {/* Stamp graphic top right */}
                <svg className="absolute top-4 right-4 text-terracotta/20 w-12 h-12" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0L55.5 31L85.5 14.5L69 44.5L100 50L69 55.5L85.5 85.5L55.5 69L50 100L44.5 69L14.5 85.5L31 55.5L0 50L31 44.5L14.5 14.5L44.5 31L50 0Z" />
                </svg>

                <div className="shrink-0 relative">
                  <div className="sun-ring">
                    <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover grayscale mix-blend-multiply border border-terracotta" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1 border-b-2 border-terracotta inline-block pb-1 pr-4">{member.name}</h3>
                  <p className="text-ochre font-display font-bold text-sm tracking-widest uppercase mb-4 mt-2">{member.role}</p>
                  <div className="text-base leading-relaxed opacity-90 prose prose-brown">
                    {member.bio.split('*').map((part, index) => 
                      index % 2 === 1 ? <em key={index} className="font-display italic">{part}</em> : part
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="py-32 flex flex-col items-center text-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] animate-[spin_120s_linear_infinite]" fill="currentColor">
              <path d="M100 0L108 40L145 15L125 52L170 45L138 75L185 85L145 100L185 115L138 125L170 155L125 148L145 185L108 160L100 200L92 160L55 185L75 148L30 155L62 125L15 115L55 100L15 85L62 75L30 45L75 52L55 15L92 40L100 0Z"/>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="font-display font-bold text-ochre tracking-[0.3em] text-sm mb-12 uppercase flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-ochre"></span>
              Founding Principle
              <span className="w-12 h-px bg-ochre"></span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light italic leading-[1.1] text-terracotta">
              "We meet on the <em className="font-medium text-brown">playa</em>, and we meet in the <em className="font-medium text-brown">cloud</em>. Same rules apply."
            </h2>
          </div>
        </section>

      </main>
    </div>
  );
}
