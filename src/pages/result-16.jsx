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
  const [fairtrade, setFairtrade] = useState(false);

  return (
    <ReactFullpage
      licenseKey={"K33GH-CR597-09KK8-01PJK-OJTQP"}
      scrollOverflow={false}
      fitToSection={false}
      navigation={true}
      anchors={["home"]}
      render={({ state, fullpageApi }) => {
        return (
          <div>
            <FullScreenSection>
              <div className="bg-ft-dark-green h-screen w-screen flex items-center justify-center flex-col">
                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl text-3xl xs:text-4xl px-6 text-white max-w-2xl lg:max-w-5xl text-center ">
                  Here’s the thing: the main Fairtrade-certified products on the
                  Kenyan market right now are things you don’t like: coffee, tea
                  and wine.
                </h1>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className="bg-ft-blue h-screen w-screen flex items-center justify-center flex-col">
                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl text-3xl xs:text-4xl px-6 text-white max-w-2xl lg:max-w-5xl text-center ">
                  We won’t waste time trying to convince you to choose those
                  things differently.
                </h1>
              </div>
            </FullScreenSection>
            <FullScreenSection>
              <div className="h-screen w-screen flex items-center justify-center flex-col">
                <h1 className="font-alegreya 2xl:text-6xl sm:text-5xl xs:text-3xl text-black max-w-5xl text-center mt-6">
                  But we will ask you this:
                </h1>
                <h2 className="font-alegreya 2xl:text-4xl sm:text-3xl xs:text-2xl text-black max-w-2xl lg:max-w-5xl text-center mt-6 mx-4 sm:mx-0">
                  If you could know for sure that the things you do like were
                  produced ethically and sustainably, would you pick them over
                  options where you couldn’t know for sure?
                </h2>
                <div className="mt-6 max-w-2xl flex items-center flex-col">
                  <button
                    onClick={() => {
                      setFairtrade(true);
                    }}
                    className={
                      fairtrade === true
                        ? "border rounded-2xl border-white text-white py-6 px-4 md:px-10 sm:text-4xl xs:text-2xl  font-alegreya  w-10/12 bg-ft-dark-green"
                        : "border rounded-2xl border-black py-6 px-4 md:px-10 sm:text-4xl xs:text-2xl font-alegreya  w-10/12  bg-white"
                    }
                  >
                    I’d buy Fairtrade products I like if they were easily
                    accessible and available.
                  </button>
                  <button
                    onClick={() => {
                      setFairtrade(false);
                    }}
                    className={
                      fairtrade === false
                        ? "mt-6 border rounded-2xl border-white text-white py-6 px-4 md:px-10 sm:text-4xl xs:text-2xl  font-alegreya  w-10/12 bg-ft-dark-green "
                        : "mt-6 border rounded-2xl border-black py-6 px-4 md:px-10 sm:text-4xl  xs:text-2xl font-alegreya w-10/12 bg-white"
                    }
                  >
                    Nah, I don’t really care about who made the things I
                    consume.
                  </button>
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
