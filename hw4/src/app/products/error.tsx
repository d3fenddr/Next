"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div style={{ padding: 24, color: "crimson" }}>
      Error loading products: {error.message}
    </div>
  );
}
