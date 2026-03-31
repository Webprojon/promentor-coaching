import { NavLink } from "react-router-dom";
import { mentorLinks, regularUserLinks } from "../model/constants";

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
  return (
    <header className="border-b border-white/10 bg-slate-900/90 backdrop-blur mb-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 py-3">
        <LinkGroup links={mentorLinks} />
        <LinkGroup links={regularUserLinks} />
      </div>
    </header>
  );
}
