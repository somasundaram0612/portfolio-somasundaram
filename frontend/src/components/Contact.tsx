import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const QUICK_TOPICS = [
  { id: "hire", label: "💼 Hire Me", text: "Hi Somasundaram, we would like to discuss hiring you as a Python / Full Stack Developer for our engineering team." },
  { id: "interview", label: "🎯 Schedule Interview", text: "Hi Somasundaram, we reviewed your technical expertise in FastAPI, Django, and React and would like to schedule an interview." },
  { id: "discuss", label: "💬 Connect Directly", text: "Hi Somasundaram, impressed by your technical work and would like to connect with you directly." },
];

// RFC 5322 Compliant Email Regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Alphabets and spaces only regex
const NAME_REGEX = /^[a-zA-Z\s]+$/;

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", body: "" });
  const [touched, setTouched] = useState({ name: false, email: false, body: false });
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Real-time validations
  const isNameValid = f.name.trim().length >= 2 && NAME_REGEX.test(f.name.trim());
  const isEmailValid = EMAIL_REGEX.test(f.email.trim());
  const isBodyValid = f.body.trim().length >= 5 && f.body.length <= 3000;
  const isFormValid = isNameValid && isEmailValid && isBodyValid;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Check if user entered numbers or special characters
    if (/[^a-zA-Z\s]/.test(raw)) {
      setNameError("Only alphabets and spaces are allowed (no numbers or special characters).");
    } else {
      setNameError(null);
    }
    // Filter out any non-alphabet, non-space characters
    const filtered = raw.replace(/[^a-zA-Z\s]/g, "");
    setF((prev) => ({ ...prev, name: filtered }));

    if (filtered.trim().length >= 2) {
      setNameError(null);
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    if (!f.name.trim()) {
      setNameError("Name is required.");
    } else if (f.name.trim().length < 2) {
      setNameError("Name must be at least 2 characters.");
    } else if (!NAME_REGEX.test(f.name.trim())) {
      setNameError("Only alphabets and spaces are allowed (no numbers or special characters).");
    } else {
      setNameError(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setF((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      if (!val) {
        setEmailError("Email address is required.");
      } else if (!EMAIL_REGEX.test(val)) {
        setEmailError("Please enter a valid email address (e.g. name@domain.com).");
      } else {
        setEmailError(null);
      }
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    if (!f.email.trim()) {
      setEmailError("Email address is required.");
    } else if (!EMAIL_REGEX.test(f.email.trim())) {
      setEmailError("Please enter a valid email address (e.g. name@domain.com).");
    } else {
      setEmailError(null);
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setF((prev) => ({ ...prev, body: val }));
    if (touched.body) {
      if (!val.trim()) {
        setBodyError("Message cannot be empty.");
      } else if (val.trim().length < 5) {
        setBodyError("Message must be at least 5 characters.");
      } else {
        setBodyError(null);
      }
    }
  };

  const handleBodyBlur = () => {
    setTouched((prev) => ({ ...prev, body: true }));
    if (!f.body.trim()) {
      setBodyError("Message cannot be empty.");
    } else if (f.body.trim().length < 5) {
      setBodyError("Message must be at least 5 characters.");
    } else {
      setBodyError(null);
    }
  };

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSelectTopic = (topic: typeof QUICK_TOPICS[0]) => {
    setSelectedTopic(topic.id);
    setF((prev) => ({ ...prev, body: topic.text }));
    setBodyError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, body: true });

    if (!isFormValid) {
      if (!isNameValid) setNameError("Please enter a valid name (alphabets and spaces only).");
      if (!isEmailValid) setEmailError("Please enter a valid email address.");
      if (!isBodyValid) setBodyError("Message must be at least 5 characters.");
      return;
    }

    setState("sending");

    const payload = JSON.stringify({
      name: f.name.trim(),
      email: f.email.trim(),
      body: f.body.trim(),
    });

    const endpoints = import.meta.env.VITE_API_URL
      ? [import.meta.env.VITE_API_URL]
      : ["http://localhost:8000", "http://127.0.0.1:8000"];

    let success = false;
    for (const base of endpoints) {
      try {
        const response = await fetch(`${base}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });

        if (response.ok) {
          success = true;
          break;
        }
      } catch (err) {
        // Continue to fallback endpoint if available
      }
    }

    if (success) {
      setState("sent");
    } else {
      console.warn("Backend API dispatch failed on all endpoints, activating fallback mailto");
      setState("error");
    }
  };

  const openEmailClientFallback = () => {
    const subject = encodeURIComponent(`Message for Somasundaram C from ${f.name.trim() || "Visitor"}`);
    const bodyContent = encodeURIComponent(
      `${f.body.trim()}\n\n---\nSent by: ${f.name.trim()} (${f.email.trim()})\nVia Contact Form`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${bodyContent}`;
  };

  const resetForm = () => {
    setF({ name: "", email: "", body: "" });
    setTouched({ name: false, email: false, body: false });
    setNameError(null);
    setEmailError(null);
    setBodyError(null);
    setSelectedTopic(null);
    setState("idle");
  };

  return (
    <Section id="contact" title="Contact">
      <div className="relative">
        {/* Ambient Cosmic Glow Backdrops */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] animate-pulseGlow" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px] animate-pulseGlow" />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start relative z-10">
          
          {/* LEFT COLUMN: Interactive Comm Station */}
          <div className="space-y-6">
            <Reveal>
              <div className="space-y-4">
                {/* Live Availability Radar Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.18)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                  </span>
                  <span>Send a message · Get in touch</span>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                  Ready to contribute to your engineering team. Reach out directly or dispatch a transmission below.
                </p>
              </div>
            </Reveal>

            {/* Interactive Channels List */}
            <div className="space-y-3.5 pt-2">
              
              {/* Direct Email Card - Opens Email Client on Click */}
              <Reveal delay={0.1}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative rounded-2xl bg-panel/70 backdrop-blur-md border border-white/10 hover:border-cyan-400/60 p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <a
                      href={`mailto:${profile.email}?subject=Message%20for%20Somasundaram%20C`}
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                      title="Click to open your email client"
                    >
                      <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-void group-hover:shadow-[0_0_16px_#22d3ee] transition-all duration-300">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                          Direct Email
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        </span>
                        <p className="text-sm md:text-base font-medium text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                          {profile.email}
                        </p>
                      </div>
                    </a>

                    {/* Copy to Clipboard Button with stopPropagation */}
                    <button
                      type="button"
                      onClick={copyEmail}
                      title="Copy email address"
                      className="relative px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 shrink-0 z-10"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            className="flex items-center gap-1 text-emerald-400 font-semibold"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            className="flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              </Reveal>

              {/* GitHub Card - Working External Link */}
              <Reveal delay={0.16}>
                <motion.a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-center justify-between rounded-2xl bg-panel/70 backdrop-blur-md border border-white/10 hover:border-violet-400/60 p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.2)]"
                  title="Open Somasundaram's GitHub profile"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center text-violet-300 group-hover:bg-violet-400 group-hover:text-void group-hover:shadow-[0_0_16px_#a78bfa] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Repositories</span>
                      <p className="text-sm md:text-base font-medium text-slate-100 group-hover:text-violet-300 transition-colors">
                        github.com/somasundaram0612
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-violet-300">
                    <span>Explore</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </div>
                </motion.a>
              </Reveal>

              {/* LinkedIn Card - Working External Link */}
              <Reveal delay={0.22}>
                <motion.a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-center justify-between rounded-2xl bg-panel/70 backdrop-blur-md border border-white/10 hover:border-blue-400/60 p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                  title="Connect on LinkedIn"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300 group-hover:bg-blue-400 group-hover:text-void group-hover:shadow-[0_0_16px_#38bdf8] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.25c-.89 0-1.61.72-1.61 1.61a1.61 1.61 0 0 0 1.61 1.61c.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Professional Network</span>
                      <p className="text-sm md:text-base font-medium text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                        linkedin.com/in/soma-sundaram-376254203
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-blue-300">
                    <span>Connect</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </div>
                </motion.a>
              </Reveal>

              {/* Download Resume Card */}
              <Reveal delay={0.28}>
                <motion.a
                  href={profile.resume}
                  download="SOMASUNDARAM C.pdf"
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-center justify-between rounded-2xl bg-panel/70 backdrop-blur-md border border-white/10 hover:border-pink-400/60 p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,114,182,0.2)]"
                  title="Download SOMASUNDARAM C Resume"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-300 group-hover:bg-pink-400 group-hover:text-void group-hover:shadow-[0_0_16px_#f472b6] transition-all duration-300">
                      <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Verified Credentials</span>
                      <p className="text-sm md:text-base font-medium text-slate-100 group-hover:text-pink-300 transition-colors">
                        Download Full Resume
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                      PDF
                    </span>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-pink-300 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </div>
                </motion.a>
              </Reveal>
            </div>

            {/* Space Telemetry / Location opens Google Maps */}
            <Reveal delay={0.34}>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/5">
                {/* Working Google Maps Link */}
                <a
                  href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Click to view Chennai, India on Google Maps"
                >
                  <svg className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="group-hover:underline underline-offset-4">{profile.location} (IST / UTC+5:30)</span>
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                  </svg>
                </a>

                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-1 h-1.5 rounded-sm bg-cyan-400"></span>
                    <span className="w-1 h-2 rounded-sm bg-cyan-400"></span>
                    <span className="w-1 h-3 rounded-sm bg-cyan-400"></span>
                    <span className="w-1 h-3.5 rounded-sm bg-cyan-400/50"></span>
                  </div>
                  <span className="font-mono text-cyan-300/80">Signal: 98% Strong</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Futuristic Cosmic Terminal Form */}
          <Reveal delay={0.2} x={25}>
            <div className="relative rounded-3xl bg-panel/90 backdrop-blur-xl border border-cyan-400/30 p-6 md:p-8 shadow-[0_0_50px_rgba(34,211,238,0.12)] overflow-hidden">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                  <span className="ml-2 font-mono text-[11px] text-slate-400 tracking-wider">
                    TRANSMISSION_TERMINAL // SECURE_PORT
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="font-mono text-[10px] text-cyan-300 font-medium">READY</span>
                </div>
              </div>

              {/* Form Content / State View */}
              <AnimatePresence mode="wait">
                {state === "sent" ? (
                  /* CELEBRATORY SUCCESS STATE */
                  <motion.div
                    key="sent-view"
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -15 }}
                    transition={{ duration: 0.45 }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-400/50 blur-sm"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="relative w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_30px_#10b981]"
                      >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-slate-100">
                        Transmission Received!
                      </h3>
                      <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="text-cyan-300 font-medium">{f.name || "Friend"}</span>. Your message has been routed for delivery to <span className="text-cyan-300 font-mono text-xs">{profile.email}</span>. I will reply within 24 hours.
                      </p>
                    </div>

                    {/* Additional action: Open in user's email client directly */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={openEmailClientFallback}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/40 text-xs font-mono text-cyan-300 transition-colors shadow-sm"
                        title="Open a pre-filled draft in your mail app"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Open In Email App
                      </button>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-slate-200 transition-colors shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M8 16H3v5" />
                        </svg>
                        Send Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* INTERACTIVE FORM STATE */
                  <motion.form
                    key="form-view"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Quick Topic Chips */}
                    {/* Auto Message / Quick Topic Chips */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <span className="text-cyan-400">⚡</span>
                          <span>Auto Message</span>
                        </label>
                        <span className="text-[10px] font-mono text-cyan-300/80">Click to auto-fill</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_TOPICS.map((topic) => (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => handleSelectTopic(topic)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                              selectedTopic === topic.id
                                ? "bg-cyan-400/25 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-200"
                            }`}
                          >
                            <span>{topic.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input: Your Name (STRICT VALIDATION: Alphabets and spaces only) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                        <span>Your Name</span>
                        {isNameValid ? (
                          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Valid Name
                          </span>
                        ) : touched.name && nameError ? (
                          <span className="text-[11px] text-rose-400 font-mono">Invalid</span>
                        ) : null}
                      </label>
                      <div
                        className={`relative rounded-xl border transition-all duration-200 ${
                          nameError && touched.name
                            ? "border-rose-400/80 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : activeField === "name"
                            ? "border-cyan-400 bg-white/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            : isNameValid
                            ? "border-emerald-500/40 bg-white/5"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className={`w-4 h-4 transition-colors ${activeField === "name" ? "text-cyan-300" : nameError ? "text-rose-400" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          required
                          value={f.name}
                          onFocus={() => setActiveField("name")}
                          onBlur={handleNameBlur}
                          onChange={handleNameChange}
                          placeholder="e.g. Alex Morgan"
                          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
                        />
                      </div>
                      {nameError && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                          <span>{nameError}</span>
                        </p>
                      )}
                    </div>

                    {/* Input: Email (STRICT FORMAT VALIDATION) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                        <span>Your Email Address</span>
                        {isEmailValid ? (
                          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Valid Email
                          </span>
                        ) : touched.email && emailError ? (
                          <span className="text-[11px] text-rose-400 font-mono">Invalid format</span>
                        ) : null}
                      </label>
                      <div
                        className={`relative rounded-xl border transition-all duration-200 ${
                          emailError && touched.email
                            ? "border-rose-400/80 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : activeField === "email"
                            ? "border-cyan-400 bg-white/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            : isEmailValid
                            ? "border-emerald-500/40 bg-white/5"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className={`w-4 h-4 transition-colors ${activeField === "email" ? "text-cyan-300" : emailError ? "text-rose-400" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          required
                          value={f.email}
                          onFocus={() => setActiveField("email")}
                          onBlur={handleEmailBlur}
                          onChange={handleEmailChange}
                          placeholder="alex@company.com"
                          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
                        />
                      </div>
                      {emailError && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                          <span>{emailError}</span>
                        </p>
                      )}
                    </div>

                    {/* Input: Message */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                        <span>Message Payload</span>
                        <div className="flex items-center gap-3">
                          {!f.body && (
                            <button
                              type="button"
                              // onClick={() => handleSelectTopic(QUICK_TOPICS[0])}
                              className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200  flex items-center gap-1 cursor-pointer"
                            >
                              <span>⚡ Auto-fill template</span>
                            </button>
                          )}
                          {/* <span className={`font-mono text-[11px] ${f.body.length > 2800 ? "text-amber-400" : "text-slate-400"}`}>
                            {f.body.length} / 3000
                          </span> */}
                        </div>
                      </div>
                      <div
                        className={`relative rounded-xl border transition-all duration-200 ${
                          bodyError && touched.body
                            ? "border-rose-400/80 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : activeField === "body"
                            ? "border-cyan-400 bg-white/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            : isBodyValid
                            ? "border-emerald-500/40 bg-white/5"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <textarea
                          required
                          rows={4}
                          value={f.body}
                          onFocus={() => setActiveField("body")}
                          onBlur={handleBodyBlur}
                          onChange={handleBodyChange}
                          placeholder="Write your message, role details, or questions..."
                          className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
                        />
                      </div>
                      {bodyError && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                          <span>{bodyError}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={state === "sending" || !isFormValid}
                      whileHover={isFormValid ? { scale: 1.02, y: -2 } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 text-void font-semibold py-3.5 px-6 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.65)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2.5"
                    >
                      {/* Animated Shimmer Stripe */}
                      <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

                      {state === "sending" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-void" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Transmitting to Inbox…</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    {/* Resilient Error & Direct Mail Client Fallback */}
                    <AnimatePresence>
                      {state === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-xs text-rose-300 space-y-2.5"
                        >
                          <div className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            <div className="space-y-1">
                              <p className="font-semibold text-rose-200">Backend server is offline or unreachable.</p>
                              <p className="text-slate-300">
                                No worries — click below to send your pre-filled message directly via your email client to <strong className="text-cyan-300">{profile.email}</strong>:
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1 pl-6">
                            <button
                              type="button"
                              onClick={openEmailClientFallback}
                              className="px-4 py-2 rounded-lg bg-cyan-400 text-void font-semibold text-xs hover:bg-cyan-300 transition-colors shadow-sm flex items-center gap-1.5"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                              Open in Email App
                            </button>
                            <button
                              type="button"
                              onClick={submit}
                              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition-colors"
                            >
                              Retry API
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Guarantee / Delivery note */}
                    <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                      <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Direct delivery to {profile.email} • 24h response guaranteed</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
