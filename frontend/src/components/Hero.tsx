import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, orbit } from "../data/portfolio";

const ROLES = [
  "Python Full Stack Developer",
  "FastAPI & Django Specialist",
  "React & TypeScript Architect",
  "Cloud & Containerization (Docker)",
];

const HIGHLIGHTS = [
  { label: "Python", color: "#facc15" },
  { label: "FastAPI", color: "#10b981" },
  { label: "React", color: "#22d3ee" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "PostgreSQL", color: "#a78bfa" },
  { label: "Docker", color: "#38bdf8" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      {/* Subtle Cosmic Ambient Glow for the Hero Name side */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] animate-pulseGlow" />

      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* NAME SIDE (LEFT) — Upgraded with Rich Animations, Interactive Chips & Micro-Interactions */}
        <div className="space-y-6">
          
          {/* Top Live Availability Radar Chip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            {/* <span className="tracking-wide">AVAILABLE FOR HIRE</span> */}
          </motion.div>

          {/* Somasundaram C Animated Heading with Particle Drop Shadow */}
          <div className="relative">
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-5xl leading-[1.08] tracking-tight" aria-label={profile.name}>
              {profile.name.split(" ").map((word, w) => (
                <span key={w} className="inline-block whitespace-nowrap mr-3.5">
                  {word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      className={`inline-block transition-colors duration-300 ${
                        word === "C" ? "text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]" : "text-white hover:text-cyan-200"
                      }`}
                      initial={{ opacity: 0, y: 35, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + (w * 12 + i) * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          {/* Dynamic Rotating Role Title with Code Prompt Indicator */}
          <div className="h-10 sm:h-12 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-display font-semibold"
              >
                <span className="text-cyan-400 font-mono text-lg select-none">&gt;_</span>
                <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                  {ROLES[roleIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tagline Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed"
          >
            Engineering robust <span className="text-slate-100 font-medium">FastAPI & Django</span> backends paired with dynamic <span className="text-slate-100 font-medium">React & TypeScript</span> frontends — architected for clean scale, secure APIs, and rapid deployment.
          </motion.p>

          {/* Quick Core Tech Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            {HIGHLIGHTS.map((tech) => (
              <span
                key={tech.label}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/[0.08] transition-all cursor-default flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                {tech.label}
              </span>
            ))}
          </motion.div>

          {/* Advanced Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            {/* Primary Action Button */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 text-void font-semibold px-7 py-3.5 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] transition-all flex items-center gap-2"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <span>Explore Projects</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>

            {/* Secondary Action Button - Hire Me */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-panel/80 hover:bg-white/10 border border-white/20 hover:border-cyan-300/60 px-6 py-3.5 text-slate-200 hover:text-cyan-300 font-medium transition-all backdrop-blur flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Let's Connect</span>
            </motion.a>

            {/* Resume Button */}
            <motion.a
              href={profile.resume}
              download="C SOMASUNDARAM.pdf"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/50 px-4 py-3.5 text-xs font-mono text-slate-300 hover:text-pink-300 transition-all flex items-center gap-1.5"
              title="Download C SOMASUNDARAM Resume"
            >
              <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links & Location Quick Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400"
          >
            <div className="flex items-center gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 flex items-center justify-center text-slate-300 hover:text-violet-300 transition-all shadow-sm"
                title="GitHub Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 flex items-center justify-center text-slate-300 hover:text-blue-300 transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.25c-.89 0-1.61.72-1.61 1.61a1.61 1.61 0 0 0 1.61 1.61c.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61z" />
                </svg>
              </a>
              <a
                href={`mailto:${profile.email}?subject=Hire%20Somasundaram%20C`}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                title="Send Email to Somasundaram C"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            <a
              href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
              title="View Chennai, India on Google Maps"
            >
              <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{profile.location}</span>
            </a>
          </motion.div>

        </div>

        {/* IMAGE SIDE (RIGHT) — High-Precision Cosmic Orbit & Photo Framing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="hero-orbit-container relative mx-auto flex items-center justify-center w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] md:w-[460px] md:h-[460px] select-none"
        >
          {/* Cosmic Ambient Glow Backdrop */}
          <div className="pointer-events-none absolute h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 rounded-full bg-violet-600/25 blur-3xl animate-pulseGlow" />

          {/* Faint Solid Orbit Track Line */}
          <div
            className="pointer-events-none absolute rounded-full border border-violet-400/20"
            style={{
              width: "calc(var(--orbit-radius) * 2)",
              height: "calc(var(--orbit-radius) * 2)",
            }}
          />

          {/* Precision Dashed Orbit Gyro Ring */}
          <div
            className="pointer-events-none absolute rounded-full border border-dashed border-cyan-400/40 animate-orbit"
            style={{
              width: "calc(var(--orbit-radius) * 2)",
              height: "calc(var(--orbit-radius) * 2)",
            }}
          />

          {/* Profile Picture with Cosmic Halo */}
          <div className="relative z-10 rounded-full p-1 bg-gradient-to-tr from-cyan-400/50 via-violet-500/40 to-pink-500/50 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-36 w-36 sm:h-44 sm:w-44 md:h-56 md:w-56 rounded-full object-cover object-top border-2 border-cyan-300/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Orbiting Technical Skills Array — Mathematically Centered (0px Wobble / Zero Overlap) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-orbit">
            {orbit.map((o, i) => {
              const a = (360 / orbit.length) * i;
              return (
                <div
                  key={o.label}
                  className="absolute top-1/2 left-1/2 w-0 h-0"
                  style={{
                    transform: `rotate(${a}deg) translateX(var(--orbit-radius)) rotate(${-a}deg)`,
                  }}
                >
                  {/* Counter-rotation to keep chip upright at all angles with 0 0 origin */}
                  <div
                    className="w-0 h-0 animate-orbitRev pointer-events-auto"
                    style={{ transformOrigin: "0 0" }}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2">
                      <span
                        className="block whitespace-nowrap rounded-xl bg-panel/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium cursor-pointer shadow-lg transition-all duration-200 hover:scale-115 hover:border-cyan-300 select-none"
                        style={{
                          border: `1px solid ${o.color}`,
                          boxShadow: `0 0 16px ${o.color}55`,
                        }}
                      >
                        {o.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
