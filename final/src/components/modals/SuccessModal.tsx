"use client";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SuccessModal({
  open,
  title = "Congratulations",
  message = "Your action has been completed successfully.",
  actionLabel = "Ok",
  onAction,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-xl ring-1 ring-slate-100">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
          <svg className="h-10 w-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M7 12l3 3 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center text-xl font-semibold text-slate-900">{title}</div>
        <div className="mt-2 text-center text-slate-600">{message}</div>
        <div className="mt-8 grid place-items-center">
          <button
            onClick={onAction}
            className="w-40 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-white"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
