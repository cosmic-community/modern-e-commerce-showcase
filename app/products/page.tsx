import { getProducts, getCollections } from '@/lib/cosmic'
import { Product, Collection } from '@/types'
import ProductSearchClient from '@/components/ProductSearchClient'

export const metadata = {
  title: 'Products | Modern E-Commerce Showcase',
  description: 'Browse our complete collection of premium products',
}

export default async function ProductsPage() {
  const products = await getProducts() as Product[]
  const collections = await getCollections() as Collection[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">All Products</h1>
        <p className="text-xl text-gray-600">
          Browse our complete collection of {products.length} premium products
        </p>
      </div>

      <ProductSearchClient products={products} collections={collections} />
    </div>
  )
}