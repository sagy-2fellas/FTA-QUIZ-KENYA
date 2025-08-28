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

                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl text-4xl mx-4 sm:mx-0 text-white max-w-5xl text-center mt-6">
                  If there was a way to win this quiz, you’d be the winner!
                </h1>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className="bg-ft-blue h-full w-screen flex items-center justify-center flex-col">
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
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>

                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl text-4xl mx-4 sm:mx-0 text-white max-w-2xl md:max-w-5xl text-center mt-6">
                  Your coffee, tea and wine choices are all Fairtrade-certified.
                  That makes you a hero in our eyes.
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
                    <div className="col-span-1">
                      <img
                        src="/img/patrick-full-alt.jpg"
                        className="w-full object-cover h-full"
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="flex justify-center items-center h-full">
                        <div className=" flex flex-col justify-center items-center sm:mx-4 lg:mx-0">
                          <div className="mx-4 sm:mx-0">
                            <h1 className="font-alegreya 2xl:!text-7xl sm:!text-5xl text-base xs:text-3xl lg:max-w-2xl text-center xs:mb-6 pt-2 xs:pt-6 sm:pt-0">
                              Oh, and we’d like you to introduce you to &nbsp;
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

                            <p className="font-exo 2xl:!text-2xl xs:text-lg text-xs text-gray-700 max-w-xl mx-auto text-center">
                              Patrick works on a Fairtrade-certified farm.
                            </p>

                            <p className="font-exo 2xl:!text-xl text-xs xs:text-base lg:text-lg lg:px-4 2xl:pt-6 xs:pt-4 pt-2 text-center mx-auto max-w-xl">
                              Click on the image below to learn about the life
                              you’re supporting for him every time you buy
                              Fairtrade-certified coffee, tea and wine:
                            </p>
                          </div>
                          <div className="lg:col-span-1 relative grid grid-cols-3 max-w-lg">
                            <div
                              onClick={() => {
                                setCoffeeToggled(!coffeeToggled);
                              }}
                              className="col-span-1 coffee cursor-pointer flex items-end "
                            >
                              <Image
                                src="/img/ft-coffee.png"
                                width={400}
                                height={500}
                              />
                            </div>
                            <div
                              onClick={() => {
                                setTeaToggled(!teaToggled);
                              }}
                              className="col-span-1 tea cursor-pointer flex items-end "
                            >
                              <Image
                                src="/img/ft-tea.png"
                                width={400}
                                height={500}
                              />
                            </div>
                            <div
                              onClick={() => {
                                setWineToggled(!wineToggled);
                              }}
                              className="col-span-1 wine cursor-pointer flex items-end "
                            >
                              <Image
                                src="/img/ft-wine.png"
                                width={400}
                                height={550}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        teaToggled
                          ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black py-10 px-4 lg:px-24 lg:py-24 rounded-xl shadow-2xl z-20 lg:mx-6 xl:mx-16 w-full lg:w-auto `
                          : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                      }
                    >
                      <div className="relative">
                        <span
                          onClick={() => {
                            setTeaToggled(!teaToggled);
                          }}
                          className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white absolute lg:-right-[10%] -top-[5%] lg:-top-[15%] rounded-lg font-exo text-lg"
                        >
                          x
                        </span>
                        <p className="font-exo sm:text-xl">
                          <span className="text-ft-blue text-2xl">
                            Patrick picks the leaves for your evening cup of
                            rooibos tea.
                          </span>{" "}
                          <br />
                          <br />
                          His cooperative or farm receives the Fairtrade Premium
                          – an amount of the selling price that he can invest in
                          initiatives that support his community. The farm he
                          works on works with nature, not against it. It uses
                          sustainable practices to ensure rooibos can be grown
                          there for centuries to come. When his daughter gets
                          ill, he knows he can take her to the new clinic
                          Fairtrade built nearby. He sleeps easier knowing this
                          is an option.
                          <span className="text-lg sm:text-2xl">
                            <br /> <br />
                            Someone’s looking out for Patrick and the land he
                            works on.
                            <br /> <br />
                          </span>
                          That someone is you, every time you buy
                          Fairtrade-certified tea.
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        wineToggled
                          ? `absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black py-10 px-4 lg:px-24 lg:py-24 rounded-xl shadow-2xl z-20 lg:mx-6 xl:mx-16 w-full lg:w-auto`
                          : `absolute left-1/2 top-[5%] bg-white px-4 py-10 rounded-md shadow-lg z-10 mx-16 opacity-0 pointer-events-none`
                      }
                    >
                      <div className="relative">
                        <span
                          onClick={() => {
                            setWineToggled(!wineToggled);
                          }}
                          className="shadow-lg cursor-pointer bg-ft-dark-green px-2  text-white absolute lg:-right-[10%] lg:-top-[15%] -top-[5%] rounded-lg font-exo text-lg"
                        >
                          x
                        </span>
                        <p className="font-exo sm:text-xl pt-4 sm:pt-0">
                          <span className="text-ft-blue text-2xl">
                            Patrick helps fuel wine-o-clock.
                          </span>{" "}
                          <br />
                          <br />
                          He feels secure and satisfied in his work. Fairtrade
                          built a creche on the farm, and he’s proud to see his
                          son and daughter learn there every day. The training
                          he receives elevates him as a person and teaches him
                          how to work with the land so it's farmable for
                          generations to come. Recently, he’s noticed the bees
                          coming back. That makes him smile.
                          <span className="text-lg sm:text-2xl">
                            <br /> <br />
                            Someone’s looking out for Patrick and the land he
                            works on.
                            <br /> <br />
                          </span>
                          That someone is you, every time you buy
                          Fairtrade-certified wine.
                        </p>
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
                          change on the farm. The Earth is better off for it,
                          and so is he.
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
                      <div
                        className={
                          teaToggled || wineToggled || coffeeToggled
                            ? "bg-black opacity-75 w-screen  z-10 absolute top-0 left-0"
                            : ""
                        }
                      >
                        {" "}
                      </div>
                    </div>
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
