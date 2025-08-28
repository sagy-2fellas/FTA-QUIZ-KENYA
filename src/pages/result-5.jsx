import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import styles from "../style";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "../components/svg/ArrowIcon";
import Head from "next/head";
import NotFair from "../components/NotFair";

const FullScreenSection = ({ children }) => {
  return (
    <div className="section overflow-hidden h-full flex items-center justify-center">
      {children}
    </div>
  );
};

const FullpageWrapper = () => {
  const [disclamerToggled, setDisclamerToggled] = useState(false);
  const [adultToggled, setAdultToggled] = useState(false);
  const [wageToggled, setWageToggled] = useState(false);
  const [farmToggled, setFarmToggled] = useState(false);
  const [facilitiesToggled, setFacilitiesToggled] = useState(false);
  const [teaToggled, setTeaToggled] = useState(false);
  const [coffeeToggled, setCoffeeToggled] = useState(false);
  const [wineToggled, setWineToggled] = useState(false);

  return (
    <ReactFullpage
      licenseKey={"K33GH-CR597-09KK8-01PJK-OJTQP"}
      scrollOverflow={false}
      fitToSection={false}
      navigation={true}
      anchors={["home"]}
      render={({ state, fullpageApi }) => {
        return (
          <div className="h-full">
            <FullScreenSection>
              <div className=" z-50  w-full h-full">
                <div
                  className={
                    disclamerToggled
                      ? `absolute left-0 lg:left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 lg:mx-16`
                      : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                  }
                >
                  <div className="relative">
                    <span
                      onClick={() => {
                        setDisclamerToggled(!disclamerToggled);
                      }}
                      className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white absolute right-0 -top-[20%] lg:top-[-35%] xl:top-[-45%] rounded-lg font-exo text-lg"
                    >
                      x
                    </span>
                    <p>
                      <span className="text-ft-blue">* </span>* Patrick isn’t a
                      real person. His story is based on the data around the
                      average Kenyan farm worker. He’s a face we’ve put to this
                      data to get you to care and start thinking Fair. He’s a
                      blend of all the people who grow and pick your coffee, tea
                      and wine.
                    </p>
                  </div>
                </div>
                <div className={`mx-auto h-full z-50 !px-0`}>
                  <div className="flex flex-col  sm:flex-row h-full">
                    <div className="flex-1 h-full">
                      <img
                        src="/img/patrick-full-alt.jpg"
                        className="w-full object-cover h-full"
                      />
                    </div>
                    <div className="flex-1">
                      {" "}
                      <div className=" flex flex-col justify-center items-center h-full">
                        <h1 className="font-alegreya lg:text-7xl text-5xl ">
                          Meet{" "}
                          <span
                            onClick={() => {
                              setDisclamerToggled(!disclamerToggled);
                            }}
                            className="text-ft-blue cursor-pointer underline"
                          >
                            Patrick*
                          </span>
                          .
                        </h1>

                        <p className="font-exo 2xl:text-2xl xs:text-lg text-gray-700">
                          He produces your coffee.
                        </p>
                        <h3 className="font-alegreya 2xl:text-4xl sm:text-2xl text-xl 2xl:pt-16 pt-4 text-center ">
                          What can we tell you about Patrick?
                        </h3>

                        <div className=" shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-2 sm:py-4 px-4 md:px-40 text-2xl sm:text-5xl font-alegreya mt-4">
                          Nothing.
                        </div>

                        <h3 className="font-alegreya 2xl:text-4xl text-2xl 2xl:pt-6 pt-4 text-center text-ft-blue">
                          This is not a good thing
                        </h3>
                        <p className="font-alegreya 2xl:text-2xl sm:text-2xl 2xl:pt-16 pt-4 text-center lg:mx-10">
                          Scroll down to read more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className="relative w-full h-full">
                <div
                  className={
                    adultToggled
                      ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-ft-dark-green text-white px-4 w-[90%] lg:w-auto  lg:px-24 py-24 rounded-xl shadow-2xl z-20  m-auto lg:mx-16`
                      : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                  }
                >
                  <div className="relative">
                    <span
                      onClick={() => {
                        setAdultToggled(!adultToggled);
                      }}
                      className="shadow-lg cursor-pointer bg-ft-blue px-2  text-white absolute lg:-right-[10%] -top-[35%] rounded-lg font-exo text-lg"
                    >
                      x
                    </span>
                    <p className="font-exo text-2xl">
                      There’s a chance that he’s a child. This means that he
                      could be under 16 years old, and may never have gone to
                      school, or began work on the farm when he was just a kid.
                    </p>
                  </div>
                </div>
                <div
                  className={
                    wageToggled
                      ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-ft-dark-green text-white px-4 w-[90%] lg:w-auto  lg:px-24 py-24 rounded-xl shadow-2xl z-20  m-auto lg:mx-16`
                      : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                  }
                >
                  <div className="relative">
                    <span
                      onClick={() => {
                        setWageToggled(!wageToggled);
                      }}
                      className="shadow-lg cursor-pointer bg-ft-blue px-2  text-white absolute lg:-right-[10%] -top-[20%] lg:-top-[20%] rounded-lg font-exo text-lg"
                    >
                      x
                    </span>
                    <p className="font-exo text-2xl">
                      If he’s lucky, his employers pay him the Kenyan minimum
                      wage – 7,000-10,000 KES per month. Yes, he really is lucky
                      to have a job, but that doesn’t mean he’s making enough to
                      feed his family, get healthcare or send his children to
                      school.
                    </p>
                  </div>
                </div>
                <div
                  className={
                    farmToggled
                      ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-ft-dark-green text-white px-4 w-[90%] lg:w-auto  lg:px-24 py-24 rounded-xl shadow-2xl z-20  m-auto lg:mx-16`
                      : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                  }
                >
                  <div className="relative">
                    <span
                      onClick={() => {
                        setFarmToggled(!farmToggled);
                      }}
                      className="shadow-lg cursor-pointer bg-ft-blue px-2  text-white absolute lg:-right-[10%] -top-[20%] lg:-top-[20%] rounded-lg font-exo text-lg"
                    >
                      x
                    </span>
                    <p className="font-exo text-2xl">
                      It’s likely that Patrick works with unsafe pesticides,
                      which end up in your products. We can’t say anything about
                      how the Earth gets treated on the farm where he works, or
                      if they use GMOs. We have no idea whether Patrick gets
                      sustainability support or training to protect the land for
                      future generations.
                    </p>
                  </div>
                </div>
                <div
                  className={
                    facilitiesToggled
                      ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-ft-dark-green text-white px-4 w-[90%] lg:w-auto  lg:px-24 py-24 rounded-xl shadow-2xl z-20  m-auto lg:mx-16`
                      : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                  }
                >
                  <div className="relative">
                    <span
                      onClick={() => {
                        setFacilitiesToggled(!facilitiesToggled);
                      }}
                      className="shadow-lg cursor-pointer bg-ft-blue px-2  text-white absolute lg:-right-[10%] -top-[25%] lg:-top-[35%] rounded-lg font-exo text-lg"
                    >
                      x
                    </span>
                    <p className="font-exo text-2xl">
                      If Patrick falls sick or is injured, there may not be a
                      hospital close by. His children may have to also work on
                      the farm because there might not be a school close by, or
                      one that Patrick can afford to send them to.
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 h-full w-3/5 bg-cover bgWeCantPromise bg-no-repeat right-0 hidden md:block"></div>
                <div className={`${styles.boxWidth} mx-auto h-full z-50`}>
                  <div className="grid lg:grid-cols-2 h-full ">
                    <div className="flex flex-col justify-center space-y-8 sm:mx-10 md:mx-0  h-full">
                      <div className="space-y-4 xs:space-y-8">
                        <div
                          onClick={() => {
                            setAdultToggled(!adultToggled);
                          }}
                          className="grid grid-cols-9  cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 xs:py-4 px-4 2xl:px-10 2xl:py-10 sm:text-4xl text-xl font-alegreya "
                        >
                          <div className="col-span-7 flex  items-center">
                            <h3>We can't promise that Patrick is an adult. </h3>
                          </div>
                          <div className="flex justify-center items-center col-start-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-20 h-20 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setWageToggled(!wageToggled);
                          }}
                          className="grid grid-cols-9  cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 xs:py-4 px-4 2xl:px-10 2xl:py-10 sm:text-4xl text-xl font-alegreya "
                        >
                          <div className="col-span-7 flex  items-center">
                            <h3>
                              We can't promise you what Patrick is earning.
                            </h3>
                          </div>
                          <div className="flex justify-center items-center col-start-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-20 h-20 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setFarmToggled(!farmToggled);
                          }}
                          className="grid grid-cols-9  cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 xs:py-4 px-4 2xl:px-10 2xl:py-10 sm:text-4xl text-xl font-alegreya "
                        >
                          <div className="col-span-7 flex  items-center">
                            <h3>
                              {" "}
                              We don't know if the farm is kind to the Earth.
                            </h3>
                          </div>
                          <div className="flex justify-center items-center col-start-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-20 h-20 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setFacilitiesToggled(!facilitiesToggled);
                          }}
                          className="grid grid-cols-9  cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 xs:py-4 px-4 2xl:px-10 2xl:py-10 sm:text-4xl text-xl font-alegreya "
                        >
                          <div className="col-span-7 flex  items-center">
                            <h3>
                              We don't know if Patrick has access to basic
                              facilities.
                            </h3>
                          </div>
                          <div className="flex justify-center items-center col-start-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-20 h-20 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      adultToggled ||
                      wageToggled ||
                      farmToggled ||
                      facilitiesToggled
                        ? "bg-black opacity-75 w-screen h-screen z-10 absolute top-0 left-0"
                        : ""
                    }
                  >
                    {" "}
                  </div>
                </div>
              </div>
            </FullScreenSection>

            <FullScreenSection>
              <div className="relative w-screen h-full">
                <div className="absolute top-0 h-full bgFairtradeCertified bg-no-repeat bg-cover w-screen md:w-2/3 bg-center right-0  "></div>
                <div className={`${styles.boxWidth} h-full z-50 !px-0 mx-auto`}>
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="flex h-full lg:justify-end items-end flex-col">
                      <div className=" shadow-xl border rounded-2xl  md:rounded-t-2xl flex flex-col  gap-y-8 sm:gap-y-16 2xl:gap-y-28 bg-white lg:ml-4 2xl:ml-0 lg:mt-4 border-black p-2 xs:p-10 sm:p-12 2xl:p-20 m-4  mx-auto lg:h-full  w-10/12 lg:w-auto">
                        <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28 ">
                          <Image
                            src="/img/logo-fairtrade.png"
                            width={150}
                            height={178}
                          />
                        </div>{" "}
                        <div className="space-y-4 xs:space-y-10">
                          <p className="text-black text-base xs:text-xl sm:text-4xl lg:!text-5xl font-alegreya  text-left">
                            <span className=" text-ft-blue">
                              But if Patrick's organisation was
                              Fairtrade-certified,
                            </span>{" "}
                            we could tell so much more about him and what the
                            farm he works on is doing to protect him.
                          </p>

                          <p className="text-left font-exo text-sm xs:text-base sm:!text-2xl">
                            Click on the icons to see how Patrick's life changes
                            when you choose Fairtrade.
                            <ArrowIcon />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1 relative grid grid-cols-3  col-span-2">
                      <div className="flex items-end">
                        <div
                          onClick={() => {
                            setCoffeeToggled(!coffeeToggled);
                          }}
                          className="col-span-1 coffee cursor-pointer w-40 md:w-auto mb-20 h-fit mx-auto"
                        >
                          <Image
                            src="/img/ft-coffee.png"
                            width={400}
                            height={500}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      coffeeToggled
                        ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black py-10 px-4 lg:px-24 lg:py-24 rounded-xl shadow-2xl z-20 lg:mx-6 xl:mx-16 w-full lg:w-auto`
                        : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                    }
                  >
                    <div className="relative">
                      <span
                        onClick={() => {
                          setCoffeeToggled(!coffeeToggled);
                        }}
                        className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white absolute lg:-right-[10%] lg:-top-[15%] -top-[5%] rounded-lg font-exo text-lg"
                      >
                        x
                      </span>
                      <p className="font-exo sm:text-xl pt-4 sm:pt-0">
                        <span className="text-ft-blue text-2xl">
                          Patrick grows your morning caffeine fix.
                        </span>{" "}
                        <br />
                        <br />
                        He is not a child. His farm receives a fair price for
                        the coffee beans they produce. His wife, Grace, who
                        works with him on the farm, is paid like an equal, and
                        feels heard and treated well. He receives hands-on
                        support to protect biodiversity and combat climate
                        change on the farm. The Earth is better off for it, and
                        so is he.
                        <span className=" sm:text-2xl text-lg">
                          <br /> <br />
                          Someone’s looking out for Patrick and the land he
                          works on.
                          <br /> <br />
                        </span>
                        That someone is you, every time you buy
                        Fairtrade-certified coffee.
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      teaToggled || wineToggled || coffeeToggled
                        ? "bg-black opacity-75 w-screen h-screen z-10 absolute top-0 left-0"
                        : ""
                    }
                  >
                    {" "}
                  </div>
                </div>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <NotFair />
            </FullScreenSection>
          </div>
        );
      }}
    />
  );
};

const Results = () => {
  return (
    <div className="">
      <Head>
        <Head>
          <title>Your Results</title>
        </Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className="fixed w-full z-50">
        <div className={`${styles.boxWidth} mx-auto my-6 z-50`}></div>
      </div>
      <FullpageWrapper />
    </div>
  );
};

export default Results;
