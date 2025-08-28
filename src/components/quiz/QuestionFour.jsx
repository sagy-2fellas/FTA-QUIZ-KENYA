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
    if (value === 1) return "Tea? Not my cup.";
    if (value === 2) return "Occasional sipper, nothing serious.";
    if (value === 3) return "Full-on kettle commander.";
    if (value === 4) return "Life runs on steeped leaves.";
    if (value === 5) return "I steep. Therefore, I am.";
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
      <div>
        <div className="hidden lg:block">
          <QuizNavigation
            navigateNext={navigateNext}
            navigatePrev={navigatePrev}
            value={value}
          />
        </div>
        <div
          className={`z-10 absolute right-0 top-1/2 -translate-y-1/2 space-y-2 lg:hidden`}
        >
          <div
            className={
              value != ""
                ? "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer shadow-lg"
                : "bg-ft-dark-green  h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] shadow-lg"
            }
            onClick={navigatePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-5 h-5 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
          <div
            className={
              value != ""
                ? "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer shadow-lg"
                : "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] shadow-lg"
            }
            onClick={() => {
              if (value !== "") {
                setFactToggled4(!factToggled4);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* END NAVIGATION */}

      {/* NAVIGATION FACT */}
      <div className="lg:hidden">
        <div
          className={
            factToggled4
              ? `absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-white px-4 pt-10 pb-4 rounded-md shadow-lg z-20 w-72 mt-6 xs:!mt-0`
              : `absolute  top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-white px-4 pt-10 pb-4  rounded-md shadow-lg z-20 w-72 opacity-0 pointer-events-none mt-6 xs:!mt-0`
          }
        >
          <div className="">
            <div
              onClick={() => {
                setFactToggled4(!factToggled4);
              }}
              className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white flex absolute left-1 top-1 rounded-lg font-exo text-lg "
            >
              x
            </div>
            <div className="mb-4">
              <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                It's okay, your kids will pay the price.
              </h3>
              <p className="font-exo text-sm">
                The harmful effects of water pollution, loss of biodiversity,
                declining soil fertility, and climate change will fall squarely
                on the shoulders of your children. In fact, the price of things
                like Kenyan tea and coffee might increase so much, they might
                never be able to enjoy it again.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-ft-dark-green text-white px-4 py-2 rounded-md shadow-lg font-exo text-base w-full"
                onClick={() => {
                  window.fullpage_api.moveSectionDown(); // Move to the next slide
                  dispatch(addTea(value));
                  setFactToggled4(false); // Close the popup after navigating
                }}
              >
                Go to Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END NAVIGATION FACT */}

      {/* CONTENT SECTION */}
      <div className="flex h-[90vh]  md:h-[95vh] pb-20 lg:pb-0">
        <div className="hidden lg:flex ml-10 flex-initial w-1/5 2xl:w-1/6 items-end">
          <FactCard link="#">
            <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
              It's okay, your kids will pay the price.
            </h3>
            <p className="font-exo text-sm">
              The harmful effects of water pollution, loss of biodiversity,
              declining soil fertility, and climate change will fall squarely on
              the shoulders of your children. In fact, the price of things like
              Kenyan tea and coffee might increase so much, they might never be
              able to enjoy it again.
            </p>
          </FactCard>
        </div>
        <div className="flex flex-col items-center justify-center  flex-initial w-full lg:w-3/5 2xl:w-4/6  gap-y-4 sm:gap-y-6 lg:gap-y-8">
          {" "}
          <motion.h2
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
          <div className="lg:p-8 w-full">
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
              <div className="absolute w-full px-4 sm:px-12 lg:px-10">
                <div className="flex justify-between">
                  <span className="h-12 lg:h-10 w-4 bg-black rounded-full"></span>
                  <span className="h-12 lg:h-10 w-4 bg-black rounded-full"></span>
                  <span className="h-12 lg:h-10 w-4 bg-black rounded-full"></span>
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
    </div>
  );
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default QuestionFour;
