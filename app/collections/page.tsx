import { getCollections } from '@/lib/cosmic'
import { Collection } from '@/types'
import CollectionSearchClient from '@/components/CollectionSearchClient'

export const metadata = {
  title: 'Collections | Modern E-Commerce Showcase',
  description: 'Browse our curated collections of premium products',
}

export default async function CollectionsPage() {
  const collections = await getCollections() as Collection[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Collections</h1>
        <p className="text-xl text-gray-600">
          Explore our curated collections of premium products
        </p>
      </div>

      <CollectionSearchClient collections={collections} />
    </div>
  )
}