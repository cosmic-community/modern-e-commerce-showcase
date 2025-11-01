import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get all products
export async function getProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'modified_at'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Get a single product by slug
export async function getProduct(slug: string) {
  try {
    // Changed: Added more specific query to ensure slug matching
    const response = await cosmic.objects
      .findOne({ 
        type: 'products', 
        slug: slug 
      })
      .props(['id', 'title', 'slug', 'metadata', 'modified_at', 'created_at'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    // Changed: Log error for debugging in production
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

// Get all collections
export async function getCollections() {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'modified_at'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch collections')
  }
}

// Get a single collection by slug
export async function getCollection(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata', 'modified_at'])
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch collection')
  }
}

// Get products by collection ID
export async function getProductsByCollection(collectionId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': collectionId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'modified_at'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products by collection')
  }
}

// Get all reviews
export async function getReviews() {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

// Get reviews by product ID
export async function getReviewsByProduct(productId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews by product')
  }
}

// User authentication functions

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.email': email 
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'users',
        id 
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

// Create new user
export async function createUser(data: {
  full_name: string
  email: string
  password_hash: string
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: data.full_name,
      type: 'users',
      metadata: {
        full_name: data.full_name,
        email: data.email,
        password_hash: data.password_hash,
        account_status: 'Active'
      }
    })
    
    return response.object
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

// Update user profile
export async function updateUserProfile(id: string, data: {
  full_name?: string
  bio?: string
  profile_picture?: string
}) {
  try {
    const response = await cosmic.objects.updateOne(id, {
      title: data.full_name,
      metadata: data
    })
    
    return response.object
  } catch (error) {
    throw new Error('Failed to update user profile')
  }
}

// Contact form functions

// Create contact submission
export async function createContactSubmission(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${data.subject} - ${data.name}`,
      type: 'contact-submissions',
      metadata: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'New'
      }
    })
    
    return response.object
  } catch (error) {
    throw new Error('Failed to create contact submission')
  }
}