'use client'

import { useState, useMemo } from 'react'
import { Collection } from '@/types'
import CollectionCard from '@/components/CollectionCard'

interface CollectionSearchClientProps {
  collections: Collection[]
}

export default function CollectionSearchClient({ collections }: CollectionSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter collections based on search query
  const filteredCollections = useMemo(() => {
    if (searchQuery === '') return collections

    return collections.filter(collection => {
      const matchesName = collection.metadata.collection_name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDescription = collection.metadata.description?.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesName || matchesDescription
    })
  }, [collections, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label htmlFor="search-collections" className="block text-sm font-medium text-gray-700 mb-2">
          Search Collections
        </label>
        <input
          id="search-collections"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by collection name or description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-primary">{filteredCollections.length}</span> of{' '}
          <span className="font-semibold">{collections.length}</span> collections
        </p>
      </div>

      {/* Collections Grid */}
      {filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}