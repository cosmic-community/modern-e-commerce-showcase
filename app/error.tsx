'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">Something went wrong!</h2>
      <p className="text-xl text-gray-600 mb-8">
        We encountered an error while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-accent transition-colors font-medium"
      >
        Try again
      </button>
    </div>
  )
}