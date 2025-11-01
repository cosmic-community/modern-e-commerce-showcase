'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const cartItemCount = getTotalItems()

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
            
            {/* Cart Icon */}
            <Link 
              href="/cart" 
              className="hover:text-secondary transition-colors font-medium relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
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
              
              {/* Cart Link for Mobile */}
              <Link 
                href="/cart" 
                className="hover:text-secondary transition-colors font-medium py-2 border-b border-secondary/30 flex items-center justify-between"
                onClick={closeMobileMenu}
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-secondary text-white text-xs rounded-full px-2 py-1">
                    {cartItemCount}
                  </span>
                )}
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