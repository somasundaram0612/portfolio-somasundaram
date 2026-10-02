import { useRef, type ReactNode } from "react";
// 3D tilt toward the cursor + colored border/glow. `color` = any hex.
export default function TiltCard({ children, color, className = "" }: { children: ReactNode; color: string; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = el.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.current!.style.transform = `perspective(700px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-4px)`;
  };
  const reset = () => (el.current!.style.transform = "");
  return (
    <div ref={el} onMouseMove={onMove} onMouseLeave={reset}
      className={`rounded-2xl bg-panel/80 backdrop-blur p-6 transition-[transform,box-shadow] duration-200 hover:shadow-[0_0_30px_var(--c)] ${className}`}
      style={{ border: `1px solid ${color}66`, ["--c" as string]: `${color}55` }}>
      {children}
    </div>
  );
}
