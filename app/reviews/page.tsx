import { getReviews } from '@/lib/cosmic'
import { Review } from '@/types'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Customer Reviews | Modern E-Commerce Showcase',
  description: 'Read authentic customer reviews and feedback',
}

export default async function ReviewsPage() {
  const reviews = await getReviews() as Review[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Customer Reviews</h1>
        <p className="text-xl text-gray-600">
          Read authentic feedback from our customers
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No reviews available at the moment.</p>
        </div>
      )}
    </div>
  )
}