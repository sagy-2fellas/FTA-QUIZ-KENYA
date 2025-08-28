import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { useState } from "react";

function WineTwoIcon() {
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
        <g id="wine-2 1" clipPath="url(#clip0_8_1107)">
          <g id="Layer 1">
            <g id="Group 4452">
              <g id="Group 4451">
                <path
                  id="Path 1014"
                  fill="#AFAEAE"
                  d="M89.27 196.57v195.17l69.75 15.51H5.66l69.78-15.54v-195.2C36.86 193.62 4.48 167.82.56 114.48-3.61 57.78 16.88 0 16.88 0h131.85s20.51 57.78 16.32 114.48c-3.95 53.74-36.83 79.54-75.78 82.09z"
                  opacity="0.5"
                ></path>
                <g id="wine-fill">
                  <motion.path
                    variants={icon}
                    initial="hidden"
                    animate={entered === true ? "visible" : "hidden"}
                    transition={{ duration: 2, type: "spring", delay: 1 }}
                    id="Path 1015"
                    fill="#E20000"
                    d="M152.03 125.91c-3.51 38.11-34.13 55.31-69.22 55.31-35.09 0-65.71-17.2-69.23-55.31-.58-6.68-.63-13.39-.12-20.07h138.69c.5 6.68.46 13.4-.12 20.07z"
                  ></motion.path>
                  <path
                    id="Path 1016"
                    fill="#000"
                    d="M152.03 125.91c-3.51 38.11-34.13 55.31-69.22 55.31-35.09 0-65.71-17.2-69.23-55.31-.58-6.68-.63-13.39-.12-20.07h138.69c.5 6.68.46 13.4-.12 20.07z"
                    opacity="0.1"
                  ></path>
                </g>
                <path
                  id="Path 1017"
                  fill="#fff"
                  d="M36.43.01H50.9s-27.51 78.93-20.27 119c7.24 40.06 24.03 49.36 24.03 49.36s-31.1-8.22-36.17-56.85C13.12 60.08 36.43.01 36.43.01z"
                  opacity="0.5"
                ></path>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_8_1107">
            <path fill="#fff" d="M0 0H165.62V407.25H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </InView>
  );
}

export default WineTwoIcon;
