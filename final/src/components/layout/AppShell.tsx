"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";
// возьмём готовый компонент профиля
import ProfileMenu from "../navigation/ProfileMenu";

type Props = {
  children: ReactNode;
  /** Показать полный хедер с Welcome */
  showHeader?: boolean;
  /** Показать только правый угол с профилем (без Welcome) */
  profileOnly?: boolean;
  /** фиксируем одинаковую ширину контента */
  maxWidthClass?: string; // tailwind class, например "max-w-[1200px]"
};

export default function AppShell({
  children,
  showHeader = true,
  profileOnly = false,
  maxWidthClass = "max-w-[1200px]",
}: Props) {
  return (
    <div className="h-screen w-screen bg-[#F6F8FC]">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-[260px_1fr]">
        {/* Sidebar слева — фиксированный */}
        <aside className="hidden h-screen border-r border-slate-200 bg-white lg:block">
          <Sidebar />
        </aside>

        {/* Правая часть — общий скролл */}
        <div className="flex h-screen min-w-0 flex-col overflow-y-auto overscroll-contain">
          {/* Верхняя плашка */}
          {showHeader ? (
            <Header />
          ) : profileOnly ? (
            <div className="sticky top-0 z-10 bg-[#F6F8FC]">
              <div className={`mx-auto flex ${maxWidthClass} items-center justify-end px-6 py-5`}>
                <ProfileMenu />
              </div>
            </div>
          ) : (
            <div className="h-4" />
          )}

          <main className="min-h-0 flex-1">
            <div className={`mx-auto h-full w-full ${maxWidthClass} px-6 py-6`}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
