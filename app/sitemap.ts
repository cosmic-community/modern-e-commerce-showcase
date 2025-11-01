import { MetadataRoute } from 'next'
import { getProducts, getCollections } from '@/lib/cosmic'
import { Product, Collection } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Fetch all products and collections
  const products = await getProducts() as Product[]
  const collections = await getCollections() as Collection[]

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Product routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.modified_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Collection routes
  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(collection.modified_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...collectionRoutes]
}