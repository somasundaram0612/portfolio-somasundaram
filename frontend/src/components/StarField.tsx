import { useEffect, useRef } from "react";
// Canvas stars; deeper stars (small z) move less with the mouse = parallax depth.
export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    let w = (c.width = innerWidth), h = (c.height = innerHeight), mx = 0, my = 0, raf = 0;
    const stars = Array.from({ length: 150 }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1, t: Math.random() * 6 }));
    const move = (e: MouseEvent) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; };
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    addEventListener("mousemove", move); addEventListener("resize", resize);
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#fff";
      for (const s of stars) {
        const x = (((s.x - mx * 50 * s.z) % w) + w) % w, y = (((s.y - my * 50 * s.z) % h) + h) % h;
        ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t / 1200 + s.t));
        ctx.beginPath(); ctx.arc(x, y, s.z * 1.4, 0, 6.3); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", move); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />;
}
