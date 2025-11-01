import { getProducts, getCollections, getReviews } from '@/lib/cosmic'
import { Product, Collection, Review } from '@/types'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

export default async function Home() {
  const products = await getProducts() as Product[]
  const collections = await getCollections() as Collection[]
  const reviews = await getReviews() as Review[]

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Discover Quality Products
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of premium products with authentic customer reviews
        </p>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Featured Collections</h2>
            <Link 
              href="/collections" 
              className="text-secondary hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
            <Link 
              href="/products" 
              className="text-secondary hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Customer Reviews</h2>
            <Link 
              href="/reviews" 
              className="text-secondary hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}