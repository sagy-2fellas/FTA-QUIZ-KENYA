import React, { useEffect, useState, createContext } from "react";
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

  return {
    currentSlide,
    SetCurrentSlide,
  };
};

const QuizSection = ({ children }) => {
  return (
    <div className="section !h-full flex items-center justify-center pt-20 sm:pt-24 md:pt-0">
      {children}
    </div>
  );
};

const FullpageWrapper = () => {
  // const [answers, dispatch] = useReducer(answersReducer, initialAnswers);

  const { currentSlide, SetCurrentSlide } = useBetween(useShareableState);
  const returnSlide = (index) => {
    SetCurrentSlide(index);
  };

  const router = useRouter();

  useEffect(() => {
    fullpage_api.setAllowScrolling(false);
    fullpage_api.setKeyboardScrolling(false);
  });

  // useEffect(() => {
  //   router.push("/?counter=10", undefined, { shallow: true });
  // }, []);

  return (
    <ReactFullpage
      licenseKey={"K33GH-CR597-09KK8-01PJK-OJTQP"}
      scrollOverflow={false}
      fitToSection={true}
      responsiveWidth={768}
      responsiveHeight={600}
      onLeave={(origin, destination, direction) => {
        returnSlide(destination.index);
      }}
      anchors={[
        "Question-1",
        "Question-2",
        "Question-3",
        "Question-4",
        "Question-5",
        // "Chocolate-consumer",
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

const Quiz = () => {
  const { currentSlide, SetCurrentSlide } = useBetween(useShareableState);

  return (
    <div className="h-full">
      <Head>
        <title>Quiz Questions</title>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SlideContext.Provider value={[currentSlide]}>
        <div className=" w-full z-50 bg-ft-bg fixed top-0 left-0 quiz-nav">
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
