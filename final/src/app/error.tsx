"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] grid place-items-center p-8">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        {error?.digest ? (
          <p className="mt-2 text-sm text-slate-500">Ref: {error.digest}</p>
        ) : null}
        <button
          onClick={() => reset()}
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
