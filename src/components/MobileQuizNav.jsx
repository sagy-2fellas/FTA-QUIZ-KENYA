/**
 * Sticky mobile question navigation shared by Questions 1-7.
 *
 * Replaces the icon-only `<div onClick>` controls that were absolutely
 * positioned at `right-0 top-1/2`, which overlaid question text and sliders and
 * gave screen-reader and keyboard users nothing to act on.
 *
 * This renders real buttons with visible text labels in a sticky bar that
 * occupies real layout space, so it can never cover the question content.
 */

const ArrowGlyph = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
    className={`w-4 h-4 ${direction === "prev" ? "rotate-180" : ""}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
    />
  </svg>
);

const MobileQuizNav = ({
  onPrev,
  onNext,
  canContinue = true,
  continueLabel = "Continue",
  nextAriaLabel,
  className = "",
}) => (
  <div
    className={`quiz-mobile-nav lg:hidden w-full px-4 pt-3 pb-2 ${className}`}
  >
    <div className="flex items-stretch justify-between gap-3 max-w-md mx-auto">
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous question"
          className="flex-1 min-h-[44px] px-3 rounded-md border-2 border-ft-dark-green bg-white text-black font-exo text-base flex items-center justify-center gap-2 touch-manipulation"
        >
          <ArrowGlyph direction="prev" />
          <span>Previous</span>
        </button>
      ) : (
        <span className="flex-1" />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        aria-label={nextAriaLabel || continueLabel}
        className={`flex-1 min-h-[44px] px-3 rounded-md font-exo text-base flex items-center justify-center gap-2 shadow-lg touch-manipulation ${
          canContinue
            ? "bg-ft-dark-green text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        <span>{continueLabel}</span>
        <ArrowGlyph direction="next" />
      </button>
    </div>
  </div>
);

export default MobileQuizNav;
