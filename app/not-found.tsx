import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link 
        href="/"
        className="inline-block px-8 py-3 bg-secondary text-white rounded-lg hover:bg-accent transition-colors font-medium"
      >
        Return Home
      </Link>
    </div>
  )
}