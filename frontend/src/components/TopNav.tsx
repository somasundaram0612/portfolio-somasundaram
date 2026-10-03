import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { profile } from "../data/portfolio";

interface NavItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "top",
    label: "Home",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.28 1.28L3 12l5.8 1.9a2 2 0 0 1 1.28 1.28L12 21l1.9-5.8a2 2 0 0 1 1.28-1.28L21 12l-5.8-1.9a2 2 0 0 1-1.28-1.28Z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

export default function TopNav() {
  const [active, setActive] = useState("top");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "about", "skills", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full-Width Header Bar (NOT box-type) */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          scrolled
            ? "bg-void/85 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-void/70 border-white/10"
        }`}
      >
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16 relative">
          
          {/* Brand Logo with User's Manual Yellow S */}
          <a
            href="#top"
            onClick={() => setActive("top")}
            className="flex items-center gap-2 group cursor-pointer select-none"
          >
            <div className="font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan-200 transition-colors flex items-center">
              <span className="text-amber-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all inline-block mr-0.5">
                S
              </span>
              <span>omasundaram</span>
            </div>
          </a>

          {/* Center Navigation Links with Smooth Animations, Icons & Gliding Active Glow */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    onClick={() => setActive(item.id)}
                    className="relative py-2 flex items-center gap-1.5 transition-colors duration-200 group select-none"
                  >
                    {/* Hover Soft Glow Backdrop */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.span
                          layoutId="navHoverBackdrop"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 -my-1 -mx-2.5 rounded-lg bg-white/[0.06] -z-10"
                        />
                      )}
                    </AnimatePresence>

                    {/* Animated Micro-Icon (Subtle slide & scale on hover/active) */}
                    <span
                      className={`transition-all duration-200 transform ${
                        isActive
                          ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_#22d3ee]"
                          : "text-slate-400 group-hover:text-cyan-300 group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </span>


                    {/* Nav Label */}
                    <span
                      className={`font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Gliding Active Neon Flare Underline */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute -bottom-1.5 inset-x-0 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]"
                      >
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                      </motion.span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Buttons (Preserving user's Let's Talk & CV with rich motion) */}
          <div className="flex items-center gap-3">
            {/* Shimmering Let's Talk Button with Amber Border */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden rounded-full border border-amber-400/80 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 px-4 sm:px-5 py-1.5 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              {/* Shimmer Sweep Animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out" />
              <span>Let's Talk</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.a>

            {/* CV Resume Button */}
            {/* <motion.a
              href={profile.resume}
              download="C SOMASUNDARAM.pdf"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/20 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-white/5 px-3.5 py-1.5 text-xs font-mono text-slate-300 transition-all shadow-sm"
              title="Download C SOMASUNDARAM Resume"
            >
              CV
            </motion.a> */}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Laser Reading Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="h-[2px] origin-left bg-gradient-to-r from-amber-400 via-cyan-400 to-violet-500 shadow-[0_0_12px_#22d3ee]"
        />
      </motion.header>

      {/* Mobile Drawer (Smooth Staggered Entrance) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden bg-void/95 backdrop-blur-2xl border-b border-cyan-500/30 p-5 shadow-[0_15px_30px_rgba(0,0,0,0.8)] space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActive(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? "bg-cyan-400/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-400/40"
                    }`}
                  >
                    <span className={isActive ? "text-cyan-400" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <a
                href={profile.resume}
                download="C SOMASUNDARAM.pdf"
                className="flex items-center gap-1.5 text-pink-300 hover:underline py-1"
              >
                <span>Download CV</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-amber-300 font-medium"
              >
                Let's Talk ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
