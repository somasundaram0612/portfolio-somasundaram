import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile, sections } from "../data/portfolio";

export default function TopNav() {
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    sections.forEach((s) => {
      const n = document.getElementById(s);
      n && io.observe(n);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-void/75 border-b border-white/10">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        {/* Brand / Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <div className="font-display font-black text-lg text-white tracking-wide group-hover:text-cyan-300 transition-colors">
              <span className="text-amber-400">S</span>omasundaram
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
              BUILDING DIGITAL EXPERIENCES
            </span>
          </div>
        </a>

        {/* Numbered Navigation Links */}
        <ul className="hidden lg:flex items-center gap-7 text-xs font-mono">
          <li>
            <a
              href="#top"
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <span className="text-[10px] text-slate-500">01</span>
              <span className="capitalize font-sans font-medium text-sm">Home</span>
            </a>
          </li>
          {sections.map((s, idx) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={`transition-colors flex items-center gap-1.5 ${
                  active === s ? "text-cyan-300 font-semibold" : "text-slate-400 hover:text-cyan-300"
                }`}
              >
                <span className="text-[10px] text-slate-500 font-mono">
                  {String(idx + 2).padStart(2, "0")}
                </span>
                <span className="capitalize font-sans font-medium text-sm">
                  {s === "contact" ? "Hire Me" : s}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full border border-amber-400/80 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 px-4 py-1.5 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
          >
            <span>Let's Talk</span>
            <span className="text-sm">↗</span>
          </a>
          <a
            href={profile.resume}
            target="_blank"
            className="hidden sm:inline-block rounded-full border border-white/20 hover:border-cyan-400/60 px-3.5 py-1.5 text-xs text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all font-mono"
          >
            CV
          </a>
        </div>
      </nav>
      <motion.div
        style={{ scaleX: bar }}
        className="h-0.5 origin-left bg-gradient-to-r from-amber-400 via-cyan-400 to-violet-500"
      />
    </header>
  );
}
