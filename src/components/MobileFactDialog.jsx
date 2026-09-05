import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Accessible mobile fact dialog shared by Questions 1-7.
 *
 * Replaces the per-question popup markup, which centred itself with
 * `top-1/2 -translate-y-1/2`. On a 480px-tall screen that pushed the top of a
 * tall panel (and its Close control) above the viewport, and left Continue
 * below the fold with no way to reach it.
 *
 * Layout lives in globals.css (.quiz-dialog-*) so the panel can use 100dvh and
 * the header-height custom property.
 *
 * Rendered through a portal to <body>. Several question wrappers carry
 * `relative z-0`, which creates a stacking context that traps a `position:
 * fixed` child — on Question 7 that put the sticky mobile nav (z-index 30) on
 * top of the dialog's own CTA (z-index 1100) and swallowed the click. A portal
 * keeps the dialog in the root stacking context wherever it is used.
 */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const MobileFactDialog = ({
  open,
  onClose,
  title,
  children,
  continueLabel = "Go to Next Question",
  onContinue,
}) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);
  // Continue navigates to the next question, so the trigger we came from is no
  // longer the right place to send focus — restoring it would drop keyboard and
  // screen-reader users back on the previous question's off-screen button.
  const advancedRef = useRef(false);
  const titleId = useId();

  // Remember the trigger so focus can return to it on close.
  useEffect(() => {
    if (open) {
      advancedRef.current = false;
      lastFocused.current =
        typeof document !== "undefined" ? document.activeElement : null;
    }
  }, [open]);

  // Move focus into the dialog when it opens, and back to the trigger after.
  useEffect(() => {
    if (!open) return undefined;

    const raf = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (advancedRef.current) return;
      const trigger = lastFocused.current;
      if (trigger && trigger.isConnected && typeof trigger.focus === "function") {
        trigger.focus();
      }
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the panel so the page behind it
  // cannot receive focus while the dialog is open.
  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  // Stop the page behind the dialog from scrolling under it.
  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Portals need a DOM target, which does not exist during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="quiz-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="quiz-dialog-panel"
        onKeyDown={onKeyDown}
      >
        <div className="quiz-dialog-head flex items-start justify-between gap-3 px-4 pt-4 pb-3">
          <h3
            id={titleId}
            className="font-alegreya text-lg sm:text-xl border-l-2 border-ft-blue pl-2 flex-1"
          >
            {title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 bg-ft-dark-green text-white rounded-full flex items-center justify-center font-exo text-xl leading-none touch-manipulation min-h-[44px] min-w-[44px]"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Chrome puts scrollable regions in the tab order. Declaring that
            explicitly keeps it inside the focus trap below, instead of
            being an invisible stop the trap does not know about. */}
        <div
          className="quiz-dialog-body px-4 pb-4"
          tabIndex={0}
          role="group"
          aria-label="Fact details"
        >
          {children}
        </div>

        {onContinue ? (
          <div className="quiz-dialog-foot px-4 py-3">
            <button
              type="button"
              onClick={() => {
                advancedRef.current = true;
                onContinue();
              }}
              className="bg-ft-dark-green text-white px-6 rounded-md shadow-lg font-exo text-base w-full touch-manipulation min-h-[44px]"
            >
              {continueLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

export default MobileFactDialog;
