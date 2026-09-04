import { useEffect, useRef, useState, type RefObject } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Progress (0 → 1) of a tall pinned section as it passes through the viewport. */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T>): number {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const raw = -rect.top / scrollable;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return progress;
}

/** Reveals an element once it enters the viewport. */
export function useInView<T extends HTMLElement>(ref: RefObject<T>, rootMargin = "-12% 0px"): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return visible;
}
