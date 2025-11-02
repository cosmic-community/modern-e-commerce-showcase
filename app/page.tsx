import { getProducts, getCollections, getReviews } from '@/lib/cosmic'
import { Product, Collection, Review } from '@/types'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Quality Products & Customer Reviews',
  description: 'Explore our curated collection of premium products with authentic customer reviews. Find the perfect items with detailed information and real feedback.',
  openGraph: {
    title: 'Modern E-Commerce Showcase | Quality Products & Reviews',
    description: 'Explore our curated collection of premium products with authentic customer reviews.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern E-Commerce Showcase | Quality Products & Reviews',
    description: 'Explore our curated collection of premium products with authentic customer reviews.',
  },
}

export default async function Home() {
  const products = await getProducts() as Product[]
  const collections = await getCollections() as Collection[]
  const reviews = await getReviews() as Review[]

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3)

  // Get hero background image from first product
  const heroImage = products[0]?.metadata?.product_images?.[0]?.imgix_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&auto=format,compress'

  // Generate JSON-LD structured data for the homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Modern E-Commerce Showcase',
    description: 'A beautiful e-commerce showcase featuring products, collections, and customer reviews',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Enhanced Hero Section with Product Image Background */}
      <section className="relative bg-gradient-to-br from-primary via-blue-800 to-secondary overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={`${heroImage}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt="Featured products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-blue-800/85 to-secondary/90"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              Discover Quality Products
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 animate-fade-in-delay">
              Explore our curated collection of premium products with authentic customer reviews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
              <Link 
                href="/products" 
                className="bg-white text-primary hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link 
                href="/collections" 
                className="bg-secondary/20 backdrop-blur-sm text-white hover:bg-secondary/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-white/30 hover:border-white/50"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Contact CTA Section */}
        <section className="bg-primary text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We're here to help! Get in touch with our team for product inquiries, support, or any questions you may have.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-secondary hover:bg-accent px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </>
  )
}