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
                    Yes, <strong className="underline">you.</strong>
                  </p>
                  <p className="font-exo 2xl:text-base text-sm text-gray-700">
                    This quiz uses everyday shopping choices to introduce you to
                    the people behind the products you love. It’s a story, not a score.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm text-gray-700">
                    What you buy helps shape how growers and farm workers are treated.
                    Fairtrade makes it easier to choose products that support fairer
                    pay and sustainable farming.
                  </p>
                  <p className="font-exo 2xl:text-base text-sm text-gray-700">
                    <strong className="underline">No guilt trips.</strong> Look for the
                    Fairtrade logo, meet someone behind your choices, and see what
                    you can do <strong className="underline">right now.</strong>
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
