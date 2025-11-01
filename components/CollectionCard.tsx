import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        {collection.metadata.featured_image && (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${collection.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={collection.metadata.collection_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              width={600}
              height={338}
            />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
            {collection.metadata.collection_name}
          </h3>
          
          {collection.metadata.description && (
            <p className="text-gray-600 line-clamp-2">
              {collection.metadata.description}
            </p>
          )}
          
          <div className="mt-4 text-secondary group-hover:text-accent transition-colors font-medium">
            View Collection →
          </div>
        </div>
      </div>
    </Link>
  )
}