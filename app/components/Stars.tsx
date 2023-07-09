import fullStar from '../../public/icons/full-star.png'
import halfStar from '../../public/icons/half-star.png'
import emptyStar from '../../public/icons/empty-star.png'
import Image from 'next/image'
import { Review } from '@prisma/client'
import { calculateReviewRatingAverage } from '../utilities/calculateReviewRatingAverage'

export default function Stars({reviews}: {reviews: Review[]}) {
    const rating = calculateReviewRatingAverage(reviews);

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating >= i + .75) {
                stars.push(<Image src={fullStar} className='w-4 h-4 mr-1' alt='' key={i} />)
            } else if (rating >= i + 0.25) {
                stars.push(<Image src={halfStar} className='w-4 h-4 mr-1' alt='' key={i} />)
            } else {
                stars.push(<Image src={emptyStar} className='w-4 h-4 mr-1' alt='' key={i} />)
            }
        }
        return stars;
    }

    return (
        <div className='flex'>
            {renderStars()}
        </div>
    )
}
