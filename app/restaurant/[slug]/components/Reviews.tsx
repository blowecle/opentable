import React from 'react'
import ReviewCard from './ReviewCard'
import { Review } from '@prisma/client'

export default function Reviews({reviews}: {reviews: Review[]}) {

  return (
        <div className='border-t mt-2'>
          {reviews.length ? (
          <><h1 className="font-bold text-3xl mt-6 mb-7 borber-b pb-5">
            What {reviews.length} {reviews.length > 1 ? 'people are' : 'person is'} saying
          </h1>
          <div>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}</div></>
          
          )
           : <div className="text-center pt-2">No reviews yet</div>
          }
        </div>
  )
}
