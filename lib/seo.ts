import { Product, Review } from '@/types'

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Modern E-Commerce Showcase',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'A beautiful e-commerce showcase featuring products, collections, and customer reviews',
    sameAs: [
      'https://twitter.com/ModernEcommerce',
      'https://facebook.com/ModernEcommerce',
      'https://instagram.com/ModernEcommerce',
    ],
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

/**
 * Strip HTML tags from string for meta descriptions
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Generate optimized imgix URL for Open Graph images
 */
export function getOgImageUrl(imgixUrl: string): string {
  return `${imgixUrl}?w=1200&h=630&fit=crop&auto=format,compress`
}

/**
 * Calculate average rating from reviews
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + parseInt(review.metadata.rating.key), 0)
  return sum / reviews.length
}

/**
 * Generate product schema with reviews
 */
export function generateProductSchema(
  product: Product,
  reviews: Review[],
  averageRating: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const primaryImage = product.metadata.product_images?.[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.metadata.product_name,
    description: stripHtml(product.metadata.description),
    image: primaryImage ? `${primaryImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress` : undefined,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Modern E-Commerce Showcase'
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.metadata.price.toFixed(2),
      availability: product.metadata.in_stock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
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
}