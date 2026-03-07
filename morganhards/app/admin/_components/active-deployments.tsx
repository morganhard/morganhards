"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const deployments = [
  { name: "UI-TARS Agent Pool", env: "Production", status: "Healthy", type: "Docker Swarm" },
  { name: "Higgfield Video Gen", env: "Provisioning", status: "Starting", type: "g4dn.xlarge" },
  { name: "OpenBB Finance Data", env: "Staging", status: "Degraded", type: "Kubernetes" },
];

export function ActiveDeployments() {
  return (
    <GlassCard className="lg:col-span-2 p-6" animateHover={false}>
      <h2 className="text-lg font-semibold text-zinc-200 mb-4 border-b border-zinc-800/50 pb-2">
        Active Deployments
      </h2>
      <div className="space-y-4">
        {deployments.map((dep, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
          >
            <div>
              <div className="font-medium text-zinc-200">{dep.name}</div>
              <div className="text-xs text-zinc-500 font-mono mt-1">{dep.type}</div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                {dep.env}
              </Badge>
              <Badge
                variant="outline"
                className={
                  dep.status === "Healthy"
                    ? "text-emerald-400 border-emerald-500/50"
                    : dep.status === "Starting"
                      ? "text-amber-400 border-amber-500/50"
                      : "text-red-400 border-red-500/50"
                }
              >
                {dep.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
