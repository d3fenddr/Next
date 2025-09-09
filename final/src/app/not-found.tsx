export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-slate-500">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-white">
          Go home
        </a>
      </div>
    </div>
  );
}
