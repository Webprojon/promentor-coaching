import { Avatar, Typography } from "@promentorapp/ui-kit";

type MemberAvatarStackProps = {
  id: string;
  avatarUrls: string[];
  totalCount: number;
  maxVisible?: number;
};

export function MemberAvatarStack({
  id,
  avatarUrls,
  totalCount,
  maxVisible = 3,
}: MemberAvatarStackProps) {
  const visible = avatarUrls.slice(0, maxVisible);
  const overflow = Math.max(totalCount - maxVisible, 0);

  return (
    <div className="flex items-center">
      <div className="flex">
        {visible.map((avatarUrl, index) => (
          <div
            key={`${id}-avatar-${index}`}
            className={index > 0 ? "-ml-2" : ""}
          >
            <Avatar user={{ name: "Member", avatarUrl }} size="sm" />
          </div>
        ))}
      </div>
      {overflow > 0 ? (
        <Typography
          component="span"
          variantStyle="caption"
          className="ml-2 text-slate-300"
        >
          +{overflow}
        </Typography>
      ) : null}
    </div>
  );
}
