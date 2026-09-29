import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function Publish() {
  return (
    <div className="editorial-page">
      <SiteHeader active="publish" />
      <main id="main-content" className="page-width" tabIndex={-1}>
        <h1>Publish</h1>
        <p className="page-lead">Shared learning, open to review.</p>
        <p className="page-note">
          Read the methods and tools behind Playa AI’s initiatives. Each
          publication carries its own status and license, so you can see what is
          ready to reuse and what is still being developed.
        </p>
        <section
          className="publication-section"
          aria-labelledby="methods-title"
        >
          <h2 id="methods-title">Methods</h2>
          <div className="publication-list">
            <article>
              <span className="editorial-label">
                Review candidate · CC BY 4.0
              </span>
              <h3>Ethical Experience Lab Protocol</h3>
              <p>
                EELP is a draft protocol for consent, disclosure, data handling,
                and human oversight in AI experiences. Version 0.1.0-rc.1 is a
                public review candidate, not a ratified standard or
                certification.
              </p>
              <a
                href="https://github.com/PlayaAI/EELP"
                className="editorial-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read EELP on GitHub
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            </article>
            <article>
              <span className="editorial-label">
                Research draft · CC BY-SA 4.0
              </span>
              <h3>Living Trust Framework</h3>
              <p>
                A public research draft exploring consent, privacy, and
                community stewardship. It is an input to further review, not a
                finalized policy. Associated code is licensed under Apache 2.0.
              </p>
              <a
                href="https://github.com/PlayaAI/playa-ai-living-trust-framework"
                className="editorial-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the framework on GitHub
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
        <section className="publication-section" aria-labelledby="tools-title">
          <h2 id="tools-title">Tools</h2>
          <div className="publication-list">
            <article>
              <h3>Implementation resources</h3>
              <p>
                EELP’s implementation checklist, consent architecture guide, and
                templates help teams examine how an AI experience handles
                participation and data.
              </p>
              <a
                href="https://github.com/PlayaAI/EELP/blob/main/docs/implementation-checklist.md"
                className="editorial-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the checklist
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            </article>
            <article>
              <h3>Initiatives in practice</h3>
              <p>
                Explore Connect and the other initiatives informing this work,
                with their individual development stages and participation
                routes.
              </p>
              <Link href="/build" className="editorial-link">
                Explore initiatives
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
        <section className="publication-section" aria-labelledby="data-title">
          <h2 id="data-title">Data</h2>
          <p className="page-note">
            No public dataset is listed here. Publishing research requires a
            separate decision about participant consent, privacy, and what can
            responsibly be shared.
          </p>
        </section>
        <section
          className="publication-section"
          aria-labelledby="manifesto-title"
        >
          <h2 id="manifesto-title">The founding text</h2>
          <p className="page-note">
            The Burner-AI Manifesto sets out the cultural ideas behind Playa AI.
            Read it as the starting point for the work.
          </p>
          <Link href="/manifesto" className="editorial-link">
            Read the manifesto
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <SiteFooter compact />
    </div>
  );
}
