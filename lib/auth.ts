import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserByEmail, getUserById, createUser } from './cosmic'
import { AuthUser, LoginCredentials, SignupData, User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long')
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Generate JWT token
export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      full_name: user.full_name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Verify JWT token
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

// Login user
export async function loginUser(credentials: LoginCredentials) {
  const { email, password } = credentials

  // Find user by email
  const user = await getUserByEmail(email) as User | null

  if (!user) {
    return { success: false, message: 'Invalid email or password' }
  }

  // Verify password
  const isValid = await verifyPassword(password, user.metadata.password_hash)

  if (!isValid) {
    return { success: false, message: 'Invalid email or password' }
  }

  // Check account status
  if (user.metadata.account_status !== 'Active') {
    return { success: false, message: 'Account is inactive' }
  }

  // Create auth user object
  const authUser: AuthUser = {
    id: user.id,
    email: user.metadata.email,
    full_name: user.metadata.full_name,
    profile_picture: user.metadata.profile_picture?.imgix_url
  }

  // Generate token
  const token = generateToken(authUser)

  return {
    success: true,
    user: authUser,
    token
  }
}

// Signup user
export async function signupUser(data: SignupData) {
  const { full_name, email, password } = data

  // Check if user already exists
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { success: false, message: 'Email already registered' }
  }

  // Validate password strength
  if (password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters' }
  }

  // Hash password
  const password_hash = await hashPassword(password)

  // Create user
  const user = await createUser({
    full_name,
    email,
    password_hash
  }) as User

  // Create auth user object
  const authUser: AuthUser = {
    id: user.id,
    email: user.metadata.email,
    full_name: user.metadata.full_name
  }

  // Generate token
  const token = generateToken(authUser)

  return {
    success: true,
    user: authUser,
    token
  }
}

// Get current user from token
export async function getCurrentUser(token: string) {
  const decoded = verifyToken(token)

  if (!decoded) {
    return null
  }

  // Fetch fresh user data
  const user = await getUserById(decoded.id) as User | null

  if (!user || user.metadata.account_status !== 'Active') {
    return null
  }

  return {
    id: user.id,
    email: user.metadata.email,
    full_name: user.metadata.full_name,
    profile_picture: user.metadata.profile_picture?.imgix_url,
    bio: user.metadata.bio
  }
}