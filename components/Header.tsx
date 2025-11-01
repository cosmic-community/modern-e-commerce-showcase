'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:text-secondary transition-colors">
            E-Commerce
          </Link>
          
          <div className="flex gap-8 items-center">
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
            
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="hover:text-secondary transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-secondary hover:bg-accent px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hover:text-secondary transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-secondary hover:bg-accent px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}