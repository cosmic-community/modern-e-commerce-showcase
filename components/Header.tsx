'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-primary text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:text-secondary transition-colors">
            E-Commerce
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center">
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
            <Link 
              href="/contact" 
              className="hover:text-secondary transition-colors font-medium"
            >
              Contact
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-secondary/20 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-primary z-40">
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                href="/products" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              <Link 
                href="/collections" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                onClick={closeMobileMenu}
              >
                Collections
              </Link>
              <Link 
                href="/reviews" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                onClick={closeMobileMenu}
              >
                Reviews
              </Link>
              <Link 
                href="/about" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/profile" 
                    className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      closeMobileMenu()
                    }}
                    className="bg-secondary hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-secondary hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}