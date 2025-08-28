import styles from "../../style";
import Map from "../svg/Map";
import SlideOneChar from "../svg/SlideOneChar";
import FactCard from "../FactCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProvince } from "../../slices/QOneSlice";
import { motion, AnimatePresence } from "framer-motion";
import { MapSection } from "../map/map-section";
import { data } from "../map/data";

const QuestionOne = ({}) => {
  const [value, setValue] = useState("");

  // const province = useSelector((state) => state.QuestionOne.value);
  const dispatch = useDispatch();

  const handleSelection = (region) => {
    setValue(region);
    console.log("Selected region:", region);
  };

  const navigateNext = () => {
    if (value != "") {
      window.fullpage_api.moveSectionDown();

      dispatch(addProvince(value));
    }
  };

  const [factToggled1, setFactToggled1] = useState(false);
  return (
    <div className={`${styles.boxWidth}  mx-auto z-0 h-full `}>
      {/* NAVIGATION */}

      <div
        className={`z-10 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 md:-translate-y-[15%]`}
      >
        <div className="relative">
          <div className="absolute right-0 -top-52 buttonNotice-mobile  buttonNotice">
            <h2 className="font-alegreya 2xl:text-xl lg:text-sm hidden xs:block  xs:text-sm sm:text-base rotate-90  lg:-translate-x-1 text-ft-blue whitespace-nowrap w-10 md:w-8 ">
              Click here to go to the next question
            </h2>
          </div>
          <div
            className={
              value === ""
                ? "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center shadow-lg relative md:hidden touch-manipulation min-h-[44px] min-w-[44px]"
                : "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg md:hidden touch-manipulation min-h-[44px] min-w-[44px]"
            }
            onClick={() => {
              if (value !== "") {
                setFactToggled1(!factToggled1);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Show fact"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (value !== "") {
                  setFactToggled1(!factToggled1);
                }
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-6 h-6 sm:w-7 sm:h-7"
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
              value === ""
                ? "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full md:flex items-center justify-center shadow-lg relative hidden touch-manipulation min-h-[44px] min-w-[44px]"
                : "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full md:flex items-center justify-center cursor-pointer shadow-lg hidden touch-manipulation min-h-[44px] min-w-[44px]"
            }
            onClick={navigateNext}
            role="button"
            tabIndex={0}
            aria-label="Next question"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateNext();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-6 h-6 sm:w-7 sm:h-7"
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
      <div className="md:hidden">
        <div
          className={
            factToggled1
              ? `fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4`
              : `fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none`
          }
        >
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-alegreya text-lg sm:text-xl border-l-2 border-ft-blue pl-2 flex-1">
                  This isn't about farmers vs farm workers
                </h3>
                <button
                  onClick={() => {
                    setFactToggled1(!factToggled1);
                  }}
                  className="ml-4 bg-ft-dark-green text-white w-8 h-8 rounded-full flex items-center justify-center font-exo text-lg touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Close fact"
                >
                  ×
                </button>
              </div>
              <div className="mb-6">
                <p className="font-exo text-sm sm:text-base leading-relaxed">
                  This is about you. Farmers and farm workers alike need you to
                  choose fairness so farming can remain sustainable. By choosing
                  products with the Fairtrade logo, you're choosing sustainable
                  farming, decent work, and fair relationships between farmers,
                  farm workers and the retailers who buy their products. By
                  choosing Fairtrade, you're choosing transparency.
                </p>
              </div>
              <button
                className="bg-ft-dark-green text-white px-6 py-3 rounded-md shadow-lg font-exo text-base w-full touch-manipulation min-h-[44px]"
                onClick={() => {
                  window.fullpage_api.moveSectionDown(); // Move to the next slide
                  dispatch(addProvince(value));
                  setFactToggled1(false); // Close the popup after navigating
                }}
              >
                Go to Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END NAVIGATION FACT */}

      {/* CONTENT */}
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="flex items-center justify-center md:justify-start h-full md:flex-initial md:w-1/4">
          <motion.h2
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya text-4xl xs:text-6xl sm:text-7xl lg:text-7xl 2xl:text-9xl text-center md:text-left max-w-xs sm:max-w-xl md:max-w-[20rem] px-4 leading-tight pt-8 xs:pt-12 lg:pt-16 2xl:pt-20"
          >
            Where do you live in Kenya?
          </motion.h2>
        </div>
        
        {/* Speech Bubble for Selected Province - Mobile: Between Question and Map */}
        <AnimatePresence>
          {value && (
            <div className="flex justify-center mb-2 md:hidden">
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="message-box shadow-xl border border-white bg-white pb-6 pt-1 px-4 sm:text-3xl text-2xl font-alegreya text-black w-fit"
              >
                {value}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        

        <div className="md:flex items-center flex-1 pb-2 sm:pb-4 md:pb-0 px-4 sm:px-6 lg:px-8 xl:px-12">
          <MapSection
            width={500}
            height={500}
            handleSelection={handleSelection}
          />
        </div>
        <div className=" md:flex justify-between pr-8 xl:pr-12 flex-col items-end pt-28 lg:pt-32 xl:pt-40 flex-1 hidden">
          <div>
            <FactCard link="#">
              <h3 className="font-alegreya sm:text-2xl text-base border-l-2 border-ft-blue pl-2 mb-4">
                This isn't about farmers vs farm workers
              </h3>
              <p className="font-exo sm:text-sm text-xs">
                This is about you. Farmers and farm workers alike need you to
                choose fairness so farming can remain sustainable. By choosing
                products with the Fairtrade logo, you're choosing sustainable
                farming, decent work, and fair relationships between farmers,
                farm workers and the retailers who buy their products. By
                choosing Fairtrade, you're choosing transparency.
              </p>
            </FactCard>
          </div>
          <div className="lg:h-56 w-auto 2xl:h-auto h-28 sm:h-40">
            <SlideOneChar />
          </div>
        </div>
      </div>

      {/* END CONTENT */}
    </div>
  );
};

export default QuestionOne;
