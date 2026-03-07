"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export function SystemPulse() {
    const { infrastructureStatus } = useAppStore();

    const getStatusColor = () => {
        switch (infrastructureStatus) {
            case 'Optimized':
                return 'bg-emerald-500 shadow-emerald-500/50';
            case 'Provisioning':
                return 'bg-amber-500 shadow-amber-500/50';
            case 'Degraded':
                return 'bg-rose-500 shadow-rose-500/50';
            default:
                return 'bg-zinc-500 shadow-zinc-500/50';
        }
    };

    return (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
            <div className="relative flex h-3 w-3 items-center justify-center">
                {infrastructureStatus === 'Optimized' && (
                    <motion.span
                        className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", getStatusColor())}
                        animate={{ scale: [1, 2, 2], opacity: [0.75, 0, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                )}
                <span className={cn("relative inline-flex rounded-full h-2 w-2 shadow-[0_0_10px_rgba(0,0,0,0.5)]", getStatusColor())} />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-300">
                System Status: {infrastructureStatus}
            </span>
        </div>
    );
}
