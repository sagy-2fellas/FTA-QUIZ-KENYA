import GrowerStorySection from "../components/GrowerStorySection";
import UnknownFarmerIntro from "../components/UnknownFarmerIntro";
import ResultBasket from "../components/ResultBasket";
import React, { useState, useEffect } from "react";
import ReactFullpage from "../components/ResultsFullpage";
import MobileFactDialog from "../components/MobileFactDialog";
import TeaStory from "../components/TeaStory";
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
              <UnknownFarmerIntro />
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
                      It’s likely that the farmer works with unsafe pesticides,
                      which end up in your products. We can’t say anything about
                      how the Earth gets treated on the farm where he works, or
                      if they use GMOs. We have no idea whether the farmer gets
                      sustainability support or training to protect the land for
                      future generations.
                    </p></MobileFactDialog>
                <MobileFactDialog open={facilitiesToggled} onClose={() => setFacilitiesToggled(false)} title="Access to basic facilities"><p className="font-exo text-base leading-relaxed">
                      If the farmer falls sick or is injured, there may not be a
                      hospital close by. His children may have to also work on
                      the farm because there might not be a school close by, or
                      one that the farmer can afford to send them to.
                    </p></MobileFactDialog>
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
                            <h3>We can't promise that the farmer is an adult. </h3>
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
                              We can't promise you what the farmer is earning.
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
                              We don't know if the farmer has access to basic
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
              <GrowerStorySection resultId={6} />
            </FullScreenSection>
            <FullScreenSection>
              <NotFair resultId={6} />
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
