import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.12, delay = 0, direction = 'up' } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const translateMap = { up: 'translateY(28px)', left: 'translateX(-28px)', right: 'translateX(28px)' };

    el.style.opacity = '0';
    el.style.transform = translateMap[direction];
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, direction]);

  return ref;
}
