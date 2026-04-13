import { Avatar, Button, Typography } from "@promentorapp/ui-kit";
import { type ChangeEvent, useRef } from "react";
import { RiImageAddLine, RiMagicLine } from "react-icons/ri";
import type { ProfilePhotoModalProps } from "@/pages/profile/model/types";
import { Modal } from "@/shared/ui";

export function ProfilePhotoModal({
  open,
  onClose,
  name,
  avatarUrl,
  photoUrlDraft,
  isPhotoRemoved,
  onPhotoUrlChange,
  onRemovePhoto,
}: ProfilePhotoModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    onPhotoUrlChange(localPreviewUrl);
    event.target.value = "";
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change profile photo"
      secondaryAction={{
        label: "Cancel",
        variant: "text",
        onClick: onClose,
      }}
      primaryAction={{
        label: "Save changes",
        onClick: onClose,
      }}
    >
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)]">
        <div className="rounded-lg border border-white/15 p-4">
          <Typography
            component="p"
            className="text-xs! font-semibold uppercase tracking-wider text-slate-400"
          >
            Preview
          </Typography>
          <div className="mt-3 flex justify-center">
            <Avatar
              user={{
                name,
                avatarUrl: isPhotoRemoved ? undefined : photoUrlDraft || avatarUrl,
              }}
              size="lg"
            />
          </div>
          <Typography
            component="p"
            className="mt-3 text-center text-xs text-slate-500"
          >
            Your new profile photo appears across the application.
          </Typography>
        </div>

        <div className="grid gap-3">
          <div className="rounded-lg border border-white/15 p-4">
            <Typography component="p" className="text-sm! font-semibold text-slate-100">
              Choose photo source
            </Typography>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outlined"
                onClick={handleUploadClick}
                className="justify-start gap-2 border-cyan-400/35 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/15"
              >
                <RiImageAddLine className="text-base" aria-hidden />
                Upload image
              </Button>
              <Button
                type="button"
                variant="outlined"
                disabled
                className="justify-start gap-2 border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
              >
                <RiMagicLine className="text-base" aria-hidden />
                Use avatar preset
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="rounded-lg border border-white/15 p-4">
            <Typography component="p" className="mb-2 text-sm! font-semibold text-slate-100">
              Or paste image URL
            </Typography>
            <input
              type="url"
              value={photoUrlDraft}
              onChange={(event) => onPhotoUrlChange(event.target.value)}
              placeholder="https://example.com/my-photo.jpg"
              className="h-11 w-full rounded-lg border border-white/20 bg-transparent px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
            />
            <Typography component="p" className="mt-2 text-xs text-slate-500">
              Recommended: square image, minimum 512 x 512.
            </Typography>
            <div className="mt-3">
              <Button
                type="button"
                variant="outlined"
                onClick={onRemovePhoto}
                disabled={isPhotoRemoved && !photoUrlDraft && !avatarUrl}
                className="border-red-400/45 text-red-300 hover:border-red-300 hover:bg-red-500/10"
              >
                Remove photo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
