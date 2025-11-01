// app/collections/[slug]/page.tsx
import { getCollection, getProductsByCollection } from '@/lib/cosmic'
import { Collection, Product } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug) as Collection | null

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  const imageUrl = collection.metadata.featured_image 
    ? `${collection.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title: `${collection.metadata.collection_name}`,
    description: collection.metadata.description || `Browse products in the ${collection.metadata.collection_name} collection`,
    keywords: [collection.metadata.collection_name, 'collection', 'products', 'category', 'shop'],
    openGraph: {
      title: collection.metadata.collection_name,
      description: collection.metadata.description || `Browse products in the ${collection.metadata.collection_name} collection`,
      type: 'website',
      url: `/collections/${slug}`,
      images: imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: collection.metadata.collection_name,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.metadata.collection_name,
      description: collection.metadata.description || `Browse products in the ${collection.metadata.collection_name} collection`,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug) as Collection | null

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id) as Product[]

  // Generate JSON-LD structured data for Collection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.metadata.collection_name,
    description: collection.metadata.description || `Browse products in the ${collection.metadata.collection_name} collection`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/collections/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.metadata.product_name,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products/${product.slug}`,
          image: product.metadata.product_images?.[0] 
            ? `${product.metadata.product_images[0].imgix_url}?w=600&h=600&fit=crop&auto=format,compress`
            : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: product.metadata.price.toFixed(2),
            availability: product.metadata.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
          }
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="mb-12">
          {collection.metadata.featured_image && (
            <div className="aspect-[21/9] rounded-lg overflow-hidden mb-8">
              <img
                src={`${collection.metadata.featured_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
                alt={collection.metadata.collection_name}
                className="w-full h-full object-cover"
                width={1200}
                height={500}
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-primary mb-4">
            {collection.metadata.collection_name}
          </h1>
          
          {collection.metadata.description && (
            <p className="text-xl text-gray-600 max-w-3xl">
              {collection.metadata.description}
            </p>
          )}
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Products in this collection ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products in this collection yet.</p>
          </div>
        )}
      </div>
    </>
  )
}