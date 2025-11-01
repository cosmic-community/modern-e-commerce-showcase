// app/products/[slug]/page.tsx
import { getProduct, getReviewsByProduct } from '@/lib/cosmic'
import { Product, Review } from '@/types'
import { notFound } from 'next/navigation'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const primaryImage = product.metadata.product_images?.[0]
  const imageUrl = primaryImage ? `${primaryImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : undefined

  return {
    title: `${product.metadata.product_name}`,
    description: product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
    keywords: [product.metadata.product_name, 'product', 'e-commerce', 'shop', 'buy'],
    openGraph: {
      title: product.metadata.product_name,
      description: product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
      type: 'website',
      url: `/products/${slug}`,
      images: imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: product.metadata.product_name,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadata.product_name,
      description: product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id) as Review[]
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + parseInt(review.metadata.rating.key), 0) / reviews.length
    : 0

  const primaryImage = product.metadata.product_images?.[0]

  // Generate JSON-LD structured data for Product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.metadata.product_name,
    description: product.metadata.description.replace(/<[^>]*>/g, ''),
    image: primaryImage ? `${primaryImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress` : undefined,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products/${slug}`,
      priceCurrency: 'USD',
      price: product.metadata.price.toFixed(2),
      availability: product.metadata.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
    aggregateRating: reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.metadata.customer_name
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.metadata.rating.key,
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.metadata.review_text,
      datePublished: review.created_at
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {primaryImage && (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={`${primaryImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.metadata.product_name}
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                />
              </div>
            )}
            
            {/* Additional Images */}
            {product.metadata.product_images && product.metadata.product_images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.metadata.product_images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${product.metadata.product_name} - Image ${index + 2}`}
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {product.metadata.product_name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-secondary">
                ${product.metadata.price.toFixed(2)}
              </span>
              
              {product.metadata.in_stock ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Average Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-secondary' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            {/* Description */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.metadata.description }}
            />

            {/* Add to Cart Button */}
            <AddToCartButton product={product} />

            {/* Collections */}
            {product.metadata.collections && product.metadata.collections.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-primary mb-3">Collections</h3>
                <div className="flex flex-wrap gap-2">
                  {product.metadata.collections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.slug}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      {collection.metadata.collection_name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews */}
        {reviews.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}