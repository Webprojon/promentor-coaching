import { Avatar, Typography } from "@promentorapp/ui-kit";

type MemberAvatarStackProps = {
  id: string;
  avatarUrls: (string | null)[];
  totalCount: number;
  maxVisible?: number;
  memberNames?: string[];
  ariaLabel?: string;
};

export function MemberAvatarStack({
  id,
  avatarUrls,
  totalCount,
  maxVisible = 3,
  memberNames,
  ariaLabel,
}: MemberAvatarStackProps) {
  const visible = avatarUrls.slice(0, maxVisible);
  const overflow = Math.max(totalCount - maxVisible, 0);
  const visibleCount = visible.length;
  const resolvedAriaLabel =
    ariaLabel ??
    `${totalCount} members, ${visibleCount} shown${overflow > 0 ? `, ${overflow} more` : ""}`;

  return (
    <div className="flex items-center" aria-label={resolvedAriaLabel}>
      <div className="flex">
        {visible.map((avatarUrl, index) => {
          const fromList = memberNames?.[index];
          const label =
            typeof fromList === "string" && fromList.trim().length > 0
              ? fromList.trim()
              : String.fromCodePoint(65 + (index % 26));
          return (
            <div
              key={`${id}-avatar-${index}`}
              className={index > 0 ? "-ml-2" : ""}
              aria-hidden="true"
            >
              <Avatar user={{ name: label, avatarUrl }} size="sm" />
            </div>
          );
        })}
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
