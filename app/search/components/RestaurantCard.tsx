import Link from "next/link";
import { RestaurantCardType } from "../../page";
import Price from "../../components/Price";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utilities/calculateReviewRatingAverage";

interface Restaurant {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
}


export default function RestaurantSearchCard({restaurant}: {restaurant: Restaurant}) {
    
    const renderRatingText = () => {
        const rating = calculateReviewRatingAverage(restaurant.reviews);
        if (rating === 0) return 'No reviews yet';
        if (rating < 1) return 'Terrible';
        if (rating < 2) return 'Bad';
        if (rating < 3) return 'Okay';
        if (rating < 4) return 'Good';
        if (rating <= 5) return 'Awesome';

    }

    return (
            <div className='border-b flex pb-5 ml-5'>
                <img src={restaurant.main_image} alt='' className='w-44 h-36 rounded'></img>
                <div className='p-1 ml-2'>
                    <div>
                        <h3 className='text-2xl mb-2'>{restaurant.name}</h3>
                        <div className='flex items-start'>
                            <div className='flex mb-2'>
                            *****
                            </div>
                            <p className='ml-2'>{renderRatingText()}</p>
                        </div>
                        <div className='flex capitalize text-reg font-light'>
                            <p className='mr-3'>{restaurant.cuisine.name}</p>
                            <Price price={restaurant.price}/>
                            <p>{restaurant.location.name}</p>
                        </div>
                    </div>
                  <div className="text-red-600">
                      <Link href={`/restaurant/${restaurant.slug}`}>
                          View more information
                      </Link>
                  </div>
                </div>
            </div>
    )
}