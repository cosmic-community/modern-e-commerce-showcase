'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()
  const [orderNumber, setOrderNumber] = useState<string>('')

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()

    // Generate order number from session ID if available
    if (sessionId) {
      setOrderNumber(sessionId.slice(-8).toUpperCase())
    }
  }, [sessionId, clearCart])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-primary mb-4">Payment Successful!</h1>
        {orderNumber && (
          <p className="text-lg text-gray-600 mb-2">
            Order Number: <span className="font-semibold text-secondary">#{orderNumber}</span>
          </p>
        )}
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">What's Next?</h2>
          <div className="text-left space-y-4 text-gray-700">
            <p>✓ You will receive an order confirmation email shortly</p>
            <p>✓ Your order will be processed within 1-2 business days</p>
            <p>✓ Shipping typically takes 3-5 business days</p>
            <p>✓ You can track your order status in your email confirmation</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}