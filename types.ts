// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    product_name: string
    description: string
    price: number
    product_images?: Array<{
      url: string
      imgix_url: string
    }>
    in_stock: boolean
    collections?: Collection[]
  }
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections'
  metadata: {
    collection_name: string
    description?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
  }
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    customer_name: string
    rating: {
      key: string
      value: string
    }
    review_text: string
    product?: Product
    verified_purchase: boolean
  }
}

// User interface
export interface User extends CosmicObject {
  type: 'users'
  metadata: {
    full_name: string
    email: string
    password_hash: string
    profile_picture?: {
      url: string
      imgix_url: string
    }
    bio?: string
    account_status: string
  }
}

// Contact submission interface
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions'
  metadata: {
    name: string
    email: string
    subject: string
    message: string
    status: string
  }
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  full_name: string
  profile_picture?: string
  bio?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  full_name: string
  email: string
  password: string
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  token?: string
  message?: string
}