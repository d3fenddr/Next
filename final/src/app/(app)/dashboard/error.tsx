"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-1 text-sm text-slate-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
