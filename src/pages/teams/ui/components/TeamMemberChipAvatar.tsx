import { useState } from "react";

type TeamMemberChipAvatarProps = {
  firstName: string;
  avatarUrl: string;
};

export function TeamMemberChipAvatar({
  firstName,
  avatarUrl,
}: TeamMemberChipAvatarProps) {
  const letter = (firstName.trim().charAt(0) || "?").toLocaleUpperCase();
  const [broken, setBroken] = useState(false);
  const showImg = avatarUrl.length > 0 && !broken;

  if (showImg) {
    return (
      <img
        src={avatarUrl}
        alt=""
        className="h-5 w-5 shrink-0 rounded-full object-cover"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[10px] font-semibold text-white"
      aria-hidden
    >
      {letter}
    </span>
  );
}
