"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, LayoutGrid, ShieldAlert, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "System Core", path: "/", icon: Terminal },
    { name: "App Portal", path: "/apps", icon: LayoutGrid },
    { name: "Admin Dashboard", path: "/admin", icon: ShieldAlert },
    { name: "Contact", path: "/contact", icon: Mail },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-2xl bg-white/5 dark:bg-black/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <MagneticButton key={item.path}>
                        <Link
                            href={item.path}
                            className={cn(
                                "relative flex items-center justify-center p-3 sm:px-4 sm:py-2 transition-colors rounded-xl",
                                isActive ? "text-primary dark:text-blue-400" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-pill"
                                    className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <div className="relative z-10 flex items-center gap-2">
                                <item.icon className="w-4 h-4" />
                                <span className="hidden sm:block text-sm font-medium tracking-tight">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    </MagneticButton>
                );
            })}
        </div>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
