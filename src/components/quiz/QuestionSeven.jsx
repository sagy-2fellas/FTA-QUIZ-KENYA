import styles from "../../style";
import FactCard from "../FactCard";
import QuizNavigation from "../QuizNavigation";
import MobileFactDialog from "../MobileFactDialog";
import MobileQuizNav from "../MobileQuizNav";
import SliderRight from "../svg/SliderRightIcon";
import SliderLeft from "../svg/SliderLeftIcon";
import Slider from "../SliderTwo";
import SliderMob from "../SliderTwoMobile";
import { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { addDecide } from "../../slices/QSevenSlice";
import { saveCompletedQuiz } from "../../utils/quizAnswers";
import { getResultRoute } from "../../utils/resultRoute";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
//deploy
const QuestionSeven = () => {
  const [currentValue, setCurrentValue] = useState(3);
  const [value, setValue] = useState(3);

  const router = useRouter();

  const dispatch = useDispatch();
  const store = useStore();

  //help me console log all values stored in the state coming from react-redux
  // const state = useSelector((state) => state);
  // console.log(state);

  const cart = useSelector((state) => state.QuestionSix.shoppingList);

  const filteredCart = useSelector(
    (state) => state.QuestionSixFT.shoppingListRefined
  );

  const navigateNext = () => {
    dispatch(addDecide(currentValue));
    saveCompletedQuiz(store.getState());
    const result = getResultRoute(cart, filteredCart);
    router.push(`/result-${result}`, undefined, { scroll: true });
  };
  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };

  const text = [
    `I don’t really look at labels 
(and don’t intend to start)`,
    `I look carefully at labels to 
ensure I’m buying ethically`,
  ];
  const [factToggled7, setFactToggled7] = useState(false);
  return (
    <div>
      <div className="hidden lg:block">
        <QuizNavigation
          navigateNext={navigateNext}
          navigatePrev={navigatePrev}
          value={currentValue}
        />
      </div>

      <div className={`${styles.boxWidth} z-0 h-full mx-auto relative`}>
        <MobileFactDialog
          open={factToggled7}
          onClose={() => setFactToggled7(false)}
          title="Tea can move uphill. Farmers can’t move a mountain overnight."
          continueLabel="View your results"
          onContinue={() => {
            setFactToggled7(false);
            navigateNext();
          }}
        >
          <p className="font-exo text-sm sm:text-base leading-relaxed mb-3">
            The IPCC projects that warming could shrink Kenya’s optimal tea-growing area and reduce yields. Fairtrade supports environmental improvements and adaptation projects, while the Premium gives producer groups resources to invest in their priorities. It does not erase the climate threat.
          </p>
          <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
            IPCC, Sixth Assessment Report, Working Group II, Chapter 9; Fairtrade International, Objectives of the Standards.
          </p>
        </MobileFactDialog>

        {/* end quiz nav */}

        <div data-quiz-pane className="flex flex-col w-full justify-between h-[92vh] sm:h-[85vh] lg:h-[95vh] 2xl:h-[90vh] pb-20 lg:pb-0 overflow-y-auto">
          <div className="flex lg:justify-between justify-center  w-full ">
            <div className="hidden lg:flex flex-initial w-1/5 pt-20 lg:pt-40 xl:pt-56">
              <FactCard link="#">
                <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                  Tea can move uphill. Farmers can’t move a mountain overnight.
                </h3>
                <p className="font-exo text-sm">
                  The IPCC projects that warming could shrink Kenya’s optimal tea-growing area and reduce yields. Fairtrade supports environmental improvements and adaptation projects, while the Premium gives producer groups resources to invest in their priorities. It does not erase the climate threat.
                </p>
                <p className="font-exo sm:text-xs text-xs mt-2">
                  IPCC, Sixth Assessment Report, Working Group II, Chapter 9; Fairtrade International, Objectives of the Standards.
                </p>
              </FactCard>
            </div>
            <div className="flex justify-center  h-full items-center">
              <motion.h2
            data-quiz-heading
            tabIndex={-1}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", delay: 0.5 }}
                className="font-alegreya text-4xl xs:text-6xl sm:text-7xl lg:text-7xl 2xl:text-9xl max-w-3xl 2xl:max-w-4xl text-center pt-8 xs:pt-12 lg:pt-16 2xl:pt-20"
              >
                When you decide what to buy, where do you fall on the slider
                below?{" "}
              </motion.h2>
            </div>
            <div className="lg:flex flex-initial w-1/5 hidden"></div>
          </div>
          <div>
            {" "}
            <div className="flex w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", delay: 1 }}
                className=" flex-initial w-1/4  flex items-center justify-center flex-col "
              >
                <SliderLeft />
                <p className="font-exo text-center px-1 lg:px-4 lg:text-xl lg:leading-5 py-2 lg:py-4 leading-3 text-sm">
                  {text[0]}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", delay: 0.5 }}
                className="w-full flex justify-center items-center "
              >
                <div>
                  <Slider
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", delay: 1.3 }}
                className="  flex items-center justify-center flex-col w-1/4 flex-initial "
              >
                <SliderRight />
                <p className="font-exo text-center px-1 lg:px-4 lg:text-xl lg:leading-5 py-2 lg:py-4 leading-3 text-sm">
                  {text[1]}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <MobileQuizNav
        onPrev={navigatePrev}
        onNext={() => {
          if (currentValue !== "") setFactToggled7(true);
        }}
        canContinue={currentValue !== ""}
        continueLabel="Meet your grower"
        nextAriaLabel="View your results"
      />

    </div>
  );
};

export default QuestionSeven;
