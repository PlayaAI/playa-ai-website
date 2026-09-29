import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import playaBlueprint from "@assets/playa-hero-blueprint-transparent.png";

const OPERATING_MODEL = [
  {
    title: "Convene",
    description:
      "Gather artists, researchers, and technologists to explore AI through shared practice.",
    cta: "Explore gatherings",
    href: "/convene",
  },
  {
    title: "Build",
    description:
      "Develop initiatives that put consent, creativity, and human choice into practice.",
    cta: "Explore initiatives",
    href: "/build",
  },
  {
    title: "Fund",
    description: "Help resource the people and initiatives doing this work.",
    cta: "Support the work",
    href: "/fund",
  },
  {
    title: "Publish",
    description:
      "Share methods and tools openly, and research only where consent allows.",
    cta: "Read our work",
    href: "/publish",
  },
];

const INITIATIVES = [
  {
    title: "Connect",
    description: "Guided prompts for a conversation between two people.",
    status: "Pilot",
    href: "/build#ws-connect-app",
  },
  {
    title: "Living Trust Framework",
    description:
      "A research draft on consent, privacy, and community stewardship.",
    status: "Research draft",
    href: "/living-trust-framework",
  },
  {
    title: "EELP",
    description: "A draft protocol for participant-governed AI experiences.",
    status: "Review candidate",
    href: "/eelp",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <SiteHeader active="home" />
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero page-width" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <h1 id="home-title">
              <span>AI shaped by</span> <span>the people who</span>{" "}
              <span>live with it.</span>
            </h1>
            <p className="home-intro">
              Playa AI brings artists, researchers, and communities together to
              build AI around human creativity, consent, and choice.
            </p>
            <p className="home-definition">
              Human-centered means people shape the experience and decide how
              their data is used.
            </p>
            <div className="home-actions">
              <Link href="/fund" className="editorial-button">
                Fund an initiative
              </Link>
              <a
                href="mailto:team@playa-ai.org?subject=Playa%20AI%20Initiative%20Idea"
                className="editorial-button editorial-button-outline"
              >
                Bring an idea
              </a>
            </div>
          </div>
          <div className="home-art" aria-hidden="true">
            <img
              src={playaBlueprint}
              alt=""
              width="1376"
              height="768"
              fetchPriority="high"
            />
          </div>
        </section>

        <section
          className="home-model page-width"
          aria-labelledby="model-title"
        >
          <p className="editorial-label">How we work</p>
          <h2 id="model-title">
            <span>We convene. We build.</span> <span>We fund. We publish.</span>
          </h2>
          <p className="home-model-intro">
            We bring people together, develop initiatives, seek support for the
            work, and share what we learn.
          </p>
          <div className="home-model-grid">
            {OPERATING_MODEL.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className="editorial-link">
                  {item.cta}
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="home-initiatives"
          aria-labelledby="initiatives-title"
        >
          <div className="page-width">
            <div className="home-section-heading">
              <h2 id="initiatives-title">Selected initiatives</h2>
              <Link href="/build" className="editorial-link">
                View all initiatives
                <ArrowRight aria-hidden="true" size={20} />
              </Link>
            </div>
            <div className="initiative-list">
              {INITIATIVES.map((item, i) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="initiative-row"
                >
                  <span className="initiative-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="initiative-status">{item.status}</span>
                  <ArrowRight
                    className="initiative-arrow"
                    aria-hidden="true"
                    size={22}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter compact showBackLink={false} />
    </div>
  );
}
