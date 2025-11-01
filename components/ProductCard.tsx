import { Product } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.metadata.product_images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        {primaryImage && (
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={`${primaryImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.metadata.product_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              width={400}
              height={400}
            />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
            {product.metadata.product_name}
          </h3>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-secondary">
              ${product.metadata.price.toFixed(2)}
            </span>
            
            {product.metadata.in_stock ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}