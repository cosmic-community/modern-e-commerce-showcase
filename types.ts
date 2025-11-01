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

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}