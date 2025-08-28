import React, { useEffect } from "react";
import styles from "../style";
import Home from "../components/Home";
import WhoMe from "../components/WhoMe";
import Head from "next/head";

const Index = () => {
  return (
    <div className="">
      <Head>
        <title>FTA Quiz</title>
        <meta
          name="description"
          content="#BeFairRightNow Giveaway Quiz by Fairtrade Africa"
          key="desc"
        />
      </Head>

      <div className="h-full">
        <Home />
      </div>
      <div className="">
        <WhoMe />
      </div>
    </div>
  );
};

export default Index;
