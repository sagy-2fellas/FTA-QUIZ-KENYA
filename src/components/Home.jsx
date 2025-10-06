import styles from "../style";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div className="bgHomeHero h-full w-screen lg:w-1/2 absolute right-0"></div>
      <div className={`${styles.boxWidth} mx-auto`}>
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-6 2xl:space-y-6 mx-auto z-50 py-4 lg:py-12">
            <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto lg:mx-0">
              <Image 
                src="/img/logo-fairtrade.png" 
                width={135} 
                height={162} 
                alt="Fairtrade Logo"
                priority
                className="w-full h-auto"
              />
            </div>
            <div className="border-l-2 lg:py-8 border-ft-blue">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 2xl:space-y-5 mx-4 sm:mx-6 lg:mx-10">
                <h1 className="font-alegreya text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white lg:text-black text-center lg:text-left leading-tight">
                  Meet the human who grows your favourite drink.
                </h1>
                <p className="font-exo text-lg sm:text-xl md:text-2xl text-white lg:text-gray-700 text-center lg:text-left">
                  Spoiler alert: You're not treating them fairly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/#WhoMe">
                    <button className="shadow-xl border rounded-2xl border-white bg-white lg:border-black py-2 px-6 lg:px-10 text-xl sm:text-2xl lg:text-3xl font-alegreya text-black w-full sm:w-auto min-h-[44px] touch-manipulation">
                      Who, me?
                    </button>
                  </Link>
                </div>
                <p className="font-exo text-sm sm:text-base lg:text-lg text-white lg:text-gray-700 text-center lg:text-left">
                  Pssst! Doing the quiz is also your entry to an amazing
                  giveaway. More details at the end of the quiz!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Link href="/quiz">
                      <button className="cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-2 px-6 lg:px-10 text-xl sm:text-2xl lg:text-3xl font-alegreya w-full sm:w-auto min-h-[44px] touch-manipulation">
                        Take the quiz
                      </button>
                    </Link>
                    <p className="font-exo text-lg sm:text-xl text-white lg:text-black mt-2 text-center lg:text-left">
                      It only takes 2 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block sm:col-span-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
