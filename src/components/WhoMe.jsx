import styles from "../style";
import Image from "next/image";
import Link from "next/link";
const WhoMe = () => {
  return (
    <div className="relative z-50  w-full">
      <div className="bgWhoMe h-full w-full bg-no-repeat  absolute left-0 hidden md:block "></div>
      <div className={`px-4 md:px-0 lg:px-4 mx-auto z-50 h-full`}>
        <div className="grid md:grid-cols-2  !h-full">
          <div className="hidden md:block md:col-span-1"></div>
          <div className="flex col-span-1 bg-ft-bg ">
            <div className="flex flex-col sm:justify-center sm:space-y-8 mx-auto pt-2 sm:pt-0 ">
              <div className=" sm:mx-6 flex flex-col justify-center md:block py-6 lg:py-20">
                <h1
                  id="WhoMe"
                  className="font-alegreya 2xl:text-7xl lg:text-5xl text-xl border-l-2 sm:py-4 border-ft-blue sm:pl-6 pl-2 "
                >
                  Who, Me?
                </h1>
                <div className="sm:pl-6 pl-2 space-y-2">
                  <p className="font-exo 2xl:text-2xl sm:text-lg text-gray-700">
                    Yes, <span className="underline">you.</span>
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    Listen, figuring out how ‘fair’ you are to others (and the
                    earth) through a quiz like this is a big guessing game. We
                    know.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    So this isn’t science – it’s story. Based on averages and
                    reports. We take you through a short, easy quiz and ask you
                    to pretend to shop your faves. Then we introduce you to
                    someone at the end.{" "}
                    <span className="underline">
                      Not to make you feel guilty.
                    </span>{" "}
                    To help you understand your power.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    And you should know up front: this isn’t about farmers vs
                    farm workers. It’s about{" "}
                    <span className="underline">you.</span> Farming needs to
                    remain sustainable for everyone involved. If it doesn’t,
                    your favourite products might not be around for long.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    So it comes down to you (no pressure!). Because the
                    decision-makers look at what you (as a consumer) choose.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    <span className="underline">
                      But here’s the thing about you:
                    </span>{" "}
                    you’re just doing the best you can.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    You wish there was an app to tell you if your purchase
                    decisions are ethical. Or a sticker with an arrow that said
                    “This is the one that’s kind to the farmer and farm worker
                    and earth”.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    We don’t mean to alarm you, but the sticker exists. It’s
                    called the Fairtrade logo.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    Do the quiz (which is also your entry to an amazing
                    giveaway) and let’s take it from there. No guilt trips, just
                    solutions.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm  text-gray-700">
                    The best time to think about fairness was years ago. The
                    next best time is{" "}
                    <span className="underline">right now.</span>
                  </p>
                  <div className="pt-2">
                    <Link href="/quiz">
                      <button className=" shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 px-4 md:px-10 text-xl sm:text-3xl font-alegreya ">
                        Take the quiz & enter the giveaway!
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoMe;
