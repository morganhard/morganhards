"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Morgan's ability to seamlessly integrate high-power Edge AI with low-power physical systems is outstanding. His work on the CAR 2 steering telemetry fundamentally improved our race strategy.",
        author: "Alex V.",
        role: "Engineering Lead, Badger Solar Racing"
    },
    {
        quote: "Deploying the Hybrid Search RAG Architecture for our EFA diagnostics increased lab productivity by 30%. Morgan doesn't just write code; he architects scalable intelligence.",
        author: "Sarah J.",
        role: "Senior Manager, Infineon Technologies"
    },
    {
        quote: "The autonomous CV agent developed by Morgan brought our DJI drone tracking to a commercial grade. His intuition for computer vision and Python optics is top-tier.",
        author: "David L.",
        role: "Project Director, Badger Drone Club"
    }
];

export function TestimonialsCarousel() {
    const [activeIdx, setActiveIdx] = useState(0);

    const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
    const previous = () => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="py-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-200">Testimonials</h2>
                <p className="text-zinc-500 mt-2">Feedback from leaders and team members across the industry.</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="bg-white/5 border border-zinc-200/20 dark:bg-black/40 dark:border-zinc-800/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl relative">
                    <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,112,243,0.3)]">
                        <Quote className="w-5 h-5 text-primary" />
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4 text-zinc-200 min-h-[120px]">
                        "{testimonials[activeIdx].quote}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border-2 border-primary/30">
                            {testimonials[activeIdx].author.charAt(0)}
                        </div>
                        <div>
                            <div className="font-semibold text-zinc-100">{testimonials[activeIdx].author}</div>
                            <div className="text-sm text-zinc-500">{testimonials[activeIdx].role}</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={previous}
                        className="p-3 rounded-full bg-white/5 border border-zinc-800 hover:bg-primary/10 hover:border-primary/50 transition-all text-zinc-400 hover:text-primary focus:outline-none"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${idx === activeIdx ? "w-8 bg-primary shadow-[0_0_8px_rgba(0,112,243,0.8)]" : "bg-zinc-700 hover:bg-zinc-500"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="p-3 rounded-full bg-white/5 border border-zinc-800 hover:bg-primary/10 hover:border-primary/50 transition-all text-zinc-400 hover:text-primary focus:outline-none"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
