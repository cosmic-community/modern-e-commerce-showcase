import { getCollections } from '@/lib/cosmic'
import { Collection } from '@/types'
import CollectionCard from '@/components/CollectionCard'

export const metadata = {
  title: 'Collections | Modern E-Commerce Showcase',
  description: 'Browse our curated collections of premium products',
}

export default async function CollectionsPage() {
  const collections = await getCollections() as Collection[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Collections</h1>
        <p className="text-xl text-gray-600">
          Explore our curated collections of premium products
        </p>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No collections available at the moment.</p>
        </div>
      )}
    </div>
  )
}