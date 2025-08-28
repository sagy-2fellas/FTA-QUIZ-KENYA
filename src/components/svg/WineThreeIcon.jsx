import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { useState } from "react";

function WineThreeIcon() {
  const [entered, setEntered] = useState(false);
  const icon = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  return (
    <InView
      as="div"
      onChange={(inView, entry) => {
        if (inView === true) {
          setEntered(true);
        } else {
          setEntered(false);
        }
      }}
      root={null}
      rootMargin="0px"
      threshold={0.8}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="140"
        height="100%"
        fill="none"
        viewBox="0 0 166 408"
        className="h-full w-[70px] sm:w-[120px] md:w-[100px] lg:w-[120px] 2xl:w-[150px]"
      >
        <g id="wine-3 1" clipPath="url(#clip0_8_1116)">
          <g id="Layer 1">
            <g id="Group 4456">
              <g id="Group 4455">
                <path
                  id="Path 1018"
                  fill="#AFAEAE"
                  d="M89.27 196.57v195.17l69.75 15.51H5.66l69.78-15.54v-195.2C36.86 193.62 4.47 167.82.56 114.48-3.61 57.78 16.88 0 16.88 0h131.85s20.52 57.78 16.32 114.48c-3.94 53.74-36.83 79.54-75.78 82.09z"
                  opacity="0.5"
                ></path>
                <g id="wine-fill">
                  <motion.path
                    variants={icon}
                    initial="hidden"
                    animate={entered === true ? "visible" : "hidden"}
                    transition={{ duration: 2, type: "spring", delay: 1.3 }}
                    id="Path 1019"
                    fill="#E20000"
                    d="M152.02 111.93c-3.51 47.75-34.13 69.29-69.22 69.29-35.09 0-65.7-21.54-69.23-69.29l-.02-.25c-.86-12.71-.16-25.48 2.09-38.02 1.06-6.07 2.03-11.32 2.03-11.32h131.77s2.75 23.6 2.72 24.45c.5 8.37.45 16.77-.13 25.14h-.01z"
                  ></motion.path>
                  <g id="Group 4453" opacity="0.1">
                    <path
                      id="Path 1020"
                      fill="#000"
                      d="M151.99 111.93c-3.51 47.75-34.13 69.29-69.22 69.29-35.09 0-65.7-21.54-69.23-69.29l-.02-.25c-.86-12.71-.16-25.48 2.09-38.02 1.06-6.07 2.03-11.32 2.03-11.32H149.4s2.75 23.6 2.72 24.45c.5 8.37.46 16.77-.13 25.14z"
                    ></path>
                  </g>
                </g>
                <path
                  id="Path 1021"
                  fill="#fff"
                  d="M36.43.01H50.9s-27.51 78.94-20.28 119 24.03 49.36 24.03 49.36-31.1-8.22-36.17-56.85C13.11 60.08 36.43.01 36.43.01z"
                  opacity="0.5"
                ></path>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_8_1116">
            <path fill="#fff" d="M0 0H165.62V407.25H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </InView>
  );
}

export default WineThreeIcon;
