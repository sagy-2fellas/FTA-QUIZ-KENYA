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
import { addCoffee } from "../../slices/QThreeSlice";
import QuizNavigation from "../QuizNavigation";
import MobileFactDialog from "../MobileFactDialog";
import MobileQuizNav from "../MobileQuizNav";

const QuestionThree = () => {
  const dispatch = useDispatch();
  const min = 1;
  const max = 5;
  const allowedValues = [1, 2, 3, 4, 5];
  const [value, setValue] = useState(2);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleSize = 72; // Reduced for better mobile fit
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
      if (progressBarRef.current) {
        let newProgress = (value - min) / (max - min); // Adjust for min value
        let progressBarBounds = progressBarRef.current.getBoundingClientRect();
        handleX.set(newProgress * progressBarBounds.width);
      }
    };

    // Delay setting the initial position until layout is fully measured
    setTimeout(updateInitialPosition, 100);
    
    // Also update on window resize
    window.addEventListener('resize', updateInitialPosition);
    return () => window.removeEventListener('resize', updateInitialPosition);
  }, [handleX, min, max, value]);

  const displayedValue = () => {
    if (value === 1) return "None. I run on vibes";
    if (value === 2) return "One cup now and then";
    if (value === 3) return "Can't start my day without it";
    if (value === 4) return "Coffee keeps me going";
    if (value === 5) return "Espresso runs in my blood!";
    return Math.floor(value); // Default case (if needed)
  };

  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const navigateNext = () => {
    if (value != "") {
      window.fullpage_api.moveSectionDown();
      // onAddAnswer(value, "slide1");
      dispatch(addCoffee(value));
    }
  };

  const [factToggled3, setFactToggled3] = useState(false);

  return (
    <div className="relative w-full">
      {" "}
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
        open={factToggled3}
        onClose={() => setFactToggled3(false)}
        title="Six-year-olds help keep your coffee cheap."
        onContinue={() => {
          setFactToggled3(false);
          dispatch(addCoffee(value));
          window.fullpage_api.moveSectionDown();
        }}
      >
        <p className="font-exo text-sm sm:text-base leading-relaxed mb-3">
          In some coffee-producing regions, children under age 7 are involved in farm work - often working long hours in difficult conditions. They might spend 8 to 10 hours a day picking, weeding, or carrying loads, missing school and childhood in the process.
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          International Labour Organization (ILO). (2021). Child Labour in Agriculture. Geneva:
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          International Coffee Organization (ICO). (2020). Child and Youth Labour in Coffee Supply Chains: Policy Paper.
        </p>
      </MobileFactDialog>
      {/* END NAVIGATION FACT */}

        {/* CONTENT SECTION */}
        <div data-quiz-pane className="flex h-[92vh] lg:h-[95vh] 2xl:h-[90vh] pb-10 lg:pb-0 overflow-y-auto">
          <div className="hidden lg:flex flex-initial w-1/5 2xl:w-1/6 items-end">
            <FactCard link="#">
              <h3 className="font-alegreya text-lg xl:text-xl 2xl:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                Six-year-olds help keep your coffee cheap.
              </h3>
              <p className="font-exo text-sm xl:text-base 2xl:text-lg mb-2">
                In some coffee-producing regions, children under age 7 are involved in farm work - often working long hours in difficult conditions. They might spend 8 to 10 hours a day picking, weeding, or carrying loads, missing school and childhood in the process.
              </p>
              <p className="font-exo text-xs xl:text-sm 2xl:text-base italic text-gray-600">
                International Labour Organization (ILO). (2021). Child Labour in Agriculture. Geneva:
              </p>
              <p className="font-exo text-xs xl:text-sm 2xl:text-base italic text-gray-600 mt-1">
                International Coffee Organization (ICO). (2020). Child and Youth Labour in Coffee Supply Chains: Policy Paper.
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
              className="font-alegreya text-[clamp(22px,6vw,36px)] sm:text-5xl lg:text-6xl 2xl:text-7xl pt-8 xs:pt-10 lg:pt-16 2xl:pt-20 text-center"
            >
              How would you describe your
              <span className="sm:block md:inline"> coffee ritual?</span>
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
                      backgroundImage: `url('/img/2.png')`,
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

      <MobileQuizNav
        onPrev={navigatePrev}
        onNext={() => {
          if (value !== "") setFactToggled3(true);
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

export default QuestionThree;
