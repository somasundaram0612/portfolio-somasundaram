import { motion } from "framer-motion";
import type { ReactNode } from "react";
// Wrap anything: fades/slides in once when scrolled into view.
export default function Reveal({ children, delay = 0, x = 0 }: { children: ReactNode; delay?: number; x?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}
