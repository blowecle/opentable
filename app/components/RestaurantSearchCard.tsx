import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantSearchCard({restaurant}: Props) {
    return (
            <div className='border-b flex pb-5 ml-5'>
                <img src={restaurant.main_image} alt='' className='w-44 h-36 rounded'></img>
                <div className='p-1 ml-2'>
                    <div>
                        <h3 className='font-bold text-2xl mb-2'>{restaurant.name}</h3>
                        <div className='flex items-start'>
                            <div className='flex mb-2'>
                            *****
                            </div>
                            <p className='ml-2'>77 reviews</p>
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