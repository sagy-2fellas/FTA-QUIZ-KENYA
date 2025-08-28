import styles from "../../style";
import QuestionMarkIcon from "../svg/QuestionMarkIcon";
import SlideTwoChar from "../svg/SlideTwoChar";
import FactCard from "../FactCard";
import Image from "next/image";
import Slider from "../SliderOne";
import { useSelector, useDispatch } from "react-redux";
import { addFamiliar } from "../../slices/QTwoSlice";
import QuizNavigation from "../QuizNavigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TiArrowForward } from "react-icons/ti";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const QuestionTwo = () => {
  const [overlayClick, setOverlayClick] = useState(false);
  const overlayRef = useRef(null);
  const dispatch = useDispatch();
  const min = 1;
  const max = 5;
  const allowedValues = [1, 2, 3, 4, 5];
  const [value, setValue] = useState(3);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleSize = 80;
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
    if (value === 1) return "No idea what this is";
    if (value === 2) return "Might have seen it before";
    if (value === 3) return "Noticed it on some products";
    if (value === 4) return "Know it, but not sure where to buy";
    if (value === 5) return "Love it and I choose it when I can";
    return Math.floor(value); // Default case (if needed)
  };

  useEffect(() => {
    const handleClickInside = (event) => {
      if (overlayRef.current && overlayRef.current.contains(event.target)) {
        setOverlayClick(false); // Close overlay only when clicking inside
      }
    };

    if (overlayClick) {
      document.addEventListener("mousedown", handleClickInside);
    } else {
      document.removeEventListener("mousedown", handleClickInside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, [overlayClick]);

  const navigateNext = () => {
    window.fullpage_api.moveSectionDown();
    dispatch(addFamiliar(value));
  };
  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const [factToggled2, setFactToggled2] = useState(false);
  return (
    <div className={`${styles.boxWidth} z-0 h-full`}>
      {/* quiz nav */}
      <div>
        <div className="hidden lg:block">
          <QuizNavigation
            navigateNext={navigateNext}
            navigatePrev={navigatePrev}
            value={value}
          />
        </div>
        <div
          className={`z-10 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 space-y-2 lg:hidden`}
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
                setFactToggled2(!factToggled2);
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

      {/* end quiz nav */}

      {/* NAVIGATION FACT */}
      <div className="lg:hidden">
        <div
          className={
            factToggled2
              ? `absolute top-1/2  right-1/2 -translate-y-1/2 translate-x-1/2 bg-white px-4 pt-10 pb-4 rounded-md shadow-lg z-10 w-72 mt-6 xs:!mt-0`
              : `absolute  top-1/2  right-1/2 translate-x-1/2 bg-white px-4 pt-10 pb-4  rounded-md shadow-lg z-10 w-72 opacity-0 pointer-events-none mt-6 xs:!mt-0`
          }
        >
          <div className="">
            <div
              onClick={() => {
                setFactToggled2(!factToggled2);
              }}
              className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white flex absolute left-1 top-1 rounded-lg font-exo text-lg "
            >
              x
            </div>
            <div className="mb-4">
              <h3 className="font-alegreya sm:text-2xl border-l-2  border-ft-blue pl-2 mb-4">
                Do you know what a farm worker earns per month?
              </h3>
              <p className="font-exo sm:text-sm text-xs">
                There are estimated to be over 3 million farmers and farm
                workers in Kenya. By law, the minimum wage for agricultural
                workers varies by region and specific tasks. But in reality,
                many workers earn between 7K to 10K KES per month, with some
                earning far less.
              </p>
              <p className="font-exo sm:text-xs text-xs mt-2">
                Source: WageIndicator Foundation
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-ft-dark-green text-white px-4 py-2 rounded-md shadow-lg font-exo text-base w-full"
                onClick={() => {
                  window.fullpage_api.moveSectionDown();
                  dispatch(addFamiliar(value)); // Move to the next slide
                  setFactToggled2(false); // Close the popup after navigating
                }}
              >
                Go to Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END NAVIGATION FACT */}
      {/* CONTENT SEVTION */}
      <div className="flex h-full relative w-full">
        <div className="animate-q-3 absolute top-[35%] left-[22%]  z-[-1] hidden sm:block">
          <QuestionMarkIcon />
        </div>
        <div className=" animate-q-1 absolute top-[40%] left-[70%] z-[-1] hidden sm:block">
          <QuestionMarkIcon />
        </div>
        <div className="animate-q-2 absolute top-[18%] left-[85%] rotate-90 z-[-1] hidden sm:block">
          <QuestionMarkIcon />
        </div>
        <div className="animate-q absolute bottom-[8%] right-[10%] rotate-180 z-[-1] hidden sm:block">
          <QuestionMarkIcon />
        </div>
        <div className=" animate-q-4 absolute bottom-[5%] left-[30%] rotate-90 z-[-1] hidden sm:block">
          <QuestionMarkIcon />
        </div>
        <div className="hidden lg:flex flex-col justify-end h-full gap-y-4 xl:gap-y-20">
          <FactCard link="#">
            <h3 className="font-alegreya sm:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
              Do you know what a farm worker earns per month?
            </h3>
            <p className="font-exo sm:text-sm text-xs">
              There are estimated to be over 3 million farmers and farm workers
              in Kenya. By law, the minimum wage for agricultural workers varies
              by region and specific tasks. But in reality, many workers earn
              between 7K to 10K KES per month, with some earning far less.
            </p>
            <p className="font-exo sm:text-xs text-xs mt-2">
              Source: WageIndicator Foundation
            </p>
          </FactCard>
          <SlideTwoChar value={value} />
        </div>
        <div className="flex  h-[92vh] lg:h-[95vh] 2xl:h-[90vh]  w-full">
          <div className="flex flex-col items-center justify-between  flex-initial w-full  lg:w-4/5  sm:gap-y-14 lg:gap-16 2xl:gap-y-20">
            {" "}
            <motion.h2
              initial={{ opacity: 0, y: 300 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", delay: 0.5 }}
              className="font-alegreya text-2xl xs:text-4xl sm:text-5xl lg:!text-5xl 2xl:!text-7xl pt-24 xs:pt-40 lg:pt-40 2xl:!pt-56 text-center"
            >
              How familiar are you with this logo?
            </motion.h2>
            <div className="grid lg:grid-cols-3 items-center gap-y-2 xs:gap-y-6">
              <div className="lg:col-span-1 w-28 h-20 xs:h-full xs:w-full mx-auto">
                <Image
                  src="/img/fairtrade-mark.png"
                  height={150}
                  width={300}
                  alt="#"
                  className="object-contain "
                />
              </div>
              <div className="lg:col-span-2 mx-auto">
                {!dragging && (
                  <motion.div
                    key={displayedValue()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="message-box   shadow-xl border  border-white bg-white  pb-6 pt-1 px-4 md:px-10 md:text-3xl sm:text-2xl  font-alegreya text-black md:text-black w-fit "
                  >
                    {displayedValue()}
                  </motion.div>
                )}
              </div>
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
                <div className="absolute w-full px-4 lg:px-10">
                  <div className="flex justify-between">
                    <span className="h-12 lg:h-10 w-4 bg-black rounded-full"></span>
                    <span className="h-12 lg:h-10 w-4 bg-black rounded-full"></span>
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
                    className="relative z-10  rounded-full cursor-pointer bg-ft-blue"
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
                      scale: dragging ? 1.2 : 0.8,
                    }}
                    style={{
                      width: handleSize,
                      height: handleSize,
                      x: handleX,

                      backgroundSize: "contain",

                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {overlayClick && (
        <div className="absolute top-0 left-0 inset-0 bg-black bg-opacity-80 w-full h-screen z-[9999]">
          <div
            className="flex items-center justify-center h-full px-4 lg:px-0 lg:pt-40"
            ref={overlayRef}
          >
            <div className="flex items-center gap-x-4">
              <p className="text-white font-alegreya text-2xl xs:text-4xl lg:!text-5xl text-center">
                Toggle slider to select your answer!
              </p>
              <div className="rotate-90">
                <TiArrowForward className="h-10 w-10 animate-slide text-white " />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTwo;
