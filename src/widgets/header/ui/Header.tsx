import { NavLink } from "react-router-dom";
import { Typography } from "@promentorapp/ui-kit";
import { mentorLinks, regularUserLinks } from "@/widgets/header/model/constants";
import { useHostAuthSession } from "@/features/auth";

type HeaderNavLink = {
  to: string;
  label: string;
};

function HeaderLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "rounded-md border border-cyan-300/40 bg-cyan-300/15 px-3 py-1.5 text-sm font-medium text-cyan-100"
          : "rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
      }
    >
      {label}
    </NavLink>
  );
}

function LinkGroup({ links }: { links: HeaderNavLink[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <HeaderLink key={link.to} to={link.to} label={link.label} />
      ))}
    </nav>
  );
}

export default function Header() {
  const {
    session: { user },
    isBridgeAvailable,
  } = useHostAuthSession();

  const isGuestInHostMode = isBridgeAvailable && !user;
  const isMentor = user?.role === "MENTOR";
  const links = isBridgeAvailable
    ? user
      ? isMentor
        ? mentorLinks
        : regularUserLinks
      : null
    : null;

  return (
    <header className="border-b border-white/10 mb-6 px-4 lg:px-0">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 py-3">
        {isGuestInHostMode ? (
          <Typography
            component="span"
            className="rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-100"
          >
            Session ended
          </Typography>
        ) : links && user ? (
          <>
            <LinkGroup links={links} />
            <Typography
              component="span"
              className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-200"
            >
              {isMentor ? "Mentor" : "Regular User"}
            </Typography>
          </>
        ) : (
          <>
            <LinkGroup links={mentorLinks} />
            <LinkGroup links={regularUserLinks} />
          </>
        )}
      </div>
    </header>
  );
}
