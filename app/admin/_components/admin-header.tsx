"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Server, LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          <Server className="text-primary w-8 h-8" /> Control Plane
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Infrastructure telemetry, billing analytics, and orchestrator management.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
      >
        <LogOut className="w-4 h-4 mr-2" /> Disconnect
      </Button>
    </div>
  );
}
