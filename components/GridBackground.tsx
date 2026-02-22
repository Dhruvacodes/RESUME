"use client";

export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 grid-bg"
      style={{ opacity: 0.5 }}
    />
  );
}
