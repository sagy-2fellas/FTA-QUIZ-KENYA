import styles from "../../style";
import FactCard from "../FactCard";
import QuizNavigation from "../QuizNavigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addConsumer } from "../../slices/QEightSlice";
import Consumers from "../svg/ConsumerIcon";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

const QuestionEight = () => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState("");

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

  const cart = useSelector((state) => state.QuestionSix.value);
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
      if (element.includes("Rose")) {
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
      if (element.includes("Rose")) {
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

    dispatch(addConsumer(isSelected));
  };
  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };

  const text = [
    `I’m a consumer`,
    `I’m a decision maker in the 
manufactoring/retail space`,
  ];
  const [factToggled8, setFactToggled8] = useState(false);
  return (
    <div className={`${styles.boxWidth} z-0`}>
      <QuizNavigation
        navigateNext={navigateNext}
        navigatePrev={navigatePrev}
        value={isSelected}
      />

      {/* end quiz nav */}
      <div className="h-screen w-full relative">
        <div className=" flex justify-start items-center flex-col h-full">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya 2xl:text-7xl sm:text-5xl text-4xl mt-36  max-w-5xl text-center "
          >
            Do you work in the FMCG industry?
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.9 }}
            className="font-alegreya  sm:text-4xl mt-2 sm:mt-6 text-2xl lg:max-w-3xl 2xl:max-w-4xl text-center "
          >
            (This helps us talk to you about the things that matter to you)
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 1 }}
            className="mt-4 sm:mt-36 max-w-2xl"
          >
            <button
              onClick={() => {
                setIsSelected("consumer");
              }}
              className={
                isSelected === "consumer"
                  ? "border rounded-2xl border-white text-white py-2 sm:py-6 px-4 md:px-10 sm:text-4xl text-xl font-alegreya w-10/12 sm:w-full bg-ft-dark-green"
                  : "border rounded-2xl border-black py-2 sm:py-6 px-4 md:px-10 sm:text-4xl text-xl font-alegreya w-10/12 sm:w-full bg-white"
              }
            >
              {text[0]}
            </button>
            <button
              onClick={() => {
                setIsSelected("Decision Maker");
              }}
              className={
                isSelected === "Decision Maker"
                  ? "mt-6 border rounded-2xl border-white text-white py-2 sm:py-6 px-4 md:px-10 sm:text-4xl text-xl font-alegreya w-10/12 sm:w-full bg-ft-dark-green"
                  : "mt-6 border rounded-2xl border-black py-2 sm:py-6 px-4 md:px-10 sm:text-4xl text-xl font-alegreya  w-10/12 sm:w-full bg-white"
              }
            >
              {text[1]}
            </button>
            <div className="sm:hidden ">
              <div
                onClick={() => {
                  setFactToggled8(!factToggled8);
                }}
                className="bg-ft-blue cursor-pointer absolute bottom-[20%] w-12 right-0 h-12 text-white  p-4 rounded-l-full flex flex-col items-center justify-center shadow-lg text-xs"
              >
                <p>See</p>
                <p>fact</p>
              </div>
              <div
                className={
                  factToggled8
                    ? `absolute right-20 top-40 bg-white px-4 pt-10 pb-1 rounded-md shadow-lg z-10 w-72 `
                    : `absolute  right-20 top-40 bg-white px-4 pt-10 pb-1  rounded-md shadow-lg z-10 w-72 opacity-0 pointer-events-none `
                }
              >
                <div className="">
                  <div
                    onClick={() => {
                      setFactToggled8(!factToggled8);
                    }}
                    className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white flex absolute left-1 top-1 rounded-lg font-exo text-lg "
                  >
                    x
                  </div>
                  <div className="mb-4">
                    <h3 className="font-alegreya sm:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                      You have more power than you think
                    </h3>
                    <p className="font-exo sm:text-sm text-xs">
                      Brands pay attention to what you care about. If you care
                      about fairness to people and planet, and if ubuntu is
                      something that resonates with you, there’s an easy way to
                      let decision-makers know. Finish the quiz to learn more!
                    </p>
                  </div>
                  <Link href="link">
                    <div className="flex items-center justify-start sm:pt-4 sm:pb-4 pt-1 border-t-2 rounded-md bg-white hover:bg-gray-50">
                      <p className="font-alegreya sm:text-lg pr-4 ">
                        Share on Twitter
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        x="0"
                        y="0"
                        viewBox="0 0 172 172"
                      >
                        <g
                          fill="none"
                          strokeLinejoin="none"
                          strokeMiterlimit="10"
                          strokeWidth="none"
                          fontFamily="none"
                          fontSize="none"
                          fontWeight="none"
                          textAnchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <path
                            fill="#000"
                            stroke="#ccc"
                            strokeLinejoin="round"
                            strokeWidth="10"
                            d="M145.265 55.602c.058 1.313.086 2.631.086 3.956 0 40.414-30.753 87.015-87.009 87.015-17.274 0-33.345-5.063-46.881-13.737 2.396.286 4.833.43 7.298.43 14.334 0 27.52-4.89 37.984-13.095-13.382-.247-24.676-9.093-28.57-21.242a31.14 31.14 0 005.751.544c2.792 0 5.498-.372 8.061-1.072-13.995-2.803-24.533-15.164-24.533-29.985v-.384a30.52 30.52 0 0013.852 3.824c-8.204-5.481-13.6-14.844-13.6-25.45a30.508 30.508 0 014.134-15.383C36.928 49.53 59.46 61.708 84.876 62.981a30.923 30.923 0 01-.79-6.966c0-16.885 13.69-30.582 30.58-30.582a30.534 30.534 0 0122.32 9.66 61.322 61.322 0 0019.425-7.424c-2.282 7.144-7.126 13.135-13.445 16.92a61.05 61.05 0 0017.567-4.817 62.233 62.233 0 01-15.268 15.83z"
                            transform="matrix(.942 0 0 .942 4.988 4.988)"
                          ></path>
                          <path
                            strokeLinejoin="miter"
                            strokeWidth="1"
                            d="M0 172V0h172v172z"
                            transform="matrix(.942 0 0 .942 4.988 4.988)"
                          ></path>
                          <path
                            fill="#000"
                            strokeLinejoin="miter"
                            strokeWidth="1"
                            d="M160.533 39.772a61.05 61.05 0 01-17.567 4.816c6.319-3.784 11.163-9.775 13.445-16.919a61.322 61.322 0 01-19.424 7.425 30.534 30.534 0 00-22.32-9.66c-16.89 0-30.582 13.696-30.582 30.58 0 2.397.275 4.736.791 6.967-25.416-1.273-47.948-13.45-63.038-31.958a30.508 30.508 0 00-4.133 15.383c0 10.606 5.395 19.969 13.599 25.45a30.52 30.52 0 01-13.852-3.824v.384c0 14.82 10.538 27.182 24.533 29.985a30.595 30.595 0 01-8.06 1.072c-1.967 0-3.888-.195-5.751-.544 3.893 12.149 15.187 20.995 28.569 21.242-10.464 8.204-23.65 13.095-37.984 13.095-2.465 0-4.902-.144-7.298-.43 13.536 8.674 29.607 13.737 46.881 13.737 56.256 0 87.01-46.6 87.01-87.015 0-1.325-.03-2.643-.087-3.956a62.233 62.233 0 0015.268-15.83z"
                            transform="matrix(.942 0 0 .942 4.988 4.988)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="hidden sm:block absolute 2xl:top-[15%] lg:top-[18%] top-[60%] left-[0%]">
            <FactCard link="#">
              <h3 className="font-alegreya sm:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                You have more power than you think
              </h3>
              <p className="font-exo sm:text-sm text-xs">
                Brands pay attention to what you care about. If you care about
                fairness to people and planet, and if ubuntu is something that
                resonates with you, there’s an easy way to let decision-makers
                know. Finish the quiz to learn more!
              </p>
            </FactCard>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", delay: 1 }}
            className="absolute 2xl:right-0 lg:-right-20 sm:bottom-0 lg:h-80 w-auto 2xl:h-auto z-[-1] h-[30%] bottom-0"
          >
            <Consumers />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEight;
