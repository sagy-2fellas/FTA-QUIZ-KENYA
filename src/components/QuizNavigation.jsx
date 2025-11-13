const QuizNavigation = ({ navigateNext, navigatePrev, value }) => {
  return (
    <div className={`z-10 absolute right-0 top-1/2 -translate-y-1/2 space-y-2`}>
      <div
        className={
          value != ""
            ? "bg-ft-dark-green h-12 w-12 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg"
            : "bg-ft-dark-green  h-12 w-12 rounded-l-full flex items-center justify-center shadow-lg"
        }
        onClick={navigatePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-5 h-5 rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
      <div
        className={
          value != ""
            ? "bg-ft-dark-green h-12 w-12 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg"
            : "bg-gray-500 h-12 w-12 rounded-l-full flex items-center justify-center shadow-lg"
        }
        onClick={navigateNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default QuizNavigation;
