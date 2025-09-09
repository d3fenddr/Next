import type { ReactNode } from "react";

type Slots = { children: ReactNode; main: ReactNode; side: ReactNode; modal: ReactNode };

export default function Layout({ children, main, side, modal }: Slots) {
  return (
    <div className="h-full overflow-hidden px-6 pb-6">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-[1200px] grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_360px]">
        <div className="min-h-0 min-w-0">{main ?? children}</div>
        <div className="min-h-0 min-w-0">{side}</div>
      </div>
      {modal}
    </div>
  );
}
