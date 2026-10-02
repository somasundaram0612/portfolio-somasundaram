import { skills } from "../data/portfolio";
import Section from "./Section"; import Reveal from "./Reveal"; import TiltCard from "./TiltCard";
export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <TiltCard color={g.color} className="h-full">
              <h3 className="font-display text-xl mb-4" style={{ color: g.color }}>{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => <span key={s} className="rounded-lg bg-white/5 px-3 py-1 text-sm">{s}</span>)}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
