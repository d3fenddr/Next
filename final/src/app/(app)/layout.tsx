import type { ReactNode } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-[#F6F8FC]">
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden h-screen border-r border-slate-200 bg-white lg:block">
          <Sidebar />
        </aside>

        <div className="flex h-screen min-w-0 flex-col overflow-y-auto overscroll-contain">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
