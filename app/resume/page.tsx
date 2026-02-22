import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Dhruv Agrawal",
  description: "Resume and professional background of Dhruv Agrawal.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-8 border-b border-zinc-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-serif-display text-4xl mb-2">Dhruv Agrawal</h1>
            <p className="text-zinc-500 text-sm">
              Technology & Finance Enthusiast
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
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
          <a href="mailto:dhruvagrawal479@gmail.com" className="hover:text-zinc-800 transition-colors">
            dhruvagrawal479@gmail.com
          </a>
          <a href="https://linkedin.com/in/dhruva02" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 transition-colors">
            linkedin.com/in/dhruva02
          </a>
          <a href="https://github.com/Dhruvacodes" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 transition-colors">
            github.com/Dhruvacodes
          </a>
          <span>Bengaluru, India</span>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="font-mono-label text-zinc-400 mb-4 text-xs">Summary</h2>
        <p className="text-zinc-700 leading-relaxed">
          Computer and Communication Engineering student at Manipal Institute of
          Technology with strong foundations in statistical learning, systems thinking,
          and quantitative modeling. Research experience spanning AI perception systems,
          FX statistical arbitrage, and agent-based economic simulation. Interested in
          applying analytical rigour to high-impact strategic and business challenges.
        </p>
      </section>

      {/* Education — Timeline */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Education</h2>
        <div className="relative pl-8 space-y-8">
          {/* Timeline line */}
          <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-zinc-200" />
          {[
            {
              institution: "Manipal Institute of Technology, Manipal",
              degree: "B.Tech — Computer and Communication Engineering",
              period: "2023 – Present",
              detail: null,
            },
            {
              institution: "Bhavan\u2019s Bhagwandas Purohit Vidya Mandir, Civil Lines, Nagpur",
              degree: "Class XII (Senior Secondary)",
              period: "2023",
              detail: "93.6%",
            },
            {
              institution: "Bhavan\u2019s Bhagwandas Purohit Vidya Mandir, Civil Lines, Nagpur",
              degree: "Class X (Secondary)",
              period: "2021",
              detail: "98.4%",
            },
          ].map((edu, i) => (
            <div key={i} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white" />
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-zinc-500">{edu.institution}</p>
                </div>
                <span className="text-xs text-zinc-400 flex-shrink-0 ml-4">{edu.period}</span>
              </div>
              {edu.detail && (
                <p className="text-sm text-zinc-600 mt-1">Grade: {edu.detail}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Experience</h2>
        <div className="space-y-8">
          {[
            {
              role: "AI Researcher",
              company: "Team RoboManipal",
              period: "2024 – Present",
              points: [
                "Built AI perception and prescriptive decision system for autonomous robotics",
                "Integrated instance segmentation, 3D spatial tracking, and multi-sensor fusion",
                "Designed deterministic firmware migration framework for cross-architecture microcontroller porting",
                "Represented team at World Robotics Championship",
                "Trained 50+ team members in ML and Edge AI workflows",
              ],
            },
            {
              role: "Quantitative Research",
              company: "Finova — Finance Club, MIT Manipal",
              period: "2024 – Present",
              points: [
                "Built FX statistical arbitrage strategy on 14-year, 5-second frequency dataset",
                "Received IISc podium recognition for FX arbitrage research",
                "Developed hybrid Bitcoin crash forecasting system (EGARCH + LPPL + Attention LSTM)",
                "Constructed cross-asset portfolio using Hierarchical Risk Parity with regime switching",
              ],
            },
            {
              role: "Member",
              company: "E-Cell, MIT Manipal",
              period: "2023 – Present",
              points: [
                "Contributed to entrepreneurship-focused initiatives and events",
                "Engaged with startup ecosystem and innovation-driven projects",
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

      {/* Projects */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Projects</h2>
        <div className="space-y-8">
          {[
            {
              title: "FX Statistical Arbitrage Strategy",
              desc: "Market-neutral FX strategy with factor decomposition removing USD exposure. Residual momentum trading on 14-year dataset at 5-second frequency. Net Sharpe 1.99 (1 bp cost), max drawdown −13.6%, profitable 12/14 years. Walk-forward backtesting.",
            },
            {
              title: "Hybrid Bitcoin Crash Forecasting",
              desc: "EGARCH volatility modeling, LPPL bubble diagnostics, sentiment signals, and attention-based LSTM for crash prediction. Early warning up to 26 days, ROC AUC 0.97. Rolling-window cross-validation.",
            },
            {
              title: "Cross-Asset Portfolio Optimisation",
              desc: "Hierarchical Risk Parity with regime switching and walk-forward optimisation. 148% return vs 97.5% benchmark. Sharpe improvement 0.41 → 0.68. Regime-conditional performance decomposition.",
            },
            {
              title: "Post-AGI Digital Economy Simulation",
              desc: "Agent-based modeling framework with tokenised reputation systems and synthetic labour markets. Reduced simulated wealth concentration by 34% through policy intervention protocols.",
            },
            {
              title: "AI Perception Pipeline (RoboManipal)",
              desc: "End-to-end AI perception system integrating instance segmentation, 3D spatial tracking, and multi-sensor fusion for autonomous robotics competition.",
            },
          ].map((proj, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold mb-1">{proj.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              category: "Languages & Frameworks",
              skills: "Python, C++, TypeScript, MATLAB, SQL, PyTorch, TensorFlow",
            },
            {
              category: "Quantitative Methods",
              skills: "Statistical Arbitrage, EGARCH, LPPL, Risk Parity, Walk-Forward Validation",
            },
            {
              category: "AI & ML",
              skills: "Instance Segmentation, Attention Mechanisms, LSTM, Sensor Fusion, Edge Deployment",
            },
            {
              category: "Tools & Platforms",
              skills: "Git, Docker, Linux, Jupyter, NumPy, Pandas, Scikit-learn",
            },
          ].map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold mb-1">{group.category}</h3>
              <p className="text-sm text-zinc-600">{group.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publications & Patents */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100 pb-16">
        <h2 className="font-mono-label text-zinc-400 mb-6 text-xs">Publications & Patents</h2>
        <p className="text-sm text-zinc-500 italic">
          Research papers and patent applications in progress — details available upon request.
        </p>
      </section>

      {/* Back link */}
      <div className="no-print max-w-3xl mx-auto px-6 pb-12">
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
