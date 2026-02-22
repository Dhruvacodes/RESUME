import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas — Dhruv Agrawal",
  description: "Technical notes and research essays.",
};

export default function IdeasIndexPage() {
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
          ← Back to Portfolio
        </a>
        <h1 className="font-serif-display text-4xl md:text-5xl mb-4">Ideas</h1>
        <p className="text-zinc-500 mb-12">
          Technical notes and research essays coming soon.
        </p>
        <div className="border border-zinc-200 p-8 text-center">
          <p className="text-zinc-400 text-sm">
            Research essays and analytical notes are in preparation.
            Check back for updates on quantitative methods, systems thinking,
            and cross-domain analytical frameworks.
          </p>
        </div>
      </div>
    </div>
  );
}
