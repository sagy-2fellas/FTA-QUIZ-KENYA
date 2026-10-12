import useGrowerReveal from "./useGrowerReveal";
import { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

export default function ResultsFullpage({ children, anchors, ...props }) {
  const revealRoot = useGrowerReveal();
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1199px), (max-height: 699px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    let resizeTimer;
    const alignResizedSection = () => {
      clearTimeout(resizeTimer);
      // Let fullpage finish rebuilding before aligning the natural-flow section.
      resizeTimer = setTimeout(() => {
        if (!window.matchMedia("(max-width: 1199px), (max-height: 699px)").matches) return;
        if (document.activeElement?.matches("input, select, textarea")) return;
        const section = document.querySelector(".results-page .result-section.active");
        if (section) {
          window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top, behavior: "instant" });
        }
      }, 500);
    };
    window.addEventListener("resize", alignResizedSection);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", alignResizedSection);
    };
  }, []);
  return (
    <div ref={revealRoot} className={`results-page ${compact ? "results-compact" : ""}`}>
      <ReactFullpage {...props} anchors={[]} recordHistory={false}
        autoScrolling={!compact} navigation={!compact} scrollOverflow={!compact}
        normalScrollElements=".quiz-dialog-backdrop, .results-signup" />
    </div>
  );
}
