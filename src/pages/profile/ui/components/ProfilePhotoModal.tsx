import Button, { Avatar, Typography } from "@promentorapp/ui-kit";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { RiImageAddLine } from "react-icons/ri";
import type { ProfilePhotoModalProps } from "@/pages/profile/model/types";
import { getErrorMessage } from "@/shared/api/errors";
import { readImageFileAsDataUrl } from "@/shared/lib/readImageFileAsDataUrl";
import { Modal } from "@/shared/ui";

export function ProfilePhotoModal({
  open,
  onClose,
  name,
  avatarUrl,
  avatarDraftDataUrl,
  isPhotoRemoved,
  isDisabled,
  isSaving,
  onAvatarDraftChange,
  onRemovePhoto,
  onSave,
}: ProfilePhotoModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);

  useEffect(() => {
    if (open) {
      setFileError(null);
    }
  }, [open]);

  const previewSrc = isPhotoRemoved
    ? undefined
    : avatarDraftDataUrl || avatarUrl || undefined;

  const hasPendingChange = isPhotoRemoved || Boolean(avatarDraftDataUrl.trim());

  const processImageFile = async (file: File) => {
    setFileError(null);
    setIsReadingFile(true);
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      onAvatarDraftChange(dataUrl);
    } catch (error) {
      setFileError(getErrorMessage(error));
    } finally {
      setIsReadingFile(false);
    }
  };

  const handleDeviceFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    await processImageFile(file);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }
    void processImageFile(file);
  };

  const pickDisabled = isDisabled || isSaving || isReadingFile;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Profile photo"
      secondaryAction={{
        label: "Cancel",
        variant: "text",
        onClick: onClose,
      }}
      primaryAction={{
        label: isSaving ? "Saving…" : "Save",
        onClick: () => {
          void onSave();
        },
        disabled: isDisabled || isSaving || !hasPendingChange,
      }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="flex flex-col items-center gap-4 lg:w-[240px] lg:shrink-0">
          <div className="relative flex items-center justify-center">
            <div
              className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-cyan-400/15 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-full p-1 ring-2 ring-cyan-400/25 ring-offset-4 ring-offset-slate-950/80">
              <Avatar user={{ name, avatarUrl: previewSrc }} size="lg" />
            </div>
          </div>
          <Typography
            component="p"
            className="max-w-[220px] text-center text-xs leading-relaxed text-slate-500"
          >
            Shown on your profile and wherever your name appears in the app.
          </Typography>
          <Button
            type="button"
            disabled={
              isDisabled ||
              isSaving ||
              isPhotoRemoved ||
              (!avatarUrl?.trim() && !avatarDraftDataUrl.trim())
            }
            onClick={onRemovePhoto}
            className="text-sm font-medium text-red-300/90 underline-offset-2 transition hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Remove current photo
          </Button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="rounded-xl border border-white/10 bg-cyan-900/15 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)]">
            <Typography
              component="h3"
              className="text-sm! font-semibold tracking-tight text-slate-100"
            >
              Upload from your device
            </Typography>
            <Typography
              component="p"
              className="mt-1.5 text-sm leading-relaxed text-slate-400"
            >
              PNG, JPEG, GIF, or WebP · up to 2&nbsp;MB · square images look
              best.
            </Typography>

            <Button
              type="button"
              disabled={pickDisabled}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onDrop={handleDrop}
              className="group mt-5 flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-cyan-400/35 bg-cyan-500/[0.07] px-4 py-10 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/20 transition group-hover:bg-cyan-500/20">
                <RiImageAddLine className="text-2xl" aria-hidden />
              </span>
              <span className="text-sm font-medium text-cyan-100">
                {isReadingFile ? "Reading file…" : "Choose image"}
              </span>
              <span className="text-xs text-slate-500">
                Drop a file here or tap to browse
              </span>
            </Button>

            <input
              id="profile-avatar-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              className="hidden"
              aria-label="Choose profile image from your device"
              onChange={handleDeviceFileChange}
            />

            {fileError ? (
              <Typography
                component="p"
                className="mt-4 text-sm text-red-300"
                role="alert"
              >
                {fileError}
              </Typography>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}
