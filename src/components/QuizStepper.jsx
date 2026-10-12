import React, { useContext, useEffect } from "react";
import { SlideContext } from "../pages/quiz";

function Stepper() {
  let activeStepIndex = useContext(SlideContext);
  const currentQuestion = Math.min(Math.max(activeStepIndex[0] + 1, 1), 8);

  useEffect(() => {
    const stepperItems = document.querySelectorAll(".stepper-item");

    const stepperLines = document.querySelectorAll(".stepper-line");
    stepperItems.forEach((step, i) => {
      if (i === activeStepIndex[0]) {
        step.classList.add("!bg-ft-light-green");
      } else {
        step.classList.remove("!bg-ft-light-green");
      }
    });
    stepperLines.forEach((step, i) => {
      if (i <= activeStepIndex[0]) {
        step.classList.add("!border-ft-blue");
      } else {
        step.classList.remove("!border-ft-blue");
      }
    });
  }, [activeStepIndex]);
  return (
    <section className="z-10 min-w-0">
      <h3 className="mb-1 lg:mb-4 text-base sm:text-lg lg:text-xl font-alegreya">Quiz Questions</h3>

      <div className="lg:hidden w-full max-w-full" aria-label={`Question ${currentQuestion} of 8`}>
        <p className="font-exo text-sm font-semibold mb-1">Question {currentQuestion} of 8</p>
        <div
          className="h-2 w-full rounded-full bg-gray-300 overflow-hidden"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={1}
          aria-valuemax={8}
          aria-valuenow={currentQuestion}
        >
          <div
            className="h-full rounded-full bg-ft-dark-green transition-all duration-300"
            style={{ width: `${(currentQuestion / 8) * 100}%` }}
          />
        </div>
      </div>

      <div className="hidden lg:flex w-full flex-row items-center justify-start z-10">
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">1</p>
        </div>

        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">2</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">3</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">4</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">5</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">6</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">7</p>
        </div>
        <div className="w-2 sm:w-4 lg:w-6 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] min-h-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base lg:text-lg">8</p>
        </div>
      </div>
    </section>
  );
}

export default Stepper;
