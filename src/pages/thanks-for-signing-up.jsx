import styles from "../style";
import Head from "next/head";
import React, { useState, useRef, useEffect } from "react";

const ThankYou = () => {
  const [countdown, setCountdown] = useState(3);

  let interval;

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  });

  function startTimer() {
    interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
        document.location.href =
          "https://gleam.io/1hDoY/befairrightnow-kenya-2024";
      }
    }, 1000);
  }

  return (
    <section
      className={`${styles.boxWidth} flex justify-center items-center flex-col z-0 h-screen`}
    >
      <Head>
        <title>Thanks for signing up</title>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <h1 className="font-alegreya 2xl:text-7xl sm:text-5xl text-3xl  max-w-3xl  2xl:max-w-4xl text-center mx-auto">
        Thanks for signing up.
      </h1>
      <p className="font-exo text-lg text-center">
        You will be redirected to the giveaway in {countdown} seconds. Do not
        close this window.
      </p>
    </section>
  );
};

export default ThankYou;
