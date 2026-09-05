import React, { useEffect, useRef, useState, createContext } from "react";
import TwitterIcon from "../components/svg/TwitterIcon";
import FacebookIcon from "../components/svg/FacebookIcon";
import InstagramIcon from "../components/svg/InstagramIcon";
import LinkedinIcon from "../components/svg/LinkedinIcon";
import WhastappIcon from "../components/svg/WhatsappIcon";
import QuizStepper from "../components/QuizStepper";
import ReactFullpage from "@fullpage/react-fullpage";
import { useBetween } from "use-between";
import styles from "../style";
import QuestionOne from "../components/quiz/QuestionOne";
import QuestionTwo from "../components/quiz/QuestionTwo";
import QuestionThree from "../components/quiz/QuestionThree";
import QuestionFour from "../components/quiz/QuestionFour";
import QuestionFive from "../components/quiz/QuestionFive";
import QuestionSix from "../components/quiz/QuestionSix";
import QuestionSeven from "../components/quiz/QuestionSeven";
import QuestionEight from "../components/quiz/QuestionEight";
import Head from "next/head";
import { useRouter } from "next/router";
import ChocolateConsumer from "../components/quiz/ChocolateConsumer";

// import { useReducer } from "react";

export const SlideContext = createContext(0);

const useShareableState = () => {
  const [currentSlide, SetCurrentSlide] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight < 700 || window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("orientationchange", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("orientationchange", checkScreenSize);
    };
  }, []);

  return {
    currentSlide,
    SetCurrentSlide,
    isSmallScreen,
  };
};

const QuizSection = ({ children }) => {
  return (
    <div className="section !h-full  flex items-center justify-center">
      {children}
    </div>
  );
};

const FullpageWrapper = () => {
  // const [answers, dispatch] = useReducer(answersReducer, initialAnswers);

  const { currentSlide, SetCurrentSlide, isSmallScreen } =
    useBetween(useShareableState);
  const returnSlide = (index) => {
    SetCurrentSlide(index);
  };

  const router = useRouter();

  // Small screens scroll natively. fullpage.js keeps managing desktop.
  //
  // Two bugs were stacked here before: the condition was inverted against its
  // own comment (`!isSmallScreen` disabled scrolling on the phones that needed
  // it), and the bare `fullpage_api` identifier threw a ReferenceError on every
  // mount because the global does not exist until fullpage initialises — so the
  // effect never reached the API call at all.
  // fullpage.js binds its own keydown handler to the fullpage wrapper and calls
  // preventDefault() on Tab, Enter and Space as part of its inter-section focus
  // management. In our mobile scrollBar layout that broke keyboard use: Tab
  // could not move focus off a question heading, and Enter/Space on a focused
  // Continue button never produced the click the browser normally synthesises.
  //
  // Verified by trapping Event.preventDefault - the caller is fullpage's own
  // handler on the wrapper div (bundled frame `HTMLDivElement.Tn`), and it is
  // not gated by `keyboardScrolling`.
  //
  // The interception is deliberately narrow: it only shields the keys that
  // fullpage breaks, only where our own controls live, and never where another
  // component (or the browser) is already handling the key. stopPropagation
  // only - never preventDefault - so native behaviour is untouched.
  useEffect(() => {
    if (!isSmallScreen) return undefined;

    /** Anything that handles its own keys, or that the browser owns. */
    const OWNS_ITS_KEYS = [
      '[role="dialog"]',
      "input",
      "select",
      "textarea",
      "a[href]",
      '[contenteditable=""]',
      '[contenteditable="true"]',
      "svg",
      "[data-quiz-map]",
    ].join(",");

    const shouldShieldFromFullpage = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return false;

      // Dialogs, form controls, links, map/region controls: hands off.
      if (target.closest(OWNS_ITS_KEYS)) return false;

      // Custom keyboard controls (role="button" on a non-button element, such
      // as Question 1's legacy arrows) implement Enter/Space themselves.
      const roleButton = target.closest('[role="button"]');
      if (roleButton && roleButton.tagName !== "BUTTON") return false;

      if (event.key === "Tab") {
        // Only while focus is inside the question the user is actually on.
        return Boolean(target.closest(".section.active"));
      }

      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        // Only native buttons in our own mobile navigation bar.
        return (
          target.tagName === "BUTTON" && Boolean(target.closest(".quiz-mobile-nav"))
        );
      }

      return false;
    };

    const shieldKeys = (event) => {
      if (shouldShieldFromFullpage(event)) event.stopPropagation();
    };

    document.addEventListener("keydown", shieldKeys, true);
    return () => document.removeEventListener("keydown", shieldKeys, true);
  }, [isSmallScreen]);

  const enableScrolling = () => {
    const api = typeof window !== "undefined" ? window.fullpage_api : undefined;
    if (!api) return;
    api.setAllowScrolling(true);
    api.setKeyboardScrolling(true);
  };

  useEffect(enableScrolling, [isSmallScreen]);

  // useEffect(() => {
  //   router.push("/?counter=10", undefined, { shallow: true });
  // }, []);

  return (
    <ReactFullpage
      licenseKey={"K33GH-CR597-09KK8-01PJK-OJTQP"}
      scrollOverflow={isSmallScreen}
      fitToSection={!isSmallScreen}
      scrollingSpeed={isSmallScreen ? 300 : 700}
      normalScrollElements={isSmallScreen ? ".section" : null}
      autoScrolling={!isSmallScreen}
      afterRender={enableScrolling}
      afterLoad={(origin) => {
        // Resolve the active section from the DOM: fullpage's React wrapper
        // does not reliably hand us the section node, and trusting it marked
        // the *active* section inert.
        //
        // fullpage focuses the section wrapper itself just after this callback,
        // so defer to the next frame (a frame callback, not a timed guess) and
        // let our focus be the one that sticks.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const active = document.querySelector(".section.active");
            // `origin` is undefined on first load, where moving focus would be
            // unexpected; isolation still applies.
            if (!origin || !active) return;
            const heading = active.querySelector("[data-quiz-heading]");
            // preventScroll: fullpage owns the scroll position at this point.
            heading?.focus({ preventScroll: true });
          });
        });
      }}
      onLeave={(origin, destination, direction) => {
        returnSlide(destination.index);
      }}
      anchors={[
        "Question-1",
        "Question-2",
        "Question-3",
        "Question-4",
        "Question-5",
        "Chocolate-consumer",
        "Question-6",
        "Question-7",
      ]}
      render={({ state, fullpageApi }) => {
        return (
          <div id="fullpage" className="h-full">
            <QuizSection>
              <QuestionOne />
            </QuizSection>
            <QuizSection>
              <QuestionTwo />
            </QuizSection>
            <QuizSection>
              <QuestionThree />
            </QuizSection>
            <QuizSection>
              <QuestionFour />
            </QuizSection>
            <QuizSection>
              <QuestionFive />
            </QuizSection>
            <QuizSection>
              <ChocolateConsumer />
            </QuizSection>
            <QuizSection>
              <QuestionSix />
            </QuizSection>
            <QuizSection>
              <QuestionSeven />
            </QuizSection>
          </div>
        );
      }}
    />
  );
};

