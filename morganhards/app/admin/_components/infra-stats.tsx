"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Server, Activity, Cpu, Database } from "lucide-react";

const stats = [
  { label: "Total K8s Nodes", value: "12 Active", sub: "EKS / GKE Hybrid", icon: Server, color: "text-emerald-400" },
  { label: "Active Workloads", value: "47 Pods", sub: "across 3 namespaces", icon: Activity, color: "text-blue-400" },
  { label: "Compute Load", value: "68%", sub: "AWS g4dn + local daemons", icon: Cpu, color: "text-amber-400" },
  { label: "API Requests", value: "1.2M", sub: "This billing cycle", icon: Database, color: "text-purple-400" },
];

export function InfraStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <GlassCard key={s.label} className="p-4" animateHover={false}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-400">{s.label}</span>
            <s.icon className={`w-4 h-4 ${s.color}`} />
          </div>
          <div className="text-2xl font-bold text-zinc-100">{s.value}</div>
          <div className="text-xs text-zinc-500 mt-1">{s.sub}</div>
        </GlassCard>
      ))}
    </div>
  );
}
