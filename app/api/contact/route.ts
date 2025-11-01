import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create contact submission in Cosmic
    const submission = await createContactSubmission({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      submission
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}