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

  return {
    title: `${collection.metadata.collection_name} | Modern E-Commerce Showcase`,
    description: collection.metadata.description || `Browse products in the ${collection.metadata.collection_name} collection`,
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug) as Collection | null

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id) as Product[]

  return (
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
  )
}