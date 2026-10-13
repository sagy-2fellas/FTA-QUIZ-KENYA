import { useEffect, useRef } from "react";

export default function useGrowerReveal(ready = true) {
  const root = useRef(null);
  useEffect(() => {
    if (!ready) return;
    const targets = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("grower-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    const frame = requestAnimationFrame(() => {
      root.current?.querySelectorAll('.result-section img[src="/img/patrick-full-alt.jpg"]').forEach(image => {
        // Signup uses the same portrait; its form must remain stationary.
        if (image.closest(".results-signup")) return;
        const portrait = image.parentElement;
        const heading = image.closest(".result-section")?.querySelector("h1");
        portrait.classList.add("grower-portrait-reveal");
        targets.push(portrait);
        if (heading) {
          heading.classList.add("grower-name-reveal");
          targets.push(heading);
        }
      });
      targets.forEach(target => observer.observe(target));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      targets.forEach(target => target.classList.remove("grower-revealed", "grower-portrait-reveal", "grower-name-reveal"));
    };
  }, [ready]);
  return root;
}
