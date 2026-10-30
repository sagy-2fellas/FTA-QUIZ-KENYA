import styles from "../../style";
import FactCard from "../FactCard";
import ShoppingIcon from "../svg/ShoppingIcon";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goShopping } from "../../slices/QSixSlice";
import { goFTShopping } from "../../slices/QSixSliceRefined";
import QuizNavigation from "../QuizNavigation";
import MobileQuizNav from "../MobileQuizNav";
import MobileFactDialog from "../MobileFactDialog";
import { motion } from "framer-motion";

const QuestionSix = () => {
  const [shopArray, updateShopArray] = useState([]);
  const [refinedCart, updateRefinedCart] = useState([]);
  const [refineToggled, setRefineToggled] = useState(false);
  const [shoppingFactToggled, setShoppingFactToggled] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [noneSelected, setNoneSelected] = useState(false);

  const [isHerbal, setIsHerbal] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const [isRose, setIsRose] = useState(false);
  const [isBeans, setIsBeans] = useState(false);
  const [isGround, setIsGround] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const [isSpiced, setIsSpiced] = useState(false);

  const [handProduct, setHandProduct] = useState("");

  const clearShelf = () => {
    setNoneSelected(false);
    setIsHerbal(false);
    setIsRed(false);
    setIsWhite(false);
    setIsRose(false);
    setIsBeans(false);
    setIsGround(false);
    setIsBlack(false);
    setIsSpiced(false);
    setHandProduct("");
  };

  const dispatch = useDispatch();
  let allowNext = shopArray.length > 0 || noneSelected ? "enabled" : "";

  const selectProduct = (product) => {
    setNoneSelected(false);
    updateShopArray((arr) =>
      arr.includes(product) ? arr.filter((item) => item !== product) : [...arr, product]
    );
  };

  const selectNone = () => {
    updateShopArray([]);
    updateRefinedCart([]);
    clearShelf();
    setNoneSelected(true);
  };

  const mobileProducts = [
    ["White Wine", setIsWhite, "white-wine"],
    ["Red Wine", setIsRed, "red-wine"],
    ["Rosé", setIsRose, "rose"],
    ["Coffee Beans", setIsBeans, "coffee-beans"],
    ["Ground Coffee", setIsGround, "ground-coffee"],
    ["Black Tea", setIsBlack, "black-tea"],
    ["Spiced Tea", setIsSpiced, "spiced-tea"],
    ["Herbal Tea", setIsHerbal, "herbal-tea"],
  ];

  const handleChange = (event) => {
    const { name, checked } = event.target;
    updateRefinedCart((arr) =>
      checked ? [...new Set([...arr, name])] : arr.filter((item) => item !== name)
    );
  };

  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const navigateNext = () => {
    if (noneSelected) {
      dispatch(goShopping([]));
      dispatch(goFTShopping([]));
      setShoppingFactToggled(true);
      return;
    }
    if (shopArray.length === 0) return;
    setRefineToggled(true);
  };

  const submitRefined = () => {
    dispatch(goShopping(shopArray));
    dispatch(goFTShopping(refinedCart.filter((item) => shopArray.includes(item))));
    setRefineToggled(false);
    setShoppingFactToggled(true);
  };

  const continueAfterShoppingFact = () => {
    setShoppingFactToggled(false);
    window.fullpage_api.moveSectionDown();
  };

  return (
    <div className={`${styles.boxWidth} h-full mx-auto`}>
      {/* CART */}
      <div
        className={
          toggleCart
            ? "shopping-cart-expanded absolute bg-white p-10  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -tr rounded-lg shadow-lg z-50 w-3/4 lg:w-1/3"
            : "hidden pointer-events-none"
        }
      >
        <h4 className="font-alegreya text-3xl">Shopping Cart:</h4>
        <ul>
          {shopArray.map((x, i) => {
            return (
              <li className="font-exo" key={`cart-${x}`}>
                1x {x}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-1  lg:gap-5">
          <button
            onClick={() => {
              updateShopArray([]);
              clearShelf();
              setToggleCart(false);
            }}
            className="border !mt-10 rounded-2xl border-black py-1 px-1 md:px-10 text-base font-alegreya w-full bg-white shadow-md "
          >
            Clear Cart
          </button>
          <button
            onClick={() => {
              setToggleCart(false);
            }}
            className="border !mt-10 rounded-2xl border-ft-blue py-1 px-4 md:px-10 text-base font-alegreya w-full bg-ft-blue text-white shadow-md  cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label={`Shopping cart, ${shopArray.length} items`}
        onClick={() => {
          setToggleCart(!toggleCart);
        }}
        className="shopping-cart hidden lg:block w-12 h-12 xs:w-16 xs:h-16 shadow-lg rounded bg-white absolute right-4 bottom-4 sm:bottom-10 sm:right-10 z-40 "
      >
        <div className="flex items-center justify-center relative w-full h-full">
          <div className="bg-ft-blue  rounded-full h-8 w-8 flex items-center justify-center  absolute top-[-36%] left-[-36%]">
            <span className="font-exo text-white shadow-lg text-sm ">
              {shopArray.length}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 xs:w-10 xs:h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </button>
      <div
        className={
          toggleCart
            ? `bg-black absolute w-screen h-screen left-0 top-0 opacity-50 z-10`
            : "hidden"
        }
      >
        {" "}
      </div>
      <MobileFactDialog
        open={refineToggled}
        onClose={() => setRefineToggled(false)}
        title="Refine your selection"
        continueLabel="Save and continue"
        onContinue={submitRefined}
      >
        <img src="/img/fairtrade-mark.png" width="48" height="57" alt="Fairtrade Mark" className="w-12 h-auto mb-3" />
        <p className="font-exo text-sm leading-relaxed">
          Which of these products do you buy with this label? Not sure?
          Leave them unticked and continue.
        </p>
        <div className="flex flex-col mt-4 divide-y divide-gray-200">
          {shopArray.map((product) => (
            <label key={product} className="flex items-center cursor-pointer py-3 min-h-[44px] font-exo">
              <input
                name={product}
                type="checkbox"
                checked={refinedCart.includes(product)}
                onChange={handleChange}
                className="w-5 h-5 shrink-0 cursor-pointer accent-ft-blue"
              />
              <span className="ml-3 text-sm flex-1">
                Some of my <span className="lowercase">{product}</span>{" "}
                {product === "Coffee Beans" ? "have" : "has"} this label
              </span>
            </label>
          ))}
        </div>
      </MobileFactDialog>

      <MobileFactDialog
        open={shoppingFactToggled}
        onClose={() => setShoppingFactToggled(false)}
        title="The label is small. The checks behind it aren’t."
        onContinue={continueAfterShoppingFact}
      >
        <p className="font-exo text-sm sm:text-base leading-relaxed mb-3">
          A product’s ethical-sounding packaging tells you little about the terms behind it. The Fairtrade Mark identifies a product whose relevant supply chain is checked against Fairtrade standards, including applicable Minimum Price and Premium requirements. Look for the Mark on the specific item you are buying.
        </p>
        <p className="font-exo text-xs sm:text-sm text-gray-600 italic">
          Fairtrade International, How Fairtrade Certification Works.
        </p>
      </MobileFactDialog>

      {/*END CART */}
      {/* NAVIGATION */}
      <div className="hidden lg:block">
        <QuizNavigation
          navigateNext={navigateNext}
          navigatePrev={navigatePrev}
          value={allowNext}
        />
      </div>
      {/*END NAVIGATION */}

      {/* DESKTOP VERSION */}
      <div data-quiz-pane className="flex flex-col md:flex-row w-full h-[90vh] sm:h-[95vh] justify-center gap-y-1 sm:gap-y-1 lg:gap-y-2">
        <div className=" flex flex-col md:flex-row items-center justify-center h-full flex-initial md:w-1/5 pt-5 lg:pt-16 2xl:pt-20">
          <h2
            data-quiz-heading
            tabIndex={-1}
            className="font-alegreya text-4xl xs:text-6xl sm:text-7xl lg:text-7xl 2xl:text-9xl verticle-text">
            Let's do a quick shop!
          </h2>
          <p className="font-alegreya 2xl:text-4xl text-2xl sm:text-3xl md:text-2xl verticle-text">
            Choose your favourites.
          </p>
        </div>
        <div className="quiz-shop-shelves lg:hidden">
          {[mobileProducts.slice(0, 3), mobileProducts.slice(3, 5), mobileProducts.slice(5)].map((shelf, index) => (
            <div className="quiz-shop-shelf" key={index} style={{ gridTemplateColumns: `repeat(${shelf.length}, minmax(0, 1fr))` }}>
              {shelf.map(([product, setSelected, artwork]) => {
                const selected = shopArray.includes(product);
                return (
                  <button
                    key={product}
                    type="button"
                    aria-label={product}
                    aria-pressed={selected}
                    onClick={() => {
                      selectProduct(product);
                      setSelected(!selected);
                    }}
                    className="quiz-shop-product"
                  >
                    <img src={`/img/shop/${artwork}.svg`} alt="" width="64" height="56" />
                    <span>{product}</span>
                    {selected && <svg className="quiz-shop-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3" /></svg>}
                  </button>
                );
              })}
            </div>
          ))}
          <p className="quiz-shop-count" aria-live="polite">
            <span key={shopArray.length}>{shopArray.length ? `${shopArray.length} in your basket · Tap again to remove` : "Tap your favourites to fill your basket"}</span>
          </p>
          <button
            type="button"
            aria-pressed={noneSelected}
            onClick={selectNone}
            className={`quiz-shop-none ${noneSelected ? "quiz-shop-none-selected" : ""}`}
          >
            I don't buy any of these
          </button>
        </div>
        <div className="hidden lg:block">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="relative flex items-end justify-center w-full h-full pb-28 lg:pb-0 lg:p-8 mt-2"
          >
            <ShoppingIcon
              selectProduct={selectProduct}
              isHerbal={isHerbal}
              setIsHerbal={setIsHerbal}
              isRed={isRed}
              setIsRed={setIsRed}
              isWhite={isWhite}
              setIsWhite={setIsWhite}
              isRose={isRose}
              setIsRose={setIsRose}
              isBeans={isBeans}
              setIsBeans={setIsBeans}
              isGround={isGround}
              setIsGround={setIsGround}
              isBlack={isBlack}
              setIsBlack={setIsBlack}
              isSpiced={isSpiced}
              setIsSpiced={setIsSpiced}
              handProduct={handProduct}
              setHandProduct={setHandProduct}
            />
            <button
              type="button"
              aria-pressed={noneSelected}
              onClick={selectNone}
              className={`quiz-shop-none quiz-shop-none-desktop ${noneSelected ? "quiz-shop-none-selected" : ""}`}
            >
              I don't buy any of these
            </button>
          </motion.div>
        </div>
        <div className="hidden lg:flex flex-initial w-1/5 items-end">
          <FactCard link="#">
            <h3 className="font-alegreya text-2xl border-l-2 border-ft-blue pl-2 mb-4">
              The label is small. The checks behind it aren’t.
            </h3>
            <p className="font-exo text-sm mb-2">
              A product’s ethical-sounding packaging tells you little about the terms behind it. The Fairtrade Mark identifies a product whose relevant supply chain is checked against Fairtrade standards, including applicable Minimum Price and Premium requirements. Look for the Mark on the specific item you are buying.
            </p>
            <p className="font-exo text-xs italic text-gray-600">
              Fairtrade International, How Fairtrade Certification Works.
            </p>
          </FactCard>
        </div>
      </div>

      {/*END DESKTOP VERSION */}

      {/* MOBILE VERSION */}
      {/* <div className="grid  h-full w-full grid-rows-6 sm:hidden grid-cols-1  pb-4">
        <div className=" w-full h-full row-span-3 items-center justify-center flex">
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya   text-center  xs:pb-10"
          >
            <h2 className="text-3xl xs:text-4xl">Let's do a quick shop!</h2>
            <p className="text-2xl">Choose your favourites.</p>
          </motion.div>
        </div>
        <div className=" w-full row-span-3  flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className=" top-48 w-auto absolute -right-72  h-[65%] xs:h-[70%] ss:h-[80%] ss:-right-5  xs:-right-56 xs:top-64 ss:top-64"
          >
            <ShoppingIcon
              selectProduct={selectProduct}
              isHerbal={isHerbal}
              setIsHerbal={setIsHerbal}
              isRed={isRed}
              setIsRed={setIsRed}
              isWhite={isWhite}
              setIsWhite={setIsWhite}
              isRose={isRose}
              setIsRose={setIsRose}
              isBeans={isBeans}
              setIsBeans={setIsBeans}
              isGround={isGround}
              setIsGround={setIsGround}
              isBlack={isBlack}
              setIsBlack={setIsBlack}
              isSpiced={isSpiced}
              setIsSpiced={setIsSpiced}
              handProduct={handProduct}
              setHandProduct={setHandProduct}
            />
          </motion.div>
          <div
            onClick={() => {
              setToggleCart(!toggleCart);
            }}
            className="shopping-cart w-16 h-16 shadow-lg rounded bg-white absolute bottom-[3%]  right-[3%] z-40 "
          >
            <div className="flex items-center justify-center relative w-full h-full">
              <div className="rounded-full bg-ft-blue px-4 py-2 absolute top-[-36%] left-[-36%]">
                <span className="font-exo text-white shadow-lg text-sm">
                  {shopArray.length}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div> */}

      {/*END MOBILE VERSION */}

      <MobileQuizNav
        onPrev={navigatePrev}
        onNext={navigateNext}
        canContinue={shopArray.length > 0 || noneSelected}
        nextAriaLabel="Continue to the next question"
      />

    </div>
  );
};

export default QuestionSix;
