import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    animateHover?: boolean;
}

export function GlassCard({ children, className, animateHover = true }: GlassCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-md dark:bg-black/40",
                "border-zinc-200/50 dark:border-zinc-800/50 shadow-sm",
                animateHover && "transition-all duration-300 hover:border-zinc-300/50 dark:hover:border-zinc-700/50 hover:shadow-md",
                className
            )}
        >
            {/* Noise Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
