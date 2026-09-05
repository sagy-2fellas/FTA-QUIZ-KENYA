/**
 * Desktop question navigation.
 *
 * Visually unchanged, but the two controls were `<div onClick>` elements: they
 * had no accessible name, could not be reached or activated from the keyboard,
 * and the "disabled" state was cosmetic only — the greyed-out Next still fired
 * `navigateNext`, which is how Question 6 could be advanced with an empty cart.
 */

const NavIcon = ({ back }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
    className={`w-5 h-5 ${back ? "rotate-180" : ""}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
    />
  </svg>
);

const QuizNavigation = ({ navigateNext, navigatePrev, value }) => {
  const canContinue = value != "";

  return (
    <div className={`z-10 absolute right-0 top-1/2 -translate-y-1/2 space-y-2`}>
      <button
        type="button"
        onClick={navigatePrev}
        aria-label="Previous question"
        className="bg-ft-dark-green text-white min-h-[44px] min-w-[44px] h-12 w-12 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg"
      >
        <NavIcon back />
      </button>
      <button
        type="button"
        onClick={navigateNext}
        disabled={!canContinue}
        aria-label="Continue to the next question"
        className={
          canContinue
            ? "bg-ft-dark-green text-white min-h-[44px] min-w-[44px] h-12 w-12 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg"
            : "bg-gray-500 text-white min-h-[44px] min-w-[44px] h-12 w-12 rounded-l-full flex items-center justify-center shadow-lg cursor-not-allowed"
        }
      >
        <NavIcon />
      </button>
    </div>
  );
};

export default QuizNavigation;
