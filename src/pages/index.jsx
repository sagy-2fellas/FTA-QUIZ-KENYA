import React, { useEffect } from "react";
import styles from "../style";
import Home from "../components/Home";
import WhoMe from "../components/WhoMe";
import SeoHead from "../components/SeoHead";

const Index = () => {
  return (
    <div className="">
      <SeoHead
        title="Fairtrade Africa Kenya Quiz | Be Fair Right Now"
        description="Meet the people behind your coffee, tea and wine. Take Fairtrade Africa's eight-question Kenya quiz and see how everyday choices can support fairer farming."
      />

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
