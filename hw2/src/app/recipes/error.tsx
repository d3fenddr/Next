'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center mt-10 text-red-600">
      <h2 className="text-xl font-semibold">An error occurred</h2>
      <p className="mt-2">{error.message}</p>
    </div>
  )
}
