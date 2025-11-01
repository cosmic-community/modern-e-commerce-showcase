'use client'

import { useState, useMemo } from 'react'
import { Product, Collection } from '@/types'
import ProductCard from '@/components/ProductCard'

interface ProductSearchClientProps {
  products: Product[]
  collections: Collection[]
}

export default function ProductSearchClient({ products, collections }: ProductSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all')

  // Calculate price range from products
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) return { minPrice: 0, maxPrice: 1000 }
    
    const prices = products.map(p => p.metadata.price)
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    }
  }, [products])

  // Filter products based on search criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query filter (name and description)
      const matchesSearch = searchQuery === '' || 
        product.metadata.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.metadata.description && product.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()))

      // Collection filter
      const matchesCollection = selectedCollection === 'all' ||
        (product.metadata.collections && 
         product.metadata.collections.some((col: Collection) => col.id === selectedCollection))

      // Price range filter
      const matchesPrice = product.metadata.price >= priceRange[0] && 
                          product.metadata.price <= priceRange[1]

      // Stock filter
      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'in-stock' && product.metadata.in_stock) ||
        (stockFilter === 'out-of-stock' && !product.metadata.in_stock)

      return matchesSearch && matchesCollection && matchesPrice && matchesStock
    })
  }, [products, searchQuery, selectedCollection, priceRange, stockFilter])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCollection('all')
    setPriceRange([minPrice, maxPrice])
    setStockFilter('all')
  }

  const hasActiveFilters = searchQuery !== '' || 
                          selectedCollection !== 'all' || 
                          priceRange[0] !== minPrice || 
                          priceRange[1] !== maxPrice || 
                          stockFilter !== 'all'

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary">Search & Filter</h2>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-sm text-secondary hover:text-accent transition-colors font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Collection Filter */}
          <div>
            <label htmlFor="collection" className="block text-sm font-medium text-gray-700 mb-2">
              Collection
            </label>
            <select
              id="collection"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            >
              <option value="all">All Collections</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.metadata.collection_name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              id="stock"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'in-stock' | 'out-of-stock')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            >
              <option value="all">All Products</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center gap-4">
              <input
                id="price-min"
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                id="price-max"
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold">{products.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}