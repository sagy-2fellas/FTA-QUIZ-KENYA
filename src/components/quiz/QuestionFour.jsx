import styles from "../../style";
import FactCard from "../FactCard";
import { useState, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addTea } from "../../slices/QFourSlice";
import QuizNavigation from "../QuizNavigation";
import MobileFactDialog from "../MobileFactDialog";
import MobileQuizNav from "../MobileQuizNav";
import TeaOneIcon from "../svg/TeaOneIcon";
import TeaTwoIcon from "../svg/TeaTwoIcon";
import TeaThreeIcon from "../svg/TeaThreeIcon";

import Link from "next/link";

const QuestionFour = () => {
  const dispatch = useDispatch();

  const min = 1;
  const max = 5;
  const allowedValues = [1, 2, 3, 4, 5];
  const [value, setValue] = useState(2);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleSize = 80; // Reduced for better mobile experience
  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const background = useMotionTemplate`linear-gradient(90deg, #C1D42F ${progress}px, #d1d5db 0)`;

  function handleDrag() {
    let handleBounds = handleRef.current.getBoundingClientRect();
    let middleOfHandle = handleBounds.x + handleBounds.width / 2;
    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    let newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;
    setValue(Math.round(newProgress * (max - min)) + min); // Ensure it stays within the range
  }

  function handleDragEnd() {
    // Snap to the nearest allowed value when dragging ends
    snapToClosestValue(value);
  }

  function snapToClosestValue(currentValue) {
    const closestValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
        ? curr
        : prev;
    });

    setValue(closestValue);
    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const newProgress =
      ((closestValue - min) / (max - min)) * progressBarBounds.width; // Adjust for min value

    animate(handleX, newProgress);
  }

  // Update handle size based on viewport width

  useEffect(() => {
    const updateInitialPosition = () => {
      let newProgress = (value - min) / (max - min); // Adjust for min value
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleX.set(newProgress * progressBarBounds.width);
    };

    // Delay setting the initial position until layout is fully measured
    setTimeout(updateInitialPosition, 0);
  }, [handleX, min, max, value]);

  const displayedValue = () => {
    if (value === 1) return "Not really for me";
    if (value === 2) return "I'll drink it if you're making";
    if (value === 3) return "Tea makes everything better";
    if (value === 4) return "Tea over coffee any day";
    if (value === 5) return "I live on tea!";
    return Math.floor(value); // Default case (if needed)
  };

  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const navigateNext = () => {
    if (value != "") {
      window.fullpage_api.moveSectionDown();
      // onAddAnswer(value, "slide1");
      dispatch(addTea(value));
    }
  };

  const [factToggled4, setFactToggled4] = useState(false);
  return (
    <div className={`${styles.boxWidth} h-full z-0 mx-auto`}>
      {/* NAVIGATION */}
      <div className="hidden lg:block">
        <QuizNavigation
          navigateNext={navigateNext}
          navigatePrev={navigatePrev}
          value={value}
        />
      </div>
      {/* END NAVIGATION */}

      {/* NAVIGATION FACT */}
      <MobileFactDialog
        open={factToggled4}
        onClose={() => setFactToggled4(false)}
        title="It's okay, your kids will pay the price."
        onContinue={() => {
          setFactToggled4(false);
          dispatch(addTea(value));
          window.fullpage_api.moveSectionDown();
        }}
      >
        <p className="font-exo text-sm sm:text-base leading-relaxed mb-3">
          Water scarcity, soil erosion, shrinking forests, and climate change don't just affect the land now - they disproportionately burden future generations. If ecosystems collapse, crops like Kenyan tea and coffee could become far more expensive or rare. Fairtrade supports farmers to adopt sustainable practices so future generations can still enjoy what Kenya produces best.
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          WWF (2010). Agriculture: Facts & Trends South Africa.
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          Wikipedia (2024). Deforestation in Kenya. Retrieved October 2025
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          Kenya Forest Service (2023). Annual Forest Resources Report.
        </p>
      </MobileFactDialog>
      {/* END NAVIGATION FACT */}

      {/* CONTENT SECTION */}
      <div data-quiz-pane className="flex h-[92vh] md:h-[95vh] pb-20 lg:pb-0 overflow-y-auto">
        <div className="hidden lg:flex ml-10 flex-initial w-1/5 2xl:w-1/6 items-end">
          <FactCard link="#">
            <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
              It's okay, your kids will pay the price.
            </h3>
            <p className="font-exo text-sm mb-2">
              Water scarcity, soil erosion, shrinking forests, and climate change don't just affect the land now - they disproportionately burden future generations. If ecosystems collapse, crops like Kenyan tea and coffee could become far more expensive or rare. Fairtrade supports farmers to adopt sustainable practices so future generations can still enjoy what Kenya produces best.
            </p>
            <p className="font-exo text-xs italic text-gray-600">
              WWF (2010). Agriculture: Facts & Trends South Africa.
            </p>
            <p className="font-exo text-xs italic text-gray-600 mt-1">
              Wikipedia (2024). Deforestation in Kenya. Retrieved October 2025
            </p>
            <p className="font-exo text-xs italic text-gray-600 mt-1">
              Kenya Forest Service (2023). Annual Forest Resources Report.
            </p>
          </FactCard>
        </div>
        <div className="flex flex-col items-center justify-center  flex-initial w-full lg:w-3/5 2xl:w-4/6  gap-y-4 sm:gap-y-6 lg:gap-y-8">
          {" "}
          <motion.h2
            data-quiz-heading
            tabIndex={-1}
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya text-4xl xs:text-6xl sm:text-7xl lg:text-7xl 2xl:text-9xl pt-8 xs:pt-12 lg:pt-16 2xl:pt-20 text-center"
          >
            How do you feel about tea?
          </motion.h2>
          <div className="flex justify-center">
            {!dragging && (
              <motion.div
                key={displayedValue()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="message-box   shadow-xl border  border-white bg-white  pb-6 pt-1 px-4 md:px-10 sm:text-3xl text-2xl  font-alegreya text-black md:text-black  "
              >
                {displayedValue()}
              </motion.div>
            )}
          </div>
          <div className="lg:p-8 w-full mt-16">
            <div
              data-test="slider"
              className="relative flex flex-col justify-center"
            >
              <motion.div
                data-test="slider-background"
                className="absolute w-full h-4 rounded-full"
                style={{
                  background,
                }}
              />

                              {/* Indicators with values */}
                <div className="absolute w-full px-4 lg:px-10 xl:px-12 2xl:px-16">
                  <div className="flex justify-between">
                    <span className="h-12 lg:h-10 xl:h-12 2xl:h-14 w-4 xl:w-5 2xl:w-6 bg-black rounded-full"></span>
                    <span className="h-12 lg:h-10 xl:h-12 2xl:h-14 w-4 xl:w-5 2xl:w-6 bg-black rounded-full"></span>
                    <span className="h-12 lg:h-10 xl:h-12 2xl:h-14 w-4 xl:w-5 2xl:w-6 bg-black rounded-full"></span>
                    <span className="h-12 lg:h-10 xl:h-12 2xl:h-14 w-4 xl:w-5 2xl:w-6 bg-black rounded-full"></span>
                    <span className="h-12 lg:h-10 xl:h-12 2xl:h-14 w-4 xl:w-5 2xl:w-6 bg-black rounded-full"></span>
                  </div>
                </div>
              <div
                data-test="slider-progress"
                ref={progressBarRef}
                className="absolute"
                style={{
                  left: handleSize / 2,
                  right: handleSize / 2,
                }}
              />
              <div ref={constraintsRef}>
                <motion.div
                  data-test="slider-handle"
                  ref={handleRef}
                                      className="relative z-10 bg-transparent rounded-full cursor-pointer"
                  drag="x"
                  dragMomentum={false}
                  dragConstraints={constraintsRef}
                  dragElastic={0}
                  onDrag={handleDrag}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => {
                    setDragging(false);
                    handleDragEnd(); // Call snapping function
                  }}
                  onPointerDown={() => setDragging(true)}
                  onPointerUp={() => setDragging(false)}
                  animate={{
                    scale: dragging ? 1.5 : 1,
                  }}
                                      style={{
                      width: handleSize,
                      height: handleSize,
                      x: handleX,
                      backgroundImage: `url('/img/tea-toggle.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                ></motion.div>
              </div>
              <div
                data-test="slider-clickable-area"
                className="absolute w-full h-10 "
                onPointerDown={(event) => {
                  let { left, width } =
                    progressBarRef.current.getBoundingClientRect();
                  let position = event.pageX - left;
                  let newProgress = clamp(position / width, 0, 1);
                  let newValue = newProgress * (max - min);
                  snapToClosestValue(newValue); // Snap to the closest value
                }}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-initial w-1/5 2xl:w-1/6"></div>
      </div>

      {/* CONTENT SECTION */}

      <MobileQuizNav
        onPrev={navigatePrev}
        onNext={() => {
          if (value !== "") setFactToggled4(true);
        }}
        canContinue={value !== ""}
        nextAriaLabel="Continue to the next question"
      />

    </div>
  );
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default QuestionFour;
