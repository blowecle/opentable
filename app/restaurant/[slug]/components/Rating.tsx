import { Review } from '@prisma/client'
import React from 'react'
import { calculateReviewRatingAverage } from '../../../utilities/calculateReviewRatingAverage'

export default function Ratings({reviews}: {reviews: Review[]}) {

  return (
    <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
            <p>*****</p>
            <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews).toFixed(1)}</p>
          </div>
          <div>
            {reviews.length ? (<p className="text-reg ml-4">{reviews.length} Review{reviews.length > 1 ? 's' : ''}</p>)
            : <p className="text-reg ml-4">No Reviews</p>}
          </div>
        </div>
  )
}
