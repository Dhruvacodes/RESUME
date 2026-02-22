import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas — Dhruv Agrawal",
  description:
    "Analytical essays exploring volatility, abstraction, and hybrid thinking across technology and finance.",
};

/* ─── Essay Data ────────────────────────────────────────────────── */
const essays = [
  {
    number: "01",
    title: "Volatility as a Behavioural Signal",
    subtitle: "Why price variance tells you more about people than prices",
    body: [
      "Most treatments of volatility focus on what it measures — the statistical dispersion of returns. But the more interesting question is what it reveals. Volatility is not noise. It is the market's emotional signature, compressed into a time series.",
      "When volatility spikes, the standard interpretation is uncertainty. But uncertainty about what? Usually not about fundamentals — earnings releases, macro data, and policy decisions are scheduled events. The uncertainty is about other participants. Volatility rises when traders stop pricing assets and start pricing each other's reactions.",
      "This is why volatility clusters. Fear is reflexive — my uncertainty about your behaviour amplifies your uncertainty about mine, and the feedback loop compresses into a regime that standard models treat as a parameter shift. But it is not a parameter shift. It is a phase transition in collective behaviour.",
      "The implication for modeling is significant. If volatility is behavioural rather than structural, then models calibrated to historical variance are measuring an effect, not a cause. A more useful approach might be to model the conditions under which behavioural contagion accelerates — network density, information asymmetry, position concentration — and treat volatility as a downstream indicator of those dynamics.",
      "This does not mean volatility models are useless. It means they are most useful when they are treated as diagnostic instruments rather than predictive ones. The question should not be 'what will volatility be tomorrow?' but 'what is the current state of the behavioural system that generates volatility?' The former is a forecasting problem. The latter is a regime identification problem. They require very different tools.",
    ],
  },
  {
    number: "02",
    title: "Abstraction as a Survival Mechanism",
    subtitle: "How systems that generalise outlast systems that optimise",
    body: [
      "There is a recurring pattern in both engineering and biology: systems that survive over long periods are not the ones most optimised for current conditions. They are the ones with the highest capacity for abstraction — the ability to represent problems at a level that remains useful when the specifics change.",
      "Consider the difference between a hand-tuned trading strategy and a risk management framework. The strategy is optimised for a specific market regime — it captures a particular statistical regularity and exploits it efficiently. The framework, by contrast, is designed to function regardless of which regime is active. It does not predict what will happen. It constrains what can go wrong.",
      "The strategy will outperform the framework in the regime it was designed for. But when the regime shifts, the strategy breaks and the framework holds. This is not a trivial observation. It implies that the most robust systems are the ones that sacrifice local performance for structural generality.",
      "In software engineering, this manifests as the tension between optimisation and modularity. A system optimised for one use case runs faster but breaks when requirements change. A modular system runs slower but adapts. The same logic applies to organisations, research methodologies, and career strategies.",
      "The deeper principle is this: abstraction is how systems encode the ability to handle novelty. A system that can only respond to situations it has seen before is fragile. A system that can represent situations at a level that transfers across contexts is antifragile — not because it benefits from disorder, but because it represents problems in a way that remains valid under disorder.",
      "This is why the most valuable skill in complex environments is not expertise in any one domain, but the ability to extract transferable structure from diverse domains. The person who understands risk management, systems architecture, and organisational behaviour at the level of their common abstractions will outperform the specialist in any one of those fields — not immediately, but over time, and especially during transitions.",
    ],
  },
  {
    number: "03",
    title: "Hybrid Thinking: Where Systems Meet Markets",
    subtitle: "The case for cross-domain analytical frameworks",
    body: [
      "Technology and finance are typically studied as separate disciplines. They have different vocabularies, different incentive structures, different failure modes. But at the level of analytical method, they are remarkably convergent.",
      "Both domains deal with complex adaptive systems — environments where the behaviour of the system is shaped by the behaviour of its participants, which is in turn shaped by the behaviour of the system. Markets are complex adaptive systems. Large-scale distributed software is a complex adaptive system. Organisations are complex adaptive systems.",
      "The tools that work in one domain often transfer to the other. Walk-forward validation, a standard technique in quantitative finance, is structurally identical to k-fold cross-validation with temporal ordering in machine learning. Risk parity, a portfolio construction method, embodies the same principle as load balancing in distributed systems — allocate resources in proportion to uncertainty, not in proportion to expected return.",
      "The value of hybrid thinking is not that it produces novel insights in either domain. It is that it produces novel connections between domains. When you understand volatility clustering in markets and cascading failures in distributed systems as instances of the same phenomenon — positive feedback in a coupled network — you gain access to an analytical vocabulary that neither domain provides on its own.",
      "This is not interdisciplinary work in the academic sense. It is not about combining two fields into a third. It is about developing a set of transferable analytical primitives — feedback loops, regime detection, robustness under constraints, information asymmetry — that apply wherever complex systems generate data.",
      "The practical implication is that the strongest analytical positions are held by people who can move fluidly between domains, applying the structural insights from each to the problems of the other. Not generalists who know a little about everything, but integrators who understand the deep structure of multiple fields well enough to see where they rhyme.",
    ],
  },
];

/* ─── Page ──────────────────────────────────────────────────────── */
export default function IdeasIndexPage() {
  return (
    <div
      className="min-h-screen bg-white text-zinc-900"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
        <a
          href="/"
          className="font-mono-label text-zinc-400 text-[0.6rem] hover:text-zinc-700 transition-colors duration-300 mb-8 inline-block"
        >
          ← Back to Portfolio
        </a>
        <h1 className="font-serif-display text-4xl md:text-5xl mb-4">Ideas</h1>
        <p className="text-zinc-500 leading-relaxed">
          Analytical essays on volatility, abstraction, and cross-domain
          thinking. These are not technical write-ups — they are explorations of
          the structural patterns that recur across markets, systems, and
          decision-making under uncertainty.
        </p>
      </div>

      {/* Essays */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        {essays.map((essay) => (
          <article
            key={essay.number}
            className="py-12 border-t border-zinc-200 first:border-t-0"
          >
            <p className="font-mono-label text-zinc-400 text-[0.6rem] mb-3">
              {essay.number}
            </p>
            <h2 className="font-serif-display text-2xl md:text-3xl mb-2 leading-tight">
              {essay.title}
            </h2>
            <p className="text-zinc-400 text-sm italic mb-8">
              {essay.subtitle}
            </p>
            <div className="space-y-5">
              {essay.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-zinc-700 text-[0.95rem] leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto px-6 pb-12 border-t border-zinc-100 pt-8">
        <p className="text-zinc-400 text-xs leading-relaxed mb-6">
          These essays reflect personal analytical perspectives and are not
          affiliated with any institution or organisation.
        </p>
        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-300"
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}
