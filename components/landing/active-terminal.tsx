"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
    { text: "[INFO] Initializing K8s Cluster...", delay: 500, type: "info" },
    { text: "[INFO] Mounting remote volumes via CSI...", delay: 800, type: "info" },
    { text: "[SUCCESS] NVIDIA GPU A100 Detected.", delay: 1200, type: "success" },
    { text: "[SYSTEM] Booting Control Plane services...", delay: 1800, type: "system" },
    { text: "[INFO] Establishing WebSocket Tunnel wss://orb.mhard.dev", delay: 2400, type: "info" },
    { text: "[SUCCESS] UI-TARS Sandbox Ready.", delay: 3000, type: "success" },
    { text: "morgan@platform-os:~$ orchestrate --agent ui-tars --start", delay: 4000, type: "input" },
];

export function ActiveTerminal() {
    const [logs, setLogs] = useState<typeof BOOT_SEQUENCE>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutIds: NodeJS.Timeout[] = [];

        BOOT_SEQUENCE.forEach((log, index) => {
            const timeoutId = setTimeout(() => {
                setLogs((prev) => [...prev, log]);
            }, log.delay);
            timeoutIds.push(timeoutId);
        });

        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-zinc-500">terminal@platform-os</div>
            </div>
            <div
                ref={containerRef}
                className="p-4 h-[250px] overflow-y-auto font-mono text-sm shadow-inner"
            >
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-1 ${log.type === "success" ? "text-emerald-400" :
                            log.type === "system" ? "text-blue-400" :
                                log.type === "input" ? "text-amber-300 font-bold mt-4" :
                                    "text-zinc-400"
                            }`}
                    >
                        {log.text}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-zinc-400 ml-1 translate-y-1"
                />
            </div>
        </div>
    );
}
