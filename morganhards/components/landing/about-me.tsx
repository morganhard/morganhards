"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Users, Cpu } from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Clean Logic",
        description: "Writing maintainable, scalable code architectures that bridge low-level systems and high-level cloud apps.",
    },
    {
        icon: Rocket,
        title: "Performance",
        description: "Optimizing for speed, minimizing computational overhead from embedded devices to the cloud.",
    },
    {
        icon: Users,
        title: "Orchestration",
        description: "Fusing AI agents together to automate complex analytical pipelines and engineering tasks.",
    },
    {
        icon: Cpu,
        title: "Hardware Integration",
        description: "Seamlessly interfacing advanced machine learning models with physical microcontrollers and edge hardware.",
    },
];

export function AboutMe() {
    return (
        <div className="py-20 relative overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-200">About Me</h2>
                <p className="text-zinc-500 mt-2">Building the future, one intelligent system at a time.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 text-zinc-400 text-lg leading-relaxed"
                    >
                        <p>
                            I am a passionate data science and AI engineering student driven by the challenge of bridging software intelligence with physical operations. My journey has continually pushed the boundaries between the digital cloud and raw compute on the edge.
                        </p>
                        <p>
                            I specialize in deploying multimodal LLM agents, optimizing complex Retrieval-Augmented Generation architectures, and engineering robust C++ firmware for autonomous hardware like drones and solar racing cars.
                        </p>
                        <p>
                            Whether it is orchestrating thousands of microcontrollers or writing elegant UI code, I approach every engineering block with precision and scalable intent.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-zinc-200/20 dark:bg-black/40 dark:border-zinc-800/50 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-lg font-medium italic text-zinc-200 relative z-10">
                            "My mission is to engineer infrastructures that don't just compute data, but orchestrate intelligence smoothly across both software and physical planes."
                        </p>
                    </motion.div>
                </div>

                {/* Right Column - Highlights */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {highlights.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-white/5 border border-zinc-200/20 dark:bg-[#0a0a0a]/80 dark:border-zinc-800/50 backdrop-blur-md p-6 rounded-2xl hover:bg-zinc-900/80 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-zinc-200">{item.title}</h3>
                            <p className="text-sm text-zinc-400">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