/**
 * Drives the two things the mobile layout depends on:
 *   - `quiz-mobile` on <html>, which switches globals.css from fullpage.js's
 *     fixed-height sections to native scrolling with 100dvh minimums.
 *   - `--quiz-header-h`, measured from the real fixed header so no heading,
 *     answer or control can ever sit underneath it. The stepper wraps at
 *     narrow widths, so this has to be measured rather than hard-coded.
 */
const useQuizChrome = (isSmallScreen) => {
  const headerRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("quiz-mobile", isSmallScreen);
    return () => root.classList.remove("quiz-mobile");
  }, [isSmallScreen]);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return undefined;

    const measure = () => {
      const height = Math.ceil(node.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty(
          "--quiz-header-h",
          `${height}px`
        );
      }
    };

    measure();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    observer?.observe(node);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return headerRef;
};

const Quiz = () => {
  const { currentSlide, SetCurrentSlide, isSmallScreen } =
    useBetween(useShareableState);
  const headerRef = useQuizChrome(isSmallScreen);

  return (
    <div className="h-full">
      <Head>
        <title>Quiz Questions</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <SlideContext.Provider value={[currentSlide]}>
        <div
          ref={headerRef}
          className=" w-full z-50 bg-ft-bg fixed top-0 left-0 quiz-nav"
        >
          <div className={`${styles.boxWidth} mx-auto my-1 lg:my-6 `}>
            <nav className="grid sm:grid-cols-8 z-10 ">
              <div className="2xl:col-span-6 sm:col-span-5 lg:col-span-6  z-10">
                <QuizStepper />
              </div>
              <div className=" 2xl:col-span-2 sm:col-span-3 lg:col-span-2 hidden sm:block h-full">
                <ul className=" h-full flex items-center justify-end mt-0 lg:justify-end text-lg">
                  <li className="font-alegreya">SHARE:</li>
                  <li className="font-alegreya mx-2 cursor-pointer">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://befairrightnow.net/">
                      <FacebookIcon />
                    </a>
                  </li>
                  <li className="font-alegreya mx-2 cursor-pointer">
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://befairrightnow.net/">
                      <LinkedinIcon />
                    </a>
                  </li>
                  <li className="font-alegreya mx-2 cursor-pointer">
                    <a href="https://twitter.com/intent/tweet?url=https://befairrightnow.net/&text=">
                      <TwitterIcon />
                    </a>
                  </li>
                  <li className="font-alegreya mx-2 cursor-pointer">
                    <a
                      onClick={() => {
                        window.open(
                          "whatsapp://send?text=Meet the human who grows your favourite drink: https://befairrightnow.net"
                        );
                      }}
                    >
                      <WhastappIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* <QuizNavigation /> */}
        <FullpageWrapper />
      </SlideContext.Provider>
    </div>
  );
};

export default Quiz;
