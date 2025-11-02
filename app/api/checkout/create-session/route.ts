import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/lib/cart-context'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo } = body as {
      items: CartItem[]
      customerInfo: {
        fullName: string
        email: string
        phone: string
        address: string
        city: string
        state: string
        zipCode: string
      }
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata.product_name,
          description: item.product.metadata.description,
          images: item.product.metadata.product_images?.[0]
            ? [`${item.product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`]
            : [],
        },
        unit_amount: Math.round(item.product.metadata.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
          description: 'Standard shipping',
          images: [], // Changed: Added required images property for Stripe API
        },
        unit_amount: 1000, // $10.00 in cents
      },
      quantity: 1,
    })

    // Calculate tax (8%)
    const subtotal = items.reduce((total, item) => {
      return total + item.product.metadata.price * item.quantity
    }, 0)
    const taxAmount = Math.round(subtotal * 0.08 * 100) // Convert to cents

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax',
          description: 'Sales tax (8%)',
          images: [], // Changed: Added required images property for Stripe API
        },
        unit_amount: taxAmount,
      },
      quantity: 1,
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,
      customer_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.fullName,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        shipping_city: customerInfo.city,
        shipping_state: customerInfo.state,
        shipping_zip: customerInfo.zipCode,
        order_items: JSON.stringify(
          items.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.metadata.product_name,
            quantity: item.quantity,
            price: item.product.metadata.price,
          }))
        ),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}