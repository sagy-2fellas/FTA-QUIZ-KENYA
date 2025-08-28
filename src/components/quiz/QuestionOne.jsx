import styles from "../../style";
import Map from "../svg/Map";
import SlideOneChar from "../svg/SlideOneChar";
import FactCard from "../FactCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProvince } from "../../slices/QOneSlice";
import { motion } from "framer-motion";
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
    <div className={`${styles.boxWidth}  mx-auto z-50 h-full `}>
      {/* NAVIGATION */}

      <div
        className={`z-10 absolute right-0 top-1/2 -translate-y-1/2 md:-translate-y-[15%]`}
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
                ? "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] shadow-lg relativ md:hidden"
                : "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer shadow-lg md:hidden"
            }
            onClick={() => {
              if (value !== "") {
                setFactToggled1(!factToggled1);
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
          <div
            className={
              value === ""
                ? "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full md:flex items-center justify-center shadow-lg relativ hidden"
                : "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full md:flex items-center justify-center cursor-pointer shadow-lg hidden"
            }
            onClick={navigateNext}
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
      <div className="md:hidden">
        <div
          className={
            factToggled1
              ? `absolute top-1/2  right-1/2 -translate-y-1/2 translate-x-1/2 bg-white px-4 pt-10 pb-4 rounded-md shadow-lg z-10 w-72 mt-6 xs:!mt-0`
              : `absolute top-1/2  right-1/2 translate-x-1/2  bg-white px-4 pt-10 pb-4  rounded-md shadow-lg z-10 w-72 opacity-0 pointer-events-none mt-6 xs:!mt-0`
          }
        >
          <div className="">
            <div
              onClick={() => {
                setFactToggled1(!factToggled1);
              }}
              className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white flex absolute left-1 top-1 rounded-lg font-exo text-lg "
            >
              x
            </div>
            <div className="mb-4">
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
            </div>
            {/* New Button to Navigate to the Next Slide */}
            <div className="flex justify-center mt-4">
              <button
                className="bg-ft-dark-green text-white px-4 py-2 rounded-md shadow-lg font-exo text-base w-full"
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
            className="font-alegreya text-3xl xs:text-4xl sm:!text-7xl    2xl:!text-8xl text-center md:text-left max-w-xs sm:max-w-xl  md:max-w-[20rem]"
          >
            Where do you live in Kenya?
          </motion.h2>
        </div>
        <div className=" md:flex items-center flex-1 pb-4 sm:!pb-10 md:!pb-0 ">
          <div>
            {" "}
            <MapSection
              width={400}
              height={400}
              handleSelection={handleSelection}
            />
          </div>
        </div>
        <div className=" md:flex justify-between pr-12 flex-col items-end pt-28 lg:pt-40 flex-1 hidden">
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
