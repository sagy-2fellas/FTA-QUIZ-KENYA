import styles from "../style";
const Results3 = () => {
  const navigateNext = () => {
    window.fullpage_api.moveSectionDown();
  };
  return (
    <div className="relative w-screen h-screen">
      <div className="h-4 w-4/5 resultsBar3 absolute bottom-4 right-1/2 translate-x-1/2 "></div>
      <div className={`${styles.boxWidth} mx-auto   z-50`}>
        <div className="flex h-screen items-center ">
          <div className="space-y-8 ">
            <div className="text-center  text-ft-dark-green text-7xl font-alegreya mt-4">
              <h2>That's the good news.</h2>
            </div>
            <div className="text-center w-4/5 mx-auto text-black text-7xl font-alegreya mt-4">
              <h3>
                But what can we tell you about Patrick is if he is producing
                your coffee, tea and wine
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results3;
