import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen mx-auto max-w-7xl w-full px-4 pb-4 lg:px-0">
      {children}
    </main>
  );
}
