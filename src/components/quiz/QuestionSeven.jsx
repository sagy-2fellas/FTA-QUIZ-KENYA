import styles from "../../style";
import FactCard from "../FactCard";
import QuizNavigation from "../QuizNavigation";
import SliderRight from "../svg/SliderRightIcon";
import SliderLeft from "../svg/SliderLeftIcon";
import Slider from "../SliderTwo";
import SliderMob from "../SliderTwoMobile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDecide } from "../../slices/QSevenSlice";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
//deploy
const QuestionSeven = () => {
  const [currentValue, setCurrentValue] = useState(3);
  const [value, setValue] = useState(3);

  const router = useRouter();

  let wineDrinker = false;
  let coffeeDrinker = false;
  let teaDrinker = false;

  let FTwineDrinker = false;
  let FTcoffeeDrinker = false;
  let FTteaDrinker = false;

  let newCart = [];
  let newFTCart = [];

  let allFT = false;

  const dispatch = useDispatch();

  //help me console log all values stored in the state coming from react-redux
  // const state = useSelector((state) => state);
  // console.log(state);

  const cart = useSelector((state) => state.QuestionSix.shoppingList);

  const filteredCart = useSelector(
    (state) => state.QuestionSixFT.shoppingListRefined
  );

  const findDrinks = () => {
    cart.find((element) => {
      if (element.includes("White Wine")) {
        wineDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Red Wine")) {
        wineDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Rosé")) {
        wineDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Coffee Beans")) {
        coffeeDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Ground Coffee")) {
        coffeeDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Black Tea")) {
        teaDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Rooibos Tea")) {
        teaDrinker = true;
      }
    });
    cart.find((element) => {
      if (element.includes("Herbal Tea")) {
        teaDrinker = true;
      }
    });
  };

  const findFTDrinks = () => {
    filteredCart.find((element) => {
      if (element.includes("White Wine")) {
        FTwineDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Red Wine")) {
        FTwineDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Rosé")) {
        FTwineDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Coffee Beans")) {
        FTcoffeeDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Ground Coffee")) {
        FTcoffeeDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Black Tea")) {
        FTteaDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Rooibos Tea")) {
        FTteaDrinker = true;
      }
    });
    filteredCart.find((element) => {
      if (element.includes("Herbal Tea")) {
        FTteaDrinker = true;
      }
    });
  };

  const createFTArray = () => {
    if (teaDrinker === true) {
      newCart.push(true);
    }
    if (wineDrinker === true) {
      newCart.push(true);
    }
    if (coffeeDrinker === true) {
      newCart.push(true);
    }
    if (FTteaDrinker === true) {
      newFTCart.push(true);
    }
    if (FTwineDrinker === true) {
      newFTCart.push(true);
    }
    if (FTcoffeeDrinker === true) {
      newFTCart.push(true);
    }
  };

  const calculateAllFT = () => {
    if (JSON.stringify(newCart) === JSON.stringify(newFTCart)) {
      allFT = true;
    } else {
      allFT = false;
    }
  };

  const calculateRoute = () => {
    if (
      wineDrinker &&
      coffeeDrinker &&
      teaDrinker &&
      !FTwineDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker
    ) {
      return 1;
    } else if (
      coffeeDrinker &&
      !wineDrinker &&
      teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 2;
    } else if (
      coffeeDrinker &&
      wineDrinker &&
      !teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 3;
    } else if (
      !coffeeDrinker &&
      wineDrinker &&
      teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 4;
    } else if (
      coffeeDrinker &&
      !wineDrinker &&
      !teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 5;
    } else if (
      !coffeeDrinker &&
      !wineDrinker &&
      teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 6;
    } else if (
      !coffeeDrinker &&
      wineDrinker &&
      !teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 7;
    } else if (
      (wineDrinker && coffeeDrinker && teaDrinker && !allFT) ||
      (wineDrinker && coffeeDrinker && !allFT) ||
      (wineDrinker && teaDrinker && !allFT) ||
      (teaDrinker && coffeeDrinker && !allFT)
    ) {
      return 8;
    } else if (
      coffeeDrinker &&
      wineDrinker &&
      teaDrinker &&
      FTcoffeeDrinker &&
      FTteaDrinker &&
      FTwineDrinker
    ) {
      return 9;
    } else if (
      !coffeeDrinker &&
      !wineDrinker &&
      teaDrinker &&
      !FTcoffeeDrinker &&
      FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 10;
    } else if (
      coffeeDrinker &&
      !wineDrinker &&
      !teaDrinker &&
      FTcoffeeDrinker &&
      !FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 11;
    } else if (
      !coffeeDrinker &&
      wineDrinker &&
      !teaDrinker &&
      !FTcoffeeDrinker &&
      !FTteaDrinker &&
      FTwineDrinker
    ) {
      return 12;
    } else if (
      coffeeDrinker &&
      teaDrinker &&
      !wineDrinker &&
      FTcoffeeDrinker &&
      FTteaDrinker &&
      !FTwineDrinker
    ) {
      return 13;
    } else if (
      coffeeDrinker &&
      !teaDrinker &&
      wineDrinker &&
      FTcoffeeDrinker &&
      !FTteaDrinker &&
      FTwineDrinker
    ) {
      return 14;
    } else if (
      !coffeeDrinker &&
      teaDrinker &&
      wineDrinker &&
      !FTcoffeeDrinker &&
      FTteaDrinker &&
      FTwineDrinker
    ) {
      return 15;
    } else if (!coffeeDrinker && !wineDrinker && !teaDrinker) {
      return 16;
    } else {
      return 8;
    }
  };

  const setDrinksStates = () => {
    findDrinks();
    findFTDrinks();
    createFTArray();
    calculateAllFT();
  };

  const navigateNext = () => {
    setDrinksStates();

    switch (calculateRoute()) {
      case 1:
        router.push("/result-1#home", undefined, { shallow: true });
        break;
      case 2:
        router.push("/result-2#home", undefined, { shallow: true });
        break;
      case 3:
        router.push("/result-3#home", undefined, { shallow: true });
        break;
      case 4:
        router.push("/result-4#home", undefined, { shallow: true });
        break;
      case 5:
        router.push("/result-5#home", undefined, { shallow: true });
        break;
      case 6:
        router.push("/result-6#home", undefined, { shallow: true });
        break;
      case 7:
        router.push("/result-7#home", undefined, { shallow: true });
        break;
      case 8:
        router.push("/result-8#home", undefined, { shallow: true });
        break;
      case 9:
        router.push("/result-9#home", undefined, { shallow: true });
        break;
      case 10:
        router.push("/result-10#home", undefined, { shallow: true });
        break;
      case 11:
        router.push("/result-11#home", undefined, { shallow: true });
        break;
      case 12:
        router.push("/result-12#home", undefined, { shallow: true });
        break;
      case 13:
        router.push("/result-13#home", undefined, { shallow: true });
        break;
      case 14:
        router.push("/result-14#home", undefined, { shallow: true });
        break;
      case 15:
        router.push("/result-15#home", undefined, { shallow: true });
        break;
      case 16:
        router.push("/result-16#home", undefined, { shallow: true });
        break;
    }

    dispatch(addDecide(currentValue));
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
        <div>
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
                  setFactToggled7(!factToggled7);
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

        {/* <div
          onClick={() => {
            setFactToggled7(!factToggled7);
          }}
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 "
        >
          <span class="animate-ping  absolute inline-flex h-full w-full rounded-r-full bg-ft-blue opacity-75  "></span>
          <span class="relative inline-flex rounded-r-full w-16 h-18 bg-ft-blue  flex-col items-center justify-center p-2 text-xs !pr-6 text-white ">
            <span className="font-bold z-50">click</span>
            <span className="font-bold z-50">for a</span>
            <span className="font-bold z-50">fact!</span>
          </span>
        </div> */}
        <div
          className={
            factToggled7
              ? ` bg-white px-4 pt-10 pb-4 rounded-md shadow-lg z-20 w-72 lg:hidden absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mt-6 xs:mt-0`
              : ` bg-white px-4 pt-10 pb-4  rounded-md shadow-lg z-20 w-72 opacity-0 pointer-events-none lg:hidden absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mt-6 xs:mt-0`
          }
        >
          <div className="">
            <div
              onClick={() => {
                setFactToggled7(!factToggled7);
              }}
              className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white flex absolute left-1 top-1 rounded-lg font-exo text-lg "
            >
              x
            </div>
            <div className="mb-4">
              <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                Farms are disappearing.
              </h3>
              <p className="font-exo text-sm">
                Kenya's vital ecosystems are under threat, endangering countless
                species and the essential services they provide to farms. Simply
                put, your favorite cup of Kenyan tea might not be around forever
                if things don't change.
              </p>
              <p className="font-exo sm:text-xs text-xs mt-2">
                World Wildlife Fund (WWF) (2010): Agriculture: Facts & Trends
                South Africa, South Africa.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-ft-dark-green text-white px-4 py-2 rounded-md shadow-lg font-exo text-base w-full"
                onClick={navigateNext}
              >
                View your results
              </button>
            </div>
          </div>
        </div>

        {/* end quiz nav */}

        <div className="flex flex-col w-full justify-between h-[90vh] sm:h-[85vh] lg:h-[95vh] 2xl:h-[90vh] pb-20 lg:pb-0">
          <div className="flex lg:justify-between justify-center  w-full ">
            <div className="hidden lg:flex flex-initial w-1/5 pt-20 lg:pt-40 xl:pt-56">
              <FactCard link="#">
                <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                  Farms are disappearing.
                </h3>
                <p className="font-exo text-sm">
                  Kenya's vital ecosystems are under threat, endangering
                  countless species and the essential services they provide to
                  farms. Simply put, your favorite cup of Kenyan tea might not
                  be around forever if things don't change.
                </p>
                <p className="font-exo sm:text-xs text-xs mt-2">
                  World Wildlife Fund (WWF) (2010): Agriculture: Facts & Trends
                  South Africa, South Africa.
                </p>
              </FactCard>
            </div>
            <div className="flex justify-center  h-full items-center">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", delay: 0.5 }}
                className="font-alegreya text-2xl xs:text-4xl sm:text-5xl lg:text-5xl 2xl:text-7xl max-w-3xl 2xl:max-w-4xl text-center pt-8 xs:pt-12 lg:pt-16 2xl:pt-20"
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
    </div>
  );
};

export default QuestionSeven;
