# Modern E-Commerce Showcase

![App Preview](https://imgix.cosmicjs.com/3034bd10-b6d4-11f0-8dcc-651091f6a7c0-photo-1590874103328-eac38a683ce7-1761968290519.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, modern e-commerce showcase platform built with Next.js 16 and powered by Cosmic. Features product catalogs, curated collections, and authentic customer reviews in a responsive, user-friendly interface.

## ✨ Features

- **Product Showcase**: Browse products with high-quality images and detailed descriptions
- **Collection Pages**: Explore curated collections with featured imagery
- **Customer Reviews**: View authentic reviews with star ratings and verified purchase badges
- **Individual Product Pages**: Detailed product information with multiple images and specifications
- **Responsive Design**: Mobile-first design that looks great on all devices
- **Fast Performance**: Built with Next.js 16 for optimal loading speeds
- **SEO Optimized**: Proper metadata and semantic HTML for search engines

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6905804180bf4e679ba4ffe6&clone_repository=6905817880bf4e679ba50004)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> Based on the content model I created for "Design a content model for an e-commerce store with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic** - Headless CMS for content management
- **Bun** - Fast JavaScript runtime and package manager

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your e-commerce content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with collection data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'product-slug' })
  .depth(1)
```

### Fetching Collections

```typescript
// Get all collections
const { objects: collections } = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get products in a specific collection
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collections': collectionId 
  })
  .depth(1)
```

### Fetching Reviews

```typescript
// Get all reviews with product data
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Products
- Product Name (text)
- Description (HTML textarea)
- Price (number)
- Product Images (files)
- In Stock (switch)
- Collections (object relationship)

### Collections
- Collection Name (text)
- Description (textarea)
- Featured Image (file)

### Reviews
- Customer Name (text)
- Rating (select-dropdown: 1-5 stars)
- Review Text (textarea)
- Product (object relationship)
- Verified Purchase (switch)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

## 📄 License

MIT License - feel free to use this project for your own e-commerce needs!

<!-- README_END -->