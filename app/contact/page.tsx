"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "mhardjadinat@wisc.edu",
        href: "mailto:mhardjadinat@wisc.edu",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (425) 766-7568",
        href: "tel:+14257667568",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Madison, WI",
        href: "https://maps.google.com/?q=Madison,WI",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus({ type: null, message: "" });

        // Simulate network request delays for the form
        setTimeout(() => {
            setSubmitStatus({
                type: "success",
                message: "Message sent successfully! I'll get back to you soon.",
            });
            setFormData({ name: "", email: "", message: "" });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="py-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-zinc-100">
                        Let's build{" "}
                        <span className="font-serif italic font-normal text-zinc-400">
                            something great.
                        </span>
                    </h2>
                    <p className="text-zinc-400">
                        Have an open role or a system architecture project in mind? I'd love to hear about it. Send me a message
                        and let's discuss how we can work together.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Main Form Area */}
                    <GlassCard className="p-8 border-zinc-800/50 bg-black/40 shadow-2xl" animateHover={false}>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Your name..."
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Your message..."
                                    className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-zinc-100 placeholder:text-zinc-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative group overflow-hidden rounded-xl bg-primary/10 border border-primary/50 text-primary font-medium py-3 px-8 transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,112,243,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>Sending Payload...</>
                                ) : (
                                    <>
                                        Transmit Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {submitStatus.type && (
                                <div
                                    className={`flex items-center gap-3 p-4 rounded-xl ${submitStatus.type === "success"
                                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                                        }`}
                                >
                                    {submitStatus.type === "success" ? (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <p className="text-sm">{submitStatus.message}</p>
                                </div>
                            )}
                        </form>
                    </GlassCard>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        <GlassCard className="p-8 border-zinc-800/50 bg-white/5" animateHover={false}>
                            <h3 className="text-xl font-semibold mb-6 text-zinc-100">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900/50 transition-colors group border border-transparent hover:border-zinc-800"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-zinc-500">
                                                {item.label}
                                            </div>
                                            <div className="font-medium text-zinc-200">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Availability Card */}
                        <GlassCard className="p-8 border border-primary/30 bg-primary/5" animateHover={false}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                <span className="font-medium text-zinc-200">Currently Available</span>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                I am currently open to new post-graduation opportunities, full-time AI/ML Engineering roles, and embedded systems architecture projects. Let's talk!
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
