import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Dual Axis",
  description: "Professional resume and experience overview.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-8 border-b border-zinc-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-serif-display text-4xl mb-2">Dual Axis</h1>
            <p className="text-zinc-500 text-sm">
              Systems Engineer & Quantitative Researcher
            </p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="no-print px-4 py-2 border border-zinc-300 text-sm hover:bg-zinc-50 transition-colors duration-300"
          >
            Download PDF
          </a>
        </div>
        <div className="mt-4 flex gap-6 text-xs text-zinc-500">
          <span>hello@dualaxis.dev</span>
          <span>github.com/dualaxis</span>
          <span>linkedin.com/in/dualaxis</span>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="font-mono-label text-zinc-400 mb-4 text-xs">Summary</h2>
        <p className="text-zinc-700 leading-relaxed">
          Engineer with 8+ years of experience building distributed systems and
          quantitative models. Specialized in high-throughput architectures,
          machine learning infrastructure, and algorithmic trading systems.
          Track record of shipping production systems processing millions of
          transactions daily with 99.97% uptime.
        </p>
      </section>

      {/* Experience */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Experience</h2>
        <div className="space-y-8">
          {[
            {
              role: "Senior Systems Engineer",
              company: "Hyperscale Technologies",
              period: "2022 – Present",
              points: [
                "Designed event-driven microservices architecture handling 2.4TB daily throughput",
                "Reduced p99 latency from 200ms to 48ms through systematic optimization",
                "Led migration of monolithic system to distributed architecture serving 15M+ requests/day",
                "Implemented real-time ML inference pipeline with sub-100ms end-to-end latency",
              ],
            },
            {
              role: "Quantitative Developer",
              company: "Meridian Capital",
              period: "2020 – 2022",
              points: [
                "Built FX arbitrage detection engine monitoring 847 currency pairs in real-time",
                "Developed portfolio optimization framework achieving 2.4x Sharpe ratio",
                "Implemented risk monitoring dashboard with sub-second refresh across 12 asset classes",
                "Designed backtesting infrastructure for strategy research and validation",
              ],
            },
            {
              role: "Software Engineer",
              company: "DataFlow Systems",
              period: "2018 – 2020",
              points: [
                "Built stream processing pipeline with exactly-once semantics for terabyte-scale data",
                "Implemented distributed consensus protocol for heterogeneous network topologies",
                "Developed automated CI/CD pipeline reducing deployment time by 70%",
              ],
            },
          ].map((job, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-zinc-500 text-sm">{job.company}</p>
                </div>
                <span className="text-xs text-zinc-400 flex-shrink-0">{job.period}</span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {job.points.map((point, j) => (
                  <li key={j} className="text-sm text-zinc-600 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-400">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              category: "Languages",
              skills: "Python, TypeScript, Rust, Go, C++, SQL",
            },
            {
              category: "Infrastructure",
              skills: "Kubernetes, Docker, Terraform, AWS, GCP",
            },
            {
              category: "Data & ML",
              skills: "PyTorch, TensorFlow, Spark, Kafka, Redis",
            },
            {
              category: "Finance",
              skills: "FIX Protocol, QuantLib, Bloomberg API, Pandas",
            },
          ].map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold mb-1">{group.category}</h3>
              <p className="text-sm text-zinc-600">{group.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100 pb-16">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">MSc Computer Science</h3>
            <p className="text-sm text-zinc-500">
              University of Technology — 2018
            </p>
            <p className="text-sm text-zinc-600 mt-1">
              Thesis: Distributed consensus under Byzantine failure models
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">BSc Mathematics & Computer Science</h3>
            <p className="text-sm text-zinc-500">
              University of Science — 2016
            </p>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="no-print max-w-3xl mx-auto px-6 pb-12">
        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-300"
        >
          ← Back to Dual Axis
        </a>
      </div>
    </div>
  );
}
