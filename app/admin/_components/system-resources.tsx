"use client";

import { GlassCard } from "@/components/ui/glass-card";

const resources = [
  { label: "Memory (RAM)", value: "112 / 128 GB", pct: 87, color: "bg-blue-500" },
  { label: "VRAM (GPU)", value: "38 / 40 GB", pct: 95, color: "bg-purple-500" },
  { label: "Storage (EFS)", value: "2.1 / 5.0 TB", pct: 42, color: "bg-emerald-500" },
];

export function SystemResources() {
  return (
    <GlassCard className="p-6" animateHover={false}>
      <h2 className="text-lg font-semibold text-zinc-200 mb-4 border-b border-zinc-800/50 pb-2">
        System Resources
      </h2>
      <div className="space-y-6">
        {resources.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">{r.label}</span>
              <span className="text-zinc-200 font-mono">{r.value}</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
