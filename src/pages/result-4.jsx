import React, { useState, useEffect } from "react";
import ReactFullpage from "../components/ResultsFullpage";
import MobileFactDialog from "../components/MobileFactDialog";
import styles from "../style";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "../components/svg/ArrowIcon";
import Head from "next/head";
import NotFair from "../components/NotFair";

const FullScreenSection = ({ children }) => {
  return (
    <div className="section result-section h-full flex items-center justify-center">
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
              <div className="z-50 w-full h-full">
                <MobileFactDialog open={disclamerToggled} onClose={() => setDisclamerToggled(false)} title="About Patrick"><div className="font-exo text-base leading-relaxed">
                      <span className="text-ft-blue">* </span>* Patrick isn’t a
                      real person. His story is based on the data around the
                      average Kenyan farm worker. He’s a face we’ve put to this
                      data to get you to care and start thinking Fair. He’s a
                      blend of all the people who grow and pick your coffee, tea
                      and wine.
                    </div></MobileFactDialog>
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
                          He produces your tea and wine.
                        </p>
                        <h3 className="font-alegreya 2xl:text-4xl sm:text-2xl text-xl 2xl:pt-16 pt-4 text-center">
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
                <MobileFactDialog open={adultToggled} onClose={() => setAdultToggled(false)} title="Age and education"><p className="font-exo text-base leading-relaxed">
                      There’s a chance that he’s a child. This means that he
                      could be under 16 years old, and may never have gone to
                      school, or began work on the farm when he was just a kid.
                    </p></MobileFactDialog>
                <MobileFactDialog open={wageToggled} onClose={() => setWageToggled(false)} title="Earnings"><p className="font-exo text-base leading-relaxed">
                      If he’s lucky, his employers pay him the Kenyan minimum
                      wage – 7,000-10,000 KES per month. Yes, he really is lucky
                      to have a job, but that doesn’t mean he’s making enough to
                      feed his family, get healthcare or send his children to
                      school.
                    </p></MobileFactDialog>
                <MobileFactDialog open={farmToggled} onClose={() => setFarmToggled(false)} title="Farming and the environment"><p className="font-exo text-base leading-relaxed">
                      It’s likely that Patrick works with unsafe pesticides,
                      which end up in your products. We can’t say anything about
                      how the Earth gets treated on the farm where he works, or
                      if they use GMOs. We have no idea whether Patrick gets
                      sustainability support or training to protect the land for
                      future generations.
                    </p></MobileFactDialog>
                <MobileFactDialog open={facilitiesToggled} onClose={() => setFacilitiesToggled(false)} title="Access to basic facilities"><p className="font-exo text-base leading-relaxed">
                      If Patrick falls sick or is injured, there may not be a
                      hospital close by. His children may have to also work on
                      the farm because there might not be a school close by, or
                      one that Patrick can afford to send them to.
                    </p></MobileFactDialog>
                <div className="absolute top-0 h-full w-3/5 bg-cover bgWeCantPromise bg-no-repeat right-0 hidden md:block"></div>
                <div className={`${styles.boxWidth} mx-auto h-full z-50`}>
                  <div className="grid lg:grid-cols-2 h-full ">
                    <div className="flex flex-col justify-center space-y-8   sm:mx-10 md:mx-0  h-full">
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
                            setTeaToggled(!teaToggled);
                          }}
                          className="col-span-1 tea cursor-pointer w-40 md:w-auto mb-20 h-fit mx-auto"
                        >
                          <Image
                            src="/img/ft-tea.png"
                            width={400}
                            height={500}
                          />
                        </div>
                      </div>
                      <div className="flex items-end">
                        <div
                          onClick={() => {
                            setWineToggled(!wineToggled);
                          }}
                          className="col-span-1 wine cursor-pointer w-40 md:w-auto mb-20 h-fit mx-auto"
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
                  <MobileFactDialog open={teaToggled} onClose={() => setTeaToggled(false)} title="Your tea"><div className="font-exo text-base leading-relaxed">
                        <span className="text-ft-blue text-2xl">
                          Patrick picks the leaves for your evening cup of
                          rooibos tea.
                        </span>{" "}
                        <br />
                        <br />
                        His cooperative or farm receives the Fairtrade Premium –
                        an amount of the selling price that he can invest in
                        initiatives that support his community. The farm he
                        works on works with nature, not against it. It uses
                        sustainable practices to ensure rooibos can be grown
                        there for centuries to come. When his daughter gets ill,
                        he knows he can take her to the new clinic Fairtrade
                        built nearby. He sleeps easier knowing this is an
                        option.
                        <span className="text-lg sm:text-2xl">
                          <br /> <br />
                          Someone’s looking out for Patrick and the land he
                          works on.
                          <br /> <br />
                        </span>
                        That someone is you, every time you buy
                        Fairtrade-certified tea.
                      </div></MobileFactDialog>
                  <MobileFactDialog open={wineToggled} onClose={() => setWineToggled(false)} title="Your wine"><div className="font-exo text-base leading-relaxed">
                        <span className="text-ft-blue text-2xl">
                          Patrick helps fuel wine-o'clock.
                        </span>{" "}
                        <br />
                        <br />
                        He feels secure and satisfied in his work. Fairtrade
                        built a creche on the farm, and he’s proud to see his
                        son and daughter learn there every day. The training he
                        receives elevates him as a person and teaches him how to
                        work with the land so it's farmable for generations to
                        come. Recently, he’s noticed the bees coming back. That
                        makes him smile.
                        <span className="text-lg sm:text-2xl">
                          <br /> <br />
                          Someone’s looking out for Patrick and the land he
                          works on.
                          <br /> <br />
                        </span>
                        That someone is you, every time you buy
                        Fairtrade-certified wine.
                      </div></MobileFactDialog>


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
