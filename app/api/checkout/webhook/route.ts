import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { cosmic } from '@/lib/cosmic'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Parse order items from metadata
      const orderItems = JSON.parse(session.metadata?.order_items || '[]')

      // Create order in Cosmic CMS
      await cosmic.objects.insertOne({
        title: `Order #${session.id.slice(-8).toUpperCase()}`,
        type: 'orders',
        metadata: {
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          customer_name: session.metadata?.customer_name || '',
          customer_email: session.customer_email || '',
          customer_phone: session.metadata?.customer_phone || '',
          shipping_address: session.metadata?.shipping_address || '',
          shipping_city: session.metadata?.shipping_city || '',
          shipping_state: session.metadata?.shipping_state || '',
          shipping_zip: session.metadata?.shipping_zip || '',
          order_items: orderItems,
          total_amount: (session.amount_total || 0) / 100, // Convert from cents
          order_status: 'Processing',
          payment_status: 'Paid',
          order_date: new Date().toISOString(),
        },
      })

      console.log('Order created successfully for session:', session.id)
    } catch (error) {
      console.error('Error creating order in Cosmic:', error)
      // Don't return error to Stripe - we'll handle this separately
    }
  }

  return NextResponse.json({ received: true })
}