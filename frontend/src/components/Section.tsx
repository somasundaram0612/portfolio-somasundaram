import type { ReactNode } from "react";
import Reveal from "./Reveal";
// Shared wrapper: anchor id + big heading used by every section.
export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal><h2 className="font-display font-bold text-4xl md:text-6xl mb-12">{title}</h2></Reveal>
        {children}
      </div>
    </section>
  );
}
