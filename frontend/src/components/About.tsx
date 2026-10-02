import { useState } from "react";
import { motion } from "framer-motion";
import { profile, education, certifications } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education");

  return (
    <Section id="about" title="">
      <div className="relative space-y-16">
        {/* Subtle Cybernetic Blueprint Grid Ambient Background */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-10 opacity-30 bg-[linear-gradient(to_right,rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Ambient Cosmic Glow Backdrops */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] animate-pulseGlow" />
        <div className="pointer-events-none absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] animate-pulseGlow" />

        {/* PRIMARY HERO ROW: PORTRAIT CARD & QUOTE (LEFT) + BESPOKE ABOUT ME & DRIVES ME (RIGHT) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
          
          {/* LEFT COLUMN: HERO PORTRAIT CARD + QUOTE CARD */}
          <div className="lg:col-span-5 space-y-5">
            <Reveal x={-30}>
              {/* Main Portrait Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative rounded-3xl bg-panel/90 backdrop-blur-xl border border-cyan-400/30 hover:border-cyan-400/60 overflow-hidden shadow-[0_0_45px_rgba(34,211,238,0.14)] transition-all duration-300"
              >
                {/* Tech HUD Corner Brackets */}
                <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                {/* Top-Left Floating Badge: Stacked Roles */}
                <div className="absolute top-4 left-4 z-20 rounded-2xl bg-void/85 border border-white/10 px-3.5 py-2.5 backdrop-blur-md shadow-2xl">
                  <div className="space-y-0.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-300 uppercase leading-snug">
                    <div className="hover:text-cyan-300 transition-colors">DEVELOPER</div>
                    <div className="hover:text-cyan-300 transition-colors">LEARNER</div>
                    <div className="hover:text-cyan-300 transition-colors">PROBLEM SOLVER</div>
                  </div>
                </div>

                {/* Top-Right Floating Badge: EST. 2022 */}
                <div className="absolute top-4 right-4 z-20 rounded-xl bg-void/85 border border-white/10 px-3 py-1.5 text-[11px] font-mono text-cyan-300 font-semibold backdrop-blur-md shadow-xl">
                  EST. 2022
                </div>

                {/* Portrait Image Container */}
                <div className="relative aspect-[3.7/4.8] w-full overflow-hidden bg-void/70">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Bottom-Left Floating Badge: AVAILABLE FOR HIRE */}
                  <div className="absolute bottom-4 left-4 z-20 rounded-full bg-void/85 border border-emerald-500/40 px-3.5 py-1.5 flex items-center gap-2 backdrop-blur-md shadow-xl">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-mono font-semibold tracking-wide text-emerald-300 uppercase">
                      AVAILABLE FOR HIRE
                    </span>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Bottom Quote Card Below Portrait */}
            <Reveal x={-30} delay={0.15}>
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="rounded-2xl bg-panel/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/60 p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)] relative group transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xl font-serif mb-3 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                  “
                </div>
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed italic">
                  Turning ideas into real, scalable solutions.
                </p>
                <div className="w-12 h-[2px] bg-cyan-400/60 ml-auto mt-3 rounded-full group-hover:w-16 group-hover:bg-cyan-400 transition-all duration-300" />
              </motion.div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: ABOUT ME NARRATIVE, ROTATING BADGE, STAT CARDS & WHAT DRIVES ME */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Header Area: Tag, Giant Headline & Rotating Circular 3+ Years Stamp */}
            <div className="space-y-4">
              <Reveal delay={0.1}>
                {/* Category Header: —— ABOUT ME —— */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[1.5px] bg-cyan-400/70" />
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                    ABOUT ME
                  </span>
                  <span className="w-10 h-[1.5px] bg-cyan-400/70" />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-1">
                  {/* Giant Headline: PASSIONATE DEVELOPER BUILDING A BETTER TOMORROW */}
                  <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[42px] uppercase tracking-tight text-white leading-[1.12] max-w-xl">
                    PASSIONATE DEVELOPER BUILDING{" "}
                    <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                      A BETTER TOMORROW.
                    </span>
                  </h2>

                  {/* Rotating Circular 3+ Years Stamp & Vertical Spine */}
                  <div className="flex items-center gap-4 shrink-0 self-start sm:self-center">
                    {/* Rotating Circular Stamp */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Rotating Ring with SVG text */}
                      <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                      >
                        <path
                          id="circleStampPath"
                          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                          fill="none"
                        />
                        <text className="text-[7.5px] font-mono uppercase tracking-[2.4px] fill-slate-300 font-bold">
                          <textPath href="#circleStampPath">
                            • YEARS OF EXPERIENCE • FULL STACK DEV
                          </textPath>
                        </text>
                      </motion.svg>

                      {/* Orbiting Satellite Dot */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                      </motion.div>

                      {/* Static Center Core with 3+ */}
                      <div className="absolute inset-3 rounded-full border border-cyan-400/40 bg-void/90 backdrop-blur flex flex-col items-center justify-center shadow-[inset_0_0_15px_rgba(34,211,238,0.25)]">
                        <span className="font-display font-black text-2xl text-cyan-300 drop-shadow-[0_0_10px_#22d3ee]">
                          3+
                        </span>
                        <span className="font-mono text-[8px] text-slate-400 -mt-1 uppercase tracking-wider">
                          Years
                        </span>
                      </div>
                    </div>

                    {/* Vertical Spine: BUILD | LEARN | GROW | REPEAT */}
                    <div className="hidden sm:flex flex-col items-center justify-between h-24 text-[9px] font-mono tracking-widest text-slate-400 uppercase select-none">
                      <span>BUILD</span>
                      <span className="w-[1px] h-2.5 bg-slate-700" />
                      <span>LEARN</span>
                      <span className="w-[1px] h-2.5 bg-slate-700" />
                      <span>GROW</span>
                      <span className="w-[1px] h-2.5 bg-slate-700" />
                      <span>REPEAT</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Narrative Bio Paragraph */}
              <Reveal delay={0.2}>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
                  Hi, I'm <strong className="text-white font-semibold">Somasundaram</strong>, a Python Full Stack Developer who loves building modern web applications that solve real-world problems. I enjoy turning complex architectural challenges into clean, scalable, and user-friendly products. Always curious, always learning, and ready for the next engineering challenge.
                </p>
              </Reveal>
            </div>

            {/* Row of 4 Metric Stat Cards */}
            <Reveal delay={0.25}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                {/* Card 1: 6+ Projects Completed (Cyan) */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-panel/80 backdrop-blur border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-sm font-bold">
                    &lt;/&gt;
                  </div>
                  <div className="mt-4">
                    <div className="font-display font-black text-2xl sm:text-3xl text-white">6+</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Projects</div>
                    <div className="text-[11px] text-slate-400 font-mono">Completed</div>
                  </div>
                </motion.div>

                {/* Card 2: 3+ Years Experience (Emerald) */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-panel/80 backdrop-blur border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  </div>
                  <div className="mt-4">
                    <div className="font-display font-black text-2xl sm:text-3xl text-white">3+</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Years of</div>
                    <div className="text-[11px] text-slate-400 font-mono">Experience</div>
                  </div>
                </motion.div>

                {/* Card 3: 100% Commitment to Quality (Amber) */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-panel/80 backdrop-blur border border-amber-500/30 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.08)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm">
                    ★
                  </div>
                  <div className="mt-4">
                    <div className="font-display font-black text-2xl sm:text-3xl text-white">100%</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Commitment</div>
                    <div className="text-[11px] text-slate-400 font-mono">to Quality</div>
                  </div>
                </motion.div>

                {/* Card 4: 100% Containerized (Violet) */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-panel/80 backdrop-blur border border-violet-500/30 hover:border-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.08)] hover:shadow-[0_0_25px_rgba(167,139,250,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-400/10 border border-violet-400/30 flex items-center justify-center text-violet-300">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div className="mt-4">
                    <div className="font-display font-black text-2xl sm:text-3xl text-white">100%</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Production</div>
                    <div className="text-[11px] text-slate-400 font-mono">Containerized</div>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* WHAT DRIVES ME SECTION DIVIDER */}
            <Reveal delay={0.3}>
              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1.5px] bg-slate-600" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">
                    WHAT DRIVES ME
                  </span>
                  <span className="w-8 h-[1.5px] bg-slate-600" />
                </div>
              </div>
            </Reveal>

            {/* Row of 3 Value / Drive Cards */}
            <Reveal delay={0.35}>
              <div className="grid sm:grid-cols-3 gap-4 pt-1">
                {/* Card 1: SOLVE PROBLEMS */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-panel/80 backdrop-blur border border-amber-500/25 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.06)] hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                    💡
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                    SOLVE PROBLEMS
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    I enjoy breaking down complex problems and building simple, effective solutions.
                  </p>
                </motion.div>

                {/* Card 2: CONTINUOUS LEARNING */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-panel/80 backdrop-blur border border-cyan-500/25 hover:border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.06)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                    CONTINUOUS LEARNING
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    I'm always exploring new technologies and improving my skills.
                  </p>
                </motion.div>

                {/* Card 3: CREATE IMPACT */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-panel/80 backdrop-blur border border-violet-500/25 hover:border-violet-400 shadow-[0_0_25px_rgba(167,139,250,0.06)] hover:shadow-[0_0_25px_rgba(167,139,250,0.2)] transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.25)]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white">
                    CREATE IMPACT
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    I aim to build products that make a real difference in people's lives.
                  </p>
                </motion.div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* SECONDARY ROW: ACADEMIC & TECHNICAL PEDIGREE (EDUCATION & CERTIFICATIONS) */}
        <div className="pt-6 relative z-10">
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                  Academic & Technical Pedigree
                </span>
                <h3 className="font-display font-bold text-2xl text-slate-100 mt-1">
                  Education & Verified Credentials
                </h3>
              </div>
              
              {/* Tab Selector for Mobile / Compact Views */}
              <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("education")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "education"
                      ? "bg-cyan-400 text-void font-semibold shadow-[0_0_12px_#22d3ee]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Education ({education.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("certifications")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "certifications"
                      ? "bg-amber-400 text-void font-semibold shadow-[0_0_12px_#f59e0b]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Certifications ({certifications.length})
                </button>
              </div>
            </div>
          </Reveal>

          {/* Side-by-Side Cards on Desktop, Tabbed on Mobile */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Education Card */}
            <div className={`${activeTab === "education" ? "block" : "hidden md:block"}`}>
              <Reveal delay={0.25}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="h-full rounded-2xl bg-panel/80 backdrop-blur-xl border border-emerald-500/30 p-6 shadow-[0_0_30px_rgba(16,185,129,0.08)] relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-100">
                        Formal Education
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        Engineering Foundations
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400/50 before:to-emerald-400/10 pl-8">
                    {education.map((e) => (
                      <div key={e.degree} className="relative group">
                        {/* Glowing Timeline Dot */}
                        <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-void border-2 border-emerald-400 group-hover:scale-125 group-hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_8px_#10b981]" />
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-semibold text-slate-200 text-sm md:text-base group-hover:text-emerald-300 transition-colors">
                            {e.degree}
                          </h5>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                            {e.year}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-400 mt-1">
                          {e.school}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            </div>

            {/* Certifications Card */}
            <div className={`${activeTab === "certifications" ? "block" : "hidden md:block"}`}>
              <Reveal delay={0.3}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="h-full rounded-2xl bg-panel/80 backdrop-blur-xl border border-amber-500/30 p-6 shadow-[0_0_30px_rgba(245,158,11,0.08)] relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-100">
                        Certifications & Credentials
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        Verified Technical Proficiency
                      </p>
                    </div>
                  </div>

                  {/* Certifications List */}
                  <div className="space-y-4">
                    {certifications.map((c) => (
                      <motion.a
                        key={c.title}
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ x: 4 }}
                        className="group block p-3.5 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium text-sm text-slate-200 group-hover:text-amber-300 transition-colors">
                            {c.title}
                          </span>
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-amber-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-2 text-xs text-slate-400">
                          <span>{c.issuer}</span>
                          <span className="font-mono text-[11px] text-amber-400/90">{c.date}</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            </div>

          </div>
        </div>

      </div>
    </Section>
  );
}
