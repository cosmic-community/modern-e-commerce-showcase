import { getProducts } from '@/lib/cosmic'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Products | Modern E-Commerce Showcase',
  description: 'Browse our complete collection of premium products',
}

export default async function ProductsPage() {
  const products = await getProducts() as Product[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">All Products</h1>
        <p className="text-xl text-gray-600">
          Browse our complete collection of {products.length} premium products
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available at the moment.</p>
        </div>
      )}
    </div>
  )
}