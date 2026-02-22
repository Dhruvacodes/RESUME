"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: "gateway", label: "API Gateway", x: 50, y: 10, connections: ["auth", "service-a", "service-b"] },
  { id: "auth", label: "Auth Service", x: 20, y: 35, connections: ["db-auth"] },
  { id: "service-a", label: "Core Service", x: 50, y: 35, connections: ["queue", "cache"] },
  { id: "service-b", label: "Analytics", x: 80, y: 35, connections: ["queue", "db-main"] },
  { id: "queue", label: "Message Queue", x: 50, y: 60, connections: ["worker"] },
  { id: "cache", label: "Cache Layer", x: 25, y: 60, connections: [] },
  { id: "db-auth", label: "Auth DB", x: 10, y: 80, connections: [] },
  { id: "db-main", label: "Main DB", x: 75, y: 80, connections: [] },
  { id: "worker", label: "Workers", x: 50, y: 85, connections: ["db-main"] },
];

export default function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isHighlighted = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (nodeId === hoveredNode) return true;
    const hovered = nodes.find((n) => n.id === hoveredNode);
    return hovered?.connections.includes(nodeId) || false;
  };

  return (
    <div className="relative w-full h-[400px] border border-zinc-300 bg-white/20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            const highlighted =
              hoveredNode === node.id || hoveredNode === targetId;
            return (
              <line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={highlighted ? "var(--systems-accent)" : "#d4d4d8"}
                strokeWidth={highlighted ? 0.4 : 0.2}
                strokeDasharray={highlighted ? "none" : "1 1"}
                style={{
                  transition: "stroke 0.3s, stroke-width 0.3s",
                }}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center cursor-pointer"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`w-3 h-3 border transition-colors duration-300 ${
              isHighlighted(node.id)
                ? "border-systems-accent bg-systems-accent/20"
                : "border-zinc-400 bg-white/50"
            }`}
          />
          <span
            className={`font-mono-label text-[0.35rem] mt-1 transition-colors duration-300 whitespace-nowrap ${
              isHighlighted(node.id) ? "text-systems-accent" : "text-zinc-500"
            }`}
          >
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
