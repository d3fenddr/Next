"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Failed to load todos.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Try again
      </button>
    </div>
  );
}
