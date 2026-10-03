import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

// Thematic Visual Banner for each project
function ProjectBanner({ title, color }: { title: string; color: string }) {
  // 1. IraConnect.ai — Neural AI & Cloud Pipeline
  if (title === "IraConnect.ai") {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#0b192e] to-panel overflow-hidden">
        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#22d3ee22,transparent_70%)]" />
        
        {/* Subtle Cybernetic Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#22d3ee22_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee22_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Central Neural AI Hub */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
            <div className="absolute -inset-3 rounded-2xl bg-cyan-500/20 blur-xl animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_#22d3ee44]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4Z" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
              </svg>
            </div>
          </div>

          {/* Floating Neural Synapses / Badges */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              NEURAL_API
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
              DOCKER_CI/CD
            </span>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
          AI & CLOUD
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          ENTERPRISE
        </div>
      </div>
    );
  }

  // 2. AshanaTravels — Global Travel & WhatsApp Cloud Messaging
  if (title === "AshanaTravels") {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1f0b24] to-panel overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f472b622,transparent_70%)]" />
        
        {/* Animated Flight Path Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 300 160">
          <path d="M20 140 Q 150 20 280 140" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Central Travel & WhatsApp Scene */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
            <div className="absolute -inset-3 rounded-2xl bg-pink-500/20 blur-xl animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-pink-400/60 flex items-center justify-center text-pink-300 shadow-[0_0_25px_#f472b644]">
              {/* Globe with Flight Symbol */}
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
                <path d="m16 8 3-3m0 0-3-1m3 1-1 3" />
              </svg>
            </div>
          </div>

          {/* Floating WhatsApp API Badge */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300">
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
              </svg>
              WHATSAPP_API
            </span>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-[10px] font-mono text-pink-300">
              ITINERARIES
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-pink-400/40 text-[10px] font-mono text-pink-300">
          TRAVEL & CHAT
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          ACTIVE
        </div>
      </div>
    );
  }

  // 3. SPARC — Fintech & Modern E-Commerce
  if (title === "SPARC") {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#180f2b] to-panel overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#a78bfa22,transparent_70%)]" />
        
        {/* Subtle Financial Chart Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Central Fintech Card Symbol */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
            <div className="absolute -inset-3 rounded-2xl bg-violet-500/20 blur-xl animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-violet-400/60 flex items-center justify-center text-violet-300 shadow-[0_0_25px_#a78bfa44]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
                <circle cx="7" cy="15" r="1.5" />
                <path d="M14 15h4" />
              </svg>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-[10px] font-mono text-violet-300">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              FINTECH_ENGINE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
              REACT_TS
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-violet-400/40 text-[10px] font-mono text-violet-300">
          BANKING & COMMERCE
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-violet-300">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          SECURE
        </div>
      </div>
    );
  }

  // 4. Food Delivery App — On-Demand Route & Logistics
  if (title === "Food Delivery App") {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#261505] to-panel overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b22,transparent_70%)]" />

        {/* GPS Map Pathways */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 300 160">
          <path d="M40 30 L110 30 L110 120 L260 120" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="260" cy="120" r="4" fill="#f59e0b" />
        </svg>

        {/* Central Culinary & Route Symbol */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
            <div className="absolute -inset-3 rounded-2xl bg-amber-500/20 blur-xl animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-[0_0_25px_#f59e0b44]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4V2" />
                <path d="M18 10a6 6 0 0 0-12 0" />
                <rect width="20" height="2" x="2" y="16" rx="1" />
                <path d="M4 18v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              GEO_DISPATCH
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
              DJANGO_REST
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-amber-400/40 text-[10px] font-mono text-amber-300">
          LOGISTICS & GPS
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          MULTI-ROLE
        </div>
      </div>
    );
  }

  // 5. E-Commerce Web App — Digital Retail Storefront
  if (title === "E-Commerce Web App") {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#071f16] to-panel overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98122,transparent_70%)]" />

        {/* Central Shopping & Cart Symbol */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
            <div className="absolute -inset-3 rounded-2xl bg-emerald-500/20 blur-xl animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shadow-[0_0_25px_#10b98144]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300">
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              CHECKOUT_FLOW
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
              MYSQL_AUTH
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-300">
          RETAIL COMMERCE
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          VERIFIED
        </div>
      </div>
    );
  }

  // 6. Learning Management System (LMS) — Academy & Video Stream
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#091b2c] to-panel overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#38bdf822,transparent_70%)]" />

      {/* Central Academy Mortarboard & Video Symbol */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
          <div className="absolute -inset-3 rounded-2xl bg-sky-500/20 blur-xl animate-pulseGlow" />
          <div className="relative h-16 w-16 rounded-2xl bg-panel/90 border border-sky-400/60 flex items-center justify-center text-sky-300 shadow-[0_0_25px_#38bdf844]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-[10px] font-mono text-sky-300">
            <svg className="w-3 h-3 text-sky-400 fill-current" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            VIDEO_LESSONS
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
            ASSESSMENTS
          </span>
        </div>
      </div>

      <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-void/80 border border-sky-400/40 text-[10px] font-mono text-sky-300">
        EDTECH & STREAMING
      </div>
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-void/80 border border-white/10 text-[10px] font-mono text-sky-300">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        STUDENT LMS
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "fastapi" | "django">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "fastapi") return p.tags.some((t) => t.toLowerCase().includes("fastapi"));
    if (filter === "django") return p.tags.some((t) => t.toLowerCase().includes("django"));
    return true;
  });

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-8">
        
        {/* Filter Controls Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
            <p className="text-slate-300 text-sm md:text-base max-w-xl">
              Production platforms, microservices, and modern web applications built across FastAPI, Django, React, and Docker.
            </p>

            {/* Filter Pills */}
            <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === "all"
                    ? "bg-cyan-400 text-void font-semibold shadow-[0_0_12px_#22d3ee]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("fastapi")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === "fastapi"
                    ? "bg-cyan-400 text-void font-semibold shadow-[0_0_12px_#22d3ee]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                FastAPI & React
              </button>
              <button
                type="button"
                onClick={() => setFilter("django")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === "django"
                    ? "bg-amber-400 text-void font-semibold shadow-[0_0_12px_#f59e0b]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Django & REST
              </button>
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TiltCard color={p.color} className="h-full flex flex-col group">
                  
                  {/* High-Tech Project-Related Scene Banner */}
                  <div className="relative h-44 -mx-6 -mt-6 mb-5 rounded-t-2xl overflow-hidden border-b border-white/10">
                    <ProjectBanner title={p.title} color={p.color} />
                  </div>

                  {/* Title & Glowing Status Dot */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-xl tracking-tight" style={{ color: p.color }}>
                      {p.title}
                    </h3>
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-slate-300 text-sm leading-relaxed flex-1">
                    {p.desc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300 hover:border-white/20 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Bar */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="font-mono text-[11px]">Production Build</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors underline underline-offset-4"
                        >
                          Code
                        </a>
                      ) : null}
                      {p.live ? (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors underline underline-offset-4"
                        >
                          Live
                        </a>
                      ) : null}
                      {!p.github && !p.live ? (
                        <span className="font-mono text-[11px] text-slate-400/80 flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Production Project
                        </span>
                      ) : null}
                    </div>
                  </div>

                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </Section>
  );
}
