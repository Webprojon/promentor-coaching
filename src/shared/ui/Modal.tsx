import { Button } from "@promentorapp/ui-kit";
import { type MouseEvent, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalAction = {
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
};

export function Modal({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const onOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-1300 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex min-h-full items-center justify-center p-4"
        onClick={onOutsideClick}
      >
        <div
          className={`w-full max-w-3xl overflow-hidden rounded-lg border border-white/20 bg-slate-900/80 shadow-[0_18px_60px_rgba(2,6,23,0.65)] backdrop-blur-md transition-all duration-200 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
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

          {primaryAction || secondaryAction ? (
            <div className="flex items-center justify-end gap-2 border-t border-white/20 px-5 py-4">
              {secondaryAction ? (
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
              {primaryAction ? (
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
