import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth'
import { LoginCredentials } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json()

    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await loginUser(credentials)

    if (!result.success) {
      return NextResponse.json(result, { status: 401 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}