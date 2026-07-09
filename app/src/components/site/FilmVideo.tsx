import { useEffect, useRef } from "react";
export function FilmVideo({ src, poster, className, label }:
  { src: string; poster: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) { if (e.isIntersecting) void v.play().catch(() => undefined); else v.pause(); }
    }, { rootMargin: "160px" });
    io.observe(v); return () => io.disconnect();
  }, []);
  return <video ref={ref} className={className} src={src} poster={poster}
    autoPlay muted loop playsInline preload="metadata" aria-label={label} />;
}
