"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Lock, ShieldAlert } from "lucide-react";
import { validatePin } from "@/app/actions/auth";

const PIN_LENGTH = 8;

export default function LoginPage() {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleKeyPress = (num: number) => {
        if (pin.length >= PIN_LENGTH || isPending) return;

        setError(false);
        const newPin = pin + num;
        setPin(newPin);

        if (newPin.length === PIN_LENGTH) {
            startTransition(async () => {
                const result = await validatePin(newPin);
                if (result.success) {
                    router.push("/admin");
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPin("");
                        setError(false);
                    }, 600);
                }
            });
        }
    };

    const handleBackspace = () => {
        if (pin.length > 0 && !isPending) {
            setPin(pin.slice(0, -1));
            setError(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <GlassCard className={`w-full max-w-sm p-8 flex flex-col items-center ${error ? 'animate-shake border-red-500/50' : ''}`} animateHover={false}>
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 shadow-inner">
                    <ShieldAlert className="w-8 h-8 text-primary" />
                </div>

                <h1 className="text-2xl font-bold text-zinc-200 mb-2">Command Center</h1>
                <p className="text-sm text-zinc-500 mb-8 text-center">Enter PIN to access infrastructure controls.</p>

                {/* PIN Indicators */}
                <div className="flex gap-3 mb-8">
                    {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full border transition-colors ${i < pin.length
                                    ? 'bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]'
                                    : 'bg-zinc-900 border-zinc-800'
                                }`}
                        />
                    ))}
                </div>

                {/* Numpad Grid */}
                <div className="grid grid-cols-3 gap-3 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            disabled={isPending}
                            className="h-14 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-xl font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors active:scale-95 flex items-center justify-center disabled:opacity-50"
                        >
                            {num}
                        </button>
                    ))}
                    <div /> {/* Empty slot */}
                    <button
                        onClick={() => handleKeyPress(0)}
                        disabled={isPending}
                        className="h-14 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-xl font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors active:scale-95 flex items-center justify-center disabled:opacity-50"
                    >
                        0
                    </button>
                    <button
                        onClick={handleBackspace}
                        disabled={isPending}
                        className="h-14 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-xl font-medium text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors active:scale-95 flex items-center justify-center disabled:opacity-50"
                    >
                        ⌫
                    </button>
                </div>

                {isPending && (
                    <p className="text-xs text-zinc-500 mt-5 animate-pulse">Verifying...</p>
                )}
            </GlassCard>
        </div>
    );
}
