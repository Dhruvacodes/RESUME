import { getAllIdeas } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas — Dual Axis",
  description: "Technical essays and research notes.",
};

export default function IdeasIndexPage() {
  const ideas = getAllIdeas();

  return (
    <div
      className="min-h-screen bg-white text-zinc-900"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-16">
        <a
          href="/"
          className="font-mono-label text-zinc-400 text-[0.6rem] hover:text-zinc-700 transition-colors duration-300 mb-8 inline-block"
        >
          ← Back to Dual Axis
        </a>
        <h1 className="font-serif-display text-4xl md:text-5xl mb-4">Ideas</h1>
        <p className="text-zinc-500 mb-12">
          Technical essays, research notes, and explorations.
        </p>
        <div className="space-y-8">
          {ideas.length === 0 ? (
            <p className="text-zinc-400 text-sm">No ideas published yet.</p>
          ) : (
            ideas.map((idea) => (
              <a
                key={idea.slug}
                href={`/ideas/${idea.slug}`}
                className="block group border-b border-zinc-100 pb-8"
              >
                <p className="font-mono-label text-zinc-400 text-[0.55rem] mb-2">
                  {new Date(idea.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="font-serif-display text-2xl group-hover:text-systems-accent transition-colors duration-300 mb-2">
                  {idea.frontmatter.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {idea.frontmatter.description}
                </p>
                {idea.frontmatter.tags && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {idea.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-zinc-200 px-2 py-0.5 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
