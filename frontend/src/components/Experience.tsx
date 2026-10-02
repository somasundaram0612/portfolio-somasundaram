import { motion } from "framer-motion";
import { experience } from "../data/portfolio";
import Section from "./Section"; import Reveal from "./Reveal";
// Vertical line draws itself on scroll; each entry slides in alternately.
export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative pl-8 md:pl-0">
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          className="absolute left-2 md:left-1/2 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500" />
        <div className="space-y-12">
          {experience.map((e, i) => (
            <Reveal key={e.role + i} x={i % 2 ? 40 : -40}>
              <div className={`relative md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"}`}>
                <span className="absolute -left-[30px] md:left-auto md:-right-1.5 top-2 h-3 w-3 rounded-full"
                  style={{ background: e.color, boxShadow: `0 0 14px ${e.color}`, ...(i % 2 ? { left: "-6px", right: "auto" } : {}) }} />
                <div className="rounded-2xl bg-panel/80 p-6" style={{ border: `1px solid ${e.color}66` }}>
                  <div className="text-sm text-slate-400">{e.period}</div>
                  <h3 className="font-display text-xl" style={{ color: e.color }}>{e.role} · {e.company}</h3>
                  <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
