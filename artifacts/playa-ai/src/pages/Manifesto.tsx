import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import manifestoText from "./manifesto.txt?raw";

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

function formatManifestoBlocks(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const compact = block.replace(/\s+/g, " ").trim();
      const isHeading =
        index === 0 ||
        (compact.length < 90 &&
          (/^[A-Z0-9\s·:—–-]+$/.test(compact) ||
            /^\d+\.?\s+/.test(compact) ||
            /^(In one sentence|In 100 words|In 1000 words|Our Mission|Why Now\??|Why Burning Man\??|The Call|The Pledge|What We're Building|This Is About More Than Technology)$/i.test(
              compact,
            )));
      return {
        id: `${index}-${compact.slice(0, 24).replace(/[^a-z0-9]+/gi, "-")}`,
        text: block,
        type: index === 0 ? "title" : isHeading ? "heading" : "paragraph",
      };
    });
}

type Block = ReturnType<typeof formatManifestoBlocks>[number];

function renderBlock(block: Block, i: number, siblings: Block[]) {
  if (block.type === "heading" || block.type === "title") {
    return (
      <h3
        key={block.id}
        className="w-full text-left font-serif leading-none tracking-tight text-accent-gold pt-10 text-2xl md:text-3xl"
      >
        {block.text.split("\n").map((line, li) => (
          <span key={`${block.id}-${li}`}>
            {line}
            {li < block.text.split("\n").length - 1 && <br />}
          </span>
        ))}
      </h3>
    );
  }
  const prevBlock = i > 0 ? siblings[i - 1] : null;
  const is100WordsParagraph =
    prevBlock != null &&
    prevBlock.text.toLowerCase().includes("in 100 words");
  const isNote = block.text.startsWith("Note:");
  return (
    <p
      key={block.id}
      className={
        is100WordsParagraph
          ? "max-w-[760px] text-left font-serif text-2xl md:text-4xl leading-[1.05] tracking-tight text-accent-gold"
          : isNote
            ? "max-w-[62ch] text-left text-sm leading-relaxed text-muted-foreground border-l-2 border-accent-gold pl-4 italic"
            : "max-w-[62ch] text-left text-base md:text-lg leading-relaxed text-muted-foreground"
      }
    >
      {block.text.split("\n").map((line, li) => (
        <span key={`${block.id}-${li}`}>
          {line}
          {li < block.text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export default function ManifestoPage() {
  const normalizedText = manifestoText.replace(/\r\n/g, "\n");
  const rawLines = normalizedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const introTitle = rawLines[0] || "Playa AI Manifesto";
  const oneSentenceLabel = rawLines[1] || "In one sentence";
  const oneSentenceText = rawLines[2] || "";

  let skippedIntroLines = 0;
  const remainingText = normalizedText
    .split("\n")
    .filter((line) => {
      if (skippedIntroLines < 3 && line.trim()) {
        skippedIntroLines += 1;
        return false;
      }
      return skippedIntroLines >= 3;
    })
    .join("\n")
    .trim();

  const blocks = formatManifestoBlocks(remainingText);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader
        contextLine={
          <>
            <span>Manifesto</span>
            <span>·</span>
            <span className="text-accent-gold">Playa AI</span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">A living cultural text</span>
          </>
        }
      />

      <section className="px-4 max-w-[1400px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="hairline-b border-border pb-6 mb-10 md:mb-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>Playa AI · Manifesto · 2026</span>
          <span className="text-muted-foreground">Published · Living Document</span>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-6"
          >
            {oneSentenceLabel}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.92] tracking-tight mb-10"
          >
            {introTitle}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-serif text-2xl md:text-4xl leading-[1.05] tracking-tight text-accent-gold mb-12 max-w-[760px]"
          >
            {oneSentenceText}
          </motion.p>

          <motion.div variants={fadeInUp} className="space-y-6">
            {blocks.map((block, i) => renderBlock(block, i, blocks))}
          </motion.div>
        </motion.div>

        <div className="mt-16 font-mono text-[11px] tracking-widest text-muted-foreground hairline-t border-border pt-5">
          PLAYA AI · A LIVING CULTURAL TEXT · BORN ON THE PLAYA
        </div>
      </section>

      <SiteFooter contextLine="Manifesto · Playa AI · First published 2025" />
    </main>
  );
}
