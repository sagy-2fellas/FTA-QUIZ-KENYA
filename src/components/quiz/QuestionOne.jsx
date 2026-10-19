import styles from "../../style";
import Map from "../svg/Map";
import SlideOneChar from "../svg/SlideOneChar";
import FactCard from "../FactCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProvince } from "../../slices/QOneSlice";
import { motion, AnimatePresence } from "framer-motion";
import { MapSection } from "../map/map-section";
import MobileFactDialog from "../MobileFactDialog";
import MobileQuizNav from "../MobileQuizNav";
import QuizNavigation from "../QuizNavigation";

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
    <div className={`${styles.boxWidth}  mx-auto z-0 h-full relative`}>
      <div className="hidden lg:block">
        <QuizNavigation navigateNext={navigateNext} value={value} />
      </div>

      {/* NAVIGATION FACT */}
      <MobileFactDialog
        open={factToggled1}
        onClose={() => setFactToggled1(false)}
        title="This isn't about farmers vs farm workers."
        onContinue={() => {
          setFactToggled1(false);
          dispatch(addProvince(value));
          window.fullpage_api.moveSectionDown();
        }}
      >
        <p className="font-exo text-sm sm:text-base leading-relaxed mb-3">
          It's about you. Everyone in the supply chain deserves fairness - from
          the people growing the crop to those harvesting it. When you choose
          products with the Fairtrade Mark, you back sustainable farming, decent
          work, and fair relationships across the chain - farmers, farm workers,
          and buyers alike.
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          Ulandssekretariatet (2024). Kenya Labour Market Profile 2024/2025.
          Copenhagen: The Danish Trade Union Council for International
          Development Cooperation (DTUC).
        </p>
      </MobileFactDialog>
      {/* END NAVIGATION FACT */}

      {/* CONTENT */}
      <div className="h-full w-full flex flex-col md:flex-row">
        <div className="flex items-center justify-center md:justify-start h-full md:flex-initial md:w-1/4">
          <motion.h2
            data-quiz-heading
            tabIndex={-1}
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya text-[clamp(20px,5vw,28px)] xs:text-6xl sm:text-7xl lg:text-7xl desktop:text-8xl fhd:text-9xl 2xl:text-9xl text-center md:text-left max-w-xs sm:max-w-xl md:max-w-[20rem] px-4 leading-tight pt-3 xs:pt-5 lg:pt-12 2xl:pt-16"
          >
            Where do you live in Kenya?
          </motion.h2>
        </div>
        
        {/* Speech Bubble for Selected Province - Mobile: Absolutely Positioned */}
        <AnimatePresence>
          {value && (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-[100px] xs:top-[130px] left-1/2 -translate-x-1/2 z-20 md:hidden message-box shadow-xl border border-white bg-white pb-2 pt-1 px-4 sm:text-3xl text-2xl font-alegreya text-black w-fit max-w-[90vw]"
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>
        

        <div className="md:flex items-center flex-1 pb-2 sm:pb-4 md:pb-0 px-4 sm:px-6 lg:px-8 xl:px-12 desktop:px-16 fhd:px-20">
          <MapSection
            width={500}
            height={500}
            handleSelection={handleSelection}
          />
        </div>
        <div className=" md:flex justify-between pr-20 xl:pr-24 flex-col items-end pt-28 lg:pt-32 xl:pt-40 flex-1 hidden">
          <div>
            <FactCard link="#">
              <h3 className="font-alegreya sm:text-2xl text-base border-l-2 border-ft-blue pl-2 mb-4">
                This isn't about farmers vs farm workers.
              </h3>
              <p className="font-exo sm:text-sm text-xs mb-3">
                It's about you. Everyone in the supply chain deserves fairness - from the people growing the crop to those harvesting it. When you choose products with the Fairtrade Mark, you back sustainable farming, decent work, and fair relationships across the chain - farmers, farm workers, and buyers alike.
              </p>
              <p className="font-exo text-xs text-gray-600 italic">
                Ulandssekretariatet (2024). Kenya Labour Market Profile 2024/2025. Copenhagen: The Danish Trade Union Council for International Development Cooperation (DTUC).
              </p>
            </FactCard>
          </div>
          <div className="lg:h-56 w-auto 2xl:h-auto h-28 sm:h-40">
            <SlideOneChar />
          </div>
        </div>
      </div>

      {/* END CONTENT */}

      <MobileQuizNav
        onNext={() => {
          if (value !== "") setFactToggled1(true);
        }}
        canContinue={value !== ""}
        nextAriaLabel="Continue to the next question"
      />

    </div>
  );
};

export default QuestionOne;
