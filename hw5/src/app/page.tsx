import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-3xl font-bold">Next.js Dashboard</h1>
      <Link
        href="/dashboard"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}