import useGrowerReveal from "./useGrowerReveal";
import { useEffect, useRef, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { useRouter } from "next/router";
import SeoHead from "./SeoHead";

export default function ResultsFullpage({ children, anchors, ...props }) {
  const router = useRouter();
  const [compact, setCompact] = useState(null);
  const revealRoot = useGrowerReveal(compact !== null);
  const openedAtTop = useRef(false);
  const openFirstResult = () => {
    if (openedAtTop.current) return;
    openedAtTop.current = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.fullpage_api?.silentMoveTo(1);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }));
  };
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
    <>
      <SeoHead
        title="Your Fairtrade Quiz Results | Be Fair Right Now"
        description="Explore the people and stories behind your everyday choices, and see how Fairtrade can help."
        path={router.pathname}
        noindex
      />
      <div ref={revealRoot} className={`results-page ${compact ? "results-compact" : ""}`}>
        {compact !== null && <ReactFullpage {...props} anchors={[]} recordHistory={false}
          afterRender={openFirstResult}
          autoScrolling={!compact} navigation={!compact} scrollOverflow={!compact}
          normalScrollElements=".quiz-dialog-backdrop, .results-signup" />}
      </div>
    </>
  );
}
