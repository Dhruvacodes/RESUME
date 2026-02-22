import { getAllIdeas, getIdeaBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const ideas = getAllIdeas();
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idea = getIdeaBySlug(params.slug);
  if (!idea) return { title: "Not Found" };
  return {
    title: `${idea.frontmatter.title} — Dhruv Agrawal`,
    description: idea.frontmatter.description,
  };
}

export default function IdeaPage({ params }: Props) {
  const idea = getIdeaBySlug(params.slug);

  if (!idea) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-white text-zinc-900"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <article className="max-w-2xl mx-auto px-6 pt-16 pb-16">
        {/* Header */}
        <header className="mb-12">
          <a
            href="/"
            className="font-mono-label text-zinc-400 text-[0.6rem] hover:text-zinc-700 transition-colors duration-300 mb-8 inline-block"
          >
            ← Back to Portfolio
          </a>
          <p className="font-mono-label text-zinc-400 text-[0.55rem] mb-4">
            {new Date(idea.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="font-serif-display text-4xl md:text-5xl leading-[1.15] mb-4">
            {idea.frontmatter.title}
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            {idea.frontmatter.description}
          </p>
          {idea.frontmatter.tags && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {idea.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="w-full h-[1px] bg-zinc-200 mt-8" />
        </header>

        {/* Content rendered as paragraphs from the markdown content */}
        <div className="prose prose-zinc max-w-none">
          {idea.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("# ")) {
              return (
                <h2 key={i} className="font-serif-display text-2xl mt-8 mb-4">
                  {paragraph.replace("# ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("## ")) {
              return (
                <h3 key={i} className="font-serif-display text-xl mt-6 mb-3">
                  {paragraph.replace("## ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("```")) {
              return (
                <pre
                  key={i}
                  className="bg-zinc-50 border border-zinc-200 p-4 rounded text-sm overflow-x-auto my-4"
                >
                  <code>{paragraph.replace(/```\w*\n?/, "").replace(/```$/, "")}</code>
                </pre>
              );
            }
            if (paragraph.trim() === "") return null;
            return (
              <p key={i} className="text-zinc-700 leading-[1.8] mb-4 text-[1.05rem]">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
