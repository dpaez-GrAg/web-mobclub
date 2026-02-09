import { useEffect, useRef } from "react";

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.08 },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return ref;
};

export default useScrollReveal;
