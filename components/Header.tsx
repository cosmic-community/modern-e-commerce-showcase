import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:text-secondary transition-colors">
            E-Commerce
          </Link>
          
          <div className="flex gap-8">
            <Link 
              href="/products" 
              className="hover:text-secondary transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="hover:text-secondary transition-colors font-medium"
            >
              Collections
            </Link>
            <Link 
              href="/reviews" 
              className="hover:text-secondary transition-colors font-medium"
            >
              Reviews
            </Link>
            <Link 
              href="/about" 
              className="hover:text-secondary transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}