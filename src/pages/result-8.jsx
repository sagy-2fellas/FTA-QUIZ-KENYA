import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import styles from "../style";
import Head from "next/head";
import NotFair from "../components/NotFair";

import Image from "next/image";

const FullScreenSection = ({ children }) => {
  return (
    <div className="section h-full flex items-center justify-center">
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
              <div className="bg-ft-dark-green h-full w-full flex items-center justify-center flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-36 h-36"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
                </svg>

                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl text-4xl text-white max-w-5xl text-center mt-6 mx-4">
                  You buy some Fairtrade-certified products – hooray!
                </h1>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className=" z-50 h-full w-screen">
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
                <div className={` mx-auto h-full z-50 !px-0`}>
                  <div className="grid sm:grid-cols-2 h-full">
                    <div className="">
                      {" "}
                      <img
                        src="/img/patrick-full-alt.jpg"
                        className="w-full  object-cover h-full"
                      />
                    </div>
                    <div>
                      {" "}
                      <div className="flex justify-center items-center h-full">
                        <div className=" flex flex-col justify-center items-center">
                          <h1 className="font-alegreya lg:!text-7xl text-xl xs:text-5xl">
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

                          <div className="mx-4 lg:mx-0">
                            <p className="font-exo 2xl:!text-2xl text-xs xs:text-sm sm:!text-lg  max-w-xl text-center  xs:pt-3">
                              He produces your Fairtrade-certified choices.
                              Here’s what we can tell you about him:
                            </p>

                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg 2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl ">
                              Patrick is <i>not</i> a child.
                            </p>
                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg 2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl">
                              His farm receives a fair price for what they
                              produce.
                            </p>
                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg 2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl">
                              His wife, Grace, who works with him on the farm,
                              is paid like an equal, and feels heard and treated
                              well.
                            </p>
                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg 2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl">
                              Fairtrade built a creche on the farm, and he’s
                              proud to see his son and daughter learn there
                              every day.
                            </p>
                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg 2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl">
                              Recently, he’s noticed the bees coming back. That
                              makes him smile.
                            </p>
                            <p className="font-exo 2xl:!text-xl text-xs xs:text-sm sm:!text-lg  2xl:pt-6  xs:pt-3 sm:pt-4 text-center max-w-xl">
                              <span className="text-ft-blue">
                                Someone’s looking out for Patrick and the land
                                he works on.
                              </span>{" "}
                              That someone is you, every time you buy
                              Fairtrade-certified products.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className="relative w-full h-full">
                <div className={`${styles.boxWidth} mx-auto h-full  z-50`}>
                  <div className="flex h-full items-center justify-center">
                    <div className="xs:space-y-8">
                      <div className="text-center  text-black xs:text-2xl lg:text-5xl font-alegreya mt-4">
                        <h2>That's the good news.</h2>
                      </div>
                      <div className="text-center lg:w-3/5  mx-auto text-black  xs:text-2xl lg:text-5xl font-alegreya mt-4 flex flex-col items-center justify-center">
                        <h3 className="mb-6">
                          But what can we tell you about Patrick if he’s
                          producing the products without this logo?
                        </h3>
                        <Image
                          src="/img/fairtrade-mark.png"
                          width={150}
                          height={180}
                        />
                      </div>
                      <h4 className="font-alegreya xs:text-5xl lg:text-7xl text-center text-ft-blue">
                        NOTHING.
                      </h4>
                      <p className="text-center font-exo xs:text-2xl">
                        That’s not a good thing.
                      </p>
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
                    <div className="flex flex-col justify-center space-y-8   sm:mx-10 md:mx-0  h-full">
                      <div className="xs:space-y-8 space-y-4">
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
        <title>Your Results</title>
      </Head>
      <div className="fixed w-full z-50">
        <div className={`${styles.boxWidth} mx-auto my-6 z-50`}></div>
      </div>
      <FullpageWrapper />
    </div>
  );
};

export default Results;
