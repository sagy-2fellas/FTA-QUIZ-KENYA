import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../style";

const NotFair = () => {
  const qOne = useSelector((state) => state.QuestionOne.value);
  const qTwo = useSelector((state) => state.QuestionTwo.value);
  const qThree = useSelector((state) => state.QuestionThree.value);
  const qFour = useSelector((state) => state.QuestionFour.value);
  const qFive = useSelector((state) => state.QuestionFive.value);
  const chocolateConsumer = useSelector(
    (state) => state.ChocolateConsumer.value
  );
  const qSix = useSelector((state) => state.QuestionSix.shoppingList);
  const qSixR = useSelector((state) => state.QuestionSixFT.shoppingListRefined);
  const qSeven = useSelector((state) => state.QuestionSeven.value);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    iAm: "",
    wouldBuy: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          customFields: {
            interested_in: formData.iAm,
            would_buy_more: formData.wouldBuy,
            question_1: qOne,
            question_2: qTwo,
            question_3: qThree,
            question_4: qFour,
            question_5: qFive,
            chocolate_consumer: chocolateConsumer,
            shopping_cart: qSix,
            ft_shopping_cart: qSixR,
            question_7: qSeven,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }
      document.location.href = "/thanks-for-signing-up";
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="relative z-50 h-screen w-screen">
      <div className="bgResults5 h-full w-screen bg-cover bg-center absolute"></div>
      <div className={`${styles.boxWidth} mx-auto h-full z-50`}>
        <div className="flex justify-center items-center h-full ">
          <div className=" flex flex-col justify-center items-center h-full">
            <h1 className="font-alegreya 2xl:text-8xl xs:text-4xl text-2xl text-white">
              Life isn't fair.
            </h1>
            <p className="font-alegreya lg:text-5xl xs:text-lg text-ft-dark-green">
              But you can be!
            </p>

            <form
              onSubmit={handleSubmit}
              className="xs:mt-4 grid grid-cols-2 gap-3 sm:gap-4"
            >
              <label className="col-span-2 py-4 sm:py-6">
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  name="wouldBuy"
                  className=" rounded-2xl "
                  defaultChecked
                />{" "}
                <span className="pl-4 font-exo text-white sm:text-lg lg:text-2xl">
                  I would buy more Fairtrade-certified products if they were
                  more accessible.
                </span>
              </label>
              <div className="col-span-2">
                <p className=" font-exo 2xl:text-4xl lg:text-2xl text-center text-white px-6">
                  Sign up to enter the giveaway and learn more.
                </p>
                <p className=" font-exo 2xl:text-4xl lg:text-2xl pt-4 text-center text-white xs:mb-4">
                  We'll tackle the rest now-now.
                </p>
              </div>
              <div className="col-span-2"></div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="col-span-1 sm:col-span-1 w-full min-w-0 appearance-none border rounded-2xl font-exo border-black bg-white py-1 sm:py-2 px-8 sm:text-xl text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                placeholder="First name"
              />
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="col-span-1 sm:col-span-1 w-full min-w-0 appearance-none border rounded-2xl font-exo border-black bg-white py-1 sm:py-2 px-8 sm:text-xl text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                placeholder="Last name"
              />
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="col-span-2 sm:col-span-2 w-full min-w-0 appearance-none border rounded-2xl font-exo border-black bg-white py-1 sm:py-2 px-8 sm:text-xl text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                placeholder="Email address"
              />

              <div className="col-span-2">
                <label htmlFor="iAm" className="sr-only">
                  I am...
                </label>
                <select
                  name="iAm"
                  id="iAm"
                  value={formData.iAm}
                  onChange={handleChange}
                  className="w-full border rounded-2xl font-exo border-black bg-white py-1 sm:py-2 px-8 sm:text-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <option value="" disabled selected hidden>
                    I am...
                  </option>
                  <option value="individual-interested">
                    I'm an individual interested in learning more about
                    Fairtrade products.
                  </option>
                  <option value="business-partnership">
                    I'm a business interested in partnership opportunities.
                  </option>
                  <option value="giveaway">
                    I'm just here for the giveaway.
                  </option>
                  <option value="individual-representing-business">
                    I'm an individual representing a business.
                  </option>
                </select>
              </div>

              <div className="xs:mt-3 rounded-md col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border shadow-xl rounded-2xl border-white text-white xs:py-2 px-4 md:px-10 text-2xl font-alegreya bg-ft-blue"
                >
                  {loading ? "Submitting..." : "Take me to the giveaway"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Success</p>}
              </div>
              <span className="font-exo text-ft-light-green !w-full text-center col-span-2">
                (Only good stuff, no spam. Promise!)
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFair;
