import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function Fund() {
  return (
    <div className="editorial-page">
      <SiteHeader active="fund" />
      <main id="main-content" className="page-width" tabIndex={-1}>
        <h1>Fund</h1>
        <p className="page-lead">Help make human-centered AI possible.</p>
        <p className="page-note">
          Support the artists, researchers, and builders developing initiatives
          around creativity, consent, and human choice. Talk with us about
          funding a specific initiative or supporting the work that connects
          them.
        </p>
        <a
          className="editorial-button"
          href="mailto:team@playa-ai.org?subject=Fund%20a%20Playa%20AI%20Initiative"
        >
          Discuss a contribution
        </a>
        <section
          className="publication-section"
          aria-labelledby="funding-title"
        >
          <h2 id="funding-title">What your support can make possible</h2>
          <div className="publication-list">
            <article>
              <h3>Community initiatives</h3>
              <p>
                Time and resources for artists, researchers, and builders to
                develop and test their work with communities.
              </p>
              <Link href="/build" className="editorial-link">
                Explore initiatives
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <h3>Shared knowledge</h3>
              <p>
                Consent research, documentation, and openly licensed methods
                that other communities can review and adapt.
              </p>
              <Link href="/publish" className="editorial-link">
                Read the published work
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
        <section
          className="publication-section"
          aria-labelledby="funding-process"
        >
          <h2 id="funding-process">Start with a conversation</h2>
          <p className="page-note">
            Tell us what you want to support. We can discuss the initiative, its
            needs, and a suitable contribution route before you make a
            commitment.
          </p>
          <p className="page-note">
            An artist with an idea?{" "}
            <a
              className="editorial-link"
              href="mailto:team@playa-ai.org?subject=Artist%20Interest%20List"
            >
              Join the artist interest list
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </p>
        </section>
      </main>
      <SiteFooter compact />
    </div>
  );
}
