import { Button } from "@promentorapp/ui-kit";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

let openModalCount = 0;
let originalBodyOverflow: string | null = null;

export type ModalAction = {
  id?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?: "error" | "success" | "primary" | "secondary" | "inherit";
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  footerActions?: ModalAction[];
};

export function Modal({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  footerActions,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (openModalCount === 0) {
      originalBodyOverflow = document.body.style.overflow;
    }
    openModalCount += 1;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openModalCount = Math.max(0, openModalCount - 1);
      if (openModalCount === 0) {
        document.body.style.overflow = originalBodyOverflow ?? "";
        originalBodyOverflow = null;
      }
      previouslyFocused?.focus();
    };
  }, [open]);

  if (typeof document === "undefined") return null;
  if (!open) return null;

  const hasCustomFooter = Boolean(footerActions?.length);
  const hasLegacyFooter =
    !hasCustomFooter && Boolean(primaryAction || secondaryAction);
  const showFooter = hasCustomFooter || hasLegacyFooter;

  const onOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-1300 transition-opacity duration-200 opacity-100">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex min-h-full items-center justify-center p-4"
        onClick={onOutsideClick}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-3xl overflow-hidden rounded-lg border border-white/20 bg-slate-900/80 shadow-[0_18px_60px_rgba(2,6,23,0.65)] backdrop-blur-md transition-all duration-200 scale-100 opacity-100"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
            <h2 id={titleId} className="text-lg font-semibold text-white">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center cursor-pointer justify-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              x
            </button>
          </div>

          <div className="p-5">{children}</div>

          {showFooter ? (
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/20 px-5 py-4">
              {hasCustomFooter
                ? (footerActions ?? []).map((action, index) => (
                    <Button
                      key={action.id ?? `${action.label}-${index}`}
                      type="button"
                      variant={action.variant ?? "outlined"}
                      color={action.color}
                      onClick={action.onClick}
                      disabled={action.disabled}
                    >
                      {action.label}
                    </Button>
                  ))
                : null}
              {!hasCustomFooter && secondaryAction ? (
                <Button
                  type="button"
                  variant={secondaryAction.variant ?? "outlined"}
                  color={secondaryAction.color}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                >
                  {secondaryAction.label}
                </Button>
              ) : null}
              {!hasCustomFooter && primaryAction ? (
                <Button
                  type="button"
                  variant={primaryAction.variant ?? "contained"}
                  color={primaryAction.color}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled}
                >
                  {primaryAction.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
