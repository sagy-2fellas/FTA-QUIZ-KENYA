import styles from "../../style";
import FactCard from "../FactCard";
import ShoppingIcon from "../svg/ShoppingIcon";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goShopping } from "../../slices/QSixSlice";
import { goFTShopping } from "../../slices/QSixSliceRefined";
import QuizNavigation from "../QuizNavigation";
import { motion } from "framer-motion";

const QuestionSix = () => {
  const [shopArray, updateShopArray] = useState([]);
  const [refinedCart, updateRefinedCart] = useState([]);
  const [refineToggled, setRefineToggled] = useState(false);
  const [filterComplete, setFilterComplete] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);

  const [isHerbal, setIsHerbal] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const [isRose, setIsRose] = useState(false);
  const [isBeans, setIsBeans] = useState(false);
  const [isGround, setIsGround] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const [isRooibos, setIsRooibos] = useState(false);

  const [handProduct, setHandProduct] = useState("");

  const clearShelf = () => {
    setIsHerbal(false);
    setIsRed(false);
    setIsWhite(false);
    setIsRose(false);
    setIsBeans(false);
    setIsGround(false);
    setIsBlack(false);
    setIsRooibos(false);
    setHandProduct("");
  };

  const dispatch = useDispatch();
  let allowNext = "42";

  const selectProduct = (product) => {
    updateShopArray((arr) => [...arr, `${product}`]);
  };

  const handleChange = (event) => {
    updateRefinedCart((arr) => [...arr, `${event.target.name}`]);
  };

  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const navigateNext = (event) => {
    if (!refinePrompt && shopArray.length > 0) {
      setRefinePrompt(true);
    } else {
      window.fullpage_api.moveSectionDown();
    }

    // if (refineToggled === false && shopArray != "") {
    //   setRefineToggled(!false);
    //   console.log(shopArray);
    // } else if (refineToggled === true && shopArray != "") {
    //   window.fullpage_api.moveSectionDown();
    //   setFilterComplete(!false);
    //   event.preventDefault();
    //   function removeDuplicates(refinedCart) {
    //     return refinedCart.filter(
    //       (item, index) => refinedCart.indexOf(item) === index
    //     );
    //   }
    //   dispatch(goShopping(shopArray));
    //   dispatch(goFTShopping(removeDuplicates(refinedCart)));
    // } else {
    //   window.fullpage_api.moveSectionDown();
    //   dispatch(goShopping(shopArray));
    //   dispatch(goFTShopping(refinedCart));
    // }
  };

  const submitRefined = (event) => {
    window.fullpage_api.moveSectionDown();
    // setFilterComplete(!false);
    setRefinePrompt(false);
    setRefineToggled(false);
    event.preventDefault();
    function removeDuplicates(refinedCart) {
      return refinedCart.filter(
        (item, index) => refinedCart.indexOf(item) === index
      );
    }
    dispatch(goShopping(shopArray));
    dispatch(goFTShopping(removeDuplicates(refinedCart)));
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
      <div
        onClick={() => {
          setToggleCart(!toggleCart);
        }}
        className="shopping-cart w-12 h-12 xs:w-16 xs:h-16 shadow-lg rounded bg-white absolute right-4 bottom-4 sm:bottom-10 sm:right-10 z-40 "
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
      </div>
      <div
        className={
          refinePrompt || refineToggled || toggleCart
            ? `bg-black absolute w-screen h-screen left-0 top-0 opacity-50 z-10`
            : "hidden"
        }
      >
        {" "}
      </div>
      <div
        className={
          refinePrompt
            ? "bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]  p-6 w-72 xs:w-2/3 lg:!w-1/2 xl:!w-1/3  lg:p-20 rounded-lg mt-6 xs:mt-0"
            : "hidden"
        }
      >
        <h3 className="font-alegreya text-2xl lg:text-4xl  text-center">
          We don’t want to make assumptions, so refine your answers before you
          continue.{" "}
        </h3>
        <div className="flex flex-col lg:flex-row lg:gap-5">
          {" "}
          <button
            onClick={() => {
              setRefineToggled(true);
              setRefinePrompt(false);
            }}
            className="border mt-2 shadow-lg lg:!mt-10 rounded-2xl  py-1 px-4 md:px-10 text-xl font-alegreya w-full bg-ft-blue flex-1 text-ft-light-green"
          >
            OK
          </button>{" "}
          <button
            onClick={() => {
              setRefinePrompt(false);
              window.fullpage_api.moveSectionDown();
              dispatch(goShopping(shopArray));
            }}
            className="border mt-2 lg:!mt-10 rounded-2xl border-black py-1 px-4 md:px-10 text-xl font-alegreya w-full bg-white shadow-md"
          >
            Nah, I’m okay with a general answer
          </button>
        </div>
      </div>

      <div className={filterComplete === true ? "opacity-0" : ""}>
        <div
          className={
            refineToggled === false
              ? "bg-white rounded-lg shadow-lg  right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] sm:w-[600px] md:sm:w-[700px] p-2 xs:p-10 md:p-6 z-50 absolute pointer-events-none opacity-0 transition-all duration-100 mt-6 xs:mt-0"
              : "bg-white rounded-lg shadow-lg  right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%]  sm:w-[600px] md:sm:w-[700px] p-2 xs:p-10 md:p-6  z-50 absolute pointer-events-auto opacity-100 transition-all duration-1000 mt-6 xs:mt-0"
          }
        >
          <h3 className="font-alegreya text-3xl text-black z-50">
            Refine your selection
          </h3>
          <img
            src="/img/fairtrade-mark.png"
            className="lg:w-20 w-10 h-auto py-2 lg:py-5"
            alt=""
          />
          <h3 className="font-alegreya  text-base lg:text-xl text-black z-50">
            Remember this logo? It’s the Fairtrade logo. Check all the items you
            usually buy that have it on the packaging. Be honest here! If you
            don't know, don't tick any boxes – click submit!
          </h3>
          {shopArray === undefined ? (
            ""
          ) : (
            <form
              className="flex flex-col space-y-2 mt-6"
              onSubmit={submitRefined}
            >
              {shopArray.map((x, i) => {
                return (
                  <label key={`${x}--${i}`}>
                    <input name={x} type="checkbox" onChange={handleChange} />
                    <span className="ml-2 text-sm lg:text-base">
                      Some of my <span className="lowercase">{x}</span>{" "}
                      {x === "Coffee Beans" ? "have" : "has"} this label
                    </span>
                  </label>
                );
              })}
              <button
                type="submit"
                className="border mt-2 lg:!mt-10 rounded-2xl border-ft-blue text-white py-1 px-4 md:px-10 lg:text-2xl font-alegreya lg:w-full bg-ft-blue"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

      {/*END CART */}
      {/* NAVIGATION */}
      <QuizNavigation
        navigateNext={navigateNext}
        navigatePrev={navigatePrev}
        value={allowNext}
      />
      {/*END NAVIGATION */}

      {/* DESKTOP VERSION */}
      <div className="flex flex-col md:flex-row w-full h-[90vh] sm:h-[95vh] justify-between ">
        <div className=" flex flex-col md:flex-row items-center justify-start h-full flex-initial md:w-1/5 pt-24 md:pt-20">
          <h2 className="font-alegreya 2xl:text-7xl lg:text-5xl sm:text-6xl  md:text-4xl text-3xl xs:text-4xl  verticle-text ">
            Let's do a quick shop!
          </h2>
          <p className="font-alegreya 2xl:text-4xl text-2xl sm:text-3xl md:text-2xl verticle-text">
            Choose your favourites.
          </p>
        </div>
        <div>
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="flex items-end justify-center w-full h-full pb-28 lg:pb-0"
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
              isRooibos={isRooibos}
              setIsRooibos={setIsRooibos}
              handProduct={handProduct}
              setHandProduct={setHandProduct}
            />
          </motion.div>
        </div>
        <div className="flex-initial w-1/5"></div>
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
            whileInView={{ opacity: 1, x: 0 }}
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
              isRooibos={isRooibos}
              setIsRooibos={setIsRooibos}
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
    </div>
  );
};

export default QuestionSix;
