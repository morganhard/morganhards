"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Play, Square, Activity, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface UsageMeterProps {
    costPerSec: number;
}

export function UsageMeter({ costPerSec }: UsageMeterProps) {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [tokens, setTokens] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((s) => s + 1);
                setTokens((t) => t + Math.floor(Math.random() * 50) + 10); // simulate token processing
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const totalCost = (seconds * costPerSec) + (tokens * 0.0001); // Arbitrary calculation: base compute + token cost

    return (
        <GlassCard className="w-full h-full p-6 flex flex-col justify-between" animateHover={false}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Resource Monitor
                </h3>
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="px-2 py-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/30"
                        >
                            Running
                        </motion.span>
                    ) : (
                        <span className="px-2 py-1 text-[10px] uppercase font-bold text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
                            Idle
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-4 font-mono">
                <div className="flex justify-between items-end border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Compute Time</span>
                    <span className="text-xl text-zinc-200">{seconds} <span className="text-sm text-zinc-500">sec</span></span>
                </div>

                <div className="flex justify-between items-end border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Tokens Processed</span>
                    <span className="text-xl text-zinc-200">{tokens.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-end pb-2 pt-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center">
                        Estimated Cost
                    </span>
                    <span className="text-2xl font-bold text-amber-400 flex items-center">
                        <DollarSign className="w-5 h-5" />
                        {totalCost.toFixed(4)}
                    </span>
                </div>
            </div>

            <div className="mt-8">
                {isActive ? (
                    <Button
                        variant="destructive"
                        className="w-full bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20"
                        onClick={() => setIsActive(false)}
                    >
                        <Square className="w-4 h-4 mr-2" fill="currentColor" /> Terminate Instance
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20"
                        onClick={() => setIsActive(true)}
                    >
                        <Play className="w-4 h-4 mr-2" fill="currentColor" /> Provision Sandbox
                    </Button>
                )}
            </div>
        </GlassCard>
    );
}
